import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'mco-real-ms',
  templateUrl: './real-mana-symbol.component.html'
})
export class RealManaSymbolComponent implements OnChanges {
  @ViewChild('msField') msField: ElementRef;
  @Input() symbolString: string;

  @Input() size = 1;
  @Input() shadow = true;

  static symbolToClass(symbol: String): string {
    symbol = symbol.toLowerCase();
    return 'ms-' + symbol;
  }

  ngOnChanges(): void {
    if (this.shadow) {
      this.msField.nativeElement.classList.add('ms-shadow');
    }

    this.msField.nativeElement.classList.add(RealManaSymbolComponent.symbolToClass(this.symbolString));

    if (this.size > 0) {
      this.msField.nativeElement.classList.add('ms-' + this.size + 'x');
    }
  }
}
