import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

}
