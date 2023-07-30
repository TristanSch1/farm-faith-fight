import { CardTemplate } from "./CardTemplate";
import { ActionEffectProps } from "./ActionEffect";
import { BuildingEffectProps } from "./BuildingEffect.ts";

export type TCard = {
  template: CardTemplate;
  effects: ActionEffectProps[] | BuildingEffectProps;
};

export class Card {
  template: CardTemplate;
  effects: ActionEffectProps[] | BuildingEffectProps;
  constructor(props: TCard) {
    this.template = props.template;
    this.effects = props.effects;
  }
}
