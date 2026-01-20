import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Video,
  Lightbulb,
  Code,
  Sparkles
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { generateConsultationSlots } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

export function BookConsultation() {
  const { t, isRTL } = useLanguage();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const consultationTypes = [
    { 
      id: 'discovery', 
      name: t.discoveryCall, 
      description: t.discoveryCallDesc,
      icon: Lightbulb,
      duration: `30 ${t.minutes}`,
      color: 'from-accent-blue to-blue-600'
    },
    { 
      id: 'strategy', 
      name: t.strategySession, 
      description: t.strategySessionDesc,
      icon: Video,
      duration: `60 ${t.minutes}`,
      color: 'from-accent-purple to-purple-600'
    },
    { 
      id: 'technical', 
      name: t.technicalReview, 
      description: t.technicalReviewDesc,
      icon: Code,
      duration: `45 ${t.minutes}`,
      color: 'from-accent-emerald to-emerald-600'
    },
  ];

  const slots = generateConsultationSlots();

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString(isRTL ? 'ar-SA' : 'default', { month: 'long', year: 'numeric' });

  const dayLabels = isRTL 
    ? ['أ', 'إ', 'ث', 'أ', 'خ', 'ج', 'س']
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDateString = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const getAvailableTimesForDate = (dateStr: string) => {
    return slots.filter(slot => slot.date === dateStr && slot.available);
  };

  const handleBook = () => {
    setShowConfirmation(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title={t.bookConsultationTitle} 
        subtitle={t.bookConsultationSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6 max-w-4xl mx-auto"
      >
        {/* Step 1: Consultation Type */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <h2 className={`text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-emerald text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-lg shadow-accent-blue/25">1</span>
            {t.selectConsultationType}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {consultationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all relative overflow-hidden group bg-slate-800/90 backdrop-blur-xl ${
                    selectedType === type.id
                      ? 'border-accent-blue/50'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Selected glow */}
                  {selectedType === type.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-10`} />
                  )}
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg relative z-10 ${isRTL ? 'mr-0 ml-auto' : ''}`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-white text-sm md:text-base mb-1 relative z-10">{type.name}</h3>
                  <p className="text-xs md:text-sm text-white/60 mb-2 relative z-10">{type.description}</p>
                  <span className="text-xs text-accent-blue relative z-10 bg-accent-blue/10 px-2 py-1 rounded-full">{type.duration}</span>
                  
                  {/* Check mark */}
                  {selectedType === type.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-3 md:top-4 ${isRTL ? 'left-3 md:left-4' : 'right-3 md:right-4'} w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-accent-blue to-accent-emerald flex items-center justify-center shadow-lg`}
                    >
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Step 2: Date Selection */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <h2 className={`text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-emerald text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-lg shadow-accent-blue/25">2</span>
            {t.selectDateTime}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Calendar */}
            <div className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 p-4 md:p-6">
              <div className={`flex items-center justify-between mb-4 md:mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-lg bg-slate-700/90 text-white/60 hover:text-white hover:bg-slate-600/90 transition-all"
                >
                  <ChevronLeft className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                <span className="font-semibold text-white text-sm md:text-base">{monthName}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-lg bg-slate-700/90 text-white/60 hover:text-white hover:bg-slate-600/90 transition-all"
                >
                  <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>

              <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2">
                {dayLabels.map((day, i) => (
                  <span key={i} className="text-xs text-white/40 py-1 md:py-2 font-medium">{day}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {days.map((day, index) => {
                  if (!day) return <div key={index} />;
                  
                  const dateStr = getDateString(day);
                  const availableTimes = getAvailableTimesForDate(dateStr);
                  const hasSlots = availableTimes.length > 0;
                  const isSelected = selectedDate === dateStr;
                  const isPast = new Date(dateStr) < new Date(new Date().toDateString());

                  return (
                    <motion.button
                      key={index}
                      whileHover={hasSlots && !isPast ? { scale: 1.1 } : {}}
                      whileTap={hasSlots && !isPast ? { scale: 0.95 } : {}}
                      onClick={() => hasSlots && !isPast && setSelectedDate(dateStr)}
                      disabled={!hasSlots || isPast}
                      className={`py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/30'
                          : hasSlots && !isPast
                          ? 'bg-slate-700/50 text-white hover:bg-slate-600/50 border border-white/10 hover:border-white/20'
                          : 'text-white/20 cursor-not-allowed'
                      }`}
                    >
                      {day}
                      {hasSlots && !isPast && !isSelected && (
                        <span className="absolute bottom-0.5 md:bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-emerald rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 p-4 md:p-6">
              <h3 className={`font-semibold text-white text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent-blue" />
                {t.availableTimes}
              </h3>
              
              {selectedDate ? (
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {getAvailableTimesForDate(selectedDate).map((slot) => (
                    <motion.button
                      key={slot.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2.5 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/30'
                          : 'bg-slate-700/50 text-white hover:bg-slate-600/50 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {slot.time}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 md:py-8 text-white/40 bg-slate-700/30 rounded-xl border border-white/10">
                  <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">{t.selectDateToSeeTimes}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Step 3: Notes */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <h2 className={`text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-emerald text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-lg shadow-accent-blue/25">3</span>
            {t.additionalNotes}
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isRTL ? 'أي مواضيع محددة تريد مناقشتها...' : "Any specific topics you'd like to discuss..."}
            rows={3}
            className={`w-full px-4 py-3 bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 resize-none transition-all text-sm ${isRTL ? 'text-right' : ''}`}
          />
        </motion.div>

        {/* Book Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={selectedType && selectedDate && selectedTime ? { scale: 1.01 } : {}}
            whileTap={selectedType && selectedDate && selectedTime ? { scale: 0.99 } : {}}
            onClick={handleBook}
            disabled={!selectedType || !selectedDate || !selectedTime}
            className={`w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25 relative overflow-hidden group text-sm md:text-base`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className={`relative z-10 flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              {t.bookButton}
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            </span>
          </motion.button>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowConfirmation(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 text-center relative overflow-hidden"
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/20 via-transparent to-accent-blue/20" />
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent-emerald to-emerald-600 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-accent-emerald/30 relative z-10"
                >
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 relative z-10">{t.consultationBooked}</h2>
                <p className="text-sm md:text-base text-white/60 mb-4 md:mb-6 relative z-10">
                  {consultationTypes.find(type => type.id === selectedType)?.name} - {selectedDate} {isRTL ? 'في' : 'at'} {selectedTime}
                </p>
                <p className="text-xs md:text-sm text-white/40 mb-4 md:mb-6 relative z-10 bg-slate-800/50 p-3 rounded-lg">
                  {t.confirmationEmailSent}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmation(false)}
                  className="w-full py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25 relative z-10 text-sm md:text-base"
                >
                  {t.done}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}