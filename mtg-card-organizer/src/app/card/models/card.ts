export class Card {
  id: number;

  name: string;
  manaCost: string;
  convertedManaCost: string;
  power: string;
  toughness: string;
  oracleText: string;
  type: string;

  public constructor(init?: Partial<Card>) {
    Object.assign(this, init);
  }
}
