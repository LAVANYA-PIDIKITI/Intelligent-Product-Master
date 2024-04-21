import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInUp } from 'ngx-animate'; // Assuming you're using ngx-animate or similar library

interface IssueData {
  projectKey: string;
  issueType: string;
  summary: string;
  description: any;
}

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css'],
  animations: [
    trigger('fadeInUp', [ // Define trigger with animation
      transition(':enter', [
        useAnimation(fadeInUp) // Apply fadeInUp animation on enter
      ])
    ])
  ]
})
export class CreateIssueComponent {
  issueData: IssueData = {
    projectKey: 'KAN',
    issueType: '10001',
    summary: '',
    description: {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: ''
            }
          ]
        }
      ]
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  createIssue(): void {
    const apiUrl = 'http://127.0.0.1:3000/api/issues';
    this.http.post(apiUrl, this.issueData)
      .subscribe(
        (response: any) => {
          this.notificationService.showSuccess('Issue created successfully!', 'Success');
          setTimeout(() => {
            this.router.navigate(['/issues']);
          }, 1000); // Delay navigation for 2 seconds (adjust as needed)
        },
        (error: any) => {
          console.error('Error creating issue:', error);
          this.notificationService.showError('Failed to create issue.', 'Error');
        }
      );
  }
  
}
