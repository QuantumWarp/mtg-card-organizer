import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import { CardSet } from '../models/card-set';
import { Rarity } from '../models/rarity';
import { Set } from '../models/set';

@Component({
  selector: 'mco-ss',
  templateUrl: './set-symbol.component.html'
})
export class SetSymbolComponent implements OnChanges {
  @ViewChild('ssField') ssField: ElementRef;
  @Input() cardSet: CardSet;
  @Input() setId: number;
  @Input() rarity: Rarity;

  @Input() sets: Set[];

  @Input() size = 2;
  @Input() grad = false;

  static toRarityClass(rarity: Rarity): string {
    switch (rarity) {
      case Rarity.Common: return 'ss-common';
      case Rarity.Uncommon: return 'ss-uncommon';
      case Rarity.Rare: return 'ss-rare';
      case Rarity.Mythic: return 'ss-mythic';
      default: return 'ss-common';
    }
  }

  ngOnChanges(): void {
    if (this.cardSet) {
      this.setId = this.cardSet.setId;
      this.rarity = this.cardSet.rarity;
    }
    if (this.sets) {
      const set = this.sets.find(x => x.id === this.setId);
      this.ssField.nativeElement.classList.add('ss-' + set.code.toLowerCase());
    }
    this.ssField.nativeElement.classList.add(SetSymbolComponent.toRarityClass(this.rarity));
    this.ssField.nativeElement.classList.add();
    if (this.size > 0) {
      this.ssField.nativeElement.classList.add('ss-' + this.size + 'x');
    }
    if (this.grad) {
      this.ssField.nativeElement.classList.add('ss-grad');
    }
  }
}
