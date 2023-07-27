import { BuildingEffectProps } from "./BuildingEffect";
import { ActionEffectProps } from "./ActionEffect";
import { CardTemplateProps } from "./CardTemplate";

export type TCardType =
  | "attack"
  | "spy"
  | "spyAll"
  | "steal"
  | "burningEarth"
  | "poisoning"
  | "spiritualCelebration"
  | "spiritualAttack"
  | "farm"
  | "woodFactory";

export const cardDictionnary: {
  [cardName in TCardType]: { template: CardTemplateProps; effects: ActionEffectProps[] | BuildingEffectProps[] };
} = {
  attack: {
    template: {
      description: "j'attaque",
      cost: { food: 2, wood: 2 },
      name: "Attaque",
      category: "ACTION",
    },
    effects: [
      {
        category: "ARMY",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  spy: {
    template: {
      description: "spy",
      cost: { food: 2, wood: 2 },
      name: "spy",
      category: "SPY",
    },
    effects: [
      {
        actionType: "singleTarget",
      },
    ],
  },
  spyAll: {
    template: {
      description: "spyAll",
      cost: { food: 2, wood: 2 },
      name: "spyAll",
      category: "SPY",
    },
    effects: [
      {
        actionType: "everyTarget",
      },
    ],
  },
  steal: {
    template: {
      description: "steal",
      cost: { food: 2, wood: 2 },
      name: "steal",
      category: "ACTION",
    },
    effects: [
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
  },
  burningEarth: {
    template: {
      description: "burningEarth",
      cost: { food: 2, wood: 2 },
      name: "burningEarth",
      category: "ACTION",
    },
    effects: [
      {
        category: "ARMY",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  poisoning: {
    template: {
      description: "poisoning",
      cost: { food: 2, wood: 2 },
      name: "poisoning",
      category: "ACTION",
    },
    effects: [
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
  },
  spiritualCelebration: {
    template: {
      description: "spiritualCelebration",
      cost: { food: 2, wood: 2 },
      name: "spiritualCelebration",
      category: "ACTION",
    },
    effects: [
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
  },
  spiritualAttack: {
    template: {
      description: "spiritualAttack",
      cost: { food: 2, wood: 2 },
      name: "spiritualAttack",
      category: "ACTION",
    },
    effects: [
      {
        category: "RELIGION",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  farm: {
    template: {
      cost: {
        wood: 50,
        food: 50,
      },
      category: "BUILDING",
      description: "farm",
      name: "farm",
    },
    effects: [
      {
        income: {
          food: 2,
        },
        turnsToBuild: 2,
      },
    ],
  },
  woodFactory: {
    template: {
      cost: {
        wood: 50,
        food: 50,
      },
      category: "BUILDING",
      description: "wood factory",
      name: "wood factory",
    },
    effects: [
      {
        income: {
          wood: 2,
        },
        turnsToBuild: 2,
      },
    ],
  },
};
