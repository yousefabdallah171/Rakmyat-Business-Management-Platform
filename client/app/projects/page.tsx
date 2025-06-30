'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { KanbanBoard } from '@/components/projects/kanban-board';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  FolderOpen,
  Plus,
  Calendar,
  BarChart3,
  Clock,
  Users,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function ProjectsPage() {
  const { t, language } = useLanguage();

  const projectStats = [
    {
      title: language === 'ar' ? 'المشاريع النشطة' : 'Active Projects',
      value: '23',
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: language === 'ar' ? 'المهام المكتملة' : 'Completed Tasks',
      value: '184',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: language === 'ar' ? 'المهام المتأخرة' : 'Overdue Tasks',
      value: '12',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: language === 'ar' ? 'أعضاء الفريق' : 'Team Members',
      value: '47',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete redesign of company website',
      status: 'in-progress',
      progress: 65,
      team: ['John Doe', 'Sarah Wilson', 'Mike Johnson'],
      deadline: '2024-02-15',
      priority: 'high',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'iOS and Android app for customer portal',
      status: 'planning',
      progress: 15,
      team: ['Ahmad Ali', 'Fatima Hassan'],
      deadline: '2024-03-20',
      priority: 'medium',
    },
    {
      id: 3,
      name: 'Database Migration',
      description: 'Migrate legacy database to new system',
      status: 'completed',
      progress: 100,
      team: ['Mohammed Ibrahim', 'Ali Rashid'],
      deadline: '2024-01-10',
      priority: 'high',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'مكتمل' : 'Completed'}</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</Badge>;
      case 'planning':
        return <Badge className="bg-yellow-100 text-yellow-800">{language === 'ar' ? 'تخطيط' : 'Planning'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">{language === 'ar' ? 'عالي' : 'High'}</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">{language === 'ar' ? 'متوسط' : 'Medium'}</Badge>;
      case 'low':
        return <Badge variant="secondary">{language === 'ar' ? 'منخفض' : 'Low'}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('projects.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إدارة المشاريع والمهام بكفاءة'
                : 'Manage projects and tasks efficiently'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              {language === 'ar' ? 'التقويم' : 'Calendar'}
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {language === 'ar' ? 'مشروع جديد' : 'New Project'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {projectStats.map((stat, index) => (
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
                  {language === 'ar' ? 'من الشهر الماضي' : 'From last month'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="kanban" className="space-y-4">
          <TabsList>
            <TabsTrigger value="kanban" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              {t('projects.kanban')}
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              {language === 'ar' ? 'قائمة المشاريع' : 'Project List'}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="w-4 h-4" />
              {t('projects.calendar')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-4">
            <KanbanBoard />
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        {getStatusBadge(project.status)}
                        {getPriorityBadge(project.priority)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'أعضاء الفريق:' : 'Team:'}
                          </span>
                          <div className="flex -space-x-2">
                            {project.team.map((member, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-background"
                                title={member}
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('projects.calendar')}</CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'عرض المشاريع والمهام في التقويم'
                    : 'View projects and tasks in calendar format'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4" />
                    <p>{language === 'ar' ? 'تقويم المشاريع قريباً' : 'Project calendar coming soon'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}