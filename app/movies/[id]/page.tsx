import { FilmDetails } from '@/types/types';
import type { MoviePageProps } from '@/types/types';
import Link from 'next/link';

const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  const film: FilmDetails = await res.json();

  return (
    <div>
      {/* Backdrop */}
      <div style={{ position: 'relative', width: '100%', height: 480, overflow: 'hidden' }}>
        <img
          src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
          alt={film.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          className="hero-gradient-bottom"
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%' }}
        />
        <div
          className="hero-gradient-left"
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%' }}
        />

        {/* Back button */}
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#fff',
            textDecoration: 'none',
            fontSize: 14,
            background: 'rgba(0,0,0,0.5)',
            padding: '8px 16px',
            borderRadius: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </div>

      {/* Content */}
      <div style={{ padding: '0 40px 60px', marginTop: -180, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Poster */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              style={{
                width: 240,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, paddingTop: 20 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>{film.title}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 18 }}>
                ★ {film.vote_average.toFixed(1)}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                {film.release_date}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                {film.runtime} min
              </span>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {film.genres.map(g => (
                <span
                  key={g.id}
                  style={{
                    padding: '4px 14px',
                    borderRadius: 9999,
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginTop: 20,
              maxWidth: 600,
            }}>
              {film.overview}
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="play-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Now
              </button>
              <button className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
