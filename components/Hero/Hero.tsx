'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export function Hero() {
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Letter reveal animation
        const lines = [
            { el: line1Ref.current, words: ['Frontend'] },
            { el: line2Ref.current, words: ['Heavy', '<em>Full Stack</em>'] },
            { el: line3Ref.current, words: ['Engineer'] }
        ]

        lines.forEach(({ el, words }) => {
            if (el) {
                el.innerHTML = words.map(w => `<span class="${styles.word}">${w}</span>`).join('')
            }
        })

        const wordEls = document.querySelectorAll(`.${styles.word}`)
        wordEls.forEach((w, i) => {
            setTimeout(() => {
                ;(w as HTMLElement).style.transition = 'opacity 0.7s var(--ease), transform 0.7s var(--ease)'
                ;(w as HTMLElement).style.opacity = '1'
                ;(w as HTMLElement).style.transform = 'translateY(0)'
            }, 400 + i * 140)
        })

        // Parallax layers
        const layers = document.querySelectorAll('[data-speed]')

        const handleMouseMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2
            const cy = window.innerHeight / 2
            const dx = e.clientX - cx
            const dy = e.clientY - cy

            layers.forEach(layer => {
                const s = parseFloat((layer as HTMLElement).dataset.speed || '0')
                ;(layer as HTMLElement).style.transform = `translate(${dx * s}px, ${dy * s}px)`
            })
        }

        const handleScroll = () => {
            const y = window.scrollY
            layers.forEach(layer => {
                const s = parseFloat((layer as HTMLElement).dataset.speed || '0')
                ;(layer as HTMLElement).style.transform = `translateY(${y * s * 3}px)`
            })
        }

        document.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section className={styles.hero} id='hero'>
            <div className={`${styles.layer} ${styles.grid}`} data-speed="0.02"></div>
            <div className={`${styles.layer} ${styles.glow1}`} data-speed="0.05"></div>
            <div className={`${styles.layer} ${styles.glow2}`} data-speed="0.03"></div>
            <div className={`${styles.layer} ${styles.noise}`}></div>

            <div className={styles.status}>
                <div className={styles.dot}></div>
                <span className={styles.statusText}>
                    Available for projects · <span>Open to Work</span>
                </span>
            </div>

            <h1 className={styles.headline}>
                <span className={styles.line} ref={line1Ref}></span>
                <span className={styles.line} ref={line2Ref}></span>
                <span className={styles.line} ref={line3Ref}></span>
            </h1>

            <div className={styles.bottom}>
                <p className={styles.roles}>
                    Frontend-Heavy Full Stack Engineer crafting<br />
                    <strong>fast, intelligent web experience.</strong><br />
                    React.js · Next.js · TypeScript · Node.js 
                </p>
                <div className={styles.ctaGroup}>
                    <a href="#work" className={styles.cta}>
                        View my work
                        <span className={styles.arrow}>↓</span>
                    </a>
                    <div className={styles.scroll}>
                        <div className={styles.scrollLine}></div>
                        Scroll
                    </div>
                </div>
            </div>
        </section>
    )
}