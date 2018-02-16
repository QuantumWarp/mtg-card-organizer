import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../general/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      // { path: 'login', component: LoginComponent }
    ]),
  ],
  providers: [
  ]
})
export class AuthenticationModule {}
