import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';
import { GeneralModule } from './general/general.module';
import { PageModule } from './pages/page.module';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component/app.component';
import { environment } from '../environments/environment';
import { MockingModule } from './mocking.module';

const conditionalModules = [];
if (environment.mockApi) {
  conditionalModules.push(MockingModule.forRoot());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...conditionalModules,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    GeneralModule,
    PageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
