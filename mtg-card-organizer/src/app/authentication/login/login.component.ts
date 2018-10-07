import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { VersionService } from '../services/version.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { catchError } from 'rxjs/internal/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loading = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loginName: [, Validators.required],
      password: [, [ Validators.required ]],
    });
  }

  login(): void {
    this.loading = true;
    const loginModel = <LoginModel>this.form.value;
    this.authenticationService.login(loginModel).subscribe(
      () => this.loginSuccess(),
      (erRes) => this.processErrorResponse(erRes)
    );
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
