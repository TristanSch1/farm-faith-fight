import { observer } from "mobx-react";
import { gameStore } from "../../stores/GameStore.ts";

const StartGame = observer(() => {
  return (
    <div>
      {Object.entries(gameStore.game?.players ?? []).map(([id, player]) => {
        return (
          <div key={id}>
            {player.empire.name} <span>{gameStore.isPlayerReady(id) ? "READY" : "WAITING"}</span>
          </div>
        );
      })}
      <button onClick={() => Rune.actions.ready()}>{gameStore.isPlayerReady() ? "NOT READY" : "READY"}</button>
    </div>
  );
});

export default StartGame;
