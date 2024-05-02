import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
interface Project {
  id: number;
  name: string;
  key: string;
  projectTypeKey: string;
  description: string;
  avatarUrls: {
    '48x48': string;
  };
  lead: {
    displayName: string;
    avatarUrls: {
      '48x48': string;
    };
  };
}

interface ProjectDetails {
  name: string;
  key: string;
  projectTypeKey: string;
  description: string;
  lead: {
    displayName: string;
    avatarUrls: {
      '48x48': string;
    };
  };
}

@Component({
  selector: 'app-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.css']
})
export class GetProjectComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  modalRef: BsModalRef | undefined;
  editingName = false;
  editingDescription = false;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<Project[]>('http://127.0.0.1:3000/projects')
      .subscribe(
        (projects) => {
          this.projects = projects;
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
  }

  openProjectModal(project: Project, template: TemplateRef<any>): void {
    this.http.get<ProjectDetails>('http://127.0.0.1:3000/api/projects/' + project.key)
      .pipe(
        catchError(error => {
          console.error('Error fetching project details:', error);
          return throwError('Failed to fetch project details');
        })
      )
      .subscribe(
        (details) => {
          this.selectedProject = { ...project, description: details.description, lead: details.lead };
          this.modalRef = this.modalService.show(template);
        }
      );
  }

  closeProjectModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  editProject(): void {
    this.editingName = true;
    this.editingDescription = true;
  }

  saveProject(): void {
    if (this.selectedProject) {
      const projectId = this.selectedProject.id;
      const apiUrl = `http://127.0.0.1:3000/api/projects/${projectId}`;

      this.http.put(apiUrl, {
        name: this.selectedProject.name,
        description: this.selectedProject.description
      })
      .subscribe(
        () => {
          console.log('Project updated successfully');
          this.closeProjectModal();
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    }
  }

  deleteProject(project: Project): void {
    if (project) {
      const projectId = project.id;
      const apiUrl = `http://127.0.0.1:3000/api/projects/${projectId}`;

      this.http.delete(apiUrl)
        .subscribe(
          () => {
            console.log('Project deleted successfully');
            this.toastr.success('Project deleted successfully', 'Success');
            // Refresh the project list after deletion
            this.fetchProjects();
          },
          (error) => {
            console.error('Error deleting project:', error);
            this.toastr.error('Failed to delete project', 'Error');
          }
        );
    }
  }
}