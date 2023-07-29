import { useEffect } from "react";

const Game = () => {
  useEffect(() => {
    Rune.actions.prepareDeck();
  }, []);
  return <div>GAME</div>;
};

export default Game;
