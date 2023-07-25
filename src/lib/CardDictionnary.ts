import { BuildingEffectProps } from "./BuildingEffect";
import { ActionEffectProps } from "./ActionEffect";

export const cardDictionnary: { [cardName: string]: ActionEffectProps[] | BuildingEffectProps } = {
  attack: [
    {
      category: "ARMY",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
  ],
  spy: [
    {
      actionType: "singleTarget",
    },
  ],
  spyAll: [
    {
      actionType: "everyTarget",
    },
  ],
  steal: [
    {
      category: "TRADE",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
    {
      category: "TRADE",
      actionType: "singleTarget",
      impact: 5,
      impactType: "positive",
    },
  ],
  burningEarth: [
    {
      category: "ARMY",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
  ],
  poisoning: [
    {
      category: "ARMY",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
    {
      category: "RELIGION",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
  ],
  spiritualCelebration: [
    {
      category: "RELIGION",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
    {
      category: "RELIGION",
      actionType: "singleTarget",
      impact: 5,
      impactType: "positive",
    },
  ],
  spiritualAttack: [
    {
      category: "RELIGION",
      actionType: "singleTarget",
      impact: 5,
      impactType: "negative",
    },
  ],
  farm: {
    category: "BUILDING",
    turnsToBuild: 2,
    cost: {
      wood: 50,
      food: 50,
    },
    income: {
      wood: 2,
      food: 2,
    },
  },
  woodFactory: {
    category: "BUILDING",
    turnsToBuild: 2,
    cost: {
      wood: 50,
      food: 50,
    },
    income: {
      wood: 2,
      food: 2,
    },
  },
};
