'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdmin, isAuthenticated, clearAuth, apiRequest } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setAdmin(getAdmin());
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiRequest('/stats');
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="font-semibold text-primary-900">Admin Dashboard</h1>
              {admin && <p className="text-xs text-neutral-500">{admin.name} ({admin.email})</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/volunteers" className="text-sm text-neutral-600 hover:text-primary-500">Volunteers</a>
            <a href="/admin/tips" className="text-sm text-neutral-600 hover:text-primary-500">Tips</a>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Overview</h2>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <p className="text-sm text-neutral-500 mb-1">Total Volunteers</p>
              <p className="text-3xl font-bold text-primary-900">{stats.totalVolunteers}</p>
            </div>
            <div className="card">
              <p className="text-sm text-neutral-500 mb-1">Pending Applications</p>
              <p className="text-3xl font-bold text-accent-500">{stats.pendingApplications}</p>
            </div>
            <div className="card">
              <p className="text-sm text-neutral-500 mb-1">Approved Volunteers</p>
              <p className="text-3xl font-bold text-green-600">{stats.approvedVolunteers}</p>
            </div>
            <div className="card">
              <p className="text-sm text-neutral-500 mb-1">Total Members</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalMembers}</p>
            </div>
            <div className="card">
              <p className="text-sm text-neutral-500 mb-1">Anonymous Tips</p>
              <p className="text-3xl font-bold text-primary-500">{stats.totalTips}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold text-primary-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/admin/volunteers" className="block btn-secondary text-sm text-center">Review Volunteer Applications</a>
              <a href="/admin/tips" className="block btn-secondary text-sm text-center">View Anonymous Tips</a>
              <a href="/admin/volunteers?export=1" className="block btn-secondary text-sm text-center">Export Volunteer Data</a>
            </div>
          </div>

            <div className="card">
              <h3 className="font-semibold text-primary-900 mb-4">Important Notice</h3>
              <div className="text-sm text-neutral-600 space-y-2">
                <p>All volunteer data is encrypted at rest. Only authorized administrators have access.</p>
                <p>Background screening results and rejection reasons are stored encrypted and visible to admins only.</p>
                <p>Approved volunteers can be promoted to Members. Members track a &quot;member since&quot; date.</p>
                <p>All admin actions are logged for audit purposes.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
