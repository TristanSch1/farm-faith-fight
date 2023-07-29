import React from 'react'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type CardImagePath = 'building/spiritual_t1'

type Props = {
    image_path: CardImagePath,
}

const Card: React.FC<Props> = ({ image_path }) => (
    <div style={{ backgroundImage: `url(/src/assets/images/card/${image_path}.png)` }} className={styles.card}>
        <div className={styles.card__inner}>
            <div className={styles.card__content}>
                blabla
            </div>
        </div>
    </div>
)

export default Card;