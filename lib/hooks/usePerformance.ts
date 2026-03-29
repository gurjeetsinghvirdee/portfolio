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
        // Mobile can still be medium if decent device
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 6) {
            cachedTier = 'medium';
            return 'medium';
        }
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
    const [tier, setTier] = useState<PerformanceTier>('high');

    useEffect(() => {
        setTier(detectTier());
    }, []);

    return {
        tier,
        isHigh: tier === 'high',
        isMedium: tier === 'medium',
        isLow: tier === 'low',
        enableParticles: tier !== 'low',
        enableComplexAnimations: tier !== 'low',
        enableMagneticCursor: tier !== 'low',
        enableSmoothScroll: true, // Always enable, it's lightweight
    };
}

export function getPerformanceTier(): PerformanceTier {
    return detectTier();
}
