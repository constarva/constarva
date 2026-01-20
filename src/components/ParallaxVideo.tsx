'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxVideoProps {
  src: string
  className?: string
  parallaxStrength?: number
  opacity?: number
  scale?: boolean
}

export function ParallaxVideo({ 
  src, 
  className = '', 
  parallaxStrength = 100,
  opacity = 0.2,
  scale = true
}: ParallaxVideoProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxStrength, parallaxStrength])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const smoothScale = useSpring(scaleValue, { stiffness: 100, damping: 30 })
  
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [opacity * 0.5, opacity, opacity, opacity * 0.5])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div 
        style={{ 
          y: smoothY, 
          scale: scale ? smoothScale : 1
        }}
        className="absolute inset-0 -top-24 -bottom-24"
      >
        <motion.video
          style={{ opacity: opacityValue }}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
        </motion.video>
      </motion.div>
    </div>
  )
}

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  parallaxStrength?: number
}

export function ParallaxContainer({ 
  children, 
  className = '',
  parallaxStrength = 50
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxStrength, parallaxStrength])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div 
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
