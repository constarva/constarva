'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import constarvaLogo from '@/assets/constarva-logo.png'

export default function Login() {
  const navigate = useNavigate()
  const { language, isRTL } = useLanguage()
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const result = login(email, password)
    
    if (result.success) {
      toast({
        title: language === 'ar' ? 'تم تسجيل الدخول' : 'Welcome back!',
        description: language === 'ar' ? 'جاري التحويل...' : 'Redirecting to dashboard...',
      })
      navigate('/dashboard')
    } else {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: result.error || 'Invalid credentials',
        variant: 'destructive',
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div 
      className={`min-h-screen relative overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Full Screen Video Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/5377684/5377684-uhd_2732_1440_25fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent-blue/30 rounded-full blur-[150px]"
          animate={{
            x: [-200, 100, -200],
            y: [-100, 200, -100],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-emerald/30 rounded-full blur-[150px]"
          animate={{
            x: [100, -150, 100],
            y: [100, -100, 100],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            x: [-250, -100, -250],
            y: [-250, -150, -250],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side - Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`flex-1 text-center hidden lg:block ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
          >
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
            >
              <motion.img 
                src={constarvaLogo} 
                alt="Constarva" 
                className={`h-16 w-auto ${isRTL ? 'order-1' : 'order-1'}`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className={`text-4xl font-black text-white tracking-wider ${isRTL ? 'order-2' : 'order-2'}`}>
                {language === 'ar' ? 'كونستارفا' : 'CONSTARVA'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            >
              {language === 'ar' ? (
                <>
                  حيث <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-emerald">الإبداع</span>
                  <br />يلتقي بالابتكار
                </>
              ) : (
                <>
                  Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-emerald">Creativity</span>
                  <br />Meets Innovation
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className={`text-xl text-white/70 mb-10 max-w-lg ${isRTL ? 'lg:ml-auto' : ''}`}
            >
              {language === 'ar'
                ? 'انضم إلينا لإنشاء تجارب بصرية استثنائية تترك انطباعًا دائمًا.'
                : 'Join us in creating exceptional visual experiences that leave a lasting impression.'}
            </motion.p>

            {/* Animated Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex gap-8 justify-center lg:justify-start"
            >
              {[
                { value: '500+', label: language === 'ar' ? 'مشروع' : 'Projects' },
                { value: '50+', label: language === 'ar' ? 'جائزة' : 'Awards' },
                { value: '100%', label: language === 'ar' ? 'رضا' : 'Satisfaction' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.15, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <motion.div 
                    className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-emerald"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="w-full max-w-md"
          >
            {/* Glassmorphic Card */}
            <div className="relative">
              {/* Glow Effect Behind Card */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-purple-500 to-accent-emerald rounded-3xl blur-xl opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-blue via-purple-500 to-accent-emerald opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ 
                      background: 'conic-gradient(from 0deg, transparent, rgba(14, 165, 233, 0.3), transparent, rgba(16, 185, 129, 0.3), transparent)',
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Back Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm">{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
                  </motion.button>

                  {/* Mobile Logo */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden flex items-center gap-3 mb-6"
                  >
                    <img src={constarvaLogo} alt="Constarva" className="h-10 w-auto" />
                    <span className="text-xl font-bold text-white tracking-wider">
                      {language === 'ar' ? 'كونستارفا' : 'CONSTARVA'}
                    </span>
                  </motion.div>

                  {/* Header with Animation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-accent-emerald" />
                      </motion.div>
                      <h1 className="text-3xl font-black text-white">
                        {isLogin 
                          ? (language === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back')
                          : (language === 'ar' ? 'انضم إلينا' : 'Join Us')
                        }
                      </h1>
                    </div>
                    <p className="text-white/60">
                      {isLogin 
                        ? (language === 'ar' ? 'سجل دخولك للوصول إلى لوحة التحكم' : 'Sign in to access your creative dashboard')
                        : (language === 'ar' ? 'ابدأ رحلتك الإبداعية معنا' : 'Start your creative journey today')
                      }
                    </p>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <motion.div
                          key="name"
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          </label>
                          <div className={`relative group ${focusedField === 'name' ? 'z-10' : ''}`}>
                            <motion.div
                              className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity"
                              animate={focusedField === 'name' ? { opacity: 0.7 } : {}}
                            />
                            <div className="relative flex items-center">
                              <User className="absolute left-4 w-5 h-5 text-white/40" />
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <div className={`relative group ${focusedField === 'email' ? 'z-10' : ''}`}>
                        <motion.div
                          className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity"
                          animate={focusedField === 'email' ? { opacity: 0.7 } : {}}
                        />
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {language === 'ar' ? 'كلمة المرور' : 'Password'}
                      </label>
                      <div className={`relative group ${focusedField === 'password' ? 'z-10' : ''}`}>
                        <motion.div
                          className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity"
                          animate={focusedField === 'password' ? { opacity: 0.7 } : {}}
                        />
                        <div className="relative flex items-center">
                          <Lock className="absolute left-4 w-5 h-5 text-white/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                            className="w-full px-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-white/40 hover:text-white/70 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {isLogin && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                      >
                        <button type="button" className="text-sm text-accent-blue hover:text-accent-emerald transition-colors">
                          {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                        </button>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative group overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button Glow */}
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-purple-500 to-accent-emerald rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <div className="relative px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-xl">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-accent-emerald to-accent-blue rounded-xl"
                          initial={{ x: '100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-lg">
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            />
                          ) : (
                            isLogin 
                              ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                              : (language === 'ar' ? 'إنشاء حساب' : 'Create Account')
                          )}
                        </span>
                      </div>
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="text-sm text-white/40">{language === 'ar' ? 'أو' : 'or continue with'}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Google', icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      )},
                      { name: 'GitHub', icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                      )}
                    ].map((provider, i) => (
                      <motion.button
                        key={provider.name}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="relative group flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:border-white/30 transition-all overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="relative z-10">{provider.icon}</span>
                        <span className="relative z-10 text-sm font-medium">{provider.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Toggle */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-8 text-white/50"
                  >
                    {isLogin 
                      ? (language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?")
                      : (language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?')
                    }
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-emerald hover:from-accent-emerald hover:to-accent-blue font-semibold transition-all"
                    >
                      {isLogin 
                        ? (language === 'ar' ? 'إنشاء حساب' : 'Sign up')
                        : (language === 'ar' ? 'تسجيل الدخول' : 'Sign in')
                      }
                    </button>
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
