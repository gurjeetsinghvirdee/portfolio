'use client';

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { HiArrowRight } from "react-icons/hi2";

const services = [
    {
        num: '01',
        name: 'Web Development',
        description: 'Custom Web applications built with Next.js, TypeScript, and modern architecture patterns. Blazing fast, accessible, and built to scale from day one.'
    },
    {
        num: '02',
        name: 'Frontend Engineering',
        description: 'Component systems, design tokens, performance optimization, animations, and everything between design and working code. I close the gap.'
    },
    {
        num: '03',
        name: 'Backend & APIs',
        description: 'RESTful and GraphQL APIs, serverless functions, database design, and cloud infrastructure on AWS or Vercel. Robust systems that don\'t break under load'
    },
    {
        num: '04',
        name: 'AI Integration',
        description: 'LLM-powered features, RAG pipelines. smart dashboards, and custom automation that makes your product feel lke it\'s from the future.'
    },
    {
        num: '05',
        name: 'Technical Consulting',
        description: 'Architecture reviews, performance audits, tech stack decisions, and engineering roadmaps for founders who want to build right the first time.'
    }
]

export function Services() {
    return (
        <section id="services" className={styles.section}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.eyebrow}>What I Do</div>
                <h2 className={styles.title}>Services & <em>Expertise</em></h2>
            </motion.div>

            <div className={styles.list}>
                {services.map((s, i) => (
                    <motion.div
                        key={s.num}
                        className={styles.item}
                        data-cursor-hover
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <div className={styles.itemInner}>
                            <div className={styles.num}>{s.num}</div>
                            <div className={styles.content}>
                                <div className={styles.name}>{s.name}</div>
                                <p className={styles.description}>{s.description}</p>
                            </div>
                            <div className={styles.arrow}>
                                <HiArrowRight size={20} />
                            </div>
                        </div>
                        <div className={styles.itemGlow} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}