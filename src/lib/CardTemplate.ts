import { TCost } from "./types/genericTypes";
import { TCardType } from "./CardDictionnary.ts";

export type TRACE = "HUMAN" | "ELVE" | "ORC" | "UNDEAD" | "NEUTRAL" | "NONE";
export type TDOMAIN = "ARMY" | "RELIGION" | "TRADE";
export type TCARDCATEGORY = "BUILDING" | "ACTION";

export type CardTemplateProps = {
  id: TCardType;
  tier: number;
  race?: TRACE;
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
  domain?: TDOMAIN;
};

export class CardTemplate {
  id: TCardType;
  tier: number;
  race?: TRACE;
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
  domain?: TDOMAIN;
  constructor(props: CardTemplateProps) {
    this.id = props.id;
    this.description = props.description;
    this.name = props.name;
    this.cost = props.cost;
    this.category = props.category;
    this.domain = props.domain;
  }
}
