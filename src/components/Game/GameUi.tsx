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

const GameUi = () => {
  const ref = useRef<DrawPileAPI>(null);
  useEffect(() => ref.current?.distribute(), []);

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
                type: "building/spiritualPlace",
                race: template.race?.toLowerCase(),
              }}
            />
          );
        })}
      </CardDrawPile>
    </SceneContainer>
  );
};

export default GameUi;
