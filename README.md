# Raqmena - Business Management Platform

A comprehensive full-stack SaaS business management platform with multi-tenancy, real-time features, robust security, and modern frontend/backend separation.

## 🌟 Features

- **Dashboard & Analytics**: Real-time metrics and performance indicators
- **Employee Management**: Complete employee profiles and organization
- **Human Resources**: Attendance, payroll, leave management, and performance reviews
- **Project Management**: Kanban boards, task tracking, and team collaboration
- **Accounting & Finance**: Invoice management, expense tracking, and financial reporting
- **Team Communication**: Real-time chat with file sharing
- **Settings & Configuration**: User preferences and system settings
- **Multi-Tenancy**: Subdomain-based, data isolation, custom branding, free trial system
- **Role-Based Access Control**: Super admin, admin, employee, client
- **Bilingual Support**: English (LTR) and Arabic (RTL)
- **Responsive Design**: Mobile-first, dark/light mode
- **Security**: RBAC, XSS/SQLi protection, secure auth, tenant isolation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, React Query, Radix UI, Recharts
- **Backend**: Laravel 10, Sanctum, Spatie Multitenancy, Websockets, Stripe
- **Database**: MySQL, Redis
- **DevOps**: Docker, Nginx, GitHub Actions CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL
- Docker (optional, for containerized setup)

### 1. Clone the repository
```sh
git clone https://github.com/yousefabdallah171/Rakmyat-Business-Management-Platform
cd raemena-ui
```

### 2. Backend Setup (Laravel)
```sh
cd server
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
- Websockets: `php artisan websockets:serve`
- Queue: `php artisan queue:work`

### 3. Frontend Setup (Next.js)
```sh
cd ../client
npm install
npm run dev
```

### 4. Access the App
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## 🏢 Multi-Tenant Architecture
- Subdomain-based tenancy (e.g., `company.localhost:3000`)
- Tenant registration endpoint: `/api/register`
- Data isolation and custom branding per tenant
- Free trial system (14 days)

## 📚 API Documentation
- **Scribe** is used for API docs.
- Generate docs: `php artisan scribe:generate`
- Access docs: `http://localhost:8000/docs`
- Export Postman collection from docs UI

## ⚙️ Deployment & CI/CD
- Dockerized for local and production use
- Nginx config for subdomain routing
- GitHub Actions workflow for:
  - Running backend and frontend tests
  - Building Docker images
  - Deploying on tag
  - Running migrations
  - Health checks

## 🧪 Testing
- PHPUnit for backend (tenant isolation, roles, payments, validation)
- Frontend: `npm run test`

## 🆘 Support
For support, email support@raqmena.com or create an issue in this repository.

## 📝 License
MIT License

## 📁 Project Structure (GitHub Version)

```
raemena-ui/
├── client/                  # Next.js frontend (app, components, hooks, services, etc.)
│   ├── app/                # App routes and pages
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── services/           # API and business logic
│   ├── types/              # TypeScript types
│   ├── package.json        # Frontend dependencies
│   └── ...                 # Configs, README, etc.
├── server/                 # Laravel backend (app, config, routes, etc.)
│   ├── app/                # Application core (controllers, models, etc.)
│   ├── config/             # Laravel configuration
│   ├── routes/             # API and web routes
│   ├── tests/              # PHPUnit tests
│   ├── resources/          # Views, JS, CSS
│   ├── database/           # Migrations, seeders, factories
│   ├── public/             # Public assets (index.php, favicon, etc.)
│   ├── bootstrap/          # Laravel bootstrap files
│   ├── composer.json       # Backend dependencies
│   └── ...                 # Other configs, scripts, docs
├── nginx/                  # Nginx configuration
│   └── nginx.conf
├── .github/                # GitHub settings and workflows
│   └── workflows/
│       └── ci-cd.yml       # CI/CD pipeline
├── docker-compose.yml      # Docker orchestration
├── deploy.sh               # Deployment script
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
└── ...                     # Other root files (licenses, configs)
```

## 🌍 Internationalization

The platform supports both English and Arabic languages with:
- Dynamic language switching
- RTL layout support for Arabic
- Font switching (Inter for English, Tajawal for Arabic)
- Complete translation system

## 🎨 Design System

- **Custom Color Palette**: Raqmena green theme
- **Component Library**: 50+ reusable UI components
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA support and keyboard navigation

## 🔐 Security Features

- Role-based access control (RBAC)
- Permission-based navigation
- Input validation with Zod
- XSS protection
- Secure authentication flow

## 📊 Data Visualization

- Interactive charts using Recharts
- Real-time metrics display
- Progress indicators and status badges
- Export capabilities (PDF, CSV)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **API Documentation**: [Coming Soon]

## 📝 Next Steps for Production & Go-Live Checklist

To ensure your Raqmena platform is ready for real-world use by companies, follow these production and go-live steps. Mark each task as you complete it!

### 🚀 General
- [ ] Set up production domains and SSL certificates
- [ ] Configure environment variables for production
- [ ] Set up backups for database and storage
- [ ] Enable monitoring and logging (e.g., Sentry, LogRocket, Laravel Telescope)
- [ ] Review and update privacy policy, terms of service, and legal documents
- [ ] Test multi-tenancy with real subdomains and data isolation
- [ ] Set up email/SMS providers for notifications
- [ ] Review security best practices (rate limiting, CORS, etc.)

### 🖥️ Frontend (Next.js)
- [ ] Build frontend for production: `npm run build`
- [ ] Serve with a production-ready server (e.g., Vercel, Docker, PM2, Nginx)
- [ ] Set `NEXT_PUBLIC_APP_URL` and other env variables in `.env.production`
- [ ] Optimize images and static assets
- [ ] Test on all major browsers and devices (mobile, tablet, desktop)
- [ ] Enable analytics (e.g., Google Analytics, Plausible)
- [ ] Review accessibility (ARIA, keyboard navigation)
- [ ] Enable error boundaries and user-friendly error pages
- [ ] Test language switching and RTL support
- [ ] Review and test all user flows (registration, login, onboarding, etc.)

### 🛠️ Backend (Laravel)
- [ ] Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
- [ ] Run `php artisan config:cache` and `php artisan route:cache`
- [ ] Set up queue workers and supervisors for background jobs
- [ ] Set up websockets server for real-time features
- [ ] Configure mail and notification services
- [ ] Set up Redis for cache, queue, and session
- [ ] Run database migrations and seed production data
- [ ] Harden security (CSP headers, HTTPS, CORS, etc.)
- [ ] Set up scheduled tasks (cron jobs)
- [ ] Monitor logs and error reports
- [ ] Test API endpoints and authentication

### 🐳 Docker & DevOps
- [ ] Build and push Docker images for frontend and backend
- [ ] Set up Docker Compose or Kubernetes for orchestration
- [ ] Configure Nginx for subdomain routing and SSL termination
- [ ] Set up CI/CD pipelines (GitHub Actions, GitLab CI, etc.)
- [ ] Automate database backups and health checks

### 🏢 For Companies Using Raqmena
- [ ] Register your company/tenant via the registration endpoint
- [ ] Set up your company branding and preferences
- [ ] Invite team members and assign roles
- [ ] Configure integrations (email, payment, etc.)
- [ ] Start using the platform for your business operations!

---

For detailed deployment and scaling guides, see the [Documentation] section (coming soon) or contact support@raqmena.com.

Built with ❤️ By Rakmyat for the Middle Eastern business community 
