
import { ForumHeader } from '@/components/forum/ForumHeader';
import { CreateThreadForm } from '@/components/forum/CreateThreadForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function CreateForumThread() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      <CreateThreadForm />
    </div>
  );
}
