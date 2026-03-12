'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Cursor.module.css'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHover, setIsHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches
    setEnabled(canUseCustomCursor)

    if (!canUseCustomCursor) {
      return
    }

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let frameId = 0

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
      frameId = requestAnimationFrame(animate)
    }
    animate()

    // Hover effects
    const addHoverClass = () => {
      document.body.classList.add('cursor-hover')
      setIsHover(true)
    }
    const removeHoverClass = () => {
      document.body.classList.remove('cursor-hover')
      setIsHover(false)
    }

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
      cancelAnimationFrame(frameId)
      document.body.classList.remove('cursor-hover')
      document.body.classList.remove('cursor-click')
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <>
      <motion.div 
        ref={cursorRef} 
        className={styles.cursor}
        animate={{ scale: isHover ? 2.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        ref={ringRef} 
        className={styles.ring}
        animate={{ scale: isHover ? 1.4 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}