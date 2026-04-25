// export type Genre =
//   | 'Action'
//   | 'Adventure'
//   | 'Animation'
//   | 'Comedy'
//   | 'Crime'
//   | 'Documentary'
//   | 'Drama'
//   | 'Fantasy'
//   | 'Historical'
//   | 'Horror'
//   | 'Musical'
//   | 'Mystery'
//   | 'Romance'
//   | 'Sci-Fi'
//   | 'Thriller'
//   | 'Western';

export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  backdrop_path: string;
}

export interface FilmDetails extends Film {
  runtime: number;
  genres: { id: number; name: string }[];
}

export type MoviesListProps = {
  films: Film[];
};

export type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export type FilmsCard = Pick<
  Film,
  'id' | 'title' | 'vote_average' | 'genre_ids' | 'poster_path'
>;

export type User = {
  id: number;
  name: string;
  isOnline: boolean;
};
