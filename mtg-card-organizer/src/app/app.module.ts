import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './general/shared.module';
import { GeneralModule } from './general/general.module';

import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MockingModule } from './general/mocking.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

const conditionalModules = [];
if (environment.mockApi) {
  conditionalModules.push(MockingModule.forRoot());
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
