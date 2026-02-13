'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import Button from '../Button/Button';
import css from './NoteItem.module.css';

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      alert('Failed to delete the note.');
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(note.id);
    }
  };

  return (
    <div className={css.listItem}>
      <div className={css.contentWrapper}>
        <h3 className={css.title}>{note.title}</h3>
        <p className={css.content}>
          {note.content.length > 120
            ? `${note.content.substring(0, 120)}...`
            : note.content}
        </p>
      </div>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag || 'Personal'}</span>

        <div className={css.actions}>
          <Link href={`/notes/${note.id}`} className={css.detailsLink}>
            View details
          </Link>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
