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
  | "bonesTrade"
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
      tier: 1,
      description: "j'attaque",
      cost: { food: 40, wood: 75 },
      name: "Attaque",
      category: "ACTION",
    },
    effects: [
      {
        domain: "ARMY",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  spy: {
    template: {
      id: "spy",
      tier: 1,
      description: "spy",
      cost: { food: 40, wood: 40 },
      name: "spy",
      category: "ACTION",
    },
    effects: [
      {
        actionType: "singleTarget",
        turnsToSpy: 2,
      },
    ],
  },
  spyAll: {
    template: {
      id: "spyAll",
      tier: 1,
      description: "spyAll",
      cost: { food: 100, wood: 100 },
      name: "spyAll",
      category: "ACTION",
    },
    effects: [
      {
        actionType: "everyTarget",
        turnsToSpy: 2,
      },
    ],
  },
  steal: {
    template: {
      id: "steal",
      tier: 1,
      description: "steal",
      cost: { food: 90, wood: 20 },
      name: "steal",
      category: "ACTION",
    },
    effects: [
      {
        domain: "TRADE",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
      {
        domain: "TRADE",
        actionType: "singleTarget",
        impact: 5,
        impactType: "positive",
      },
    ],
  },
  burningEarth: {
    template: {
      id: "burningEarth",
      tier: 1,
      description: "burningEarth",
      cost: { food: 70, wood: 60 },
      name: "burningEarth",
      category: "ACTION",
    },
    effects: [
      {
        domain: "ARMY",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  poisoning: {
    template: {
      id: "poisoning",
      tier: 1,
      description: "poisoning",
      cost: { food: 90, wood: 100 },
      name: "poisoning",
      category: "ACTION",
    },
    effects: [
      {
        domain: "ARMY",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
      {
        domain: "RELIGION",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  spiritualCelebration: {
    template: {
      id: "spiritualCelebration",
      tier: 1,
      description: "spiritualCelebration",
      cost: { food: 120, wood: 40 },
      name: "spiritualCelebration",
      category: "ACTION",
    },
    effects: [
      {
        domain: "RELIGION",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
      {
        domain: "RELIGION",
        actionType: "singleTarget",
        impact: 5,
        impactType: "positive",
      },
    ],
  },
  spiritualAttack: {
    template: {
      id: "spiritualAttack",
      tier: 1,
      description: "spiritualAttack",
      cost: { food: 75, wood: 40 },
      name: "spiritualAttack",
      category: "ACTION",
    },
    effects: [
      {
        domain: "RELIGION",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  farm: {
    template: {
      id: "farm",
      tier: 0,
      race: "NEUTRAL",
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
      tier: 0,
      race: "NEUTRAL",
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
      tier: 1,
      race: "NEUTRAL",
      cost: {
        wood: 120,
        food: 50,
      },
      category: "BUILDING",
      description: "garrison",
      name: "garrison",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  spiritualPlace: {
    template: {
      id: "spiritualPlace",
      tier: 1,
      race: "NEUTRAL",
      cost: {
        wood: 85,
        food: 85,
      },
      category: "BUILDING",
      description: "spiritualPlace",
      name: "spiritualPlace",
      domain: "RELIGION",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  market: {
    template: {
      id: "market",
      tier: 1,
      race: "NEUTRAL",
      cost: {
        wood: 50,
        food: 120,
      },
      category: "BUILDING",
      description: "market",
      name: "market",
      domain: "TRADE",
    },
    effects: {
      income: {},
      turnsToBuild: 2,
    },
  },
  temple: {
    template: {
      id: "temple",
      tier: 2,
      race: "HUMAN",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "temple",
      name: "temple",
      domain: "RELIGION",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["spiritualPlace", "moonwell", "shamanAltar", "damnedChasm"],
    },
  },
  moonwell: {
    template: {
      id: "moonwell",
      tier: 2,
      race: "ELF",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "moonwell",
      name: "moonwell",
      domain: "RELIGION",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["spiritualPlace", "temple", "shamanAltar", "damnedChasm"],
    },
  },
  shamanAltar: {
    template: {
      id: "shamanAltar",
      tier: 2,
      race: "ORC",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "shamanAltar",
      name: "shamanAltar",
      domain: "RELIGION",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["spiritualPlace", "moonwell", "temple", "damnedChasm"],
    },
  },
  damnedChasm: {
    template: {
      id: "damnedChasm",
      tier: 2,
      race: "UNDEAD",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "damnedChasm",
      name: "damnedChasm",
      domain: "RELIGION",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["spiritualPlace", "moonwell", "shamanAltar", "temple"],
    },
  },
  spiceTrade: {
    template: {
      id: "spiceTrade",
      tier: 2,
      race: "HUMAN",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "spiceTrade",
      name: "spiceTrade",
      domain: "TRADE",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["market", "silkTrade", "woolTrade", "bonesTrade"],
    },
  },
  silkTrade: {
    template: {
      id: "silkTrade",
      tier: 2,
      race: "ELF",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "silkTrade",
      name: "silkTrade",
      domain: "TRADE",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["market", "spiceTrade", "woolTrade", "bonesTrade"],
    },
  },
  woolTrade: {
    template: {
      id: "woolTrade",
      tier: 2,
      race: "ORC",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "woolTrade",
      name: "woolTrade",
      domain: "TRADE",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["market", "silkTrade", "spiceTrade", "bonesTrade"],
    },
  },
  bonesTrade: {
    template: {
      id: "bonesTrade",
      tier: 2,
      race: "UNDEAD",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "woolTrade",
      name: "woolTrade",
      domain: "TRADE",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["market", "silkTrade", "woolTrade", "spiceTrade"],
    },
  },
  castle: {
    template: {
      id: "castle",
      tier: 2,
      race: "HUMAN",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "castle",
      name: "castle",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["garrison", "crypt", "ancientOfWar", "barracks"],
    },
  },
  crypt: {
    template: {
      id: "crypt",
      tier: 2,
      race: "UNDEAD",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "crypt",
      name: "crypt",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["garrison", "castle", "ancientOfWar", "barracks"],
    },
  },
  ancientOfWar: {
    template: {
      id: "ancientOfWar",
      tier: 2,
      race: "ELF",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "ancientOfWar",
      name: "ancientOfWar",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["garrison", "crypt", "castle", "barracks"],
    },
  },
  barracks: {
    template: {
      id: "barracks",
      tier: 2,
      race: "ORC",
      cost: {
        wood: 100,
        food: 100,
      },
      category: "BUILDING",
      description: "barracks",
      name: "barracks",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["garrison", "crypt", "ancientOfWar", "castle"],
    },
  },
};
