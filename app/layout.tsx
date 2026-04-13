import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gurjeet Singh Virdee - Frontend-Heavy Full Stack Engineer',
    description: 'Frontend-Heavy Full Stack Engineer crafting fast, intelligent web experiences with React, Next.js, TypeScript, and Node.js.',
    icons: {
        icon: [
            { url: '/favicon_io/favicon.ico' },
            { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        shortcut: '/favicon_io/favicon.ico',
        apple: '/favicon_io/apple-touch-icon.png',
    },
    manifest: '/favicon_io/site.webmanifest',
    openGraph: {
        title: 'Gurjeet Singh Virdee - Full Stack Engineer',
        description: 'Crafting fast, intentional digital experiences.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="dark" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}