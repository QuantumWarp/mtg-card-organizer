import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthApiService } from './authentication/services/auth-api.service';
import { AuthGuard } from './authentication/services/auth.guard';
import { AuthenticationService } from './authentication/services/authentication.service';
import { CoreModule } from './general/core.module';
import { StandardLayoutComponent } from './general/layouts/standard-layout.component';
import { HomeComponent } from './home/home.component';
import { TestModule } from './test/test.module';

const testModule = [];
if (environment.testSettings && environment.testSettings.includeTestModule) {
  testModule.push(TestModule);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...testModule,
    CoreModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
