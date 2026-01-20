'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ScheduleCallModal({ isOpen, onClose }: ScheduleCallModalProps) {
  const { t, isRTL } = useLanguage()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const availableDates = [
    { day: 'Mon', date: '15', month: 'Jan' },
    { day: 'Tue', date: '16', month: 'Jan' },
    { day: 'Wed', date: '17', month: 'Jan' },
    { day: 'Thu', date: '18', month: 'Jan' },
    { day: 'Fri', date: '19', month: 'Jan' },
  ]

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setStep(1)
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ name: '', email: '', phone: '', message: '' })
      onClose()
    }, 2500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canProceedToStep2 = selectedDate && selectedTime
  const canSubmit = formData.name && formData.email

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container - for centering */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 pointer-events-auto"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-emerald/5 pointer-events-none" />
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white/70" />
            </motion.button>

            {/* Content */}
            <div className="relative p-6 sm:p-8 overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[85vh]">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 rounded-full mb-4"
                >
                  <Calendar className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm font-medium text-accent-blue">{t.scheduleModalTag}</span>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {t.scheduleModalTitle}
                </h2>
                <p className="text-muted-foreground">
                  {t.scheduleModalSubtitle}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step >= s 
                          ? 'bg-accent-blue text-white' 
                          : 'bg-white/10 text-white/50'
                      }`}
                      animate={{ scale: step === s ? 1.1 : 1 }}
                    >
                      {isSubmitted && s === 2 ? <CheckCircle className="w-4 h-4" /> : s}
                    </motion.div>
                    {s < 2 && (
                      <div className={`w-16 h-0.5 ${step > 1 ? 'bg-accent-blue' : 'bg-white/10'}`} />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-accent-emerald" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{t.scheduleSuccess}</h3>
                    <p className="text-muted-foreground">{t.scheduleSuccessDesc}</p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Date Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                        <Calendar className="w-4 h-4 text-accent-blue" />
                        {t.scheduleSelectDate}
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {availableDates.map((date) => (
                          <motion.button
                            key={date.date}
                            onClick={() => setSelectedDate(date.date)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              selectedDate === date.date
                                ? 'bg-accent-blue text-white'
                                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-xs opacity-70">{date.day}</div>
                            <div className="text-lg font-bold">{date.date}</div>
                            <div className="text-xs opacity-70">{date.month}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                        <Clock className="w-4 h-4 text-accent-emerald" />
                        {t.scheduleSelectTime}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <motion.button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              selectedTime === time
                                ? 'bg-accent-emerald text-white'
                                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Next Button */}
                    <motion.button
                      onClick={() => canProceedToStep2 && setStep(2)}
                      disabled={!canProceedToStep2}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        canProceedToStep2
                          ? 'bg-accent-blue text-white hover:bg-accent-blue/90'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                      whileHover={canProceedToStep2 ? { scale: 1.02 } : {}}
                      whileTap={canProceedToStep2 ? { scale: 0.98 } : {}}
                    >
                      {t.scheduleContinue}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Selected Time Summary */}
                    <div className="flex items-center justify-between p-4 bg-accent-blue/10 rounded-xl mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent-blue" />
                        <span className="text-foreground font-medium">Jan {selectedDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-accent-emerald" />
                        <span className="text-foreground font-medium">{selectedTime}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-accent-blue text-sm hover:underline"
                      >
                        {t.scheduleChange}
                      </button>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <User className="w-4 h-4 text-accent-blue" />
                          {t.scheduleName}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                          placeholder={t.scheduleNamePlaceholder}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Mail className="w-4 h-4 text-accent-emerald" />
                          {t.scheduleEmail}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-white/30 focus:outline-none focus:border-accent-emerald transition-colors"
                          placeholder={t.scheduleEmailPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Phone className="w-4 h-4 text-accent-blue" />
                        {t.schedulePhone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                        placeholder={t.schedulePhonePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <MessageSquare className="w-4 h-4 text-accent-emerald" />
                        {t.scheduleMessage}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-white/30 focus:outline-none focus:border-accent-emerald transition-colors resize-none"
                        placeholder={t.scheduleMessagePlaceholder}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        canSubmit
                          ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white hover:opacity-90'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                      whileHover={canSubmit ? { scale: 1.02 } : {}}
                      whileTap={canSubmit ? { scale: 0.98 } : {}}
                    >
                      <Calendar className="w-4 h-4" />
                      {t.scheduleConfirm}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}