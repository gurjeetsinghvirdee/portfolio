'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { usePerformance } from '@/lib/hooks/usePerformance';
import styles from './Work.module.css';

function LivePreview({ url, color }: { url: string; color: string }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.iframeWrapper}>
            {!loaded && (
                <div className={styles.iframeLoader} style={{ '--card-color': color } as React.CSSProperties}>
                    <div className={styles.iframeSpinner} />
                    <span>Loading preview…</span>
                </div>
            )}
            <iframe
                src={url}
                title="Project Preview"
                className={styles.iframe}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                scrolling="no"
            />
        </div>
    );
}

const projects = [
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
        color: '#4a9eff',
    },
    {
        number: '03',
        category: 'AI Tool',
        title: 'Debate AI - An AI-Powered Debate Platform',
        tags: ['Next.js', 'Anthropic API', 'Supabase', 'Tailwind'],
        metric: '90% user satisfaction in beta testing',
        url: 'https://debate-ai-eta.vercel.app/',
        color: '#a855f7',
    },
];

export function Work() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { enableComplexAnimations } = usePerformance();

    // Horizontal scroll pinning with GSAP
    useEffect(() => {
        if (!enableComplexAnimations) return;

        let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined;
        let isActive = true;

        const setup = async () => {
            const { gsap, ScrollTrigger } = await import('@/lib/smooth-scroll');
            if (!isActive) return;

            const section = sectionRef.current;
            const scroll = scrollRef.current;
            if (!section || !scroll) return;

            ctx = gsap.context(() => {
                const cards = scroll.querySelectorAll(`.${styles.card}`);
                const totalScroll = scroll.scrollWidth - window.innerWidth;

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
                        onUpdate: (self) => {
                            const idx = Math.min(
                                Math.floor(self.progress * cards.length),
                                cards.length - 1
                            );
                            setActiveIndex(idx);
                        },
                    },
                });
            }, section);

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
            ctx?.revert();
        };
    }, [enableComplexAnimations]);

    // 3D tilt on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!enableComplexAnimations) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -12;
        const rotateY = (x - 0.5) * 12;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        
        // Move inner glow to mouse position
        const inner = card.querySelector(`.${styles.tiltGlow}`) as HTMLElement;
        if (inner) {
            inner.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.08), transparent 60%)`;
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    };

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
                    <div className={styles.progress}>
                        <span className={styles.progressCurrent}>{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className={styles.progressSep}>/</span>
                        <span className={styles.progressTotal}>{String(projects.length).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>

            <div className={styles.scrollContainer} ref={scrollRef}>
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className={styles.card}
                        data-cursor-hover
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ '--card-color': project.color } as React.CSSProperties}
                    >
                        <div className={styles.tiltGlow} />
                        <div className={styles.cardImage}>
                            <LivePreview url={project.url} color={project.color} />
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
                        <div className={styles.cardLink}>
                            <HiArrowUpRight />
                        </div>
                        <div className={styles.cardBorderGlow} />
                    </div>
                ))}
            </div>

            <div className={styles.dots}>
                {projects.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                    />
                ))}
            </div>
        </section>
    );
}