import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
  
export class FileUploadComponent {

  selectedFile : File | null = null;

  @Output() fileSelected: EventEmitter <File | null> = new EventEmitter <File | null>();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Handle file upload logic here
    console.log(this.selectedFile);
    this.fileSelected.emit(this.selectedFile);
  }
}
