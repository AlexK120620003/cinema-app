'use client';
import { useState, useEffect } from 'react';

export default function IsFavorite({ id }: { id: number }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('favorites') ?? '';
    const savedArr = saved ? saved.split(',') : [];
    setFavorite(savedArr.includes(id.toString()));
  }, [id]);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem('favorites') ?? '';
    const savedArr = saved ? saved.split(',') : [];
    const idStr = id.toString();
    const updated = savedArr.includes(idStr)
      ? savedArr.filter(f => f !== idStr)
      : [...savedArr, idStr];

    localStorage.setItem('favorites', updated.join(','));
    setFavorite(!favorite);
  }

  return (
    <button
      className={`fav-btn ${favorite ? 'active' : ''}`}
      onClick={handleFavorite}
    >
      {favorite ? '♥' : '♡'}
    </button>
  );
}
