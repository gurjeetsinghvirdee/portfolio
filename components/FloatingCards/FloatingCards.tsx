'use client'

import { motion } from 'framer-motion';
import styles from './FloatingCards.module.css';

const stack = [
    { tech: 'React · Next.js · TypeScript', color: '#d4a853' },
    { tech: 'Tailwind CSS · Framer Motion', color: '#c0c0c0' },
    { tech: 'Node.js · Express · PostgreSQL', color: '#d4a853' },
    { tech: 'AWS · Vercel · Docker', color: '#c0c0c0' },
    { tech: 'Figma · Git · VS Code', color: '#d4a853' },
]

export function FloatingCards() {
    return (
        <div className={styles.stackList}>
            {stack.map((item, i) => (
                <motion.div
                    key={i}
                    className={styles.stackItem}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.8 + i * 0.1,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{
                        x: 6,
                        transition: { duration: 0.2 }
                    }}
                >
                    <div className={styles.itemInner}>
                        <div 
                            className={styles.dot}
                            style={{ background: item.color }}
                        />
                        <span className={styles.techText}>{item.tech}</span>
                    </div>
                    <div 
                        className={styles.itemGlow}
                        style={{
                            background: `linear-gradient(90deg, ${item.color}20 0%, transparent 100%)`
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
