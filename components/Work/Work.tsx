'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import styles from './Work.module.css';

type Project = {
    number: string;
    category: string;
    title: string;
    tags: string[];
    metric: string;
    url: string;
    color: string;
    image: string;
    year: string;
};

const projects: Project[] = [
    {
        number: '01',
        category: 'SaaS Platform',
        title: 'MediaKit - Privacy-First Media Toolkit',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Appwrite'],
        metric: 'Reduced file processing time by 80%',
        url: 'https://usemediakit.app/',
        color: '#d4a853',
        image: '/work/MediaKit.png',
        year: '2024',
    },
    {
        number: '02',
        category: 'Data Visualization',
        title: '3D Latency Topology Visualizer',
        tags: ['Three.js', 'WebGL', 'Recharts', 'Next.js', 'TypeScript'],
        metric: 'Real-time visualization for 15+ global nodes',
        url: 'https://latency-topology-visualizer-steel.vercel.app/',
        color: '#7eb8e0',
        image: '/work/Latency-Topology-Visualizer.png',
        year: '2025',
    },
    {
        number: '03',
        category: 'AI Tool',
        title: 'Debate AI - AI-Powered Debate Platform',
        tags: ['Next.js', 'Anthropic API', 'Supabase', 'Tailwind'],
        metric: 'Core logic and prompt engineering in active development — work in progress',
        url: '',
        color: '#a78bfa',
        image: '/work/DebateAI.png',
        year: 'WIP',
    },
    {
        number: '04',
        category: 'Demo Project',
        title: 'Innovation Hub',
        tags: ['HTML 5', 'CSS 3', 'JavaScript'],
        metric: 'Built as a showcase demo for presentation purposes',
        url: 'https://gurjeetsinghvirdee.github.io/innovation-hub/',
        color: '#60a5fa',
        image: '/work/School-Innovation-Portal.png',
        year: '2024',
    },
    {
        number: '05',
        category: 'Climate Awareness',
        title: 'Jalvayu Sankalp',
        tags: ['React 19', 'Vite', 'Chart.js', 'JavaScript'],
        metric: 'Bilingual climate app built for Earth Day 2026',
        url: 'https://jalvayu-sankalp.vercel.app/',
        color: '#4ade80',
        image: '/work/Jalvayu-Sankalp.png',
        year: '2026',
    },
];

export function Work() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(projects.length > 1);

    const renderProjectCard = (project: Project, key: string | number) => (
        <div
            key={key}
            className={styles.card}
            data-cursor-hover
            style={{ '--card-color': project.color } as React.CSSProperties}
        >
            {/* Background Number (Decorative) */}
            <div className={styles.bgNumber}>{project.number}</div>

            {/* Content panel */}
            <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                    <div className={styles.metaLeft}>
                        <span className={styles.cardCategory}>{project.category}</span>
                        <span className={styles.yearBadge}>{project.year}</span>
                    </div>
                    <span className={styles.cardNumber}>{project.number}</span>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>

                <div className={styles.cardTags}>
                    {project.tags.map((tag, j) => (
                        <span key={j} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <div className={styles.cardMetric}>
                    <span className={styles.metricDot} />
                    <span>{project.metric}</span>
                </div>

                {project.url ? (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLink}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span>Visit Project</span>
                        <HiArrowUpRight className={styles.linkIcon} />
                    </a>
                ) : (
                    <div className={styles.comingSoon}>
                        <span>Coming Soon</span>
                    </div>
                )}
            </div>

            {/* Ambient glow */}
            <div className={styles.cardGlow} />
        </div>
    );

    const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
        const container = scrollRef.current;
        if (!container) return;

        const cards = Array.from(container.querySelectorAll(`.${styles.card}`)) as HTMLDivElement[];
        if (cards.length === 0) return;

        const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
        const card = cards[safeIndex];
        const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

        container.scrollTo({ left: Math.max(0, left), behavior });
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const updateState = () => {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            const left = container.scrollLeft;
            const edgeThreshold = 8;

            setCanScrollLeft(left > 4);
            setCanScrollRight(left < maxScrollLeft - 4);

            const cards = Array.from(container.querySelectorAll(`.${styles.card}`)) as HTMLDivElement[];
            if (cards.length <= 1) { setActiveIndex(0); return; }
            if (left <= edgeThreshold) { setActiveIndex(0); return; }
            if (left >= maxScrollLeft - edgeThreshold) { setActiveIndex(cards.length - 1); return; }

            const viewportCenter = left + container.clientWidth / 2;
            let nextIndex = 0;
            let smallestDistance = Number.POSITIVE_INFINITY;

            cards.forEach((card, idx) => {
                const cardCenter = card.offsetLeft + card.clientWidth / 2;
                const distance = Math.abs(cardCenter - viewportCenter);
                if (distance < smallestDistance) { smallestDistance = distance; nextIndex = idx; }
            });

            setActiveIndex(nextIndex);
        };

        setActiveIndex(0);
        scrollToIndex(0, 'auto');
        updateState();
        container.addEventListener('scroll', updateState, { passive: true });
        window.addEventListener('resize', updateState);

        return () => {
            container.removeEventListener('scroll', updateState);
            window.removeEventListener('resize', updateState);
        };
    }, [scrollToIndex]);

    const handleScrollByCard = (direction: 'left' | 'right') => {
        scrollToIndex(direction === 'left' ? activeIndex - 1 : activeIndex + 1);
    };

    return (
        <section id="work" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <motion.div
                        className={styles.eyebrow}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        Selected Work
                    </motion.div>
                    <motion.h2
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Projects that <em>ship.</em>
                    </motion.h2>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.progress}>
                        <span className={styles.progressCurrent}>{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className={styles.progressSep}>/</span>
                        <span className={styles.progressTotal}>{String(projects.length).padStart(2, '0')}</span>
                    </div>
                    <div className={styles.navButtons}>
                        <button
                            type="button"
                            className={styles.navButton}
                            aria-label="Scroll projects left"
                            onClick={() => handleScrollByCard('left')}
                            disabled={!canScrollLeft}
                        >
                            <HiChevronLeft />
                        </button>
                        <button
                            type="button"
                            className={styles.navButton}
                            aria-label="Scroll projects right"
                            onClick={() => handleScrollByCard('right')}
                            disabled={!canScrollRight}
                        >
                            <HiChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            <>
                <div className={styles.scrollContainer} ref={scrollRef}>
                    {projects.map((project, i) => renderProjectCard(project, i))}
                </div>

                <div className={styles.dots}>
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to project ${i + 1}`}
                            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                            onClick={() => scrollToIndex(i)}
                        />
                    ))}
                </div>
            </>
        </section>
    );
}