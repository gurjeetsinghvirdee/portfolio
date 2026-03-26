'use client';

import { useTheme } from '@/lib/hooks/useTheme';

export function ShaderBackground() {
    const { theme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <div
            aria-hidden
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: isDark
                    ? 'radial-gradient(120% 90% at 85% 10%, rgba(212,168,83,0.16), rgba(8,8,7,0.88) 48%, #080807 100%)'
                    : 'radial-gradient(120% 90% at 80% 8%, rgba(140,94,30,0.24), rgba(250,248,244,0.82) 45%, #f7f3ea 100%)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '62vw',
                    height: '62vw',
                    minWidth: 360,
                    minHeight: 360,
                    maxWidth: 760,
                    maxHeight: 760,
                    top: '-20%',
                    right: '-12%',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle at 32% 32%, rgba(212,168,83,0.34), rgba(20,16,18,0.02) 72%)'
                        : 'radial-gradient(circle at 32% 32%, rgba(140,94,30,0.25), rgba(232,227,216,0.04) 70%)',
                    filter: 'blur(14px)',
                    animation: 'driftA 14s ease-in-out infinite alternate',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: '56vw',
                    height: '56vw',
                    minWidth: 320,
                    minHeight: 320,
                    maxWidth: 680,
                    maxHeight: 680,
                    bottom: '-26%',
                    left: '-14%',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle at 60% 40%, rgba(80,52,12,0.24), rgba(9,8,8,0.02) 75%)'
                        : 'radial-gradient(circle at 58% 42%, rgba(212,168,83,0.22), rgba(255,250,238,0.04) 74%)',
                    filter: 'blur(18px)',
                    animation: 'driftB 17s ease-in-out infinite alternate',
                }}
            />

            <style jsx>{`
                @keyframes driftA {
                    0% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    100% {
                        transform: translate3d(-32px, 28px, 0) scale(1.08);
                    }
                }

                @keyframes driftB {
                    0% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    100% {
                        transform: translate3d(24px, -20px, 0) scale(1.05);
                    }
                }
            `}</style>
        </div>
    );
}