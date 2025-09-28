import { AuthProvider } from '@/providers/auth-provider';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
