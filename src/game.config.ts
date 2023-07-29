import { TCardType } from "./lib/CardDictionnary";

export default {
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
