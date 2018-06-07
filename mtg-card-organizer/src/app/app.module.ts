import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MockingModule } from './test/mocking.module';
import { TestModule } from './test/test.module';

const testModules = [];
if (environment.testSettings && environment.testSettings.includeTestModule) {
  testModules.push(TestModule.forRoot());
  testModules.push(MockingModule.forRoot());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...testModules,
    CoreModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
