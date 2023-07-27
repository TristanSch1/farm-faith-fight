import { TCost } from "./types/genericTypes";

export type TDOMAIN = "ARMY" | "RELIGION" | "TRADE";
export type TCATEGORY = TDOMAIN | "SPY" | "BUILDING";
export type TCARDCATEGORY = "SPY" | "BUILDING" | "ACTION";

export type CardTemplateProps = {
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
};

export class CardTemplate {
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
  constructor(props: CardTemplateProps) {
    this.description = props.description;
    this.name = props.name;
    this.cost = props.cost;
    this.category = props.category;
  }
}
