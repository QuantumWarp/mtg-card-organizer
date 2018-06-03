import { Injectable, NgZone } from '@angular/core';
import {
  OAuthService,
  OAuthStorage,
  ValidationHandler,
  AuthConfig,
  UrlHelperService
} from 'angular-oauth2-oidc';
import { AuthApiService } from './auth-api.service';
import { RegisterModel } from '../models/register.model';
import { decode } from 'jsonwebtoken';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  oauthService: OAuthService;
  tokenInfo: any;

  get username(): string {
    return this.tokenInfo.username;
  }

  get email(): string {
    return this.tokenInfo.email;
  }

  get hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken() && this.tokenInfo;
  }

  get accessToken(): any {
    return this.oauthService.getAccessToken();
  }

  constructor(
    private zone: NgZone,
    private httpClient: HttpClient,
    private storage: OAuthStorage,
    private tokenValidationHandler: ValidationHandler,
    private config: AuthConfig,
    private urlHelper: UrlHelperService,
    private authApiService: AuthApiService
  ) {
    // Running outside angular zone to prevent issues with waitForAngular and protractor.
    this.oauthService = this.zone.runOutsideAngular(() => {
      return new OAuthService(httpClient, storage, tokenValidationHandler, config, urlHelper);
    });
  }

  configure(): void {
    this.oauthService.skipIssuerCheck = true;
    this.oauthService.requireHttps = false;
    this.oauthService.issuer = environment.identityServerUrl;
    this.oauthService.clientId = 'mtg-card-organiser-client';
    this.oauthService.scope = 'openid profile mtg-card-organiser';
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.dummyClientSecret = 'dummysecret';
    const uri = environment.identityServerUrl + '/.well-known/openid-configuration';
    if (this.oauthService.hasValidAccessToken()) {
      this.parseToken(this.oauthService.getAccessToken());
    }
    this.oauthService.loadDiscoveryDocument(uri);
  }

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{}> {
    const registerModel: RegisterModel = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.authApiService
      .post('api/auth/register', registerModel)
      .toPromise();
  }

  login(username: string, password: string): Promise<void> {
    return this.zone.runOutsideAngular(() => {
      return this.oauthService.fetchTokenUsingPasswordFlow(username, password);
    }).then((token: any) => this.parseToken(token.access_token));
  }

  logout(): void {
    this.oauthService.logOut();
  }

  private parseToken(token: any): void {
    this.tokenInfo = decode(token);
  }
}
