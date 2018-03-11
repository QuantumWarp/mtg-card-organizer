import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.configure();
  }
}
