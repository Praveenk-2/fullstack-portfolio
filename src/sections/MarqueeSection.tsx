import React, { useEffect, useRef, useState } from 'react'

interface GalleryItem {
  title: string
  category: string
  src: string
  url?: string
}

const PROJECT_TILES: GalleryItem[] = [
  {
    title: 'EyeCatchMedia',
    category: 'Full Stack Web Development',
    src: '/images/eyecatchmedia.jpg',
    url: 'https://eyecatchmedia.org/',
  },
  {
    title: 'TPOM Marketplace',
    category: 'Full Stack Web Application',
    src: '/images/tpom_marketplace.jpg',
    url: 'https://www.tpom.in/',
  },
  {
    title: 'Madurai SkyTop Travels',
    category: 'Travel & Enquiry Booking',
    src: '/images/skytop_travels.jpg',
    url: 'https://www.maduraiskytoptravels.com/',
  },
  {
    title: 'Atchaya Paathiram Trust',
    category: 'NGO Website & CMS Platform',
    src: '/images/atchaya_trust.jpg',
  },
  {
    title: 'Invoice & Payroll Management',
    category: 'Enterprise SaaS & HR Tech',
    src: '/images/invoice_system.jpg',
  },
  {
    title: 'W2S Solutions',
    category: 'Frontend Development',
    src: '/images/w2ssolutions.jpg',
    url: 'https://www.w2ssolutions.com/',
  },
  {
    title: 'Way2Smile',
    category: 'Complete Website Development',
    src: '/images/way2smile.jpg',
    url: 'https://way2smile.com/',
  },
]

// Repeat tiles for continuous scrolling
const ROW1_TILES = [...PROJECT_TILES, ...PROJECT_TILES, ...PROJECT_TILES]
const ROW2_TILES = [
  ...PROJECT_TILES.slice().reverse(),
  ...PROJECT_TILES.slice().reverse(),
  ...PROJECT_TILES.slice().reverse(),
]

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(currentOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-4">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
        <div
          className="flex gap-4 -ml-[2400px]"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        >
          {ROW1_TILES.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-xl"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-semibold">
                  {item.category}
                </span>
                <h4 className="text-white font-bold uppercase tracking-tight text-base sm:text-lg">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div
          className="flex gap-4 -ml-[600px]"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        >
          {ROW2_TILES.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-xl"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-semibold">
                  {item.category}
                </span>
                <h4 className="text-white font-bold uppercase tracking-tight text-base sm:text-lg">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
