'use client';

import { motion } from 'framer-motion';
import { HiArrowUpRight } from "react-icons/hi2";
import styles from './Work.module.css';

const projects = [
    {
        number: '01',
        category: 'SaaS Platform',
        title: 'MediaKit - The Privacy-First Media Toolkit',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Appwrite'],
        metric: 'Reduced file processing time by 80%',
        bg: styles.bg1,
    },
    {
        number: '02',
        category: 'Data Visualization',
        title: '3D Latency Topology Visualizer',
        tags: ['Three.js', 'WebGL', 'Recharts', 'Next.js', 'TypeScript'],
        metric: 'Real-time visualization for 15+ global nodes',
        bg: styles.bg2,
    },
    {
        number: '03',
        category: 'AI Tool',
        title: 'Debate AI - An AI-Powered Debate Platform',
        tags: ['Next.js', 'Anthropic API', 'Supabase', 'Tailwind'],
        metric: '90% user satisfaction in beta testing',
        bg: styles.bg3,
    },
];

export function Work() {
    return (
        <section id="work" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>Selected Work</div>
                    <h2 className={styles.title}>
                        Projects that <em>ship.</em>
                    </h2>
                </div>
                <a href="#" className={styles.viewAll}>All Projects →</a>
            </div>

            <div className={styles.grid}>
                {projects.map((project, i) => (
                    <motion.div 
                        key={i}
                        className={styles.card}
                        data-cursor-hover
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -12 }}
                    >
                        <div className={`${styles.inner} ${project.bg}`}>
                            <div className={styles.number}>{project.number}</div>
                            <div className={styles.content}>
                                <div className={styles.category}>{project.category}</div>
                                <h3 className={styles.title}>{project.title}</h3>
                                <div className={styles.tags}>
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles.metric}>{project.metric}</div>
                            </div>
                            <a href="#" className={styles.link}>
                                <HiArrowUpRight />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}