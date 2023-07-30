import gameConfig from "../../game.config.ts";
import { TCardType } from "../CardDictionnary.ts";
import { Card } from "../Card.ts";
import { CardFactory } from "../CardFactory.ts";
import { shuffle } from "remeda";

export function makeDeck() {
  const deck: Card[] = [];
  Object.entries(gameConfig.deck).map(([cardType, nbCard]) => {
    deck.push(...CardFactory.bulkBuildCard(cardType as TCardType, nbCard));
  });
  return shuffle(deck);
}
