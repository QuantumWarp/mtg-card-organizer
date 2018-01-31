import { Rarity } from "./rarity";

export class Card {
    // Card
    cardId: number;
    name: string;
    manaCost: string;
    convertedManaCost: string;
    power: string;
    toughness: string;
    oracleText: string;
    type: string;

    cardSetInfoId: number;
    num: string;
    setId: number;
    rarity: Rarity;
    artist: string;

    imageUrl: string;

    public constructor(init?: Partial<Card>) {
      Object.assign(this, init);
    }
}
