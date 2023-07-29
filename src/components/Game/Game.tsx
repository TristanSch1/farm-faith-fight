import { gameStore } from "../../stores/GameStore.ts";

const Game = () => {
  return (
    <div>
      {gameStore.isGameStarted && (
        <div>
          <div onClick={() => Rune.actions.playCard()}>Joue la carte</div>
          <div onClick={() => Rune.actions.throwCard()}>Joue pas la carte</div>
        </div>
      )}
    </div>
  );
};

export default Game;
