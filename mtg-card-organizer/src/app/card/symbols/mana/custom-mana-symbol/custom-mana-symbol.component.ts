import { Component, Input } from '@angular/core';

@Component({
  selector: 'mco-custom-ms',
  templateUrl: './custom-mana-symbol.component.html',
  styleUrls: ['./custom-mana-symbol.component.scss'],
})
export class CustomManaSymbolComponent {
  @Input() symbolString: string;

  get unknown(): boolean {
    return !this.isNumber && !['X', 'C', 'B', 'U', 'G', 'R', 'W'].includes(this.symbolString);
  }

  get isNumber(): boolean {
    return !isNaN(Number(this.symbolString));
  }

  @Input() size = 1;
  @Input() shadow = true;
}
