import { Empire } from "./lib/Empire";
import { GameState } from "./lib/types/GameState.ts";
import { makeDeck, shuffleCardTemplates } from "./lib/helpers/CardHelper.ts";

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
            deck: shuffleCardTemplates(),
            actualDeck: [],
            cursor: 0,
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
    prepareDeck: (_, { game, playerId }) => {
      game.players[playerId].actualDeck = makeDeck();
    },
    drawCard: (_, { game, playerId }) => {
      // const randomIndex = Math.floor(Math.random() * availableEmpires.length);
      const cardType = game.players[playerId].deck[game.players[playerId].cursor];
      const cardToPlay = game.players[playerId].actualDeck.find((card) => card.template.id === cardType);
      game.players[playerId].cursor++;
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        empire: new Empire(getRandomEmpireName(game.players)),
        state: "waiting",
        deck: shuffleCardTemplates(),
        actualDeck: [],
        cursor: 0,
      };
    },
    playerLeft(playerId, { game }) {
      delete game.players[playerId];
    },
  },
});
