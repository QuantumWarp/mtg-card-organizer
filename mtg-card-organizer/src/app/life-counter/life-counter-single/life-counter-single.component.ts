import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LifeCounter } from '../life-counter.model';

@Component({
  selector: 'mco-life-counter-single',
  templateUrl: './life-counter-single.component.html',
  styleUrls: ['../life-counter.css']
})
export class LifeCounterSingleComponent {
  @Input() lifeCounter: LifeCounter;
}
