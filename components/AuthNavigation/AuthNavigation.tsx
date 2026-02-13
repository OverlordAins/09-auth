'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';
import buttonCss from '../Button/Button.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push('/sign-in');
    } catch {
      console.error('Logout failed');
    }
  };

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/" className={`${buttonCss.button} ${buttonCss.large}`}>
          Home
        </Link>
      </li>

      {user ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/notes/filter/all"
              className={`${buttonCss.button} ${buttonCss.large}`}
            >
              Notes
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              className={`${buttonCss.button} ${buttonCss.large}`}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <span className={css.userEmail}>{user.email}</span>
          </li>
          <li className={css.navigationItem}>
            <button
              onClick={handleLogout}
              className={`${buttonCss.button} ${buttonCss.large}`}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              className={`${buttonCss.button} ${buttonCss.large}`}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              className={`${buttonCss.button} ${buttonCss.large}`}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
