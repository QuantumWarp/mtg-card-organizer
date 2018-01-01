import { Component, ViewEncapsulation, Input } from '@angular/core';
import { LifeCounterModel } from '../life-counter.model';

@Component({
  selector: 'app-life-counter-controller',
  templateUrl: './life-counter-controller.component.html'
})
export class LifeCounterControllerComponent {
  @Input() lifeCounterModel: LifeCounterModel;

  resetCounters(): void {
    this.lifeCounterModel.resetCounters();
  }
}
