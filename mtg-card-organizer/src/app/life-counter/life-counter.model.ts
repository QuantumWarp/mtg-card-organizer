export class LifeCounterModel {
    startingLife = 20;
    lifeCounters = new Array<LifeCounter>();
    get selectedLifeCounters(): Array<LifeCounter> {
      return this.lifeCounters.filter(x => x.selected);
    }

    static default(): LifeCounterModel {
      return new LifeCounterModel(20, 2);
    }

    constructor(startingLife: number, playerCount: number) {
      this.startingLife = startingLife;
      this.addPlayers(playerCount);
    }

    addPlayers(amount: number): void {
      if (amount > 0) {
        for (let x = 0; x < amount; x++) {
            this.lifeCounters.push(new LifeCounter(this.startingLife));
        }
      } else if (amount < 0) {
        for (let x = 0; -x < amount; x++) {
            this.lifeCounters.pop();
        }
      }
    }

    adjustLife(gain: boolean, amount: number, selectedOnly = true) {
      const lifeCounters = selectedOnly ? this.selectedLifeCounters : this.lifeCounters;
      lifeCounters.forEach(lifeCounter => {
        lifeCounter.adjustLife(gain, amount);
      });
    }

    resetCounters(selectedOnly = true): void {
      const lifeCounters = selectedOnly ? this.selectedLifeCounters : this.lifeCounters;
      lifeCounters.forEach(lifeCounter => {
          lifeCounter.reset(this.startingLife);
      });
    }
}

export class LifeCounter {
  life: number;
  selected = false;

  constructor(startingLife: number) {
    this.reset(startingLife);
  }

  reset(startingLife: number): void {
    this.life = startingLife;
  }

  adjustLife(gain: boolean, amount: number) {
    this.life = this.life + ((gain ? 1 : -1) * amount);
  }
}
