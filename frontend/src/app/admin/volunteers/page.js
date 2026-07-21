'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, clearAuth, apiRequest } from '@/lib/auth';

export default function AdminVolunteersPage() {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [updating, setUpdating] = useState(null);
  const [message, setMessage] = useState('');
  const [rejectNotes, setRejectNotes] = useState({});

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await apiRequest('/volunteers');
      setVolunteers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(id);
    setMessage('');
    try {
      await apiRequest(`/volunteers/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      setMessage(`Status updated to ${status}`);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleScreeningUpdate = async (id, screeningStatus) => {
    setUpdating(id);
    setMessage('');
    try {
      const body = { screeningStatus };
      if (screeningStatus === 'INELIGIBLE' && rejectNotes[id]) {
        body.screeningNotes = rejectNotes[id];
      }
      const data = await apiRequest(`/volunteers/${id}/screening`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, screeningStatus: data.screeningStatus, status: data.status, memberType: data.memberType, memberSince: data.memberSince } : v));
      setRejectNotes(prev => { const n = { ...prev }; delete n[id]; return n; });
      setMessage(`Screening status updated to ${screeningStatus}`);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleMemberTypeToggle = async (id, currentType) => {
    setUpdating(id);
    setMessage('');
    const newType = currentType === 'MEMBER' ? 'VOLUNTEER' : 'MEMBER';
    try {
      const data = await apiRequest(`/volunteers/${id}/member-type`, {
        method: 'PATCH',
        body: JSON.stringify({ memberType: newType }),
      });
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, memberType: data.memberType, memberSince: data.memberSince } : v));
      setMessage(`Changed to ${newType}`);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleExport = async () => {
    try {
      const data = await apiRequest('/volunteers/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enforcers-volunteers-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMessage('Export failed');
    }
  };

  const filtered = filter === 'ALL' ? volunteers : volunteers.filter(v => v.status === filter);

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    INELIGIBLE: 'bg-red-100 text-red-800',
    FLAGGED: 'bg-orange-100 text-orange-800',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Loading volunteers...</div>
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
            <h1 className="font-semibold text-primary-900">Volunteer Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/dashboard" className="text-sm text-neutral-600 hover:text-primary-500">Dashboard</a>
            <button onClick={handleExport} className="btn-secondary text-sm">Export Data</button>
            <button onClick={() => { clearAuth(); router.push('/admin/login'); }} className="text-sm text-red-600 hover:text-red-700">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-700 text-sm">{message}</div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm font-medium text-neutral-700">Filter:</span>
          {['ALL', 'PENDING', 'APPROVED', 'INELIGIBLE', 'FLAGGED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
          <span className="text-sm text-neutral-400 ml-auto">{filtered.length} applicant(s)</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <p className="text-lg">No volunteers found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((v) => (
              <div key={v.id} className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-primary-900 text-lg">{v.fullName}</h3>
                    <p className="text-sm text-neutral-500">{v.email} | {v.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${v.memberType === 'MEMBER' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-600'}`}>
                      {v.memberType === 'MEMBER' ? 'Member' : 'Volunteer'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[v.status] || 'bg-neutral-100 text-neutral-800'}`}>
                      {v.status}
                    </span>
                    <span className="text-xs text-neutral-400">{v.screeningStatus}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Availability:</span>
                    <p className="text-neutral-800 mt-1">{v.availability}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Skills:</span>
                    <p className="text-neutral-800 mt-1">{v.skills}</p>
                  </div>
                </div>

                {v.documents?.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Documents</span>
                    <ul className="mt-1 space-y-1">
                      {v.documents.map(d => (
                        <li key={d.id} className="text-xs text-blue-800">
                          <a href={`/api/documents/${d.id}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">{d.originalName}</a>
                          <span className="text-blue-400 ml-2">({(d.fileSize / 1024).toFixed(0)} KB)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {v.screeningNotes && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Screening Notes (Admin Only)</span>
                    <p className="text-sm text-red-800 mt-1">{v.screeningNotes}</p>
                  </div>
                )}

                {v.memberSince && (
                  <div className="text-xs text-neutral-400 mb-2">
                    Member since: {new Date(v.memberSince).toLocaleDateString('en-CA')}
                  </div>
                )}

                <div className="text-xs text-neutral-400 mb-4">
                  Applied: {new Date(v.createdAt).toLocaleDateString('en-CA')} |
                  Consent: {v.consentGiven ? 'Yes' : 'No'} |
                  {v.notes && <span> Notes: {v.notes}</span>}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => handleScreeningUpdate(v.id, 'ELIGIBLE')}
                    disabled={updating === v.id}
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>

                  <div className="flex items-center gap-2">
                    {rejectNotes[v.id] !== undefined ? (
                      <>
                        <input
                          type="text"
                          value={rejectNotes[v.id] || ''}
                          onChange={(e) => setRejectNotes(prev => ({ ...prev, [v.id]: e.target.value }))}
                          placeholder="Reason for rejection..."
                          className="px-2 py-1.5 text-sm border border-red-200 rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                        <button
                          onClick={() => handleScreeningUpdate(v.id, 'INELIGIBLE')}
                          disabled={updating === v.id}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          Confirm Reject
                        </button>
                        <button
                          onClick={() => setRejectNotes(prev => { const n = { ...prev }; delete n[v.id]; return n; })}
                          className="px-2 py-1.5 text-sm text-neutral-500 hover:text-neutral-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setRejectNotes(prev => ({ ...prev, [v.id]: '' }))}
                        disabled={updating === v.id}
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleStatusUpdate(v.id, 'FLAGGED')}
                    disabled={updating === v.id}
                    className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors disabled:opacity-50"
                  >
                    Flag for Review
                  </button>

                  {v.status === 'APPROVED' && (
                    <button
                      onClick={() => handleMemberTypeToggle(v.id, v.memberType)}
                      disabled={updating === v.id}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                        v.memberType === 'MEMBER' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {v.memberType === 'MEMBER' ? 'Demote to Volunteer' : 'Promote to Member'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
