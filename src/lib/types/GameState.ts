import { Empire } from "../Empire.ts";

export type PlayerState = "waiting" | "ready" | "dead";

export interface GameState {
  players: {
    [playerId: string]: {
      empire: Empire;
      state: PlayerState;
    };
  };
  gameStarted: boolean;
}
