import { useEffect } from "react";
import "./App.css";
import { gameStore } from "./stores/GameStore.ts";
import StartGame from "./components/StartGame/StartGame.tsx";
import { observer } from "mobx-react";
import { fxStore } from "./stores/FxStore.ts";
import { GameActionsStore } from "./stores/GameActionsStore.ts";
import GameUi from "./components/Game/GameUi.tsx";

fxStore.init();
GameActionsStore.initEvents();

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

  console.log(gameStore.playerId, 'APP GAME RENDER');

  return <>{gameStore.game.gameStarted ? <GameUi /> : <StartGame />}</>;
});
export default App;
