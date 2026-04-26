'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    HiCalendarDays,
    HiChartBarSquare,
    HiCodeBracketSquare,
    HiGlobeAlt,
    HiPencilSquare,
    HiRocketLaunch,
    HiShieldCheck,
    HiSparkles,
    HiUserGroup,
    HiChevronDown,
} from 'react-icons/hi2';
import styles from './Experience.module.css';

type ExperienceItem = {
    role: string;
    period: string;
    points: string[];
    icon: IconType;
};

const experiences: ExperienceItem[] = [
    {
        role: 'Frontend Engineer - Freelance',
        period: 'Dec 2025 - Present',
        icon: HiRocketLaunch,
        points: [
            'Building an AI-powered debate platform using Next.js 15 + Claude API, focusing on real-time interaction and structured argument flows.',
            'Developing a 3D real-time latency visualization system using React Three Fiber, rendering global network data at ~60 FPS.',
            'Architecting performance-first frontend systems with optimized state management and modular UI design.',
            'Implementing heavy client-side processing using Web Workers (compression, parsing, async tasks) to reduce server dependency.',
        ],
    },
    {
        role: 'Open Source Frontend Maintainer - Appwrite',
        period: 'Jan 2025 - Aug 2025',
        icon: HiGlobeAlt,
        points: [
            'Improved UI consistency and resolved visual regressions across a console used by 100K+ developers.',
            'Enhanced navigation flows, accessibility, and responsiveness, improving usability across devices.',
            'Collaborated with global contributors to maintain high-quality UI standards in a production-scale open-source system.',
            'Identified and fixed layout/system-level inconsistencies, strengthening overall frontend architecture.',
        ],
    },
    {
        role: 'Data Analyst - Chhattisgarh Forest Department',
        period: 'Sep 2025 - Nov 2025',
        icon: HiChartBarSquare,
        points: [
            'Processed and structured 2000+ survey records, transforming raw field data into usable datasets.',
            'Improved data organization for analysis and reporting workflows.',
        ],
    },
    {
        role: 'Frontend Code Reviewer & QA Specialist - Outlier',
        period: 'Oct 2024 - Feb 2025',
        icon: HiShieldCheck,
        points: [
            'Optimized conversation interfaces, improving clarity and interaction flow for 10K+ users.',
            'Refined UI text hierarchy and layouts, increasing engagement and task completion rates.',
            'Worked closely with product/design teams to enhance usability and UX consistency.',
        ],
    },
    {
        role: 'Frontend Developer Intern - NullClass',
        period: 'Jan 2023 - Apr 2023',
        icon: HiCodeBracketSquare,
        points: [
            'Built responsive authentication flows and real-time chat interfaces using React + Tailwind CSS.',
            'Improved onboarding completion by ~25% through UX and flow optimization.',
            'Reduced bundle size and improved performance by ~15% using code splitting and memoization.',
            'Integrated REST APIs with proper error handling and loading states.',
        ],
    },
    {
        role: 'Mentor & Technical Contributor - GirlScript Summer of Code',
        period: '2022 - 2023',
        icon: HiUserGroup,
        points: [
            'Mentored 200+ developers, guiding them through real-world open-source contributions.',
            'Reviewed 500+ pull requests, ensuring code quality and best practices.',
            'Ranked Top 10 globally (2022) among contributors.',
            'Supported community operations, collaboration, and developer onboarding.',
        ],
    },
    {
        role: 'Technical Content Writer - GeeksforGeeks',
        period: 'Oct 2021 - Apr 2022',
        icon: HiPencilSquare,
        points: [
            'Authored 15+ technical articles on frontend technologies (Babel, Ember, Materialize JS).',
            'Achieved 120K+ reads, focusing on clarity, depth, and practical learning.',
        ],
    },
];

export function Experience() {
    const [showAll, setShowAll] = useState(false);
    const compactCount = 3;

    const visibleExperiences = useMemo(
        () => (showAll ? experiences : experiences.slice(0, compactCount)),
        [showAll]
    );

    return (
        <section id="experience" className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.eyebrow}>Experience</div>
                <h2 className={styles.title}>Work History & Impact</h2>
            </motion.div>

            <div className={styles.timeline}>
                {visibleExperiences.map((item, idx) => (
                    <motion.article
                        key={item.role}
                        className={styles.item}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-90px' }}
                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                        data-cursor-hover
                    >
                        <div className={styles.dot} aria-hidden />
                        <div className={styles.meta}>
                            <div className={styles.roleRow}>
                                <span className={styles.roleIconWrap} aria-hidden>
                                    <item.icon className={styles.roleIcon} />
                                </span>
                                <h3 className={styles.role}>{item.role}</h3>
                            </div>
                            <p className={styles.period}>
                                <HiCalendarDays className={styles.periodIcon} />
                                {item.period}
                            </p>
                        </div>
                        <ul className={styles.points}>
                            {item.points.map((point) => (
                                <li key={point}>
                                    <HiSparkles className={styles.pointIcon} aria-hidden />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                ))}
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowAll((prev) => !prev)}
                    data-cursor-hover
                >
                    <span>{showAll ? 'Show Less' : 'Show Full Experience'}</span>
                    <HiChevronDown className={`${styles.toggleIcon} ${showAll ? styles.toggleIconUp : ''}`} />
                </button>
            </div>
        </section>
    );
}
