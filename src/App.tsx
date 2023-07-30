import { useEffect } from "react";
import "./App.css";
import { GameStore } from "./stores/GameStore.ts";
import StartGame from "./components/StartGame/StartGame.tsx";
import { observer } from "mobx-react";
import Game from "./components/Game/Game.tsx";
import { fxStore } from "./stores/FxStore.ts";

fxStore.init();
export const gameStore = new GameStore();

const App = observer(() => {
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, players, yourPlayerId, rollbacks, action, event }) => {
        gameStore.update(newGame, players, yourPlayerId);
        // core : states
        // console.log("onChange", {
        //   newGame,
        //   players,
        //   yourPlayerId,
        //   rollbacks,
        //   action,
        //   event,
        // });
      },
    });
  }, []);

  useEffect(() => {
    if (gameStore.allPlayersReady) {
      Rune.actions.startGame();
    }
  }, [gameStore.allPlayersReady]);
  if (!gameStore.game) {
    return <div>Loading...</div>;
  }

  return <>{gameStore.game.gameStarted ? <Game /> : <StartGame />}</>;
});
export default App;
