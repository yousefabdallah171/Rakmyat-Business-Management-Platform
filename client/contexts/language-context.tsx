'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Employees',
    'nav.hr': 'Human Resources',
    'nav.accounting': 'Accounting',
    'nav.projects': 'Projects',
    'nav.chat': 'Chat',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Raqmena',
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.activeProjects': 'Active Projects',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.pendingTasks': 'Pending Tasks',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    
    // Employees
    'employees.title': 'Employee Management',
    'employees.addNew': 'Add New Employee',
    'employees.search': 'Search employees...',
    'employees.name': 'Name',
    'employees.email': 'Email',
    'employees.department': 'Department',
    'employees.position': 'Position',
    'employees.status': 'Status',
    'employees.actions': 'Actions',
    'employees.active': 'Active',
    'employees.inactive': 'Inactive',
    'employees.edit': 'Edit',
    'employees.delete': 'Delete',
    'employees.view': 'View',
    
    // HR
    'hr.title': 'Human Resources',
    'hr.attendance': 'Attendance',
    'hr.payroll': 'Payroll',
    'hr.documents': 'Documents',
    'hr.leaves': 'Leave Requests',
    'hr.performance': 'Performance',
    
    // Accounting
    'accounting.title': 'Accounting',
    'accounting.invoices': 'Invoices',
    'accounting.expenses': 'Expenses',
    'accounting.reports': 'Reports',
    'accounting.payments': 'Payments',
    'accounting.taxes': 'Taxes',
    
    // Projects
    'projects.title': 'Project Management',
    'projects.kanban': 'Kanban Board',
    'projects.calendar': 'Calendar',
    'projects.gantt': 'Gantt Chart',
    'projects.tasks': 'Tasks',
    'projects.milestones': 'Milestones',
    
    // Chat
    'chat.title': 'Team Chat',
    'chat.online': 'Online',
    'chat.offline': 'Offline',
    'chat.typing': 'typing...',
    'chat.sendMessage': 'Send message',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.error': 'An error occurred',
    'common.success': 'Operation successful',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.employees': 'الموظفون',
    'nav.hr': 'الموارد البشرية',
    'nav.accounting': 'المحاسبة',
    'nav.projects': 'المشاريع',
    'nav.chat': 'المحادثات',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بك في رقمنا',
    'dashboard.totalEmployees': 'إجمالي الموظفين',
    'dashboard.activeProjects': 'المشاريع النشطة',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.pendingTasks': 'المهام المعلقة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.quickActions': 'الإجراءات السريعة',
    
    // Employees
    'employees.title': 'إدارة الموظفين',
    'employees.addNew': 'إضافة موظف جديد',
    'employees.search': 'البحث عن موظفين...',
    'employees.name': 'الاسم',
    'employees.email': 'البريد الإلكتروني',
    'employees.department': 'القسم',
    'employees.position': 'المنصب',
    'employees.status': 'الحالة',
    'employees.actions': 'الإجراءات',
    'employees.active': 'نشط',
    'employees.inactive': 'غير نشط',
    'employees.edit': 'تعديل',
    'employees.delete': 'حذف',
    'employees.view': 'عرض',
    
    // HR
    'hr.title': 'الموارد البشرية',
    'hr.attendance': 'الحضور',
    'hr.payroll': 'الرواتب',
    'hr.documents': 'الوثائق',
    'hr.leaves': 'طلبات الإجازة',
    'hr.performance': 'الأداء',
    
    // Accounting
    'accounting.title': 'المحاسبة',
    'accounting.invoices': 'الفواتير',
    'accounting.expenses': 'المصروفات',
    'accounting.reports': 'التقارير',
    'accounting.payments': 'المدفوعات',
    'accounting.taxes': 'الضرائب',
    
    // Projects
    'projects.title': 'إدارة المشاريع',
    'projects.kanban': 'لوحة المهام',
    'projects.calendar': 'التقويم',
    'projects.gantt': 'مخطط جانت',
    'projects.tasks': 'المهام',
    'projects.milestones': 'المعالم',
    
    // Chat
    'chat.title': 'محادثة الفريق',
    'chat.online': 'متصل',
    'chat.offline': 'غير متصل',
    'chat.typing': 'يكتب...',
    'chat.sendMessage': 'إرسال رسالة',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.loading': 'جار التحميل...',
    'common.noData': 'لا توجد بيانات متاحة',
    'common.error': 'حدث خطأ',
    'common.success': 'تمت العملية بنجاح',
    'common.confirm': 'تأكيد',
    'common.yes': 'نعم',
    'common.no': 'لا',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ar'>('en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Set document direction and font
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Apply font family based on language
    if (language === 'ar') {
      document.body.style.fontFamily = 'var(--font-tajawal), sans-serif';
    } else {
      document.body.style.fontFamily = 'var(--font-inter), sans-serif';
    }
  }, [language, direction]);

  const setLanguage = (lang: 'en' | 'ar') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}