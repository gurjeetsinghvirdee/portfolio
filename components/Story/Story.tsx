'use client';

import { motion } from 'framer-motion';
import styles from './Story.module.css';

const chapters = [
    {
        act: 'Act I',
        label: 'MediaKit — The Failure',
        accent: false,
        content: (
            <>
                <p>
                    I built MediaKit assuming demand would follow once the product existed. The work was real —
                    privacy-first media tools, solid engineering, things I was proud of technically. But I was
                    building in a vacuum. No validation, no signal, no real user feedback.
                </p>
                <p>
                    After launch: no traction. No adoption. The product existed. The problem it solved, apparently, did not —
                    at least not for anyone I could reach.
                </p>
            </>
        ),
        bullets: [
            'Built before validating problem–market fit',
            'Assumptions treated as user insight',
            'No distribution, no audience, no feedback loop',
        ],
        bulletLabel: 'What went wrong',
    },
    {
        act: 'Act II',
        label: 'The Shift',
        accent: false,
        content: (
            <>
                <p>
                    Quitting MediaKit wasn&apos;t the hard part. Understanding <em>why</em> it failed was.
                    The problem wasn&apos;t effort — it was sequence. I&apos;d been solving engineering problems
                    when I should have been solving people problems first.
                </p>
            </>
        ),
        bullets: [
            'Problem-first, not product-first',
            'Iteration and feedback over completion',
            'Validation before lines of code',
        ],
        bulletLabel: 'What changed',
    },
    {
        act: 'Act III',
        label: 'Debate AI — Current Build',
        accent: true,
        content: (
            <>
                <p>
                    After MediaKit, I started building Debate AI — an AI-powered debate platform.
                    The early phase was rough: frequent breaking logic, poor prompt outputs, inconsistent
                    responses. Nothing was stable.
                </p>
                <p>
                    I spent roughly two months doing nothing but fixing core logic, iterating prompts, and learning
                    prompt engineering from the ground up — structure, constraints, context control. The kind of
                    depth that only comes from breaking things repeatedly in the same system.
                </p>
            </>
        ),
        bullets: [
            'System is now functionally stable',
            'Outputs are consistent and usable',
            'Built on understanding, not assumptions',
        ],
        bulletLabel: 'Current state',
    },
];

export function Story() {
    return (
        <section id="story" className={styles.section}>
            <div className={styles.bg} aria-hidden>
                <div className={styles.bgLine} />
            </div>

            <div className={styles.inner}>
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    The Story
                </motion.div>

                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Failure &rarr; Shift &rarr; <em>Current build.</em>
                </motion.h2>

                <div className={styles.body}>
                    {chapters.map((ch, i) => (
                        <motion.div
                            key={ch.act}
                            className={`${styles.chapter} ${ch.accent ? styles.chapterAccent : ''}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className={styles.chapterHead}>
                                <span className={styles.actTag}>{ch.act}</span>
                                <span className={styles.chapterLabel}>{ch.label}</span>
                            </div>

                            <div className={styles.chapterText}>{ch.content}</div>

                            <div className={styles.breakdown}>
                                <span className={styles.breakdownLabel}>{ch.bulletLabel}</span>
                                <ul className={styles.breakdownList}>
                                    {ch.bullets.map((b) => (
                                        <li key={b}>
                                            <span className={styles.bulletMark} aria-hidden>—</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className={styles.takeaway}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className={styles.takeawayLabel}>Key takeaway</span>
                        <blockquote className={styles.quote}>
                            Failure wasn&apos;t the issue — wrong approach was. Now I build with validation first,
                            controlled iteration, and a real understanding of what I&apos;m building and <em>why</em>.
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
