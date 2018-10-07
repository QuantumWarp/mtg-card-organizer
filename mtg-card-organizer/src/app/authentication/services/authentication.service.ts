import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RegisterModel } from '../models/register.model';
import { ApiService } from '../../core/communication/api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class AuthenticationService {
  tokenInfo: any;

  get baseContainerId(): string {
    return this.tokenInfo.baseContainerId;
  }

  get username(): string {
    return this.tokenInfo.username;
  }

  get email(): string {
    return this.tokenInfo.email;
  }

  get roles(): string[] {
    if (!this.tokenInfo) { return []; }
    const key = Object.keys(this.tokenInfo).find(x => x.endsWith('role'));
    const value = this.tokenInfo[key];
    return value instanceof Array ? value : [ value ];
  }

  constructor(
    private apiService: ApiService,
    private jwtHelperService: JwtHelperService
  ) { }

  register(username: string, email: string, password: string, confirmPassword: string): Observable<void> {
    const registerModel: RegisterModel = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.apiService.post<void>('api/auth/register', registerModel);
  }

  login(loginName: string, password: string): Observable<string> {
    return this.apiService.post<string>('api/auth/login', {
      loginName: loginName,
      password: password
    }).pipe(
      tap((token) => this.parseToken(token))
    );
  }

  logout(): void {
    this.tokenInfo = undefined;
    localStorage.removeItem('access_token');
  }

  hasValidToken(): boolean {
    const accessToken = localStorage.getItem('access_token');
    this.parseToken(accessToken);
    return accessToken && !this.jwtHelperService.isTokenExpired(accessToken);
  }

  private parseToken(token: string): void {
    this.tokenInfo = this.jwtHelperService.decodeToken(token);
    if (this.tokenInfo) {
      localStorage.setItem('access_token', token);
    }
  }
}
