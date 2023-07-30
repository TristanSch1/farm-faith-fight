import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    race_name: string,
}

const EmpireAvatar: React.FC<Props> = ({ race_name }) => (
    <div className={styles.empire_avatar}>
        <img src={`/src/assets/images/avatar/${race_name}.png`} />
    </div>
)

export default EmpireAvatar;