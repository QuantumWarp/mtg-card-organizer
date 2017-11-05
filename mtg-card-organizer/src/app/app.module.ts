import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';
import { GeneralModule } from './general/general.module';
import { PageModule } from './pages/page.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component/app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    GeneralModule,
    PageModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
