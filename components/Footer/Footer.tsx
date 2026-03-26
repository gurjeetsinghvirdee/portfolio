'use client';

import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        Gurjeet Singh<span className={styles.dot}>.</span>
                    </div>
                    <div className={styles.copy}>
                        © {new Date().getFullYear()} — Crafted with intention and coffee.
                    </div>
                </div>

                <nav className={styles.nav}>
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>

                <div className={styles.right}>
                    <a 
                        href="https://x.com/R3lentlessV01d" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.social}
                        aria-label="Follow on X"
                    >
                        <FaXTwitter size={20} />
                    </a>
                    <a 
                        href="mailto:gurjeetsinghvirdee@gmail.com" 
                        className={styles.social}
                        aria-label="Send email"
                    >
                        <MdOutlineMail size={22} />
                    </a>
                </div>
            </div>
        </footer>
    );
}