import { TCost, TIncome } from "./types/genericTypes";

export type BuildingEffectProps = {
  income: TIncome;
  turnsToBuild: number;
};

export class BuildingEffect {
  constructor(props: BuildingEffectProps) {}
}
