export interface Project {
  id: string;
  name: string;
  type: 'AI Solution' | 'IoT Platform' | 'Software Development' | 'Automation';
  status: 'In Progress' | 'Review' | 'Completed' | 'On Hold';
  progress: number;
  startDate: string;
  expectedEnd: string;
  description: string;
  teamMembers: TeamMember[];
  milestones: Milestone[];
  thumbnail?: string;
  budget?: number;
  spent?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface Message {
  id: string;
  projectId: string;
  projectName: string;
  sender: string;
  senderRole: string;
  avatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'Contract' | 'Proposal' | 'Deliverable' | 'Invoice' | 'Report';
  projectId?: string;
  projectName?: string;
  uploadDate: string;
  size: string;
  status: 'Active' | 'Archived';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectName: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  lastUpdate: string;
  messages: number;
}

export interface ConsultationSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

// Demo Team Members
export const demoTeamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Sarah Chen', role: 'Lead Developer', avatar: '/team-member-1.png' },
  { id: 'tm-2', name: 'Marcus Williams', role: 'UI Designer', avatar: '/team-member-2.png' },
  { id: 'tm-3', name: 'Elena Rodriguez', role: 'ML Engineer', avatar: '/team-member-3.png' },
  { id: 'tm-4', name: 'James Park', role: 'Project Manager', avatar: '/team-member-4.png' },
  { id: 'tm-5', name: 'Nina Patel', role: 'Backend Developer', avatar: '/team-member-5.png' },
  { id: 'tm-6', name: 'David Kim', role: 'Full Stack Developer', avatar: '/team-member-6.png' },
  { id: 'tm-7', name: 'Lisa Thompson', role: 'UX Researcher', avatar: '/team-member-7.png' },
];

// Demo Projects
export const demoProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'AI-Powered Analytics Dashboard',
    type: 'AI Solution',
    status: 'In Progress',
    progress: 72,
    startDate: '2024-01-15',
    expectedEnd: '2024-03-30',
    description: 'Building an intelligent analytics dashboard with predictive insights, automated reporting, and real-time data visualization for enterprise clients.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    budget: 85000,
    spent: 61200,
    teamMembers: [
      demoTeamMembers[0],
      demoTeamMembers[1],
      demoTeamMembers[2],
    ],
    milestones: [
      { id: 'm1', title: 'Project Kickoff', date: '2024-01-15', completed: true, description: 'Initial planning and team alignment' },
      { id: 'm2', title: 'Design Approval', date: '2024-01-28', completed: true, description: 'UI/UX designs signed off by client' },
      { id: 'm3', title: 'Core Development', date: '2024-02-20', completed: true, description: 'Main dashboard functionality complete' },
      { id: 'm4', title: 'AI Integration', date: '2024-03-10', completed: false, description: 'Machine learning models integration' },
      { id: 'm5', title: 'Testing & QA', date: '2024-03-20', completed: false, description: 'Comprehensive testing phase' },
      { id: 'm6', title: 'Final Delivery', date: '2024-03-30', completed: false, description: 'Production deployment and handover' },
    ],
  },
  {
    id: 'proj-002',
    name: 'Smart IoT Fleet Management',
    type: 'IoT Platform',
    status: 'Review',
    progress: 95,
    startDate: '2023-11-01',
    expectedEnd: '2024-02-15',
    description: 'Complete IoT solution for real-time fleet tracking, predictive maintenance alerts, driver behavior analysis, and fuel optimization.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60',
    budget: 120000,
    spent: 114000,
    teamMembers: [
      demoTeamMembers[3],
      demoTeamMembers[4],
    ],
    milestones: [
      { id: 'm1', title: 'Requirements Gathering', date: '2023-11-01', completed: true, description: 'Stakeholder interviews and documentation' },
      { id: 'm2', title: 'Architecture Design', date: '2023-11-20', completed: true, description: 'System architecture finalized' },
      { id: 'm3', title: 'Sensor Integration', date: '2023-12-15', completed: true, description: 'IoT sensors connected and tested' },
      { id: 'm4', title: 'Dashboard Development', date: '2024-01-20', completed: true, description: 'Real-time monitoring dashboard' },
      { id: 'm5', title: 'Client Review', date: '2024-02-10', completed: false, description: 'Final review with stakeholders' },
      { id: 'm6', title: 'Deployment', date: '2024-02-15', completed: false, description: 'Production rollout' },
    ],
  },
  {
    id: 'proj-003',
    name: 'E-Commerce Platform Redesign',
    type: 'Software Development',
    status: 'In Progress',
    progress: 45,
    startDate: '2024-02-01',
    expectedEnd: '2024-05-30',
    description: 'Complete redesign and rebuild of the existing e-commerce platform with modern UX, improved performance, and enhanced security features.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60',
    budget: 95000,
    spent: 42750,
    teamMembers: [
      demoTeamMembers[0],
      demoTeamMembers[5],
      demoTeamMembers[6],
    ],
    milestones: [
      { id: 'm1', title: 'UX Research', date: '2024-02-01', completed: true, description: 'User research and competitive analysis' },
      { id: 'm2', title: 'Design System', date: '2024-02-28', completed: true, description: 'Component library and style guide' },
      { id: 'm3', title: 'Frontend Development', date: '2024-04-01', completed: false, description: 'React components and pages' },
      { id: 'm4', title: 'Backend Integration', date: '2024-04-30', completed: false, description: 'API development and integration' },
      { id: 'm5', title: 'Launch', date: '2024-05-30', completed: false, description: 'Go-live and monitoring' },
    ],
  },
  {
    id: 'proj-004',
    name: 'Marketing Automation Suite',
    type: 'Automation',
    status: 'Completed',
    progress: 100,
    startDate: '2023-09-01',
    expectedEnd: '2023-12-15',
    description: 'Automated marketing workflows including email campaigns, social media scheduling, and lead scoring with AI-powered recommendations.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    budget: 65000,
    spent: 62000,
    teamMembers: [
      demoTeamMembers[2],
      demoTeamMembers[4],
    ],
    milestones: [
      { id: 'm1', title: 'Discovery', date: '2023-09-01', completed: true, description: 'Requirements and workflow mapping' },
      { id: 'm2', title: 'Development', date: '2023-10-15', completed: true, description: 'Core automation engine' },
      { id: 'm3', title: 'Integration', date: '2023-11-15', completed: true, description: 'Third-party platform connections' },
      { id: 'm4', title: 'Testing', date: '2023-12-01', completed: true, description: 'End-to-end testing' },
      { id: 'm5', title: 'Delivery', date: '2023-12-15', completed: true, description: 'Production deployment' },
    ],
  },
  {
    id: 'proj-005',
    name: 'Healthcare Data Platform',
    type: 'AI Solution',
    status: 'On Hold',
    progress: 30,
    startDate: '2024-01-20',
    expectedEnd: '2024-06-30',
    description: 'HIPAA-compliant data platform for healthcare providers with advanced analytics and patient outcome predictions.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    budget: 150000,
    spent: 45000,
    teamMembers: [
      demoTeamMembers[0],
      demoTeamMembers[2],
      demoTeamMembers[3],
    ],
    milestones: [
      { id: 'm1', title: 'Compliance Review', date: '2024-01-20', completed: true, description: 'HIPAA requirements analysis' },
      { id: 'm2', title: 'Architecture', date: '2024-02-15', completed: true, description: 'Secure system design' },
      { id: 'm3', title: 'Development', date: '2024-04-01', completed: false, description: 'Core platform build' },
      { id: 'm4', title: 'AI Models', date: '2024-05-15', completed: false, description: 'Prediction model development' },
      { id: 'm5', title: 'Launch', date: '2024-06-30', completed: false, description: 'Staged rollout' },
    ],
  },
];

// Demo Messages
export const demoMessages: Message[] = [
  {
    id: 'msg-001',
    projectId: 'proj-001',
    projectName: 'AI-Powered Analytics Dashboard',
    sender: 'Sarah Chen',
    senderRole: 'Lead Developer',
    content: 'Great news! We\'ve completed the core ML models and they\'re performing better than expected. The prediction accuracy is at 94%. Ready to proceed with the dashboard integration.',
    timestamp: '2024-02-20T14:30:00Z',
    read: false,
  },
  {
    id: 'msg-002',
    projectId: 'proj-002',
    projectName: 'Smart IoT Fleet Management',
    sender: 'James Park',
    senderRole: 'Project Manager',
    content: 'The demo environment is ready for your review. Please let us know your available time slots this week so we can schedule a walkthrough of the fleet tracking features.',
    timestamp: '2024-02-19T10:15:00Z',
    read: false,
  },
  {
    id: 'msg-003',
    projectId: 'proj-001',
    projectName: 'AI-Powered Analytics Dashboard',
    sender: 'Marcus Williams',
    senderRole: 'UI Designer',
    content: 'I\'ve uploaded the latest UI mockups to the documents section. The new color scheme aligns with your brand guidelines. Looking forward to your feedback!',
    timestamp: '2024-02-18T16:45:00Z',
    read: true,
  },
  {
    id: 'msg-004',
    projectId: 'proj-003',
    projectName: 'E-Commerce Platform Redesign',
    sender: 'Lisa Thompson',
    senderRole: 'UX Researcher',
    content: 'User testing results are in. The new checkout flow shows a 23% improvement in completion rates. Full report is attached with recommendations.',
    timestamp: '2024-02-17T09:20:00Z',
    read: true,
  },
  {
    id: 'msg-005',
    projectId: 'proj-003',
    projectName: 'E-Commerce Platform Redesign',
    sender: 'David Kim',
    senderRole: 'Full Stack Developer',
    content: 'The new product catalog API is live in staging. Performance benchmarks show 40% faster load times compared to the current implementation.',
    timestamp: '2024-02-16T15:00:00Z',
    read: true,
  },
  {
    id: 'msg-006',
    projectId: 'proj-002',
    projectName: 'Smart IoT Fleet Management',
    sender: 'Nina Patel',
    senderRole: 'Backend Developer',
    content: 'Successfully integrated the fuel optimization algorithm. Initial tests show potential savings of 12-15% on fuel costs for the test fleet.',
    timestamp: '2024-02-15T11:30:00Z',
    read: true,
  },
  {
    id: 'msg-007',
    projectId: 'proj-001',
    projectName: 'AI-Powered Analytics Dashboard',
    sender: 'Elena Rodriguez',
    senderRole: 'ML Engineer',
    content: 'The anomaly detection model is now live. It successfully identified 3 potential issues in the test dataset that were previously undetected.',
    timestamp: '2024-02-14T09:45:00Z',
    read: true,
  },
];

// Demo Documents
export const demoDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Master Services Agreement',
    type: 'Contract',
    uploadDate: '2024-01-10',
    size: '2.4 MB',
    status: 'Active',
  },
  {
    id: 'doc-002',
    name: 'AI Analytics - Technical Proposal',
    type: 'Proposal',
    projectId: 'proj-001',
    projectName: 'AI-Powered Analytics Dashboard',
    uploadDate: '2024-01-12',
    size: '4.1 MB',
    status: 'Active',
  },
  {
    id: 'doc-003',
    name: 'Fleet Management - System Architecture',
    type: 'Deliverable',
    projectId: 'proj-002',
    projectName: 'Smart IoT Fleet Management',
    uploadDate: '2024-01-25',
    size: '8.7 MB',
    status: 'Active',
  },
  {
    id: 'doc-004',
    name: 'Q1 Progress Report',
    type: 'Report',
    uploadDate: '2024-02-01',
    size: '1.2 MB',
    status: 'Active',
  },
  {
    id: 'doc-005',
    name: 'E-Commerce - UX Research Findings',
    type: 'Report',
    projectId: 'proj-003',
    projectName: 'E-Commerce Platform Redesign',
    uploadDate: '2024-02-15',
    size: '5.3 MB',
    status: 'Active',
  },
  {
    id: 'doc-006',
    name: 'E-Commerce - Component Library Specs',
    type: 'Deliverable',
    projectId: 'proj-003',
    projectName: 'E-Commerce Platform Redesign',
    uploadDate: '2024-02-28',
    size: '3.8 MB',
    status: 'Active',
  },
  {
    id: 'doc-007',
    name: 'IoT Platform - API Documentation',
    type: 'Deliverable',
    projectId: 'proj-002',
    projectName: 'Smart IoT Fleet Management',
    uploadDate: '2024-01-30',
    size: '2.1 MB',
    status: 'Active',
  },
  {
    id: 'doc-008',
    name: 'Marketing Automation - Final Report',
    type: 'Report',
    projectId: 'proj-004',
    projectName: 'Marketing Automation Suite',
    uploadDate: '2023-12-20',
    size: '4.5 MB',
    status: 'Active',
  },
];

// Demo Invoices
export const demoInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-001',
    projectName: 'AI-Powered Analytics Dashboard',
    amount: 25000,
    currency: 'USD',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'Paid',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-002',
    projectName: 'Smart IoT Fleet Management',
    amount: 35000,
    currency: 'USD',
    issueDate: '2024-02-01',
    dueDate: '2024-03-01',
    status: 'Pending',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-003',
    projectName: 'E-Commerce Platform Redesign',
    amount: 15000,
    currency: 'USD',
    issueDate: '2024-02-10',
    dueDate: '2024-02-25',
    status: 'Overdue',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2024-004',
    projectName: 'AI-Powered Analytics Dashboard',
    amount: 30000,
    currency: 'USD',
    issueDate: '2024-02-20',
    dueDate: '2024-03-20',
    status: 'Pending',
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2023-012',
    projectName: 'Marketing Automation Suite',
    amount: 32000,
    currency: 'USD',
    issueDate: '2023-12-01',
    dueDate: '2023-12-31',
    status: 'Paid',
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2023-011',
    projectName: 'Marketing Automation Suite',
    amount: 30000,
    currency: 'USD',
    issueDate: '2023-11-01',
    dueDate: '2023-11-30',
    status: 'Paid',
  },
];

// Demo Support Tickets
export const demoTickets: SupportTicket[] = [
  {
    id: 'ticket-001',
    subject: 'Dashboard loading performance',
    category: 'Technical',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2024-02-18',
    lastUpdate: '2024-02-19',
    messages: 4,
  },
  {
    id: 'ticket-002',
    subject: 'Request for additional user accounts',
    category: 'Account',
    status: 'Resolved',
    priority: 'Low',
    createdAt: '2024-02-10',
    lastUpdate: '2024-02-12',
    messages: 3,
  },
  {
    id: 'ticket-003',
    subject: 'API rate limiting questions',
    category: 'Technical',
    status: 'Open',
    priority: 'High',
    createdAt: '2024-02-20',
    lastUpdate: '2024-02-20',
    messages: 1,
  },
  {
    id: 'ticket-004',
    subject: 'Invoice payment method update',
    category: 'Billing',
    status: 'Closed',
    priority: 'Low',
    createdAt: '2024-02-05',
    lastUpdate: '2024-02-07',
    messages: 5,
  },
];

// Demo Consultation Slots (next 14 days)
export const generateConsultationSlots = (): ConsultationSlot[] => {
  const slots: ConsultationSlot[] = [];
  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    times.forEach((time, idx) => {
      slots.push({
        id: `slot-${i}-${idx}`,
        date: dateStr,
        time,
        available: Math.random() > 0.3, // 70% available
      });
    });
  }
  
  return slots;
};

// Quick Stats
export const demoStats = {
  activeProjects: 4,
  completedProjects: 1,
  pendingDeliverables: 8,
  unreadMessages: 2,
  upcomingMilestones: 6,
  totalInvoiced: 167000,
  pendingPayments: 80000,
  paidAmount: 87000,
};

// Recent Activity
export const demoActivity = [
  { id: 'act-1', type: 'milestone', message: 'Core Development milestone completed', project: 'AI Analytics Dashboard', time: '2 hours ago' },
  { id: 'act-2', type: 'message', message: 'New message from Sarah Chen', project: 'AI Analytics Dashboard', time: '4 hours ago' },
  { id: 'act-3', type: 'document', message: 'UX Research report uploaded', project: 'E-Commerce Redesign', time: '1 day ago' },
  { id: 'act-4', type: 'invoice', message: 'Invoice INV-2024-004 generated', project: 'AI Analytics Dashboard', time: '2 days ago' },
  { id: 'act-5', type: 'milestone', message: 'Dashboard Development completed', project: 'IoT Fleet Management', time: '3 days ago' },
];
