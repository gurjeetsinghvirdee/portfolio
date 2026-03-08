'use client';

import { useEffect, useRef } from "react";
import styles from './Cursor.module.css';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
        }

        const handleMouseDown = () => document.body.classList.add('cursor-click')
        const handleMouseUp = () => document.body.classList.remove('cursor-click')

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        const animate = () => {
            if (cursorRef.current && ringRef.current) {
                cursorRef.current.style.left = mx + 'px'
                cursorRef.current.style.top = my + 'px'

                rx += (mx - rx) * 0.1
                ry += (my - ry) * 0.1
                ringRef.current.style.left = rx + 'px'
                ringRef.current.style.top = ry + 'px'
            }
            requestAnimationFrame(animate)
        }
        animate()

        // Hover effects
        const addHoverClass = () => document.body.classList.add('cursor-hover')
        const removeHoverClass = () => document.body.classList.remove('cursor-hover')

        const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', addHoverClass)
            el.addEventListener('mouseleave', removeHoverClass)
        })

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', addHoverClass)
                el.removeEventListener('mouseleave', removeHoverClass)
            })
        }
    }, [])

    return (
        <>
            <div ref={cursorRef} className={styles.cursor} />
            <div ref={ringRef} className={styles.ring} />
        </>
    )
}