import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confluence',
  templateUrl: './confluence.component.html',
  styleUrl: './confluence.component.css'
})
export class ConfluenceComponent {
  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
