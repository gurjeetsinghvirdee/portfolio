'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Cursor.module.css';
import { usePerformance } from '@/lib/hooks/usePerformance';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [label, setLabel] = useState('');
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const prevMouseRef = useRef({ x: 0, y: 0 });
    const { enableParticles, enableMagneticCursor } = usePerformance();

    const addBurstParticles = useCallback((x: number, y: number) => {
        if (!enableParticles) return;
        for (let j = 0; j < 12; j++) {
            const angle = (Math.PI * 2 * j) / 12 + (Math.random() - 0.5) * 0.5;
            const speed = 2 + Math.random() * 4;
            particlesRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 1,
                size: 2 + Math.random() * 3,
            });
        }
    }, [enableParticles]);

    useEffect(() => {
        const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;
        if (!canUseCustomCursor) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let ringX = mouseX;
        let ringY = mouseY;

        let rafId: number;
        let moveCount = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseRef.current = { x: mouseX, y: mouseY };
        };

        const handleMouseDown = () => {
            setIsClick(true);
            addBurstParticles(mouseRef.current.x, mouseRef.current.y);
        };
        const handleMouseUp = () => setIsClick(false);

        // Particle trail
        const addTrailParticle = () => {
            if (!enableParticles) return;
            const dx = mouseRef.current.x - prevMouseRef.current.x;
            const dy = mouseRef.current.y - prevMouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            if (speed > 3) {
                particlesRef.current.push({
                    x: mouseRef.current.x + (Math.random() - 0.5) * 8,
                    y: mouseRef.current.y + (Math.random() - 0.5) * 8,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5 - 0.3,
                    life: 1,
                    maxLife: 1,
                    size: 1.5 + Math.random() * 2,
                });
            }
            prevMouseRef.current = { ...mouseRef.current };
        };

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Size canvas once; update only on resize (not every frame)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleCanvasResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleCanvasResize, { passive: true });

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current = particlesRef.current.filter(p => p.life > 0);

            for (const p of particlesRef.current) {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.025;
                p.vy -= 0.01; // Slight upward drift

                const alpha = p.life * 0.7;
                const size = p.size * p.life;

                if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
                const radius = Number.isFinite(size) && size > 0 ? size : 0;
                if (radius === 0) continue;

                // Use opacity-scaled alpha for depth instead of expensive ctx.filter blur
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 168, 83, ${alpha})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 168, 83, ${alpha * 0.12})`;
                ctx.fill();
            }
        };

        const animate = () => {
            moveCount++;

            if (cursorRef.current && ringRef.current) {
                cursorX += (mouseX - cursorX) * 0.25;
                cursorY += (mouseY - cursorY) * 0.25;
                ringX += (mouseX - ringX) * 0.12;
                ringY += (mouseY - ringY) * 0.12;

                cursorRef.current.style.transform = `translate(-50%, -50%) translate(${cursorX}px, ${cursorY}px)`;
                ringRef.current.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;
                
                if (labelRef.current) {
                    labelRef.current.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;
                }
            }

            // Add trail particle every 2 frames
            if (moveCount % 2 === 0) {
                addTrailParticle();
            }

            drawParticles();

            rafId = requestAnimationFrame(animate);
        };

        animate();

        // Hover detection with labels
        const addHover = (e: Event) => {
            setIsHover(true);
            const el = e.currentTarget as HTMLElement;
            
            // Magnetic pull
            if (enableMagneticCursor) {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const pullStrength = 0.3;
                
                const magneticMove = (me: MouseEvent) => {
                    const dx = centerX - me.clientX;
                    const dy = centerY - me.clientY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const pull = (1 - dist / 100) * pullStrength;
                        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
                    }
                };
                
                const magneticLeave = () => {
                    el.style.transform = '';
                    el.removeEventListener('mousemove', magneticMove);
                    el.removeEventListener('mouseleave', magneticLeave);
                };
                
                el.addEventListener('mousemove', magneticMove);
                el.addEventListener('mouseleave', magneticLeave);
            }

            // Context-aware label
            const cursorLabel = el.getAttribute('data-cursor-label');
            if (cursorLabel) {
                setLabel(cursorLabel);
            } else {
                setLabel('');
            }
        };

        const removeHover = () => {
            setIsHover(false);
            setLabel('');
        };

        const observer = new MutationObserver(() => {
            const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]');
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Initial bind
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
            observer.disconnect();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleCanvasResize);
            const els = document.querySelectorAll('a, button, [data-cursor-hover]');
            els.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, [enableParticles, enableMagneticCursor, addBurstParticles]);

    return (
        <>
            <canvas ref={canvasRef} className={styles.particleCanvas} />
            <div
                ref={cursorRef}
                className={`${styles.cursor} ${isHover ? styles.hover : ''} ${isClick ? styles.click : ''}`}
            />
            <div
                ref={ringRef}
                className={`${styles.ring} ${isHover ? styles.hover : ''} ${isClick ? styles.click : ''}`}
            />
            {label && (
                <div ref={labelRef} className={styles.label}>
                    {label}
                </div>
            )}
        </>
    );
}