import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC = () => (
  <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content Area */}
    <main className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);
