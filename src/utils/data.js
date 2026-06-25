export const PRODUCTS = [
  'Acme Corp', 'Globex Solutions', 'Starlight Ventures',
  'Innovate Co', 'TechTide', 'Nexus Labs', 'PhotoMed'
];

export const REQUEST_TYPES = [
  'Bug Report', 'Feature Request', 'General Feedback', 'Partnership', 'Other'
];

export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
export const STATUSES = ['New', 'In Review', 'Resolved', 'Rejected'];

const STORAGE_KEY = 'nexus_requests';

const SEED = [
  { id: 'REQ-8429', name: 'Alex Kiptoo', email: 'alex@acme.inc', product: 'Acme Corp', type: 'Feature Request', priority: 'Critical', status: 'In Review', message: 'Integration with Slack API for real-time notifications on ticket updates and status changes.', created: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'REQ-8428', name: 'Sarah Kimani', email: 'sarah@globex.com', product: 'Globex Solutions', type: 'Bug Report', priority: 'High', status: 'New', message: 'Checkout form CSS is broken on Safari, submit button is not visible below the fold on smaller screens.', created: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 'REQ-8427', name: 'Jordan Nyakundi', email: 'jordan@starlight.io', product: 'Starlight Ventures', type: 'General Feedback', priority: 'Low', status: 'Resolved', message: 'Please update the privacy policy page to reflect the new GDPR compliance changes from this quarter.', created: new Date(Date.now() - 86400000).toISOString() },
  { id: 'REQ-8426', name: 'Maya Atieno', email: 'maya@innovate.co', product: 'Innovate Co', type: 'General Feedback', priority: 'Medium', status: 'In Review', message: 'Billing inquiry about the enterprise tier pricing structure and available volume discounts.', created: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'REQ-8425', name: 'David Kaunda', email: 'david@techtide.net', product: 'TechTide', type: 'Feature Request', priority: 'Critical', status: 'Rejected', message: 'Dark mode toggle for PDF exports would help reduce eye strain during long review sessions.', created: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: 'REQ-8424', name: 'Ryan Kanyari', email: 'ryan@nexuslabs.io', product: 'Nexus Labs', type: 'Feature Request', priority: 'Medium', status: 'In Review', message: 'AI powered ticket auto categorization to cut down on manual triage time for the support team.', created: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: 'REQ-8423', name: 'Jane Nekesa', email: 'jane@photomed.app', product: 'PhotoMed', type: 'Bug Report', priority: 'High', status: 'New', message: 'Mobile login screen flickers on iOS 17 when switching focus between the email and password fields.', created: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: 'REQ-8422', name: 'Michael Sang', email: 'michael@nexuslabs.io', product: 'Nexus Labs', type: 'Feature Request', priority: 'High', status: 'New', message: 'Database connection timeout happens during production traffic spikes, needs connection pooling.', created: new Date(Date.now() - 6 * 86400000).toISOString() },
];

export function getRequests() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { /* ignore parse errors */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  return SEED;
}

export function saveRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addRequest(req) {
  const all = getRequests();
  const nextNum = 8430 + all.length;
  const newReq = { ...req, id: 'REQ-' + nextNum, status: 'New', created: new Date().toISOString() };
  const updated = [newReq, ...all];
  saveRequests(updated);
  return updated;
}

export function updateRequest(id, data) {
  const updated = getRequests().map((r) => (r.id === id ? { ...r, ...data } : r));
  saveRequests(updated);
  return updated;
}

export function deleteRequest(id) {
  const updated = getRequests().filter((r) => r.id !== id);
  saveRequests(updated);
  return updated;
}

export function deleteRequests(ids) {
  const updated = getRequests().filter((r) => !ids.includes(r.id));
  saveRequests(updated);
  return updated;
}

export function exportCSV(requests, filename = 'nexus-requests.csv') {
  const headers = ['ID', 'Name', 'Email', 'Product', 'Type', 'Priority', 'Status', 'Created', 'Message'];
  const rows = requests.map((r) => [
    r.id, r.name, r.email, r.product, r.type, r.priority, r.status,
    new Date(r.created).toLocaleDateString(), `"${(r.message || '').replace(/"/g, "'")}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export function formatTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function initials(name = '') {
  return name.split(' ').filter(Boolean).map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#F97316'];
export function avatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function statusClass(status) {
  return {
    New: 'bg-indigo-50 text-indigo-700',
    'In Review': 'bg-amber-50 text-amber-700',
    Resolved: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-red-50 text-red-700',
  }[status] || 'bg-slate-100 text-slate-600';
}

export function priorityDotClass(priority) {
  return {
    Low: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    High: 'bg-red-500',
    Critical: 'bg-red-700',
  }[priority] || 'bg-slate-400';
}