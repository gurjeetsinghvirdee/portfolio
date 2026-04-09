'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingParticles } from './FloatingParticles';
import { usePerformance } from '@/lib/hooks/usePerformance';
import styles from './Hero.module.css';

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const { enableComplexAnimations } = usePerformance();

    const { scrollY } = useScroll();

    const overlayY = useTransform(scrollY, [0, 700], [0, -65]);
    const textY = useTransform(scrollY, [0, 600], [0, -60]);
    const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Character-by-character reveal with performance fallback
    const revealText = useCallback(() => {
        const headline = headlineRef.current;
        if (!headline) return;

        // ✅ fallback (low performance devices)
        if (!enableComplexAnimations) {
            headline.innerHTML = `
                <div class="${styles.line}">Frontend</div>
                <div class="${styles.line} ${styles.noWrap}">Heavy <em>Full Stack</em></div>
                <div class="${styles.line}">Engineer</div>
            `;
            return;
        }

        const lines = [
            { text: 'Frontend', class: '' },
            { text: 'Heavy <em>Full Stack</em>', class: styles.noWrap },
            { text: 'Engineer', class: '' },
        ];

        headline.innerHTML = lines.map((line, li) =>
            `<div class="${styles.line} ${line.class}" style="--line-index: ${li}">` +
            line.text.replace(/(<em>.*?<\/em>)|(\S)/g, (match, emTag) => {
                if (emTag) {
                    const inner = emTag.replace(/<\/?em>/g, '');
                    const chars = inner.split('').map((c: string) =>
                        `<span class="${styles.char}" style="--char-delay: ${Math.random() * 0.3}s">${c}</span>`
                    ).join('');
                    return `<em>${chars}</em>`;
                }
                return `<span class="${styles.char}" style="--char-delay: ${Math.random() * 0.3}s">${match}</span>`;
            }) +
            '</div>'
        ).join('');

        requestAnimationFrame(() => {
            setTimeout(() => {
                headline.classList.add(styles.revealed);
            }, 300);
        });
    }, [enableComplexAnimations]);

    useEffect(() => {
        revealText();
    }, [revealText]);

    // Glitch on hover (only if performance allows)
    useEffect(() => {
        const headline = headlineRef.current;
        if (!headline || !enableComplexAnimations) return;

        const handleEnter = () => headline.classList.add(styles.glitching);
        const handleLeave = () => headline.classList.remove(styles.glitching);

        headline.addEventListener('mouseenter', handleEnter);
        headline.addEventListener('mouseleave', handleLeave);

        return () => {
            headline.removeEventListener('mouseenter', handleEnter);
            headline.removeEventListener('mouseleave', handleLeave);
        };
    }, [enableComplexAnimations]);

    // Mouse parallax
    useEffect(() => {
        if (!enableComplexAnimations) return;

        const section = heroRef.current;
        if (!section) return;

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
    }, [enableComplexAnimations]);

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
                <FloatingParticles />
            </div>

            <motion.div className={styles.gradientOverlay} style={{ y: overlayY }} />

            <div className={styles.content}>
                <motion.div
                    className={styles.copyColumn}
                    style={{ y: textY, opacity: textOpacity }}
                >
                    <motion.div
                        className={styles.heroStatus}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <span className={styles.liveDot} />
                        <span className={styles.statusText}>
                            Available for projects <strong>Open to work</strong>
                        </span>
                    </motion.div>

                    <h1
                        ref={headlineRef}
                        className={styles.headline}
                        data-cursor-hover
                    />

                    <motion.div
                        className={styles.heroBottom}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 1.2,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p className={styles.lead}>
                            Frontend-heavy full stack engineer crafting
                            <strong> fast, intentional digital experiences.</strong>
                            <br />
                            React, Next.js, TypeScript, Node.js
                        </p>

                        <div className={styles.heroActions}>
                            <div className={styles.ctaGroup}>
                                <a
                                    href="#work"
                                    className={styles.primaryCTA}
                                    data-cursor-hover
                                    data-cursor-label="Explore"
                                >
                                    <span className={styles.ctaText}>View My Work</span>
                                    <span className={styles.ctaShine} />
                                </a>
                            </div>

                            <div className={styles.scrollHint}>
                                <span className={styles.scrollLine} />
                                <span className={styles.scrollText}>Scroll</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}