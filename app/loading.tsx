export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
    }}>
      <div className="spinner" />
      <p style={{ marginTop: 16, color: 'var(--text-secondary)', fontSize: 14 }}>Loading...</p>
    </div>
  );
}
