export class LifeCounterConfig {
  constructor(
    public startingLife = 20,
    public playerNames = ['Player 1', 'Player 2'],
  ) { }

  retrieve(): void {
    const startingLife = localStorage.getItem('lifeCounterConfig.startingLife');
    this.startingLife = startingLife ? Number(startingLife) : this.startingLife;
    const playerNames = localStorage.getItem('lifeCounterConfig.playerNames');
    this.playerNames = playerNames ? JSON.parse(playerNames) : this.playerNames;
  }

  persist(): void {
    localStorage.setItem('lifeCounterConfig.startingLife', this.startingLife.toString());
    localStorage.setItem('lifeCounterConfig.playerNames', JSON.stringify(this.playerNames));
  }
}
