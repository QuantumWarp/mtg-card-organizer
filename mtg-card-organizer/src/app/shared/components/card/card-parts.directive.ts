import { Directive } from '@angular/core';

@Directive({
  selector: 'mco-card-header, [mcoCardHeader]',
})
export class CardHeaderDirective { }

@Directive({
  selector: 'mco-card-actions, [mcoCardActions]',
})
export class CardActionsDirective { }
