import { TCATEGORY } from "./CardTemplate";

export type ActionEffectProps = {
  actionType: "singleTarget" | "everyTarget";
  category?: TCATEGORY;
  impact?: number;
  impactType?: "positive" | "negative";
};

export class ActionEffect {
  actionType;
  category;
  impact;
  impactType;

  constructor(
    props: ActionEffectProps = {
      actionType: "singleTarget",
    },
  ) {
    this.actionType = props.actionType;
    this.category = props.category;
    this.impact = props.impact;
    this.impactType = props.impactType;
  }
}
