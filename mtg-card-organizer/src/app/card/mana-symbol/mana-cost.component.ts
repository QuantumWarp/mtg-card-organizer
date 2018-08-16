import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import { Card } from '../models/card';

@Component({
  selector: 'app-mc',
  templateUrl: './mana-cost.component.html'
})
export class ManaCostComponent implements OnChanges {
  @ViewChild('msField') msField: ElementRef;
  @Input() card: Card;
  @Input() manaCost: string;

  @Input() size = 1;
  @Input() shadow = true;

  symbolStringArray = new Array<string>();

  ngOnChanges(): void {
    if (this.card) {
      this.manaCost = this.card.manaCost;
    }

    if (this.manaCost) {
      this.symbolStringArray = this.manaCost.split(new RegExp('[{|}]')).filter(x => x !== '');
    }
  }
}
