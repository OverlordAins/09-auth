'use client';

import { Note } from '@/types/note';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import styles from './NoteList.module.css';
import buttonCss from '../Button/Button.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.error('Delete error:', error);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={styles.list}>
      {notes.map(note => (
        <div key={note.id} className={styles.noteCard}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <span className={styles.tag}>{note.tag}</span>

          <div className={styles.actions}>
            <Link
              href={`/notes/${note.id}`}
              className={`${buttonCss.button} ${buttonCss.small}`}
            >
              View Details
            </Link>

            <button
              onClick={() => handleDelete(note.id)}
              className={`${buttonCss.button} ${buttonCss.danger}`}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
