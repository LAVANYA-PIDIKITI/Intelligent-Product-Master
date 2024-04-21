import { Component, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.component.html',
  styleUrl: './minutes.component.css'
})
export class MinutesComponent {
  audioUrl: string = ''; // Assign an empty string or initialize with the appropriate value
  meetingMinutes: string = ''; 

  constructor(private http: HttpClient) { }

  onFileSelected(selectedFile: File | null) {
    if (selectedFile) {

      console.log(selectedFile);
      const formData = new FormData();
      formData.append('audio_file', selectedFile);

      this.http.post<any>('http://127.0.0.1:5000/run_python_code', formData).subscribe(
        (response) => {
          this.meetingMinutes = response;
        },
        (error) => {
          console.error('Error executing Python code:', error);
        }
      );
    }
  }

}
