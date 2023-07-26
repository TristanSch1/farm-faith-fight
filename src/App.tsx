import { useEffect } from "react";
import "./App.css";
import GameStore from "./stores/GameStore.ts";
import { observer } from "mobx-react";

const gameStore = new GameStore();

const App = observer(() => {
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, players, yourPlayerId, rollbacks, action, event }) => {
        gameStore.update(newGame, players, yourPlayerId);
        console.log("onChange", {
          newGame,
          players,
          yourPlayerId,
          rollbacks,
          action,
          event,
        });
      },
    });
  }, []);

  if (!gameStore.game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Object.entries(gameStore.game.players ?? []).map(([id, player]) => {
        return (
          <div key={id}>
            {player.empire.name} <span>{gameStore.isPlayerReady(id) ? "READY" : "WAITING"}</span>
          </div>
        );
      })}
      <button onClick={() => Rune.actions.ready()}>READY</button>
      <h1>Vite + Rune</h1>
    </>
  );
});

export default App;
