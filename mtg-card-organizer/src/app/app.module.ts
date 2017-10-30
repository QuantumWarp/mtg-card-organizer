import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CardServiceComponent } from './cards/card-service/card-service.component';
import { CardDetailsComponent } from './cards/card-details/card-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CardServiceComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
