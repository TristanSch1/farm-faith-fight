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
  wood: 150,
  food: 150,
  income: 10,
  maxWood: 200,
  maxFood: 200,
  baseDamage: 5,
  maxFarmBuilding: 5,
  maxWoodFactoryBuilding: 5,

  // 96 cartes
  deck: {
    // actions
    attack: 12,
    spy: 5,
    burningEarth: 12,
    poisoning: 12,
    spiritualAttack: 12,
    spiritualCelebration: 12,
    spyAll: 2,
    steal: 5,
    // buildings
    farm: 5,
    woodFactory: 5,
    garrison: 5,
    spiritualPlace: 1,
    market: 1,
    temple: 1,
    moonwell: 1,
    shamanAltar: 1,
    damnedChasm: 1,
    spiceTrade: 1,
    silkTrade: 1,
    woolTrade: 1,
    castle: 1,
    crypt: 1,
    ancientOfWar: 1,
    barracks: 1,
  },
} as TGameConfig;
