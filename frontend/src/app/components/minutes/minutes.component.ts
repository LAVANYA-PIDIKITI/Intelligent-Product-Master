import { Component } from '@angular/core';

@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.component.html',
  styleUrl: './minutes.component.css'
})
export class MinutesComponent {
  audioUrl: string = ''; // Assign an empty string or initialize with the appropriate value
  meetingMinutes: string = '';
  constructor() { }
}
