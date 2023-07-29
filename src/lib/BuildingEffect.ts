import { TIncome } from "./types/genericTypes";

export type BuildingEffectProps = {
  income: TIncome;
  turnsToBuild: number;
};

export class BuildingEffect {
  income;
  turnsToBuild;
  constructor(props: BuildingEffectProps) {
    this.income = props.income;
    this.turnsToBuild = props.turnsToBuild;
  }
}
