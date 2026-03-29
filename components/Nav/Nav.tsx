'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const progressRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { title: 'Work', href: '#work', desc: 'Selected builds' },
        { title: 'About', href: '#about', desc: 'Journey & approach' },
        { title: 'Services', href: '#services', desc: 'What I offer' },
        { title: 'Contact', href: '#contact', desc: 'Start a conversation' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Scroll progress
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            setScrollProgress(progress);

            // Active section detection
            const sections = ['hero', 'work', 'about', 'services', 'contact'];
            const scrollPos = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && scrollPos >= el.offsetTop) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            {/* Scroll progress bar */}
            <div className={styles.progressTrack}>
                <div
                    ref={progressRef}
                    className={styles.progressBar}
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <a href="#" className={styles.logo} data-cursor-hover>
                Gurjeet Singh<span className={styles.dot}>.</span>
            </a>

            {/* Desktop Navigation */}
            <ul className={styles.center}>
                {navItems.map((item) => (
                    <li key={item.title}>
                        <a
                            href={item.href}
                            className={activeSection === item.href.slice(1) ? styles.activeLink : ''}
                            data-cursor-hover
                        >
                            {item.title}
                            {activeSection === item.href.slice(1) && (
                                <motion.span
                                    className={styles.activeIndicator}
                                    layoutId="activeNav"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </a>
                    </li>
                ))}
            </ul>

            <div className={styles.navRight}>
                <a href="#contact" className={styles.cta} data-cursor-hover data-cursor-label="Hire">
                    Hire Me
                </a>
                <ThemeToggle />

                {/* Mobile Hamburger */}
                <button
                    type="button"
                    className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu — Full-screen takeover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ clipPath: 'circle(0% at calc(100% - 50px) 30px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 50px) 30px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 50px) 30px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.mobileMenuBg} />

                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>

                        <div className={styles.mobileMenuContent}>
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.title}
                                    href={item.href}
                                    className={styles.mobileLink}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <div className={styles.mobileTitle}>{item.title}</div>
                                        <div className={styles.desc}>{item.desc}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            className={styles.mobileFooter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="mailto:gurjeetsinghvirdee@gmail.com" className={styles.mobileEmail}>
                                gurjeetsinghvirdee@gmail.com
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}