import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gurjeet Singh Virdee - Frontend-Heavy Full Stack Engineer',
    description: 'Frontend-Heavy Full Stack Engineer crafting fast, intelligent web experiences with React, Next.js, TypeScript, and Node.js.',
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