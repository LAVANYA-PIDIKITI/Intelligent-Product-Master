import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Answer {
  ownerName: string;
  answer: string;
  profileimage: string;
}

@Component({
  selector: 'app-stackoverflow',
  templateUrl: './stackoverflow.component.html',
  styleUrls: ['./stackoverflow.component.css']
})
export class StackoverflowComponent  {
  query: string = '';
  answers: Answer[] = [];
  currentPage: number = 1;

  constructor(private http: HttpClient) {}

  searchQuery(): void {
    if (!this.query) {
      return;
    }

    const apiUrl = `http://127.0.0.1:3000/search/${this.query}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.answers = data;
      },
      (error) => {
        console.error('Failed to fetch answers:', error);
        this.answers = [];
      }
    );
  }

  // Function to retrieve answers for the current page
  getAnswersForPage(pageNumber: number): Answer[] {
    const maxCardsPerPage = 10;
    const startIndex = this.calculateStartIndex(pageNumber, maxCardsPerPage);
    return this.answers.slice(startIndex, startIndex + maxCardsPerPage);
  }

  // Calculate the start index based on page number and max cards per page
  calculateStartIndex(pageNumber: number, maxCardsPerPage: number): number {
    return (pageNumber - 1) * maxCardsPerPage;
  }

  // Change the current page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}