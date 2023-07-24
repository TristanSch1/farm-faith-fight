import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

function SceneContainer({ children }) {
    return (
        <div className={styles.scene_container}>
            {children}
        </div>
    )
}

export default SceneContainer
