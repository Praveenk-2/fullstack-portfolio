import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

interface CharProps {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0 select-text">
        {char}
      </motion.span>
    </span>
  )
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end 0.2'],
  })

  // Split into words, while keeping character index calculation
  const words = text.split(' ')
  const totalChars = text.length

  let globalCharIndex = 0

  return (
    <p ref={containerRef} className={`relative select-none ${className}`}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('')
        const startIndex = globalCharIndex
        globalCharIndex += word.length + 1 // +1 for space

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
            {wordChars.map((char, charIdx) => {
              const currentIdx = startIndex + charIdx
              // Window calculation for each character's reveal
              const start = currentIdx / totalChars
              const end = Math.min(1, start + 0.08)

              return (
                <Char
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              )
            })}
          </span>
        )
      })}
    </p>
  )
}
