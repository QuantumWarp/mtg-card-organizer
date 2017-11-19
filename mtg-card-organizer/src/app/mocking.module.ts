import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardsMockInterceptor } from './cards/card-service/cards-mock.interceptor';

const mockBackendFixtures = [
  CardsMockInterceptor
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
