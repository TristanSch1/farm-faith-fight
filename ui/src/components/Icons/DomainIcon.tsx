import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    domain: string,
}

const DomainIcon: React.FC<Props> = ({ domain }) => (
    <div className={styles.icon}>
        <img src={`/src/assets/images/icons/domain/${domain}.png`} />
    </div>
)

export default DomainIcon;