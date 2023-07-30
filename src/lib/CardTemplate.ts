import { TCost } from "./types/genericTypes";
import { TCardType } from "./CardDictionnary.ts";

export type TDOMAIN = "ARMY" | "RELIGION" | "TRADE";
export type TCATEGORY = TDOMAIN | "SPY" | "BUILDING";
export type TCARDCATEGORY = "SPY" | "BUILDING" | "ACTION";

export type CardTemplateProps = {
  id: TCardType;
  tier: number;
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
};

export class CardTemplate {
  id: TCardType;
  tier: number;
  description: string;
  name: string;
  cost: TCost;
  category: TCARDCATEGORY;
  constructor(props: CardTemplateProps) {
    this.id = props.id;
    this.description = props.description;
    this.name = props.name;
    this.cost = props.cost;
    this.category = props.category;
  }
}
