import { RuneClient } from "rune-games-sdk/multiplayer";
import { GameState } from "./GameState.ts";
import { GameActions } from "./GameActions.ts";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
