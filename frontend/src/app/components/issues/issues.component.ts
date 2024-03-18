import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  issues: any[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    const apiUrl = 'https://lavlav.atlassian.net/rest/api/3/events';
    const username = 'YOUR_USERNAME'; // Replace with your username
    const token = 'YOUR_TOKEN'; // Replace with your token
    
    const headers = new HttpHeaders({
      'Authorization': 'Basic bGF2YW55YXBpZGlraXRpLjI0Y3NAbGljZXQuYWMuaW46QVRBVFQzeEZmR0YwMGEyaHVXX2FSWVJsT20zclZOTkNkbmp6emFBYTQ5cUVKX3ZOWHB1bTVMX1MyMVVIdTBMcDBBZ05SdWliN3Q3YlNyWFIwOENfWFBMTjNYODJfMFA0RGxvb1hRa0FfOENlV2RKZU52TVRYcXRQYUR4MXdrLXNWWXdCUDdXOUxRMVJJaGpUZFBMRHdETURLSU5tYVQzQlRJTUFidi1xbTkzUHBkVzVYRWpuR1ZFPUNEMjg5RjFF',
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    this.http.get<any[]>(apiUrl, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error fetching issues:', error);
        return throwError(error); // Rethrow the error to propagate it further
      })
    ).subscribe(data => {
      console.log(data); // Logging the API response
      this.issues = data;
    });
  }
}
