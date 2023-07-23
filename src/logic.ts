import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  playerState: {
    [playerId: string]: {
      score: number;
    };
  };
}

type GameActions = {
  setScore: (score: number) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      playerState: allPlayerIds.reduce<GameState["playerState"]>((acc, playerId) => {
        return {
          ...acc,
          [playerId]: {
            score: 0,
          },
        };
      }, {}),
    };
  },
  actions: {
    setScore: (score, { playerId, game }) => {
      game.playerState[playerId].score = score;
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.playerState[playerId] = {
        score: 0,
      };
    },
    playerLeft(playerId, { game }) {
      delete game.playerState[playerId];
    },
  },
});
