import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { AuthApiService } from "./auth-api.service";
import { RegisterModel } from "../models/register.model";
import { decode } from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
    tokenInfo: any;

    get hasValidToken(): boolean {
        return this.oauthService.hasValidAccessToken() && this.tokenInfo;
    }

    constructor(
        private oauthService: OAuthService,
        private authApiService: AuthApiService) {}

    configure(): void {
        this.oauthService.issuer = 'http://localhost:5000';
        this.oauthService.clientId = 'mtg-card-organiser-client';
        this.oauthService.scope = 'openid profile mtg-card-organiser';
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.dummyClientSecret = "dummysecret";
        const uri = 'http://localhost:5000/.well-known/openid-configuration';
        if (this.oauthService.hasValidAccessToken()) {
            this.parseToken(this.oauthService.getAccessToken());
        }
        this.oauthService.loadDiscoveryDocument(uri);
    }

    register(username: string, email: string, password: string, confirmPassword: string): Promise<{}> {
        const registerModel: RegisterModel =  {
            // username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        return this.authApiService.post('api/auth/register', registerModel).toPromise();
    }

    login(username: string, password: string): Promise<void> {
        return this.oauthService.fetchTokenUsingPasswordFlow(username, password)
            .then((token) => this.parseToken(token));
    }

    logout(): void {
        this.oauthService.logOut();
    }

    private parseToken(token: any): void {
        const decodedToken = decode(token);
        console.log(decodedToken); 
        this.tokenInfo = {};
    }
}
