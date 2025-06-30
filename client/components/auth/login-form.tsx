'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Building2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LoginForm() {
  const [email, setEmail] = useState('admin@raqmena.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      toast.success('Login successful!');
      // Use window.location for more reliable navigation
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password. Try: admin@raqmena.com with password: password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">Raqmena</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {language === 'ar' ? 'منصة إدارة الأعمال الشاملة' : 'Complete Business Management Platform'}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'ar' 
                ? 'أدخل بريدك الإلكتروني وكلمة المرور للدخول' 
                : 'Enter your email and password to access your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'your@email.com' : 'your@email.com'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'ar' ? '••••••••' : '••••••••'}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'ar' ? 'جار تسجيل الدخول...' : 'Signing In...'}
                  </>
                ) : (
                  language === 'ar' ? 'تسجيل الدخول' : 'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {language === 'ar' ? 'بيانات تجريبية:' : 'Demo Credentials:'}
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Owner:</strong> admin@raqmena.com</p>
                <p><strong>HR Manager:</strong> hr@raqmena.com</p>
                <p><strong>Accountant:</strong> accountant@raqmena.com</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Raqmena. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </div>
  );
}