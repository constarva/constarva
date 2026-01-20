'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, LogIn, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import { ScheduleCallModal } from './ScheduleCallModal'
import constarvaLogo from '@/assets/constarva-logo.png'

export function Hero() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for video
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const smoothVideoY = useSpring(videoY, { stiffness: 100, damping: 30 })
  const smoothVideoScale = useSpring(videoScale, { stiffness: 100, damping: 30 })

  // Content fade and move up on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const smoothContentOpacity = useSpring(contentOpacity, { stiffness: 100, damping: 30 })
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 })

  const navItems = [
    { label: t.navPortfolio, href: "#portfolio" },
    { label: t.navAbout, href: "#about" },
    { label: t.navServices, href: "#services" },
    { label: t.navContact, href: "#contact" }
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col overflow-hidden ${isRTL ? 'font-arabic' : ''}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Parallax Background Video */}
      <motion.div 
        style={{ y: smoothVideoY, scale: smoothVideoScale }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-50 py-4 sm:py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={constarvaLogo} 
                alt="Constarva Logo" 
                className="h-10 sm:h-12 w-auto"
              />
              <span className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                {language === 'ar' ? 'كونستارفا' : 'CONSTARVA'}
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'عربي' : 'EN'}</span>
              </motion.button>

              {/* Login Button */}
              <motion.button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white text-sm font-medium border border-white/20 hover:border-white/40 rounded-full transition-all"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.navLogin}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/90 backdrop-blur-lg mt-4"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-white/80 hover:text-white text-lg font-medium py-2"
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-white/80 hover:text-white text-lg font-medium py-2"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === 'en' ? 'عربي' : 'EN'}</span>
                </motion.button>
                <motion.button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 text-white/80 hover:text-white text-lg font-medium py-2 mt-2 px-4 border border-white/20 rounded-full"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <LogIn className="w-5 h-5" />
                  <span>{t.navLogin}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: smoothContentOpacity, y: smoothContentY }}
        className="flex-1 flex items-center justify-center relative z-10 px-4"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80 tracking-wider uppercase">
              {t.heroTag}
            </span>
            <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-6"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, '#portfolio')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t.heroCTA}
            </motion.a>
            <motion.button
              onClick={() => setScheduleModalOpen(true)}
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              {t.contactSchedule}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Schedule Call Modal */}
      <ScheduleCallModal 
        isOpen={scheduleModalOpen} 
        onClose={() => setScheduleModalOpen(false)} 
      />
    </section>
  )
}
