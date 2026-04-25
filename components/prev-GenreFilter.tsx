'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const genres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10749, name: 'Romance' },
  { id: 53, name: 'Thriller' },
];
export default function GenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const current = searchParams.get('genre') ?? '';
  const currentArr = current ? current.split(',') : [];
  function handleGenre(genreId: string) {
    const params = new URLSearchParams(searchParams);

    const updated = currentArr.includes(genreId)
      ? currentArr.filter(id => id !== genreId)
      : [...currentArr, genreId];

    if (updated.length === 0) {
      params.delete('genre');
    } else {
      params.set('genre', updated.join(','));
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <button onClick={() => handleGenre('')}>All</button>
      {genres.map(g => (
        <button
          key={g.id}
          onClick={() => handleGenre(g.id.toString())}
          style={{
            backgroundColor: currentArr.includes(g.id.toString())
              ? 'lightblue'
              : '',
          }}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
