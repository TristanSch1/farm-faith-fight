import eventsStore from "./EventsStore.ts";
import play from "../fx/play.mp3";
import coinSound from "../fx/coin.mp3";
import errorSound from "../fx/error.mp3";
import attackSound from "../fx/attack.mp3";
import constructSound from "../fx/construct.mp3";
import UIfx from "uifx";
import { IEventPlayCard } from "../lib/types/EventTypes.ts";
import { GameActionsStore } from "./GameActionsStore.ts";

const playCard = new UIfx(play, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

const coin = new UIfx(coinSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

const error = new UIfx(errorSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

const attack = new UIfx(attackSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

const construct = new UIfx(constructSound, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

class FxStore {
  init() {
    eventsStore.on("playCard", ({ payload }: IEventPlayCard) => {
      if (!payload?.empire || !payload.card) return;
      if (!GameActionsStore.isPlayableCard(payload.empire, payload.card)) error.play();
      playCard.play();
      if (payload.card.template.category === "BUILDING") {
        setTimeout(() => {
          construct.play();
        }, 250);
      }
      if (payload.card.template.category === "ACTION") {
        setTimeout(() => {
          attack.play();
        }, 250);
      }
    });
    eventsStore.on("throwCard", () => {
      playCard.play();
      setTimeout(() => {
        coin.play();
      }, 250);
    });
    eventsStore.on("cannotPlayCard", () => {
      error.play();
    });
  }
}

export const fxStore = new FxStore();
