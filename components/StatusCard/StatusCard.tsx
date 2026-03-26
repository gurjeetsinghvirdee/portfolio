'use client';

import { motion } from 'framer-motion';
import styles from './StatusCard.module.css';

export function StatusCard() {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 1.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]                
            }}
        >
            <div className={styles.cardInner}>
                <div className={styles.header}>
                    <div className={styles.pulse}>
                        <div className={styles.pulseRing} />
                        <div className={styles.pulseDot} />
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.status}>Available Now</span>
                        <span className={styles.subtitle}>Open for select projects</span>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.startValue}>40+</span>
                        <span className={styles.startLabel}>Projects</span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.startValue}>5yr</span>
                        <span className={styles.startLabel}>Experience</span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.startValue}>92%</span>
                        <span className={styles.startLabel}>Satisfaction</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <span className={styles.footerLabel}>Response Time</span>
                    <span className={styles.footerValue}>~ 24 hours</span>
                </div>
            </div>

            <div className={styles.cardGlow} />
        </motion.div>
    )
}