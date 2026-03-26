'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;
        if (!canUseCustomCursor) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseDown = () => setIsClick(true);
        const handleMouseUp = () => setIsClick(false);

        const animate = () => {
            if (cursorRef.current && ringRef.current) {
                // Smooth follow with spring-like easing
                cursorX += (mouseX - cursorX) * 0.22;
                cursorY += (mouseY - cursorY) * 0.22;

                cursorRef.current.style.transform = `translate(-50%, -50%) translate(${cursorX}px, ${cursorY}px)`;
                ringRef.current.style.transform = `translate(-50%, -50%) translate(${cursorX}px, ${cursorY}px)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        animate();

        // Hover detection
        const addHover = () => setIsHover(true);
        const removeHover = () => setIsHover(false);

        const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    return (
        <>
            <div 
                ref={cursorRef} 
                className={`${styles.cursor} ${isHover ? styles.hover : ''} ${isClick ? styles.click : ''}`}
            />
            <div 
                ref={ringRef} 
                className={`${styles.ring} ${isHover ? styles.hover : ''}`}
            />
        </>
    );
}