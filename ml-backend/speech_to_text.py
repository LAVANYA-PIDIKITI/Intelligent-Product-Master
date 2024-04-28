# server.py (Flask Backend)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import torch
import subprocess
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from datasets import load_dataset
import shutil
import tarfile
from openai import OpenAI

app = Flask(__name__)
CORS(app)

@app.route('/run_python_code', methods=['POST'])
def run_python_code():
    
    client = OpenAI(api_key="sk-proj-qLzzw6hcHf5tfBkSfqu6T3BlbkFJQi5djL2Wqh98n1CjMIvK")
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model_id = "distil-whisper/distil-large-v3"

    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
    )
    model.to(device)

    processor = AutoProcessor.from_pretrained(model_id)

    pipe = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        max_new_tokens=128,
        torch_dtype=torch_dtype,
        device=device,
    )

    #dataset = load_dataset("hf-internal-testing/librispeech_asr_dummy", "clean", split="validation")
    #sample = dataset[0]["audio"]

    # Process the uploaded audio file
    audio_file = request.files['audio_file']
    audio_file.save('uploaded_audio.wav')

    result = pipe("uploaded_audio.wav")
    print(result["text"])
    transcript = result["text"]

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are an efficient meeting assistant, skilled in creating minutes of meeting from transcripts."},
        {"role": "user", "content": "Generate minutes of meeting from the following transcript:"},
        {"role": "user", "content": transcript}
    ]
    )

    print(completion.choices[0].message)

    # Remove the uploaded audio file after processing
    os.remove('uploaded_audio.wav')
    return jsonify(completion.choices[0].message.content)

if __name__ == '__main__':
    app.run(debug=True)
