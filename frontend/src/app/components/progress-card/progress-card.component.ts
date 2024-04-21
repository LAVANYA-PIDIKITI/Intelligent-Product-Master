import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css']
})
export class ProgressCardComponent implements OnInit {
  todoCount: number = 0;
  inProgressCount: number = 0;
  doneCount: number = 0;

  todoProgress: number = 0;
  inProgressProgress: number = 0;
  doneProgress: number = 0;

  issues: any[] = []; // Initialize issues as an empty array

  private apiUrl = 'http://127.0.0.1:3000/api/issues/KAN';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response: any) => {
        this.issues = response.issues || []; // Update issues based on API response
        this.calculateIssueCountsAndProgress();
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  calculateIssueCountsAndProgress(): void {
    // Count issues by status
    this.todoCount = this.countIssuesByStatus('To Do');
    this.inProgressCount = this.countIssuesByStatus('In Progress');
    this.doneCount = this.countIssuesByStatus('Done');

    // Calculate progress percentages
    const totalCount = this.issues.length;
    this.todoProgress = this.calculateProgressPercentage(this.todoCount, totalCount);
    this.inProgressProgress = this.calculateProgressPercentage(this.inProgressCount, totalCount);
    this.doneProgress = this.calculateProgressPercentage(this.doneCount, totalCount);
  }

  countIssuesByStatus(status: string): number {
    return this.issues.filter(issue => issue.fields.status.name === status).length;
  }

  calculateProgressPercentage(count: number, totalCount: number): number {
    return totalCount > 0 ? (count / totalCount) * 100 : 0;
  }
}
