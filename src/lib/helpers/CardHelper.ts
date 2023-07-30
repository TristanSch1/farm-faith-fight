import gameConfig from "../../game.config.ts";
import { cardDictionnary, TCardType } from "../CardDictionnary.ts";
import { Card } from "../Card.ts";
import { CardFactory } from "../CardFactory.ts";
import { shuffle } from "remeda";
import { TCATEGORY, TRACE } from "../CardTemplate.ts";

export function makeDeck() {
  const deck: Card[] = [];
  Object.entries(gameConfig.deck).map(([cardType, nbCard]) => {
    deck.push(...CardFactory.bulkBuildCard(cardType as TCardType, nbCard));
  });
  return shuffle(deck);
}

export function getBuildingByCategory(category: TCATEGORY) {
  return Object.values(cardDictionnary)
    .filter((card) => card.template.category === category)
    .map((card) => card.template.id);
}

export const BONUMALUS_DAMAGE: { [race in TRACE]: { [race in TRACE]: number } } = {
  NONE: {
    NONE: -2,
    NEUTRAL: -3,
    HUMAN: -4,
    ORC: -4,
    ELVE: -4,
    UNDEAD: -4,
  },
  NEUTRAL: {
    NONE: 2,
    NEUTRAL: 0,
    HUMAN: -2,
    ORC: -2,
    ELVE: -2,
    UNDEAD: -2,
  },
  HUMAN: {
    NONE: 5,
    NEUTRAL: 2,
    HUMAN: -1,
    ORC: -3,
    ELVE: 0,
    UNDEAD: 3,
  },
  ORC: {
    NONE: 5,
    NEUTRAL: 2,
    HUMAN: 3,
    ORC: -1,
    ELVE: -3,
    UNDEAD: 0,
  },
  ELVE: {
    NONE: 5,
    NEUTRAL: 2,
    HUMAN: 0,
    ORC: 3,
    ELVE: -1,
    UNDEAD: -3,
  },
  UNDEAD: {
    NONE: 5,
    NEUTRAL: 2,
    HUMAN: -3,
    ORC: 0,
    ELVE: 3,
    UNDEAD: -1,
  },
};
