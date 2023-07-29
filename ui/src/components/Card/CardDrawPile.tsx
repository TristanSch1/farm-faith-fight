import React, { useEffect, useRef } from 'react'

import CardDrawable, { CardDrawableAPI } from './CardDrawable';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement | React.ReactElement[],
}

const CardDrawPile: React.FC<Props> = ({ children }) => {
    children = Array.isArray(children) ? children : [children];
    const drawableRef = useRef<CardDrawableAPI[]>([]);
    let currentCardIndex = -1;

    const turnNextCard = () => {
        const nextCard = drawableRef.current[currentCardIndex++];
        if (nextCard) setTimeout(nextCard.turn, 250);
    }

    const setDrawableRef = (element: CardDrawableAPI | null, index: number) => {
        if (!element) return;
        drawableRef.current[index] = element;
    }

    useEffect(() => turnNextCard());

    return (
        <div className={styles.card_draw_pile}>
            {React.Children.map(children, (child, index) => (
                <CardDrawable onPick={turnNextCard} ref={el => setDrawableRef(el, index)} key={index} order={index + 1}>
                    {child}
                </CardDrawable>
            ))}
        </div>
    );
}

export default CardDrawPile;