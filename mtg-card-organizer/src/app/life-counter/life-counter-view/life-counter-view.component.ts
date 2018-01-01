import { Component, ViewEncapsulation } from '@angular/core';
import { LifeCounterModel } from '../life-counter.model';

@Component({
  templateUrl: './life-counter-view.component.html'
})
export class LifeCounterViewComponent {
  lifeCounterModel = LifeCounterModel.default();
}
