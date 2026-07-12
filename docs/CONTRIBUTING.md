# Contributing Guide

Welcome to the Enterprise E-Commerce Micro Frontend project! This guide will help you get started with local development and contributing to the codebase.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Creating New Features](#creating-new-features)
6. [Adding Shared Components](#adding-shared-components)
7. [Testing](#testing)
8. [Code Style](#code-style)
9. [Pull Request Process](#pull-request-process)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 20.0.0 ([Download](https://nodejs.org/))
- **pnpm**: >= 9.0.0 ([Install](https://pnpm.io/installation))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **VS Code**: Recommended editor ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ecommerce-micro-frontend.git
cd ecommerce-micro-frontend
```

### 2. Install Dependencies

```bash
# Install all dependencies for the monorepo
pnpm install
```

This will install dependencies for all apps and packages in the monorepo.

### 3. Build Shared Packages

```bash
# Build all shared packages
pnpm build
```

### 4. Start Development Servers

```bash
# Run all micro frontends in parallel
pnpm dev
```

This will start all 9 micro frontends:

- Host: http://localhost:3000
- Auth: http://localhost:3001
- Home: http://localhost:3002
- Products: http://localhost:3003
- Cart: http://localhost:3004
- Checkout: http://localhost:3005
- Orders: http://localhost:3006
- Profile: http://localhost:3007
- Admin: http://localhost:3008

### 5. Run Specific Micro Frontend

```bash
# Run only the host application
pnpm dev:host

# Run only the products micro frontend
pnpm dev:products
```

---

## Project Structure

```
ecommerce-micro-frontend/
├── apps/                      # Micro frontend applications
│   ├── host/                  # Shell application
│   ├── auth/                  # Authentication MFE
│   ├── home/                  # Home page MFE
│   ├── products/              # Products MFE
│   ├── cart/                  # Cart MFE
│   ├── checkout/              # Checkout MFE
│   ├── orders/                # Orders MFE
│   ├── profile/               # Profile MFE
│   └── admin/                 # Admin MFE
├── packages/                  # Shared packages
│   ├── ui/                    # UI components
│   ├── hooks/                 # Custom hooks
│   ├── utils/                 # Utilities
│   ├── types/                 # TypeScript types
│   ├── theme/                 # Design system
│   ├── store/                 # Redux store
│   ├── auth/                  # Auth utilities
│   ├── api/                   # API client
│   ├── config/                # Configuration
│   └── constants/             # Constants
├── configs/                   # Shared configurations
├── docs/                      # Documentation
└── [config files]             # Root configs
```

### Understanding Workspaces

This monorepo uses **pnpm workspaces**. Each app and package is a separate workspace with its own `package.json`.

To reference a shared package:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/hooks": "workspace:*"
  }
}
```

---

## Development Workflow

### Daily Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   pnpm install  # Install any new dependencies
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make changes** and test locally

4. **Run quality checks**
   ```bash
   pnpm lint        # Check for linting errors
   pnpm type-check  # Check TypeScript types
   pnpm test        # Run tests
   ```

5. **Commit with conventional commits**
   ```bash
   git add .
   git commit -m "feat(products): add product filtering"
   ```

6. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

### Available Commands

```bash
# Development
pnpm dev                    # Run all apps
pnpm dev:host              # Run host app only
pnpm dev:products          # Run products MFE only

# Building
pnpm build                 # Build all apps and packages
pnpm build:host            # Build host app only

# Testing
pnpm test                  # Run all tests
pnpm test:watch            # Run tests in watch mode
pnpm test:coverage         # Run tests with coverage

# Code Quality
pnpm lint                  # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format all files with Prettier
pnpm format:check          # Check formatting
pnpm type-check            # TypeScript type checking

# Cleaning
pnpm clean                 # Remove build artifacts and node_modules
```

---

## Creating New Features

### Feature Structure

Follow the **feature-based architecture** (see [RULES.md](./RULES.md) for details):

```
src/features/product-filter/
├── components/
│   ├── FilterPanel.tsx
│   ├── FilterPanel.test.tsx
│   ├── PriceRangeFilter.tsx
│   └── index.ts
├── hooks/
│   ├── useProductFilter.ts
│   ├── useProductFilter.test.ts
│   └── index.ts
├── services/
│   ├── filterService.ts
│   └── index.ts
├── store/
│   ├── filterSlice.ts
│   └── index.ts
├── types/
│   ├── filter.types.ts
│   └── index.ts
└── index.ts
```

### Step-by-Step: Add a New Feature

1. **Create feature folder**
   ```bash
   cd apps/products/src/features
   mkdir product-filter
   cd product-filter
   ```

2. **Create subfolders**
   ```bash
   mkdir components hooks services types
   ```

3. **Create component**
   ```typescript
   // components/FilterPanel.tsx
   import { FC } from 'react';
   import { Button } from '@repo/ui';

   interface FilterPanelProps {
     onApply: (filters: Filters) => void;
   }

   export const FilterPanel: FC<FilterPanelProps> = ({ onApply }) => {
     return (
       <div>
         {/* Filter UI */}
         <Button onClick={() => onApply(filters)}>Apply Filters</Button>
       </div>
     );
   };
   ```

4. **Create barrel export**
   ```typescript
   // components/index.ts
   export { FilterPanel } from './FilterPanel';
   export { PriceRangeFilter } from './PriceRangeFilter';

   // index.ts (feature root)
   export * from './components';
   export * from './hooks';
   export * from './types';
   ```

5. **Write tests**
   ```typescript
   // components/FilterPanel.test.tsx
   import { render, screen } from '@testing-library/react';
   import { FilterPanel } from './FilterPanel';

   describe('FilterPanel', () => {
     it('renders filter panel', () => {
       render(<FilterPanel onApply={vi.fn()} />);
       expect(screen.getByText('Apply Filters')).toBeInTheDocument();
     });
   });
   ```

6. **Import in page**
   ```typescript
   // pages/ProductsPage.tsx
   import { FilterPanel } from '@/features/product-filter';
   ```

---

## Adding Shared Components

### Adding to @repo/ui

1. **Navigate to UI package**
   ```bash
   cd packages/ui/src
   ```

2. **Create component folder**
   ```bash
   mkdir Badge
   cd Badge
   ```

3. **Create component**
   ```typescript
   // Badge.tsx
   import { FC } from 'react';
   import { cva, type VariantProps } from 'class-variance-authority';

   const badgeVariants = cva(
     'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
     {
       variants: {
         variant: {
           default: 'bg-primary-500 text-white',
           success: 'bg-green-500 text-white',
           error: 'bg-red-500 text-white',
         },
       },
       defaultVariants: {
         variant: 'default',
       },
     }
   );

   export interface BadgeProps extends VariantProps<typeof badgeVariants> {
     children: React.ReactNode;
   }

   export const Badge: FC<BadgeProps> = ({ variant, children }) => {
     return <span className={badgeVariants({ variant })}>{children}</span>;
   };
   ```

4. **Export from package**
   ```typescript
   // packages/ui/src/index.ts
   export { Badge } from './Badge/Badge';
   export type { BadgeProps } from './Badge/Badge';
   ```

5. **Write tests**
   ```typescript
   // Badge.test.tsx
   import { render, screen } from '@testing-library/react';
   import { Badge } from './Badge';

   describe('Badge', () => {
     it('renders children', () => {
       render(<Badge>New</Badge>);
       expect(screen.getByText('New')).toBeInTheDocument();
     });
   });
   ```

6. **Use in apps**
   ```typescript
   import { Badge } from '@repo/ui';

   <Badge variant="success">In Stock</Badge>
   ```

---

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific package
cd packages/ui
pnpm test
```

### Writing Tests

#### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Hook Test Example

```typescript
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('debounces value', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Still old value

    await new Promise((r) => setTimeout(r, 600));
    expect(result.current).toBe('updated'); // Now updated
  });
});
```

### Test Coverage Requirements

- **Minimum**: 80% overall coverage
- **Business Logic**: 100% coverage required
- **UI Components**: 70% coverage minimum

---

## Code Style

### ESLint & Prettier

The project uses **ESLint** for linting and **Prettier** for formatting.

```bash
# Check for lint errors
pnpm lint

# Auto-fix lint errors
pnpm lint:fix

# Format all files
pnpm format
```

### Code Style Guidelines

See [RULES.md](./RULES.md) for comprehensive coding standards.

**Quick Reference**:
- ✅ Use functional components with hooks
- ✅ Use TypeScript strict mode
- ✅ Follow naming conventions (PascalCase for components, camelCase for functions)
- ✅ Import order: React → external → internal → relative → types
- ✅ Keep components small (<250 lines)
- ✅ Extract complex logic to custom hooks
- ✅ Write tests for all features

---

## Pull Request Process

### Before Creating PR

1. **Ensure code quality**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   pnpm build
   ```

2. **Update documentation** if needed

3. **Test locally** - verify all affected MFEs work

### PR Title Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(products): add product filtering
fix(cart): resolve quantity update bug
docs(readme): update setup instructions
refactor(auth): simplify token refresh logic
test(checkout): add checkout flow tests
chore(deps): update dependencies
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added for new features
```

### Review Process

1. **Automated checks** run (build, test, lint)
2. **Code review** by at least 1 team member
3. **Changes requested** - address feedback
4. **Approval** - merge to main

### Merge Strategy

- **Squash and merge** for feature branches
- **Rebase and merge** for hotfixes

---

## Troubleshooting

### Common Issues

#### 1. Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. Build Errors

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

#### 3. TypeScript Errors

```bash
# Regenerate TypeScript build info
pnpm type-check
```

#### 4. Port Already in Use

```bash
# Kill process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

#### 5. Vite HMR Not Working

```bash
# Restart dev server
Ctrl+C
pnpm dev
```

#### 6. Module Federation Errors

- Ensure all remote apps are running
- Check `vite.config.ts` remote URLs
- Verify shared dependencies match across apps

#### 7. Slow Install Times

```bash
# Use frozen lockfile
pnpm install --frozen-lockfile

# Enable strict peer dependencies
pnpm install --strict-peer-dependencies=false
```

### Getting Help

- **Documentation**: Check [docs/](./docs/) folder
- **Architecture**: Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Rules**: Review [RULES.md](./RULES.md)
- **Project Plan**: See [PROJECT_PLAN.md](./PROJECT_PLAN.md)
- **Issues**: Open GitHub issue
- **Slack**: #frontend-architecture channel

---

## Additional Resources

### Learning Resources

- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)

### Tools

- **Vitest**: [Documentation](https://vitest.dev/)
- **React Testing Library**: [Documentation](https://testing-library.com/react)
- **Redux Toolkit**: [Documentation](https://redux-toolkit.js.org/)
- **React Query**: [Documentation](https://tanstack.com/query/latest)
- **Zod**: [Documentation](https://zod.dev/)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**

If you have questions, don't hesitate to ask in the team chat or open an issue.
