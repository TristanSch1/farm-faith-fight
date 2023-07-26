import { makeAutoObservable } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../lib/types/GameState.ts";

class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  lastActivityPlayerId = "";

  constructor() {
    makeAutoObservable(this);
  }

  get isGameStarted() {
    return this.game?.gameStarted;
  }

  isPlayerReady(id: string) {
    return this.game?.players[id]?.state === "ready";
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.lastActivityPlayerId = playerId;
  }
}

export default GameStore;
