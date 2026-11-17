import React from 'react'
import { motion, MotionProps } from 'framer-motion'

interface FadeInProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
  as = 'div',
  ...props
}) => {
  // Use motion.create for dynamic element tag
  const MotionComponent = React.useMemo(() => {
    return (motion as any).create ? (motion as any).create(as) : (motion as any)[as] || motion.div
  }, [as])

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
