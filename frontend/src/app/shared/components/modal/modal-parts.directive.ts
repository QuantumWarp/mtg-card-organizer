import { Directive } from '@angular/core';

@Directive({
  selector: 'mco-modal-header, [mcoModalHeader]',
})
export class ModalHeaderDirective { }

@Directive({
  selector: 'mco-modal-actions, [mcoModalActions]',
})
export class ModalActionsDirective { }
