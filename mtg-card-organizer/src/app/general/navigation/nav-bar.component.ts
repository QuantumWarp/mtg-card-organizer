import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbar, MatButton, MatIcon } from '@angular/material';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  title = 'MTG Card Organizer';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
