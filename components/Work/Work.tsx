'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import styles from './Work.module.css';

type Project = {
    number: string;
    category: string;
    title: string;
    tags: string[];
    metric: string;
    url: string;
    color: string;
};

function LivePreview({ url, color, shouldLoad }: { url: string; color: string; shouldLoad: boolean }) {
    const [loaded, setLoaded] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        if (shouldLoad) setHasMounted(true);
    }, [shouldLoad]);

    return (
        <div className={styles.iframeWrapper}>
            {!loaded && (
                <div className={styles.iframeLoader} style={{ '--card-color': color } as React.CSSProperties}>
                    <div className={styles.iframeSpinner} />
                    <span>Loading preview…</span>
                </div>
            )}
            {hasMounted && (
                <iframe
                    src={url}
                    title="Project Preview"
                    className={styles.iframe}
                    onLoad={() => setLoaded(true)}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    scrolling="no"
                />
            )}
        </div>
    );
}

const projects: Project[] = [
    {
        number: '01',
        category: 'SaaS Platform',
        title: 'MediaKit - The Privacy-First Media Toolkit',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Appwrite'],
        metric: 'Reduced file processing time by 80%',
        url: 'https://usemediakit.app/',
        color: '#d4a853',
    },
    {
        number: '02',
        category: 'Data Visualization',
        title: '3D Latency Topology Visualizer',
        tags: ['Three.js', 'WebGL', 'Recharts', 'Next.js', 'TypeScript'],
        metric: 'Real-time visualization for 15+ global nodes',
        url: 'https://latency-topology-visualizer-steel.vercel.app/',
        color: '#c79a3b',
    },
    {
        number: '03',
        category: 'AI Tool',
        title: 'Debate AI - An AI-Powered Debate Platform',
        tags: ['Next.js', 'Anthropic API', 'Supabase', 'Tailwind'],
        metric: '90% user satisfaction in beta testing',
        url: 'https://debate-ai-eta.vercel.app/',
        color: '#b8872d',
    },
];

export function Work() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const isManualView = projects.length > 3;
    const maxVisibleManual = projects.length > 5 ? 5 : 4;
    const visibleManualProjects = projects.slice(0, maxVisibleManual);
    const remainingProjects = Math.max(projects.length - maxVisibleManual, 0);

    const renderProjectCard = (project: Project, shouldLoad: boolean, key: string | number) => (
        <div
            key={key}
            className={`${styles.card} ${isManualView ? styles.manualCard : ''}`}
            data-cursor-hover
            style={{ '--card-color': project.color } as React.CSSProperties}
        >
            <div className={styles.cardImage}>
                <LivePreview
                    url={project.url}
                    color={project.color}
                    shouldLoad={shouldLoad}
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

    // Horizontal scroll pinning with GSAP
    useEffect(() => {
        if (isManualView) {
            return;
        }

        let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined;
        let isActive = true;
        let resizeObserver: ResizeObserver | null = null;

        const setup = async () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const { gsap, ScrollTrigger } = await import('@/lib/smooth-scroll');
            if (!isActive) return;

            const section = sectionRef.current;
            const scroll = scrollRef.current;
            if (!section || !scroll) return;

            ctx = gsap.context(() => {
                const cards = scroll.querySelectorAll(`.${styles.card}`);
                const totalScroll = Math.max(scroll.scrollWidth - section.offsetWidth, 0);
                if (totalScroll <= 0) return;

                gsap.to(scroll, {
                    x: -totalScroll,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${totalScroll}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const idx = Math.min(
                                Math.floor(self.progress * cards.length),
                                cards.length - 1
                            );
                            if (idx !== activeIndexRef.current) {
                                activeIndexRef.current = idx;
                                setActiveIndex(idx);
                            }
                        },
                    },
                });
            }, section);

            resizeObserver = new ResizeObserver(() => {
                ScrollTrigger.refresh();
            });
            resizeObserver.observe(section);
            resizeObserver.observe(scroll);

            // Delay refresh so layout is fully settled
            setTimeout(() => ScrollTrigger.refresh(), 200);

            // Guard against StrictMode effect teardown racing async setup.
            if (!isActive) {
                ctx?.revert();
                ScrollTrigger.refresh();
            }
        };

        setup().catch((error) => {
            console.error('Failed to initialize Work scroll animation', error);
        });

        return () => {
            isActive = false;
            resizeObserver?.disconnect();
            ctx?.revert();
        };
    }, [isManualView]);

    return (
        <section id="work" ref={sectionRef} className={styles.section}>
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
                    {!isManualView && (
                        <div className={styles.progress}>
                            <span className={styles.progressCurrent}>{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className={styles.progressSep}>/</span>
                            <span className={styles.progressTotal}>{String(projects.length).padStart(2, '0')}</span>
                        </div>
                    )}
                </div>
            </div>

            {isManualView ? (
                <div className={styles.manualGrid}>
                    {visibleManualProjects.map((project) => renderProjectCard(project, true, project.title))}

                    {remainingProjects > 0 && (
                        <div className={styles.moreCard}>
                            <div className={styles.moreCount}>+{remainingProjects}</div>
                            <div className={styles.moreLabel}>More Projects</div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.scrollContainer} ref={scrollRef}>
                        {projects.map((project, i) => renderProjectCard(project, Math.abs(i - activeIndex) <= 1, i))}
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
            )}
        </section>
    );
}