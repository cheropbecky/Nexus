import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ClipboardCheck, CheckCircle2, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { getRequests, formatTime, initials, avatarColor, statusClass, REQUEST_TYPES, STATUSES } from '../utils/data';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const total = requests.length;
  const open = requests.filter((r) => r.status === 'New' || r.status === 'In Review').length;
  const resolved = requests.filter((r) => r.status === 'Resolved').length;

  const byType = useMemo(() => {
    return REQUEST_TYPES.map((t) => ({ type: t, count: requests.filter((r) => r.type === t).length }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [requests]);
  const maxType = Math.max(1, ...byType.map((t) => t.count));

  const byStatus = useMemo(() => {
    return STATUSES.map((s) => ({
      status: s,
      count: requests.filter((r) => r.status === s).length,
      pct: total ? Math.round((requests.filter((r) => r.status === s).length / total) * 100) : 0,
    }));
  }, [requests, total]);

  const recent = requests.slice(0, 4);

  const STATUS_RING = { New: '#6366F1', 'In Review': '#F59E0B', Resolved: '#10B981', Rejected: '#EF4444' };

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={BarChart3} label="Total requests" value={total} note={total > 0 ? `${total} on record` : 'No data yet'} noteColor="text-emerald-600" />
        <StatCard icon={Clock} label="Open requests" value={open} note={open > 0 ? `${open} need attention` : 'All clear'} noteColor="text-amber-600" />
        <StatCard icon={CheckCircle2} label="Resolved" value={resolved} note="all time" noteColor="text-slate-400" />
        <StatCard icon={ClipboardCheck} label="Resolution rate" value={total ? `${Math.round((resolved / total) * 100)}%` : '0%'} note="of total requests" noteColor="text-slate-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="card p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium text-slate-900">Requests by type</h3>
          </div>
          {byType.length === 0 ? (
            <EmptyMini text="No requests yet — submit one to see this chart fill in." />
          ) : (
            <div className="flex flex-col gap-4">
              {byType.map(({ type, count }) => (
                <div key={type}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="text-slate-600">{type}</span>
                    <span className="font-medium text-slate-900">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(count / maxType) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5 md:p-6">
          <h3 className="font-medium text-slate-900 mb-5">Requests by status</h3>
          {total === 0 ? (
            <EmptyMini text="Nothing to show until requests come in." />
          ) : (
            <div className="flex items-center gap-6">
              <DonutChart data={byStatus} colors={STATUS_RING} />
              <div className="flex flex-col gap-2.5">
                {byStatus.map(({ status, pct }) => (
                  <div key={status} className="flex items-center gap-2 text-[13px]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: STATUS_RING[status] }} />
                    <span className="text-slate-600 w-20">{status}</span>
                    <span className="font-medium text-slate-900">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 md:p-6 pb-4">
          <h3 className="font-medium text-slate-900">Recent active requests</h3>
          <Link to="/requests" className="text-[13px] text-indigo-600 font-medium hover:underline">View all</Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 pb-8"><EmptyMini text="No requests submitted yet." /></div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 px-6 py-2.5 bg-slate-50 text-[11px] font-medium text-slate-500 uppercase tracking-wide border-y border-slate-100">
              <span>Requester</span>
              <span>Message</span>
              <span>Status</span>
              <span>Created</span>
            </div>
            {recent.map((r) => (
              <div key={r.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr] gap-2 md:gap-4 px-6 py-3.5 border-b border-slate-100 last:border-0 items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shrink-0" style={{ background: avatarColor(r.name) }}>
                    {initials(r.name)}
                  </div>
                  <span className="text-[13px] font-medium text-slate-800">{r.name}</span>
                </div>
                <p className="text-[13px] text-slate-500 truncate">{r.message}</p>
                <span className={`status-badge ${statusClass(r.status)} w-fit`}>{r.status}</span>
                <span className="text-[12px] text-slate-400">{formatTime(r.created)}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ icon: Icon, label, value, note, noteColor }) {
  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Icon size={16} />
        </div>
        <span className={`text-[11px] font-medium ${noteColor}`}>{note}</span>
      </div>
      <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function DonutChart({ data, colors }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  let acc = 0;
  const r = 40, c = 2 * Math.PI * r;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="shrink-0">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#F1F5F9" strokeWidth="14" />
      {data.filter((d) => d.count > 0).map((d) => {
        const frac = d.count / total;
        const dash = frac * c;
        const offset = c - acc;
        acc += dash;
        return (
          <circle
            key={d.status}
            cx="55" cy="55" r={r} fill="none"
            stroke={colors[d.status]} strokeWidth="14"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={offset}
            transform="rotate(-90 55 55)"
            strokeLinecap="butt"
          />
        );
      })}
      <text x="55" y="59" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0F172A">{total}</text>
    </svg>
  );
}

function EmptyMini({ text }) {
  return <p className="text-[13px] text-slate-400 text-center py-8">{text}</p>;
}