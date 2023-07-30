import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement,
    progress: number,
}

const ConstructionBuildProgress: React.FC<Props> = ({ children, progress }) => {

    progress = Math.max(0, Math.min(100, progress));

    return (
        <div className={styles.build_waiting_list__item}>
            <div style={{ width: `${progress}%` }} className={styles.build_waiting_list__progress}></div>
            {children}
        </div>
    );
}

export default ConstructionBuildProgress;