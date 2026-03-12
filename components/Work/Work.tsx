'use client';

import styles from './Work.module.css';
import { motion } from 'framer-motion';

const projects = [
    {
        number: '01',
        category: 'SaaS Platform',
        title: 'MediaKit - The Privacy-First Media Toolkit',
        tags: ['Next.js, TypeScript, Tailwind CSS, Shadcn, Appwrite'],
        bgClass: styles.bg1,
        metrics: ['Reduced file processing time by 80%'],
    },
    {
        number: '02',
        category: 'Data Visualization Tool',
        title: '3D Latency Topology Visualizer',
        tags: ['Three.js, WebGL, Recharts.js, Next.js, TypeScript'],
        bgClass: styles.bg2,
        metrics: ['Visualized latency data for 15+ global nodes in real-time'],
    },
    {
        number: '03',
        category: 'AI Tool',
        title: 'Debate AI - An AI-Powered Debate Platform',
        tags: ['Next.js, TypeScript, Anthropic API, Tailwind CSS, JavaScript, Supabase'],
        bgClass: styles.bg3,
        metrics: ['Achieved 90% user satisfaction in beta testing with 100+ users'],
    },
]

export function Work() {
    return (
        <section id='work' className={styles.section}>
            <div className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>
                        Selected Work
                    </div>
                    <h2 className={styles.title}>
                        Projects that <em>ship.</em>
                    </h2>
                </div>
                <a href="#" className={styles.viewAll}>
                    All Projects
                </a>
            </div>

            <motion.div className={styles.grid}>
                {projects.map((p, i) => (
                    <div key={i} className={styles.card} data-cursor-hover>
                        <div className={`${styles.inner} ${i === 0 ? styles.featured : ''}`}>
                            <div className={`${styles.bg} ${p.bgClass}`}></div>
                            <div className={styles.content}>
                                <div className={styles.number}>
                                    {p.number}
                                </div>
                                <a href="#" className={styles.link}>↗</a>
                                <div className={styles.category}>
                                    {p.category}
                                </div>
                                <h3 className={styles.cardTitle}>
                                    {p.title}
                                </h3>
                                <div className={styles.tags}>
                                    {p.tags.map((tag, j) => (
                                        <span key={j} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <motion.div
                                    className={styles.metrics}
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {p.metrics.map((m, k) => <span key={k}>{m}</span>)}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}