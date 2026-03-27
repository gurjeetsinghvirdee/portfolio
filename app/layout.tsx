import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gurjeet Singh Virdee',
  description: 'Frontend-Heavy Full Stack Engineer crafting fast, intelligent web experiences.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        {children}
      </body>
    </html>
  )
}