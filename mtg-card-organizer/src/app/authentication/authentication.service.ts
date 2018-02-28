import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private oauthService: OAuthService) {}

  initForPasswordFlow(): void {
    this.oauthService.clientId = 'mtg-card-organizer-client';
    this.oauthService.scope = 'openid mtg-card-organiser';
    this.oauthService.setStorage(sessionStorage);
    // Adds no additional security but one is sometime required.
    this.oauthService.dummyClientSecret = 'dummysecret';

    const url = environment.identityServerUrl + '/identity/.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      // Do what ever you want here
    });
  }

  login(username: string, password: string): void {
    this.oauthService.fetchTokenUsingPasswordFlow(username, password);
  }

  logout(): void {
    this.oauthService.logOut();
  }

  register(): void {

  }

  unregister(): void {

  }
}
