import { Film } from '@/types/types';
import MoviesList from '@/components/MoviesList';
import GenreFilter from '@/components/GenreFilter';
import SortSelector from '@/components/SortSelector';
import HeroBanner from '@/components/HeroBanner';
import LoadMore from '@/components/LoadMore';
import fetchGenres from '@/Data/films';

const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string; genre?: string; sort?: string; category?: string };
}) {
  const params = await searchParams;
  let url: string;
  let sectionTitle = 'Popular Movies';

  if (params.query) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${params.query}`;
    sectionTitle = `Results for "${params.query}"`;
  } else if (params.genre) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${params.genre}`;
    sectionTitle = 'By Genre';
  } else if (params.category === 'trending') {
    url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    sectionTitle = 'Trending This Week';
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  }

  const [mainRes, topRatedRes, nowPlayingRes, upcomingRes, genres] = await Promise.all([
    fetch(url),
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`),
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`),
    fetchGenres(),
  ]);

  if (!mainRes.ok) throw new Error('Failed to load');

  const mainData = await mainRes.json();
  const topRatedData = topRatedRes.ok ? await topRatedRes.json() : { results: [] };
  const nowPlayingData = nowPlayingRes.ok ? await nowPlayingRes.json() : { results: [] };
  const upcomingData = upcomingRes.ok ? await upcomingRes.json() : { results: [] };

  const films: Film[] = mainData.results;
  const topRated: Film[] = topRatedData.results;
  const nowPlaying: Film[] = nowPlayingData.results;
  const upcoming: Film[] = upcomingData.results;

  if (params.sort === 'rating_asc')
    films.sort((a, b) => a.vote_average - b.vote_average);
  else if (params.sort === 'rating_desc')
    films.sort((a, b) => b.vote_average - a.vote_average);
  else if (params.sort === 'date_asc')
    films.sort((a, b) => a.release_date.localeCompare(b.release_date));
  else if (params.sort === 'date_desc')
    films.sort((a, b) => b.release_date.localeCompare(a.release_date));

  // Top 5 films with backdrops for the carousel
  const heroFilms = films.filter(f => f.backdrop_path).slice(0, 5);

  return (
    <div>
      {/* Hero Carousel */}
      {heroFilms.length > 0 && <HeroBanner films={heroFilms} />}

      {/* Filters */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <SortSelector />
          {params.category === 'trending' && (
            <span style={{
              background: 'rgba(0, 168, 225, 0.15)',
              color: 'var(--accent)',
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 600,
            }}>
              🔥 Trending This Week
            </span>
          )}
        </div>
        <GenreFilter genres={genres} />
      </div>

      {/* Movie Rows */}
      <div style={{ padding: '8px 24px 40px' }}>
        <MoviesList films={films} title={sectionTitle} />
        <LoadMore initialUrl={url} initialPage={1} />

        {!params.query && (
          <>
            <div style={{ marginTop: 24 }} />
            <MoviesList films={topRated} title="Top Rated" />
            <MoviesList films={nowPlaying} title="Now Playing" />
            <MoviesList films={upcoming} title="Coming Soon" />
          </>
        )}
      </div>
    </div>
  );
}
