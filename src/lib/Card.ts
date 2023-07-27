import { CardTemplate } from "./CardTemplate";
import { ActionEffect } from "./ActionEffect";
export type TCard = {
  template: CardTemplate;
  effect: ActionEffect;
};
export class Card {
  template: CardTemplate;
  effect: ActionEffect;
  constructor(props: TCard) {
    this.template = props.template;
    this.effect = props.effect;
  }
}
