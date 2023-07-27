import { makeAutoObservable } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../lib/types/GameState.ts";

class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  playerId = "";

  constructor() {
    makeAutoObservable(this);
  }

  get isGameStarted() {
    return this.game?.gameStarted;
  }

  get allPlayersReady() {
    if (!this.game?.players) return false;
    return Object.values(this.game.players).every(({ state }) => state === "ready");
  }

  isPlayerReady(id?: string) {
    return this.game?.players[id ?? this.playerId]?.state === "ready";
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.playerId = playerId;
  }
}

export default GameStore;
