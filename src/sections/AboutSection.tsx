import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { AnimatedText } from '../components/AnimatedText'
import { ArrowDown } from 'lucide-react'

const MOON_ICON =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png'
const OBJECT_3D =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png'
const LEGO_ICON =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png'
const GROUP_3D =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'

const ABOUT_TEXT =
  "I'm a Full Stack Developer with 2.6 years of experience in web development, working on responsive websites, frontend interfaces, backend integrations, CMS platforms, and database-driven applications. My experience includes developing React.js and Next.js applications, building REST APIs, integrating MySQL and MongoDB databases, and creating user-friendly admin dashboards and web interfaces. I have worked on both team-based projects and independent website development, handling frontend development, API integration, responsive layouts, and complete website implementation based on project requirements. I enjoy learning new technologies, solving technical problems, and delivering clean, maintainable, and performance-focused web applications."

interface SkillGroup {
  category: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'REST APIs'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'MongoDB', 'SQL'],
  },
  {
    category: 'UI Development',
    skills: ['Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
  {
    category: 'Other',
    skills: ['Authentication', 'CRUD Operations', 'SEO', 'Deployment'],
  },
]

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Decorative 3D elements in corners */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src={MOON_ICON}
            alt="3D Decorative Object"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none drop-shadow-xl opacity-60"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src={OBJECT_3D}
            alt="3D Decorative Object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain select-none drop-shadow-xl opacity-60"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src={LEGO_ICON}
            alt="3D Decorative Object"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none drop-shadow-xl opacity-60"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src={GROUP_3D}
            alt="3D Decorative Object"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain select-none drop-shadow-xl opacity-60"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center w-full max-w-5xl z-20">
        {/* Heading: ABOUT ME */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        {/* Space between heading & text */}
        <div className="h-10 sm:h-12 md:h-14" />

        {/* Animated paragraph */}
        <div className="max-w-[720px] text-center px-4">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-[clamp(0.95rem,1.6vw,1.2rem)]"
          />
        </div>

        {/* Space between text & Skills Grid */}
        <div className="h-12 sm:h-16" id="skills" />

        {/* Core Skills Categorized Grid */}
        <FadeIn delay={0.15} y={30} className="w-full max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-semibold">
              // Core Technical Expertise
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.category}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-md flex flex-col gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-xs text-[#D7E2EA] font-light"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Space between skills & button */}
        <div className="h-12 sm:h-16" />

        {/* CTA: VIEW MY PROJECTS */}
        <FadeIn delay={0.25} y={30}>
          <a href="#projects" className="inline-block no-underline">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none"
            >
              <span>View My Projects</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
            </motion.button>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
