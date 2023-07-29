import { Card } from "./Card";
import { cardDictionnary, TCardType } from "./CardDictionnary";

export class CardFactory {
  static buildCard(cardType: TCardType) {
    return new Card({ template: cardDictionnary[cardType].template, effects: cardDictionnary[cardType].effects });
  }

  static bulkBuildCard(cardType: TCardType, nb: number) {
    return Array.from(Array(nb)).map(() => CardFactory.buildCard(cardType));
  }
}
