import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight, Eye, CheckCircle2, Globe, ExternalLink } from 'lucide-react'
import { ContactButton } from '../components/ContactButton'

interface SlideData {
  id: string
  phase: string
  title: string
  highlight: string
  description: string
  contributions: string[]
  tags: string[]
  metrics: { label: string; value: string }[]
  image: string
  badge: string
  liveUrl?: string
}

const slides: SlideData[] = [
  {
    id: '01',
    phase: 'CASE STUDY 01 // ENTERPRISE FRONTEND',
    title: 'W2S Solutions',
    highlight: 'Responsive corporate website interfaces and reusable frontend components.',
    description:
      'Contributed to W2S Solutions website experiences by building responsive service pages and reusable UI components aligned with project requirements.',
    contributions: [
      'Developed modular components for core enterprise service pages.',
      'Implemented responsive layouts and cross-browser compatible styling.',
      'Collaborated with designers and stakeholders to deliver polished interfaces.',
    ],
    tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    metrics: [
      { label: 'Focus', value: 'Frontend Development' },
      { label: 'Components', value: 'Reusable UI' },
      { label: 'Website', value: 'w2ssolutions.com' },
    ],
    image: '/images/w2ssolutions.jpg',
    badge: 'ENTERPRISE FRONTEND',
    liveUrl: 'https://www.w2ssolutions.com/',
  },
  {
    id: '02',
    phase: 'CASE STUDY 02 // INDEPENDENT DELIVERY',
    title: 'Way2Smile',
    highlight: 'Complete website development, delivered independently from structure to launch.',
    description:
      'Took end-to-end ownership of the Way2Smile website, including its structure, responsive layouts, page implementation, and overall frontend integration.',
    contributions: [
      'Developed the complete website from initial structure through production implementation.',
      'Built responsive page layouts for a consistent experience across devices.',
      'Focused on accessible, maintainable frontend code and performance.',
    ],
    tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    metrics: [
      { label: 'Ownership', value: 'End-to-End' },
      { label: 'Delivery', value: 'Full Website' },
      { label: 'Website', value: 'way2smile.com' },
    ],
    image: '/images/way2smile.jpg',
    badge: 'INDEPENDENT DEVELOPMENT',
    liveUrl: 'https://way2smile.com/',
  },
  {
    id: '03',
    phase: 'CASE STUDY 03 // FLUTTER MOBILE APPS',
    title: 'Blood Donor Junction',
    highlight: 'Two Flutter apps connecting blood donors, people requesting blood, and organizations.',
    description:
      'Built separate mobile app experiences for individual users and blood-donor organizations, supporting donor registration and blood request discovery.',
    contributions: [
      'Developed the user app for donor profiles and browsing nearby blood requests.',
      'Built a dedicated organization app to support organization-side blood donation workflows.',
      'Created mobile interfaces for donor discovery and request matching.',
    ],
    tags: ['Flutter', 'Dart', 'Android', 'iOS', 'User App', 'Organization App'],
    metrics: [
      { label: 'Platforms', value: 'User & Organization' },
      { label: 'Technology', value: 'Flutter & Dart' },
      { label: 'Product', value: 'Blood Donation' },
    ],
    image: '/images/donorjunction.jpg',
    badge: 'MOBILE APPLICATIONS',
  },
]

export const HorizontalSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(1)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal translate from 0vw to -200vw across 3 slides
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw'])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.35) {
      setActiveSlide(1)
    } else if (latest < 0.7) {
      setActiveSlide(2)
    } else {
      setActiveSlide(3)
    }
  })

  return (
    <section
      id="case-study"
      ref={targetRef}
      className="relative h-[300vh] bg-[#0C0C0C] z-20 border-t border-white/10"
    >
      {/* Pinned 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex flex-col justify-between bg-[#0C0C0C]">
        {/* Sticky Top HUD Bar */}
        <div className="w-full flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-7 z-30 pointer-events-none">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#D7E2EA]/80 uppercase font-mono">
                // Building Real-World Digital Products
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#D7E2EA]/50 hidden md:inline-block font-light">
              Case Studies: Websites, Mobile Apps & Reliable Solutions
            </span>
          </div>

          <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-mono">
              Slide <span className="text-white font-bold">0{activeSlide}</span> / 03
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D7E2EA]/40">
              <span>Scroll to explore</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Horizontal Slides Strip (300vw width) */}
        <motion.div
          style={{ x }}
          className="flex h-[calc(100vh-160px)] w-[300vw] will-change-transform"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-screen h-full flex-shrink-0 px-6 sm:px-12 md:px-20 flex items-center relative select-none"
            >
              {/* Massive subtle background number */}
              <span className="absolute right-6 sm:right-16 bottom-0 font-black text-[22vw] leading-none text-white/[0.03] select-none pointer-events-none -z-0">
                {slide.id}
              </span>

              {/* Slide Content Grid */}
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center z-10">
                {/* Left Column: Text, Contributions & Specs (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-3 sm:gap-4">
                  {/* Badge & Phase */}
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest">
                      {slide.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D7E2EA]/50">
                      {slide.phase}
                    </span>
                  </div>

                  {/* Title with .hero-heading gradient */}
                  <h3 className="hero-heading font-black uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
                    {slide.title}
                  </h3>

                  {/* Highlight statement */}
                  <p className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wide">
                    {slide.highlight}
                  </p>

                  {/* Description paragraph */}
                  <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>

                  {/* Specific Contributions */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-semibold">
                      Key Highlights & Contributions:
                    </span>
                    <ul className="space-y-1">
                      {slide.contributions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-[#D7E2EA]/75">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-[11px] font-mono text-[#D7E2EA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Box & Live CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 max-w-xl">
                    <div className="flex items-center gap-6">
                      {slide.metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-mono">
                            {metric.label}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-white tracking-tight mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {slide.liveUrl && (
                        <a
                          href={slide.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-white text-xs font-mono uppercase tracking-wider hover:bg-purple-600 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {slide.id === '03' && <ContactButton href="#contact" label="Contact Me" />}
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Showcase Card (5 cols) */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative w-full max-w-[440px] aspect-[16/10] sm:aspect-square max-h-[380px] lg:max-h-[420px] rounded-[32px] sm:rounded-[44px] overflow-hidden border border-white/15 bg-[#141414] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />

                    {/* Gradient Overlay & Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/80">
                          <Eye className="w-4 h-4 text-purple-400" />
                          <span>Production Screenshot</span>
                        </div>
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white tracking-widest">
                          {slide.id} / 03
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Sticky Bottom Progress Bar */}
        <div className="w-full px-6 sm:px-12 pb-5 sm:pb-7 flex flex-col gap-2 z-30">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-full"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-[#D7E2EA]/50 uppercase tracking-widest">
            <span>01 // W2S Solutions</span>
            <span>02 // Way2Smile</span>
            <span>03 // Blood Donor Junction</span>
          </div>
        </div>
      </div>
    </section>
  )
}
