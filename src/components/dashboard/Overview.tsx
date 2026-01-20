import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Package, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoStats, demoProjects, demoActivity } from '@/data/demoData';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function Overview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();

  const stats = [
    { 
      label: t.activeProjects, 
      value: demoStats.activeProjects, 
      icon: FolderKanban, 
      color: 'from-accent-blue to-blue-600',
      glow: 'shadow-accent-blue/25',
      path: '/dashboard/projects'
    },
    { 
      label: t.pendingDeliverables, 
      value: demoStats.pendingDeliverables, 
      icon: Package, 
      color: 'from-accent-emerald to-emerald-600',
      glow: 'shadow-accent-emerald/25',
      path: '/dashboard/projects'
    },
    { 
      label: t.unreadMessages, 
      value: demoStats.unreadMessages, 
      icon: MessageSquare, 
      color: 'from-accent-purple to-purple-600',
      glow: 'shadow-accent-purple/25',
      path: '/dashboard/messages'
    },
    { 
      label: t.upcomingMilestones, 
      value: demoStats.upcomingMilestones, 
      icon: Calendar, 
      color: 'from-orange-500 to-orange-600',
      glow: 'shadow-orange-500/25',
      path: '/dashboard/projects'
    },
  ];

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

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'In Progress': return t.inProgress;
      case 'Review': return t.review;
      case 'Completed': return t.completed;
      case 'Planning': return t.planning;
      default: return status;
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title={`${t.welcomeBack}، ${user?.name?.split(' ')[0] || 'User'}`} 
        subtitle={t.projectsStatus}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6 space-y-6"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => navigate(stat.path)}
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 cursor-pointer group"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Decorative corner accent */}
                <div className={`absolute ${isRTL ? '-top-10 -left-10' : '-top-10 -right-10'} w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg ${stat.glow}`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <p className={`text-2xl md:text-3xl font-bold text-white ${isRTL ? 'text-right' : ''}`}>{stat.value}</p>
                  <p className={`text-xs md:text-sm text-white/60 mt-1 ${isRTL ? 'text-right' : ''}`}>{stat.label}</p>
                </div>
                
                {/* Arrow indicator */}
                <ArrowIcon className={`absolute bottom-4 md:bottom-6 ${isRTL ? 'left-4 md:left-6' : 'right-4 md:right-6'} w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-white/60 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-all`} />
              </motion.div>
            );
          })}
        </div>

        {/* Financial Summary */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-emerald/5" />
          <div className="relative z-10">
            <h2 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TrendingUp className="w-5 h-5 text-accent-emerald" />
              {t.financialSummary}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-accent-emerald mb-1">
                  ${(demoStats.paidAmount / 1000).toFixed(0)}K
                </div>
                <div className="text-white/60 text-sm">{t.paid}</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">
                  ${(demoStats.pendingPayments / 1000).toFixed(0)}K
                </div>
                <div className="text-white/60 text-sm">{t.pending}</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-accent-blue mb-1">
                  ${(demoStats.totalInvoiced / 1000).toFixed(0)}K
                </div>
                <div className="text-white/60 text-sm">{t.totalInvoiced}</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            <div className={`p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-accent-blue/5 to-transparent ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-base md:text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FolderKanban className="w-5 h-5 text-accent-blue" />
                {t.recentProjects}
              </h2>
              <motion.button
                whileHover={{ x: isRTL ? -3 : 3 }}
                onClick={() => navigate('/dashboard/projects')}
                className={`text-sm text-accent-blue hover:text-accent-emerald transition-colors flex items-center gap-1 group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t.viewAll} <ArrowIcon className={`w-4 h-4 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
              </motion.button>
            </div>
            <div className="divide-y divide-white/5">
              {demoProjects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.id}
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className="p-4 cursor-pointer transition-colors"
                >
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-medium text-white text-sm md:text-base truncate flex-1 ${isRTL ? 'ml-2 text-right' : 'mr-2'}`}>{project.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      project.status === 'In Progress' ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                      project.status === 'Review' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      project.status === 'Completed' ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30' :
                      'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                  <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r from-accent-blue to-accent-emerald ${isRTL ? 'mr-auto' : 'ml-0'}`}
                        style={{ marginRight: isRTL ? 'auto' : 0, marginLeft: isRTL ? 0 : 0 }}
                      />
                    </div>
                    <span className="text-sm text-white/60 font-medium">{project.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            <div className={`p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-accent-purple/5 to-transparent`}>
              <h2 className={`text-base md:text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Activity className="w-5 h-5 text-accent-purple" />
                {t.recentActivity}
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {demoActivity.slice(0, 5).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'milestone' ? 'bg-accent-emerald/20 text-accent-emerald' :
                    activity.type === 'message' ? 'bg-accent-blue/20 text-accent-blue' :
                    activity.type === 'document' ? 'bg-accent-purple/20 text-accent-purple' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {activity.type === 'milestone' && <CheckCircle2 className="w-4 h-4" />}
                    {activity.type === 'message' && <MessageSquare className="w-4 h-4" />}
                    {activity.type === 'document' && <Package className="w-4 h-4" />}
                    {activity.type === 'invoice' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-white/40 mt-1">{activity.project} • {activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-purple/5 to-accent-emerald/10" />
          
          {/* Decorative elements */}
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-2 h-2 bg-accent-blue rounded-full animate-pulse`} />
          <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-accent-emerald rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <h2 className={`text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-5 h-5 text-accent-blue" />
              {t.quickActions}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: t.bookConsultation, icon: Calendar, path: '/dashboard/consultation', highlight: true },
                { label: t.viewInvoices, icon: TrendingUp, path: '/dashboard/billing' },
                { label: t.sendMessage, icon: MessageSquare, path: '/dashboard/messages' },
                { label: t.viewTimeline, icon: Clock, path: '/dashboard/projects' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(action.path)}
                    className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl border transition-all ${isRTL ? 'flex-row-reverse' : ''} ${
                      action.highlight 
                        ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white border-transparent shadow-lg shadow-accent-blue/20'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-4 h-4 md:w-5 md:h-5 ${action.highlight ? 'text-white' : 'text-accent-blue'}`} />
                    <span className="text-xs md:text-sm font-medium">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}