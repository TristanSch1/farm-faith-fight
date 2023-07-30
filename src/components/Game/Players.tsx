import { EmpireAvatar, EmpiresHeader, EmpireStatus } from "../../../ui/src/components";
import { gameStore } from "../../stores/GameStore.ts";
import { observer } from "mobx-react";

export const Players = observer(() => {
  return (
    <EmpiresHeader>
      {Object.entries(gameStore.game!.players).map(([playerId, player]) => (
        <EmpireStatus fill={gameStore.player!.empire.health} key={playerId}>
          <EmpireAvatar race_name={player.empire.name} />
        </EmpireStatus>
      ))}
    </EmpiresHeader>
  );
});
