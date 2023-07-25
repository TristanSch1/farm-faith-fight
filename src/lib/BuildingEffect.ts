import { TCost, TIncome } from "./types/genericTypes";

export type BuildingEffectProps = {
  category: "BUILDING";
  cost: TCost;
  income: TIncome;
  turnsToBuild: number;
};

export class BuildingEffect {
  constructor(props: BuildingEffectProps) {}
}
