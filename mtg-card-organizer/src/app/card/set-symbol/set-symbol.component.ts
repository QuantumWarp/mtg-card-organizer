import { Component, Input, ElementRef, OnInit, ViewChild, SimpleChanges } from '@angular/core';

import { Card } from '../models/card';
import { Set } from '../models/set';
import { Rarity } from '../models/rarity';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-ss',
  templateUrl: './set-symbol.component.html'
})
export class SetSymbolComponent implements OnChanges {
  @ViewChild('ssField') ssField: ElementRef;
  @Input() card: Card;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sets) {
      const set = this.sets.find(x => x.id === this.card.setId);
      this.ssField.nativeElement.classList.add('ss-' + set.code.toLowerCase());
    }
    this.ssField.nativeElement.classList.add(SetSymbolComponent.toRarityClass(this.card.rarity));
    this.ssField.nativeElement.classList.add();
    if (this.size > 0) {
      this.ssField.nativeElement.classList.add('ss-' + this.size + 'x');
    }
    if (this.grad) {
      this.ssField.nativeElement.classList.add('ss-grad');
    }
  }
}
