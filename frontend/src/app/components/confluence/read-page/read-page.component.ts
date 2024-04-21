import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

interface Page {
  [x: string]: any;
  id: string;
  createdAt: string;
  authorId: string;
  title: string;
  content: string;
}

interface ApiResponse {
  results: Page[];
}

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.component.html',
  styleUrls: ['./read-page.component.css']
})
export class ReadPageComponent implements OnInit {
  pages: Page[] = [];
  selectedPage: Page | null = null;
  modalRef: BsModalRef | null = null;
  editing: boolean = false;
  editedTitle: string = '';
  editedContent: string = '';

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPages().subscribe((data) => {
      this.pages = data.results;
    });
  }

  getPages(): Observable<ApiResponse> {
    const apiUrl = 'http://127.0.0.1:3001/pages';
    return this.http.get<ApiResponse>(apiUrl);
  }

  openIssueModal(page: Page, modalTemplate: TemplateRef<any>): void {
    this.selectedPage = { ...page }; // Create a copy of the selected page
    this.modalRef = this.modalService.show(modalTemplate, { class: 'modal-lg' });
  }

  closeModal(): void {
    this.selectedPage = null;
    this.editing = false;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  toggleEditing(): void {
    this.editing = !this.editing;
    if (this.editing) {
      // Initialize edited values with current page details
      this.editedTitle = this.selectedPage?.title || '';
      this.editedContent = this.selectedPage?.content || '';
    }
  }

  cancelEditing(): void {
    this.editing = false;
    this.editedTitle = '';
    this.editedContent = '';
  }

  savePage(): void {
    if (this.selectedPage) {
      const updatedPageData = {
        title: this.editedTitle,
        content: this.editedContent,
        version: {
          number: this.selectedPage['version'].number + 1
        }
      };

      this.http.put(`http://127.0.0.1:3001/update-page/${this.selectedPage.id}`, updatedPageData).subscribe(
        (response) => {
          console.log('Page updated successfully:', response);
          this.toastr.success('Page updated successfully');
          this.closeModal(); // Close the modal after saving
        },
        (error) => {
          console.error('Failed to update page:', error);
          this.toastr.error('Failed to update page');
        }
      );
    }
  }

  deletePage(): void {
    if (this.selectedPage) {
      const pageId = this.selectedPage.id;
      this.http.delete(`http://127.0.0.1:3001/delete-page/${pageId}`).subscribe(
        (response) => {
          console.log('Page deleted successfully:', response);
          this.toastr.success('Page deleted successfully');
          this.closeModal(); // Close the modal after deletion
        },
        (error) => {
          console.error('Failed to delete page:', error);
          this.toastr.error('Failed to delete page');
        }
      );
    }
  }
}
