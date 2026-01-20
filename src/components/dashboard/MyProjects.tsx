import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Cpu, Wifi, Code, Zap, DollarSign } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoProjects } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

const typeIcons = {
  'AI Solution': Cpu,
  'IoT Platform': Wifi,
  'Software Development': Code,
  'Automation': Zap,
};

export function MyProjects() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const statusColors: Record<string, string> = {
    'In Progress': 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
    'Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Completed': 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30',
    'On Hold': 'bg-white/10 text-white/60 border-white/20',
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'In Progress': t.inProgress,
      'Review': t.review,
      'Completed': t.completed,
      'Planning': t.planning,
    };
    return statusMap[status] || status;
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
        title={t.myProjectsTitle} 
        subtitle={t.myProjectsSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {demoProjects.map((project) => {
            const TypeIcon = typeIcons[project.type] || Code;
            const budgetPercentage = project.budget && project.spent 
              ? Math.round((project.spent / project.budget) * 100) 
              : 0;
            
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                className="group rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer relative"
              >
                {/* Thumbnail */}
                {project.thumbnail && (
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-xs px-2 py-1 rounded-full border ${statusColors[project.status]}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header */}
                <div className="p-4 md:p-6 pb-3 md:pb-4 relative z-10">
                  <div className={`flex items-start justify-between mb-3 md:mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-emerald/20 border border-white/10 flex items-center justify-center shadow-lg shadow-accent-blue/10"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <TypeIcon className="w-5 h-5 md:w-6 md:h-6 text-accent-blue" />
                    </motion.div>
                    {!project.thumbnail && (
                      <span className={`text-xs px-2 md:px-3 py-1 rounded-full border ${statusColors[project.status]}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`text-base md:text-lg font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors line-clamp-1 ${isRTL ? 'text-right' : ''}`}>
                    {project.name}
                  </h3>
                  <p className={`text-xs md:text-sm text-white/60 line-clamp-2 ${isRTL ? 'text-right' : ''}`}>{project.description}</p>
                </div>

                {/* Progress */}
                <div className="px-4 md:px-6 pb-3 md:pb-4 relative z-10">
                  <div className={`flex items-center justify-between text-xs md:text-sm mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white/60">{t.progress}</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className={`h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden ${isRTL ? 'rotate-180' : ''}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-accent-blue to-accent-emerald relative"
                    >
                      {/* Animated shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>

                {/* Budget (if available) */}
                {project.budget && (
                  <div className="px-4 md:px-6 pb-3 relative z-10">
                    <div className={`flex items-center gap-2 text-xs text-white/60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <DollarSign className="w-3 h-3" />
                      <span>${(project.spent || 0).toLocaleString()} / ${project.budget.toLocaleString()}</span>
                      <span className={`${isRTL ? 'mr-auto' : 'ml-auto'} text-white/40`}>{budgetPercentage}% {t.spent}</span>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className={`px-4 md:px-6 py-3 md:py-4 border-t border-white/5 flex items-center justify-between relative z-10 bg-white/[0.02] ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{new Date(project.expectedEnd).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{project.teamMembers.length}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-accent-blue transition-all ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}