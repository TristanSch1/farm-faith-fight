import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';

type Props = {
    children: React.ReactElement,
    fill: number,
}

const EmpireStatus: React.FC<Props> = ({ children, fill }) => (
    <div className={styles.empire_status}>
        <ProgressBar value={fill} />
        {children}
    </div>
)

export default EmpireStatus;