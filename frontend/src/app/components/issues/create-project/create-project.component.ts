import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  newProject = {
    name: '',
    key: '',
    projectTypeKey: '',
    leadAccountId: ''
  };

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  createProject(): void {
    this.http.post('http://127.0.0.1:3000/api/projects', this.newProject)
      .subscribe(
        () => {
          this.toastr.success('Project created successfully', 'Success');
        },
        (error) => {
          console.error('Error creating project:', error);
          this.toastr.error('Failed to create project', 'Error');
        }
      );
  }
}
