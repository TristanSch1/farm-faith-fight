import gameConfig from "../../game.config.ts";
import { TCardType } from "../CardDictionnary.ts";
import { Card } from "../Card.ts";
import { CardFactory } from "../CardFactory.ts";
import { shuffle } from "remeda";

export function shuffleCardTemplates() {
  const cardsToDraw: TCardType[] = [];
  for (const [cardType, nbOfCard] of Object.entries(gameConfig.deck)) {
    for (let i = 1; i <= nbOfCard; i++) {
      cardsToDraw.push(cardType as TCardType);
    }
  }
  return shuffle(cardsToDraw);
}

export function makeDeck() {
  const deck: Card[] = [];
  Object.entries(gameConfig.deck).map(([cardType, nbCard]) => {
    deck.push(...CardFactory.bulkBuildCard(cardType as TCardType, nbCard));
  });
  return shuffle(deck);
}
