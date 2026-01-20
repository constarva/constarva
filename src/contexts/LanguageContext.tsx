'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'ar'

interface Translations {
  // Navigation
  navProjects: string
  navPortfolio: string
  navAbout: string
  navServices: string
  navContact: string
  navBook: string
  navLogin: string
  
  // Hero
  heroTag: string
  heroTitle: string
  heroTitle1: string
  heroTitle2: string
  heroTitle3: string
  heroSubtitle: string
  heroCTA: string
  heroSecondary: string
  soundOn: string
  
  // Portfolio
  portfolioTag: string
  portfolioTitle: string
  portfolioSubtitle: string
  portfolioLatest: string
  portfolioIndustry: string
  portfolioStyle: string
  portfolioTone: string
  portfolioFormat: string
  project1Title: string
  project1Desc: string
  project2Title: string
  project2Desc: string
  project3Title: string
  project3Desc: string
  project4Title: string
  project4Desc: string
  project5Title: string
  project5Desc: string
  project6Title: string
  project6Desc: string
  categoryAI: string
  categoryIoT: string
  categorySoftware: string
  categoryAutomation: string
  
  // About
  aboutTag: string
  aboutTitle: string
  aboutSubtitle: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  step4Title: string
  step4Desc: string
  step5Title: string
  step5Desc: string
  stat1: string
  stat2: string
  stat3: string
  stat4: string
  
  // Services
  servicesTag: string
  servicesTitle: string
  servicesSubtitle: string
  service1Title: string
  service1Desc: string
  service2Title: string
  service2Desc: string
  service3Title: string
  service3Desc: string
  service4Title: string
  service4Desc: string
  service5Title: string
  service5Desc: string
  service6Title: string
  service6Desc: string
  
  // Contact
  contactTag: string
  contactTitle: string
  contactSubtitle: string
  contactEmail: string
  contactSchedule: string
  contactEmailLabel: string
  contactEmailTitle: string
  contactEmailDesc: string
  contactEmailAction: string
  contactScheduleTitle: string
  contactScheduleDesc: string
  contactScheduleAction: string
  contactProjectDiscussion: string
  contactProjectDesc: string
  contactCustomStrategy: string
  contactStrategyDesc: string
  contactNextSteps: string
  contactNextStepsDesc: string
  
  // Footer
  footerDescription: string
  footerDesc: string
  footerTechnologies: string
  footerTech: string
  footerTechDescription: string
  footerRights: string
  footerTagline: string
  footerConnect: string
  techAI: string
  techIoT: string
  techSoftware: string
  techAutomation: string
  techEmerging: string
  
  // Schedule Modal
  scheduleModalTag: string
  scheduleModalTitle: string
  scheduleModalSubtitle: string
  scheduleSelectDate: string
  scheduleSelectTime: string
  scheduleContinue: string
  scheduleName: string
  scheduleNamePlaceholder: string
  scheduleEmail: string
  scheduleEmailPlaceholder: string
  schedulePhone: string
  schedulePhonePlaceholder: string
  scheduleMessage: string
  scheduleMessagePlaceholder: string
  scheduleConfirm: string
  scheduleChange: string
  scheduleSuccess: string
  scheduleSuccessDesc: string

  // Dashboard
  dashboardLabel: string
  welcomeBack: string
  projectsStatus: string
  overview: string
  myProjects: string
  messages: string
  documents: string
  billing: string
  support: string
  bookConsultation: string
  logout: string
  activeProjects: string
  pendingDeliverables: string
  unreadMessages: string
  upcomingMilestones: string
  financialSummary: string
  paid: string
  pending: string
  totalInvoiced: string
  recentProjects: string
  recentActivity: string
  viewAll: string
  quickActions: string
  viewInvoices: string
  sendMessage: string
  viewTimeline: string
  search: string
  notifications: string
  noNotifications: string
  inProgress: string
  review: string
  completed: string
  planning: string
  
  // Documents Page
  documentsTitle: string
  documentsSubtitle: string
  searchDocuments: string
  upload: string
  preview: string
  download: string
  all: string
  contract: string
  proposal: string
  deliverable: string
  report: string
  uploaded: string
  noDocumentsFound: string
  
  // Messages Page
  messagesTitle: string
  messagesSubtitle: string
  searchMessages: string
  unread: string
  typeYourReply: string
  selectMessageToView: string
  
  // My Projects Page
  myProjectsTitle: string
  myProjectsSubtitle: string
  progress: string
  spent: string
  trackAndManage: string
  
  // Billing Page
  billingTitle: string
  billingSubtitle: string
  overdue: string
  invoices: string
  paymentMethods: string
  addMethod: string
  default: string
  invoice: string
  project: string
  amount: string
  issueDate: string
  dueDate: string
  status: string
  actions: string
  
  // Support Page
  supportTitle: string
  supportSubtitle: string
  newSupportTicket: string
  yourTickets: string
  frequentlyAskedQuestions: string
  subject: string
  category: string
  priority: string
  description: string
  cancel: string
  submitTicket: string
  lastUpdated: string
  technical: string
  general: string
  account: string
  low: string
  medium: string
  high: string
  open: string
  resolved: string
  closed: string
  priorityLabel: string
  
  // FAQ
  faq1Question: string
  faq1Answer: string
  faq2Question: string
  faq2Answer: string
  faq3Question: string
  faq3Answer: string
  faq4Question: string
  faq4Answer: string
  
  // Book Consultation Page
  bookConsultationTitle: string
  bookConsultationSubtitle: string
  selectConsultationType: string
  selectDateTime: string
  additionalNotes: string
  discoveryCall: string
  discoveryCallDesc: string
  strategySession: string
  strategySessionDesc: string
  technicalReview: string
  technicalReviewDesc: string
  availableTimes: string
  selectDateToSeeTimes: string
  bookButton: string
  consultationBooked: string
  confirmationEmailSent: string
  done: string
  minutes: string
}

const translations: Record<Language, Translations> = {
  en: {
    navProjects: 'Projects',
    navPortfolio: 'Portfolio',
    navAbout: 'Process',
    navServices: 'Services',
    navContact: 'Contact',
    navBook: 'Get Started',
    navLogin: 'Login',
    
    heroTag: 'Technology Venture Studio',
    heroTitle: 'Building Tomorrow\'s Technology',
    heroTitle1: 'TECHNOLOGY',
    heroTitle2: 'VENTURE',
    heroTitle3: 'STUDIO',
    heroSubtitle: 'We identify, build, and scale promising technology projects across AI, IoT, software, and automation.',
    heroCTA: 'View Our Work',
    heroSecondary: 'Get in Touch',
    soundOn: 'Sound On',
    
    portfolioTag: 'Our Work',
    portfolioTitle: 'Featured Projects',
    portfolioSubtitle: 'We build, grow, and support technology projects across AI, IoT, software, and automation.',
    portfolioLatest: 'Featured',
    portfolioIndustry: 'Industry',
    portfolioStyle: 'Technology',
    portfolioTone: 'Focus',
    portfolioFormat: 'Approach',
    project1Title: 'AI Analytics Platform',
    project1Desc: 'Enterprise-grade analytics powered by machine learning',
    project2Title: 'Smart Factory IoT',
    project2Desc: 'Connected manufacturing with real-time monitoring',
    project3Title: 'Cloud Infrastructure',
    project3Desc: 'Scalable microservices architecture',
    project4Title: 'Process Automation',
    project4Desc: 'End-to-end workflow automation',
    project5Title: 'Predictive Maintenance',
    project5Desc: 'AI-driven equipment monitoring',
    project6Title: 'Smart Building System',
    project6Desc: 'Intelligent building management',
    categoryAI: 'AI',
    categoryIoT: 'IoT',
    categorySoftware: 'Software',
    categoryAutomation: 'Automation',
    
    aboutTag: 'Our Process',
    aboutTitle: 'How We Build Success',
    aboutSubtitle: 'Our proven methodology for technology ventures',
    step1Title: 'Discovery & Analysis',
    step1Desc: 'Deep market research and opportunity identification',
    step2Title: 'Strategy & Planning',
    step2Desc: 'Technology roadmap and resource allocation',
    step3Title: 'Development & Build',
    step3Desc: 'Agile development with cutting-edge technologies',
    step4Title: 'Launch & Scale',
    step4Desc: 'Market entry and growth acceleration',
    step5Title: 'Optimize & Grow',
    step5Desc: 'Continuous improvement and expansion',
    stat1: 'Projects Delivered',
    stat2: 'Years Experience',
    stat3: 'Tech Partners',
    stat4: 'Support',
    
    servicesTag: 'What We Offer',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive technology venture support',
    service1Title: 'AI Solutions',
    service1Desc: 'Custom artificial intelligence and machine learning solutions for businesses.',
    service2Title: 'IoT Development',
    service2Desc: 'Connected devices and smart systems that transform operations.',
    service3Title: 'Software Engineering',
    service3Desc: 'Scalable software solutions built with modern architectures.',
    service4Title: 'Automation Systems',
    service4Desc: 'Process automation to increase efficiency and reduce costs.',
    service5Title: 'Venture Building',
    service5Desc: 'Launching and scaling technology startups from concept to market.',
    service6Title: 'Tech Consulting',
    service6Desc: 'Strategic guidance for complex technology decisions.',
    
    contactTag: "Let's Connect",
    contactTitle: 'Ready to Build the Future?',
    contactSubtitle: 'Get in touch to discuss your technology project.',
    contactEmail: 'Email Us',
    contactSchedule: 'Schedule a Call',
    contactEmailLabel: 'Send us an email',
    contactEmailTitle: 'Send Us an Email',
    contactEmailDesc: 'Share your project details and we\'ll get back to you within 24 hours.',
    contactEmailAction: 'Send Email',
    contactScheduleTitle: 'Schedule a Call',
    contactScheduleDesc: 'Book a free consultation to discuss your technology needs.',
    contactScheduleAction: 'Book Now',
    contactProjectDiscussion: 'Project Discussion',
    contactProjectDesc: 'Share your vision and requirements with our team',
    contactCustomStrategy: 'Custom Strategy',
    contactStrategyDesc: 'Get a tailored approach for your unique project',
    contactNextSteps: 'Next Steps',
    contactNextStepsDesc: 'Clear timeline and roadmap to bring your idea to life',
    
    footerDescription: 'Managing, building, and growing technology projects across AI, IoT, software, automation, and emerging technologies.',
    footerDesc: 'Managing, building, and growing technology projects across AI, IoT, software, automation, and emerging technologies.',
    footerTechnologies: 'Technologies We Use',
    footerTech: 'Technologies',
    footerTechDescription: 'We leverage cutting-edge technologies to deliver innovative solutions.',
    footerRights: 'All rights reserved.',
    footerTagline: 'Building the future of technology',
    footerConnect: 'Connect',
    techAI: 'Artificial Intelligence',
    techIoT: 'Internet of Things',
    techSoftware: 'Software Development',
    techAutomation: 'Automation',
    techEmerging: 'Emerging Technologies',
    
    // Schedule Modal
    scheduleModalTag: 'Free Consultation',
    scheduleModalTitle: 'Schedule a Call',
    scheduleModalSubtitle: 'Book a 30-minute consultation to discuss your project',
    scheduleSelectDate: 'Select a Date',
    scheduleSelectTime: 'Select a Time',
    scheduleContinue: 'Continue',
    scheduleName: 'Your Name',
    scheduleNamePlaceholder: 'Enter your full name',
    scheduleEmail: 'Email Address',
    scheduleEmailPlaceholder: 'Enter your email',
    schedulePhone: 'Phone Number (Optional)',
    schedulePhonePlaceholder: 'Enter your phone number',
    scheduleMessage: 'Tell us about your project (Optional)',
    scheduleMessagePlaceholder: 'Briefly describe what you\'d like to discuss...',
    scheduleConfirm: 'Confirm Booking',
    scheduleChange: 'Change',
    scheduleSuccess: 'Booking Confirmed!',
    scheduleSuccessDesc: 'We\'ll send you a confirmation email shortly.',

    // Dashboard
    dashboardLabel: 'Dashboard',
    welcomeBack: 'Welcome back',
    projectsStatus: "Here's what's happening with your projects",
    overview: 'Overview',
    myProjects: 'My Projects',
    messages: 'Messages',
    documents: 'Documents',
    billing: 'Billing',
    support: 'Support',
    bookConsultation: 'Book Consultation',
    logout: 'Logout',
    activeProjects: 'Active Projects',
    pendingDeliverables: 'Pending Deliverables',
    unreadMessages: 'Unread Messages',
    upcomingMilestones: 'Upcoming Milestones',
    financialSummary: 'Financial Summary',
    paid: 'Paid',
    pending: 'Pending',
    totalInvoiced: 'Total Invoiced',
    recentProjects: 'Recent Projects',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    quickActions: 'Quick Actions',
    viewInvoices: 'View Invoices',
    sendMessage: 'Send Message',
    viewTimeline: 'View Timeline',
    search: 'Search',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    inProgress: 'In Progress',
    review: 'Review',
    completed: 'Completed',
    planning: 'Planning',
    
    // Documents Page
    documentsTitle: 'Documents',
    documentsSubtitle: 'Access all your contracts, proposals, and deliverables',
    searchDocuments: 'Search documents...',
    upload: 'Upload',
    preview: 'Preview',
    download: 'Download',
    all: 'All',
    contract: 'Contract',
    proposal: 'Proposal',
    deliverable: 'Deliverable',
    report: 'Report',
    uploaded: 'Uploaded',
    noDocumentsFound: 'No documents found',
    
    // Messages Page
    messagesTitle: 'Messages',
    messagesSubtitle: 'Stay connected with your project team',
    searchMessages: 'Search messages...',
    unread: 'Unread',
    typeYourReply: 'Type your reply...',
    selectMessageToView: 'Select a message to view',
    
    // My Projects Page
    myProjectsTitle: 'My Projects',
    myProjectsSubtitle: 'Track and manage all your ventures with Constarva',
    progress: 'Progress',
    spent: 'spent',
    trackAndManage: 'Track and manage',
    
    // Billing Page
    billingTitle: 'Billing',
    billingSubtitle: 'Manage your invoices and payments',
    overdue: 'Overdue',
    invoices: 'Invoices',
    paymentMethods: 'Payment Methods',
    addMethod: 'Add Method',
    default: 'Default',
    invoice: 'Invoice',
    project: 'Project',
    amount: 'Amount',
    issueDate: 'Issue Date',
    dueDate: 'Due Date',
    status: 'Status',
    actions: 'Actions',
    
    // Support Page
    supportTitle: 'Support',
    supportSubtitle: 'Get help and submit support tickets',
    newSupportTicket: 'New Support Ticket',
    yourTickets: 'Your Tickets',
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    subject: 'Subject',
    category: 'Category',
    priority: 'Priority',
    description: 'Description',
    cancel: 'Cancel',
    submitTicket: 'Submit Ticket',
    lastUpdated: 'Last updated',
    technical: 'Technical',
    general: 'General',
    account: 'Account',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    open: 'Open',
    resolved: 'Resolved',
    closed: 'Closed',
    priorityLabel: 'Priority',
    
    // FAQ
    faq1Question: 'How do I track my project progress?',
    faq1Answer: 'Navigate to "My Projects" from the sidebar. Each project card shows the current progress percentage, status, and upcoming milestones. Click on any project for detailed information.',
    faq2Question: 'How can I download my invoices?',
    faq2Answer: 'Go to the "Billing" section from the sidebar. You\'ll see a list of all your invoices with their status. Click the download button next to any invoice to get a PDF copy.',
    faq3Question: 'How do I communicate with my project team?',
    faq3Answer: 'Use the "Messages" section to view and send messages to your project team. You can filter messages by project and see all communication history in one place.',
    faq4Question: 'How do I book a consultation?',
    faq4Answer: 'Click the "Book Consultation" button in the sidebar. Select your preferred date and time slot, choose the consultation type, and add any notes.',
    
    // Book Consultation Page
    bookConsultationTitle: 'Book Consultation',
    bookConsultationSubtitle: 'Schedule a meeting with our team',
    selectConsultationType: 'Select Consultation Type',
    selectDateTime: 'Select Date & Time',
    additionalNotes: 'Additional Notes (Optional)',
    discoveryCall: 'Discovery Call',
    discoveryCallDesc: 'Explore new project opportunities',
    strategySession: 'Strategy Session',
    strategySessionDesc: 'Deep dive into project planning',
    technicalReview: 'Technical Review',
    technicalReviewDesc: 'Review technical specifications',
    availableTimes: 'Available Times',
    selectDateToSeeTimes: 'Select a date to see available times',
    bookButton: 'Book Consultation',
    consultationBooked: 'Consultation Booked!',
    confirmationEmailSent: 'You will receive a confirmation email with meeting details shortly.',
    done: 'Done',
    minutes: 'min',
  },
  ar: {
    navProjects: 'المشاريع',
    navPortfolio: 'الأعمال',
    navAbout: 'العملية',
    navServices: 'الخدمات',
    navContact: 'تواصل',
    navBook: 'ابدأ الآن',
    navLogin: 'تسجيل الدخول',
    
    heroTag: 'استوديو المشاريع التقنية',
    heroTitle: 'نبني تقنيات الغد',
    heroTitle1: 'استوديو',
    heroTitle2: 'المشاريع',
    heroTitle3: 'التقنية',
    heroSubtitle: 'نكتشف ونبني ونوسع المشاريع التقنية الواعدة في مجالات الذكاء الاصطناعي وإنترنت الأشياء والبرمجيات والأتمتة.',
    heroCTA: 'شاهد أعمالنا',
    heroSecondary: 'تواصل معنا',
    soundOn: 'تشغيل الصوت',
    
    portfolioTag: 'أعمالنا',
    portfolioTitle: 'المشاريع المميزة',
    portfolioSubtitle: 'نبني وننمي وندعم المشاريع التقنية في مجالات الذكاء الاصطناعي وإنترنت الأشياء والبرمجيات والأتمتة.',
    portfolioLatest: 'مميز',
    portfolioIndustry: 'القطاع',
    portfolioStyle: 'التقنية',
    portfolioTone: 'التركيز',
    portfolioFormat: 'النهج',
    project1Title: 'منصة تحليلات الذكاء الاصطناعي',
    project1Desc: 'تحليلات مؤسسية مدعومة بالتعلم الآلي',
    project2Title: 'إنترنت الأشياء للمصانع الذكية',
    project2Desc: 'تصنيع متصل مع مراقبة فورية',
    project3Title: 'البنية التحتية السحابية',
    project3Desc: 'هندسة خدمات مصغرة قابلة للتوسع',
    project4Title: 'أتمتة العمليات',
    project4Desc: 'أتمتة سير العمل الشاملة',
    project5Title: 'الصيانة التنبؤية',
    project5Desc: 'مراقبة المعدات بالذكاء الاصطناعي',
    project6Title: 'نظام المباني الذكية',
    project6Desc: 'إدارة المباني الذكية',
    categoryAI: 'الذكاء الاصطناعي',
    categoryIoT: 'إنترنت الأشياء',
    categorySoftware: 'البرمجيات',
    categoryAutomation: 'الأتمتة',
    
    aboutTag: 'عمليتنا',
    aboutTitle: 'كيف نبني النجاح',
    aboutSubtitle: 'منهجيتنا المثبتة للمشاريع التقنية',
    step1Title: 'الاكتشاف والتحليل',
    step1Desc: 'بحث سوقي عميق وتحديد الفرص',
    step2Title: 'الاستراتيجية والتخطيط',
    step2Desc: 'خارطة طريق تقنية وتخصيص الموارد',
    step3Title: 'التطوير والبناء',
    step3Desc: 'تطوير مرن بأحدث التقنيات',
    step4Title: 'الإطلاق والتوسع',
    step4Desc: 'دخول السوق وتسريع النمو',
    step5Title: 'التحسين والنمو',
    step5Desc: 'تحسين مستمر وتوسع',
    stat1: 'مشروع منجز',
    stat2: 'سنوات خبرة',
    stat3: 'شركاء تقنيين',
    stat4: 'دعم',
    
    servicesTag: 'ما نقدمه',
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'دعم شامل للمشاريع التقنية',
    service1Title: 'حلول الذكاء الاصطناعي',
    service1Desc: 'حلول ذكاء اصطناعي وتعلم آلي مخصصة للأعمال.',
    service2Title: 'تطوير إنترنت الأشياء',
    service2Desc: 'أجهزة متصلة وأنظمة ذكية تحول العمليات.',
    service3Title: 'هندسة البرمجيات',
    service3Desc: 'حلول برمجية قابلة للتوسع بهندسة حديثة.',
    service4Title: 'أنظمة الأتمتة',
    service4Desc: 'أتمتة العمليات لزيادة الكفاءة وتقليل التكاليف.',
    service5Title: 'بناء المشاريع',
    service5Desc: 'إطلاق وتوسيع الشركات التقنية الناشئة من الفكرة إلى السوق.',
    service6Title: 'الاستشارات التقنية',
    service6Desc: 'توجيه استراتيجي للقرارات التقنية المعقدة.',
    
    contactTag: 'تواصل معنا',
    contactTitle: 'مستعد لبناء المستقبل؟',
    contactSubtitle: 'تواصل معنا لمناقشة مشروعك التقني.',
    contactEmail: 'راسلنا',
    contactSchedule: 'حدد موعداً',
    contactEmailLabel: 'أرسل لنا بريداً إلكترونياً',
    contactEmailTitle: 'أرسل لنا بريداً',
    contactEmailDesc: 'شارك تفاصيل مشروعك وسنرد خلال 24 ساعة.',
    contactEmailAction: 'أرسل الآن',
    contactScheduleTitle: 'حدد موعداً',
    contactScheduleDesc: 'احجز استشارة مجانية لمناقشة احتياجاتك التقنية.',
    contactScheduleAction: 'احجز الآن',
    contactProjectDiscussion: 'مناقشة المشروع',
    contactProjectDesc: 'شارك رؤيتك ومتطلباتك مع فريقنا',
    contactCustomStrategy: 'استراتيجية مخصصة',
    contactStrategyDesc: 'احصل على نهج مصمم لمشروعك الفريد',
    contactNextSteps: 'الخطوات التالية',
    contactNextStepsDesc: 'جدول زمني واضح وخارطة طريق لتحقيق فكرتك',
    
    footerDescription: 'إدارة وبناء وتنمية المشاريع التقنية في مجالات الذكاء الاصطناعي وإنترنت الأشياء والبرمجيات والأتمتة والتقنيات الناشئة.',
    footerDesc: 'إدارة وبناء وتنمية المشاريع التقنية في مجالات الذكاء الاصطناعي وإنترنت الأشياء والبرمجيات والأتمتة.',
    footerTechnologies: 'التقنيات التي نستخدمها',
    footerTech: 'التقنيات',
    footerTechDescription: 'نستخدم أحدث التقنيات لتقديم حلول مبتكرة.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerTagline: 'نبني مستقبل التقنية',
    footerConnect: 'تواصل',
    techAI: 'الذكاء الاصطناعي',
    techIoT: 'إنترنت الأشياء',
    techSoftware: 'تطوير البرمجيات',
    techAutomation: 'الأتمتة',
    techEmerging: 'التقنيات الناشئة',
    
    // Schedule Modal
    scheduleModalTag: 'استشارة مجانية',
    scheduleModalTitle: 'حدد موعد مكالمة',
    scheduleModalSubtitle: 'احجز استشارة لمدة 30 دقيقة لمناقشة مشروعك',
    scheduleSelectDate: 'اختر التاريخ',
    scheduleSelectTime: 'اختر الوقت',
    scheduleContinue: 'متابعة',
    scheduleName: 'اسمك',
    scheduleNamePlaceholder: 'أدخل اسمك الكامل',
    scheduleEmail: 'البريد الإلكتروني',
    scheduleEmailPlaceholder: 'أدخل بريدك الإلكتروني',
    schedulePhone: 'رقم الهاتف (اختياري)',
    schedulePhonePlaceholder: 'أدخل رقم هاتفك',
    scheduleMessage: 'أخبرنا عن مشروعك (اختياري)',
    scheduleMessagePlaceholder: 'صف بإيجاز ما تود مناقشته...',
    scheduleConfirm: 'تأكيد الحجز',
    scheduleChange: 'تغيير',
    scheduleSuccess: 'تم تأكيد الحجز!',
    scheduleSuccessDesc: 'سنرسل لك بريد تأكيد قريباً.',

    // Dashboard
    dashboardLabel: 'لوحة التحكم',
    welcomeBack: 'مرحباً بعودتك',
    projectsStatus: 'إليك آخر مستجدات مشاريعك',
    overview: 'نظرة عامة',
    myProjects: 'مشاريعي',
    messages: 'الرسائل',
    documents: 'المستندات',
    billing: 'الفواتير',
    support: 'الدعم',
    bookConsultation: 'حجز استشارة',
    logout: 'تسجيل الخروج',
    activeProjects: 'المشاريع النشطة',
    pendingDeliverables: 'التسليمات المعلقة',
    unreadMessages: 'الرسائل غير المقروءة',
    upcomingMilestones: 'المراحل القادمة',
    financialSummary: 'الملخص المالي',
    paid: 'مدفوع',
    pending: 'معلق',
    totalInvoiced: 'إجمالي الفواتير',
    recentProjects: 'المشاريع الأخيرة',
    recentActivity: 'النشاط الأخير',
    viewAll: 'عرض الكل',
    quickActions: 'إجراءات سريعة',
    viewInvoices: 'عرض الفواتير',
    sendMessage: 'إرسال رسالة',
    viewTimeline: 'عرض الجدول الزمني',
    search: 'بحث',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    inProgress: 'قيد التنفيذ',
    review: 'قيد المراجعة',
    completed: 'مكتمل',
    planning: 'التخطيط',
    
    // Documents Page
    documentsTitle: 'المستندات',
    documentsSubtitle: 'الوصول إلى جميع العقود والمقترحات والتسليمات',
    searchDocuments: 'البحث في المستندات...',
    upload: 'رفع',
    preview: 'معاينة',
    download: 'تحميل',
    all: 'الكل',
    contract: 'عقد',
    proposal: 'مقترح',
    deliverable: 'تسليم',
    report: 'تقرير',
    uploaded: 'تم الرفع',
    noDocumentsFound: 'لم يتم العثور على مستندات',
    
    // Messages Page
    messagesTitle: 'الرسائل',
    messagesSubtitle: 'ابق على تواصل مع فريق مشروعك',
    searchMessages: 'البحث في الرسائل...',
    unread: 'غير مقروء',
    typeYourReply: 'اكتب ردك...',
    selectMessageToView: 'اختر رسالة لعرضها',
    
    // My Projects Page
    myProjectsTitle: 'مشاريعي',
    myProjectsSubtitle: 'تتبع وإدارة جميع مشاريعك مع كونستارفا',
    progress: 'التقدم',
    spent: 'منفق',
    trackAndManage: 'تتبع وإدارة',
    
    // Billing Page
    billingTitle: 'الفواتير',
    billingSubtitle: 'إدارة فواتيرك ومدفوعاتك',
    overdue: 'متأخر',
    invoices: 'الفواتير',
    paymentMethods: 'طرق الدفع',
    addMethod: 'إضافة طريقة',
    default: 'افتراضي',
    invoice: 'فاتورة',
    project: 'المشروع',
    amount: 'المبلغ',
    issueDate: 'تاريخ الإصدار',
    dueDate: 'تاريخ الاستحقاق',
    status: 'الحالة',
    actions: 'الإجراءات',
    
    // Support Page
    supportTitle: 'الدعم',
    supportSubtitle: 'احصل على المساعدة وأرسل تذاكر الدعم',
    newSupportTicket: 'تذكرة دعم جديدة',
    yourTickets: 'تذاكرك',
    frequentlyAskedQuestions: 'الأسئلة الشائعة',
    subject: 'الموضوع',
    category: 'الفئة',
    priority: 'الأولوية',
    description: 'الوصف',
    cancel: 'إلغاء',
    submitTicket: 'إرسال التذكرة',
    lastUpdated: 'آخر تحديث',
    technical: 'تقني',
    general: 'عام',
    account: 'الحساب',
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    open: 'مفتوح',
    resolved: 'تم الحل',
    closed: 'مغلق',
    priorityLabel: 'الأولوية',
    
    // FAQ
    faq1Question: 'كيف أتابع تقدم مشروعي؟',
    faq1Answer: 'انتقل إلى "مشاريعي" من الشريط الجانبي. تعرض كل بطاقة مشروع نسبة التقدم الحالية والحالة والمراحل القادمة. انقر على أي مشروع للحصول على معلومات تفصيلية.',
    faq2Question: 'كيف يمكنني تحميل فواتيري؟',
    faq2Answer: 'انتقل إلى قسم "الفواتير" من الشريط الجانبي. سترى قائمة بجميع فواتيرك مع حالتها. انقر على زر التحميل بجانب أي فاتورة للحصول على نسخة PDF.',
    faq3Question: 'كيف أتواصل مع فريق مشروعي؟',
    faq3Answer: 'استخدم قسم "الرسائل" لعرض وإرسال الرسائل إلى فريق مشروعك. يمكنك تصفية الرسائل حسب المشروع ورؤية جميع سجلات التواصل في مكان واحد.',
    faq4Question: 'كيف أحجز استشارة؟',
    faq4Answer: 'انقر على زر "حجز استشارة" في الشريط الجانبي. اختر التاريخ والوقت المفضل لديك، واختر نوع الاستشارة، وأضف أي ملاحظات.',
    
    // Book Consultation Page
    bookConsultationTitle: 'حجز استشارة',
    bookConsultationSubtitle: 'جدولة اجتماع مع فريقنا',
    selectConsultationType: 'اختر نوع الاستشارة',
    selectDateTime: 'اختر التاريخ والوقت',
    additionalNotes: 'ملاحظات إضافية (اختياري)',
    discoveryCall: 'مكالمة استكشافية',
    discoveryCallDesc: 'استكشف فرص المشاريع الجديدة',
    strategySession: 'جلسة استراتيجية',
    strategySessionDesc: 'تعمق في تخطيط المشروع',
    technicalReview: 'مراجعة تقنية',
    technicalReviewDesc: 'مراجعة المواصفات التقنية',
    availableTimes: 'الأوقات المتاحة',
    selectDateToSeeTimes: 'اختر تاريخًا لرؤية الأوقات المتاحة',
    bookButton: 'حجز الاستشارة',
    consultationBooked: 'تم حجز الاستشارة!',
    confirmationEmailSent: 'ستتلقى بريدًا إلكترونيًا للتأكيد مع تفاصيل الاجتماع قريبًا.',
    done: 'تم',
    minutes: 'دقيقة',
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar'
  }
  
  return (
    <LanguageContext.Provider value={value}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
