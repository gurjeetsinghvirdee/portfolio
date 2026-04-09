'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';

function GravityLine({ text, className }: { text: string; className?: string }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const aliveRef = useRef(true);

    useEffect(() => {
        aliveRef.current = true;
        const container = containerRef.current;
        if (!container) return;
        const chars = container.querySelectorAll<HTMLSpanElement>(`.${styles.gravityChar}`);
        let rafId: number;

        const animate = () => {
            // Bail immediately if unmounted or container detached
            if (!aliveRef.current || !container.isConnected) return;
            chars.forEach((char) => {
                if (!char.isConnected) return;
                const rect = char.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = mouseRef.current.x - cx;
                const dy = mouseRef.current.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const force = (180 - dist) / 180;
                    char.style.transform = `translate(${-dx * force * 0.2}px, ${-dy * force * 0.2}px)`;
                } else {
                    char.style.transform = 'translate(0,0)';
                }
            });
            rafId = requestAnimationFrame(animate);
        };

        const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', onMove, { passive: true });
        rafId = requestAnimationFrame(animate);
        return () => {
            aliveRef.current = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <span ref={containerRef} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={styles.gravityChar}
                    style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}


export function Contact() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Update progress based on form completion
    useEffect(() => {
        const filled = Object.values(formState).filter(v => v.length > 0).length;
        setProgress((filled / 3) * 100);
    }, [formState]);

    // Aurora background that reacts to form progress
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        section.style.setProperty('--aurora-intensity', `${progress / 100}`);
    }, [progress]);

    // Mouse tracking for aurora
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            section.style.setProperty('--contact-mouse-x', `${e.clientX - rect.left}px`);
            section.style.setProperty('--contact-mouse-y', `${e.clientY - rect.top}px`);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    const handleSend = () => {
        setIsSent(true);
        // Open email client after animation
        setTimeout(() => {
            const subject = encodeURIComponent(`Project Inquiry from ${formState.name}`);
            const body = encodeURIComponent(formState.message);
            window.location.href = `mailto:gurjeetsinghvirdee@gmail.com?subject=${subject}&body=${body}`;
        }, 2000);
    };

    return (
        <section id="contact" ref={sectionRef} className={styles.section}>
            <div className={styles.aurora} aria-hidden>
                <div className={styles.auroraBlob1} />
                <div className={styles.auroraBlob2} />
                <div className={styles.auroraBlob3} />
                <div className={styles.auroraMouse} />
            </div>

            <div className={styles.content}>
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    Get In Touch
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isFormOpen && !isSent && (
                        <motion.div
                            key="cta"
                            className={styles.ctaContainer}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className={styles.ctaTitle} data-cursor-hover data-cursor-label="Repel ↗">
                                <GravityLine text="Let's build" />
                                <br />
                                <GravityLine text="something " /><GravityLine text="great." className={styles.ctaTitleAccent} />
                            </h2>
                            <p className={styles.ctaText}>
                                Have a project in mind? I&apos;d love to hear about it. Drop me a line and let&apos;s create something extraordinary together.
                            </p>
                            <motion.button
                                className={styles.morphButton}
                                onClick={() => setIsFormOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                data-cursor-hover
                                data-cursor-label="Click"
                            >
                                <span className={styles.morphText}>Start a Conversation</span>
                                <span className={styles.morphArrow}>→</span>
                                <span className={styles.morphShine} />
                            </motion.button>
                        </motion.div>
                    )}

                    {isFormOpen && !isSent && (
                        <motion.form
                            key="form"
                            className={styles.form}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        >
                            {/* Progress bar */}
                            <div className={styles.formProgress}>
                                <motion.div
                                    className={styles.formProgressBar}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.fieldGroup}>
                                    <motion.div
                                        className={styles.field}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                                            className={styles.input}
                                            placeholder=" "
                                            required
                                            id="contact-name"
                                        />
                                        <label htmlFor="contact-name" className={styles.fieldLabel}>Your Name</label>
                                        <div className={styles.fieldLine} />
                                    </motion.div>

                                    <motion.div
                                        className={styles.field}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                                            className={styles.input}
                                            placeholder=" "
                                            required
                                            id="contact-email"
                                        />
                                        <label htmlFor="contact-email" className={styles.fieldLabel}>Email Address</label>
                                        <div className={styles.fieldLine} />
                                    </motion.div>
                                </div>

                                <motion.div
                                    className={styles.field}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <textarea
                                        value={formState.message}
                                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                                        className={`${styles.input} ${styles.textarea}`}
                                        placeholder=" "
                                        required
                                        rows={4}
                                        id="contact-message"
                                    />
                                    <label htmlFor="contact-message" className={styles.fieldLabel}>Tell me about your project</label>
                                    <div className={styles.fieldLine} />
                                </motion.div>
                            </div>

                            <div className={styles.formActions}>
                                <button
                                    type="button"
                                    className={styles.backButton}
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    ← Back
                                </button>
                                <motion.button
                                    type="submit"
                                    className={styles.sendButton}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    data-cursor-hover
                                    data-cursor-label="Send"
                                >
                                    <span>Send Message</span>
                                    <svg className={styles.sendIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.form>
                    )}

                    {isSent && (
                        <motion.div
                            key="sent"
                            className={styles.sentContainer}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div
                                className={styles.paperPlane}
                                initial={{ y: 0, x: 0, rotate: 0 }}
                                animate={{
                                    y: [-10, -300],
                                    x: [0, 200],
                                    rotate: [0, -15],
                                    opacity: [1, 0],
                                }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                ✈️
                            </motion.div>
                            <h3 className={styles.sentTitle}>Message Sent!</h3>
                            <p className={styles.sentText}>Opening your email client...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
