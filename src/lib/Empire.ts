import { makeAutoObservable } from "mobx";
import { TCardBuildingType } from "./CardDictionnary.ts";
import gameConfig from "../game.config.ts";

export class Empire {
  constructor(
    public name: string,
    public wood: number = gameConfig.wood,
    public food: number = gameConfig.food,
    public health: number = gameConfig.health,
    public turn: number = 0,
    public buildings: TCardBuildingType[] = [],
    public spyingQueue: { playerId: string; turnsLeft: number }[] = [],
    public buildingsQueue: { buildingType: TCardBuildingType; turnsLeft: number }[] = [],
  ) {
    makeAutoObservable(this);
  }
}
