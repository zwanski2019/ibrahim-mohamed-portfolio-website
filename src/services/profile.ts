import { getCsrfToken } from '@/utils/csrf';

export interface ProfileUpdate {
  id: string;
  [key: string]: any;
}

export async function updateProfile(data: ProfileUpdate) {
  const csrfToken = getCsrfToken();
  const res = await fetch('/profile/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken ?? '',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update profile');
  }

  return res.json();
}
