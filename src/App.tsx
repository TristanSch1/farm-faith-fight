import { useEffect, useRef } from "react";
import reactLogo from "./assets/rune.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GameStore from "./stores/GameStore.ts";
import { observer } from "mobx-react";

const gameStore = new GameStore();

const App = observer(() => {
  const nameInput = useRef("");
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://developers.rune.ai" target="_blank">
          <img src={reactLogo} className="logo rune" alt="Rune logo" />
        </a>
      </div>
      {Object.entries(gameStore.players ?? []).map(([id, player]) => {
        return <div key={id}>{player.displayName}</div>;
      })}
      <h1>Vite + Rune</h1>
    </>
  );
});

export default App;
