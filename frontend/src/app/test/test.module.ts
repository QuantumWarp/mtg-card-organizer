import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { navModel } from '../core/navigation/nav-model';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkLogInterceptor } from './logging/network-log-interceptor';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkLogInterceptor,
      multi: true
    }]
  ]
})
export class TestModule {
  // Need to ensure this module is not loading when testing is disabled.
  static forRoot(): ModuleWithProviders {
    navModel.push({
      text: 'Testing',
      icon: 'build',
      children: [
        {
          text: 'Api Tester',
          icon: 'view_list',
          routerLink: '/test/api-tester',
        }
      ]
    });

    return {
      ngModule: TestModule,
    };
  }
}
