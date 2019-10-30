import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { MatDialog } from '@angular/material';
import { AboutComponent } from '../../about/about.component';

@Component({
  selector: 'mco-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  openAbout(): void {
    this.dialog.open(AboutComponent, { width: '600px' });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
