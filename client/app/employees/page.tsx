'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  Clock,
} from 'lucide-react';

export default function EmployeesPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock employee data
  const employees = [
    {
      id: '1',
      name: 'Ahmad Al-Mansouri',
      email: 'ahmad@raqmena.com',
      phone: '+966 50 123 4567',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'active',
      joinDate: '2023-01-15',
      avatar: '',
      location: 'Riyadh, Saudi Arabia',
      lastLogin: '2024-01-15 09:30',
      salary: '$5,500',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@raqmena.com',
      phone: '+1 555 123 4567',
      department: 'Human Resources',
      position: 'HR Manager',
      status: 'active',
      joinDate: '2023-02-10',
      avatar: '',
      location: 'New York, USA',
      lastLogin: '2024-01-15 10:15',
      salary: '$6,000',
    },
    {
      id: '3',
      name: 'Mohammed Ibrahim',
      email: 'mohammed@raqmena.com',
      phone: '+966 55 987 6543',
      department: 'Accounting',
      position: 'Senior Accountant',
      status: 'active',
      joinDate: '2023-03-20',
      avatar: '',
      location: 'Jeddah, Saudi Arabia',
      lastLogin: '2024-01-15 08:45',
      salary: '$4,800',
    },
    {
      id: '4',
      name: 'Fatima Al-Zahra',
      email: 'fatima@raqmena.com',
      phone: '+966 50 555 7890',
      department: 'Marketing',
      position: 'Marketing Specialist',
      status: 'active',
      joinDate: '2023-04-05',
      avatar: '',
      location: 'Dammam, Saudi Arabia',
      lastLogin: '2024-01-14 16:20',
      salary: '$4,200',
    },
    {
      id: '5',
      name: 'John Smith',
      email: 'john@raqmena.com',
      phone: '+1 555 999 8888',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'inactive',
      joinDate: '2023-05-12',
      avatar: '',
      location: 'Los Angeles, USA',
      lastLogin: '2024-01-10 14:30',
      salary: '$3,800',
    },
  ];

  const departments = ['Engineering', 'Human Resources', 'Accounting', 'Marketing', 'Sales'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">{t('employees.active')}</Badge>;
      case 'inactive':
        return <Badge variant="secondary">{t('employees.inactive')}</Badge>;
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
              {t('employees.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إدارة وتتبع معلومات الموظفين'
                : 'Manage and track employee information'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t('employees.addNew')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'نشط' : 'Active'}: {employees.filter(e => e.status === 'active').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'الأقسام' : 'Departments'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'قسم نشط' : 'Active departments'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'الحضور اليوم' : 'Today\'s Attendance'}
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? '46/50 موظف' : '46/50 employees'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'المتأخرين' : 'Late Arrivals'}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'اليوم' : 'Today'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'ar' ? 'البحث والتصفية' : 'Search & Filter'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('employees.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('employees.department')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الأقسام' : 'All Departments'}
                  </SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('employees.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الحالات' : 'All Status'}
                  </SelectItem>
                  <SelectItem value="active">{t('employees.active')}</SelectItem>
                  <SelectItem value="inactive">{t('employees.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {language === 'ar' ? 'قائمة الموظفين' : 'Employee List'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? `إجمالي ${filteredEmployees.length} موظف`
                : `Total ${filteredEmployees.length} employees`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('employees.name')}</TableHead>
                    <TableHead>{t('employees.email')}</TableHead>
                    <TableHead>{t('employees.department')}</TableHead>
                    <TableHead>{t('employees.position')}</TableHead>
                    <TableHead>{t('employees.status')}</TableHead>
                    <TableHead>{language === 'ar' ? 'تاريخ الانضمام' : 'Join Date'}</TableHead>
                    <TableHead className="text-right">{t('employees.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {employee.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {employee.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{employee.department}</Badge>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(employee.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('employees.actions')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              {t('employees.view')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              {t('employees.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              {language === 'ar' ? 'اتصال' : 'Call'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              {language === 'ar' ? 'إرسال إيميل' : 'Send Email'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t('employees.delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}