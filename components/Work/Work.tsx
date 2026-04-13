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
};

const projects: Project[] = [
    {
        number: '01',
        category: 'SaaS Platform',
        title: 'MediaKit - The Privacy-First Media Toolkit',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Appwrite'],
        metric: 'Reduced file processing time by 80%',
        url: 'https://usemediakit.app/',
        color: '#d4a853',
        image: '/work/MediaKit.png',
    },
    {
        number: '02',
        category: 'AI Tool',
        title: 'Debate AI - An AI-Powered Debate Platform',
        tags: ['Next.js', 'Anthropic API', 'Supabase', 'Tailwind'],
        metric: '90% user satisfaction in beta testing',
        url: 'https://debate-ai-eta.vercel.app/',
        color: '#b8872d',
        image: '/work/DebateAI.png',
    },
    {
        number: '03',
        category: 'Demo Project',
        title: 'Innovation Hub',
        tags: ['HTML 5', 'CSS 3', 'JavaScript'],
        metric: 'Built as a showcase demo for presentation purposes',
        url: 'https://gurjeetsinghvirdee.github.io/innovation-hub/',
        color: '#b8872d',
        image: '/work/School-Innovation-Portal.png',
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
            <div className={styles.cardImage}>
                <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 960px) 88vw, 520px"
                    loading="lazy"
                    className={styles.projectImage}
                />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardNumber}>{project.number}</div>
                <div className={styles.cardCategory}>{project.category}</div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.cardTags}>
                    {project.tags.map((tag, j) => (
                        <span key={j} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <div className={styles.cardMetric}>
                    <span className={styles.metricDot} />
                    {project.metric}
                </div>
            </div>
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                onClick={(e) => e.stopPropagation()}
            >
                <HiArrowUpRight />
            </a>
            <div className={styles.cardBorderGlow} />
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

        container.scrollTo({
            left: Math.max(0, left),
            behavior,
        });
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
            if (cards.length <= 1) {
                setActiveIndex(0);
                return;
            }

            // Keep count stable at the edges where center alignment is not physically reachable.
            if (left <= edgeThreshold) {
                setActiveIndex(0);
                return;
            }

            if (left >= maxScrollLeft - edgeThreshold) {
                setActiveIndex(cards.length - 1);
                return;
            }

            const viewportCenter = left + container.clientWidth / 2;
            let nextIndex = 0;
            let smallestDistance = Number.POSITIVE_INFINITY;

            cards.forEach((card, idx) => {
                const cardCenter = card.offsetLeft + card.clientWidth / 2;
                const distance = Math.abs(cardCenter - viewportCenter);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    nextIndex = idx;
                }
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
        const targetIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
        scrollToIndex(targetIndex);
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
                        <span
                            key={i}
                            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                        />
                    ))}
                </div>
            </>
        </section>
    );
}