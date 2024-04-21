import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    // Handle file upload logic here
    console.log(selectedFile);
  }
}
