import { makeAutoObservable, observable } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../lib/types/GameState.ts";
import { TCard } from "../lib/Card.ts";
import { makeDeck } from "../lib/helpers/CardHelper.ts";

export class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  playerId = "";
  deck: TCard[] = observable.array(makeDeck());
  randomPlayerIdTarget = "";

  constructor() {
    makeAutoObservable(this);
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

  get isThisPlayableCard() {
    return (
      this.player!.empire.food >= this.currentTurnCard.template.cost.food &&
      this.player!.empire.wood >= this.currentTurnCard.template.cost.wood
    );
  }

  isPlayerReady(id?: string) {
    return this.game?.players[id ?? this.playerId]?.state === "ready";
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.playerId = playerId;
  }

  randomizeSingleTarget() {
    if (!this.game) return;
    const players = Object.keys(this.game.players);
    while (!this.randomPlayerIdTarget || this.randomPlayerIdTarget === this.playerId) {
      const randomIndex = Math.floor(Math.random() * players.length);
      this.randomPlayerIdTarget = players[randomIndex];
    }
    return this.randomPlayerIdTarget;
  }
}

export const gameStore = new GameStore();
