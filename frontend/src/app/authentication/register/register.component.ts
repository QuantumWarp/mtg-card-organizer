import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { RegisterModel } from '../models/register.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;

  form: FormGroup;

  showPassword = false;
  termsAndConditionsAgreed = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackNotificationService: SnackNotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [, Validators.required],
      email: [, Validators.required],
      password: [, [ Validators.required, this.passwordPolicyValidation ]],
    });
  }

  passwordPolicyValidation(control: FormGroup): ValidationErrors | null {
    const password = <string>control.value;
    if (!password) { return null; }
    const uniqueCharCount = password.split('').filter((value, index, array) => value && array.indexOf(value) === index).length;
    const valid = password.length >= 8 && uniqueCharCount >= 5;
    return valid ? null : { 'passwordInvalid': true };
  }

  @HostListener('document:keydown.enter')
  register(): void {
    if (!this.form.valid || this.loading) { return; }
    this.loading = true;
    const registerModel = <RegisterModel>this.form.value;
    this.authenticationService.register(registerModel).subscribe(() => {
      this.snackNotificationService.notify(new SnackNotificationModel({
        type: SnackNotificationType.Success,
        message: 'Registration Successful'
      }));
      this.router.navigateByUrl('/containers');
    },
    () => this.loading = false);
  }
}
