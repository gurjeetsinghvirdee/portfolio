'use client';

import { Cursor } from '@/components/Cursor/Cursor';
import { Hero } from '@/components/Hero/Hero';
import { Nav } from '@/components/Nav/Nav';
import { Marquee } from '@/components/Marquee/Marquee';
import { Work } from '@/components/Work/Work';
import { About } from '@/components/About/About';
import { Services } from '@/components/Services/Services';
// import { Process } from '@/components/Process/Process';
// import { Testimonials } from '@/components/Testimonials/Testimonials';
// import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';


export default function Page() {
    return (
        <>
            <Cursor />
            <Nav />
            <Hero />
            <Marquee />
            <Work />
            <About />
            <Services />
            {/*<Process />
            <Testimonials />
            <Contact /> */}
            <Footer />
        </>
    )
}