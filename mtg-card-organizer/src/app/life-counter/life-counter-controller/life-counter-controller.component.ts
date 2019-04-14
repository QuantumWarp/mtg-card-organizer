import { Component, HostListener, Input, OnInit } from '@angular/core';

import { LifeCounterModel } from '../life-counter.model';
import { LifeCounterHandler } from './life-counter-handler';

@Component({
  selector: 'mco-life-counter-controller',
  templateUrl: './life-counter-controller.component.html'
})
export class LifeCounterControllerComponent implements OnInit {
  @Input() lifeCounterModel: LifeCounterModel;
  private lifeCounterHandler: LifeCounterHandler;

  ngOnInit() {
    this.lifeCounterHandler = new LifeCounterHandler(this.lifeCounterModel);
  }

  resetCounters(): void {
    this.lifeCounterModel.resetCounters(false);
  }

  @HostListener('document:keyup', ['$event'])
  keyPress(keyEvent: KeyboardEvent): void {
    this.lifeCounterHandler.handleKeyPress(keyEvent);
  }
}
