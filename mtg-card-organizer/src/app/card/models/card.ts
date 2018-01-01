export class Card {
    cardId: string;
    name: string;
    power: string;
    toughness: string;
    oracleText: string;
    cost: string;
    imageUrl: string;

    public constructor(init?: Partial<Card>) {
      Object.assign(this, init);
    }
}
