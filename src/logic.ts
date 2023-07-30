import { Empire } from "./lib/Empire";
import { GameState } from "./lib/types/GameState.ts";
import { GameStore } from "./stores/GameStore.ts";

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
          },
        };
      }, {}),
      gameStarted: false,
    };
  },
  actions: {
    startGame: (_, { game, playerId }) => {
      console.log("startGame", playerId);
      if (game.gameStarted) throw Rune.invalidAction();
      game.gameStarted = true;
    },
    ready: (_, { game, playerId }) => {
      if (game.gameStarted || !game.players?.[playerId]) throw Rune.invalidAction();
      console.log("ready", playerId);
      game.players[playerId].state = game.players[playerId].state === "waiting" ? "ready" : "waiting";
    },
    playCard(playedCard, { game, playerId }) {
      GameStore.playCard(game, playerId, playedCard);
    },
    throwCard(_, { game, playerId }) {
      GameStore.throwCard(game, playerId);
    },
  },
  events: {
    // FB: on ne doit pas laisser des joueurs rejoindre (default behavior)
    // https://developers.rune.ai/docs/advanced/joining-leaving#supporting-players-joining-midgame
    // playerJoined: (playerId, { game }) => {
    //   if (gameStore.game?.gameStarted) return;
    //   game.players[playerId] = {
    //     empire: new Empire(getRandomEmpireName(game.players)),
    //     state: "waiting",
    //   };
    //   eventsStore.send({ type: "playerJoin" });
    // },
    playerLeft(playerId, { game }) {
      delete game.players[playerId];
    },
  },
});
