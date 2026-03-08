'use client';

import { use, useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        // Check localStorage on amount
        const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
        if (stored) {
            setTheme(stored)
            document.documentElement.setAttribute('data-theme', stored)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return { theme, toggleTheme }
}