<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

## 📚 API Documentation

Below is a summary of all available API endpoints for this backend. Use this as a quick reference for both backend and frontend development.

### Authentication

- **POST /api/login** — Log in and receive an API token
  - Body: `email`, `password`
  - Response: `token`, `user`

- **POST /api/register** — Register a new client user
  - Body: `name`, `email`, `password`
  - Response: `token`, `user`

- **POST /api/password/email** — Send password reset link
  - Body: `email`
  - Response: `message` or `error`

- **POST /api/password/reset** — Reset password
  - Body: `email`, `token`, `password`, `password_confirmation`
  - Response: `message` or `error`

- **GET /api/user** — Get current user (auth required)
- **POST /api/logout** — Log out (auth required)

---

### Project Management

- **GET /api/projects/{id}/board** — Get Kanban board for a project (auth + tenant)
  - Response: `project`, `board` (tasks grouped by status)

---

### Task Management

- **PUT /api/tasks/{id}/status** — Update task status (auth + tenant)
  - Body: `status`
  - Response: `message`, `task`

- **POST /api/tasks/{id}/time** — Log time for a task (auth + tenant)
  - Body: `minutes`
  - Response: `message`, `log`

- **GET /api/tasks/{id}/time** — Get time logs for a task (auth + tenant)
  - Response: `logs`

- **POST /api/tasks/{id}/attach** — Attach file to a task (auth + tenant)
  - Body: `file`
  - Response: `message`, `attachment`

- **GET /api/tasks/{id}/attachments** — Get all attachments for a task (auth + tenant)
  - Response: `attachments`

---

### Accounting & Finance

- **POST /api/invoices** — Create invoice (auth + tenant)
  - Body: `client_id`, `amount`, `status`, `due_date`
  - Response: `invoice`

- **GET /api/invoices/{id}/pdf** — Download invoice as PDF (auth + tenant)

- **POST /api/expenses** — Create expense (auth + tenant)
  - Body: `user_id`, `amount`, `category`, `date`
  - Response: `expense`

- **GET /api/expenses/report** — Get expenses report (auth + tenant)
  - Query: `month`, `year`
  - Response: `month`, `year`, `total`, `expenses`

- **POST /api/invoices/{id}/pay** — Pay invoice (auth + tenant)
  - Body: `payment_method_id`
  - Response: `message`, `intent`

- **GET /api/reports/financial** — Get financial report (auth + tenant)
  - Query: `year`
  - Response: `year`, `income`, `expenses`, `profit`

---

### Team Communication

- **GET /api/chat/messages** — Get all chat messages (auth + tenant)
- **POST /api/chat/send** — Send chat message (auth + tenant)
  - Body: `content`, `receiver_id`, `file`
  - Response: `message`

---

### Super Admin Endpoints (require super admin role)

- **GET /api/super/tenants** — List all tenants
- **PUT /api/super/tenants/{id}** — Update tenant
  - Body: `name`, `subdomain`, `trial_ends_at`, `active`, `extend_trial_days`, `deactivate`
- **GET /api/super/stats** — Platform statistics
- **GET /api/super/activity** — Recent activity logs
- **POST /api/super/tenants/{id}/backup** — Backup tenant database

---

**Notes:**
- All endpoints requiring authentication use Laravel Sanctum tokens.
- Tenant endpoints require the correct subdomain.
- For full request/response examples, generate and view the Scribe docs at `/docs` after running `php artisan scribe:generate`.
