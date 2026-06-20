import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-muted flex flex-col font-sans text-surface-dark">
      <main className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-md bg-white min-h-screen shadow-soft relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
