import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../notification.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; 
interface ApiResponse {
  issues: any[];
}

interface Transition {
  id: string;
  name: string;
  to: {
    name: string;
  };
  hasScreen: boolean;
  isGlobal: boolean;
  isInitial: boolean;
  isAvailable: boolean;
  isConditional: boolean;
  isLooped: boolean;
}

@Component({
  selector: 'app-get-tranitions',
  templateUrl: './get-tranitions.component.html',
  styleUrls: ['./get-tranitions.component.css']
})
export class GetTranitionsComponent implements OnInit {
  issues: any[] = [];
  selectedIssue: any;
  modalRef!: BsModalRef;
  editingDescription = false;
  editedDescription: string = '';
  transitions: Transition[] = [];

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues(): void {
    const apiUrl = 'http://127.0.0.1:3000/api/issues/KAN';
    this.http.get<ApiResponse>(apiUrl).subscribe(
      (response) => {
        this.issues = response.issues || [];
        console.log(this.issues)
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  openIssueModal(issue: any, template: TemplateRef<any>): void {
    this.selectedIssue = issue;
    this.fetchTransitions(issue.id); // Pass issue ID to fetch transitions
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  fetchTransitions(issueId: string): void { // Accept issue ID as parameter
    console.log(issueId)
    const apiUrl = `http://127.0.0.1:3000/api/issues/${issueId}/transitions`;

    this.http.get<any>(apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching transitions:', error);
          return throwError('Failed to fetch transitions');
        })
      )
      .subscribe(
        (response) => {
          this.transitions = response.transitions || [];
        }
      );
  }
  transitionIssue(transitionId: number): void {
    if (!this.selectedIssue || !this.selectedIssue.id) {
      console.error('No selected issue to transition.');
      return;
    }
  
    const apiUrl = `http://127.0.0.1:3000/api/issues/${this.selectedIssue.id}/transitions`;
  
    this.http.post(apiUrl, { transitionId })
      .pipe(
        catchError(error => {
          console.error('Error transitioning issue:', error);
          return throwError('Failed to transition issue');
        })
      )
      .subscribe(
        () => {
          console.log('Issue transitioned successfully');
          this.toastr.success('Issue transitioned successfully'); // Display success toast message
          this.closeModal(); // Close modal after successful transition
        }
      );
  }
  
}
