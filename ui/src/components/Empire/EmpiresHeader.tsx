import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    children: React.ReactElement[];
}

const EmpiresHeader: React.FC<Props> = ({ children }) => (
    <div className={styles.empires_header}>
        {children}
    </div>
)

export default EmpiresHeader;