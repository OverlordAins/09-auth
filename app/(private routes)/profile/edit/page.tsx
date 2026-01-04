'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: updatedUser => {
      setUser(updatedUser);
      router.push('/profile');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get('username') as string;

    if (newUsername.trim()) {
      mutation.mutate({ username: newUsername });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  const avatarUrl =
    user?.avatar ||
    'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
          unoptimized
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              key={user?.username}
              defaultValue={user?.username || ''}
              required
            />
          </div>

          <p>Email: {user?.email || 'user_email@example.com'}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
