'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Mail, Phone, MapPin, Award, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

export function Profile() {
  const { t, isRTL, language } = useLanguage()
  const pdfUrl = language === 'ar' 
    ? (import.meta.env.VITE_PDF_URL_AR || 'https://nvytmsbmaxykdyahsrid.supabase.co/storage/v1/object/public/def_public/MedSafe_Core_Engine_AR.pdf')
    : (import.meta.env.VITE_PDF_URL || 'https://nvytmsbmaxykdyahsrid.supabase.co/storage/v1/object/public/def_public/MedSafe_Core_Engine.pdf')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const stats = [
    { icon: Award, label: language === 'ar' ? 'الشهادات' : 'Certifications', value: '12+' },
    { icon: Users, label: language === 'ar' ? 'أعضاء الفريق' : 'Team Members', value: '50+' },
    { icon: Zap, label: language === 'ar' ? 'المشاريع' : 'Projects', value: '100+' }
  ]

  const expertise = language === 'ar' ? [
    'الذكاء الاصطناعي والتعلم الآلي',
    'علم البيانات',
    'تكنولوجيا طبية',
    'حلول سحابية',
    'Python و TensorFlow',
    'هندسة الأنظمة'
  ] : [
    'AI & Machine Learning',
    'Data Science',
    'Medical Technology',
    'Cloud Solutions',
    'Python & TensorFlow',
    'System Architecture'
  ]

  return (
    <section 
      className={`relative min-h-screen py-20 px-4 ${isRTL ? 'text-right' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-background to-accent-purple/10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {language === 'ar' ? 'الملف الشخصي الاحترافي' : 'Professional Profile'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'التميز في الذكاء الاصطناعي وعلوم البيانات والابتكار في تكنولوجيا الطب'
                : 'Excellence in AI, Data Science, and Medical Technology Innovation'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${isRTL ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Left: Profile Info / Right for RTL */}
          <div className={`md:col-span-2 ${isRTL ? 'md:order-first' : ''}`}>
            <div className="glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors duration-300">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'ar' ? 'عن المؤسسة' : 'About Us'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'ar'
                      ? 'نحن فريق متقدم متخصص في حلول الذكاء الاصطناعي والتعلم الآلي وعلوم البيانات. مهمتنا هي تحويل التحديات الطبية والتكنولوجية المعقدة إلى حلول أنيقة وقابلة للتوسع تؤثر على الحياة عالميًا.'
                      : 'We are a cutting-edge team specializing in artificial intelligence, machine learning, and data science solutions. Our mission is to transform complex medical and technological challenges into elegant, scalable solutions that impact lives globally.'
                    }
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'ar' ? 'الكفاءات الأساسية' : 'Core Expertise'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {expertise.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className={`flex items-center gap-2 p-3 rounded-lg bg-accent-blue/5 hover:bg-accent-blue/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-accent-blue" />
                        <span className="text-sm font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                  </h3>
                  <div className="space-y-3">
                    <motion.div variants={itemVariants} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Mail className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      <span className="text-muted-foreground">contact@constarva.com</span>
                    </motion.div>
                    <motion.div variants={itemVariants} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      <span className="text-muted-foreground">+1 (555) 123-4567</span>
                    </motion.div>
                    <motion.div variants={itemVariants} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      <span className="text-muted-foreground">{language === 'ar' ? 'العمليات العالمية' : 'Global Operations'}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: PDF Viewer / Left for RTL */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`md:col-span-1 ${isRTL ? 'md:order-last' : ''}`}
          >
            <div className="glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 h-full overflow-hidden flex flex-col">
              <h3 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'محرك MedSafe الأساسي' : 'MedSafe Core Engine'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'ar'
                  ? 'عرض وثائقنا الفنية الشاملة:'
                  : 'View our comprehensive technical documentation:'
                }
              </p>
              
              {/* PDF Viewer */}
              <div className="flex-1 rounded-lg overflow-hidden bg-black/20 mb-4 border border-white/10 min-h-96 md:min-h-full">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
                  className="w-full h-full"
                  title={language === 'ar' ? 'وثائق محرك MedSafe الأساسي' : 'MedSafe Core Engine Documentation'}
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <motion.a
                  href={pdfUrl}
                  download={language === 'ar' ? 'محرك_MedSafe_الأساسي.pdf' : 'MedSafe_Core_Engine.pdf'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    className={`w-full glass-effect bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue border border-accent-blue/50 gap-2 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Download className="w-4 h-4" />
                    {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                  </Button>
                </motion.a>
                <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-center'}`}>
                  ✓ {language === 'ar' ? 'وثيقة عامة • آمنة 100٪' : 'Public Document • 100% Secure'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
              >
                <Card className="glass-effect rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20">
                  <motion.div
                    className="flex flex-col items-center text-center space-y-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-3 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                      <Icon className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent-blue">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className={`glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}
          >
            <h3 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'إحداث ثورة في تقاطع الرعاية الصحية والتكنولوجيا من خلال تقديم حلول مبتكرة قائمة على الذكاء الاصطناعي تحسن النتائج الطبية وتمكن المؤسسات من اتخاذ قرارات تعتمد على البيانات.'
                : 'To revolutionize the intersection of healthcare and technology by delivering innovative AI-driven solutions that enhance medical outcomes and empower organizations to make data-driven decisions.'
              }
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}
          >
            <h3 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'عالم تندمج فيه التكنولوجيا المتقدمة بسلاسة مع تقديم الرعاية الصحية، وتخلق جسراً بين الابتكار والرعاية الإنسانية التي تكون في متناول الجميع وقابلة للتوسع ومتحولة للجميع.'
                : 'A world where advanced technology seamlessly integrates with healthcare delivery, creating a bridge between innovation and human care that is accessible, scalable, and transformative for all.'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`glass-effect rounded-2xl p-12 backdrop-blur-xl border border-white/10 ${isRTL ? 'text-right' : 'text-center'}`}
        >
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل أنت مستعد للتواصل؟' : 'Ready to Connect?'}
          </h2>
          <p className={`text-muted-foreground mb-8 max-w-2xl ${isRTL ? 'mr-auto' : 'mx-auto'}`}>
            {language === 'ar'
              ? 'سواء كنت تبحث عن الشراكة معنا أو تريد معرفة المزيد عن خدماتنا، فنحن نود سماع منك.'
              : 'Whether you\'re looking to partner with us or learn more about our services, we\'d love to hear from you.'
            }
          </p>
          <motion.div
            className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-center'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="#contact"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-accent-blue hover:bg-accent-blue/90 px-8 py-3">
                {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
              </Button>
            </motion.a>
            <motion.a
              href={pdfUrl}
              download={language === 'ar' ? 'محرك_MedSafe_الأساسي.pdf' : 'MedSafe_Core_Engine.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className={`glass-effect px-8 py-3 gap-2 border-white/20 hover:border-white/40 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Download className="w-4 h-4" />
                {language === 'ar' ? 'تحميل الوثائق' : 'Download Documentation'}
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
