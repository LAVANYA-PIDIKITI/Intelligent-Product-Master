import { Component } from '@angular/core';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  private gridApi!: GridApi;
  public columnDefs = [
    { headerName: 'User', field: 'user', sortable: true, filter: true },
    { headerName: 'Speed (stories per day)', field: 'speed', sortable: true, filter: true },
    { headerName: 'Completed', field: 'completed', sortable: true, filter: true },
    { headerName: 'Accuracy (%)', field: 'accuracy', sortable: true, filter: true },
    { headerName: 'Active', field: 'active', sortable: true, filter: true },
    { headerName: 'Assigned Stories', field: 'assignedStories', sortable: true, filter: true }
  ];
  public rowData: any[] = [
    { user: 'Lavanya', speed: 5.4, completed: 12, accuracy: 85, active: true, assignedStories: 5 },
    { user: 'Monica', speed: 5.2, completed: 10, accuracy: 78, active: true, assignedStories: 4 },
    { user: 'Nick', speed: 4.1, completed: 8, accuracy: 92, active: false, assignedStories: 6 },
    { user: 'Ansilin', speed: 3.5, completed: 6, accuracy: 65, active: true, assignedStories: 3 }
  ]; // Mock data directly assigned to rowData

  constructor() {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    // Optionally, perform any setup or customization on grid initialization
  }
}
