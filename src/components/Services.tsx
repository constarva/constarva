'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Brain, Cpu, Code, Zap, Rocket, MessageSquare } from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItemVariants } from './AnimatedSection'

export function Services() {
  const { t, isRTL } = useLanguage()
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 })

  const services = [
    {
      id: 'ai',
      title: t.service1Title,
      description: t.service1Desc,
      icon: Brain,
      color: 'accent-emerald',
      video: 'https://videos.pexels.com/video-files/8348986/8348986-uhd_2560_1440_25fps.mp4'
    },
    {
      id: 'iot',
      title: t.service2Title,
      description: t.service2Desc,
      icon: Cpu,
      color: 'accent-blue',
      video: 'https://videos.pexels.com/video-files/7988746/7988746-uhd_2560_1440_30fps.mp4'
    },
    {
      id: 'software',
      title: t.service3Title,
      description: t.service3Desc,
      icon: Code,
      color: 'accent-purple',
      video: 'https://videos.pexels.com/video-files/5496015/5496015-uhd_2560_1440_25fps.mp4'
    },
    {
      id: 'automation',
      title: t.service4Title,
      description: t.service4Desc,
      icon: Zap,
      color: 'accent-emerald',
      video: 'https://videos.pexels.com/video-files/6963744/6963744-uhd_2560_1440_25fps.mp4'
    },
    {
      id: 'ventures',
      title: t.service5Title,
      description: t.service5Desc,
      icon: Rocket,
      color: 'accent-blue',
      video: 'https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4'
    },
    {
      id: 'consulting',
      title: t.service6Title,
      description: t.service6Desc,
      icon: MessageSquare,
      color: 'accent-purple',
      video: 'https://videos.pexels.com/video-files/7989586/7989586-uhd_2560_1440_30fps.mp4'
    }
  ]

  const currentVideo = hoveredService 
    ? services.find(s => s.id === hoveredService)?.video 
    : 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4'

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className={`relative py-20 overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Parallax Background Video */}
      <motion.div 
        style={{ y: smoothBackgroundY }}
        className="absolute inset-0 -top-24 -bottom-24 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentVideo} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/90 via-card/80 to-card/90 z-[1]" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t.servicesTag}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            {t.servicesTitle}
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          staggerDelay={0.1}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isHovered = hoveredService === service.id

            return (
              <motion.div
                key={service.id}
                variants={staggerItemVariants}
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-card clean-border rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Card Video Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.video
                    animate={{ 
                      scale: isHovered ? 1.1 : 1,
                      opacity: isHovered ? 0.4 : 0.2
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={service.video} type="video/mp4" />
                  </motion.video>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/60 z-[1]" />
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-${service.color}/20 flex items-center justify-center mb-6`}
                    animate={{ 
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className={`w-8 h-8 text-${service.color}`} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-foreground mb-3"
                    animate={{ x: isHovered ? 5 : 0 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-t from-${service.color}/20 to-transparent z-[2] pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Hover Border */}
                <motion.div 
                  className={`absolute inset-0 border-2 border-${service.color}/0 rounded-2xl z-[3] pointer-events-none`}
                  animate={{ borderColor: isHovered ? `var(--${service.color})` : 'transparent' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </StaggerContainer>

      </div>
    </section>
  )
}
