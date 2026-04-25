import { Film } from '@/types/types';
import type { MoviesListProps } from '@/types/types';
import MovieCard from '@/components/MoviesCard';

export default function MoviesList({ films, title }: MoviesListProps & { title?: string }) {
  return (
    <section style={{ marginBottom: 32 }}>
      {title && (
        <div className="section-title" style={{ cursor: 'pointer' }}>
          {title}
          <span className="chevron">›</span>
        </div>
      )}
      <div className="scroll-row">
        {films.map(item => (
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
    </section>
  );
}
