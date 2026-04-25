'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type Genre = { id: number; name: string };

export default function GenreFilter({ genres }: { genres: Genre[] }) {
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
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
      {genres.map(g => (
        <button
          key={g.id}
          className={`genre-pill ${currentArr.includes(g.id.toString()) ? 'active' : ''}`}
          onClick={() => handleGenre(g.id.toString())}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
