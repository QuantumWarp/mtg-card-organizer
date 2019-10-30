import { LifeCounterModel } from '../life-counter.model';

export class LifeCounterHandler {
  constructor(private lifeCounterModel: LifeCounterModel) { }

  handleKeyPress(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === 'ArrowUp' || keyEvent.code === 'ArrowDown') {
      this.lifeCounterModel.adjustLife(keyEvent.code === 'ArrowUp', keyEvent.shiftKey ? 5 : 1);
    }

    if (keyEvent.code === 'ArrowLeft' || keyEvent.code === 'ArrowRight') {
      const selectedCounters = this.lifeCounterModel.lifeCounters.filter(x => x.selected);
      if (selectedCounters.length === 0) {
        this.lifeCounterModel.lifeCounters[0].selected = true;
      } else if (selectedCounters.length === 1) {
        selectedCounters[0].selected = false;
        let index = this.lifeCounterModel.lifeCounters.indexOf(selectedCounters[0]);
        index = index + (keyEvent.code === 'ArrowLeft' ? -1 : 1);
        if (index === -1) {
          index = this.lifeCounterModel.lifeCounters.length - 1;
        } else if (index === this.lifeCounterModel.lifeCounters.length) {
          index = 0;
        }
        this.lifeCounterModel.lifeCounters[index].selected = true;
      }
    }
  }
}
