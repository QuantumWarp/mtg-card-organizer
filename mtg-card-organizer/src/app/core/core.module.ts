import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService, UrlHelperService, OAuthModule, ValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

import { AuthApiService } from '../authentication/services/auth-api.service';
import { AuthGuard } from '../authentication/services/auth.guard';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { HomeComponent } from '../home/home.component';
import { ApiService } from './communication/api.service';
import { ContentComponent } from './content/content.component';
import { StandardLayoutComponent } from './layouts/standard-layout.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { NavNodeComponent } from './navigation/nav-node.component';
import { NavigatorComponent } from './navigation/navigator.component';
import { GravatarService } from './gravatar/gravatar.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SnackNotificationComponent } from './notifications/snack-notification.component';
import { SnackNotificationService } from './notifications/snack-notification.service';
import { ErrorInterceptor } from './communication/error.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { UserService } from '../authentication/services/user.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    StandardLayoutComponent,
    ContentComponent,
    NavBarComponent,
    NavNodeComponent,
    NavigatorComponent,
    SnackNotificationComponent,
    LoadingComponent,
  ],
  entryComponents: [
    SnackNotificationComponent,
    LoadingComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthApiService,
    AuthenticationService,
    AuthGuard,
    ApiService,
    GravatarService,
    SnackNotificationService,
    LoadingService,
    UserService,
  ]
})
export class CoreModule { }
