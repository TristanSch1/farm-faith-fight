import { gameStore } from "../../stores/GameStore.ts";
import { observer } from "mobx-react";

const Game = observer(() => {
  return (
    <div>
      {gameStore.player?.empire.score && <div>{gameStore.player?.empire.score}</div>}
      {gameStore.isGameStarted && (
        <div>
          <div onClick={() => Rune.actions.playCard()}>Joue la carte</div>
          <div onClick={() => Rune.actions.throwCard()}>Joue pas la carte</div>
        </div>
      )}
    </div>
  );
});

export default Game;
