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
    public buildingsQueue: { building: TCardBuildingType; turnsLeft: number }[] = [],
  ) {
    makeAutoObservable(this);
  }
}
