'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  FolderOpen,
  DollarSign,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  MessageSquare,
  Plus,
  Eye,
  Download,
  BarChart3,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 38000 },
    { month: 'Apr', revenue: 61000, expenses: 42000 },
    { month: 'May', revenue: 55000, expenses: 40000 },
    { month: 'Jun', revenue: 67000, expenses: 45000 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35, color: '#22c55e' },
    { name: 'Sales', value: 25, color: '#3b82f6' },
    { name: 'Marketing', value: 20, color: '#f59e0b' },
    { name: 'HR', value: 12, color: '#ef4444' },
    { name: 'Finance', value: 8, color: '#8b5cf6' },
  ];

  const attendanceData = [
    { day: 'Mon', present: 95, absent: 5 },
    { day: 'Tue', present: 88, absent: 12 },
    { day: 'Wed', present: 92, absent: 8 },
    { day: 'Thu', present: 85, absent: 15 },
    { day: 'Fri', present: 78, absent: 22 },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'Created new project', target: 'Website Redesign', time: '2 hours ago', type: 'project' },
    { id: 2, user: 'Ahmed Ali', action: 'Submitted expense report', target: '$1,245.00', time: '4 hours ago', type: 'expense' },
    { id: 3, user: 'Mohammed Ibrahim', action: 'Completed task', target: 'Database Migration', time: '6 hours ago', type: 'task' },
    { id: 4, user: 'Fatima Al-Zahra', action: 'Approved leave request', target: 'John Doe - 3 days', time: '1 day ago', type: 'hr' },
  ];

  const quickActions = [
    { title: 'Add Employee', icon: Users, href: '/employees/new', color: 'bg-blue-500' },
    { title: 'Create Invoice', icon: DollarSign, href: '/accounting/invoices/new', color: 'bg-green-500' },
    { title: 'New Project', icon: FolderOpen, href: '/projects/new', color: 'bg-purple-500' },
    { title: 'Send Message', icon: MessageSquare, href: '/chat', color: 'bg-orange-500' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('dashboard.welcome')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? `مرحباً بك ${user?.name}، إليك نظرة عامة على عملك اليوم`
                : `Welcome back ${user?.name}, here's what's happening with your business today`
              }
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {language === 'ar' ? 'إضافة جديد' : 'Add New'}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dashboard-widget">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.totalEmployees')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </span>
                {language === 'ar' ? ' من الشهر الماضي' : ' from last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-widget">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.activeProjects')}
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8%
                </span>
                {language === 'ar' ? ' من الأسبوع الماضي' : ' from last week'}
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-widget">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.monthlyRevenue')}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$67,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +22%
                </span>
                {language === 'ar' ? ' من الشهر الماضي' : ' from last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-widget">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.pendingTasks')}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -5%
                </span>
                {language === 'ar' ? ' من الأمس' : ' from yesterday'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {language === 'ar' ? 'الإيرادات والمصروفات' : 'Revenue & Expenses'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'توزيع الموظفين' : 'Employee Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <span>{dept.name}</span>
                    </div>
                    <span className="font-medium">{dept.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'حضور الأسبوع' : 'Weekly Attendance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#22c55e" name="Present" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('dashboard.recentActivity')}
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  {language === 'ar' ? 'عرض الكل' : 'View All'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-muted-foreground">{activity.action}</span>
                      {' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions')}</CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'الإجراءات الأكثر استخداماً للوصول السريع'
                  : 'Most used actions for quick access'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-accent"
                    asChild
                  >
                    <a href={action.href}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'معدل الحضور' : 'Attendance Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">92%</div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'ar' ? 'هدف: 95%' : 'Target: 95%'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'رضا العملاء' : 'Customer Satisfaction'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">4.8/5</div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'ar' ? 'من 284 تقييم' : 'From 284 reviews'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'إنجاز المشاريع' : 'Project Completion'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">87%</div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'ar' ? 'في الوقت المحدد' : 'On time delivery'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}