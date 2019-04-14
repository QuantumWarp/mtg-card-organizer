import { Component } from '@angular/core';

import { LifeCounterModel } from '../life-counter.model';

@Component({
  templateUrl: './life-counter-view.component.html',
  styleUrls: ['./life-counter-view.component.scss'],
})
export class LifeCounterViewComponent {
  lifeCounterModel = LifeCounterModel.default();
}
