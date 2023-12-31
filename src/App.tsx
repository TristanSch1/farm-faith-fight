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
      onChange: ({ newGame, players, yourPlayerId }) => {
        gameStore.update(newGame, players, yourPlayerId);
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

  return <>{gameStore.game.gameStarted ? <GameUi /> : <StartGame />}</>;
});
export default App;
