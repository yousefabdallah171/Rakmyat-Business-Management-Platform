'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calculator,
  FolderOpen,
  MessageSquare,
  Settings,
  LogOut,
  Building,
  FileText,
  TrendingUp,
  Calendar,
  PieChart,
  Briefcase,
  Clock,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { t, direction } = useLanguage();
  const { user, logout, hasPermission } = useAuth();

  const navigation = [
    {
      title: t('nav.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      permission: 'dashboard.view',
    },
    {
      title: t('nav.employees'),
      href: '/employees',
      icon: Users,
      permission: 'employees.view',
      badge: '24',
    },
    {
      title: t('nav.hr'),
      href: '/hr',
      icon: UserCheck,
      permission: 'hr.view',
      children: [
        { title: t('hr.attendance'), href: '/hr/attendance', icon: Clock },
        { title: t('hr.payroll'), href: '/hr/payroll', icon: DollarSign },
        { title: t('hr.documents'), href: '/hr/documents', icon: FileText },
        { title: t('hr.leaves'), href: '/hr/leaves', icon: Calendar },
        { title: t('hr.performance'), href: '/hr/performance', icon: TrendingUp },
      ],
    },
    {
      title: t('nav.accounting'),
      href: '/accounting',
      icon: Calculator,
      permission: 'accounting.view',
      children: [
        { title: t('accounting.invoices'), href: '/accounting/invoices', icon: FileText },
        { title: t('accounting.expenses'), href: '/accounting/expenses', icon: DollarSign },
        { title: t('accounting.reports'), href: '/accounting/reports', icon: BarChart3 },
        { title: t('accounting.payments'), href: '/accounting/payments', icon: DollarSign },
        { title: t('accounting.taxes'), href: '/accounting/taxes', icon: PieChart },
      ],
    },
    {
      title: t('nav.projects'),
      href: '/projects',
      icon: FolderOpen,
      permission: 'projects.view',
      badge: '12',
      children: [
        { title: t('projects.kanban'), href: '/projects/kanban', icon: LayoutDashboard },
        { title: t('projects.calendar'), href: '/projects/calendar', icon: Calendar },
        { title: t('projects.tasks'), href: '/projects/tasks', icon: Briefcase },
        { title: t('projects.milestones'), href: '/projects/milestones', icon: TrendingUp },
      ],
    },
    {
      title: t('nav.chat'),
      href: '/chat',
      icon: MessageSquare,
      permission: 'chat.view',
      badge: '3',
    },
    {
      title: t('nav.settings'),
      href: '/settings',
      icon: Settings,
      permission: 'settings.view',
    },
  ];

  const filteredNavigation = navigation.filter(item => 
    hasPermission(item.permission)
  );

  return (
    <div className={cn('flex h-full w-64 flex-col bg-card border-r', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">Raqmena</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {user?.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredNavigation.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
              
              {item.children && pathname.startsWith(item.href) && (
                <div className={cn('ml-4 mt-1 space-y-1', direction === 'rtl' ? 'mr-4 ml-0' : '')}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors',
                        pathname === child.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <child.icon className="w-3 h-3" />
                      <span>{child.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4 mr-3" />
          {t('nav.logout')}
        </Button>
      </div>
    </div>
  );
}