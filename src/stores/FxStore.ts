import eventsStore from "./EventsStore.ts";
import playedCardSound from "../fx/playedCard.mp3";
import playerJoinSound from "../fx/playerJoin.wav";
import throwCardSound from "../fx/throwCard.mp3";
import UIfx from "uifx";

const playCard = new UIfx(playedCardSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});
const throwCard = new UIfx(throwCardSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});
const playerJoin = new UIfx(playerJoinSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

class FxStore {
  init() {
    eventsStore.on("playerJoin", () => {
      playerJoin.play();
    });
    eventsStore.on("playCard", () => {
      console.log("event playCard");
      playCard.play();
    });
    eventsStore.on("throwCard", () => {
      throwCard.play();
    });
  }
}

export const fxStore = new FxStore();
