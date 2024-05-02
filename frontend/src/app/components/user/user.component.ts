import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

}
