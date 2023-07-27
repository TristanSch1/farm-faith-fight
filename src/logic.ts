import gameConfig from "./game.config.ts";
import { TCardType } from "./lib/CardDictionnary.ts";
import { CardFactory } from "./lib/CardFactory.ts";
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
//TODO: create type
const deck = [];

const test = Object.entries(gameConfig.deck).map(([cardType, nbCard]) => {
  deck.push(...CardFactory.bulkBuildCard(cardType as TCardType, nbCard));
});

console.log(deck);

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
    startGame: (_, { game }) => {
      if (game.gameStarted) throw Rune.invalidAction();

      game.gameStarted = true;
    },
    ready: (_, { game, playerId }) => {
      if (game.gameStarted || !game.players?.[playerId]) throw Rune.invalidAction();
      console.log("ready", playerId);
      game.players[playerId].state = game.players[playerId].state === "waiting" ? "ready" : "waiting";
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
