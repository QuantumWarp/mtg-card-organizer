import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';

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

  constructor(private authenticationService: AuthenticationService) { }

  register(): void {
    this.authenticationService.register(this.username, this.email, this.password, this.confirmPassword).then(() => {
      // TODO
    });
  }
}
