import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, PanInfo, delay } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement,
    order: number,
    onPick?: () => void,
    onPickLeft?: () => void,
    onPickRight?: () => void,
}

export type CardDrawableAPI = {
    turn: () => void,
    throw: (delay: number) => void,
    display: () => void,
}

const CardDrawable = forwardRef<CardDrawableAPI, Props>(({ children, order, onPick, onPickLeft, onPickRight, }: Props, ref) => {
    const debugDurationFactor = 1;
    const duration = (duration: number) => duration * debugDurationFactor;
    const drawTreshold = 150;
    const [drag, setDrag] = useState<boolean | 'x' | 'y'>(false);
    const x = useMotionValue(-400);
    const y = useMotionValue(-150);
    const opacity = useMotionValue(0);
    const rotateY = useMotionValue(180);
    const rotateOnDrag = useTransform(x, [-200, 200], [-10, 10]);
    const scaleOnRotateY = useTransform(rotateY, [180, 90, 0], [1, 1.5, 1]);
    const isCardPicked = (info: PanInfo) => Math.abs(info.offset.x) > drawTreshold;

    const turnCard = () => animate(rotateY, 0, { duration: duration(.5), onComplete: () => setDrag('x'), });
    const throwCard = (delay: number) => animate([
        [x, 0, { ease: 'backIn' }],
        [y, 0, { ease: 'backIn' }],
        [opacity, 1, { duration: duration(.1) }],
    ], { duration: duration(.2), delay });
    const displayCard = () => {
        // Like throw but without animation
        rotateOnDrag.set(0);
        x.set(0);
        y.set(0);
        opacity.set(1);
    };

    const resetCardPosition = () => animate(x, 0, { duration: duration(.5) });
    const throwCardAway = (info: PanInfo) => {
        animate([
            [x, x.get() + (info.offset.x > 0 ? -200 : 200), { duration: duration(1) }],
            [y, 1000, { duration: duration(1) }],
            [opacity, 0, { duration: duration(.5) }],
        ]);
    }

    const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (isCardPicked(info)) {
            throwCardAway(info)
            info.offset.x > 0 ? onPickRight && onPickRight() : onPickLeft && onPickLeft();
            onPick && onPick();
            return;
        }

        resetCardPosition();
    }

    useImperativeHandle(ref, (): CardDrawableAPI => ({
        turn: turnCard,
        throw: throwCard,
        display: displayCard,
    }));

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
            drag={drag}
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