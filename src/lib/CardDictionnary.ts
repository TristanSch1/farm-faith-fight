import { BuildingEffectProps } from "./BuildingEffect";
import { ActionEffectProps } from "./ActionEffect";
import { CardTemplateProps } from "./CardTemplate";

export type TCardBuildingType =
  | "farm"
  | "woodFactory"
  | "garrison"
  | "spiritualPlace"
  | "market"
  | "temple"
  | "moonwell"
  | "shamanAltar"
  | "damnedChasm"
  | "spiceTrade"
  | "silkTrade"
  | "woolTrade"
  | "castle"
  | "crypt"
  | "ancientOfWar"
  | "barracks";

export type TCardActionType =
  | "attack"
  | "spy"
  | "spyAll"
  | "steal"
  | "burningEarth"
  | "poisoning"
  | "spiritualCelebration"
  | "spiritualAttack";

export type TCardType = TCardActionType | TCardBuildingType;

export const cardDictionnary: {
  [cardName in TCardType]: {
    template: CardTemplateProps;
    effects: ActionEffectProps[] | BuildingEffectProps;
  };
} = {
  attack: {
    template: {
      id: "attack",
      description: "j'attaque",
      cost: { food: 40, wood: 75 },
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
      id: "spy",
      description: "spy",
      cost: { food: 40, wood: 40 },
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
      id: "spyAll",
      description: "spyAll",
      cost: { food: 100, wood: 100 },
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
      id: "steal",
      description: "steal",
      cost: { food: 90, wood: 20 },
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
      id: "burningEarth",
      description: "burningEarth",
      cost: { food: 70, wood: 60 },
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
      id: "poisoning",
      description: "poisoning",
      cost: { food: 90, wood: 100 },
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
      id: "spiritualCelebration",
      description: "spiritualCelebration",
      cost: { food: 120, wood: 40 },
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
      id: "spiritualAttack",
      description: "spiritualAttack",
      cost: { food: 75, wood: 40 },
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
      id: "farm",
      cost: {
        wood: 50,
        food: 50,
      },
      category: "BUILDING",
      description: "farm",
      name: "farm",
    },
    effects: {
      income: {
        food: 2,
      },
      turnsToBuild: 2,
    },
  },
  woodFactory: {
    template: {
      id: "woodFactory",
      cost: {
        wood: 50,
        food: 50,
      },
      category: "BUILDING",
      description: "wood factory",
      name: "wood factory",
    },
    effects: {
      income: {
        wood: 2,
      },
      turnsToBuild: 2,
    },
  },
  garrison: {
    template: {
      id: "garrison",
      cost: {
        wood: 120,
        food: 50,
      },
      category: "BUILDING",
      description: "garrison",
      name: "garrison",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  spiritualPlace: {
    template: {
      id: "spiritualPlace",
      cost: {
        wood: 85,
        food: 85,
      },
      category: "BUILDING",
      description: "spiritualPlace",
      name: "spiritualPlace",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  market: {
    template: {
      id: "market",
      cost: {
        wood: 50,
        food: 120,
      },
      category: "BUILDING",
      description: "market",
      name: "market",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  temple: {
    template: {
      id: "temple",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "temple",
      name: "temple",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
      needed: ["spiritualPlace", "moonwell", "shamanAltar", "damnedChasm"],
    },
  },
  moonwell: {
    template: {
      id: "moonwell",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "moonwell",
      name: "moonwell",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
      needed: ["spiritualPlace", "temple", "shamanAltar", "damnedChasm"],
    },
  },
  shamanAltar: {
    template: {
      id: "shamanAltar",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "shamanAltar",
      name: "shamanAltar",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
      needed: ["spiritualPlace", "moonwell", "temple", "damnedChasm"],
    },
  },
  damnedChasm: {
    template: {
      id: "damnedChasm",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "shamanAltar",
      name: "shamanAltar",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
      needed: ["spiritualPlace", "moonwell", "shamanAltar", "temple"],
    },
  },
  spiceTrade: {
    template: {
      id: "spiceTrade",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "spiceTrade",
      name: "spiceTrade",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  silkTrade: {
    template: {
      id: "silkTrade",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "silkTrade",
      name: "silkTrade",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  woolTrade: {
    template: {
      id: "woolTrade",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "woolTrade",
      name: "woolTrade",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  castle: {
    template: {
      id: "castle",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "castle",
      name: "castle",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  crypt: {
    template: {
      id: "crypt",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "crypt",
      name: "crypt",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  ancientOfWar: {
    template: {
      id: "ancientOfWar",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "ancientOfWar",
      name: "ancientOfWar",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  barracks: {
    template: {
      id: "barracks",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "barracks",
      name: "barracks",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
};
