import { Bell } from 'lucide-react';

export default function Navbar({ title, breadcrumb }) {
  return (
    <header className="hidden md:flex items-center justify-between bg-white border-b border-slate-200 px-8 h-[72px] shrink-0">
      <div className="flex items-baseline gap-2">
        <h1 className="text-[22px] font-medium text-slate-900">{title}</h1>
        {breadcrumb && <span className="text-sm text-slate-400">{breadcrumb}</span>}
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell size={19} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-[13px] font-medium text-slate-800 leading-tight">Becky Cherop</p>
            <p className="text-[11px] text-slate-400 leading-tight">Project Manager</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
            BC
          </div>
        </div>
      </div>
    </header>
  );
}