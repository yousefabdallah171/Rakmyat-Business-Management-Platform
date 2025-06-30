'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Mail,
  Phone,
  MapPin,
  Building,
  Save,
  Upload,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    company: 'Raqmena Technologies',
    bio: 'Business management platform administrator',
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('nav.settings')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'إدارة إعدادات الحساب والنظام'
                : 'Manage your account and system preferences'
              }
            </p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              {language === 'ar' ? 'المظهر' : 'Appearance'}
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              {language === 'ar' ? 'الأمان' : 'Security'}
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Database className="w-4 h-4" />
              {language === 'ar' ? 'النظام' : 'System'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {language === 'ar' ? 'معلومات الملف الشخصي' : 'Profile Information'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'قم بتحديث معلومات ملفك الشخصي'
                    : 'Update your profile information and personal details'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      {language === 'ar' ? 'تحديث الصورة' : 'Upload Photo'}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' 
                        ? 'JPG أو PNG. الحد الأقصى 2MB'
                        : 'JPG or PNG. Max size 2MB'
                      }
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      {language === 'ar' ? 'الموقع' : 'Location'}
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      {language === 'ar' ? 'الشركة' : 'Company'}
                    </Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">
                      {language === 'ar' ? 'النبذة التعريفية' : 'Bio'}
                    </Label>
                    <Input
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Preferences'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'اختر كيف تريد أن تتلقى الإشعارات'
                    : 'Choose how you want to receive notifications'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'تلقي الإشعارات عبر البريد الإلكتروني'
                          : 'Receive notifications via email'
                        }
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        {language === 'ar' ? 'الإشعارات الفورية' : 'Push Notifications'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'تلقي الإشعارات الفورية في المتصفح'
                          : 'Receive push notifications in browser'
                        }
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        {language === 'ar' ? 'رسائل SMS' : 'SMS Notifications'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'تلقي الإشعارات عبر الرسائل النصية'
                          : 'Receive notifications via SMS'
                        }
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        {language === 'ar' ? 'إشعارات التسويق' : 'Marketing Notifications'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'تلقي إشعارات حول المنتجات والعروض'
                          : 'Receive notifications about products and offers'
                        }
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {language === 'ar' ? 'إعدادات المظهر' : 'Appearance Settings'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'تخصيص مظهر التطبيق'
                    : 'Customize the appearance of the application'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">
                      {language === 'ar' ? 'المظهر' : 'Theme'}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        onClick={() => setTheme('light')}
                        className="justify-start"
                      >
                        {language === 'ar' ? 'فاتح' : 'Light'}
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => setTheme('dark')}
                        className="justify-start"
                      >
                        {language === 'ar' ? 'داكن' : 'Dark'}
                      </Button>
                      <Button
                        variant={theme === 'system' ? 'default' : 'outline'}
                        onClick={() => setTheme('system')}
                        className="justify-start"
                      >
                        {language === 'ar' ? 'النظام' : 'System'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">
                      {language === 'ar' ? 'اللغة' : 'Language'}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        onClick={() => setLanguage('en')}
                        className="justify-start gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        English
                      </Button>
                      <Button
                        variant={language === 'ar' ? 'default' : 'outline'}
                        onClick={() => setLanguage('ar')}
                        className="justify-start gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        العربية
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'إدارة كلمة المرور وإعدادات الأمان'
                    : 'Manage your password and security settings'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <p>{language === 'ar' ? 'إعدادات الأمان قريباً' : 'Security settings coming soon'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  {language === 'ar' ? 'إعدادات النظام' : 'System Settings'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'إعدادات النظام والصيانة'
                    : 'System configuration and maintenance'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="w-12 h-12 mx-auto mb-4" />
                  <p>{language === 'ar' ? 'إعدادات النظام قريباً' : 'System settings coming soon'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}