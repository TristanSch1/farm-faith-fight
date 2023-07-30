import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';
import ConstructionIcon from '../Icons/ConstructionIcon';
import RaceIcon from '../Icons/RaceIcon';

type Props = {
    data: Array<{
        domain: string,
        tier: number,
        race?: string,
    }>
}

const SpyReport: React.FC<Props> = ({ data }) => (
    <div className={styles.spy_report}>
        <AnimatePresence>
            {data.map(({ domain, race }) => (
                <motion.div
                    className={styles.spy_report__construction}
                    key={domain + race}
                    style={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >
                    <ConstructionIcon domain={domain} />
                    {race && <RaceIcon race={race} />}
                    <span className={styles.spy_report__tier}>T1</span>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
)

export default SpyReport;