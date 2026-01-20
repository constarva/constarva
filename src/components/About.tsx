'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ParallaxVideo } from './ParallaxVideo'
import { AnimatedSection, StaggerContainer, staggerItemVariants } from './AnimatedSection'

export function About() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const processSteps = [
    {
      number: "01",
      title: t.step1Title,
      description: t.step1Desc,
      color: "accent-blue",
      video: "https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4"
    },
    {
      number: "02", 
      title: t.step2Title,
      description: t.step2Desc,
      color: "accent-emerald",
      video: "https://videos.pexels.com/video-files/6963744/6963744-uhd_2560_1440_25fps.mp4"
    },
    {
      number: "03",
      title: t.step3Title,
      description: t.step3Desc,
      color: "accent-purple",
      video: "https://videos.pexels.com/video-files/5496015/5496015-uhd_2560_1440_25fps.mp4"
    },
    {
      number: "04",
      title: t.step4Title,
      description: t.step4Desc,
      color: "accent-blue",
      video: "https://videos.pexels.com/video-files/7988746/7988746-uhd_2560_1440_30fps.mp4"
    },
    {
      number: "05",
      title: t.step5Title,
      description: t.step5Desc,
      color: "accent-purple",
      video: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4"
    }
  ]

  const stats = [
    { number: '50+', label: t.stat1 },
    { number: '5+', label: t.stat2 },
    { number: '10+', label: t.stat3 },
    { number: '24/7', label: t.stat4 }
  ]

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className={`relative py-20 bg-background overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Parallax Background Video */}
      <ParallaxVideo 
        src="https://videos.pexels.com/video-files/852164/852164-hd_1920_1080_25fps.mp4"
        parallaxStrength={80}
        opacity={0.15}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-[1]" />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
          backgroundSize: '3px 3px'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t.aboutTag}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            {t.aboutTitle}
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t.aboutSubtitle}
          </p>
        </AnimatedSection>

        {/* Process Cards with Video Backgrounds */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
          staggerDelay={0.15}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={staggerItemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative bg-card clean-border rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Video Background */}
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={step.video} type="video/mp4" />
                </video>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6">
                <motion.div 
                  className={`text-5xl font-black text-${step.color} mb-4 opacity-80`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-emerald transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-t from-${step.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Stats Section */}
        <StaggerContainer 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20"
          staggerDelay={0.1}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItemVariants}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <motion.div 
                className="text-4xl sm:text-5xl font-black text-accent-emerald mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
