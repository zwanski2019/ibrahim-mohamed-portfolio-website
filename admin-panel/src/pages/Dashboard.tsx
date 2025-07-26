import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from '../App';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

function Home() {
  return <h2>Welcome to the Admin Dashboard</h2>;
}

export default function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard">Home</Link>
      </nav>
      <Routes>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
