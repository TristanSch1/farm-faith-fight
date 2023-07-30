import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    domain: string,
}

const ConstructionIcon: React.FC<Props> = ({ domain }) => (
    <div className={styles.icon_square}>
        <img src={`/src/assets/images/icons/construction/${domain}.png`} />
    </div>
)

export default ConstructionIcon;