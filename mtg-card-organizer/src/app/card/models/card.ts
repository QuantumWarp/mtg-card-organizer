import { Rarity } from './rarity';

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

    // Card Set Info
    cardSetInfoId: number;
    num: string;
    setId: number;
    rarity: Rarity;
    artist: string;
    multiverseId: string;

    // Card Other Info
    foil: boolean;
    promo: boolean;

    imageUrl: string;

    public constructor(init?: Partial<Card>) {
      Object.assign(this, init);
    }
}
