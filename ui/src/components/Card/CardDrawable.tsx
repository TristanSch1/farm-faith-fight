import React from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement,
}

const CardDrawable: React.FC<Props> = ({ children }) => {
    const dragMotionValue = useMotionValue(0);
    const cardTransformSwipeValue = useTransform(dragMotionValue, [-200, 200], [-50, 50]);
    const cardOpacityValue = useTransform(dragMotionValue, [-200, -10, 0, 10, 200], [0, .8, 1, .8, 0]);
    const animationController = useAnimation();

    return (
        <motion.div
            style={{
                height: '100%',
                zIndex: 1000,
                position: 'relative',
                transform: cardTransformSwipeValue,
                opacity: cardOpacityValue
            }}
            drag="x"
            whileDrag={{
                scale: 1.1
            }}
            dragConstraints={{ left: -100, right: 100 }}
        >
            {children}
        </motion.div>
    );
}

export default CardDrawable;