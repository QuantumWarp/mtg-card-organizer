import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit {
  loginName: string;
  password: string;

  loading = false;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private versionService: VersionService,
    private router: Router) {}

  ngOnInit(): void {
    this.versionService.get().subscribe(result => console.log(result));
  }

  login(): void {
    this.loading = true;
    this.authenticationService.login(this.loginName, this.password).toPromise()
      .then(() => this.loginSuccess())
      .catch((erRes) => this.processErrorResponse(erRes));
  }

  private loginSuccess(): void {
    this.router.navigateByUrl('/home');
  }

  private processErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    const errorType = httpErrorResponse.error.error;
    switch (errorType) {
      case 'invalid_grant':
        this.error = 'Invalid username or password';
        break;
      default:
        this.error = 'Unknown error occurred';
        break;
    }
    this.loading = false;
  }
}
