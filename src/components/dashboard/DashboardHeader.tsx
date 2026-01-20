import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, Search, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { demoMessages } from '@/data/demoData';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unreadNotifications = demoMessages.filter(m => !m.read);

  return (
    <header className="sticky top-0 z-40">
      {/* Glassmorphic header */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border-b border-white/10" />
      
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

      <div className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 md:px-6 py-4 gap-3 sm:gap-6 md:gap-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        {/* Left - Title */}
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.dashboardLabel}</span>
            <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl md:text-2xl lg:text-3xl font-bold text-white truncate ${isRTL ? 'text-right' : ''}`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-sm text-white/60 mt-1 ${isRTL ? 'text-right' : ''}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Right - Actions */}
        <div className={`flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-end ${isRTL ? 'flex-row-reverse sm:justify-start' : ''}`}>
          {/* Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative overflow-hidden"
              >
                <input
                  type="text"
                  placeholder={`${t.search}...`}
                  className={`w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                  autoFocus
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            {showSearch ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Search className="w-4 h-4 md:w-5 md:h-5" />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              {unreadNotifications.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-accent-blue to-accent-emerald text-white text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-accent-blue/30`}
                >
                  {unreadNotifications.length}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-72 md:w-80 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden`}
                >
                  <div className="p-4 border-b border-white/10 bg-gradient-to-r from-accent-blue/10 to-accent-emerald/10">
                    <h3 className={`text-sm font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Bell className="w-4 h-4 text-accent-blue" />
                      {t.notifications}
                    </h3>
                  </div>
                  <div className="max-h-64 md:max-h-80 overflow-y-auto">
                    {unreadNotifications.length > 0 ? (
                      unreadNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${isRTL ? 'text-right' : ''}`}
                        >
                          <p className="text-sm text-white font-medium">{notification.sender}</p>
                          <p className="text-xs text-white/60 mt-1 line-clamp-2">{notification.content}</p>
                          <p className="text-xs text-accent-blue mt-2">{notification.projectName}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-white/40">
                        {t.noNotifications}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar - Hidden on small mobile */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative hidden sm:block"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-blue/25">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {/* Gradient ring */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-full opacity-50 blur-sm -z-10" />
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            title={t.logout}
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}