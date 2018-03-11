import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralModule } from './general/general.module';
import { SharedModule } from './general/shared.module';
import { HomeComponent } from './home/home.component';
import { TestModule } from './test/test.module';
import { FormsModule } from '@angular/forms';
import { StandardLayoutComponent } from './general/layouts/standard-layout.component';
import { OAuthService, UrlHelperService, OAuthModule } from 'angular-oauth2-oidc';
import { AuthenticationService } from './authentication/services/authentication.service';
import { AuthApiService } from './authentication/services/auth-api.service';
import { AuthGuard } from './authentication/services/auth.guard';

const conditionalModules = [];
if (environment.testSettings && environment.testSettings.includeTestModule) {
  conditionalModules.push(TestModule);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandardLayoutComponent,
  ],
  imports: [
    ...conditionalModules,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    GeneralModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    OAuthService,
    UrlHelperService,
    AuthApiService,
    AuthenticationService,
    AuthGuard,
  ]
})
export class AppModule { }
