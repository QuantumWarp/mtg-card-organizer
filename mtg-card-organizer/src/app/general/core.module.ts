import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService, UrlHelperService, OAuthModule } from 'angular-oauth2-oidc';

import { AuthApiService } from '../authentication/services/auth-api.service';
import { AuthGuard } from '../authentication/services/auth.guard';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { HomeComponent } from '../home/home.component';
import { ApiService } from './communication/api.service';
import { ConfirmComponent } from './components/confirm.component';
import { ContentComponent } from './content/content.component';
import { StandardLayoutComponent } from './layouts/standard-layout.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { NavNodeComponent } from './navigation/nav-node.component';
import { NavigatorComponent } from './navigation/navigator.component';
import { GravatarService } from './services/gravatar.service';
import { SharedModule } from './shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    StandardLayoutComponent,
    ContentComponent,
    NavBarComponent,
    NavNodeComponent,
    NavigatorComponent,
    ConfirmComponent,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  imports: [
    OAuthModule.forRoot(),
    RouterModule.forChild([]),
    SharedModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    StandardLayoutComponent,
    ContentComponent,
    NavBarComponent,
    NavigatorComponent,
    ConfirmComponent,
  ],
  providers: [
    OAuthService,
    UrlHelperService,
    AuthApiService,
    AuthenticationService,
    AuthGuard,
    ApiService,
    GravatarService,
  ]
})
export class CoreModule { }
