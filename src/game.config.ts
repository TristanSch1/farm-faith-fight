import { TCardType } from "./lib/CardDictionnary";

export default {
  // 86 cartes
  deck: {
    // actions
    attack: 10,
    spy: 5,
    burningEarth: 10,
    poisoning: 10,
    spiritualAttack: 10,
    spiritualCelebration: 10,
    spyAll: 2,
    steal: 5,
    // buildings
    farm: 5,
    woodFactory: 5,
    garrison: 1,
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
} as { deck: { [cardType in TCardType]: number } };
