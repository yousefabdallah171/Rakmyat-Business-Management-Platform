'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UserCheck,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Plus,
  Download,
  Filter,
} from 'lucide-react';

export default function HRPage() {
  const { t, language } = useLanguage();

  const hrStats = [
    {
      title: language === 'ar' ? 'إجمالي الموظفين' : 'Total Employees',
      value: '124',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
    },
    {
      title: language === 'ar' ? 'الحضور اليوم' : 'Today\'s Attendance',
      value: '92%',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+5%',
    },
    {
      title: language === 'ar' ? 'طلبات الإجازة' : 'Leave Requests',
      value: '8',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-2',
    },
    {
      title: language === 'ar' ? 'تقييمات الأداء' : 'Performance Reviews',
      value: '15',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+3',
    },
  ];

  const attendanceData = [
    { name: 'Ahmad Ali', department: 'Engineering', status: 'present', time: '09:00 AM' },
    { name: 'Sarah Johnson', department: 'HR', status: 'present', time: '08:45 AM' },
    { name: 'Mohammed Ibrahim', department: 'Accounting', status: 'late', time: '09:30 AM' },
    { name: 'Fatima Hassan', department: 'Marketing', status: 'absent', time: '-' },
    { name: 'John Smith', department: 'Sales', status: 'present', time: '08:30 AM' },
  ];

  const leaveRequests = [
    { name: 'Ahmad Ali', type: 'Annual Leave', dates: '2024-02-15 to 2024-02-20', status: 'pending' },
    { name: 'Sarah Johnson', type: 'Sick Leave', dates: '2024-02-10', status: 'approved' },
    { name: 'Mohammed Ibrahim', type: 'Personal Leave', dates: '2024-02-25', status: 'pending' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'حاضر' : 'Present'}</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">{language === 'ar' ? 'غائب' : 'Absent'}</Badge>;
      case 'late':
        return <Badge className="bg-orange-100 text-orange-800">{language === 'ar' ? 'متأخر' : 'Late'}</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'موافق عليه' : 'Approved'}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{language === 'ar' ? 'قيد المراجعة' : 'Pending'}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">{language === 'ar' ? 'مرفوض' : 'Rejected'}</Badge>;
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
              {t('hr.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إدارة الموارد البشرية والموظفين'
                : 'Manage human resources and employee affairs'
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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {hrStats.map((stat, index) => (
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
                  <span className="text-green-600">{stat.change}</span>
                  {' '}
                  {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance" className="gap-2">
              <UserCheck className="w-4 h-4" />
              {t('hr.attendance')}
            </TabsTrigger>
            <TabsTrigger value="leaves" className="gap-2">
              <Calendar className="w-4 h-4" />
              {t('hr.leaves')}
            </TabsTrigger>
            <TabsTrigger value="payroll" className="gap-2">
              <DollarSign className="w-4 h-4" />
              {t('hr.payroll')}
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('hr.performance')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  {language === 'ar' ? 'حضور اليوم' : 'Today\'s Attendance'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'نظرة عامة على حضور الموظفين اليوم'
                    : 'Overview of employee attendance for today'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-foreground">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{employee.time}</p>
                        </div>
                        {getStatusBadge(employee.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {language === 'ar' ? 'طلبات الإجازة' : 'Leave Requests'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'إدارة طلبات الإجازات والموافقات'
                    : 'Manage leave requests and approvals'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">{request.type}</p>
                        <p className="text-sm text-muted-foreground">{request.dates}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                        {request.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <AlertCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {language === 'ar' ? 'إدارة الرواتب' : 'Payroll Management'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'معالجة الرواتب والمكافآت'
                    : 'Process salaries and bonuses'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'إجمالي الرواتب الشهرية' : 'Total Monthly Payroll'}
                    </p>
                    <p className="text-2xl font-bold">$45,600</p>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'الرواتب المعالجة' : 'Processed Salaries'}
                    </p>
                    <p className="text-2xl font-bold">118/124</p>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {language === 'ar' ? 'تقييم الأداء' : 'Performance Reviews'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'تتبع وتقييم أداء الموظفين'
                    : 'Track and evaluate employee performance'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <p>{language === 'ar' ? 'تقييمات الأداء قريباً' : 'Performance reviews coming soon'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}