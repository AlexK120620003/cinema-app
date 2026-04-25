'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

type SearchResult = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  function handleChange(val: string) {
    setQuery(val);
    clearTimeout(timerRef.current);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(val)}`
        );
        const data = await res.json();
        setResults(data.results?.slice(0, 10) ?? []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 350);
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
          }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 64,
          width: 420,
          height: '100vh',
          background: 'var(--bg-secondary)',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(-484px)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          boxShadow: open ? '4px 0 20px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              style={{
                position: 'absolute', left: 12, top: '50%',
                transform: 'translateY(-50%)', color: 'var(--text-secondary)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => handleChange(e.target.value)}
              placeholder="Search movies..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                padding: '12px 16px 12px 40px',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: 'var(--text-secondary)',
              cursor: 'pointer', fontSize: 24, lineHeight: 1, padding: 4,
            }}
          >
            ×
          </button>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-secondary)' }}>
              Searching...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-secondary)' }}>
              No results found
            </div>
          )}

          {!loading && results.map(r => (
            <Link
              key={r.id}
              href={`/movies/${r.id}`}
              onClick={onClose}
              style={{
                display: 'flex',
                gap: 12,
                padding: '10px 8px',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {r.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${r.poster_path}`}
                  alt={r.title}
                  style={{ width: 48, height: 72, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: 48, height: 72, borderRadius: 4, flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'var(--text-secondary)',
                }}>
                  N/A
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: 600, fontSize: 14,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--gold)' }}>★ {r.vote_average.toFixed(1)}</span>
                  <span>{r.release_date?.slice(0, 4)}</span>
                </div>
              </div>
            </Link>
          ))}

          {!query && (
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, textAlign: 'center', paddingTop: 40 }}>
              Start typing to search movies
            </div>
          )}
        </div>
      </div>
    </>
  );
}
