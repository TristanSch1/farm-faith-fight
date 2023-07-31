import { observer } from "mobx-react";
import { gameStore } from "../../stores/GameStore.ts";
import { SceneContainer } from "../../../ui/src/layouts";
import { EmpireAvatar } from "../../../ui/src/components";
import styles from "./_css/startGame.module.css";

const StartGame = observer(() => {
  return (
    <SceneContainer>
      <div className={styles.flex}>
        {Object.entries(gameStore.game?.players ?? []).map(([playerId, player]) => {
          return (
            <div key={playerId}>
              <EmpireAvatar
                key={playerId}
                race_name={player.empire.name}
                pseudo={gameStore.players![playerId].displayName}
                status={gameStore.isPlayerReady(playerId)}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.flex1} />
      <button className={styles.button} onClick={() => Rune.actions.ready()}>
        {gameStore.isPlayerReady() ? "NOT READY" : "READY"}
      </button>
    </SceneContainer>
  );
});

export default StartGame;
