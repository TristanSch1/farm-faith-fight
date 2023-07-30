import { observer } from "mobx-react";
import eventsStore from "../../stores/EventsStore.ts";
import { useEffect } from "react";
import { gameStore } from "../../stores/GameStore.ts";

const Game = observer(() => {
  useEffect(() => {
    gameStore.randomizeSingleTarget();
  }, [gameStore.game?.players[gameStore.playerId].empire.turn]);

  return (
    <div>
      <div>
        <div>Playable card</div>
        <div>{gameStore.currentTurnCard.template.name}</div>
        <div>Food: {gameStore.currentTurnCard.template.cost.food}</div>
        <div>Wood: {gameStore.currentTurnCard.template.cost.wood}</div>
      </div>
      <hr />
      {gameStore.player?.empire.buildings.map((building) => <div>building :{building}</div>)}
      {gameStore.playerId && <div>{gameStore.playerId}</div>}
      {gameStore.player?.empire.name && <div>{gameStore.player?.empire.name}</div>}
      {gameStore.player?.empire.food && <div>Food: {gameStore.player?.empire.food}</div>}
      {gameStore.player?.empire.wood && <div>Wood: {gameStore.player?.empire.wood}</div>}
      {gameStore.player?.empire.turn && <div>Turn: {gameStore.player.empire.turn}</div>}
      {gameStore.player?.empire.health && <div>Health: {gameStore.player?.empire.health}</div>}
      {gameStore.player?.empire.spyingQueue && gameStore.player?.empire.spyingQueue.map(spy => {
       return <span>spy health : {gameStore.game?.players[spy.playerId].empire.health}</span>
      })}

      <hr />
      {gameStore.isGameStarted && (
        <div style={{ display: "flex" }}>
          <button onClick={() => eventsStore.send({ type: "throwCard" })}>THROW</button>
          &nbsp;&nbsp;
          <button
            onClick={() => {
              console.log("play card on ", gameStore.randomPlayerIdTarget);
              eventsStore.send({
                type: "playCard",
                payload: {
                  card: gameStore.currentTurnCard,
                  empire: gameStore.player!.empire,
                  randomPlayerIdTarget: gameStore.randomPlayerIdTarget,
                },
              });
            }}
          >
            <span
              style={{
                color: gameStore.isThisPlayableCard ? "" : "red",
              }}
            >
              PLAY
            </span>
          </button>
        </div>
      )}
    </div>
  );
});

export default Game;
