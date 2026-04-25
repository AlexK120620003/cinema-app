const API_KEY = '539d13bd55f9b86a3fb3657018de6ebe';

export default async function fetchGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('failed to load Genres');
  const data = await res.json();
  return data.genres;
}
