import { Empire } from "./lib/Empire";
import { GameState } from "./lib/types/GameState.ts";

// TODO - Mettre les vrais empires
const EMPIRE_NAMES = ["Orcs", "Elves", "Dwarves", "Humans"];
const getRandomEmpireName = (players: GameState["players"]) => {
  const empireNames = Object.values(players).map((player) => player.empire.name);

  const availableEmpires = EMPIRE_NAMES.filter((empire) => !empireNames.includes(empire));

  const randomIndex = Math.floor(Math.random() * availableEmpires.length);
  return availableEmpires[randomIndex];
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      players: allPlayerIds.reduce<GameState["players"]>((acc, playerId) => {
        return {
          ...acc,
          [playerId]: {
            empire: new Empire(getRandomEmpireName(acc)),
            state: "waiting",
          },
        };
      }, {}),
      gameStarted: false,
    };
  },
  actions: {
    startGame: (_, { game }) => {
      if (game.gameStarted) throw Rune.invalidAction();

      game.gameStarted = true;
    },
    ready: (_, { game, playerId }) => {
      if (game.gameStarted) throw Rune.invalidAction();
      console.log("ready", playerId);
      game.players[playerId].state = "ready";
    },
    notReady: (_, { game, playerId }) => {
      if (!game.gameStarted) throw Rune.invalidAction();

      game.players[playerId].state = "waiting";
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        empire: new Empire(getRandomEmpireName(game.players)),
        state: "waiting",
      };
    },
    playerLeft(playerId, { game }) {
      delete game.players[playerId];
    },
  },
});
