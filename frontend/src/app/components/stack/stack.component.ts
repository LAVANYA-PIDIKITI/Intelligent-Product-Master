// stack.component.ts

import { Component } from '@angular/core';
import { StackService } from './stack.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent {
  query: string = '';
  searchResults: any[] = [];
  answerContent: any;

  constructor(private stackService: StackService) { }

  search(): void {
    if (this.query.trim() === '') return;

    this.stackService.searchQuestions(this.query).subscribe(response => {
      this.searchResults = response.items;
    });
  }

  getAnswers(questionId: number): void {
    this.stackService.getAnswers(questionId).subscribe(response => {
      this.answerContent = response.items[0];
    });
  }
}
