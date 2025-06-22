import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#161618] text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-auto bg-[#161618] border border-gray-700 h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
