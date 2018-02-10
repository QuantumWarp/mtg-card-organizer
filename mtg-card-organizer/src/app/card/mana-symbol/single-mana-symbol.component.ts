import { Component, Input, ElementRef, OnInit, ViewChild, SimpleChanges } from '@angular/core';

import { Card } from '../models/card';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-single-ms',
  templateUrl: './single-mana-symbol.component.html'
})
export class SingleManaSymbolComponent implements OnChanges {
  @ViewChild('msField') msField: ElementRef;
  @Input() symbolString: string; 

  @Input() size = 1;
  @Input() shadow = true;

  static symbolToClass(symbol: String): string {
    symbol = symbol.toLowerCase();
    return 'ms-' + symbol;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shadow) {
        this.msField.nativeElement.classList.add('ms-shadow');
    }
    
    this.msField.nativeElement.classList.add(SingleManaSymbolComponent.symbolToClass(this.symbolString));
    
    if (this.size > 0) {
        this.msField.nativeElement.classList.add('ms-' + this.size + 'x');
      }
  }
}
