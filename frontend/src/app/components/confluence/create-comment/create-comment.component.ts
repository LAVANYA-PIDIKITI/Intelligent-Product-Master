import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface NewComment {
  pageId: string;
  comment: string;
}
@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  newComment: NewComment = { pageId: '', comment: '' };

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  onCreateComment(): void {
    const apiUrl = 'http://127.0.0.1:3001/create-comment';
    this.http.post<any>(apiUrl, this.newComment).subscribe(
      (response) => {
        this.toastr.success('Comment created successfully!', 'Success');
        this.router.navigateByUrl('/confluence');
      },
      (error) => {
        console.error('Failed to create comment:', error);
        this.toastr.error('Failed to create comment. Please try again.', 'Error');
      }
    );
  }
}
