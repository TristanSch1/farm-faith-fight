import { Card } from "../Card.ts";

export type GameActions = {
  startGame: () => void;
  ready: () => void;
  playCard: (card: Card) => void;
  throwCard: () => void;
};
