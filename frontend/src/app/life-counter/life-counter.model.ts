import { LifeCounterConfig } from './life-counter-config.model';
export class LifeCounter {
  name: string;
  life: number;
  selected = false;

  constructor(name: string, startingLife: number) {
    this.name = name;
    this.life = startingLife;
  }

  adjustLife(gain: boolean, amount: number) {
    this.life = this.life + ((gain ? 1 : -1) * amount);
  }
}

export class LifeCounterModel {
  lifeCounters = new Array<LifeCounter>();

  get selectedLifeCounters(): Array<LifeCounter> {
    return this.lifeCounters.filter(x => x.selected);
  }

  adjustLife(gain: boolean, amount: number, selectedOnly = true) {
    const lifeCounters = selectedOnly ? this.selectedLifeCounters : this.lifeCounters;
    lifeCounters.forEach(lifeCounter => {
      lifeCounter.adjustLife(gain, amount);
    });
  }

  resetCounters(config: LifeCounterConfig): void {
    this.lifeCounters.length = 0;
    config.playerNames.forEach(name => {
      const lifeCounter = new LifeCounter(name, config.startingLife);
      this.lifeCounters.push(lifeCounter);
    });
  }
}
