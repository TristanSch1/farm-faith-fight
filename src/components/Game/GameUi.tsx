import "../../../ui/src/assets/styles/normalize.css";
import "../../../ui/src/assets/styles/app.css";
import { Players } from "./Players.tsx";
import { SceneContainer } from "../../../ui/src/layouts";
import { Economy } from "./Economy.tsx";
import CardDrawPile, { DrawPileAPI } from "../../../ui/src/components/Card/CardDrawPile.tsx";
import { gameStore } from "../../stores/GameStore.ts";
import { Card } from "../../../ui/src/components";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react";

const GameUi = observer(() => {
  const ref = useRef<DrawPileAPI>(null);

  useEffect(() => {
    ref.current?.distribute();
  }, []);

  useEffect(() => {
    gameStore.randomizeSingleTarget();
  }, [gameStore.game?.players[gameStore.playerId].empire.turn]);

  return (
    <SceneContainer>
      <Players />
      <Economy />
      <CardDrawPile ref={ref}>
        {gameStore.deck.map((card, index) => {
          const { template } = card;
          return <Card key={index} {...{ ...template, title: template.name, type: template.id }} />;
        })}
      </CardDrawPile>
    </SceneContainer>
  );
});

export default GameUi;
