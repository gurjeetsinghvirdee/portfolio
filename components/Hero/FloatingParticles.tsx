'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/lib/hooks/usePerformance';
import styles from './Hero.module.css';

interface CodeParticle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    symbol: string;
    size: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
}

const SYMBOLS = ['</>', '{}', '()', '=>', '[]', '&&', '||', '++', '**', 'fn', 'if', '::'];

export function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { enableParticles, isHigh } = usePerformance();
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!enableParticles) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const count = isHigh ? 24 : 12;
        let w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

        const particles: CodeParticle[] = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * 0.7 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2 - 0.1,
                symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                size: 10 + Math.random() * 6,
                opacity: 0.06 + Math.random() * 0.1,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.008,
            });
        }

        const handleResize = () => {
            w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        const handleMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        let rafId: number;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                // Mouse repulsion
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120 * 0.8;
                    p.vx += (dx / dist) * force * 0.1;
                    p.vy += (dy / dist) * force * 0.1;
                }

                // Apply velocity with damping
                p.x += p.vx * p.z;
                p.y += p.vy * p.z;
                p.vx *= 0.99;
                p.vy *= 0.99;
                p.rotation += p.rotationSpeed;

                // Wrap around
                if (p.x < -30) p.x = w + 30;
                if (p.x > w + 30) p.x = -30;
                if (p.y < -30) p.y = h + 30;
                if (p.y > h + 30) p.y = -30;

                // Draw
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size * p.z}px 'JetBrains Mono', monospace`;
                ctx.fillStyle = `rgba(212, 168, 83, ${p.opacity * p.z})`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Simulated depth-of-field blur via shadow
                if (p.z < 0.5) {
                    ctx.filter = `blur(${(1 - p.z) * 2}px)`;
                }

                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
            }

            rafId = requestAnimationFrame(draw);
        };

        draw();

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('mousemove', handleMouse, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, [enableParticles, isHigh]);

    if (!enableParticles) return null;

    return <canvas ref={canvasRef} className={styles.floatingCanvas} />;
}
