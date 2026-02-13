'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Sidebar.module.css';

const SidebarDefault = () => {
  const pathname = usePathname();
  const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  // Витягуємо поточний тег з URL
  const currentTag = pathname.split('/').pop() || 'all';

  return (
    <nav className={css.sidebarNav}>
      <Link
        href="/notes/filter/all"
        className={`${css.navItem} ${currentTag === 'all' ? css.active : ''}`}
      >
        All notes
      </Link>

      {tags.map(tag => (
        <Link
          key={tag}
          href={`/notes/filter/${tag.toLowerCase()}`}
          className={`${css.navItem} ${
            currentTag === tag.toLowerCase() ? css.active : ''
          }`}
        >
          {tag}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarDefault;
