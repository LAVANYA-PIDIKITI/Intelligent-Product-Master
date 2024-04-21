import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  priorities = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];
  priorityCounts: { priority: string, count: number }[] = [];
  totalIssuesCount: number = 0;
  private apiUrl = 'http://127.0.0.1:3000/api/issues/KAN';
  issues: any[] = []; // Initialize issues as an empty array

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response: any) => {
        this.issues = response.issues || []; // Update issues based on API response
        this.calculatePriorityCounts();
        this.calculateTotalIssuesCount();
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  calculatePriorityCounts(): void {
    this.priorityCounts = this.priorities.map(priority => ({
      priority,
      count: this.countIssuesByPriority(priority)
    }));
  }

  countIssuesByPriority(priority: string): number {
    return this.issues.filter(issue => issue.fields.priority.name === priority).length;
  }

  calculateTotalIssuesCount(): void {
    this.totalIssuesCount = this.issues.length;
  }
}
