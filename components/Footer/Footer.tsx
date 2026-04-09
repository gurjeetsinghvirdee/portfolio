'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaXTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import styles from './Footer.module.css';

export function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            {/* Fixed floating back-to-top button */}
            <motion.button
                className={styles.floatingTop}
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 16 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: showTop ? 'auto' : 'none' }}
                aria-label="Back to top"
                data-cursor-hover
                data-cursor-label="Top"
            >
                ↑
            </motion.button>

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
                            href="https://www.linkedin.com/in/gurjeet-singh-virdee-25a476199/"
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
                </div>
            </div>
        </footer>
    );
}