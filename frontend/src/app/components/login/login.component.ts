import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLoginSubmit(): void {
    // Check if username and password match the expected values
    if (this.username === 'admin' && this.password === 'admin') {
      // Reset error message if previously set
      this.errorMessage = '';

      // Navigate to the dashboard upon successful login
      this.router.navigate(['/dashboard']);
    } else {
      // Display error message for invalid credentials
      this.errorMessage = 'Invalid username or password. Please try again.';
    }

    // Reset form fields after submission (optional)
    this.username = '';
    this.password = '';
  }
}
