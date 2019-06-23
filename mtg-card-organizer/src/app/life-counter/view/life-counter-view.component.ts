import { Component, OnInit } from '@angular/core';

import { LifeCounterModel } from '../life-counter.model';
import { LifeCounterConfig } from '../life-counter-config.model';

@Component({
  templateUrl: './life-counter-view.component.html',
  styleUrls: ['./life-counter-view.component.scss'],
})
export class LifeCounterViewComponent implements OnInit {
  lifeCounterModel = new LifeCounterModel();
  lifeCounterConfig = new LifeCounterConfig();

  ngOnInit(): void {
    this.lifeCounterConfig.retrieve();
    this.lifeCounterModel.resetCounters(this.lifeCounterConfig);
  }
}
