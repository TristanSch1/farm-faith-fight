import React, { forwardRef, useImperativeHandle } from 'react'
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type DrawDirection = 'left' | 'right';

type Props = {
    children: React.ReactElement,
    order: number,
    onPick?: () => void,
    onPickLeft?: () => void,
    onPickRight?: () => void,
}

export type CardDrawableAPI = {
    turn: () => void
}

const CardDrawable = forwardRef<CardDrawableAPI, Props>(({ children, order, onPick, onPickLeft, onPickRight, }: Props, ref) => {
    const debugDurationFactor = 1;
    const drawTreshold = 150;
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const opacity = useMotionValue(1);
    const rotateY = useMotionValue(180);
    const rotateOnDrag = useTransform(x, [-200, 200], [-10, 10]);
    const scaleOnRotateY = useTransform(rotateY, [180, 90, 0], [1, 1.5, 1]);
    const cardDrawableAPI: CardDrawableAPI = {
        turn: () => animate(rotateY, 0, { duration: .5 * debugDurationFactor })
    }

    const drawCard = (info: PanInfo) => {
        animate(x, x.get() + (info.offset.x > 0 ? -125 : 125), { duration: 1 * debugDurationFactor });
        animate(y, 1000, { duration: 1 * debugDurationFactor });
        animate(opacity, 0, { duration: 0.5 * debugDurationFactor });
    }
    const resetCard = () => {
        animate(x, 0, { duration: 0.5 * debugDurationFactor });
    }
    const isCardDrawed = (info: PanInfo) => Math.abs(info.offset.x) > drawTreshold;

    const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        isCardDrawed(info) ? drawCard(info) : resetCard();

        info.offset.x > 0 ? onPickRight && onPickRight() : onPickLeft && onPickLeft();
        onPick && onPick();
    }

    useImperativeHandle(ref, () => cardDrawableAPI);

    return (
        <motion.div
            className={styles.card_drawable}
            style={{
                zIndex: 1100 - order,
                x,
                y,
                rotate: rotateOnDrag,
                scale: scaleOnRotateY,
                opacity,
            }}
            drag="x"
            whileDrag={{ scale: 1.1 }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
        >
            <motion.div
                className={styles.card_drawable__swipe}
                style={{
                    rotateY,
                }}
            >
                {children}
            </motion.div>
        </motion.div >
    );
});

export default CardDrawable;