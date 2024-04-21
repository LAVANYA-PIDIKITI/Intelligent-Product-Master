import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../issues/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent {
  issueData = {
    type:'page',
    title: '',
    content: '',
    SPACE_KEY: 'TEAM',
    status: 'current'
  };

  constructor(private http: HttpClient, private notificationService: NotificationService,private router: Router,) {}

  createPage(): void {
    const apiUrl = 'http://127.0.0.1:3001/create-page';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(apiUrl, this.issueData, { headers }).subscribe(
      (response) => {
        this.notificationService.showSuccess('Page created successfully', 'Success');
        setTimeout(() => {
          this.router.navigate(['/confluence']);
        }, 1000);
      },
      (error) => {
        this.notificationService.showError('Failed to create page', 'Error');
        console.error('Error creating page:', error);
      }
    );
  }
}
