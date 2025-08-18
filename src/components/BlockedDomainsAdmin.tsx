import React, { useState, useEffect } from 'react';
import { 
  getBlockedDomains, 
  addBlockedDomain, 
  removeBlockedDomain, 
  BlockedDomain 
} from '@/lib/blockedDomainsAdmin';

export default function BlockedDomainsAdmin() {
  const [domains, setDomains] = useState<BlockedDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [newReason, setNewReason] = useState('Temporary email provider');
  const [error, setError] = useState('');

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      setLoading(true);
      const data = await getBlockedDomains();
      setDomains(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load blocked domains');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;

    try {
      await addBlockedDomain(newDomain.trim(), newReason);
      setNewDomain('');
      setNewReason('Temporary email provider');
      setError('');
      await loadDomains();
    } catch (err: any) {
      setError(err.message || 'Failed to add domain');
    }
  };

  const handleRemoveDomain = async (id: string) => {
    try {
      await removeBlockedDomain(id);
      await loadDomains();
    } catch (err: any) {
      setError(err.message || 'Failed to remove domain');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading blocked domains...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Blocked Email Domains</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Add new domain form */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-3">Add New Blocked Domain</h3>
        <form onSubmit={handleAddDomain} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="example.com"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <input
            type="text"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder="Reason for blocking"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Block Domain
          </button>
        </form>
      </div>

      {/* Domains list */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-medium text-sm text-gray-700">
            <div>Domain</div>
            <div>Reason</div>
            <div>Added</div>
            <div>Actions</div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {domains.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No blocked domains found
            </div>
          ) : (
            domains.map((domain) => (
              <div key={domain.id} className="px-4 py-3 border-b hover:bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="font-medium">{domain.domain}</div>
                  <div className="text-gray-600">{domain.reason}</div>
                  <div className="text-gray-500">
                    {new Date(domain.created_at).toLocaleDateString()}
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveDomain(domain.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total blocked domains: {domains.length}
      </div>
    </div>
  );
}
