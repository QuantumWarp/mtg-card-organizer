import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../services/authentication.service';

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

  @HostListener('document:keydown.enter')
  login(): void {
    if (!this.form.valid) { return; }
    this.loading = true;
    const loginModel = <LoginModel>this.form.value;
    this.authenticationService.login(loginModel).subscribe(
      () => this.loginSuccess(),
      () => this.loading = false);
  }

  private loginSuccess(): void {
    this.router.navigateByUrl('/containers');
  }
}
