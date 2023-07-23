import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  playerState: {
    [playerId: string]: {
      name: string;
      score: number;
    };
  };
}

type GameActions = {
  setPlayerName: (params: { name: string }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      playerState: allPlayerIds.reduce<GameState["playerState"]>((acc, playerId, index) => {
        return {
          ...acc,
          [playerId]: {
            name: `Player ${index + 1}`,
            score: 0,
          },
        };
      }, {}),
    };
  },
  actions: {
    setPlayerName: ({ name }, { game, playerId }) => {
      game.playerState[playerId].name = name;
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.playerState[playerId] = {
        name: `Player ${Object.keys(game.playerState).length + 1}`,
        score: 0,
      };
    },
    playerLeft(playerId, { game }) {
      delete game.playerState[playerId];
    },
  },
});
