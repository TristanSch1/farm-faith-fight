import { TCardType } from "./lib/CardDictionnary";

type TGameConfig = {
  health: number;
  income: number;
  wood: number;
  food: number;
  maxWood: number;
  maxFood: number;
  baseDamage: number;
  maxFarmBuilding: number;
  maxWoodFactoryBuilding: number;
  deck: { [cardType in TCardType]: number };
};

export default {
  health: 100,
  wood: 50,
  food: 50,
  income: 10,
  maxWood: 200,
  maxFood: 200,
  baseDamage: 5,
  maxFarmBuilding: 5,
  maxWoodFactoryBuilding: 5,

  // 96 cartes
  deck: {
    // actions
    attack: 0,
    spy: 50,
    burningEarth: 0,
    poisoning: 0,
    spiritualAttack: 0,
    spiritualCelebration: 0,
    spyAll: 0,
    steal: 0,
    // building
    farm: 50,
    woodFactory: 0,
    garrison: 0,
    spiritualPlace: 0,
    market: 0,
    temple: 0,
    moonwell: 0,
    shamanAltar: 0,
    damnedChasm: 0,
    spiceTrade: 0,
    silkTrade: 0,
    woolTrade: 0,
    castle: 0,
    crypt: 0,
    ancientOfWar: 0,
    barracks: 0,
  },
} as TGameConfig;
