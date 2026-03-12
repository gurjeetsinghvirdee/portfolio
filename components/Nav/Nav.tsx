'use client';

import { useEffect, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const navItems = [
        { title: 'Work', description: 'Selected builds' },
        { title: 'About', description: 'Experience + approach' },
        { title: 'Services', description: 'What I can ship' },
        { title: 'Contact', description: 'Start a conversation' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.classList.toggle('nav-menu-open', isOpen);

        return () => {
            document.body.classList.remove('nav-menu-open');
        };
    }, [isOpen]);

    useEffect(() => {
        document.body.classList.toggle('nav-scrolled', scrolled);

        return () => {
            document.body.classList.remove('nav-scrolled');
        };
    }, [scrolled]);

    const menuVariants = {
        hidden: { x: '100%' },
        visible: { x: '0%', transition: { duration: 0.5, ease: easeInOut } },
    }

    const openMenu = () => {
        setIsOpen(true);
        setIsClose(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsClose(false);
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        })
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <a href="#" className={styles.logo}>
                Gurjeet Singh<span className={styles.dot}>.</span>
            </a>
            <ul className={styles.center}>
                <li><a href="#work">Work</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className={styles.navRight}>
            <a href="#contact" className={styles.cta}>Hire me</a>
            <ThemeToggle />
            <button
                type="button"
                className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
                onClick={isOpen ? closeMenu : openMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 6H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 18H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            </div>
            {isOpen && (
                <motion.div
                    className={styles.mobileMenu}
                    variants={menuVariants}
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden"}
                >
                    {isClose && (
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={closeMenu}
                            aria-label="Close navigation menu"
                        >
                            <span></span>
                            <span></span>
                        </button>
                    )}
                    <div className={styles.mobileMenuHeader}>
                        <span className={styles.mobileMenuLabel}>Navigation</span>
                        <p className={styles.mobileMenuCopy}>Explore the portfolio by section.</p>
                    </div>
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item.title}
                            href={`#${item.title.toLowerCase()}`}
                            className={styles.mobileLink}
                            variants={linkVariants}
                            custom={i}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileLinkIndex}>{String(i + 1).padStart(2, '0')}</span>
                            <span className={styles.mobileLinkBody}>
                                <span className={styles.mobileLinkTitle}>{item.title}</span>
                                <span className={styles.mobileLinkDescription}>{item.description}</span>
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </nav>
    )
}