import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement | React.ReactElement[];
}

const EconomyHeader: React.FC<Props> = ({ children }) => (
    <div className={styles.economy_header}>
        {children}
    </div>
)

export default EconomyHeader;