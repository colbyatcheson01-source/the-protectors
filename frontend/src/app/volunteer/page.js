'use client';

import { useState } from 'react';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', availability: '', skills: '', consentGiven: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Required';
    if (!formData.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim()) e.phone = 'Required';
    if (!formData.availability.trim()) e.availability = 'Required';
    if (!formData.skills.trim()) e.skills = 'Required';
    if (!formData.consentGiven) e.consentGiven = 'You must consent to screening';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/volunteer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Error'); }
      setSubmitted(true);
    } catch (err) { setServerError(err.message); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <>
        <section className="bg-biker-black py-20">
          <div className="container-custom text-center">
            <div className="patch-badge-flame mb-4 inline-flex">Application Received</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Enlistment Received</h1>
          </div>
        </section>
        <section className="section bg-biker-dark">
          <div className="container-custom max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-biker-flame/10 rounded-sm flex items-center justify-center mx-auto mb-6 border-2 border-biker-flame/30">
              <svg className="w-10 h-10 text-biker-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 font-display uppercase tracking-wider">Welcome, Brother</h2>
            <p className="text-neutral-400 mb-8 leading-relaxed font-mono text-sm">
              Thank you for your interest in riding with The Enforcers MC. Our team will review your application and contact you within 5-7 business days regarding next steps, including the background screening process.
            </p>
            <p className="text-sm text-neutral-600 font-mono">Questions? <span className="text-biker-flame">[insert email]</span></p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-biker-black relative overflow-hidden py-20 leather-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-biker-flame/5 via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="patch-badge-flame mb-4 inline-flex">Ride With Us</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-tighter">Enlist in the Club</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-mono">Join our club of dedicated volunteers working to build safer communities across Canada. Stand for what&rsquo;s right.</p>
        </div>
      </section>

      <section className="section bg-biker-dark">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="stitch-border border-biker-flame/30 mb-12">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-biker-flame mt-1 flex-shrink-0" viewBox="0 0 100 100" fill="none">
                <ellipse cx="50" cy="48" rx="18" ry="20" stroke="#ff6f00" strokeWidth="3"/>
                <ellipse cx="43" cy="42" rx="4" ry="5" fill="#ff6f00"/>
                <ellipse cx="57" cy="42" rx="4" ry="5" fill="#ff6f00"/>
              </svg>
              <div>
                <h2 className="font-bold text-white mb-2 font-display uppercase tracking-wider text-sm">Before You Enlist</h2>
                <p className="text-neutral-500 text-sm leading-relaxed font-mono">All members are subject to background checks in compliance with Canadian laws and privacy standards. This includes a criminal record check and vulnerable sector screening. Your personal information will be kept confidential.</p>
              </div>
            </div>
          </div>

          {serverError && <div className="bg-biker-blood/20 border-2 border-biker-blood/40 rounded-sm p-4 mb-6 text-biker-flame text-sm font-mono">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label className="label">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`input ${errors.fullName ? 'input-error' : ''}`} placeholder="Full name" />
              {errors.fullName && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.fullName}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`input ${errors.email ? 'input-error' : ''}`} placeholder="email@example.com" />
                {errors.email && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`input ${errors.phone ? 'input-error' : ''}`} placeholder="+1 (555) 000-0000" />
                {errors.phone && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="label">Availability</label>
              <textarea name="availability" value={formData.availability} onChange={handleChange} rows={3} className={`input ${errors.availability ? 'input-error' : ''}`} placeholder="Your availability (evenings, weekends, hours per week)" />
              {errors.availability && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.availability}</p>}
            </div>
            <div>
              <label className="label">Skills & Experience</label>
              <textarea name="skills" value={formData.skills} onChange={handleChange} rows={4} className={`input ${errors.skills ? 'input-error' : ''}`} placeholder="Describe your skills and why you want to ride with The Enforcers MC" />
              {errors.skills && <p className="mt-1 text-xs text-biker-flame font-mono">{errors.skills}</p>}
            </div>

            <div className="bg-biker-black/80 border-2 border-biker-steel/60 rounded-sm p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="consentGiven" name="consentGiven" checked={formData.consentGiven} onChange={handleChange} className="mt-1 w-4 h-4 text-biker-flame border-biker-steel rounded-none focus:ring-biker-flame bg-biker-black" />
                <label htmlFor="consentGiven" className="text-sm text-neutral-400 leading-relaxed cursor-pointer font-mono">
                  <span className="font-bold text-biker-flame">I consent to lawful background screening conducted through approved third-party providers.</span>
                  {' '}I understand that a criminal record check and vulnerable sector screening will be required. I authorize The Enforcers MC to conduct these checks through approved providers in accordance with Canadian laws.
                </label>
              </div>
              {errors.consentGiven && <p className="mt-2 text-xs text-biker-flame ml-7 font-mono">{errors.consentGiven}</p>}
            </div>

            <div className="bg-biker-flame/5 border-2 border-biker-flame/20 rounded-sm p-4 text-xs text-neutral-500 font-mono">
              <strong className="text-biker-flame">Privacy Notice:</strong> All members are subject to background checks. Your information will be encrypted at rest.
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full text-lg py-4">
              {submitting ? 'Processing...' : 'Submit Enlistment'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
