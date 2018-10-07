import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error-404.component.html',
  styleUrls: ['./error.scss']
})
export class Error404Component {
  constructor(private router: Router) {}

  returnHome(): void {
    this.router.navigateByUrl('/containers');
  }
}
