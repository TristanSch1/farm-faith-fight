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
import { cardDictionnary } from "../../lib/CardDictionnary.ts";

import { BuildingEffectProps } from "../../lib/BuildingEffect.ts";
import styles from "./_css/gameUi.module.css";

const GameUi = () => {
  const ref = useRef<DrawPileAPI>(null);
  useEffect(() => ref.current?.distribute(), []);
  useEffect(() => {
    gameStore.randomizeSingleTarget();
  }, [gameStore.player?.empire.turn]);

  if (gameStore.player?.state === "dead") {
    return (
      <SceneContainer>
        <div className={styles.lost}>You lost</div>
      </SceneContainer>
    );
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
              randomPlayerIdTarget: gameStore.randomPlayerIdTarget(),
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
          const { template, effects } = card;
          return (
            <Card
              key={index}
              {...{
                ...template,
                title: template.name,

                buildLinks: (effects as BuildingEffectProps).needed?.map<{
                  name: string;
                  built: boolean;
                }>((needed_name) => ({
                  name: cardDictionnary[needed_name].template.name,
                  built: gameStore.player!.empire.buildings.includes(needed_name),
                })),
                target: gameStore.currentTargetPlayer(),
                type: "spiritualPlace",
                race: (["NEUTRAL", "NONE"].includes(template.race || "") ? undefined : template.race)?.toLowerCase(),
                turnsToBuild: (effects as BuildingEffectProps).turnsToBuild,
              }}
            />
          );
        })}
      </CardDrawPile>
    </SceneContainer>
  );
};

export default GameUi;
