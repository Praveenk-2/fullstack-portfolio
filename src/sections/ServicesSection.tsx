import React from 'react'
import { FadeIn } from '../components/FadeIn'

interface ServiceItem {
  number: string
  name: string
  description: string
}

const services: ServiceItem[] = [
  {
    number: '01',
    name: 'Frontend Development',
    description:
      'Build responsive, interactive, and accessible user interfaces using React.js, Next.js, JavaScript, and modern CSS frameworks.',
  },
  {
    number: '02',
    name: 'Full Stack Web Development',
    description:
      'Develop complete web applications by connecting frontend interfaces, backend services, REST APIs, and databases.',
  },
  {
    number: '03',
    name: 'Backend & API Development',
    description:
      'Build backend functionality, API integrations, authentication workflows, CRUD operations, and database connectivity using Node.js, Express.js, and PHP.',
  },
  {
    number: '04',
    name: 'Website Development',
    description:
      'Create complete business websites with responsive layouts, reusable components, dynamic content, and user-friendly navigation.',
  },
  {
    number: '05',
    name: 'CMS, SEO & Deployment',
    description:
      'Develop admin dashboards and content management systems while supporting SEO optimization, domain configuration, hosting, and production deployment.',
  },
]

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading: WHAT I DO */}
        <FadeIn delay={0} y={30} className="w-full text-center">
          <h2 className="text-[#0C0C0C] font-black uppercase text-center leading-none text-[clamp(2.5rem,10vw,140px)] mb-16 sm:mb-20 md:mb-28">
            What I Do
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="border-t border-[#0C0C0C]/15">
          {services.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 group transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 md:gap-14">
                {/* Number */}
                <div className="font-black leading-none text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] shrink-0 select-none group-hover:translate-x-2 transition-transform duration-300">
                  {service.number}
                </div>

                {/* Name & Description */}
                <div className="flex flex-col flex-1 justify-center pt-2 sm:pt-4 md:pt-6">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)] mb-2 md:mb-3">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-70 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
