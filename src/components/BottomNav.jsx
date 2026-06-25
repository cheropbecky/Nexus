import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, ShieldCheck, Settings } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/requests', label: 'Requests', icon: ClipboardList },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-slate-800 flex items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)] z-40">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] ${
              isActive ? 'text-indigo-400' : 'text-slate-500'
            }`
          }
        >
          <Icon size={19} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}