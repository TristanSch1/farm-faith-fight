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
      tier: 0,
      description: "Charge {target} with the ferocity of a chicken chased by a fox! Victory or the cooking pot!",
      cost: { food: 40, wood: 75 },
      name: "Feathered Fury!",
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
      tier: 0,
      description:
        "With eyes as sharp as a hawk and ears as fine as a hare's, know what your enemy is up to. {target} can't hide their secrets from our sneaky squirrel!",
      cost: { food: 30, wood: 15 },
      name: "Squirrel's Cunning Gaze",
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
      tier: 0,
      description:
        "The all-seeing owl swoops! No corner of your enemy's realm can hide from its wide, wise gaze. Two turns of omniscient oversight, free of charge!",
      cost: { food: 100, wood: 20 },
      name: "Owl's All-seeing Aerie",
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
      tier: 0,
      description:
        "Your nimble fingers find their way into {target} pockets, nabbing a handful of goodies. Costs a hearty meal and a bit of lumber, but the thrill is worth every bit!",
      cost: { food: 90, wood: 20 },
      name: "Pilferer's Prance",
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
      tier: 0,
      description:
        "Set {target}'s turf ablaze! You'll need a feast's worth of food and a small grove's worth of wood, but the spectacle? Priceless.",
      cost: { food: 70, wood: 60 },
      name: "Scorched Shenanigans",
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
        domain: "TRADE",
        actionType: "singleTarget",
        impact: 5,
        impactType: "negative",
      },
    ],
  },
  poisoning: {
    template: {
      id: "poisoning",
      tier: 0,
      description:
        "Slip a dash of the nasty into {target}'s mead! Costs a king's feast of food and a sizeable stash of wood, but the results... Oh, what belly laughs you'll have!",
      cost: { food: 90, wood: 100 },
      name: "Pernicious Potions",
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
      tier: 0,
      description:
        "A ceremony of spiritual magnitude! Bolster your faith while giving {target} a crisis of conscience.",
      cost: { food: 120, wood: 40 },
      name: "Basilisk's Touch",
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
      tier: 0,
      description: "A divinely inspired onslaught against {target}, shaking your foe's faith to its core.",
      cost: { food: 75, wood: 40 },
      name: "Spiritual Smite",
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
      description: "A humble yet hearty provider of sustenance. Takes a while to set up, but well worth the wait!",
      name: "Yonder Yeomanry",
      domain: "FOOD",
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
      description:
        "A quaint lumber mill, tirelessly turning tree trunks into timber. Takes a bit to build, but a real asset once up and running!",
      name: "Timber Totter",
      domain: "WOOD",
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
      description:
        "A mighty stronghold filled with fierce soldiers. Takes a couple of turns to set up, but hey, Rome wasn't built in a day, right?",
      name: "Barracks of Bravery",
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
      description:
        "A divine sanctuary of silence and prayer. Takes some time to build, but divine intervention doesn't happen overnight, does it?",
      name: "Sanctuary of Serenity",
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
      description:
        "A bustling hub of trade, where food might be scant but deals are abundant. Requires a little time to set up.",
      name: "Bazaar of Bargains",
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
      description:
        "A holy place that takes time and other spiritual sites to construct. Divine patience is a virtue, they say.",
      name: "Cathedral of Conviction",
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
      description:
        "A divine well under the moonlight that requires time and the blessing of other religious sites to construct.",
      name: "Lunar Fountain",
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
      description:
        "An eerie place of worship, requires time and blessings of other spiritual sites to construct. For the spirits!",
      name: "Shaman's Stand",
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
      description:
        "A chilling rift where the undead draw their powers. Requires patience and blessings of other spiritual sites to construct.",
      name: "Abyss of the Damned",
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
      description:
        "A bustling hub of spice trade, the aroma alone could lead you here. Needs other trades and time to establish.",
      name: "Spice Souk",
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
      description:
        "A hub of elegant silk trade. Its establishment requires time and the presence of other trading centers.",
      name: "Silk Spinner's Stall",
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
      description:
        "A bustling hub for the wool trade, ready to be weaved into existence with time and other trade partners.",
      name: "Wool Weaver's Workshop",
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
      description:
        "A chilling hub of bones trade that can be summoned into existence with time and the presence of other trading centers.",
      name: "Boneyard Bazaar",
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
      description:
        "A towering structure of defense and dominance. Requires time and military foundations to construct.",
      name: "Fortress of Sovereignty",
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
      description:
        "An eerie structure that strengthens the undead army. Its rise requires time and other military foundations.",
      name: "Necropolis of Nightmares",
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
      description:
        "A mystical structure that strengthens the elven army. Its growth requires time and the presence of other military foundations.",
      name: "Sentinel of the Sylvan",
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
      description:
        "A robust structure that strengthens the orcish army. Requires time and the presence of other military bases to construct.",
      name: "Warrior's Warcamp",
      domain: "ARMY",
    },
    effects: {
      income: {},
      turnsToBuild: 4,
      needed: ["garrison", "crypt", "ancientOfWar", "castle"],
    },
  },
};
