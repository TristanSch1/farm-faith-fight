import { makeAutoObservable, observable, when } from "mobx";
import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../lib/types/GameState.ts";
import { TCard } from "../lib/Card.ts";
import { makeDeck } from "../lib/helpers/CardHelper.ts";
import eventsStore from "./EventsStore.ts";
import { BuildingEffectProps } from "../lib/BuildingEffect.ts";
import { ActionEffectProps } from "../lib/ActionEffect.ts";

class GameStore {
  game: GameState | null = null;
  players: Players | null = null;
  playerId = "";
  deck: TCard[] = observable.array(makeDeck());
  turn = -1;

  constructor() {
    makeAutoObservable(this);

    eventsStore.on("", () => {});

    // Tirage de la premiere carte
    when(
      () => this.isGameStarted && this.turn === -1,
      () => {
        this.setNextTurn();
      },
    );
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
    return this.deck[this.turn];
  }

  isPlayerReady(id?: string) {
    return this.game?.players[id ?? this.playerId]?.state === "ready";
  }

  update(game: GameState, players: Players, playerId = "") {
    this.game = game;
    this.players = players;
    this.playerId = playerId;
  }

  playCard() {
    console.log(this.currentTurnCard);
    this.applyEffects(this.currentTurnCard.effects);
    this.setNextTurn();
    //   mettre le store a jour
  }

  throwCard() {
    console.log(this.currentTurnCard);
    this.applyEffects(this.currentTurnCard.effects);
    this.setNextTurn();
  }

  applyEffects(effects: BuildingEffectProps[] | ActionEffectProps[]) {}

  setNextTurn() {
    this.turn++;
  }
}

export const gameStore = new GameStore();
