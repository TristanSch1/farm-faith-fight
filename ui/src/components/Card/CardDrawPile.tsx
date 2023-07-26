import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement | React.ReactElement[],
}

const CardDrawPile: React.FC<Props> = ({ children }) => (
    <div className={styles.card_draw_pile}>
        {children}
    </div>
)

export default CardDrawPile;