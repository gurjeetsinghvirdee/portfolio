'use client';

import styles from './SectionDivider.module.css';

export function SectionDivider() {
    return (
        <div className={styles.divider}>
            <div className={styles.line} />
            <div className={styles.diamond}>◆</div>
            <div className={styles.line} />
        </div>
    );
}
