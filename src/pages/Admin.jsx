import { useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Download, Pencil } from 'lucide-react';
import Layout from '../components/Layout';
import {
  getRequests, deleteRequests, exportCSV, formatTime, statusClass, priorityDotClass,
} from '../utils/data';

const PAGE_SIZE = 6;

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  }, [requests, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allOnPageSelected = pageItems.length > 0 && pageItems.every((r) => selected.includes(r.id));

  function toggleAll() {
    if (allOnPageSelected) {
      setSelected((s) => s.filter((id) => !pageItems.some((r) => r.id === id)));
    } else {
      setSelected((s) => [...new Set([...s, ...pageItems.map((r) => r.id)])]);
    }
  }

  function toggleOne(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function bulkDelete() {
    if (selected.length === 0) return;
    if (!window.confirm(`Delete ${selected.length} request${selected.length > 1 ? 's' : ''}? This cannot be undone.`)) return;
    setRequests(deleteRequests(selected));
    setSelected([]);
  }

  function exportSelected() {
    const rows = selected.length ? requests.filter((r) => selected.includes(r.id)) : filtered;
    exportCSV(rows);
  }

  const critical = requests.filter((r) => r.priority === 'Critical' && r.status !== 'Resolved').length;
  const resolvedCount = requests.filter((r) => r.status === 'Resolved').length;
  const satRate = requests.length ? Math.round((resolvedCount / requests.length) * 100) : 0;

  return (
    <Layout title="Admin Panel" breadcrumb="Workspace > Global Requests">
      <div className="card mb-5 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b border-slate-100">
          <label className="flex items-center gap-2 text-[13px] text-slate-600 shrink-0">
            <input type="checkbox" checked={allOnPageSelected} onChange={toggleAll} className="w-4 h-4 accent-indigo-500" />
            Select all
          </label>
          <button onClick={bulkDelete} disabled={selected.length === 0} className="flex items-center gap-1.5 text-[13px] font-medium text-red-600 disabled:text-slate-300 disabled:cursor-not-allowed shrink-0">
            <Trash2 size={14} /> Delete selected{selected.length > 0 ? ` (${selected.length})` : ''}
          </button>
          <button onClick={exportSelected} className="flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 shrink-0">
            <Download size={14} /> Export {selected.length ? 'selected' : 'all'} as CSV
          </button>
          <div className="relative flex-1 md:ml-auto">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Filter requests..."
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left w-8"></th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Requester</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-slate-400">No requests found.</td></tr>
              ) : pageItems.map((r, i) => (
                <tr key={r.id} className={i % 2 === 1 ? 'bg-slate-50/60' : ''}>
                  <td className="px-4 py-3.5">
                    <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleOne(r.id)} className="w-4 h-4 accent-indigo-500" />
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700">{r.id}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-slate-400 text-[12px]">{r.email}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{r.product}</td>
                  <td className="px-4 py-3.5 text-slate-600">{r.type}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className={`priority-dot ${priorityDotClass(r.priority)}`} /> {r.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5"><span className={`status-badge ${statusClass(r.status)}`}>{r.status}</span></td>
                  <td className="px-4 py-3.5 text-slate-500">{formatTime(r.created)}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => { if (window.confirm('Delete this request?')) setRequests(deleteRequests([r.id])); }} className="text-slate-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-slate-100 text-[13px] text-slate-500">
          <span>Showing {pageItems.length ? (page - 1) * PAGE_SIZE + 1 : 0} to {(page - 1) * PAGE_SIZE + pageItems.length} of {filtered.length} entries</span>
          <div className="flex items-center gap-1">
            <PageBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((n) => (
              <PageBtn key={n} active={page === n} onClick={() => setPage(n)}>{n}</PageBtn>
            ))}
            <PageBtn disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>›</PageBtn>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total requests" value={requests.length} />
        <MiniStat label="Critical pending" value={critical} valueColor="text-red-600" />
        <MiniStat label="Resolved" value={resolvedCount} />
        <MiniStat label="Resolution rate" value={`${satRate}%`} />
      </div>
    </Layout>
  );
}

function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 rounded-md text-[13px] flex items-center justify-center ${
        active ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent'
      }`}
    >
      {children}
    </button>
  );
}

function MiniStat({ label, value, valueColor = 'text-slate-900' }) {
  return (
    <div className="card p-4">
      <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}