import React, { useEffect, useRef } from 'react'

const CURSOR_FLAIR = [
  { content: '✦', color: 'text-purple-300 bg-purple-400/10 border-purple-300/30' },
  { content: '</>', color: 'text-cyan-200 bg-cyan-400/10 border-cyan-200/30' },
  { content: '{}', color: 'text-[#D7E2EA] bg-white/10 border-white/30' },
  { content: '+', color: 'text-fuchsia-200 bg-fuchsia-400/10 border-fuchsia-200/30' },
]

export const CursorTrail: React.FC = () => {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trail = trailRef.current
    if (
      !trail ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    const flairs = Array.from(trail.querySelectorAll<HTMLElement>('[data-cursor-flair]'))
    let lastX = 0
    let lastY = 0
    let hasLastPosition = false
    let index = 0

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || flairs.length === 0) return

      const aboutSection = document.getElementById('about')
      if (!aboutSection || event.clientY < aboutSection.getBoundingClientRect().top) {
        hasLastPosition = false
        return
      }

      if (hasLastPosition && Math.hypot(event.clientX - lastX, event.clientY - lastY) < 85) return

      lastX = event.clientX
      lastY = event.clientY
      hasLastPosition = true

      const flair = flairs[index % flairs.length]
      flair.style.left = `${event.clientX}px`
      flair.style.top = `${event.clientY}px`
      flair.style.setProperty('--flair-rotation', `${Math.random() * 720 - 360}deg`)
      flair.style.animation = 'none'
      void flair.offsetWidth
      flair.style.animation = 'about-flair 1050ms both'
      index += 1
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div ref={trailRef} className="fixed inset-0 overflow-hidden pointer-events-none z-50" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => {
        const flair = CURSOR_FLAIR[index % CURSOR_FLAIR.length]
        return (
          <span key={index} data-cursor-flair className={`about-cursor-flair ${flair.color}`}>
            {flair.content}
          </span>
        )
      })}
    </div>
  )
}
