import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CardInstance } from '../../../collection/models/card-instance';
import { CardSet } from '../../models/card-set';

@Component({
  templateUrl: './card-details-modal.component.html',
  styleUrls: ['./card-details-modal.component.scss'],
})
export class CardDetailsModalComponent {
  @Input() cardInstance: CardInstance;

  constructor(@Inject(MAT_DIALOG_DATA) public cardSet: CardSet) { }
}
