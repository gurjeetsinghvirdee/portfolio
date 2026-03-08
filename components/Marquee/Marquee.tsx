'use client';

import styles from './Marquee.module.css';

export function Marquee() {
    const items = [
        'System Design', 'UI / UX', 'Web Performance',  'Scalable Systems', 'AI Integration', 
        'Data Visualization', 'Developer Experience', 'Product Engineering', 'API Architecture', 'Real-Time Systems', 'Interactive Graphics', 'Performance Engineering'
    ]

    return (
        <div className={styles.wrap}>
            <div className={styles.track}>
                {[...items, ...items].map((item, i) => (
                    <span key={i} className={styles.item}>
                        {item} <span className={styles.sep}>✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}