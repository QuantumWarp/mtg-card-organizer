import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';
import { GeneralModule } from './general/general.module';

import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MockingModule } from './mocking.module';
import { CardSearchPageComponent } from './search/card-search-page/card-search-page.component';
import { HomeComponent } from './home/home.component';

const conditionalModules = [];
if (environment.mockApi) {
  conditionalModules.push(MockingModule.forRoot());
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  entryComponents: [
    HomeComponent
  ],
  imports: [
    ...conditionalModules,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    GeneralModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
      { path: 'search', loadChildren: 'app/search/search.module#SearchModule' },
    ]),
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
