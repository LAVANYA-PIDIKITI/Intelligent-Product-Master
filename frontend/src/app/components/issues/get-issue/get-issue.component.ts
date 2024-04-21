import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../notification.service'; 

interface ApiResponse {
  issues: any[];
}

@Component({
  selector: 'app-get-issue',
  templateUrl: './get-issue.component.html',
  styleUrls: ['./get-issue.component.css']
})
export class GetIssueComponent implements OnInit {
  issues: any[] = [];
  selectedIssue: any;
  modalRef!: BsModalRef;
  editingDescription = false;
  editedDescription: string = '';

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private notificationService: NotificationService 
  ) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues(): void {
    const apiUrl = 'http://127.0.0.1:3000/api/issues/KAN';
    this.http.get<ApiResponse>(apiUrl).subscribe(
      (response) => {
        this.issues = response.issues || [];
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  openIssueModal(issue: any, template: TemplateRef<any>): void {
    this.selectedIssue = issue;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  startEditingDescription(): void {
    this.editingDescription = true;
    this.editedDescription = this.selectedIssue.fields.description?.content[0]?.content[0]?.text || '';
  }

  saveDescription(): void {
    // Update the description in the selectedIssue object
    if (this.selectedIssue) {
      this.selectedIssue.fields.description.content[0].content[0].text = this.editedDescription;
      // Here you can make an HTTP request to update the description on the server
      // Example: this.updateIssue(this.selectedIssue);
      this.editingDescription = false; // Reset editing flag
    }
  }

  cancelEdit(): void {
    this.editingDescription = false; // Cancel editing
    // Optionally, you can reset the editedDescription if needed
    // this.editedDescription = '';
  }

  deleteIssue(): void {
    if (!this.selectedIssue || !this.selectedIssue.id) {
      console.error('No issue selected for deletion.');
      return;
    }

    const deleteUrl = `http://127.0.0.1:3000/api/issues/${this.selectedIssue.id}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        this.notificationService.showSuccess('Issue deleted successfully', 'Success');
        console.log(`Issue ${this.selectedIssue.key} deleted successfully.`);
        // Optionally, you can update the UI by removing the deleted issue from the issues array
        this.issues = this.issues.filter(issue => issue.id !== this.selectedIssue.id);
        this.closeModal(); // Close the modal after deletion
      },
      (error) => {
        this.notificationService.showError('Error deleting issue', 'Error');
        console.error('Error deleting issue:', error);
      }
    );
  }
}
