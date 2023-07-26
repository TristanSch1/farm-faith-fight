import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
}

const Card: React.FC<Props> = () => (
    <div className={styles.card}>
        Card
    </div>
)

export default Card;