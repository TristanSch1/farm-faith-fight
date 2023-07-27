import { Card } from "./Card";
import { TCardType, cardDictionnary } from "./CardDictionnary";

export class CardFactory {
  constructor() {}

  static buildCard(cardType: TCardType) {
    new Card({ template: cardDictionnary[cardType].template, effect: cardDictionnary[cardType].effects });
    return new Card({ template: cardDictionnary[cardType].template, effect: cardDictionnary[cardType].effects });
  }

  static bulkBuildCard(cardType: TCardType, nb: number) {
    return Array.from(Array(nb)).map(() => CardFactory.buildCard(cardType));
  }
}
