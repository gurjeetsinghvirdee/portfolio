'use client';

import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                Gurjeet Singh<span>.</span>
            </div>
            <nav className={styles.nav}>
                <a href="#work">Work</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div className={styles.copy}>
                &copy; {new Date().getFullYear()} · Built with craft & coffee.
            </div>
        </footer>
    )
}