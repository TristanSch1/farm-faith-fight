import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';
import ConstructionBuildProgress from './ConstructionBuildProgress';

type Props = {
    children: React.ReactElement | React.ReactElement[],
    values: Array<{
        progress: number
    }>
}

const BuildWaitingList: React.FC<Props> = ({ children, values }) => (
    <div className={styles.build_waiting_list}>
        <AnimatePresence>
            {React.Children.map(children, (child, index) => {
                return (
                    <motion.div
                        key={child.key}
                        style={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <ConstructionBuildProgress progress={values[index].progress}>
                            {child}
                        </ConstructionBuildProgress>
                    </motion.div>
                );
            })}
        </AnimatePresence>
    </div >
)

export default BuildWaitingList;