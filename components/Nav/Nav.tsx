'use client';

import { useEffect, useState } from "react";
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            <a href="#contact" className={styles.cta}>Let's Talk →</a>
        </nav>
    )
}