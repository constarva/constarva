import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Paperclip, MessageSquare, ArrowLeft } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoMessages, demoProjects } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

export function Messages() {
  const { t, isRTL } = useLanguage();
  const [selectedMessage, setSelectedMessage] = useState(demoMessages[0]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDetail, setShowDetail] = useState(false);

  const filteredMessages = filter === 'all' 
    ? demoMessages 
    : filter === 'unread'
    ? demoMessages.filter(m => !m.read)
    : demoMessages.filter(m => m.projectId === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleSelectMessage = (message: typeof demoMessages[0]) => {
    setSelectedMessage(message);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title={t.messagesTitle} 
        subtitle={t.messagesSubtitle}
      />

      <div className="p-4 md:p-6">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-[calc(100vh-200px)] md:h-[calc(100vh-220px)]`}>
          {/* Message List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`lg:col-span-1 rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col ${
              showDetail ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Filters */}
            <div className="p-3 md:p-4 border-b border-white/10 bg-gradient-to-r from-accent-blue/5 to-transparent">
              <div className="relative mb-3 md:mb-4">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-white/40`} />
                <input
                  type="text"
                  placeholder={t.searchMessages}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 md:py-2.5 bg-slate-700/90 border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-slate-600/90 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                />
              </div>
              <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 md:px-3 py-1 md:py-1.5 text-xs rounded-full font-medium transition-all ${
                    filter === 'all' 
                      ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/20' 
                      : 'bg-slate-700/90 text-white/80 hover:text-white hover:bg-slate-600/90'
                  }`}
                >
                  {t.all}
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-2.5 md:px-3 py-1 md:py-1.5 text-xs rounded-full font-medium transition-all ${
                    filter === 'unread' 
                      ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/20' 
                      : 'bg-slate-700/90 text-white/80 hover:text-white hover:bg-slate-600/90'
                  }`}
                >
                  {t.unread}
                </button>
                {demoProjects.slice(0, 2).map(project => (
                  <button
                    key={project.id}
                    onClick={() => setFilter(project.id)}
                    className={`px-2.5 md:px-3 py-1 md:py-1.5 text-xs rounded-full font-medium transition-all truncate max-w-[100px] md:max-w-[120px] ${
                      filter === project.id 
                        ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/20' 
                        : 'bg-slate-700/90 text-white/80 hover:text-white hover:bg-slate-600/90'
                    }`}
                  >
                    {project.name.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={itemVariants}
                  onClick={() => handleSelectMessage(message)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className={`p-3 md:p-4 border-b border-white/5 cursor-pointer transition-all ${
                    selectedMessage?.id === message.id 
                      ? `bg-accent-blue/10 ${isRTL ? 'border-r-2 border-r-accent-blue' : 'border-l-2 border-l-accent-blue'}` 
                      : ''
                  } ${!message.read ? 'bg-accent-blue/5' : ''}`}
                >
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="relative">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0 shadow-lg shadow-accent-blue/20">
                        {message.sender.charAt(0)}
                      </div>
                      {!message.read && (
                        <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-2.5 h-2.5 md:w-3 md:h-3 bg-accent-blue rounded-full border-2 border-black animate-pulse`} />
                      )}
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <p className="font-medium text-white text-sm truncate">{message.sender}</p>
                      </div>
                      <p className="text-xs text-white/60 truncate mt-1">{message.content}</p>
                      <p className="text-xs text-accent-blue mt-1.5 md:mt-2 truncate">{message.projectName}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col ${
              showDetail ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {selectedMessage ? (
              <>
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-accent-purple/5 to-transparent">
                  <div className={`flex items-center gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Back button - mobile only */}
                    <button 
                      onClick={() => setShowDetail(false)}
                      className="lg:hidden p-2 rounded-lg bg-slate-700/90 text-white/60 hover:text-white"
                    >
                      <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="relative">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg shadow-accent-blue/25">
                        {selectedMessage.sender.charAt(0)}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-full blur opacity-30" />
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <p className="font-semibold text-white text-sm md:text-base">{selectedMessage.sender}</p>
                      <p className="text-xs md:text-sm text-white/60">{selectedMessage.senderRole}</p>
                    </div>
                    <div className={`${isRTL ? 'text-left' : 'text-right'} hidden sm:block`}>
                      <p className="text-xs md:text-sm text-accent-blue">{selectedMessage.projectName}</p>
                      <p className="text-xs text-white/40">
                        {new Date(selectedMessage.timestamp).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                  <div className="max-w-3xl">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-slate-700/50 border border-white/10 rounded-xl md:rounded-2xl ${isRTL ? 'rounded-tr-none' : 'rounded-tl-none'} p-3 md:p-4 shadow-lg`}
                    >
                      <p className={`text-white/90 leading-relaxed text-sm md:text-base ${isRTL ? 'text-right' : ''}`}>{selectedMessage.content}</p>
                    </motion.div>
                    <p className={`text-xs text-white/40 mt-2 sm:hidden ${isRTL ? 'text-right' : ''}`}>{new Date(selectedMessage.timestamp).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}</p>
                  </div>
                </div>

                {/* Reply */}
                <div className="p-3 md:p-4 border-t border-white/10 bg-white/[0.02]">
                  <div className={`flex items-end gap-2 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t.typeYourReply}
                        rows={2}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 bg-slate-700/90 border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-slate-600/90 resize-none transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 md:p-3 rounded-lg md:rounded-xl bg-slate-700/90 text-white/60 hover:text-white hover:bg-slate-600/90 transition-all"
                      >
                        <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25"
                      >
                        <Send className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                <MessageSquare className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-20" />
                <p className="text-sm md:text-base">{t.selectMessageToView}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}