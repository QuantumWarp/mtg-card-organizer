import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ConvertedCard } from '../../../collection/models/converted-card';

@Component({
  templateUrl: './card-details-modal.component.html',
  styleUrls: ['./card-details-modal.component.scss'],
})
export class CardDetailsModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public convertedCard: ConvertedCard,
  ) { }
}
