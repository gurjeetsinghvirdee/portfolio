'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeveloperTerminal } from '@/components/DeveloperTerminal/DeveloperTerminal';
import styles from './Hero.module.css';

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const overlayY = useTransform(scrollY, [0, 700], [0, -65]);

    // Elegant letter reveal
    useEffect(() => {
        const lines = [
            { el: line1Ref.current, words: ['Frontend'] },
            { el: line2Ref.current, words: ['Heavy', '<em>Full Stack</em>'] },
            { el: line3Ref.current, words: ['Engineer'] },
        ];

        lines.forEach(({ el, words }) => {
            if (el) {
                el.innerHTML = words.map(w => `<span class="${styles.word}">${w}</span>`).join(' ');
            }
        });

        const wordEls = document.querySelectorAll<HTMLElement>(`.${styles.word}`);
        const revealTimers: number[] = [];

        wordEls.forEach((w, i) => {
            const id = window.setTimeout(() => {
                w.style.opacity = "1";
                w.style.transform = "translateY(0)";
            }, 400 + i * 140);

            revealTimers.push(id);
        });

        return () => {
            revealTimers.forEach((id) => window.clearTimeout(id));
        };
    }, []);

    useEffect(() => {
        const section = heroRef.current;
        if (!section) {
            return;
        }

        let rafId = 0;
        let currentX = window.innerWidth * 0.5;
        let currentY = window.innerHeight * 0.3;
        let targetX = currentX;
        let targetY = currentY;

        const handleScroll = () => {
            section.style.setProperty('--hero-scroll', `${window.scrollY * 0.08}px`);
        };

        const paint = () => {
            currentX += (targetX - currentX) * 0.16;
            currentY += (targetY - currentY) * 0.16;

            const parallaxX = (currentX - window.innerWidth * 0.5) * 0.08;
            const parallaxY = (currentY - window.innerHeight * 0.45) * 0.08;

            section.style.setProperty('--mouse-x', `${currentX}px`);
            section.style.setProperty('--mouse-y', `${currentY}px`);
            section.style.setProperty('--parallax-x', `${parallaxX}px`);
            section.style.setProperty('--parallax-y', `${parallaxY}px`);
            rafId = requestAnimationFrame(paint);
        };

        const handleMove = (event: MouseEvent) => {
            targetX = event.clientX;
            targetY = event.clientY;
        };

        const handleLeave = () => {
            targetX = window.innerWidth * 0.5;
            targetY = window.innerHeight * 0.3;
        };

        section.style.setProperty('--mouse-x', `${currentX}px`);
        section.style.setProperty('--mouse-y', `${currentY}px`);
        section.style.setProperty('--parallax-x', '0px');
        section.style.setProperty('--parallax-y', '0px');
        handleScroll();

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        section.addEventListener('mouseleave', handleLeave);
        rafId = requestAnimationFrame(paint);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('scroll', handleScroll);
            section.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <motion.section 
            ref={heroRef}
            className={styles.hero} 
            id="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.warpBg} aria-hidden>
                <div className={`${styles.parallaxLayer} ${styles.plGrid}`} />
                <div className={`${styles.parallaxLayer} ${styles.plGlowOne}`} />
                <div className={`${styles.parallaxLayer} ${styles.plGlowTwo}`} />
                <div className={styles.plNoise} />
            </div>

            <motion.div 
                className={styles.gradientOverlay} 
                style={{ y: overlayY }}
            />

            <div className={styles.content}>
                <div className={styles.copyColumn}>
                    <div className={styles.heroStatus}>
                        <span className={styles.liveDot} />
                        <span className={styles.statusText}>Available for projects <strong>Open to work</strong></span>
                    </div>

                    <h1 className={styles.headline}>
                        <div ref={line1Ref} className={styles.line} />
                        <div ref={line2Ref} className={styles.line} />
                        <div ref={line3Ref} className={styles.line} />
                    </h1>

                    <div className={styles.heroBottom}>
                        <p className={styles.lead}>
                            Frontend-heavy full stack engineer crafting
                            <strong> fast, intentional digital experiences.</strong>
                            <br />
                            React, Next.js, TypeScript, Node.js
                        </p>

                        <div className={styles.heroActions}>
                            <div className={styles.ctaGroup}>
                                <a href="#work" className={styles.primaryCTA}>View My Work</a>
                            </div>

                            <div className={styles.scrollHint}>
                                <span className={styles.scrollLine} />
                                Scroll
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.visualColumn}>
                    <div className={styles.terminalWrapper}>
                        <DeveloperTerminal />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}