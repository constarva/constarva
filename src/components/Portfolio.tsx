'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function Portfolio() {
  const { t, isRTL } = useLanguage()
  
  const projects = [
    {
      title: { en: 'AI-Powered Analytics Platform', ar: 'منصة تحليلات مدعومة بالذكاء الاصطناعي' },
      description: { 
        en: 'A comprehensive business intelligence platform leveraging machine learning for predictive analytics and automated insights generation.',
        ar: 'منصة ذكاء أعمال شاملة تستخدم التعلم الآلي للتحليلات التنبؤية وتوليد الرؤى الآلية.'
      },
      category: { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' },
      industry: { en: 'Enterprise Software', ar: 'برمجيات المؤسسات' },
      technology: { en: 'Machine Learning', ar: 'التعلم الآلي' },
      focus: { en: 'Data Analysis', ar: 'تحليل البيانات' },
      approach: { en: 'Full Development', ar: 'تطوير كامل' },
      video: 'https://videos.pexels.com/video-files/7710247/7710247-uhd_2560_1440_30fps.mp4'
    },
    {
      title: { en: 'Smart Factory IoT System', ar: 'نظام إنترنت الأشياء للمصنع الذكي' },
      description: { 
        en: 'End-to-end IoT solution connecting industrial equipment for real-time monitoring, predictive maintenance, and process optimization.',
        ar: 'حل إنترنت أشياء متكامل يربط المعدات الصناعية للمراقبة الفورية والصيانة التنبؤية وتحسين العمليات.'
      },
      category: { en: 'IoT & Automation', ar: 'إنترنت الأشياء والأتمتة' },
      industry: { en: 'Manufacturing', ar: 'التصنيع' },
      technology: { en: 'IoT Sensors', ar: 'حساسات إنترنت الأشياء' },
      focus: { en: 'Efficiency', ar: 'الكفاءة' },
      approach: { en: 'Build & Scale', ar: 'بناء وتوسيع' },
      video: 'https://videos.pexels.com/video-files/3141207/3141207-uhd_2560_1440_25fps.mp4'
    },
    {
      title: { en: 'Cloud Infrastructure Automation', ar: 'أتمتة البنية التحتية السحابية' },
      description: { 
        en: 'Automated cloud deployment and management system with infrastructure-as-code, reducing deployment time by 80% and operational costs.',
        ar: 'نظام نشر وإدارة سحابي آلي مع البنية التحتية كرمز، يقلل وقت النشر بنسبة 80% والتكاليف التشغيلية.'
      },
      category: { en: 'Cloud & DevOps', ar: 'السحابة والـ DevOps' },
      industry: { en: 'Technology', ar: 'التكنولوجيا' },
      technology: { en: 'Kubernetes', ar: 'كوبرنيتس' },
      focus: { en: 'Scalability', ar: 'قابلية التوسع' },
      approach: { en: 'Consulting', ar: 'استشارات' },
      video: 'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4'
    },
    {
      title: { en: 'Autonomous Vehicle Fleet Management', ar: 'إدارة أسطول المركبات المستقلة' },
      description: { 
        en: 'Real-time fleet tracking and optimization system for autonomous delivery vehicles using advanced AI routing algorithms.',
        ar: 'نظام تتبع وتحسين الأسطول في الوقت الحقيقي للمركبات التوصيل المستقلة باستخدام خوارزميات التوجيه الذكية المتقدمة.'
      },
      category: { en: 'Autonomous Systems', ar: 'الأنظمة المستقلة' },
      industry: { en: 'Logistics', ar: 'الخدمات اللوجستية' },
      technology: { en: 'Computer Vision', ar: 'رؤية الكمبيوتر' },
      focus: { en: 'Automation', ar: 'الأتمتة' },
      approach: { en: 'Venture Build', ar: 'بناء المشاريع' },
      video: 'https://videos.pexels.com/video-files/8348986/8348986-uhd_2560_1440_25fps.mp4'
    },
    {
      title: { en: 'Smart Energy Grid Optimization', ar: 'تحسين شبكة الطاقة الذكية' },
      description: { 
        en: 'AI-driven energy distribution system that optimizes power grid efficiency, reduces waste, and integrates renewable sources seamlessly.',
        ar: 'نظام توزيع طاقة مدعوم بالذكاء الاصطناعي يحسن كفاءة شبكة الطاقة ويقلل الهدر ويدمج المصادر المتجددة بسلاسة.'
      },
      category: { en: 'Green Tech', ar: 'التقنية الخضراء' },
      industry: { en: 'Energy', ar: 'الطاقة' },
      technology: { en: 'Smart Sensors', ar: 'المستشعرات الذكية' },
      focus: { en: 'Sustainability', ar: 'الاستدامة' },
      approach: { en: 'Full Development', ar: 'تطوير كامل' },
      video: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4'
    },
    {
      title: { en: 'Healthcare AI Diagnostics', ar: 'تشخيصات الذكاء الاصطناعي الصحية' },
      description: { 
        en: 'Medical imaging analysis platform using deep learning to assist radiologists in early disease detection with 99% accuracy.',
        ar: 'منصة تحليل التصوير الطبي باستخدام التعلم العميق لمساعدة أطباء الأشعة في الكشف المبكر عن الأمراض بدقة 99%.'
      },
      category: { en: 'HealthTech AI', ar: 'تقنية صحية بالذكاء الاصطناعي' },
      industry: { en: 'Healthcare', ar: 'الرعاية الصحية' },
      technology: { en: 'Deep Learning', ar: 'التعلم العميق' },
      focus: { en: 'Precision', ar: 'الدقة' },
      approach: { en: 'Research & Build', ar: 'بحث وبناء' },
      video: 'https://videos.pexels.com/video-files/7989586/7989586-uhd_2560_1440_30fps.mp4'
    }
  ]

  return (
    <section id="portfolio" className="relative py-32 bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/852164/852164-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t.portfolioTag}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block mb-2">{t.portfolioTitle}</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t.portfolioSubtitle}
          </p>
        </div>

        {/* Projects Grid - Alternating Layout */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="max-w-6xl mx-auto">
              <div className={`relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow group ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Video */}
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <video
                      className="w-full h-full object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                    {/* Video overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Badge */}
                  <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'}`}>
                    <span className="glass-effect rounded-xl px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                      {index === 0 ? t.portfolioLatest : isRTL ? 'مشروع مميز' : 'Featured'}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 lg:p-12">
                  <div className="flex-1">
                    <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <span className="bg-accent-emerald/10 text-accent-emerald px-3 py-1 rounded-full text-sm font-medium">
                        {isRTL ? project.category.ar : project.category.en}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {isRTL ? project.title.ar : project.title.en}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {isRTL ? project.description.ar : project.description.en}
                    </p>
                    
                    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm ${isRTL ? 'text-right' : ''}`}>
                      <div>
                        <span className="text-muted-foreground block">{t.portfolioIndustry}</span>
                        <span className="font-medium">{isRTL ? project.industry.ar : project.industry.en}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">{t.portfolioStyle}</span>
                        <span className="font-medium">{isRTL ? project.technology.ar : project.technology.en}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">{t.portfolioTone}</span>
                        <span className="font-medium">{isRTL ? project.focus.ar : project.focus.en}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">{t.portfolioFormat}</span>
                        <span className="font-medium">{isRTL ? project.approach.ar : project.approach.en}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
