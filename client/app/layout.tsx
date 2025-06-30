import './globals.css';
import type { Metadata } from 'next';
import { Inter, Tajawal } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Raqmena - Business Management Platform',
  description: 'Complete business management solution with HR, accounting, project management, and more.',
  keywords: 'business management, HR, accounting, project management, CRM, ERP',
  authors: [{ name: 'Raqmena Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Raqmena - Business Management Platform',
    description: 'Complete business management solution with HR, accounting, project management, and more.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} font-inter antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}