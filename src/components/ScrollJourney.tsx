import React, { RefObject, useEffect, useRef } from 'react'
import { MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

interface Point {
  progress: number
  x: number
}

interface ScrollJourneyProps {
  containerRef: RefObject<HTMLDivElement>
}

const SECTION_IDS = ['about', 'services', 'experience', 'projects', 'case-study', 'contact']

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const catmullRom = (before: number, start: number, end: number, after: number, t: number) => {
  const t2 = t * t
  const t3 = t2 * t
  return (
    0.5 *
    (2 * start +
      (-before + end) * t +
      (2 * before - 5 * start + 4 * end - after) * t2 +
      (-before + 3 * start - 3 * end + after) * t3)
  )
}

const updatePathPosition = (
  progress: number,
  points: Point[],
  x: MotionValue<number>,
  y: MotionValue<number>,
  scrollableDistance: number,
  viewportAnchor: number,
) => {
  if (points.length < 2) return

  let segment = 0
  while (segment < points.length - 2 && progress > points[segment + 1].progress) {
    segment += 1
  }

  const start = points[segment]
  const end = points[segment + 1]
  const before = points[Math.max(0, segment - 1)]
  const after = points[Math.min(points.length - 1, segment + 2)]
  const range = end.progress - start.progress
  const t = range > 0 ? clamp((progress - start.progress) / range, 0, 1) : 0

  x.set(catmullRom(before.x, start.x, end.x, after.x, t))
  y.set(viewportAnchor + progress * scrollableDistance)
}

export const ScrollJourney: React.FC<ScrollJourneyProps> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)
  const rotation = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-6, 6, -6]), {
    stiffness: 70,
    damping: 28,
    mass: 1.1,
  })
  const smoothX = useSpring(x, { stiffness: 90, damping: 30, mass: 1.2 })
  const smoothY = useSpring(y, { stiffness: 90, damping: 30, mass: 1.2 })
  const facing = useTransform(smoothX, (latest) => {
    const width = containerRef.current?.clientWidth ?? window.innerWidth
    const turnStart = width * 0.43
    const turnEnd = width * 0.57
    if (latest <= turnStart) return -1
    if (latest >= turnEnd) return 1
    return -1 + ((latest - turnStart) / (turnEnd - turnStart)) * 2
  })
  const avatarRef = useRef<HTMLImageElement>(null)
  const pointsRef = useRef<Point[]>([])
  const pathMetricsRef = useRef({ scrollableDistance: 1, viewportAnchor: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const updatePoints = () => {
      const bounds = container.getBoundingClientRect()
      const scrollableDistance = Math.max(1, container.offsetHeight - window.innerHeight)
      const viewportAnchor = window.innerHeight * 0.64
      pathMetricsRef.current = { scrollableDistance, viewportAnchor }
      const avatarSize = avatarRef.current?.offsetWidth || 144
      const edgeX = avatarSize / Math.SQRT2 + 12
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (section): section is HTMLElement => section !== null,
      )

      pointsRef.current = sections.map((section, index) => {
        const rect = section.getBoundingClientRect()
        const pointY = rect.top - bounds.top + rect.height / 2
        const progress =
          index === 0
            ? 0
            : index === sections.length - 1
              ? 1
              : clamp((pointY - viewportAnchor) / scrollableDistance, 0, 1)

        return {
          progress,
          x:
            (index % 2 === 0 ? edgeX : bounds.width - edgeX) +
            [0, -8, 8, -8, 8, 0][index],
        }
      })

      updatePathPosition(
        scrollYProgress.get(),
        pointsRef.current,
        x,
        y,
        scrollableDistance,
        viewportAnchor,
      )
      opacity.set(pointsRef.current.length > 1 ? 1 : 0)
    }

    const resizeObserver = new ResizeObserver(updatePoints)
    resizeObserver.observe(container)
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id)
      if (section) resizeObserver.observe(section)
    })

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      updatePathPosition(
        progress,
        pointsRef.current,
        x,
        y,
        pathMetricsRef.current.scrollableDistance,
        pathMetricsRef.current.viewportAnchor,
      )
    })
    window.addEventListener('resize', updatePoints)
    updatePoints()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePoints)
      unsubscribe()
    }
  }, [containerRef, opacity, scrollYProgress, x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-40 -ml-[56px] -mt-[56px] sm:-ml-16 sm:-mt-16 md:-ml-[72px] md:-mt-[72px]"
      style={{ x: smoothX, y: smoothY, opacity }}
    >
      <motion.img
        ref={avatarRef}
        src="/images/scroll-journey-avatar.png"
        alt=""
        className="h-28 w-28 object-contain drop-shadow-[0_0_16px_rgba(168,85,247,0.35)] sm:h-32 sm:w-32 md:h-36 md:w-36"
        style={{ rotate: rotation, scaleX: facing }}
        draggable={false}
      />
    </motion.div>
  )
}
