import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

const barColorTuple: Array<[number, number, string]> = [
    [0, 34, 'rgb(246, 40, 40)'],
    [35, 65, 'rgb(255, 144, 47)'],
    [66, 100, 'rgb(9, 188, 9)'],
]

const getColor = (value: number) => {
    for (let i = 0; i < barColorTuple.length; i++) {
        if (value >= barColorTuple[i][0] && value <= barColorTuple[i][1]) {
            return barColorTuple[i][2]
        }
    }
}

export type ProgressBarProps = {
    value?: number,
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value } = { value: 0 }) => {
    const barColor = getColor(Math.min(100, Math.max(0, value!)));
    const style: React.CSSProperties = {
        width: `${value}%`,
        backgroundColor: barColor,
        boxShadow: `${barColor} 0px 2px 19px 2px`,
    };

    return (
        <div className={styles.progress_bar}>
            <div style={style} className={styles.bar}></div>
        </div>
    );
}

export default ProgressBar;