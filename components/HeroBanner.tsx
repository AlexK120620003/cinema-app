'use client';
import { Film } from '@/types/types';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

export default function HeroBanner({ films }: { films: Film[] }) {
  const [current, setCurrent] = useState(0);
  const count = films.length;

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const film = films[current];
  if (!film) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: 520, overflow: 'hidden' }}>
      {/* Backdrop images — all stacked, only active is visible */}
      {films.map((f, i) => (
        <img
          key={f.id}
          src={`https://image.tmdb.org/t/p/original${f.backdrop_path}`}
          alt={f.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}

      {/* Gradient overlays */}
      <div
        className="hero-gradient-bottom"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' }}
      />
      <div
        className="hero-gradient-left"
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '60%' }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 40,
          maxWidth: 550,
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: 1 }}>
          pexovia video
        </div>

        <h1
          key={film.id}
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: 4,
            textTransform: 'uppercase',
            animation: 'fadeSlideIn 0.6s ease',
          }}
        >
          {film.title}
        </h1>

        <p
          key={`desc-${film.id}`}
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginTop: 12,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            animation: 'fadeSlideIn 0.6s ease 0.1s both',
          }}
        >
          {film.overview}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
          <Link href={`/movies/${film.id}`} className="play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play
          </Link>
          <button className="icon-btn" title="Add to Watchlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <Link href={`/movies/${film.id}`} className="icon-btn" title="More Info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 14 }}>
            ★ {film.vote_average.toFixed(1)}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            {film.release_date?.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="carousel-dots" style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
        {films.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            style={{ border: 'none', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>

      {/* Right badge */}
      <div style={{
        position: 'absolute',
        bottom: 50,
        right: 40,
        background: 'rgba(0,0,0,0.5)',
        padding: '8px 16px',
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: 'var(--gold)',
        zIndex: 2,
      }}>
        {current + 1} / {count}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
