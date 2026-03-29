'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (lenisInstance) {
            lenisRef.current = lenisInstance;
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisInstance = lenis;
        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Don't destroy on unmount in dev mode (StrictMode double-mount)
        };
    }, []);

    return lenisRef;
}

export function getScrollVelocity(): number {
    return lenisInstance?.velocity ?? 0;
}

export { ScrollTrigger };
export { gsap };
