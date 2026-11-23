import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { AboutSection } from './sections/AboutSection'
import { ServicesSection } from './sections/ServicesSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { HorizontalSection } from './sections/HorizontalSection'
import { ContactButton } from './components/ContactButton'
import { CursorTrail } from './components/CursorTrail'
import { FadeIn } from './components/FadeIn'
import { ScrollJourney } from './components/ScrollJourney'
import { Mail, Github, Linkedin, MessageCircle, ArrowUp } from 'lucide-react'

export const App: React.FC = () => {
  const scrollJourneyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Store global reference for programmatic scrolling
    ;(window as any).lenis = lenis

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    // Smooth scroll for internal anchor links using Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement as HTMLElement, { offset: 0, duration: 1.2 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  const scrollToTop = () => {
    if ((window as any).lenis) {
      ;(window as any).lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="bg-[#0C0C0C] font-kanit text-[#D7E2EA] min-h-screen selection:bg-purple-600/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      <main>
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. PROJECT PREVIEW GALLERY (MARQUEE) */}
        <MarqueeSection />

      </main>

      <div ref={scrollJourneyRef} className="relative">
        {/* 3. ABOUT ME SECTION */}
        <AboutSection />

        {/* 4. SERVICES SECTION (WHAT I DO) */}
        <ServicesSection />

        {/* 5. PROFESSIONAL EXPERIENCE TIMELINE */}
        <ExperienceSection />

        {/* 6. SELECTED PROJECTS SECTION (STICKY STACKING CARDS) */}
        <ProjectsSection />

        {/* 7. PROJECT DETAIL & CASE STUDY SECTION (HORIZONTAL SCROLL) */}
        <HorizontalSection />

        <CursorTrail />
        <ScrollJourney containerRef={scrollJourneyRef} />

        {/* 8. CONTACT & FOOTER SECTION */}
        <footer id="contact" className="bg-[#0C0C0C] border-t border-white/10 px-6 md:px-12 py-16 sm:py-20 relative z-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <FadeIn delay={0} y={20} className="flex flex-col gap-2">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-400 font-mono">
                // Get In Touch
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                Let&apos;s build something great
              </h3>
              <p className="text-[#D7E2EA]/75 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                I&apos;m open to exciting developer opportunities and projects where I can build useful digital products, contribute to modern web applications, and continue growing as a Full Stack Developer.
              </p>
            </FadeIn>

            <FadeIn delay={0.15} y={20} className="flex flex-col sm:flex-row items-center gap-4">
              <ContactButton
                href="https://wa.me/919487269305?text=Hi%20Praveen%2C%20I%27d%20like%20to%20connect."
                label="Let's Connect"
                target="_blank"
              />
              <button
                onClick={scrollToTop}
                title="Back to Top"
                className="p-3.5 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </FadeIn>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D7E2EA]/50 font-light">
            <p>© {new Date().getFullYear()} Praveen — Full Stack Developer. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Praveenk-2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" /> <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/praveen-karuppasamy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" /> <span>LinkedIn</span>
              </a>
              <a
                href="mailto:praveenkaruppasamy2@gmail.com"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> <span>Email</span>
              </a>
              <a
                href="https://wa.me/919487269305"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
