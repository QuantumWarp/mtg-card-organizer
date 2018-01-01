export class LifeCounterModel {
    startingLife = 20;
    lifeCounters = new Array<LifeCounter>();

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

    resetCounters(): void {
        this.lifeCounters.forEach(lifeCounter => {
            lifeCounter.reset(this.startingLife);
        });
    }

    static default(): LifeCounterModel {
        return new LifeCounterModel(20, 2);
    }
}

export class LifeCounter {
    life: number;

    constructor(startingLife: number) {
        this.reset(startingLife);
    }

    reset(startingLife: number): void {
        this.life = startingLife;
    }
}