import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

export type EmpireAvatarProps = {
}

const EmpireAvatar: React.FC<EmpireAvatarProps> = () => (
    <div className={styles.empire_avatar}>
        Avatar
    </div>
)

export default EmpireAvatar;