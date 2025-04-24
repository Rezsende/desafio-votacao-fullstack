import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="bg-blue-700 text-white lg:fixed lg:inset-y-0 lg:w-60">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Sistema de Votação</h1>
          <nav className="space-y-2"></nav>
        </div>
      </aside>

      <div className="lg:ml-60">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">Dashboard</h2>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
