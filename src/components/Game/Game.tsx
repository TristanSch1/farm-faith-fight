import { observer } from "mobx-react";
import { gameStore } from "../../App.tsx";
import eventsStore from "../../stores/EventsStore.ts";

const Game = observer(() => {
  return (
    <div>
      <div>
        <div>Playable card</div>
        <div>{gameStore.currentTurnCard.template.name}</div>
        <div>Food: {gameStore.currentTurnCard.template.cost.food}</div>
        <div>Wood: {gameStore.currentTurnCard.template.cost.wood}</div>
        <div>Is playable: {gameStore.isPlayableCard ? "Yes" : "No"}</div>
      </div>
      <hr />
      {gameStore.player?.empire.name && <div>{gameStore.player?.empire.name}</div>}
      {gameStore.player?.empire.food && <div>Food: {gameStore.player?.empire.food}</div>}
      {gameStore.player?.empire.wood && <div>Wood: {gameStore.player?.empire.wood}</div>}
      {gameStore.player?.empire.turn && <div>Turn: {gameStore.player.empire.turn}</div>}
      {gameStore.player?.empire.health && <div>Health: {gameStore.player?.empire.health}</div>}
      <hr />
      {gameStore.isGameStarted && (
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              Rune.actions.throwCard();
              eventsStore.send({ type: "throwCard" });
            }}
          >
            THROW
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => {
              if (!gameStore.isPlayableCard) return;
              Rune.actions.playCard(gameStore.currentTurnCard);
              eventsStore.send({ type: "playCard" });
            }}
          >
            <span style={{ color: gameStore.isPlayableCard ? "" : "red" }}>PLAY</span>
          </button>
        </div>
      )}
    </div>
  );
});

export default Game;
