import { TDOMAIN } from "./CardTemplate";

export type ActionEffectProps = {
  actionType: "singleTarget" | "everyTarget";
  domain?: TDOMAIN;
  impact?: number;
  impactType?: "positive" | "negative";
  turnsToSpy?: number;
};

export class ActionEffect {
  actionType;
  domain;
  impact;
  impactType;
  turnsToSpy;

  constructor(
    props: ActionEffectProps = {
      actionType: "singleTarget",
    },
  ) {
    this.actionType = props.actionType;
    this.domain = props.domain;
    this.impact = props.impact;
    this.impactType = props.impactType;
    this.turnsToSpy = props.turnsToSpy;
  }
}
