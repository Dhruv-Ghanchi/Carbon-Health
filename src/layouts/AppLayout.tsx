import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
