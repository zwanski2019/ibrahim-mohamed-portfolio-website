import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './routes/AdminApp';

createRoot(document.getElementById('admin-root') as HTMLElement).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
