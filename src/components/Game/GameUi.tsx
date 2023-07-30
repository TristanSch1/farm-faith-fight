import { useEffect, useRef } from "react";

import "../../../ui/src/assets/styles/normalize.css";
import "../../../ui/src/assets/styles/app.css";

import { Players } from "./Players.tsx";
import { SceneContainer } from "../../../ui/src/layouts";
import { Economy } from "./Economy.tsx";
import CardDrawPile, { DrawPileAPI } from "../../../ui/src/components/Card/CardDrawPile.tsx";
import { gameStore } from "../../stores/GameStore.ts";
import { Card } from "../../../ui/src/components";
import eventsStore from "../../stores/EventsStore.ts";
import { cardDictionnary, TCardBuildingType } from "../../lib/CardDictionnary.ts";
import { BuildingEffectProps } from "../../lib/BuildingEffect.ts";

const GameUi = () => {
  const ref = useRef<DrawPileAPI>(null);
  useEffect(() => ref.current?.distribute(), []);
  useEffect(() => {
    gameStore.randomizeSingleTarget();
  }, [gameStore.game]);

  if (gameStore.player?.state === "dead") {
    return <SceneContainer>Lost</SceneContainer>;
  }

  return (
    <SceneContainer>
      <Players />
      <Economy />
      <CardDrawPile
        onPlayCard={(cardDrawable) => {
          if (!gameStore.isThisPlayableCard) {
            cardDrawable.reset();
            return;
          }

          cardDrawable.throw();

          eventsStore.send({
            type: "playCard",
            payload: {
              card: gameStore.currentTurnCard,
              empire: gameStore.player!.empire,
              randomPlayerIdTarget: gameStore.randomPlayerIdTarget,
            },
          });
        }}
        onThrowCard={(cardDrawable) => {
          cardDrawable.throw();
          eventsStore.send({ type: "throwCard" });
        }}
        ref={ref}
        debug_key={gameStore.playerId}
      >
        {gameStore.deck.map((card, index) => {
          const { template } = card;
          return (
            <Card
              key={index}
              {...{
                ...template,
                title: template.name,
                buildLinks: (cardDictionnary[template.id].effects as BuildingEffectProps).needed?.map<{
                  name: string;
                  built: boolean;
                }>((needed_name) => ({
                  name: neededTranslations[needed_name],
                  built: gameStore.player!.empire.buildings.includes(needed_name),
                })),
                type: "building/spiritualPlace",
                race: template.race?.toLowerCase(),
                turnsToBuild: (cardDictionnary[template.id].effects as BuildingEffectProps).turnsToBuild,
              }}
            />
          );
        })}
      </CardDrawPile>
    </SceneContainer>
  );
};

export default GameUi;

type NeededTranslation = {
  [cardName in TCardBuildingType]: string;
};
const neededTranslations: NeededTranslation = {
  farm: "Ferme",
  woodFactory: "Scierie",
  garrison: "Garnison",
  spiritualPlace: "Lieu spirituel",
  market: "Marché",
  temple: "Temple",
  moonwell: "Puit de Lune",
  shamanAltar: "Autel Shaman",
  damnedChasm: "Gouffre Damné",
  spiceTrade: "Commerce d'épice",
  silkTrade: "Commerce de soie",
  woolTrade: "Commerce de peau",
  bonesTrade: "Commerce d'os",
  castle: "Château",
  crypt: "Crype",
  ancientOfWar: "Ancien de Guerre",
  barracks: "Barraque",
};
