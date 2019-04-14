import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuard } from '../authentication/services/auth.guard';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { VersionService } from '../authentication/services/version.service';
import { HomeComponent } from '../home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { ApiService } from './communication/api.service';
import { ErrorInterceptor } from './communication/error.interceptor';
import { ContentComponent } from './content/content.component';
import { GravatarService } from './gravatar/gravatar.service';
import { StandardLayoutComponent } from './layouts/standard-layout.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { NavigationModule } from './navigation/navigation.module';
import { SnackNotificationComponent } from './notifications/snack-notification.component';
import { SnackNotificationService } from './notifications/snack-notification.service';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: [environment.apiBaseUrl.replace('https://', '')],
    blacklistedRoutes: [
      environment.apiBaseUrl + 'api/auth/login',
      environment.apiBaseUrl + 'api/auth/register',
    ]
  };
}

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    StandardLayoutComponent,
    ContentComponent,
    SnackNotificationComponent,
    LoadingComponent,
  ],
  entryComponents: [
    AboutComponent,
    SnackNotificationComponent,
    LoadingComponent,
  ],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    RouterModule.forRoot([]),
    SharedModule,

    NavigationModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    HomeComponent,
    StandardLayoutComponent,
    ContentComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    AuthenticationService,
    AuthGuard,
    ApiService,
    GravatarService,
    SnackNotificationService,
    LoadingService,
    VersionService,
  ]
})
export class CoreModule { }
