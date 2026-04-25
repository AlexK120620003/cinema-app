'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SortSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSort(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('sort', term);
    else params.delete('sort');
    router.replace(`${pathname}?${params.toString()}`);
  }

  const current = searchParams.get('sort') ?? '';

  return (
    <select className="sort-select" onChange={e => handleSort(e.target.value)} value={current}>
      <option value=''>Sort by</option>
      <option value='rating_desc'>Rating ↑</option>
      <option value='rating_asc'>Rating ↓</option>
      <option value='date_desc'>Date ↑</option>
      <option value='date_asc'>Date ↓</option>
    </select>
  );
}
