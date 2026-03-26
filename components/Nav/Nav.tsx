'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { title: 'Work', href: '#work', desc: 'Selected builds' },
        { title: 'About', href: '#about', desc: 'Journey & approach' },
        { title: 'Contact', href: '#contact', desc: 'Start a conversation' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <a href="#" className={styles.logo}>
                Gurjeet Singh<span className={styles.dot}>.</span>
            </a>

            {/* Desktop Navigation */}
            <ul className={styles.center}>
                {navItems.map((item) => (
                    <li key={item.title}>
                        <a href={item.href}>{item.title}</a>
                    </li>
                ))}
            </ul>

            <div className={styles.navRight}>
                <a href="#contact" className={styles.cta}>Hire Me</a>
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

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    className={styles.mobileMenu}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.desc}>{item.desc}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}