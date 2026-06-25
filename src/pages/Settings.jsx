import { useState } from 'react';
import { Camera, CreditCard, ShieldCheck, LogOut, UserPlus, MoreVertical } from 'lucide-react';
import Layout from '../components/Layout';

const TEAM = [
  { name: 'Jordan wanjau', email: 'jordan@nexus.com', role: 'Admin', status: 'Active', color: '#6366F1' },
  { name: 'Sarah Kimani', email: 'sarah.k@nexus.com', role: 'Editor', status: 'Active', color: '#F59E0B' },
  { name: 'Marcus Nyakundi', email: 'm.lee@nexus.com', role: 'Viewer', status: 'Pending', color: '#94A3B8' },
];

export default function Settings() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [desktop, setDesktop] = useState(false);

  return (
    <Layout title="Settings">
      <div className="card p-5 md:p-6 mb-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-medium text-slate-900">Profile information</h3>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage your personal account details.</p>
          </div>
          <button className="btn-outline text-[13px]">Edit</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-xl font-semibold">
              AR
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center border-2 border-white">
              <Camera size={11} />
            </button>
          </div>
          <div>
            <p className="font-medium text-slate-900">Becky Cherop</p>
            <p className="text-[13px] text-slate-500">cheropbecky@nexus.com</p>
            <div className="flex gap-2 mt-1.5">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-medium">Admin access</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card p-5 md:p-6">
          <h3 className="font-medium text-slate-900 mb-1">Notifications</h3>
          <p className="text-[13px] text-slate-500 mb-4">Choose how and when you want to be alerted.</p>

          <ToggleRow label="Email notifications" checked={email} onChange={setEmail} />
          <ToggleRow label="Push alerts" checked={push} onChange={setPush} />
          <ToggleRow label="Desktop alerts" checked={desktop} onChange={setDesktop} last />
        </div>

        <div className="card p-5 md:p-6">
          <h3 className="font-medium text-slate-900 mb-1">Account</h3>
          <p className="text-[13px] text-slate-500 mb-4">Manage billing, security, and access.</p>

          <button className="w-full flex items-center justify-between py-3 border-b border-slate-100 text-left">
            <span className="flex items-center gap-3 text-[14px] text-slate-700"><CreditCard size={16} className="text-slate-400" /> Billing & subscription</span>
            <span className="text-slate-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between py-3 border-b border-slate-100 text-left">
            <span className="flex items-center gap-3 text-[14px] text-slate-700"><ShieldCheck size={16} className="text-slate-400" /> Security & password</span>
            <span className="text-slate-400">›</span>
          </button>
          <button className="w-full flex items-center gap-3 py-3 text-left text-red-600 text-[14px]">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      <div className="card p-5 md:p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-slate-900">Team management</h3>
          <button className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-medium px-3.5 py-2 rounded-lg">
            <UserPlus size={14} /> Add member
          </button>
        </div>
        <p className="text-[13px] text-slate-500 mb-4">Invite and manage roles for your workspace collaborators.</p>

        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-1 py-2 text-[11px] text-slate-500 uppercase tracking-wide border-b border-slate-100">
          <span>Member</span><span>Role</span><span>Status</span><span></span>
        </div>
        {TEAM.map((m) => (
          <div key={m.email} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 md:gap-4 px-1 py-3 border-b border-slate-100 last:border-0 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: m.color }}>
                {m.name.split(' ').map((w) => w[0]).join('')}
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-800">{m.name}</p>
                <p className="text-[12px] text-slate-400">{m.email}</p>
              </div>
            </div>
            <span className="text-[13px] text-slate-600">{m.role}</span>
            <span className="flex items-center gap-1.5 text-[13px] text-slate-600">
              <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Active' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
              {m.status}
            </span>
            <button className="text-slate-400 hover:text-slate-600 justify-self-end md:justify-self-auto">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function ToggleRow({ label, checked, onChange, last }) {
  return (
    <div className={`flex items-center justify-between py-3 ${last ? '' : 'border-b border-slate-100'}`}>
      <span className="text-[14px] text-slate-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5.5 rounded-full relative transition-colors ${checked ? 'bg-indigo-500' : 'bg-slate-300'}`}
        style={{ width: 40, height: 22 }}
        aria-pressed={checked}
      >
        <span
          className="absolute bg-white rounded-full transition-transform"
          style={{ width: 16, height: 16, top: 3, left: 3, transform: checked ? 'translateX(18px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}