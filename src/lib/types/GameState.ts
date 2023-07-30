import { Empire } from "../Empire.ts";

export type PlayerState = "waiting" | "ready";

export interface GameState {
  players: {
    [playerId: string]: {
      empire: Empire;
      state: PlayerState;
    };
  };
  gameStarted: boolean;
}
