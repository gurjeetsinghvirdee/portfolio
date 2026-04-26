'use client';

import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

export function Marquee() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);

    const row1 = [
        'React & Next.js', 'Three.js & WebGL', 'Node.js APIs', 'TypeScript',
        'Data Visualization', 'AI Integration', 'Performance Engineering', 'Real-Time Systems',
    ];

    const row2 = [
        'Problem-First Thinking', 'Clean Architecture', 'Pixel-Perfect UI', 'Accessible Design',
        'Fast Iteration', 'Scalable Systems', 'Developer Experience', 'Shipped Products',
    ];

    // Scroll-speed reactive marquee
    useEffect(() => {
        const track1 = track1Ref.current;
        const track2 = track2Ref.current;
        if (!track1 || !track2) return;

        let baseSpeed = 0.5;
        let currentSpeed = baseSpeed;
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        const handleScroll = () => {
            const delta = Math.abs(window.scrollY - lastScrollY);
            scrollVelocity = delta;
            lastScrollY = window.scrollY;
        };

        let pos1 = 0;
        let pos2 = 0;
        let rafId: number;

        const animate = () => {
            // Smoothly interpolate speed based on scroll velocity
            const targetSpeed = baseSpeed + scrollVelocity * 0.08;
            currentSpeed += (targetSpeed - currentSpeed) * 0.05;
            scrollVelocity *= 0.95; // Decay

            pos1 -= currentSpeed;
            pos2 += currentSpeed;

            // Reset position for infinite loop
            const w1 = track1.scrollWidth / 2;
            const w2 = track2.scrollWidth / 2;
            if (Math.abs(pos1) >= w1) pos1 = 0;
            if (pos2 >= w2) pos2 = 0;

            track1.style.transform = `translate3d(${pos1}px, 0, 0)`;
            track2.style.transform = `translate3d(${pos2}px, 0, 0)`;

            rafId = requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.wrap} ref={wrapRef}>
            <div className={styles.row}>
                <div className={styles.track} ref={track1Ref}>
                    {[...row1, ...row1].map((item, i) => (
                        <span key={i} className={styles.item} data-cursor-hover>
                            {item} <span className={styles.sep}>✦</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.track} ${styles.reverse}`} ref={track2Ref}>
                    {[...row2, ...row2].map((item, i) => (
                        <span key={i} className={styles.item} data-cursor-hover>
                            {item} <span className={styles.sep}>◆</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}