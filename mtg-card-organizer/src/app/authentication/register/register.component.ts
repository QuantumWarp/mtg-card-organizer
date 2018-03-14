import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditionsAgreed = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  register(): void {
    this.authenticationService.register(this.username, this.email, this.password, this.confirmPassword)
      .then(() => this.router.navigateByUrl('/auth/login'));
  }
}
