'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeveloperTerminal } from '@/components/DeveloperTerminal/DeveloperTerminal';
import styles from './Hero.module.css';

type Particle = {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    alpha: number;
    vx: number;
    vy: number;
    driftX: number;
    driftY: number;
    color: string;
};

export function Hero() {
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const particleRef = useRef<HTMLCanvasElement>(null);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -50]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    const proofChips = ['Next.js product builds', 'TypeScript systems', 'AI-powered workflows', 'Design-engineering craft'];

    useEffect(() => {
        const revealTimers: number[] = [];

        // Letter reveal animation
        const lines = [
            { el: line1Ref.current, words: ['Frontend'] },
            { el: line2Ref.current, words: ['Heavy', '<em>Full Stack</em>'] },
            { el: line3Ref.current, words: ['Engineer'] }
        ];

        lines.forEach(({ el, words }) => {
            if (el) {
                el.innerHTML = words.map(w => `<span class="${styles.word}">${w}</span>`).join(' ');
            }
        });

        const wordEls = document.querySelectorAll(`.${styles.word}`);
        wordEls.forEach((w, i) => {
            const timer = window.setTimeout(() => {
                (w as HTMLElement).style.transition = 'opacity 0.7s var(--ease), transform 0.7s var(--ease)';
                (w as HTMLElement).style.opacity = '1';
                (w as HTMLElement).style.transform = 'translateY(0)';
            }, 400 + i * 140);

            revealTimers.push(timer);
        });

        // Parallax layers
        const layers = Array.from(document.querySelectorAll('[data-speed]')) as HTMLElement[];
        const pointer = {
            x: window.innerWidth * 0.78,
            y: window.innerHeight * 0.45,
            active: false,
        };

        const handlePointerMove = (e: PointerEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            layers.forEach(layer => {
                const s = parseFloat(layer.dataset.speed || '0');
                layer.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
            });

            document.documentElement.style.setProperty('--mouse-x', `${e.clientX / window.innerWidth * 100}%`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY / window.innerHeight * 100}%`);

            pointer.x = e.clientX;
            pointer.y = e.clientY;
            pointer.active = true;
        };

        const handlePointerEnd = () => {
            pointer.active = false;
        };

        // Premium Particle System (Gold + Silver Mix)
        const canvas = particleRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        let animationFrameId = 0;
        let connectionColor = 'rgba(212, 168, 83, 0.12)';

        const createParticle = (width: number, height: number, isMobile: boolean): Particle => {
            // CHANGED: Full width distribution
            const baseX = width * Math.random();
            const baseY = height * (0.2 + Math.random() * 0.6);

            // Bright gold in dark mode, dark silver in light mode
            const theme = document.documentElement.getAttribute('data-theme');

            let particleColor: string;
            if (theme === 'light') {
                particleColor = 'rgba(110, 110, 110, 0.75)';
            } else {
                particleColor = 'rgba(255, 215, 0, 0.85)';
            }

            return {
                x: baseX,
                y: baseY,
                baseX,
                baseY,
                size: isMobile ? Math.random() * 1.4 + 0.6 : Math.random() * 2 + 0.8,
                alpha: Math.random() * 0.4 + 0.3,
                vx: 0,
                vy: 0,
                driftX: Math.random() * 0.18 - 0.09,
                driftY: Math.random() * 0.18 - 0.09,
                color: particleColor,
            };
        };

        const resolveConnectionColor = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            connectionColor = theme === 'light'
                ? 'rgba(148, 163, 184, 0.26)'
                : 'rgba(255, 215, 0, 0.15)';
        };

        const buildParticles = () => {
            const isMobile = mediaQuery.matches;
            const particleCount = isMobile ? 20 : 50;
            return Array.from({ length: particleCount }, () => createParticle(canvas.width, canvas.height, isMobile));
        };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = buildParticles();
        };

        const drawConnections = (particles: Particle[]) => {
            const maxDistance = mediaQuery.matches ? 90 : 140;

            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance > maxDistance) continue;

                    ctx.beginPath();
                    ctx.strokeStyle = connectionColor;
                    ctx.globalAlpha = (1 - distance / maxDistance) * 0.7;
                    ctx.lineWidth = 1;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        };

        let particles = buildParticles();

        resolveConnectionColor();
        setCanvasSize();

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                const returnForceX = (p.baseX - p.x) * 0.0025;
                const returnForceY = (p.baseY - p.y) * 0.0025;
                const driftForceX = p.driftX * 0.02;
                const driftForceY = p.driftY * 0.02;
                const magneticRadius = mediaQuery.matches ? 110 : 180;

                p.vx += returnForceX + driftForceX;
                p.vy += returnForceY + driftForceY;

                if (pointer.active) {
                    const dx = pointer.x - p.x;
                    const dy = pointer.y - p.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < magneticRadius && distance > 0) {
                        const strength = (1 - distance / magneticRadius) * (mediaQuery.matches ? 0.018 : 0.028);
                        p.vx += dx * strength * 0.02;
                        p.vy += dy * strength * 0.02;
                    }
                }

                p.vx *= 0.965;
                p.vy *= 0.965;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -0.85;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -0.85;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            drawConnections(particles);
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        animateParticles();
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerdown', handlePointerMove, { passive: true });
        window.addEventListener('pointerup', handlePointerEnd);
        window.addEventListener('pointercancel', handlePointerEnd);
        window.addEventListener('pointerleave', handlePointerEnd);
        window.addEventListener('resize', setCanvasSize);
        mediaQuery.addEventListener('change', setCanvasSize);

        const themeObserver = new MutationObserver(() => {
            resolveConnectionColor();
            particles = buildParticles();
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => {
            revealTimers.forEach(timer => window.clearTimeout(timer));
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerEnd);
            window.removeEventListener('pointercancel', handlePointerEnd);
            window.removeEventListener('pointerleave', handlePointerEnd);
            window.removeEventListener('resize', setCanvasSize);
            mediaQuery.removeEventListener('change', setCanvasSize);
            themeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.section
            className={styles.hero}
            id="hero"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <canvas ref={particleRef} className={styles.particles} />
            <motion.div className={styles.gradientOverlay} style={{ y: y1 }} />
            <motion.div className={styles.noise} style={{ y: y2 }} />
            <div className={`${styles.layer} ${styles.grid}`} data-speed="0.02"></div>
            <div className={`${styles.layer} ${styles.glow1}`} data-speed="0.05"></div>
            <div className={`${styles.layer} ${styles.glow2}`} data-speed="0.03"></div>

            <div className={styles.heroMain}>
                <div className={styles.copyColumn}>
                    <div className={styles.status}>
                        <div className={styles.dot}></div>
                        <span className={styles.statusText}>
                            Launch-ready portfolio experience · <span>Available for select projects</span>
                        </span>
                    </div>

                    <h1 className={styles.headline}>
                        <span className={styles.line} ref={line1Ref}></span>
                        <span className={styles.line} ref={line2Ref}></span>
                        <span className={styles.line} ref={line3Ref}></span>
                    </h1>

                    <p className={styles.lead}>
                        I build modern web products with the finish of a premium SaaS launch — fast, intentional,
                        and engineered to earn trust in the first scroll.
                    </p>

                    <div className={styles.ctaRow}>
                        <a href="#work" className={styles.cta}>
                            View selected work
                            <span className={styles.arrow}>↓</span>
                        </a>
                        <a href="#contact" className={styles.secondaryCta}>
                            Start a project
                        </a>
                    </div>

                    <div className={styles.proofStrip}>
                        {proofChips.map((chip, i) => (
                            <motion.span
                                key={chip}
                                className={styles.proofChip}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 1 + i * 0.08,
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {chip}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <div className={styles.cardsColumn}>
                    <div className={styles.rightSlot}>
                        <DeveloperTerminal />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}