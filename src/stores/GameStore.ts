import { makeAutoObservable, observable } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../lib/types/GameState.ts";
import { TCard } from "../lib/Card.ts";
import { makeDeck } from "../lib/helpers/CardHelper.ts";
import { BuildingEffect, BuildingEffectProps } from "../lib/BuildingEffect.ts";
import { ActionEffectProps } from "../lib/ActionEffect.ts";
import gameConfig from "../game.config.ts";
import { cardDictionnary } from "../lib/CardDictionnary.ts";

export class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  playerId = "";
  deck: TCard[] = observable.array(makeDeck());

  constructor() {
    makeAutoObservable(this);

    // Tirage de la premiere carte
    // when(
    //   () => this.isGameStarted && this.turn === -1,
    //   () => {
    //     console.log("1er tour", this.player?.empire.name);
    //     this.setNextTurn();
    //   },
    // );
  }

  get player() {
    if (!this.playerId) return;
    return this.game?.players[this.playerId];
  }

  get isGameStarted() {
    if (!this.game) return false;
    return this.game.gameStarted;
  }

  get allPlayersReady() {
    if (!this.game?.players) return false;
    return Object.values(this.game.players).every(({ state }) => state === "ready");
  }

  get currentTurnCard() {
    return this.deck[this.player!.empire.turn % this.deck.length];
  }

  isPlayerReady(id?: string) {
    return this.game?.players[id ?? this.playerId]?.state === "ready";
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.playerId = playerId;
  }

  get isPlayableCard() {
    return (
      this.player!.empire.food >= this.currentTurnCard.template.cost.food &&
      this.player!.empire.wood >= this.currentTurnCard.template.cost.wood
    );
  }

  static playCard(game: GameState, playerId: string, playedCard: TCard) {
    game.players[playerId].empire.food -= playedCard.template.cost.food;
    game.players[playerId].empire.wood -= playedCard.template.cost.wood;
    game.players[playerId].empire.turn += 1;
    //   mettre le store a jour
  }

  static throwCard(game: GameState, playerId: string) {
    let wood = gameConfig.income;
    let food = gameConfig.income;
    wood +=
      game.players[playerId].empire.buildings.filter((building) => building === "farm").length *
      cardDictionnary.farm.effects.income.food;
    food +=
      game.players[playerId].empire.buildings.filter((building) => building === "woodFactory").length *
      cardDictionnary.woodFactory.effects.income.wood;

    game.players[playerId].empire.turn += 1;
    game.players[playerId].empire.food =
      game.players[playerId].empire.food + food >= 200 ? 200 : game.players[playerId].empire.food + food;
    game.players[playerId].empire.wood =
      game.players[playerId].empire.wood + wood >= 200 ? 200 : game.players[playerId].empire.wood + wood;
  }

  applyEffects(effects: BuildingEffectProps | ActionEffectProps[]) {
    if (effects instanceof BuildingEffect) {
    } else {
    }
  }
}
