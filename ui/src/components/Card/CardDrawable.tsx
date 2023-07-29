import React, { forwardRef, useImperativeHandle } from 'react'
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement,
}
type VoidFunction = () => void;

const CardDrawable = forwardRef(({ children }: Props, ref) => {
    const debugDurationFactor = 1;
    const drawTreshold = 150;
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], ['-10deg', '10deg']);
    const rotateY = useMotionValue('180deg');
    const opacity = useMotionValue(1);

    const drawCard = (info: PanInfo) => {
        animate(x, x.get() + (info.offset.x > 0 ? -125 : 125), { duration: 1 * debugDurationFactor });
        animate(y, 1000, { duration: 1 * debugDurationFactor });
        animate(opacity, 0, { duration: 0.5 * debugDurationFactor });
    }

    const resetCard = () => {
        animate(x, 0, { duration: 0.5 * debugDurationFactor });
    }

    const isCardDrawed = (info: PanInfo) => Math.abs(info.offset.x) > drawTreshold;

    useImperativeHandle(ref, () => ({
        turnCard: () => animate(rotateY, '0deg', { duration: 1 * debugDurationFactor })
    }));

    return (
        <motion.div
            style={{
                height: '100%',
                zIndex: 1000,
                position: 'relative',
                perspective: 1500,
            }}
        >
            <motion.div
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    x,
                    y,
                    rotate,
                    rotateY,
                    perspective: '500px',
                    opacity,
                }}
                drag="x"
                whileDrag={{ scale: 1.1 }}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => isCardDrawed(info) ? drawCard(info) : resetCard()}
            >
                {children}
            </motion.div>
        </motion.div>
    );
});

export default CardDrawable;