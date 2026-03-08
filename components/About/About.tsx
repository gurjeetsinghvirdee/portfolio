'use client';

import styles from './About.module.css';
import NextImage from 'next/image';

const stats = [
    { value: '35+', label: 'Projects Shipped' },
    { value: '92%', label: 'Client Satisfaction' },
    { value: '5yr', label: 'Experience' },
    { value: '∞', label: 'Coffee Consumed' },
]

const skills = [
    'React.js','Next.js','JavaScript','TypeScript','Node.js','Express.js','Tailwind CSS','PostgreSQL','Prisma',
    'Docker','Three.js','React Three Fiber','REST APIs','CI/CD','Figma','WebGL','LLM Integration'
]


export function About() {
    return (
        <section id='about' className={styles.section}>
            <div className={styles.eyebrow}>About</div>
            <div className={styles.grid}>
                <div className={styles.visual}>
                    <div className={styles.frame}>
                        <NextImage 
                            src='/about.png' alt='Gurjeet' 
                            className={styles.image} 
                            width={400}
                            height={400}
                        />
                        <div className={styles.tag}>
                            📍 Available Worldwide
                        </div>
                    </div>
                    <div className={styles.corner}></div>
                    <div className={styles.corner2}></div>
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        I build things<br />that <em>last.</em>
                    </h2>
                    <p className={styles.text}>
                        I'm <strong>Gurjeet</strong> - a Frontend-Heavy Full Stack Engineer obsessed with performance, craft, and clarity. I turn complex problems into scalable, elegant web systems that users love and teams can maintain.
                        <br/><br />
                        My work lives at the intersection of engineering rigor and design precision. Every line of code I write is intentional. Every interface I build respects the user's time.
                    </p>
                    <div className={styles.statsGrid}>
                        {stats.map((s, i) => (
                            <div key={i} className={styles.stat} data-cursor-hover>
                                <div className={styles.statValue}>{s.value}</div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chips}>
                        {skills.map((skill, i) => (
                            <span key={i} className={styles.chip} data-cursor-hover>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}