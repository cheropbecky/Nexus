import { useState } from 'react';
import { X, Clock, ShieldCheck, FileText } from 'lucide-react';
import { PRODUCTS, REQUEST_TYPES, PRIORITIES, addRequest } from '../utils/data';

const EMPTY = { name: '', email: '', product: '', type: 'Bug Report', priority: 'Low', message: '' };

export default function RequestModal({ onClose, onSubmitted }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.product) e.product = 'Select a product or company';
    if (!form.message.trim()) e.message = 'Tell us what this is about';
    else if (form.message.trim().length < 10) e.message = 'A few more details would help';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    addRequest(form);
    setSubmitted(true);
    onSubmitted?.();
    setTimeout(onClose, 1100);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/50 p-0 md:p-4">
      <div className="bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100 sticky top-0 bg-white">
          <div>
            <h2 className="text-lg font-medium text-slate-900">Submit a request</h2>
            <p className="text-[13px] text-slate-500 mt-0.5">Give us the details and we'll get back to you.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 mt-1" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={22} />
            </div>
            <p className="text-slate-900 font-medium">Request submitted</p>
            <p className="text-sm text-slate-500 mt-1">It now shows up in your requests list.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.name}>
                <input
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-400 ${errors.name ? 'border-red-400' : 'border-slate-300'}`}
                  placeholder="e.g. Becky Kiptanui"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-400 ${errors.email ? 'border-red-400' : 'border-slate-300'}`}
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product / Company" error={errors.product}>
                <select
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white ${errors.product ? 'border-red-400' : 'border-slate-300'}`}
                  value={form.product}
                  onChange={(e) => set('product', e.target.value)}
                >
                  <option value="">Select an option</option>
                  {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Request type">
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                  value={form.type}
                  onChange={(e) => set('type', e.target.value)}
                >
                  {REQUEST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Priority level">
              <div className="grid grid-cols-4 rounded-lg overflow-hidden border border-slate-300">
                {PRIORITIES.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => set('priority', p)}
                    className={`py-2 text-[13px] font-medium transition-colors ${
                      form.priority === p ? 'bg-indigo-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Message / description" error={errors.message}>
              <textarea
                rows={4}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-400 resize-none ${errors.message ? 'border-red-400' : 'border-slate-300'}`}
                placeholder="Describe your request in detail. Mention steps to reproduce if this is a bug."
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
              />
            </Field>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="text-sm text-slate-500 font-medium px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                Submit request
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 mt-2">
              <Perk icon={Clock} title="Quick response" text="2–4 business hours for high priority items." />
              <Perk icon={ShieldCheck} title="Secure" text="Handled only by verified reviewers." />
              <Perk icon={FileText} title="Tracked" text="Follow status from your requests list." />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="text-[12px] text-red-500">{error}</span>}
    </label>
  );
}

function Perk({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <Icon size={14} />
      </div>
      <p className="text-[12px] font-medium text-slate-700">{title}</p>
      <p className="text-[11px] text-slate-500 leading-snug">{text}</p>
    </div>
  );
}