'use client';

import { useTheme } from "@/lib/hooks/useTheme";
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className={styles.btn}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            <span className={`${styles.icon} ${styles.moon}`}>🌙</span>
            <span className={`${styles.icon} ${styles.sun}`}>☀️</span>
        </button>
    )
}