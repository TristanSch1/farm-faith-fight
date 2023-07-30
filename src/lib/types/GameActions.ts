import { TCard } from "../Card.ts";

export type GameActions = {
  startGame: () => void;
  ready: () => void;
  playCard: ({ card, randomPlayerIdTarget }: { card: TCard; randomPlayerIdTarget: string }) => void;
  throwCard: () => void;
  gameOver: () => void;
};
