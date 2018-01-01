import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardMockInterceptor } from '../card/services/card-mock.interceptor';
import { SetMockInterceptor } from '../card/services/set-mock.interceptor';

const mockBackendFixtures = [
  CardMockInterceptor,
  SetMockInterceptor,
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
