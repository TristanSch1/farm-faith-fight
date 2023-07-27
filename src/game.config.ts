import { TCardType } from "./lib/CardDictionnary";

export default {
  deck: {
    attack: 5,
    spy: 5,
    burningEarth: 5,
    farm: 5,
    poisoning: 5,
    spiritualAttack: 5,
    spiritualCelebration: 5,
    spyAll: 5,
    steal: 5,
    woodFactory: 5,
  },
} as { deck: { [cardType in TCardType]: number } };
