import React, { forwardRef, useImperativeHandle, useState } from "react";
import { animate, motion, PanInfo, useMotionValue, useSpring, useTransform } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./style.module.css";

type Props = {
  children: React.ReactElement;
  order: number;
  onPick?: () => void;
  onPickLeft?: () => void;
  onPickRight?: () => void;
  onThrown?: () => void;
};

export type CardDrawableAPI = {
  turn: () => void;
  distribute: (delay: number) => void;
  display: () => void;
  reset: () => void;
  throw: () => void;
};

const CardDrawable = forwardRef<CardDrawableAPI, Props>(
  ({ children, order, onPick, onPickLeft, onPickRight, onThrown }: Props, ref) => {
    const debugDurationFactor = 1;
    const duration = (duration: number) => duration * debugDurationFactor;
    const drawTreshold = 150;
    const [drag, setDrag] = useState<boolean | "x" | "y">(false);
    const x = useSpring(-400, {
      mass: 0.6,
      damping: 8,
      stiffness: 65,
    });
    const y = useMotionValue(-150);
    const opacity = useMotionValue(0);
    const rotateY = useMotionValue(180);
    const rotateOnDrag = useTransform(x, [-200, 200], [-10, 10]);
    const scaleOnRotateY = useTransform(rotateY, [180, 90, 0], [1, 1.5, 1]);
    const isCardPicked = () => Math.abs(lastPanInfo.offset.x) > drawTreshold;
    let lastPanInfo: PanInfo;

    const turnCard = () => animate(rotateY, 0, { duration: duration(0.5), onComplete: () => setDrag("x") });
    const distributeCard = (delay: number) =>
      animate(
        [
          [x, 0, { ease: "backIn" }],
          [y, 0, { ease: "backIn" }],
          [opacity, 1, { duration: duration(0.1) }],
        ],
        { duration: duration(0.2), delay },
      );
    const displayCard = () => {
      // Like throw but without animation
      rotateOnDrag.set(0);
      x.set(0);
      y.set(0);
      opacity.set(1);
    };

    const resetCardPosition = () => animate(x, 0, { duration: duration(0.1), ease: "anticipate" });
    const throwCardAway = () => {
      onThrown && onThrown();

      animate([
        [x, x.get() + (lastPanInfo.offset.x ? -200 : 200), { duration: duration(1) }],
        [y, 1000, { duration: duration(1) }],
        [opacity, 0, { duration: duration(0.5) }],
      ]);
    };

    const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      lastPanInfo = info;

      if (isCardPicked()) {
        info.offset.x > 0 ? onPickRight && onPickRight() : onPickLeft && onPickLeft();
        onPick && onPick();
        return;
      }

      resetCardPosition();
    };

    useImperativeHandle(
      ref,
      (): CardDrawableAPI => ({
        turn: turnCard,
        distribute: distributeCard,
        throw: throwCardAway,
        display: displayCard,
        reset: resetCardPosition,
      }),
    );

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
      </motion.div>
    );
  },
);

export default CardDrawable;
