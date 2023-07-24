import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';

export type EmpireStatusProps = {
    children: React.ReactElement,
    health: number,
}

const EmpireStatus: React.FC<EmpireStatusProps> = ({ children, health }) => (
    <div className={styles.empire_status}>
        <ProgressBar value={health} />
        {children}
    </div >
)

export default EmpireStatus;