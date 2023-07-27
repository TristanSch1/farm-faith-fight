import { gameStore } from "../../App.tsx";
import { observer } from "mobx-react";

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
      <button onClick={Rune.actions.ready}>READY</button>
    </div>
  );
});

export default StartGame;
