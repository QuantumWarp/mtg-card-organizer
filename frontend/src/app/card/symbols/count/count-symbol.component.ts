import { Component, Input } from '@angular/core';

@Component({
  selector: 'mco-count-symbol',
  templateUrl: './count-symbol.component.html',
  styleUrls: ['./count-symbol.component.scss'],
})
export class CountSymbolComponent {
  @Input() count: number;
}
