import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserDetails {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
  groups: {
    size: number;
    items: any[]; // Adjust this if you have more specific details about groups
  };
  applicationRoles: {
    size: number;
    items: any[]; // Adjust this if you have more specific details about application roles
  };
  expand: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  accountId: string = '';
  userDetails: UserDetails | null = null;

  constructor(private http: HttpClient) { }

  getUserDetails(): void {
    if (!this.accountId) {
      console.error('Account ID is required.');
      return;
    }

    const apiUrl = `http://127.0.0.1:3000/api/users/${this.accountId}`;
    this.http.get<UserDetails>(apiUrl).subscribe(
      (response) => {
        this.userDetails = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
