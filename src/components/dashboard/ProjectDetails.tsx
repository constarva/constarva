import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Circle, 
  Download,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoProjects, demoDocuments } from '@/data/demoData';

export function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = demoProjects.find(p => p.id === projectId);
  const projectDocs = demoDocuments.filter(d => d.projectId === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate('/dashboard/projects')}
            className="text-accent-blue hover:text-accent-emerald transition-colors"
          >
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const totalMilestones = project.milestones.length;

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
      <DashboardHeader title={project.name} subtitle={project.type} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 space-y-6"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/dashboard/projects')}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </motion.button>

        {/* Overview Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl glass-effect p-6 relative overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent-blue/20 to-accent-emerald/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-2">Status</p>
              <span className={`inline-block text-sm px-3 py-1.5 rounded-full border ${
                project.status === 'In Progress' ? 'bg-accent-blue/20 text-accent-blue border-accent-blue/30' :
                project.status === 'Review' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30'
              }`}>
                {project.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> Progress
              </p>
              <p className="text-2xl font-bold text-white">{project.progress}%</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Start Date
              </p>
              <p className="text-white font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Expected Completion
              </p>
              <p className="text-white font-medium">{new Date(project.expectedEnd).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 relative z-10">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-accent-blue to-accent-emerald relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 relative z-10">
            <p className="text-white/80 leading-relaxed">{project.description}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Milestones */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl glass-effect overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-accent-blue/5 to-transparent">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                  Milestones
                </h2>
                <span className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full">
                  {completedMilestones}/{totalMilestones} completed
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {project.milestones.map((milestone, index) => (
                <motion.div 
                  key={milestone.id} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    {milestone.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-emerald to-emerald-600 flex items-center justify-center shadow-lg shadow-accent-emerald/30"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <Circle className="w-6 h-6 text-white/30" />
                    )}
                    {index < project.milestones.length - 1 && (
                      <div className={`absolute left-3 top-8 w-0.5 h-8 ${
                        milestone.completed ? 'bg-gradient-to-b from-accent-emerald/50 to-transparent' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${milestone.completed ? 'text-white' : 'text-white/60'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-sm text-white/40">{new Date(milestone.date).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl glass-effect overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-accent-emerald/5 to-transparent">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-emerald" />
                Project Team
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {project.teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold shadow-lg shadow-accent-blue/20">
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-emerald rounded-full border-2 border-black" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-white/60">{member.role}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-accent-blue hover:bg-accent-blue/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Documents */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl glass-effect overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-accent-purple/5 to-transparent">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-accent-purple" />
              Project Documents
            </h2>
          </div>
          {projectDocs.length > 0 ? (
            <div className="divide-y divide-white/5">
              {projectDocs.map((doc, index) => (
                <motion.div 
                  key={doc.id} 
                  className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-accent-blue transition-colors">{doc.name}</p>
                    <p className="text-sm text-white/60">{doc.type} • {doc.size}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 transition-all shadow-lg shadow-accent-blue/10"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-white/40">
              No documents available for this project
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
