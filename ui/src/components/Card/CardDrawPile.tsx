import React, { forwardRef, useImperativeHandle, useRef } from "react";

import CardDrawable, { CardDrawableAPI } from "./CardDrawable";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./style.module.css";

const numberOfCardToDistribute = 5;

export type DrawPileAPI = {
  distribute: () => void;
};
type Props = {
  children: React.ReactElement | React.ReactElement[];
  debug_key?: string;
  onDrawPileEmpty?: () => void;
  onPlayCard?: (card: CardDrawableAPI) => void;
  onThrowCard?: (card: CardDrawableAPI) => void;
};

let currentCardIndex = -1;
let wasDistributed = false;

const CardDrawPile = forwardRef<DrawPileAPI, Props>(
  ({ children, onDrawPileEmpty, onPlayCard, onThrowCard }, ref) => {
    children = Array.isArray(children) ? children : [children];
    const drawableRef = useRef<CardDrawableAPI[]>([]);

    const cardDistribution = () => {
      if (wasDistributed) return;

      let i = 0;

      for (i; i < Math.min(numberOfCardToDistribute, drawableRef.current.length); i++) {
        drawableRef.current[i].distribute((i + 1) * 0.2);
      }

      setTimeout(() => {
        for (i; i < drawableRef.current.length; i++) {
          drawableRef.current[i].display();
        }
      }, 3000);

      turnNextCard();

      if (!wasDistributed) wasDistributed = true;
    };

    const turnNextCard = () => {
      currentCardIndex++;

      const nextCard = drawableRef.current[currentCardIndex];
      const delay = currentCardIndex === 0 ? 600 : 250;

      if (nextCard) setTimeout(nextCard.turn, delay);
      else {
        onDrawPileEmpty && onDrawPileEmpty();

        // setTimeout(nextCard.turn, delay)
        wasDistributed = false;
        currentCardIndex = -1;
        cardDistribution();
      }
    };

    const setDrawableRef = (element: CardDrawableAPI | null, index: number) => {
      if (!element) return;
      drawableRef.current[index] = element;
    };

    useImperativeHandle(
      ref,
      (): DrawPileAPI => ({
        distribute: cardDistribution,
      }),
    );

    return (
      <div className={styles.card_draw_pile}>
        {React.Children.map(children, (child, index) => (
          <CardDrawable
            onPickRight={() => onPlayCard && onPlayCard(drawableRef.current[currentCardIndex])}
            onPickLeft={() => onThrowCard && onThrowCard(drawableRef.current[currentCardIndex])}
            onThrown={turnNextCard}
            ref={(el) => setDrawableRef(el, index)}
            key={index}
            order={index + 1}
          >
            {child}
          </CardDrawable>
        ))}
      </div>
    );
  },
);

export default CardDrawPile;
