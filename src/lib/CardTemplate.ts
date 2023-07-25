export type TDOMAIN = "ARMY" | "RELIGION" | "TRADE";
export type TCATEGORY = TDOMAIN | "SPY" | "BUILDING";

export class CardTemplate {
  constructor(
    private description: string,
    private name: string,
    private cost: number,
  ) {
    this.description = description;
    this.name = name;
  }
}
