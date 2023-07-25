import { makeAutoObservable } from "mobx";

export class Empire {
  constructor(
    private wood: number = 10,
    private corn: number = 10,
    public score: number = 100,
  ) {
    makeAutoObservable(this);
  }
}
