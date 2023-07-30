import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    race_name: string,
    pseudo: string,
}

const EmpirePlayer: React.FC<Props> = ({ race_name, pseudo }) => (
    <>
        <div className={styles.empire_avatar}>
            <img src={`/src/assets/images/avatar/${race_name}.png`} />
        </div>
        <div className={styles.empire_player_pseudo}>
            {pseudo}
        </div>
    </>
)

export default EmpirePlayer;