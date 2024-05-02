import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface ApiResponse {
  total: number;
}

@Component({
  selector: 'app-get-issues-count',
  templateUrl: './get-issues-count.component.html',
  styleUrls: ['./get-issues-count.component.css']
})
export class GetIssuesCountComponent {
  @Input() projectKey!: string;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getIssueCount(): void {
    if (!this.projectKey) {
      console.error('Project key is required.');
      return;
    }

    const apiUrl = `http://127.0.0.1:3000/api/issues/${this.projectKey}`;
    this.http.get<ApiResponse>(apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching issue count:', error);
          return throwError('Failed to fetch issue count');
        })
      )
      .subscribe(
        (response) => {
          this.toastr.success(`Total issues: ${response.total}`); // Display toast message with total issue count
        }
      );
  }
}
