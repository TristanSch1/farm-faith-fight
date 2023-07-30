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
};

let currentCardIndex = -1;

const CardDrawPile = forwardRef<DrawPileAPI, Props>(({ debug_key, children, onDrawPileEmpty }, ref) => {
  children = Array.isArray(children) ? children : [children];
  const drawableRef = useRef<CardDrawableAPI[]>([]);

  const cardDistribution = () => {
    if (currentCardIndex === drawableRef.current.length - 1) currentCardIndex = -1;

    let i = 0;

    for (i; i < Math.min(numberOfCardToDistribute, drawableRef.current.length); i++) {
      drawableRef.current[i].throw((i + 1) * 0.2);
    }

    setTimeout(() => {
      for (i; i < drawableRef.current.length; i++) {
        drawableRef.current[i].display();
      }
    }, 3000);

    turnNextCard();
  };

  const turnNextCard = () => {
    currentCardIndex++

    const nextCard = drawableRef.current[currentCardIndex];
    const delay = currentCardIndex === 0 ? 600 : 250;

    if (nextCard) setTimeout(nextCard.turn, delay);
    else onDrawPileEmpty && onDrawPileEmpty();
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
        <CardDrawable onPick={turnNextCard} ref={(el) => setDrawableRef(el, index)} key={index} order={index + 1}>
          {child}
        </CardDrawable>
      ))}
    </div>
  );
});

export default CardDrawPile;
