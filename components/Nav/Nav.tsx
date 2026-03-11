'use client';

import { useEffect, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuVariants = {
        hidden: { x: '100%' },
        visible: { x: '0%', transition: { duration: 0.5, ease: easeInOut } },
    }

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
            <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 6H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 18H21" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            {isOpen && (
                <motion.div
                    className={styles.mobileMenu}
                    variants={menuVariants}
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden"}
                >
                    {['Work', 'About', 'Services', 'Contact'].map((item, i) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            variants={linkVariants}
                            custom={i}
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </nav>
    )
}