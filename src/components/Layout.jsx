import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import RequestModal from './RequestModal';

export default function Layout({ children, title, breadcrumb }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar onOpenModal={() => setModalOpen(true)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} breadcrumb={breadcrumb} />

        {/* mobile header, since Navbar hides on small screens */}
        <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 h-14 sticky top-0 z-30">
          <h1 className="text-lg font-medium text-slate-900">{title}</h1>
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
            AR
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      <BottomNav />

      {/* floating add button on mobile */}
      <button
        onClick={() => setModalOpen(true)}
        className="md:hidden fixed bottom-20 right-4 w-13 h-13 rounded-full bg-indigo-500 text-white shadow-lg flex items-center justify-center z-40"
        style={{ width: 52, height: 52 }}
        aria-label="Submit request"
      >
        <span className="text-2xl leading-none">+</span>
      </button>

      {modalOpen && <RequestModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}