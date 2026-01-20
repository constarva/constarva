import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { demoInvoices } from '@/data/demoData';
import { useLanguage } from '@/contexts/LanguageContext';

const statusConfig = {
  'Paid': { icon: CheckCircle2, color: 'text-accent-emerald', bg: 'bg-accent-emerald/20', border: 'border-accent-emerald/30' },
  'Pending': { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
  'Overdue': { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
};

export function Billing() {
  const { t, isRTL } = useLanguage();
  
  const totalInvoiced = demoInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = demoInvoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = demoInvoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = demoInvoices.filter(i => i.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'Paid': t.paid,
      'Pending': t.pending,
      'Overdue': t.overdue,
    };
    return statusMap[status] || status;
  };

  const stats = [
    { label: t.totalInvoiced, value: totalInvoiced, icon: CreditCard, color: 'from-accent-blue to-blue-600', glow: 'shadow-accent-blue/25' },
    { label: t.paid, value: totalPaid, icon: TrendingUp, color: 'from-accent-emerald to-emerald-600', glow: 'shadow-accent-emerald/25' },
    { label: t.pending, value: totalPending, icon: Clock, color: 'from-yellow-500 to-yellow-600', glow: 'shadow-yellow-500/25' },
    { label: t.overdue, value: totalOverdue, icon: TrendingDown, color: 'from-red-500 to-red-600', glow: 'shadow-red-500/25' },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title={t.billingTitle} 
        subtitle={t.billingSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6 space-y-4 md:space-y-6"
      >
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 p-4 md:p-6 relative overflow-hidden group"
              >
                {/* Decorative glow */}
                <div className={`absolute -top-10 ${isRTL ? '-left-10' : '-right-10'} w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                
                <motion.div 
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg ${stat.glow} relative z-10`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
                <p className={`text-lg md:text-2xl font-bold text-white relative z-10 ${isRTL ? 'text-right' : ''}`}>{formatCurrency(stat.value)}</p>
                <p className={`text-xs md:text-sm text-white/60 mt-1 relative z-10 ${isRTL ? 'text-right' : ''}`}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Invoices Table */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 overflow-hidden"
        >
          <div className={`p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-accent-blue/5 to-transparent ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-base md:text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CreditCard className="w-5 h-5 text-accent-blue" />
              {t.invoices}
            </h2>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden divide-y divide-white/5">
            {demoInvoices.map((invoice) => {
              const status = statusConfig[invoice.status];
              const StatusIcon = status.icon;
              
              return (
                <div key={invoice.id} className="p-4">
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium text-white text-sm">{invoice.invoiceNumber}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color} ${status.border} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <StatusIcon className="w-3 h-3" />
                      {getStatusLabel(invoice.status)}
                    </span>
                  </div>
                  <p className={`text-sm text-white/60 mb-2 ${isRTL ? 'text-right' : ''}`}>{invoice.projectName}</p>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-semibold text-white">{formatCurrency(invoice.amount)}</span>
                    <span className="text-xs text-white/40">{t.dueDate}: {new Date(invoice.dueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-slate-700/30">
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.invoice}</th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.project}</th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.amount}</th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.issueDate}</th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.dueDate}</th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-6 py-4 text-sm font-medium text-white/80`}>{t.status}</th>
                  <th className={`${isRTL ? 'text-left' : 'text-right'} px-6 py-4 text-sm font-medium text-white/80`}>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {demoInvoices.map((invoice, index) => {
                  const status = statusConfig[invoice.status];
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.tr 
                      key={invoice.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="font-medium text-white">{invoice.invoiceNumber}</span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-white/80">{invoice.projectName}</span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="font-semibold text-white">{formatCurrency(invoice.amount)}</span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-white/60">{new Date(invoice.issueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-white/60">{new Date(invoice.dueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${status.bg} ${status.color} ${status.border} ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusLabel(invoice.status)}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${isRTL ? 'text-left' : 'text-right'}`}>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 transition-all opacity-0 group-hover:opacity-100 shadow-lg shadow-accent-blue/10"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 p-4 md:p-6 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-purple/5 to-accent-emerald/10" />
          
          <h2 className={`text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <CreditCard className="w-5 h-5 text-accent-blue" />
            {t.paymentMethods}
          </h2>
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`flex-1 flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-700/50 border border-white/10 hover:border-white/20 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-12 md:w-14 h-8 md:h-9 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                VISA
              </div>
              <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                <p className="text-white font-medium text-sm md:text-base">•••• •••• •••• 4242</p>
                <p className="text-xs md:text-sm text-white/60">Expires 12/25</p>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs px-2 py-1 rounded-full bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30">
                  {t.default}
                </span>
              </div>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-5 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white/60 hover:text-white hover:bg-slate-600/50 hover:border-white/20 transition-all flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">{t.addMethod}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}