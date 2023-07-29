import { Empire } from "./lib/Empire";
import { GameState } from "./lib/types/GameState.ts";
import { gameStore } from "./stores/GameStore.ts";
import { toJS } from "mobx";

// TODO - Mettre les vrais empires
const EMPIRE_NAMES = ["Orcs", "Elves", "Undead", "Humans"];
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
      players: allPlayerIds.reduce<GameState["players"]>((acc, playerId, index) => {
        return {
          ...acc,
          [playerId]: {
            empire: new Empire(EMPIRE_NAMES[index]),
            state: "waiting",
            turns: 0,
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
      if (game.gameStarted || !game.players?.[playerId]) throw Rune.invalidAction();
      game.players[playerId].state = game.players[playerId].state === "waiting" ? "ready" : "waiting";
    },
    playCard(_, { game }) {
      gameStore.playCard();
      //   mettre le store a jour ?
      game.players = toJS(gameStore.game!.players);
    },
    throwCard(_, { game }) {
      gameStore.throwCard();
      game.players = toJS(gameStore.game!.players);
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        empire: new Empire(getRandomEmpireName(game.players)),
        state: "waiting",
        turns: 0,
      };
    },
    playerLeft(playerId, { game }) {
      delete game.players[playerId];
    },
  },
});
