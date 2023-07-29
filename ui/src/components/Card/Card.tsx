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
    <div className={styles.card}>
        <div className={styles.card__inner}>
            <img draggable={false} src={`/src/assets/images/card/${image_path}.png`} />
            <div className={styles.card__content}>
                <span className={styles.card__content__title}>
                    Lieu spirituel (Tier 2)
                </span>
                <p>
                    Lieu de spiritualité bla bla bla va attaquer <span style={{ color: '#ff902f', fontWeight: 'bold' }}>KEVIN</span>
                </p>
            </div>
        </div>
    </div>
)

export default Card;