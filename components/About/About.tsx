'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const stats = [
    { value: 35, suffix: '+', label: 'Projects Shipped' },
    { value: 92, suffix: '%', label: 'Client Satisfaction' },
    { value: 5, suffix: 'yr', label: 'Experience' },
    { value: '∞', suffix: '', label: 'Coffee Consumed' },
];

const skills = [
    'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
    'PostgreSQL', 'Prisma', 'Docker', 'Three.js', 'React Three Fiber',
    'REST APIs', 'CI/CD', 'Figma', 'WebGL', 'LLM Integration'
];

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const animateValue = (el: HTMLElement | null, start: number, end: number, duration: number) => {
        if (!el) return;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            el.textContent = value.toString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end.toString();
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        if (!isInView) return;

        const statValues = document.querySelectorAll(`.${styles.statValue}`);
        statValues.forEach((el, i) => {
            const stat = stats[i];
            if (typeof stat.value === 'number') {
                setTimeout(() => {
                    animateValue(el as HTMLElement, 0, stat.value as number, 1800);
                }, i * 200);
            }
        });
    }, [isInView]);

    return (
        <motion.section
            id="about"
            className={styles.section}
            ref={sectionRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.eyebrow}>About</div>

            <div className={styles.grid}>
                <motion.div
                    className={styles.visual}
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <motion.div
                        className={styles.frame}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <motion.img
                            src='/about.png'
                            alt='Gurjeet'
                            className={styles.image}
                            initial={{ scale: 0.95, filter: 'grayscale(0.6) contrast(0.95)' }}
                            whileInView={{ scale: 1 }}
                            whileHover={{ filter: 'grayscale(0) contrast(1.1)' }}
                            transition={{ duration: 0.6 }}
                        />
                        <div className={styles.tag}>📍 Available Worldwide</div>
                    </motion.div>

                    <div className={styles.corner}></div>
                    <div className={styles.corner2}></div>
                </motion.div>

                <div className={styles.content}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        I build things<br />that <em>last.</em>
                    </motion.h2>

                    <motion.p
                        className={styles.text}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        I'm <strong>Gurjeet</strong> - a Frontend-Heavy Full Stack Engineer obsessed with performance, craft, and clarity.
                        I turn complex problems into scalable, elegant web systems that users love and teams can maintain.
                        <br /><br />
                        My work lives at the intersection of engineering rigor and design precision. Every line of code I write is intentional.
                        Every interface I build respects the user's time.
                    </motion.p>

                    <div className={styles.statsGrid}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                className={styles.stat}
                                data-cursor-hover
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <div className={styles.statValue}>
                                    {typeof s.value === 'number' ? '0' : s.value}
                                    {s.suffix}
                                </div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.chips}>
                        {skills.map((skill, i) => (
                            <motion.span
                                key={i}
                                className={styles.chip}
                                data-cursor-hover
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.7 + i * 0.03 }}
                                whileHover={{ y: -4, backgroundColor: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--accent)' }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}