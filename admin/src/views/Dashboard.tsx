import { Link, Routes, Route } from 'react-router-dom';
import { useAuth } from '../supabase/AuthContext';
import TableManager from './TableManager';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div>
      <nav>
        <button onClick={signOut}>Logout</button>
        <ul>
          <li><Link to="posts">Posts</Link></li>
          <li><Link to="services">Services</Link></li>
          <li><Link to="courses">Courses</Link></li>
          <li><Link to="jobs">Jobs</Link></li>
          <li><Link to="media">Media</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="posts" element={<TableManager table="posts" />} />
        <Route path="services" element={<TableManager table="services" />} />
        <Route path="courses" element={<TableManager table="courses" />} />
        <Route path="jobs" element={<TableManager table="jobs" />} />
        <Route path="media" element={<TableManager table="media" />} />
        <Route path="settings" element={<TableManager table="settings" />} />
      </Routes>
    </div>
  );
}
