export const revalidate = 0;
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);

  if (!note) {
    return {
      title: 'Note Not Found | NoteHub',
    };
  }

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.substring(0, 150),
    openGraph: {
      title: note.title,
      description: note.content.substring(0, 150),
      url: `https://08-zustand-tau-two.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  const note = await fetchNoteByIdServer(id);

  if (!note) {
    return notFound();
  }

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
