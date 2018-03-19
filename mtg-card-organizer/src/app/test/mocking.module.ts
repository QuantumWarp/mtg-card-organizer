import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CardMockInterceptor } from './fixtures/card-mock.interceptor';
import { CollectionMockInterceptor } from './fixtures/collection-mock.interceptor';
import { SetMockInterceptor } from './fixtures/set-mock.interceptor';
import { NetworkLogInterceptor } from './mocking/network-log-interceptor';

const mockBackendFixtures = [
  NetworkLogInterceptor,

  CardMockInterceptor,
  SetMockInterceptor,
  CollectionMockInterceptor,
];

@NgModule()
export class MockingModule {
  static forRoot(): ModuleWithProviders {
    const providers = mockBackendFixtures.map(x => [{
      provide: HTTP_INTERCEPTORS,
      useClass: x,
      multi: true
    }]);
    return {
      ngModule: MockingModule,
      providers: providers
    };
  }
}
