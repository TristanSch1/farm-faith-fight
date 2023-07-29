import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    color: string,
}

const Card: React.FC<Props> = ({ color }) => (
    <div style={{ backgroundColor: color }} className={styles.card}>
        Card
    </div>
)

export default Card;