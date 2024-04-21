import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface InlineComment {
  id: string;
  status: string;
  title: string;
  pageId: string;
  version: {
    number: number;
    message: string;
    minorEdit: boolean;
    authorId: string;
    createdAt: string;
  };
  resolutionStatus: string;
  properties: {
    inlineMarkerRef: string;
    'inline-original-selection': string;
    'inline-marker-ref': string;
  };
  _links: {
    webui: string;
  };
}

@Component({
  selector: 'app-inline-comments',
  templateUrl: './inline-comments.component.html',
  styleUrls: ['./inline-comments.component.css']
})
export class InlineCommentsComponent implements OnInit {
  pageId: string = '';
  inlineComments: InlineComment[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchInlineComments(): void {
    if (!this.pageId.trim()) {
      return; // If pageId is empty, do nothing
    }

    const apiUrl = `http://127.0.0.1:3001/inline-comments/${this.pageId}`;
    this.isLoading = true;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.isLoading = false;
        if (data && data.results) {
          this.inlineComments = data.results;
        } else {
          this.inlineComments = [];
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Failed to fetch inline comments:', error);
        this.inlineComments = [];
      }
    );
  }
}
