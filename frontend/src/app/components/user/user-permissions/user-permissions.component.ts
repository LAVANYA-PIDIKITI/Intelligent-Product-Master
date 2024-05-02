import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Permission {
  id: string;
  key: string;
  name: string;
  type: string;
  description: string;
  havePermission: boolean;
}

interface PermissionsResponse {
  permissions: { [key: string]: Permission };
}

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent {
  permissions: Permission[] = [];
  permissionsLoaded: boolean = false;
  permissionsError: boolean = false;

  constructor(private http: HttpClient) { }

  fetchPermissions(): void {
    const apiUrl = 'http://127.0.0.1:3000/api/users/BROWSE_PROJECTS,EDIT_ISSUES,CLOSE_ISSUES,ASSIGN_ISSUES,DELETE_ISSUES,TRANSITION_ISSUES,EDIT_ISSUES/permissions';
    
    this.http.get<PermissionsResponse>(apiUrl)
      .subscribe(
        (response) => {
          this.permissions = Object.values(response.permissions);
          this.permissionsLoaded = true;
          this.permissionsError = false;
        },
        (error) => {
          console.error('Failed to fetch permissions:', error);
          this.permissionsLoaded = false;
          this.permissionsError = true;
        }
      );
  }
}
