# Host Application

The **Host** is the shell application that orchestrates all micro frontends in the E-Commerce application.

## Purpose

- Provide the main shell (header, footer, layout)
- Load and integrate micro frontends via Module Federation
- Handle global routing
- Provide global state (Redux, Auth context)
- Error boundaries and fallback UI

## Development

```bash
# Run host application
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```

## Port

The host application runs on **port 3000**: http://localhost:3000

## Module Federation

The host dynamically loads these micro frontends:

| Micro Frontend | Port | Remote Entry |
|----------------|------|--------------|
| Auth | 3001 | http://localhost:3001/assets/remoteEntry.js |
| Home | 3002 | http://localhost:3002/assets/remoteEntry.js |
| Products | 3003 | http://localhost:3003/assets/remoteEntry.js |
| Cart | 3004 | http://localhost:3004/assets/remoteEntry.js |
| Checkout | 3005 | http://localhost:3005/assets/remoteEntry.js |
| Orders | 3006 | http://localhost:3006/assets/remoteEntry.js |
| Profile | 3007 | http://localhost:3007/assets/remoteEntry.js |
| Admin | 3008 | http://localhost:3008/assets/remoteEntry.js |

## Shared Dependencies

The following dependencies are shared as singletons:
- React (^19.0.0)
- React DOM (^19.0.0)
- React Router DOM (^7.0.1)
- Redux (^5.0.1)
- React Redux (^9.1.2)
- Redux Toolkit (^2.2.5)

## Structure

```
src/
├── app/
│   └── App.tsx              # Root component
├── components/
│   ├── ErrorBoundary.tsx    # Global error boundary
│   └── Loader.tsx           # Loading component
├── layouts/
│   ├── MainLayout.tsx       # Main layout with header/footer
│   ├── Header.tsx           # Global header
│   └── Footer.tsx           # Global footer
├── pages/
│   ├── HomePage.tsx         # Home page
│   └── NotFoundPage.tsx     # 404 page
├── providers/
│   └── AppProviders.tsx     # Global providers
├── routes/
│   └── AppRouter.tsx        # Route configuration
├── styles/
│   └── index.css            # Global styles
└── main.tsx                 # Entry point
```

## Features

- ✅ Vite for fast development
- ✅ Module Federation configuration
- ✅ React Router v7 for routing
- ✅ Error Boundary for error handling
- ✅ Tailwind CSS for styling
- ✅ TypeScript strict mode
- ✅ Basic shell layout (Header/Footer)
- ✅ Loading states
- ✅ 404 page

## Next Steps

1. Add micro frontend remotes (Steps 14-21)
2. Integrate shared packages (Steps 3-12)
3. Add Redux Provider
4. Add Auth Provider
5. Add Theme Provider

## Status

🟢 **Step 2 Complete** - Basic host application with Module Federation is ready
