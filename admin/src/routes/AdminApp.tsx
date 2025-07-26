import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import Dashboard from '../views/Dashboard';
import { SupabaseProvider, useAuth } from '../supabase/AuthContext';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" replace />;
}

export default function AdminApp() {
  return (
    <SupabaseProvider>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SupabaseProvider>
  );
}
