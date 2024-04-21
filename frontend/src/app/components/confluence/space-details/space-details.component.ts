import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SpaceDetails {
  id: string;
  type: string;
  status: string;
  title: string;
  space: {
    id: number;
    key: string;
    name: string;
    type: string;
    status: string;
    _links: {
      webui: string;
      self: string;
    };
  };
  history: {
    latest: boolean;
    createdDate: string;
    createdBy: {
      displayName: string;
      profilePicture: {
        path: string;
        width: number;
        height: number;
      };
    };
  };
  version: {
    when: string;
    by: {
      displayName: string;
    };
    friendlyWhen: string;
    number: number;
    message: string;
  };
  _links: {
    self: string;
  };
}

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css']
})
export class SpaceDetailsComponent implements OnInit {
  spaceId: string = ''; // Space ID input by the user
  spaceDetails: SpaceDetails | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch space details when component initializes
    this.fetchSpaceDetails();
  }

  fetchSpaceDetails(): void {
    // Check if spaceId is provided and make API call
    if (this.spaceId.trim() === '') {
      console.error('Space ID is required.');
      return;
    }

    const apiUrl = `http://127.0.0.1:3001/read-page/${this.spaceId}`;

    this.http.get<SpaceDetails>(apiUrl).subscribe(
      (data: SpaceDetails) => {
        this.spaceDetails = data;
      },
      (error) => {
        console.error('Failed to fetch space details:', error);
      }
    );
  }
}
