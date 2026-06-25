import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, ShieldCheck, Settings, Plus } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/requests', label: 'Requests', icon: ClipboardList },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onOpenModal }) {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col bg-[#0F172A] h-screen sticky top-0 shrink-0">
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2.5 mb-9">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] leading-tight">Nexus</p>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Request Tracking</p>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-500/15 text-white border-l-2 border-indigo-500 -ml-0.5 pl-[17px]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-5 pb-6">
        <button
          onClick={onOpenModal}
          className="w-full flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Submit Request
        </button>

        <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            AR
          </div>
          <div className="min-w-0">
            <p className="text-white text-[13px] font-medium truncate">Alex Rivera</p>
            <p className="text-slate-500 text-[11px]">Project Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}