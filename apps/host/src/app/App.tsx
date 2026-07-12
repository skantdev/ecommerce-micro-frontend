import { BrowserRouter } from 'react-router-dom';

import { AppProviders } from '@/providers/AppProviders';
import { AppRouter } from '@/routes/AppRouter';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <AppRouter />
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
