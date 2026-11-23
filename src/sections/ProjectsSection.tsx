import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { LiveProjectButton } from '../components/LiveProjectButton'
import { CheckCircle2 } from 'lucide-react'

interface ProjectData {
  number: string
  title: string
  category: string
  description: string
  contributions: string[]
  technologies: string[]
  mainImg: string
  liveUrl?: string
  hasLiveSite: boolean
}

const projects: ProjectData[] = [
  {
    number: '01',
    title: 'ShreeTech E-commerce',
    category: 'E-commerce Product & Scroll Animation',
    description:
      'A company e-commerce product featuring a scroll-driven shopping experience, with interactive product presentation built using React, Node.js, and MySQL.',
    contributions: [
      'Built an interactive storefront with scroll-based product animations.',
      'Developed the frontend with React and connected it to a Node.js backend with MySQL.',
    ],
    technologies: ['React.js', 'Node.js', 'MySQL'],
    mainImg: '/images/shreetech-ecommerce.png',
    liveUrl: 'https://shreetech-ecommerce.vercel.app/',
    hasLiveSite: true,
  },
  {
    number: '02',
    title: 'Kiaura Publications',
    category: 'Full Stack Book Publishing Website',
    description:
      'Developed a full-stack book publishing website for Kiaura, bringing its book catalog, publishing services, and author enquiry experience together in one platform.',
    contributions: [
      'Built the publishing website with the MERN stack, connecting the frontend to backend services and MongoDB.',
      'Implemented book discovery, publishing service content, and contact flows for prospective authors.',
      'Configured the production deployment and domain on GoDaddy.',
    ],
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'GoDaddy'],
    mainImg: '/images/kiaura.png',
    liveUrl: 'https://kiaura.in/',
    hasLiveSite: true,
  },
  {
    number: '03',
    title: 'EyeCatchMedia',
    category: 'Full Stack Web Development',
    description:
      'Developed project functionality using a modern JavaScript stack, working with React.js for the frontend, Node.js for backend functionality, and MongoDB for scalable data management.',
    contributions: [
      'Engineered full-stack integration between React.js frontend, backend REST APIs, and MongoDB.',
      'Developed dynamic service catalogs, portfolio showcase modules, and client enquiry flows.',
      'Optimized component rendering, data fetching state, and cross-browser responsiveness.',
    ],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Express.js', 'Tailwind CSS'],
    mainImg: '/images/eyecatchmedia.png',
    liveUrl: 'https://eyecatchmedia.org/',
    hasLiveSite: true,
  },
  {
    number: '04',
    title: 'TPOM Marketplace',
    category: 'Full Stack Web Application',
    description:
      'Developed a classified marketplace inspired by OLX, allowing users to explore product listings across vehicles, real estate, electronics, and home appliances.',
    contributions: [
      'Built responsive pages and listing interfaces using Next.js and Tailwind CSS.',
      'Integrated REST APIs and MySQL database operations for high-volume transactions.',
      'Implemented seller ad submission workflows and customer enquiry management.',
      'Developed an admin dashboard for managing submissions, listings, and enquiries.',
    ],
    technologies: ['Next.js', 'React.js', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    mainImg: '/images/tpom_marketplace.jpg',
    liveUrl: 'https://www.tpom.in/',
    hasLiveSite: true,
  },
  {
    number: '05',
    title: 'Madurai SkyTop Travels',
    category: 'Travel Website & Enquiry Management',
    description:
      'A travel website designed to showcase travel services, tour packages, fleet options, and help customers submit booking enquiries.',
    contributions: [
      'Developed responsive website sections and interactive booking enquiry forms.',
      'Integrated enquiry forms with backend functionality and MySQL database.',
      'Implemented WhatsApp enquiry notifications and automated messaging workflows.',
      'Worked on SEO optimization, domain configuration, and production deployment.',
    ],
    technologies: ['Next.js', 'React.js', 'MySQL', 'PHP', 'REST APIs'],
    mainImg: '/images/skytop_travels.jpg',
    liveUrl: 'https://www.maduraiskytoptravels.com/',
    hasLiveSite: true,
  },
  {
    number: '06',
    title: 'Atchaya Paathiram Trust',
    category: 'NGO Website & CMS Platform',
    description:
      'A nonprofit website supporting the presentation of trust activities, events, announcements, photo galleries, and donation-related information.',
    contributions: [
      'Developed dynamic content pages and responsive mobile-first interfaces.',
      'Implemented CMS and admin management features for banners, events, and photo galleries.',
      'Integrated REST APIs and database connectivity for activity updates.',
      'Supported multilingual (English & Tamil) content and communication workflows.',
    ],
    technologies: ['Next.js', 'React.js', 'PHP', 'MySQL', 'Tailwind CSS'],
    mainImg: '/images/atchaya_trust.jpg',
    liveUrl: '#',
    hasLiveSite: false,
  },
  {
    number: '07',
    title: 'Invoice & Payroll Management System',
    category: 'Enterprise SaaS & HR Tech',
    description:
      'A comprehensive enterprise web application for managing client billing, automated invoicing, employee payroll cycles, tax deductions, and financial records through an organized interface.',
    contributions: [
      'Developed reusable UI components and responsive payroll dashboard screens using Next.js & TypeScript.',
      'Implemented automated salary calculation, pay-slip generation, and invoice tracking workflows.',
      'Integrated role-based authentication and secure access control for HR and finance teams.',
      'Built REST API endpoints with Axios for seamless frontend-backend data synchronization.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MySQL', 'REST APIs', 'Axios'],
    mainImg: '/images/invoice_system.jpg',
    liveUrl: '#',
    hasLiveSite: false,
  },
]

interface CardProps {
  project: ProjectData
  index: number
  totalCards: number
  progress: MotionValue<number>
  targetScale: number
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  progress,
  targetScale,
}) => {
  const rangeStart = (index / totalCards) * 0.85
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale])

  const topOffset = index * 20

  return (
    <div
      className="sticky h-[88vh] min-h-[600px] flex items-start justify-center"
      style={{
        top: `calc(${topOffset}px + clamp(3.5rem, 6vw, 5.5rem))`,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-6xl rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_-15px_50px_rgba(0,0,0,0.95)] flex flex-col gap-4 sm:gap-6"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/15 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA] text-[clamp(2rem,5vw,80px)] leading-none select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                {project.category}
              </span>
              <h3 className="font-bold uppercase text-base sm:text-xl md:text-2xl text-[#D7E2EA] tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.hasLiveSite ? (
              <LiveProjectButton href={project.liveUrl} />
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-white/20 text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-wider font-mono">
                Source Protected
              </span>
            )}
          </div>
        </div>

        {/* Content & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1 min-h-0 items-center">
          {/* Left Column (5 cols): Description, Key Contributions & Tech Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-3 py-1">
            <p className="text-[#D7E2EA]/80 text-xs sm:text-sm font-light leading-relaxed">
              {project.description}
            </p>

            {/* Key Contributions */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-semibold">
                Key Contributions:
              </span>
              <ul className="space-y-1">
                {project.contributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-[#D7E2EA]/75">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-[11px] font-mono text-[#D7E2EA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols): Actual UI Screenshot */}
          <div className="lg:col-span-7 h-[250px] sm:h-[300px] md:h-[360px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#141414] shadow-xl group relative">
            <img
              src={project.mainImg}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {project.hasLiveSite && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:bg-purple-600 transition-colors"
              >
                Visit Site ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 pb-32"
    >
      {/* Heading: SELECTED PROJECTS */}
      <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(2.5rem,10vw,140px)]">
          Selected Projects
        </h2>
      </FadeIn>

      {/* Sticky stacking cards in continuous scroll track */}
      <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col relative pb-20">
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - 1 - index) * 0.02

          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projects.length}
              progress={scrollYProgress}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
