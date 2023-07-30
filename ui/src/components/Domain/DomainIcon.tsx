import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

type Props = {
    domain: string,
}

const DomainIcon: React.FC<Props> = ({ domain }) => (
    <div className={styles.domain_icon}>
        <img src={`/src/assets/images/card/icons/${domain}.png`} />
    </div>
)

export default DomainIcon;