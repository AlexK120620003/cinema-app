'use client';
import type { MoviesListProps } from '@/types/types';
import { useState } from 'react';

export default function MoviePage({ films }: MoviesListProps) {
  const [search, setSearch] = useState('');
  return <div></div>;
}
