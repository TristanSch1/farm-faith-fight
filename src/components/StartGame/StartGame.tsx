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

      <div className={styles.ready} onClick={() => (!gameStore.isPlayerReady() ? Rune.actions.ready() : undefined)}>
        {gameStore.isPlayerReady() ? "I'm ready to beat them all!" : "Ready to fight for the glory?"}
      </div>
      {gameStore.isPlayerReady() && (
        <div className={styles.coward} onClick={() => (gameStore.isPlayerReady() ? Rune.actions.ready() : undefined)}>
          Click here to cancel... chicken!
        </div>
      )}
    </SceneContainer>
  );
});

export default StartGame;
