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

const conditionalModules = [];
if (environment.testSettings && environment.testSettings.includeTestModule) {
  conditionalModules.push(TestModule);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    ...conditionalModules,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    GeneralModule,
    AppRoutingModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
