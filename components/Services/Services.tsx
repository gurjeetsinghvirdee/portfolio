'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

type Service = {
    number: string;
    title: string;
    description: string;
    deliverables: string[];
    icon: string;
};

const services: Service[] = [
    {
        number: '01',
        icon: '⬡',
        title: 'Web App Development',
        description:
            'Full-stack web applications built for speed, scale, and clarity. From SaaS dashboards to interactive data tools — performance-first, always.',
        deliverables: ['React / Next.js', 'Node.js APIs', 'Database Design', 'Deployment & CI/CD'],
    },
    {
        number: '02',
        icon: '◈',
        title: 'UI Design & Prototyping',
        description:
            'Design systems and pixel-perfect interfaces that feel intentional. I bridge the gap between design and code — so what ships matches what was designed.',
        deliverables: ['Component Libraries', 'Motion Design', 'Responsive Layouts', 'Design Systems'],
    },
    {
        number: '03',
        icon: '◎',
        title: 'Technical Writing',
        description:
            'Complex ideas made readable. Developer docs, API references, architecture explainers, and onboarding guides that developers actually want to read.',
        deliverables: ['API Documentation', 'Architecture Guides', 'Dev Onboarding', 'README & Wikis'],
    },
    {
        number: '04',
        icon: '◇',
        title: 'Copywriting',
        description:
            'Words that convert. Landing page copy, product descriptions, and marketing content written with a technical edge — accurate, compelling, and sharp.',
        deliverables: ['Landing Pages', 'Product Copy', 'Email Sequences', 'Case Studies'],
    },
];

export function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section id="services" className={styles.section} ref={sectionRef}>
            <div className={styles.bg} aria-hidden>
                <div className={styles.bgGlow} />
            </div>

            <div className={styles.header}>
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    What I Do
                </motion.div>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Services that <em>ship.</em>
                </motion.h2>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    End-to-end digital craftsmanship — from the first line of code to the last word on the page.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {services.map((service, i) => (
                    <motion.div
                        key={service.number}
                        className={styles.card}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        data-cursor-hover
                    >
                        <div className={styles.cardTop}>
                            <span className={styles.icon} aria-hidden>{service.icon}</span>
                            <span className={styles.number}>{service.number}</span>
                        </div>

                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardDesc}>{service.description}</p>

                        <ul className={styles.deliverables}>
                            {service.deliverables.map((d) => (
                                <li key={d} className={styles.deliverable}>
                                    <span className={styles.deliverableDot} aria-hidden />
                                    {d}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.cardLine} aria-hidden />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}