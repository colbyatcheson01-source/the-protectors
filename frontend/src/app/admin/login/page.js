'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuth } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuth(data.token, data.admin);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-biker-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-biker-dark rounded-sm flex items-center justify-center mx-auto mb-4 border-2 border-biker-chrome/40">
            <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
              <ellipse cx="50" cy="48" rx="18" ry="20" stroke="#e0e0e0" strokeWidth="3"/>
              <ellipse cx="43" cy="42" rx="4" ry="5" fill="#ff6f00"/>
              <ellipse cx="57" cy="42" rx="4" ry="5" fill="#ff6f00"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-display uppercase tracking-wider">Admin Login</h1>
          <p className="text-neutral-500 mt-1 font-mono text-sm">The Enforcers MC — Club Admin</p>
        </div>

        <div className="bg-biker-dark border-2 border-biker-steel/60 rounded-sm p-8">
          {error && (
            <div className="bg-biker-blood/20 border-2 border-biker-blood/40 rounded-sm p-4 mb-6 text-biker-flame text-sm font-mono">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className="input"
                placeholder="[admin email]"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                className="input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-600 font-mono">
          <a href="/" className="text-biker-flame hover:underline">&larr; Back to main site</a>
        </p>
      </div>
    </div>
  );
}
