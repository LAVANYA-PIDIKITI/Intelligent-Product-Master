import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Page {
  parentType: string | null;
  createdAt: string;
  authorId: string;
  id: string;
  version: {
    number: number;
    message: string;
    minorEdit: boolean;
    authorId: string;
    createdAt: string;
  };
  position: any;
  title: string;
  status: string;
  body: any;
  parentId: string | null;
  spaceId: string;
  ownerId: string;
  lastOwnerId: string | null;
  _links: {
    editui: string;
    webui: string;
    tinyui: string;
    base: string;
  };
}

@Component({
  selector: 'app-specific-page',
  templateUrl: './specific-page.component.html',
  styles: []
})
export class SpecificPageComponent implements OnInit {
  selectedPage: Page | undefined;
  pageId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchPageDetails(): void {
    if (!this.pageId) {
      console.error('Page ID is required.');
      return;
    }

    const apiUrl = `http://127.0.0.1:3001/pages/${this.pageId}`;

    this.http.get<Page>(apiUrl).subscribe(
      (page: Page) => {
        this.selectedPage = page;
      },
      (error) => {
        console.error('Failed to fetch page:', error);
      }
    );
  }
}
