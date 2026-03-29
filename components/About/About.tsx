'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BiMapPin } from 'react-icons/bi';
import styles from './About.module.css';

const stats = [
    { value: 40, suffix: '+', label: 'Projects Shipped' },
    { value: 92, suffix: '%', label: 'Client Satisfaction' },
    { value: 5, suffix: '', label: 'Years Experience' },
    { value: 999, suffix: '', label: 'Cups of Coffee', display: '∞' },
];

const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
    'Framer Motion', 'Three.js', 'Tailwind', 'Docker', 'AI Integration'
];

function AnimatedCounter({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!inView || display) return;

        let start = 0;
        const duration = 1800;
        const startTime = Date.now();

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * value);
            setCount(start);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [inView, value, display]);

    return (
        <div ref={ref} className={styles.statValue}>
            {display || `${count}${suffix}`}
        </div>
    );
}

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Mouse parallax for background
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let rafId = 0;
        let currentX = window.innerWidth * 0.5;
        let currentY = window.innerHeight * 0.35;
        let targetX = currentX;
        let targetY = currentY;

        const paint = () => {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;
            section.style.setProperty('--about-mouse-x', `${currentX}px`);
            section.style.setProperty('--about-mouse-y', `${currentY}px`);
            rafId = requestAnimationFrame(paint);
        };

        const onMove = (event: MouseEvent) => {
            targetX = event.clientX;
            targetY = event.clientY;
        };

        const onLeave = () => {
            targetX = window.innerWidth * 0.5;
            targetY = window.innerHeight * 0.35;
        };

        section.style.setProperty('--about-mouse-x', `${currentX}px`);
        section.style.setProperty('--about-mouse-y', `${currentY}px`);
        window.addEventListener('mousemove', onMove, { passive: true });
        section.addEventListener('mouseleave', onLeave);
        rafId = requestAnimationFrame(paint);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMove);
            section.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    // Image clip-path reveal on scroll
    useEffect(() => {
        const setup = async () => {
            const { gsap, ScrollTrigger } = await import('@/lib/smooth-scroll');
            const img = imageRef.current;
            if (!img) return;

            gsap.fromTo(img, 
                { clipPath: 'inset(100% 0 0 0)' },
                {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        };

        setup();
    }, []);

    return (
        <section id="about" className={styles.section} ref={sectionRef}>
            <div className={styles.waterBg} aria-hidden>
                <div className={styles.waterBlobA} />
                <div className={styles.waterBlobB} />
                <div className={styles.waterBlobC} />
                <div className={styles.cursorRipple} />
            </div>

            <motion.div
                className={styles.eyebrow}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                About
            </motion.div>

            <div className={styles.grid}>
                {/* Visual */}
                <motion.div
                    className={styles.visual}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.frame} ref={imageRef}>
                        <img
                            src="/about.png"
                            alt="Gurjeet Singh"
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay} />
                        <motion.div
                            className={styles.tag}
                            whileHover={{ scale: 1.05, y: -3 }}
                        >
                            <BiMapPin className={styles.pin} />
                            Available Worldwide
                        </motion.div>
                    </div>

                    {/* Decorative frame corners */}
                    <div className={`${styles.corner} ${styles.cornerTL}`} />
                    <div className={`${styles.corner} ${styles.cornerBR}`} />
                </motion.div>

                {/* Narrative */}
                <div className={styles.content}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        I build things<br />that <em>last.</em>
                    </motion.h2>

                    <motion.p
                        className={styles.text}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                    >
                        I&apos;m Gurjeet — a frontend-heavy full stack engineer who believes in quiet excellence.
                        I turn complex technical challenges into elegant, maintainable digital products that users trust instantly and teams love to work with.
                    </motion.p>

                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.stat}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                data-cursor-hover
                            >
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} display={stat.display} />
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Skills orbit */}
                    <div className={styles.skillsContainer}>
                        <div className={styles.skillsOrbitLabel}>Tech Stack</div>
                        <div className={styles.skills}>
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.08,
                                        backgroundColor: 'var(--accent)',
                                        color: 'var(--bg)',
                                        borderColor: 'var(--accent)',
                                    }}
                                    data-cursor-hover
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}