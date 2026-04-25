'use client';
import { useState } from 'react';
import { Film } from '@/types/types';
import MovieCard from './MoviesCard';

const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

export default function LoadMore({
  initialUrl,
  initialPage,
}: {
  initialUrl: string;
  initialPage: number;
}) {
  const [extra, setExtra] = useState<Film[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    setLoading(true);
    const nextPage = page + 1;
    const separator = initialUrl.includes('?') ? '&' : '?';
    const res = await fetch(`${initialUrl}${separator}page=${nextPage}`);
    const data = await res.json();
    const newFilms: Film[] = data.results ?? [];

    if (newFilms.length === 0 || nextPage >= (data.total_pages ?? 1)) {
      setHasMore(false);
    }

    setExtra(prev => [...prev, ...newFilms]);
    setPage(nextPage);
    setLoading(false);
  }

  return (
    <>
      {extra.length > 0 && (
        <div className="scroll-row" style={{ marginTop: 8 }}>
          {extra.map(item => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              vote_average={item.vote_average}
              genre_ids={item.genre_ids}
              poster_path={item.poster_path}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              padding: '12px 32px',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = loading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)';
            }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
