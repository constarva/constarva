import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Calendar, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import constarvaLogo from '@/assets/constarva-logo.png';
import { demoStats } from '@/data/demoData';

interface DashboardSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({ onClose, isMobile }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();

  const navItems = [
    { id: 'overview', label: t.overview, icon: LayoutDashboard, path: '/dashboard' },
    { id: 'projects', label: t.myProjects, icon: FolderKanban, path: '/dashboard/projects' },
    { id: 'messages', label: t.messages, icon: MessageSquare, path: '/dashboard/messages', badge: demoStats.unreadMessages },
    { id: 'documents', label: t.documents, icon: FileText, path: '/dashboard/documents' },
    { id: 'billing', label: t.billing, icon: CreditCard, path: '/dashboard/billing' },
    { id: 'support', label: t.support, icon: HelpCircle, path: '/dashboard/support' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const sidebarWidth = isMobile ? 'w-72' : collapsed ? 'w-20' : 'w-64';

  return (
    <motion.aside
      initial={isMobile ? { x: 0 } : { x: isRTL ? 100 : -100, opacity: 0 }}
      animate={isMobile ? { x: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? '' : `fixed ${isRTL ? 'right-0' : 'left-0'} top-0`} h-screen z-50 flex flex-col transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Glassmorphic background */}
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-2xl ${isRTL ? 'border-l' : 'border-r'} border-white/10`}>
        {/* Subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-accent-emerald/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <img src={constarvaLogo} alt="Constarva" className="h-8 md:h-10 w-auto" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-accent-emerald rounded-full blur-lg opacity-30" />
            </motion.div>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg md:text-xl font-bold text-white tracking-wide"
              >
                CONSTARVA
              </motion.span>
            )}
          </div>
          {isMobile && onClose && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                whileHover={{ x: isRTL ? -4 : 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all relative overflow-hidden group ${
                  active
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {/* Active background */}
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-emerald/20 border border-white/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${active ? 'text-accent-blue' : ''}`} />
                {(!collapsed || isMobile) && (
                  <>
                    <span className={`flex-1 ${isRTL ? 'text-right' : 'text-left'} text-sm font-medium relative z-10`}>{item.label}</span>
                    {item.badge && (
                      <span className="relative z-10 bg-gradient-to-r from-accent-blue to-accent-emerald text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg shadow-accent-blue/25">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </motion.button>
            );
          })}

          {/* Book Consultation - Highlighted */}
          <motion.button
            onClick={() => handleNavClick('/dashboard/consultation')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-semibold mt-4 md:mt-6 relative overflow-hidden group ${
              collapsed && !isMobile ? 'justify-center' : ''
            }`}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <Calendar className="w-5 h-5 flex-shrink-0 relative z-10" />
            {(!collapsed || isMobile) && (
              <span className="text-sm relative z-10 flex items-center gap-2">
                {t.bookConsultation}
                <Sparkles className="w-4 h-4" />
              </span>
            )}
          </motion.button>
        </nav>

        {/* User Section */}
        <div className="p-3 md:p-4 border-t border-white/10">
          {(!collapsed || isMobile) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-3 md:mb-4 px-2"
            >
              <div className="relative">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                {/* Online indicator */}
                <div className={`absolute -bottom-0.5 ${isRTL ? '-left-0.5' : '-right-0.5'} w-3 h-3 bg-accent-emerald rounded-full border-2 border-black`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-white/50 truncate">{user?.company}</p>
              </div>
            </motion.div>
          )}
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: isRTL ? -4 : 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'group-hover:-rotate-12' : 'group-hover:rotate-12'} transition-transform`} />
            {(!collapsed || isMobile) && <span className="text-sm font-medium">{t.logout}</span>}
          </motion.button>
        </div>
      </div>

      {/* Collapse Toggle - Desktop Only */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute ${isRTL ? '-left-3' : '-right-3'} top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-accent-blue/20 to-accent-emerald/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all shadow-lg`}
        >
          {isRTL ? (
            collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}
    </motion.aside>
  );
}