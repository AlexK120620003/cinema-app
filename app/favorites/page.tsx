'use client';
import { useState, useEffect } from 'react';
import { Film } from '@/types/types';
import MovieCard from '@/components/MoviesCard';
import Link from 'next/link';

const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

export default function FavoritesPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const saved = localStorage.getItem('favorites') ?? '';
      const ids = saved ? saved.split(',').filter(Boolean) : [];

      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      const results = await Promise.all(
        ids.map(async id => {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            );
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        })
      );

      setFilms(results.filter(Boolean) as Film[]);
      setLoading(false);
    }

    loadFavorites();
  }, []);

  return (
    <div style={{ padding: '32px 24px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          <span style={{ color: '#e74c3c', marginRight: 8 }}>♥</span>
          My Favorites
        </h1>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
          <div className="spinner" />
        </div>
      ) : films.length === 0 ? (
        <div style={{
          textAlign: 'center',
          paddingTop: 80,
          color: 'var(--text-secondary)',
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,0.15)', marginBottom: 16 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p style={{ fontSize: 18, marginBottom: 8 }}>No favorites yet</p>
          <p style={{ fontSize: 14 }}>Click the heart on any movie to add it here</p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              marginTop: 20,
              padding: '10px 24px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
        }}>
          {films.map(film => (
            <MovieCard
              key={film.id}
              id={film.id}
              title={film.title}
              vote_average={film.vote_average}
              genre_ids={film.genre_ids ?? []}
              poster_path={film.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
}
