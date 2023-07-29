import { Empire } from "../Empire.ts";
import { TCard } from "../Card.ts";
import { TCardType } from "../CardDictionnary.ts";

export type PlayerState = "waiting" | "ready";

export interface GameState {
  players: {
    [playerId: string]: {
      empire: Empire;
      state: PlayerState;
      deck: TCardType[];
      actualDeck: TCard[];
      cursor: number;
    };
  };
  gameStarted: boolean;
}
