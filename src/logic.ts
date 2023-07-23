import type { RuneClient } from "rune-games-sdk/multiplayer";
import { Empire } from "./lib/Empire";

export interface GameState {
  empires: {
    [playerId: string]: Empire;
  }
}

type GameActions = {
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      empires: allPlayerIds.reduce<GameState["empires"]>((acc, playerId) => {
        return {
          ...acc,
          [playerId]: new Empire(),
        };
      }, {}),
    };
  },
  actions: {

  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.empires[playerId] = new Empire()
    },
    playerLeft(playerId, { game }) {
      delete game.empires[playerId];
    },
  },
});
