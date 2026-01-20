import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Overview } from '@/components/dashboard/Overview';
import { MyProjects } from '@/components/dashboard/MyProjects';
import { ProjectDetails } from '@/components/dashboard/ProjectDetails';
import { Messages } from '@/components/dashboard/Messages';
import { Documents } from '@/components/dashboard/Documents';
import { Billing } from '@/components/dashboard/Billing';
import { Support } from '@/components/dashboard/Support';
import { BookConsultation } from '@/components/dashboard/BookConsultation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Rich Background Effects - Matching Home Page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-background to-black" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-blue/20 rounded-full blur-[120px] md:blur-[180px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-emerald/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-accent-purple/10 rounded-full blur-[150px] md:blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-[30%] w-2 h-2 bg-accent-blue rounded-full animate-pulse hidden md:block" />
        <div className="absolute top-[40%] right-20 w-3 h-3 bg-accent-emerald rounded-full animate-pulse hidden md:block" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[30%] left-[35%] w-2 h-2 bg-accent-purple rounded-full animate-pulse hidden md:block" style={{ animationDelay: '1.5s' }} />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Mobile Header with Menu Button */}
      {isMobile && (
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 bg-black/60 backdrop-blur-2xl border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
          <span className={`${isRTL ? 'mr-4' : 'ml-4'} text-lg font-bold text-white`}>CONSTARVA</span>
        </motion.header>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 z-50 w-72`}
            >
              <DashboardSidebar onClose={() => setSidebarOpen(false)} isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && <DashboardSidebar />}

      {/* Main Content */}
      <main className={`relative z-10 transition-all duration-300 ${isMobile ? 'pt-16' : isRTL ? 'mr-64' : 'ml-64'}`}>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="documents" element={<Documents />} />
          <Route path="billing" element={<Billing />} />
          <Route path="support" element={<Support />} />
          <Route path="consultation" element={<BookConsultation />} />
        </Routes>
      </main>
    </div>
  );
}