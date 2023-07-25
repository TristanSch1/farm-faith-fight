import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    imageUrl: string,
}

const EmpireAvatar: React.FC<Props> = ({ imageUrl }) => (
    <div className={styles.empire_avatar}>
        <img src={imageUrl} />
    </div>
)

export default EmpireAvatar;