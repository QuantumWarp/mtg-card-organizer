import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  loading = false;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}

  login(): void {
    this.loading = true;
    this.authenticationService.login(this.username, this.password).toPromise()
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
