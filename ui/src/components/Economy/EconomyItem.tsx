import React from 'react'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import styles from './style.module.css';

import { WoodSVG, FoodSVG } from '..';

type ItemType = 'WOOD' | 'FOOD';

type Props = {
    fill: number,
    type: ItemType
}

function ResourceItem({ type }: { type: ItemType }) {
    switch (type) {
        case 'FOOD':
            return <FoodSVG />;
        case 'WOOD':
            return <WoodSVG />;
    }
}

const EconomyItem: React.FC<Props> = ({ fill = 0, type }) => (
    <div className={styles.economy_item}>
        <div className={styles.background}>
            <ResourceItem type={type} />
        </div>
        <div style={{ height: `${fill}%` }} className={styles.foreground}>
            <ResourceItem type={type} />
        </div>
    </div>
)

export default EconomyItem;