import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Plus, 
  ChevronDown, 
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoTickets } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

const statusConfig = {
  'Open': { color: 'text-accent-blue', bg: 'bg-accent-blue/20', border: 'border-accent-blue/30' },
  'In Progress': { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
  'Resolved': { color: 'text-accent-emerald', bg: 'bg-accent-emerald/20', border: 'border-accent-emerald/30' },
  'Closed': { color: 'text-white/40', bg: 'bg-white/10', border: 'border-white/20' },
};

const priorityConfig = {
  'Low': 'text-white/60',
  'Medium': 'text-yellow-400',
  'High': 'text-red-400',
};

export function Support() {
  const { t, isRTL } = useLanguage();
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'Technical',
    priority: 'Medium',
    description: ''
  });

  const faqs = [
    { question: t.faq1Question, answer: t.faq1Answer },
    { question: t.faq2Question, answer: t.faq2Answer },
    { question: t.faq3Question, answer: t.faq3Answer },
    { question: t.faq4Question, answer: t.faq4Answer },
  ];

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'Open': t.open,
      'In Progress': t.inProgress,
      'Resolved': t.resolved,
      'Closed': t.closed,
    };
    return statusMap[status] || status;
  };

  const getPriorityLabel = (priority: string) => {
    const priorityMap: Record<string, string> = {
      'Low': t.low,
      'Medium': t.medium,
      'High': t.high,
    };
    return priorityMap[priority] || priority;
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
        title={t.supportTitle} 
        subtitle={t.supportSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6 space-y-4 md:space-y-6"
      >
        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-wrap gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewTicket(true)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25 relative overflow-hidden group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Plus className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
            <span className="relative z-10 text-sm md:text-base">{t.newSupportTicket}</span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 relative z-10" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Support Tickets */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-accent-blue/5 to-transparent">
              <h2 className={`text-base md:text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MessageSquare className="w-5 h-5 text-accent-blue" />
                {t.yourTickets}
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {demoTickets.map((ticket, index) => {
                const status = statusConfig[ticket.status];
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    className="p-3 md:p-4 cursor-pointer transition-colors"
                  >
                    <div className={`flex items-start justify-between gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className={`font-medium text-white text-sm md:text-base line-clamp-1 ${isRTL ? 'text-right' : ''}`}>{ticket.subject}</h3>
                      <span className={`text-xs px-2 py-0.5 md:py-1 rounded-full border flex-shrink-0 ${status.bg} ${status.color} ${status.border}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </div>
                    <div className={`flex items-center gap-3 md:gap-4 text-xs md:text-sm flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-white/60">{ticket.category}</span>
                      <span className={priorityConfig[ticket.priority]}>{getPriorityLabel(ticket.priority)} {t.priorityLabel}</span>
                      <span className={`text-white/40 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MessageSquare className="w-3 h-3" />
                        {ticket.messages}
                      </span>
                    </div>
                    <p className={`text-xs text-white/40 mt-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.lastUpdated}: {new Date(ticket.lastUpdate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-accent-emerald/5 to-transparent">
              <h2 className={`text-base md:text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <HelpCircle className="w-5 h-5 text-accent-emerald" />
                {t.frequentlyAskedQuestions}
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 md:p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} group`}
                  >
                    <span className="font-medium text-white text-sm md:text-base group-hover:text-accent-blue transition-colors pr-2">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white/40" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className={`text-xs md:text-sm text-white/60 mt-3 leading-relaxed bg-slate-700/50 p-3 rounded-lg border border-white/5 ${isRTL ? 'text-right' : ''}`}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* New Ticket Modal */}
        <AnimatePresence>
          {showNewTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowNewTicket(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden"
              >
                {/* Background accent */}
                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-accent-blue/20 to-accent-emerald/10 rounded-full blur-3xl -translate-y-1/2 ${isRTL ? '-translate-x-1/2' : 'translate-x-1/2'}`} />
                
                <h2 className={`text-lg md:text-xl font-semibold text-white mb-4 md:mb-6 relative z-10 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Plus className="w-5 h-5 text-accent-blue" />
                  {t.newSupportTicket}
                </h2>
                
                <div className="space-y-3 md:space-y-4 relative z-10">
                  <div>
                    <label className={`block text-sm font-medium text-white/80 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.subject}</label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder={isRTL ? 'وصف موجز لمشكلتك' : 'Brief description of your issue'}
                      className={`w-full px-4 py-2.5 md:py-3 bg-slate-800/90 border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-slate-700/90 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>

                  <div className={`grid grid-cols-2 gap-3 md:gap-4`}>
                    <div>
                      <label className={`block text-sm font-medium text-white/80 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.category}</label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className={`w-full px-4 py-2.5 md:py-3 bg-slate-800/90 border border-white/20 rounded-lg md:rounded-xl text-white focus:outline-none focus:border-accent-blue/50 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                      >
                        <option value="Technical">{t.technical}</option>
                        <option value="Billing">{t.billing}</option>
                        <option value="Account">{t.account}</option>
                        <option value="General">{t.general}</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-white/80 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.priority}</label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className={`w-full px-4 py-2.5 md:py-3 bg-slate-800/90 border border-white/20 rounded-lg md:rounded-xl text-white focus:outline-none focus:border-accent-blue/50 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                      >
                        <option value="Low">{t.low}</option>
                        <option value="Medium">{t.medium}</option>
                        <option value="High">{t.high}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-white/80 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.description}</label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      placeholder={isRTL ? 'قدم تفاصيل حول مشكلتك...' : 'Provide details about your issue...'}
                      rows={3}
                      className={`w-full px-4 py-2.5 md:py-3 bg-slate-800/90 border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-slate-700/90 resize-none transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>
                </div>

                <div className={`flex gap-3 md:gap-4 mt-4 md:mt-6 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNewTicket(false)}
                    className="flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-slate-700/50 text-white/60 hover:text-white hover:bg-slate-600/50 transition-all border border-white/10 text-sm"
                  >
                    {t.cancel}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNewTicket(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    {t.submitTicket}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}