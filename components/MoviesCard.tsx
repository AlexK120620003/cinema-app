import type { FilmsCard } from '@/types/types';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';

export default function MovieCard({
  id,
  title,
  vote_average,
  genre_ids,
  poster_path,
}: FilmsCard) {
  return (
    <Link href={`/movies/${id}`} style={{ textDecoration: 'none' }}>
      <div className="movie-poster" style={{ width: 180, height: 270 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Rating badge */}
        <div className="rating-badge">
          <span style={{ color: '#F5C518' }}>★</span>
          {vote_average.toFixed(1)}
        </div>
        {/* Favorite */}
        <FavoriteButton id={id} />
        {/* Title overlay on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 8px 8px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          }}
        >
          <p style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}
