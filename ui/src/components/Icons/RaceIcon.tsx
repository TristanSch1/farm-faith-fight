import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    race: string,
}

const RaceIcon: React.FC<Props> = ({ race }) => (
    <div className={styles.icon}>
        <img src={`/src/assets/images/avatar/${race}.png`} />
    </div>
)

export default RaceIcon;