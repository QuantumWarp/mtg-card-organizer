import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomManaSymbolComponent } from './mana/custom-mana-symbol/custom-mana-symbol.component';
import { ManaCostComponent } from './mana/mana-cost/mana-cost.component';
import { RealManaSymbolComponent } from './mana/real-mana-symbol/real-mana-symbol.component';
import { SetSymbolComponent } from './set/set-symbol.component';
import { CountSymbolComponent } from './count/count-symbol.component';

@NgModule({
  declarations: [
    RealManaSymbolComponent,
    CustomManaSymbolComponent,
    CountSymbolComponent,
    SetSymbolComponent,
    ManaCostComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CountSymbolComponent,
    SetSymbolComponent,
    ManaCostComponent,
  ],
})
export class SymbolsModule {}
