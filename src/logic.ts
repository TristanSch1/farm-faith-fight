import { Empire } from "./lib/Empire";
import { GameState } from "./lib/types/GameState.ts";
import { GameActionsStore } from "./stores/GameActionsStore.ts";

// TODO - Mettre les vrais empires
const EMPIRE_NAMES = ["ELF", "ORC", "HUMAN", "UNDEAD"];

Rune.initLogic({
  minPlayers: 3,
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
      if (game.gameStarted) throw Rune.invalidAction();
      game.gameStarted = true;
    },
    ready: (_, { game, playerId }) => {
      if (game.gameStarted || !game.players?.[playerId]) throw Rune.invalidAction();
      game.players[playerId].state = game.players[playerId].state === "waiting" ? "ready" : "waiting";
    },
    playCard({ card, randomPlayerIdTarget }, { game, playerId }) {
      GameActionsStore.playCard(game, playerId, card, randomPlayerIdTarget);
    },
    throwCard(_, { game, playerId }) {
      GameActionsStore.throwCard(game, playerId);
    },
    gameOver(_, { game, playerId }) {},
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
