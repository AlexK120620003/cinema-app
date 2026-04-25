'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 16,
        background: 'var(--bg-primary)',
      }}
    >
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#e74c3c'
        strokeWidth='2'
      >
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12.01' y2='16' />
      </svg>
      <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
        {error.message}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '10px 24px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}
