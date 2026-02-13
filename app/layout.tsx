import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Providers } from './providers';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'NoteHub - Твій простір для нотаток',
  description:
    'Зберігайте свої ідеї та плануйте завдання в зручному застосунку NoteHub.',
  openGraph: {
    title: 'NoteHub - Твій простір для нотаток',
    description:
      'Зберігайте свої ідеї та плануйте завдання в зручному застосунку NoteHub.',
    url: 'https://09-auth-your-project.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Preview',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={roboto.className}>
        <Providers>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
