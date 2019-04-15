export class Card {
  id: number;

  name: string;
  manaCost: string;
  convertedManaCost: string;
  power: string;
  toughness: string;
  text: string;
  type: string;

  public constructor(init?: Partial<Card>) {
    Object.assign(this, init);
  }
}
