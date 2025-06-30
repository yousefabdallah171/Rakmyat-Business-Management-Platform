'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calculator,
  FileText,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export default function AccountingPage() {
  const { t, language } = useLanguage();

  const accountingStats = [
    {
      title: language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: '$67,000',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+22%',
      trend: 'up',
    },
    {
      title: language === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses',
      value: '$45,000',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '+8%',
      trend: 'up',
    },
    {
      title: language === 'ar' ? 'صافي الربح' : 'Net Profit',
      value: '$22,000',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+15%',
      trend: 'up',
    },
    {
      title: language === 'ar' ? 'الفواتير المعلقة' : 'Pending Invoices',
      value: '12',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-3',
      trend: 'down',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 38000 },
    { month: 'Apr', revenue: 61000, expenses: 42000 },
    { month: 'May', revenue: 55000, expenses: 40000 },
    { month: 'Jun', revenue: 67000, expenses: 45000 },
  ];

  const expenseData = [
    { name: 'Salaries', value: 45, color: '#22c55e' },
    { name: 'Office Rent', value: 20, color: '#3b82f6' },
    { name: 'Utilities', value: 15, color: '#f59e0b' },
    { name: 'Marketing', value: 12, color: '#ef4444' },
    { name: 'Other', value: 8, color: '#8b5cf6' },
  ];

  const recentInvoices = [
    { id: 'INV-001', client: 'ABC Company', amount: '$5,500', status: 'paid', date: '2024-01-15' },
    { id: 'INV-002', client: 'XYZ Corp', amount: '$3,200', status: 'pending', date: '2024-01-14' },
    { id: 'INV-003', client: 'Tech Solutions', amount: '$7,800', status: 'overdue', date: '2024-01-10' },
    { id: 'INV-004', client: 'Digital Agency', amount: '$4,100', status: 'paid', date: '2024-01-12' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'مدفوع' : 'Paid'}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{language === 'ar' ? 'معلق' : 'Pending'}</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">{language === 'ar' ? 'متأخر' : 'Overdue'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('accounting.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إدارة الحسابات والمالية'
                : 'Manage accounts and finances'
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
              {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {accountingStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}
                  {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {language === 'ar' ? 'الإيرادات والمصروفات' : 'Revenue & Expenses'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                {language === 'ar' ? 'توزيع المصروفات' : 'Expense Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {expenseData.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: expense.color }}
                      />
                      <span>{expense.name}</span>
                    </div>
                    <span className="font-medium">{expense.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices" className="gap-2">
              <FileText className="w-4 h-4" />
              {t('accounting.invoices')}
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2">
              <DollarSign className="w-4 h-4" />
              {t('accounting.expenses')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              {t('accounting.reports')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {language === 'ar' ? 'الفواتير الأخيرة' : 'Recent Invoices'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'إدارة ومتابعة الفواتير'
                    : 'Manage and track invoices'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.client}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {language === 'ar' ? 'إدارة المصروفات' : 'Expense Management'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'تتبع وإدارة المصروفات'
                    : 'Track and manage expenses'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-4" />
                  <p>{language === 'ar' ? 'إدارة المصروفات قريباً' : 'Expense management coming soon'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {language === 'ar' ? 'التقارير المالية' : 'Financial Reports'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'تقارير مالية مفصلة'
                    : 'Detailed financial reports'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>{language === 'ar' ? 'التقارير المالية قريباً' : 'Financial reports coming soon'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}