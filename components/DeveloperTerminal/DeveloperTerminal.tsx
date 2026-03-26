'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './DeveloperTerminal.module.css';

interface TerminalLine {
    type: 'output' | 'input';
    value: string;
}

const commands: Record<string, string | string[]> = {
    help: ['available commands: help, stack, status, skills, contact, clear'],
    stack: 'nextjs • typescript • node • postgresql • framer-motion • tailwind',
    status: 'open_for_select_projects=true',
    skills: ['frontend • backend • systems • design • ai-integration'],
    contact: 'gurjeetsinghvirdee@gmail.com | available_now',
    clear: 'CLEAR_SCREEN',
};

export function DeveloperTerminal() {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', value: 'Welcome to Portfolio Shell v1.0 — type "help" for commands' },
    ]);
    const [input, setInput] = useState('');
    const screenRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        setLines(prev => [...prev, { type: 'input', value: trimmed }]);

        if (trimmed === 'clear') {
            setLines([]);
        } else if (commands[trimmed]) {
            const response = commands[trimmed];
            if (Array.isArray(response)) {
                setLines(prev => [...prev, ...response.map(r => ({ type: 'output' as const, value: r }))]);
            } else {
                setLines(prev => [...prev, { type: 'output', value: response }]);
            }
        } else if (trimmed !== '') {
            setLines(prev => [...prev, { type: 'output', value: `command not found: ${trimmed}` }]);
        }

        setInput('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
        }
    };

    // Auto-scroll
    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.topBar}>
                <div className={styles.dots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                </div>
                <span className={styles.title}>gurjeet: ~/portfolio</span>
            </div>

            <div className={styles.screen} ref={screenRef}>
                {lines.map((line, i) => (
                    <div key={i} className={line.type === 'input' ? styles.promptRow : styles.outputRow}>
                        {line.type === 'input' && <span className={styles.promptMark}>$</span>}
                        <span className={styles.rowText}>{line.value}</span>
                    </div>
                ))}

                <div className={styles.inputRow}>
                    <span className={styles.promptMark}>$</span>
                    <div className={styles.inputTrack}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                            placeholder="type command or 'help'"
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}