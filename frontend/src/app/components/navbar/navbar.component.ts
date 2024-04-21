import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  redirectToStackOverflow(): void {
    this.router.navigate(['/stackoverflow']); // Open Stack Overflow in a new tab
  }

  startMeetingRecording(): void {
    this.router.navigate(['/minutes']);
    console.log('Meeting recording started!');
  }

}
