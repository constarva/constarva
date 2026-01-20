import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Download, 
  Eye, 
  FolderOpen,
  Upload
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoDocuments } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

const typeColors = {
  'Contract': 'bg-accent-purple/20 text-accent-purple border-accent-purple/30',
  'Proposal': 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  'Deliverable': 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30',
  'Invoice': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Report': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function Documents() {
  const { t, isRTL } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = demoDocuments.filter(doc => {
    const matchesFilter = filter === 'all' || doc.type === filter || doc.projectId === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      'Contract': t.contract,
      'Proposal': t.proposal,
      'Deliverable': t.deliverable,
      'Report': t.report,
    };
    return typeMap[type] || type;
  };

  const filterOptions = [
    { key: 'all', label: t.all },
    { key: 'Contract', label: t.contract },
    { key: 'Proposal', label: t.proposal },
    { key: 'Deliverable', label: t.deliverable },
    { key: 'Report', label: t.report },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title={t.documentsTitle} 
        subtitle={t.documentsSubtitle}
      />

      <div className="p-4 md:p-6">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6"
        >
          {/* Search and Upload */}
          <div className={`flex gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL ? 'right-3 md:right-4' : 'left-3 md:left-4'} top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/40`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchDocuments}
                className={`w-full ${isRTL ? 'pr-10 md:pr-12 pl-4' : 'pl-10 md:pl-12 pr-4'} py-2.5 md:py-3 bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-accent-blue to-accent-emerald text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent-blue/25 relative overflow-hidden group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Upload className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline text-sm">{t.upload}</span>
            </motion.button>
          </div>

          {/* Filters */}
          <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                  filter === option.key
                    ? 'bg-gradient-to-r from-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-blue/20'
                    : 'bg-slate-800/90 text-white/80 hover:text-white hover:bg-slate-700/90 border border-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Documents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
        >
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 p-4 md:p-5 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div 
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-emerald/20 border border-white/10 flex items-center justify-center mb-3 md:mb-4 relative z-10 ${isRTL ? 'mr-0 ml-auto' : ''}`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-accent-blue" />
              </motion.div>

              {/* Name */}
              <h3 className={`font-medium text-white text-sm md:text-base mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors relative z-10 ${isRTL ? 'text-right' : ''}`}>
                {doc.name}
              </h3>

              {/* Meta */}
              <div className={`flex items-center gap-2 mb-3 md:mb-4 relative z-10 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`text-xs px-2 py-0.5 md:py-1 rounded-full border ${typeColors[doc.type]}`}>
                  {getTypeLabel(doc.type)}
                </span>
                <span className="text-xs text-white/40">{doc.size}</span>
              </div>

              {/* Project */}
              {doc.projectName && (
                <div className={`flex items-center gap-2 mb-3 text-xs md:text-sm text-white/60 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FolderOpen className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="truncate">{doc.projectName}</span>
                </div>
              )}

              {/* Date */}
              <p className={`text-xs text-white/40 mb-3 md:mb-4 relative z-10 ${isRTL ? 'text-right' : ''}`}>
                {t.uploaded} {new Date(doc.uploadDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
              </p>

              {/* Actions */}
              <div className={`flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 rounded-lg bg-slate-700/90 text-white/80 hover:text-white hover:bg-slate-600/90 transition-all border border-white/20 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Eye className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs">{t.preview}</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 transition-all border border-accent-blue/30 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs">{t.download}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDocs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 md:py-16 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl"
          >
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm md:text-base">{t.noDocumentsFound}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}