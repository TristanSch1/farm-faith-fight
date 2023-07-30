import { IEvent } from "../../stores/EventsStore.ts";
import { Empire } from "../Empire.ts";
import { TCard } from "../Card.ts";

// turnCard
// distributionCards
// throwCard
// startGame

export interface IEventPlayCard extends IEvent {
  type: string;
  payload?: {
    empire: Empire;
    card: TCard;
    randomPlayerIdTarget: string;
  };
}

export interface IEventThrowCard extends IEvent {
  type: string;
  payload?: {};
}
