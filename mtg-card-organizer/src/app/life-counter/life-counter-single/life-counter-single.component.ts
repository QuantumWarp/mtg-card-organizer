import { Component, ViewEncapsulation, Input } from '@angular/core';
import { LifeCounter } from '../life-counter.model';

@Component({
  selector: 'app-life-counter-single',
  templateUrl: './life-counter-single.component.html'
})
export class LifeCounterSingleComponent {
  @Input() lifeCounter: LifeCounter;
}
