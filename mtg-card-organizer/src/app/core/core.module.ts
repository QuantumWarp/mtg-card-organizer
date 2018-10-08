import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { VersionService } from '../authentication/services/version.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { AboutComponent } from './about/about.component';

export function jwtTokenGetter()  {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AboutComponent,
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
    AboutComponent,
    SnackNotificationComponent,
    LoadingComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [environment.apiBaseUrl.replace('https://', '')],
        blacklistedRoutes: [
          environment.apiBaseUrl + 'api/auth/login',
          environment.apiBaseUrl + 'api/auth/register',
        ]
      }
    }),
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
