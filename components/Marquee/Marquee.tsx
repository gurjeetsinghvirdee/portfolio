'use client';

import styles from './Marquee.module.css';

export function Marquee() {
    const items = [
        'React.js', 'Next.js', 'TypeScript','Node.js', 'Scalable Systems', 'UI / UX', 'Performance First', 'AI Integration'
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