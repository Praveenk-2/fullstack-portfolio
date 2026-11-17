import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { Magnet } from '../components/Magnet'
import { CutoutImage } from '../components/CutoutImage'
import { ContactButton } from '../components/ContactButton'
import { ArrowDown } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[660px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="header" className="w-full z-30">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg hover:text-purple-400 hover:opacity-100 opacity-80 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading Container */}
      <div className="overflow-hidden w-full flex items-center justify-center relative z-0">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[10.5vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw] mt-4 sm:mt-2 md:-mt-6 select-none pointer-events-none">
            Hi, i&apos;m praveen
          </h1>
        </FadeIn>
      </div>

      {/* Hero Developer Visual - Centered absolutely with Magnet hover physics */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] bottom-0 flex justify-center items-end pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center items-end">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div className="relative w-full flex justify-center items-end">
              <CutoutImage
                src="/images/praveen_developer.jpg"
                alt="Praveen - Full Stack Developer"
                className="w-full h-auto max-h-[58vh] sm:max-h-[66vh] object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter"
              />
              <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent pointer-events-none" />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full z-20 relative">
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col gap-1.5 max-w-[280px] sm:max-w-[360px] md:max-w-[420px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                Full Stack Developer
              </span>
            </div>
            <p className="text-white font-medium text-xs sm:text-sm md:text-base leading-snug">
              I build modern, responsive, and scalable web applications using React.js, Next.js, Node.js, and database technologies.
            </p>
            <p className="text-[#D7E2EA]/70 font-light text-[11px] sm:text-xs leading-relaxed hidden sm:block">
              Passionate about creating user-friendly interfaces, developing reliable APIs, and transforming ideas into real-world digital solutions.
            </p>
          </div>
        </FadeIn>

        {/* CTA Buttons: Explore My Work & Contact Me */}
        <FadeIn delay={0.5} y={20} className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <a href="#projects" className="no-underline">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/20 hover:border-purple-400/60 text-[#D7E2EA] hover:text-white font-medium uppercase tracking-wider px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer select-none"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400" />
            </motion.button>
          </a>

          <ContactButton href="#contact" label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  )
}
