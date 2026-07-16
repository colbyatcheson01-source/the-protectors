'use client';

import { useState } from 'react';

export default function TipPage() {
  const [formData, setFormData] = useState({ content: '', category: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.content.trim()) e.content = 'Please provide details';
    else if (formData.content.length > 5000) e.content = 'Under 5000 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/tips', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error('Error');
      setSubmitted(true);
    } catch (err) { setServerError(err.message); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <section className="section bg-biker-dark">
        <div className="container-custom max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-biker-flame/10 rounded-sm flex items-center justify-center mx-auto mb-6 border-2 border-biker-flame/30">
            <svg className="w-10 h-10 text-biker-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 font-display uppercase tracking-wider">Tip Received</h2>
          <p className="text-neutral-400 font-mono text-sm">Your anonymous tip has been received and will be reviewed privately.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-biker-black relative overflow-hidden py-20 leather-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-biker-flame/5 via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="patch-badge-flame mb-4 inline-flex">Speak in Confidence</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Anonymous Tip</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-mono">Submit information about a safety concern. Your identity is completely protected.</p>
        </div>
      </section>

      <section className="section bg-biker-dark">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="stitch-border border-biker-flame/30 mb-8">
            <h2 className="font-bold text-white mb-3 font-display uppercase tracking-wider text-sm">How It Works</h2>
            <ul className="text-sm text-neutral-500 font-mono space-y-2">
              {['No personal information is collected or stored','Your IP address is not logged','Tips are reviewed privately by our team','If there is immediate danger, call 911 instead'].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-biker-flame font-bold">{'>>'}</span> {item}</li>
              ))}
            </ul>
          </div>

          {serverError && <div className="bg-biker-blood/20 border-2 border-biker-blood/40 rounded-sm p-4 mb-6 text-biker-flame text-sm font-mono">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label className="label">Category (Optional)</label>
              <select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="input">
                <option value="">Select a category...</option>
                <option value="safety_concern">Safety Concern</option>
                <option value="suspicious_activity">Suspicious Activity</option>
                <option value="violence_prevention">Violence Prevention</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Your Tip</label>
              <textarea value={formData.content} onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))} rows={8} className={`input ${errors.content ? 'input-error' : ''}`} placeholder="Provide as much detail as possible including dates, locations, and descriptions." />
              {errors.content && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.content}</p>}
              <p className="mt-1 text-xs text-neutral-600 font-mono">{formData.content.length}/5000</p>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Submitting...' : 'Submit Anonymous Tip'}</button>
          </form>
        </div>
      </section>
    </>
  );
}
