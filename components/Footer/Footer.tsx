'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaXTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import styles from './Footer.module.css';

function GravityText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const chars = container.querySelectorAll<HTMLSpanElement>(`.${styles.gravityChar}`);

        let rafId: number;

        const animate = () => {
            chars.forEach((char) => {
                const rect = char.getBoundingClientRect();
                const charCenterX = rect.left + rect.width / 2;
                const charCenterY = rect.top + rect.height / 2;
                const dx = mouseRef.current.x - charCenterX;
                const dy = mouseRef.current.y - charCenterY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    const moveX = -dx * force * 0.15;
                    const moveY = -dy * force * 0.15;
                    char.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    char.style.transform = 'translate(0, 0)';
                }
            });

            rafId = requestAnimationFrame(animate);
        };

        const handleMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMove);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.gravityContainer}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`${styles.gravityChar} ${char === ' ' ? styles.gravitySpace : ''}`}
                    style={{ transitionDelay: `${i * 0.01}s` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
}

function ScrambleReveal({ text }: { text: string }) {
    const [display, setDisplay] = useState(text.replace(/[a-zA-Z0-9@.]/g, '•'));
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.';

    useEffect(() => {
        if (!inView) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split('').map((c, i) => {
                    if (c === ' ') return ' ';
                    return i < iteration ? c : chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
            iteration += 1;
            if (iteration > text.length) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, [inView, text]);

    return <span ref={ref} className={styles.scramble}>{display}</span>;
}

export function Footer() {
    const [showRocket, setShowRocket] = useState(false);

    const scrollToTop = () => {
        setShowRocket(true);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setShowRocket(false), 1200);
        }, 400);
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.gravityHeadline} data-cursor-hover data-cursor-label="Repel ↗">
                    <GravityText text="Let's Talk." />
                </div>
                <div className={styles.emailRow}>
                    <ScrambleReveal text="gurjeetsinghvirdee@gmail.com" />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.inner}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        Gurjeet Singh<span className={styles.dotAccent}>.</span>
                    </div>
                    <div className={styles.copy}>
                        © {new Date().getFullYear()} - Crafted with intention and coffee.
                    </div>
                </div>

                <nav className={styles.navLinks}>
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>

                <div className={styles.right}>
                    <div className={styles.socials}>
                        <a
                            href="https://x.com/R3lentlessV01d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.social}
                            aria-label="Follow on X"
                            data-cursor-hover
                        >
                            <FaXTwitter size={18} />
                        </a>
                        <a
                            href="https://github.com/gurjeetsinghvirdee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.social}
                            aria-label="GitHub"
                            data-cursor-hover
                        >
                            <FaGithub size={18} />
                        </a>
                        <a
                            href="https://linkedin.com/in/gurjeetsinghvirdee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.social}
                            aria-label="LinkedIn"
                            data-cursor-hover
                        >
                            <FaLinkedinIn size={18} />
                        </a>
                        <a
                            href="mailto:gurjeetsinghvirdee@gmail.com"
                            className={styles.social}
                            aria-label="Send email"
                            data-cursor-hover
                        >
                            <MdOutlineMail size={20} />
                        </a>
                    </div>

                    <motion.button
                        className={styles.backToTop}
                        onClick={scrollToTop}
                        whileHover={{ y: -4 }}
                        data-cursor-hover
                        data-cursor-label="Top ↑"
                    >
                        {showRocket ? '🚀' : '↑'}
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}