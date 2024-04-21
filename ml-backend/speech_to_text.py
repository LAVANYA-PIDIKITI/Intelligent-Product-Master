# server.py (Flask Backend)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import torch
import subprocess
import tensorflow as tf
import tensorflow_hub as tf_hub
from omegaconf import OmegaConf
import shutil
import tarfile

app = Flask(__name__)
CORS(app)

@app.route('/run_python_code', methods=['POST'])
def run_python_code():
    language = 'en'  # also available 'de', 'es'

    # Load provided utils using torch.hub for brevity
    _, decoder, utils = torch.hub.load(repo_or_dir='snakers4/silero-models', model='silero_stt', language=language)
    (read_batch, split_into_batches,
     read_audio, prepare_model_input) = utils

    # See available models
    torch.hub.download_url_to_file('https://raw.githubusercontent.com/snakers4/silero-models/master/models.yml',
                                   'models.yml')
    models = OmegaConf.load('models.yml')
    available_languages = list(models.stt_models.keys())
    assert language in available_languages

    # Load the actual tf model
    torch.hub.download_url_to_file(models.stt_models.en.v2.tf, 'tf_model.tar.gz')
    shutil.rmtree('tf_model', ignore_errors=True)
    os.makedirs('tf_model')
    with tarfile.open('tf_model.tar.gz', 'r:gz') as tar:
        tar.extractall('tf_model')
    tf_model = tf.saved_model.load('tf_model')

    # Process the uploaded audio file
    audio_file = request.files['audio_file']
    audio_file.save('uploaded_audio.wav')

    # Prepare model input
    test_files = ['uploaded_audio.wav']
    batches = split_into_batches(test_files, batch_size=10)
    input = prepare_model_input(read_batch(batches[0]))

    # TF inference
    res = tf_model.signatures["serving_default"](tf.constant(input.numpy()))['output_0']
    result = decoder(torch.Tensor(res.numpy())[0])

    # Remove the uploaded audio file after processing
    os.remove('uploaded_audio.wav')

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
