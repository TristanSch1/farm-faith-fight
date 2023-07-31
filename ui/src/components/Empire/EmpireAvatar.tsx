import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./style.module.css";
import { clsx } from "clsx";

type Props = {
  race_name: string;
  pseudo: string;
  status?: boolean;
  isPlayer: boolean;
};

const EmpirePlayer: React.FC<Props> = ({ race_name, pseudo, status, isPlayer }) => (
  <>
    <div className={styles.empire_avatar}>
      <img src={`images/avatar/${race_name}.png`} />
    </div>
    <div
      className={clsx(styles.empire_player_pseudo, {
        [styles.ready]: status,
      })}
    >
      {pseudo}
      {isPlayer && <span style={{ fontSize: '1.3rem' }}><br />(You)</span>}
    </div>
  </>
);

export default EmpirePlayer;
