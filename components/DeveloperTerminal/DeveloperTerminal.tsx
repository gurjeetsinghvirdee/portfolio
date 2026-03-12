'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './DeveloperTerminal.module.css';

interface TerminalLine {
    type: 'prompt' | 'output' | 'input';
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
        { type: 'output', value: 'Welcome to Portfolio Shell v1.0 type "help" for commands' },
    ]);
    const [input, setInput] = useState('');
    const [caretIndex, setCaretIndex] = useState(0);
    const [cursorOffset, setCursorOffset] = useState(0);
    const screenRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mirrorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        const inputEl = inputRef.current;
        if (!inputEl) return;
        setCaretIndex(inputEl.selectionStart ?? input.length);
    }, [input]);

    useEffect(() => {
        const updateCursorOffset = () => {
            const inputEl = inputRef.current;
            const mirrorEl = mirrorRef.current;
            if (!inputEl || !mirrorEl) return;

            const offset = mirrorEl.offsetWidth - inputEl.scrollLeft;
            setCursorOffset(Math.max(0, offset));
        };

        updateCursorOffset();
        window.addEventListener('resize', updateCursorOffset);

        return () => {
            window.removeEventListener('resize', updateCursorOffset);
        };
    }, [input, caretIndex]);

    const syncCaretPosition = () => {
        const inputEl = inputRef.current;
        if (!inputEl) return;
        setCaretIndex(inputEl.selectionStart ?? inputEl.value.length);
    };

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();

        // Add input line
        setLines(prev => [...prev, { type: 'input', value: trimmed }]);

        // Process command
        const response = commands[trimmed];
        if (trimmed === '') {
        } else if (trimmed === 'clear') {
            setLines([]);
        } else if (response) {
            if (Array.isArray(response)) {
                setLines(prev => [...prev, ...response.map(r => ({ type: 'output' as const, value: r }))]);
            } else {
                setLines(prev => [...prev, { type: 'output', value: response }]);
            }
        } else {
            setLines(prev => [...prev, { type: 'output', value: `command not found: ${trimmed}` }]);
        }

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
        }
    };

    const mirrorText = (input.slice(0, caretIndex) || ' ').replace(/ /g, '\u00A0');

    return (
        <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                {lines.map((line, index) => (
                    <div key={`${line.value}-${index}`} className={line.type === 'input' ? styles.promptRow : styles.outputRow}>
                        {(line.type === 'prompt' || line.type === 'input') && <span className={styles.promptMark}>$</span>}
                        <span className={styles.rowText}>{line.value}</span>
                    </div>
                ))}
                <div className={styles.inputRow}>
                    <span className={styles.promptMark}>$</span>
                    <div className={styles.inputTrack}>
                        <span ref={mirrorRef} className={styles.inputMirror} aria-hidden="true">
                            {mirrorText}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => {
                                setInput(e.target.value);
                                setCaretIndex(e.target.selectionStart ?? e.target.value.length);
                            }}
                            onKeyDown={handleKeyDown}
                            onKeyUp={syncCaretPosition}
                            onClick={syncCaretPosition}
                            onSelect={syncCaretPosition}
                            className={styles.input}
                            placeholder="type command or 'help'"
                            autoFocus
                        />
                        <span className={styles.blinkCursor} style={{ left: `${cursorOffset}px` }} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

