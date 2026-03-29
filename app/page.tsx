'use client';

import { useEffect } from 'react';
import { Cursor } from '@/components/Cursor/Cursor';
import { Hero } from '@/components/Hero/Hero';
import { Nav } from '@/components/Nav/Nav';
import { Marquee } from '@/components/Marquee/Marquee';
import { Work } from '@/components/Work/Work';
import { About } from '@/components/About/About';
import { Services } from '@/components/Services/Services';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { SectionDivider } from '@/components/SectionDivider/SectionDivider';
import { useSmoothScroll } from '@/lib/smooth-scroll';

export default function Page() {
    useSmoothScroll();

    // Set performance class on body
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (isMobile) {
            document.body.classList.add('mobile');
        }
    }, []);

    return (
        <>
            <Cursor />
            <Nav />
            <Hero />
            <Marquee />
            <SectionDivider />
            <Work />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <Contact />
            <Footer />
        </>
    );
}