'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';
import { HiArrowRight, HiMinus, HiPlus } from 'react-icons/hi2';

const services = [
    {
        num: '01',
        name: 'Web Development',
        description: 'Custom Web applications built with Next.js, TypeScript, and modern architecture patterns. Blazing fast, accessible, and built to scale from day one.',
        icon: '⚡',
    },
    {
        num: '02',
        name: 'Frontend Engineering',
        description: 'Component systems, design tokens, performance optimization, animations, and everything between design and working code. I close the gap.',
        icon: '🎨',
    },
    {
        num: '03',
        name: 'Backend & APIs',
        description: 'RESTful and GraphQL APIs, serverless functions, database design, and cloud infrastructure on AWS or Vercel. Robust systems that don\'t break under load.',
        icon: '🔧',
    },
    {
        num: '04',
        name: 'AI Integration',
        description: 'LLM-powered features, RAG pipelines, smart dashboards, and custom automation that makes your product feel like it\'s from the future.',
        icon: '🤖',
    },
    {
        num: '05',
        name: 'Technical Consulting',
        description: 'Architecture reviews, performance audits, tech stack decisions, and engineering roadmaps for founders who want to build right the first time.',
        icon: '📐',
    },
];

function ScrambleNumber({ text, isActive }: { text: string; isActive: boolean }) {
    const [display, setDisplay] = useState(text);
    const chars = '0123456789#@$%';

    useEffect(() => {
        if (!isActive) {
            setDisplay(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split('').map((c, i) =>
                    i < iteration ? c : chars[Math.floor(Math.random() * chars.length)]
                ).join('')
            );
            iteration += 0.5;
            if (iteration >= text.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [isActive, text]);

    return <span>{display}</span>;
}

export function Services() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Holographic mouse follow
    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        const el = itemRefs.current[index];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--holo-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--holo-y', `${e.clientY - rect.top}px`);
    };

    return (
        <section id="services" className={styles.section}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.eyebrow}>What I Do</div>
                <h2 className={styles.title}>Services & <em>Expertise</em></h2>
            </motion.div>

            <div className={styles.list}>
                {services.map((s, i) => {
                    const isActive = activeIndex === i;

                    return (
                        <motion.div
                            key={s.num}
                            ref={(el: HTMLDivElement | null) => { itemRefs.current[i] = el; }}
                            className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                            data-cursor-hover
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            onClick={() => setActiveIndex(isActive ? null : i)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onMouseMove={(e) => handleMouseMove(e, i)}
                        >
                            <div className={styles.holoShine} />
                            <div className={styles.itemInner}>
                                <div className={styles.num}>
                                    <ScrambleNumber text={s.num} isActive={hoveredIndex === i} />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.nameRow}>
                                        <span className={styles.serviceIcon}>{s.icon}</span>
                                        <div className={styles.name}>{s.name}</div>
                                    </div>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.p
                                                className={styles.description}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {s.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className={styles.toggleIcon}>
                                    {isActive ? <HiMinus size={18} /> : <HiPlus size={18} />}
                                </div>
                                <div className={styles.arrow}>
                                    <HiArrowRight size={20} />
                                </div>
                            </div>
                            <div className={styles.itemGlow} />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}