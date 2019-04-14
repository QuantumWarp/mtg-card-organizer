import { Component, Input } from '@angular/core';

import { LifeCounter } from '../life-counter.model';

@Component({
  selector: 'mco-life-counter-single',
  templateUrl: './life-counter-single.component.html',
  styleUrls: ['./life-counter-single.component.scss'],
})
export class LifeCounterSingleComponent {
  @Input() lifeCounter: LifeCounter;
}
