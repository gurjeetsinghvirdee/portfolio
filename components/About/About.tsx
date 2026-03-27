'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { BiMapPin } from 'react-icons/bi';

const stats = [
    { value: '40+', label: 'Projects Shipped' },
    { value: '92%', label: 'Client Satisfaction' },
    { value: '5', label: 'Years Experience' },
    { value: '∞', label: 'Cups of Coffee' },
];

const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
    'Framer Motion', 'Three.js', 'Tailwind', 'Docker', 'AI Integration'
];

export function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) {
            return;
        }

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

    return (
        <section id="about" className={styles.section} ref={sectionRef}>
            <div className={styles.waterBg} aria-hidden>
                <div className={styles.waterBlobA} />
                <div className={styles.waterBlobB} />
                <div className={styles.waterBlobC} />
                <div className={styles.cursorRipple} />
            </div>

            <div className={styles.eyebrow}>About</div>

            <div className={styles.grid}>
                {/* Visual */}
                <motion.div 
                    className={styles.visual}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 280 }}
                >
                    <div className={styles.frame}>
                        <img 
                            src="/about.png" 
                            alt="Gurjeet Singh" 
                            className={styles.image}
                        />
                        <div className={styles.tag}>
                            <BiMapPin className={styles.pin} />
                            Available Worldwide
                        </div>
                    </div>
                </motion.div>

                {/* Narrative */}
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        I build things<br />that <em>last.</em>
                    </h2>

                    <p className={styles.text}>
                        I'm Gurjeet - a frontend-heavy full stack engineer who believes in quiet excellence. 
                        I turn complex technical challenges into elegant, maintainable digital products that users trust instantly and teams love to work with.
                    </p>

                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.stat}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                data-cursor-hover
                            >
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.skills}>
                        {skills.map((skill, i) => (
                            <motion.span 
                                key={i}
                                className={styles.skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.04 }}
                                whileHover={{ y: -3, backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                data-cursor-hover
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}