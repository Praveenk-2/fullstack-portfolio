import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
  company: string
  location?: string
  role: string
  period: string
  isCurrent?: boolean
  description: string
  highlights: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'ShreeTech',
    role: 'Software Developer',
    period: 'March 2026 – Present',
    isCurrent: true,
    description:
      'Focus on modern web application development, React.js, Next.js, API integrations, CMS platforms, and database-driven solutions.',
    highlights: [
      'Building scalable Next.js and React.js frontend applications with clean state management.',
      'Integrating RESTful APIs, authentication workflows, and relational database operations.',
      'Developing responsive CMS platforms and admin dashboards tailored to client requirements.',
    ],
  },
  {
    company: 'SV Technology',
    location: 'Coimbatore',
    role: 'Software Developer',
    period: 'September 2025 – February 2026',
    description:
      'Contributed to web development tasks, frontend implementation, and application functionality based on actual project responsibilities.',
    highlights: [
      'Implemented dynamic web pages and responsive interfaces using modern JavaScript frameworks.',
      'Integrated frontend components with backend services and tested cross-device responsiveness.',
      'Collaborated on feature enhancements and bug fixes to optimize web application performance.',
    ],
  },
  {
    company: 'W2S Solutions',
    location: 'Chennai',
    role: 'Junior Software Developer / Frontend Development',
    period: 'February 2024 – August 2025',
    description:
      'Built and maintained frontend interfaces, responsive website layouts, and reusable components. Focused on hands-on frontend development and UI contributions to website projects.',
    highlights: [
      'Developed modular, reusable UI components adhering to modern frontend best practices.',
      'Maintained cross-browser compatibility and optimized mobile responsiveness across enterprise pages.',
      'Participated in code reviews, layout testing, and client-side UI improvements.',
    ],
  },
]

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 relative z-10 border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading: EXPERIENCE */}
        <FadeIn delay={0} y={30} className="w-full text-center mb-16 sm:mb-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-semibold">
              // Career Trajectory
            </span>
            <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(2.5rem,10vw,140px)]">
              Experience
            </h2>
          </div>
        </FadeIn>

        {/* Timeline List */}
        <div className="relative border-l border-white/15 ml-3 sm:ml-6 md:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.company} delay={index * 0.15} y={30} className="relative">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0C0C0C] border-2 border-purple-500 flex items-center justify-center">
                {exp.isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                )}
              </div>

              {/* Card Container */}
              <div className="rounded-3xl border border-white/10 bg-[#121212]/90 p-6 sm:p-8 backdrop-blur-md hover:border-purple-500/40 transition-colors shadow-xl">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
                        {exp.company}
                      </h3>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-xs text-[#D7E2EA]/50 font-mono">
                          <MapPin className="w-3 h-3 text-purple-400" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium text-purple-300 mt-0.5">
                      {exp.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#D7E2EA]/80">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.period}</span>
                    </span>
                  </div>
                </div>

                {/* Description & Key Points */}
                <div className="pt-4 flex flex-col gap-3">
                  <p className="text-[#D7E2EA]/85 text-xs sm:text-sm font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#D7E2EA]/70">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
