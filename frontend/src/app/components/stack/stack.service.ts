// stack.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StackService {
  private apiUrl = 'https://api.stackexchange.com/2.3';

  constructor(private http: HttpClient) { }

  searchQuestions(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?order=desc&sort=activity&intitle=${query}&site=stackoverflow&filter=!nNPvSNe7D9`;
    return this.http.get<any>(url);
  }

  getAnswers(questionId: number): Observable<any> {
    const url = `${this.apiUrl}/answers/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=!nNPvSNe7D9`;
    return this.http.get<any>(url);
  }
}
