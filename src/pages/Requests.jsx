import { useEffect, useMemo, useState } from 'react';
import { Search, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import {
  getRequests, updateRequest, deleteRequest, formatTime,
  initials, avatarColor, statusClass, priorityDotClass,
  PRODUCTS, REQUEST_TYPES, PRIORITIES, STATUSES,
} from '../utils/data';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterProduct, setFilterProduct] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
      const matchesProduct = filterProduct === 'All' || r.product === filterProduct;
      const matchesType = filterType === 'All' || r.type === filterType;
      return matchesQuery && matchesStatus && matchesProduct && matchesType;
    });
  }, [requests, query, filterStatus, filterProduct, filterType]);

  function changeStatus(id, status) {
    setRequests(updateRequest(id, { status }));
    setOpenMenu(null);
  }

  function remove(id) {
    if (!window.confirm('Delete this request? This cannot be undone.')) return;
    setRequests(deleteRequest(id));
    setOpenMenu(null);
  }

  return (
    <Layout title="Requests" breadcrumb={`${filtered.length} of ${requests.length}`}>
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto md:overflow-visible">
          <Select value={filterProduct} onChange={setFilterProduct} options={['All', ...PRODUCTS]} />
          <Select value={filterType} onChange={setFilterType} options={['All', ...REQUEST_TYPES]} />
          <Select value={filterStatus} onChange={setFilterStatus} options={['All', ...STATUSES]} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card py-16 text-center">
          <p className="text-slate-500 text-sm">
            {requests.length === 0 ? 'No requests yet. Submit your first one to get started.' : 'No requests match your filters.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((r) => (
            <div key={r.id} className="card p-4 hover:border-indigo-200 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: avatarColor(r.name) }}>
                    {initials(r.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-slate-800 truncate">{r.name}</p>
                    <p className="text-[12px] text-slate-400 truncate">{r.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:w-40 shrink-0">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-medium truncate">{r.product}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-500 line-clamp-2 md:line-clamp-1">{r.message}</p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 md:w-64 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`priority-dot ${priorityDotClass(r.priority)}`} />
                    <span className="text-[12px] text-slate-500">{r.priority}</span>
                  </div>
                  <span className="text-[12px] text-slate-400 hidden lg:inline">{formatTime(r.created)}</span>
                  <span className={`status-badge ${statusClass(r.status)}`}>{r.status}</span>

                  <div className="relative">
                    <button onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)} className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === r.id && (
                      <div className="absolute right-0 top-7 bg-white border border-slate-200 rounded-lg shadow-lg w-44 z-20 py-1.5 text-[13px]">
                        <p className="px-3 py-1 text-[11px] text-slate-400 uppercase tracking-wide">Change status</p>
                        {STATUSES.map((s) => (
                          <button key={s} onClick={() => changeStatus(r.id, s)} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                            {s}
                          </button>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button onClick={() => { setEditing(r); setOpenMenu(null); }} className="w-full flex items-center gap-2 text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                            <Pencil size={13} /> Edit
                          </button>
                          <button onClick={() => remove(r.id)} className="w-full flex items-center gap-2 text-left px-3 py-1.5 hover:bg-red-50 text-red-600">
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <EditDrawer
          request={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => { setRequests(updateRequest(editing.id, data)); setEditing(null); }}
        />
      )}
    </Layout>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] text-slate-600 shrink-0"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function EditDrawer({ request, onClose, onSave }) {
  const [form, setForm] = useState({ ...request });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-medium text-slate-900">Edit request</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="flex flex-col gap-4">
          <LabeledInput label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <LabeledInput label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <LabeledSelect label="Product / Company" value={form.product} onChange={(v) => setForm((f) => ({ ...f, product: v }))} options={PRODUCTS} />
          <LabeledSelect label="Request type" value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))} options={REQUEST_TYPES} />
          <LabeledSelect label="Priority" value={form.priority} onChange={(v) => setForm((f) => ({ ...f, priority: v }))} options={PRIORITIES} />
          <LabeledSelect label="Status" value={form.status} onChange={(v) => setForm((f) => ({ ...f, status: v }))} options={STATUSES} />
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-slate-700">Message</span>
            <textarea rows={4} className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm resize-none" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
          </label>
          <button onClick={() => onSave(form)} className="btn-primary mt-2 py-2.5">Save changes</button>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-slate-700">{label}</span>
      <input className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-slate-700">{label}</span>
      <select className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}