'use client'

import { useState } from 'react'
import { Mail, Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ScheduleCallModal } from './ScheduleCallModal'

export function Contact() {
  const { t, isRTL } = useLanguage()
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t.contactTag}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block mb-2">{t.contactTitle}</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact Options */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Option */}
            <a 
              href="mailto:info@constarva.com"
              className="group relative bg-background/80 backdrop-blur-md clean-border rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden"
            >
              {/* Subtle video background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://videos.pexels.com/video-files/4145253/4145253-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
              </div>

              <div className={`relative z-10 flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 bg-accent-emerald/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-accent-emerald" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="text-2xl font-bold text-foreground">{t.contactEmail}</h3>
                  <p className="text-muted-foreground">{t.contactEmailLabel}</p>
                </div>
              </div>
              
              <div className={`relative z-10 flex items-center gap-2 text-accent-emerald font-semibold group-hover:gap-4 transition-all ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span>info@constarva.com</span>
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </a>

            {/* Schedule Option */}
            <button 
              onClick={() => setScheduleModalOpen(true)}
              className="group relative bg-background/80 backdrop-blur-md clean-border rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden text-left w-full"
            >
              {/* Subtle video background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://videos.pexels.com/video-files/6804112/6804112-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
              </div>

              <div className={`relative z-10 flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-accent-blue" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="text-2xl font-bold text-foreground">{t.contactSchedule}</h3>
                  <p className="text-muted-foreground">30 min consultation</p>
                </div>
              </div>
              
              <div className={`relative z-10 flex items-center gap-2 text-accent-blue font-semibold group-hover:gap-4 transition-all ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span>{isRTL ? 'احجز موعداً' : 'Book a time'}</span>
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background/80 backdrop-blur-md clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-blue rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2">{t.contactProjectDiscussion}</h4>
              <p className="text-muted-foreground text-sm">
                {t.contactProjectDesc}
              </p>
            </div>
            
            <div className="bg-background/80 backdrop-blur-md clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-emerald rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2">{t.contactCustomStrategy}</h4>
              <p className="text-muted-foreground text-sm">
                {t.contactStrategyDesc}
              </p>
            </div>
            
            <div className="bg-background/80 backdrop-blur-md clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-purple rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2">{t.contactNextSteps}</h4>
              <p className="text-muted-foreground text-sm">
                {t.contactNextStepsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Call Modal */}
      <ScheduleCallModal 
        isOpen={scheduleModalOpen} 
        onClose={() => setScheduleModalOpen(false)} 
      />
    </section>
  )
}
