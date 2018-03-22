import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbar, MatButton, MatIcon } from '@angular/material';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';
import { SnackNotificationService } from '../notifications/snack-notification.service';
import { SnackNotificationType } from '../notifications/snack-notification.type';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.scss']
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
