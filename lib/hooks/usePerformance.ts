'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

let cachedTier: PerformanceTier | null = null;

function detectTier(): PerformanceTier {
    if (cachedTier) return cachedTier;

    if (typeof window === 'undefined') return 'high';

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cachedTier = 'low';
        return 'low';
    }

    // Device memory API (Chrome)
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory < 4) {
        cachedTier = 'low';
        return 'low';
    }

    // Hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        cachedTier = 'low';
        return 'low';
    }

    // Check if mobile (touch-only)
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isSmallScreen = window.innerWidth < 768;

    if (isMobile || isSmallScreen) {
        // Keep mobile/small screens in low tier for smoother UX.
        cachedTier = 'low';
        return 'low';
    }

    // Tablet or mid-range
    if (window.innerWidth < 1024) {
        cachedTier = 'medium';
        return 'medium';
    }

    cachedTier = 'high';
    return 'high';
}

export function usePerformance() {
    // Start as null so server and client both render the same "unknown" state
    // on first paint — avoids React hydration mismatch (error #418).
    const [tier, setTier] = useState<PerformanceTier | null>(null);

    useEffect(() => {
        setTier(detectTier());
    }, []);

    // While tier is null (SSR / first client paint), treat everything as
    // disabled so server HTML matches the initial client render.
    return {
        tier: tier ?? 'high',
        isHigh: tier === 'high',
        isMedium: tier === 'medium',
        isLow: tier === 'low',
        enableParticles: tier === 'high',
        enableComplexAnimations: tier === 'high',
        enableMagneticCursor: tier === 'high',
        enableSmoothScroll: tier !== null && tier !== 'low',
    };
}

export function getPerformanceTier(): PerformanceTier {
    return detectTier();
}
