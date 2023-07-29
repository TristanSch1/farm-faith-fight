import { Empire } from "../Empire.ts";

export type PlayerState = "waiting" | "ready";

export interface GameState {
  players: {
    [playerId: string]: {
      empire: Empire;
      state: PlayerState;
      turns: number;
    };
  };
  gameStarted: boolean;
}
