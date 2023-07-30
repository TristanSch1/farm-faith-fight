import { TIncome } from "./types/genericTypes";
import { TCardBuildingType } from "./CardDictionnary.ts";

export type BuildingEffectProps = {
  income: TIncome;
  turnsToBuild: number;
  needed?: TCardBuildingType[];
};

export class BuildingEffect {
  income;
  turnsToBuild;
  needed?: TCardBuildingType[];
  constructor(props: BuildingEffectProps) {
    this.income = props.income;
    this.turnsToBuild = props.turnsToBuild;
  }
}
