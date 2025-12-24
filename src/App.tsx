import { AuthProvider } from '@/providers/auth-provider';
import { AppRoutes } from '@/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client.ts';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
