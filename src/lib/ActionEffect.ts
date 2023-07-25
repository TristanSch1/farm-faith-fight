import { TCATEGORY } from "./CardTemplate";

export type ActionEffectProps = {
  actionType: "singleTarget" | "everyTarget";
  category?: TCATEGORY;
  impact?: number;
  impactType?: "positive" | "negative";
};

export class ActionEffect {
  constructor(
    props: ActionEffectProps = {
      actionType: "singleTarget",
    },
  ) {}
}
