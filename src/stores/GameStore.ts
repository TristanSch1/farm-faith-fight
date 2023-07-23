import { GameState } from "../logic.ts";
import { makeAutoObservable } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";

class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  playerId = "";

  constructor() {
    makeAutoObservable(this);
  }

  setGame(game: GameState) {
    this.game = game;
  }

  setPlayers(players: Players) {
    this.players = players;
  }

  setPlayerId(playerId: string) {
    this.playerId = playerId;
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.playerId = playerId;
  }
}

export default GameStore;
