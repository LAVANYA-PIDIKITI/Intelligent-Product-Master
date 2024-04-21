import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

interface Comment {
  properties: any;
  id: string;
  status: string;
  title: string;
  pageId: string;
  version: {
    number: number;
    createdAt: string;
  };
  _links: {
    webui: string;
  };
}

@Component({
  selector: 'app-footer-comments',
  templateUrl: './footer-comments.component.html',
  styleUrls: ['./footer-comments.component.css']
})
export class FooterCommentsComponent {
  pageId: string = '';
  isLoading: boolean = false;
  footerComments: Comment[] = [];

  editingCommentId: string | null = null;
  editMessage: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  fetchComments(): void {
    if (!this.pageId) {
      this.toastr.error('Please enter a valid Page ID.');
      return;
    }

    const apiUrl = `http://127.0.0.1:3001/footer-comments/${this.pageId}`;
    this.isLoading = true;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.isLoading = false;
        if (data && data.results) {
          this.footerComments = data.results;
        } else {
          this.footerComments = [];
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Failed to fetch comments:', error);
        this.toastr.error('Failed to fetch comments. Please try again.');
        this.footerComments = [];
      }
    );
  }

  deleteComment(commentId: string): void {
    const deleteUrl = `http://127.0.0.1:3001/delete-comment/${commentId}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log(`Comment with ID ${commentId} deleted successfully.`);
        this.toastr.success('Comment deletion was successful.');
        // After deletion, fetch updated comments
        this.fetchComments();
      },
      (error) => {
        console.error(`Failed to delete comment with ID ${commentId}:`, error);
        this.toastr.error('Failed to delete comment. Please try again.');
        // Handle error
      }
    );
  }

  editComment(commentId: string): void {
    this.editingCommentId = commentId;
    const commentToEdit = this.footerComments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      this.editMessage = commentToEdit.properties['inline-original-selection'] || '';
    }
  }

  saveEditedComment(commentId: string): void {
    const editUrl = `http://127.0.0.1:3001/edit-comment/${commentId}`;
    this.http.put(editUrl, { message: this.editMessage }).subscribe(
      () => {
        console.log(`Comment with ID ${commentId} edited successfully.`);
        this.toastr.success('Comment edited successfully.');
        this.editingCommentId = null;
        // After edit, fetch updated comments
        this.fetchComments();
      },
      (error) => {
        console.error(`Failed to edit comment with ID ${commentId}:`, error);
        this.toastr.error('Failed to edit comment. Please try again.');
        // Handle error
      }
    );
  }

  getCommentWebUrl(webuiLink: string): string {
    return `https://your-confluence-url.com${webuiLink}`;
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editMessage = ''; // Reset the edit message
  }
}
