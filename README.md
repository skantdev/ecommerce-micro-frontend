# Enterprise E-Commerce Micro Frontend Application

A production-ready, enterprise-scale e-commerce platform built with **React 19**, **TypeScript**, and **Micro Frontend Architecture** using **Module Federation**.

## 🏗️ Architecture

This is a **monorepo** containing **9 independent micro frontends**:

- **Host** - Shell application that orchestrates all micro frontends
- **Authentication** - Login, registration, password reset
- **Home** - Landing page with hero section and featured products
- **Products** - Product catalog with filtering and search
- **Cart** - Shopping cart management
- **Checkout** - Multi-step checkout flow
- **Orders** - Order history and tracking
- **Profile** - User profile and preferences
- **Admin** - Admin dashboard for product/order/user management

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v7** - Routing
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Module Federation** - Micro frontend runtime integration
- **Turborepo** - Monorepo build system
- **pnpm** - Package manager

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run all micro frontends in development mode
pnpm dev

# Run specific micro frontend
pnpm dev:host
pnpm dev:auth
```

### Build

```bash
# Build all applications
pnpm build

# Build specific application
pnpm build:host
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## 📁 Project Structure

```
ecommerce-micro-frontend/
├── apps/                          # Micro frontend applications
│   ├── host/                      # Shell application (port 3000)
│   ├── auth/                      # Authentication MFE (port 3001)
│   ├── home/                      # Home page MFE (port 3002)
│   ├── products/                  # Products MFE (port 3003)
│   ├── cart/                      # Cart MFE (port 3004)
│   ├── checkout/                  # Checkout MFE (port 3005)
│   ├── orders/                    # Orders MFE (port 3006)
│   ├── profile/                   # Profile MFE (port 3007)
│   └── admin/                     # Admin MFE (port 3008)
├── packages/                      # Shared packages
│   ├── ui/                        # Reusable UI components
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── types/                     # TypeScript type definitions
│   ├── theme/                     # Design system & Tailwind config
│   ├── store/                     # Redux store configuration
│   ├── auth/                      # Authentication utilities
│   ├── api/                       # API client & services
│   ├── config/                    # Configuration management
│   └── constants/                 # Application constants
├── configs/                       # Shared configurations
│   ├── eslint-config/             # ESLint configuration
│   └── tsconfig/                  # TypeScript configurations
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md            # System architecture overview
│   ├── RULES.md                   # Development rules & standards
│   ├── PROJECT_PLAN.md            # Complete implementation roadmap
│   ├── CONTRIBUTING.md            # Contribution guidelines
│   └── ADR/                       # Architecture Decision Records
├── package.json                   # Root package configuration
├── turbo.json                     # Turborepo configuration
└── tsconfig.json                  # Root TypeScript configuration
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) - System design and patterns
- [Development Rules](./docs/RULES.md) - Coding standards and conventions
- [Project Plan](./docs/PROJECT_PLAN.md) - Implementation roadmap
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute
- [ADR](./docs/ADR/) - Architecture Decision Records

## 🔧 Workspace Commands

```bash
# Development
pnpm dev                # Run all apps in parallel
pnpm dev:host          # Run only host app

# Build
pnpm build             # Build all apps
pnpm build:host        # Build only host app

# Testing
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode

# Code Quality
pnpm lint              # Lint all packages
pnpm lint:fix          # Fix linting issues
pnpm format            # Format all files
pnpm type-check        # Type check all packages

# Cleanup
pnpm clean             # Remove all build artifacts and node_modules
```

## 🌐 Port Mapping

| Application | Port | URL |
|------------|------|-----|
| Host | 3000 | http://localhost:3000 |
| Auth | 3001 | http://localhost:3001 |
| Home | 3002 | http://localhost:3002 |
| Products | 3003 | http://localhost:3003 |
| Cart | 3004 | http://localhost:3004 |
| Checkout | 3005 | http://localhost:3005 |
| Orders | 3006 | http://localhost:3006 |
| Profile | 3007 | http://localhost:3007 |
| Admin | 3008 | http://localhost:3008 |

## 🎯 Key Features

- ✅ **Micro Frontend Architecture** - Independent deployment and team autonomy
- ✅ **Module Federation** - Runtime integration without rebuilding host
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Shared Packages** - Reusable components, hooks, and utilities
- ✅ **Performance Optimized** - Code splitting, lazy loading, tree shaking
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Authentication** - JWT-based with refresh tokens
- ✅ **State Management** - Redux Toolkit + React Query
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode** - Theme switching support
- ✅ **Testing** - Unit, integration, and E2E tests
- ✅ **CI/CD Ready** - GitHub Actions workflows

## 🤝 Contributing

Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built by enterprise frontend architects following industry best practices.

---

**Status**: 🟡 Step 1 Complete - Monorepo setup and documentation in place
