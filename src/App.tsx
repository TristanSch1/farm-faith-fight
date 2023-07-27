import { useEffect } from "react";
import "./App.css";
import GameStore from "./stores/GameStore.ts";
import StartGame from "./components/StartGame/StartGame.tsx";
import { observer } from "mobx-react";

export const gameStore = new GameStore();

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
      <StartGame />
    </>
  );
});
export default App;
