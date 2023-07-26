import React from 'react'
import { useMotionValue, useTransform, useAnimation } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement,
}

const CardDrawable: React.FC<Props> = ({ children }) => (
    <div className={styles.card_draw_pile}>
        {children}
    </div>
)

export default CardDrawable;