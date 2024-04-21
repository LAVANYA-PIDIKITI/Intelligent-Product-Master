import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

interface Attachment {
  downloadLink: string;
  createdAt: string;
  webuiLink: string;
  id: string;
  comment: string;
  version: {
    number: number;
    message: string;
    minorEdit: boolean;
    authorId: string;
    createdAt: string;
  };
  title: string;
  fileSize: number;
  status: string;
  mediaType: string;
  pageId: string;
  fileId: string;
  _links: {
    download: string;
    webui: string;
  };
}

@Component({
  selector: 'app-get-attachments',
  templateUrl: './get-attachments.component.html',
  styleUrls: ['./get-attachments.component.css']
})
export class GetAttachmentsComponent implements OnInit {
  attachments: Attachment[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {} // Inject ToastrService

  ngOnInit(): void {
    this.fetchAttachments();
  }

  fetchAttachments(): void {
    const apiUrl = 'http://127.0.0.1:3001/attachments';
    this.isLoading = true;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.isLoading = false;
        if (data && data.results) {
          this.attachments = data.results;
        } else {
          this.attachments = [];
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Failed to fetch attachments:', error);
        this.attachments = [];
      }
    );
  }

  deleteAttachment(attachmentId: string): void {
    const deleteUrl = `http://127.0.0.1:3001/delete-attachment/${attachmentId}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log(`Attachment with ID ${attachmentId} deleted successfully.`);
        // Show success toast notification
        this.toastr.success(`Attachment with ID ${attachmentId} deleted successfully.`);
        // After deletion, fetch updated attachments
        this.fetchAttachments();
      },
      (error) => {
        console.error(`Failed to delete attachment with ID ${attachmentId}:`, error);
        // Show error toast notification
        this.toastr.error(`Failed to delete attachment with ID ${attachmentId}.`);
        // Handle error
      }
    );
  }
}
