import { makeAutoObservable } from "mobx";
import { TCardBuildingType } from "./CardDictionnary.ts";

export class Empire {
  constructor(
    public name: string,
    private wood: number = 10,
    private food: number = 10,
    public score: number = 100,
    public buildings: TCardBuildingType[] = [],
  ) {
    makeAutoObservable(this);
  }
}
