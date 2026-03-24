import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { Key, Copy, Trash2, Plus, Loader2, Eye, EyeOff, AlertTriangle, CheckCircle2 } from 'lucide-react';

const ApiKeysPage = () => {
  const [keys, setKeys] = useState([]);
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchKeys = async () => {
    try {
      const [keysRes, quotaRes] = await Promise.all([
        api.get('/keys'),
        api.get('/keys/quota')
      ]);
      setKeys(keysRes.data.keys || []);
      setQuota(quotaRes.data.quota);
    } catch (err) {
      setError('Failed to load API keys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setSuccess('');
    setNewlyGeneratedKey(null);
    try {
      const res = await api.post('/keys', { name: newKeyName || 'Default Key' });
      setNewlyGeneratedKey(res.data.apiKey);
      setSuccess(res.data.message);
      setNewKeyName('');
      fetchKeys();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate key');
    } finally {
      setGenerating(false);
    }
  };

  const handleRevoke = async (id) => {
    if (!window.confirm('Revoke this API key? Any applications using it will stop working.')) return;
    try {
      await api.delete(`/keys/${id}`);
      setSuccess('API key revoked.');
      fetchKeys();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to revoke key');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('API key copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">API Keys</h1>
        <p className="font-satoshi font-medium text-ui-black/60 mt-2">Manage your API access credentials. Keys are hashed and cannot be retrieved after creation.</p>
      </header>

      {success && (
        <div className="bg-green-50 border-2 border-green-600 p-4 flex items-center gap-3">
          <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0" />
          <p className="font-satoshi font-bold text-green-600 text-sm">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-2 border-red-600 p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-600 w-5 h-5 flex-shrink-0" />
          <p className="font-satoshi font-bold text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Generate New Key */}
      <div className="neo-border neo-shadow p-6 bg-ui-white space-y-4">
        <h2 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">Generate New Key</h2>
        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 h-12 px-4 neo-border font-satoshi font-bold focus:bg-primary-yellow/10 focus:outline-none transition-colors"
            placeholder="Key name (e.g. Production, Dev)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
          <NeoButton variant="primary" onClick={handleGenerate} disabled={generating} className="gap-2 px-6">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Generate
          </NeoButton>
        </div>

        {newlyGeneratedKey && (
          <div className="fixed inset-0 bg-ui-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-ui-white neo-border neo-shadow-lg p-8 max-w-md w-full space-y-5 animate-in scale-in">
              <div className="flex items-center gap-2 text-primary-yellow">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="font-cabinet font-extrabold text-xl uppercase tracking-tighter text-ui-black">API Key Generated</span>
              </div>
              <p className="font-satoshi font-bold text-xs text-ui-black/60">
                Please copy this key immediately. For your security, you will not be able to retrieve it again once this popup is closed!
              </p>
              <div className="flex gap-2">
                <code className="flex-1 bg-sage/5 p-3 neo-border font-mono text-sm break-all select-all">{newlyGeneratedKey}</code>
                <NeoButton variant="secondary" onClick={() => copyToClipboard(newlyGeneratedKey)} className="px-4">
                  <Copy className="w-4 h-4" />
                </NeoButton>
              </div>
              <NeoButton variant="primary" className="w-full justify-center" onClick={() => setNewlyGeneratedKey(null)}>
                I have backed it up
              </NeoButton>
            </div>
          </div>
        )}
      </div>

      {/* Existing Keys */}
      <div className="space-y-4">
        <h2 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">Active Keys ({keys.length}/5)</h2>
        {keys.length === 0 ? (
          <div className="neo-border p-8 text-center bg-sage/5">
            <Key className="w-12 h-12 mx-auto text-ui-black/20 mb-4" />
            <p className="font-satoshi font-bold text-ui-black/40">No API keys yet. Generate one above.</p>
          </div>
        ) : (
          keys.map((key) => (
            <div key={key.id} className="neo-border p-5 flex items-center justify-between group hover:bg-primary-yellow/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-ui-black neo-border flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary-yellow" />
                </div>
                <div>
                  <div className="font-cabinet font-extrabold uppercase tracking-tighter">{key.name}</div>
                  <div className="font-satoshi text-xs text-ui-black/40">
                    Created {new Date(key.created_at).toLocaleDateString()} · 
                    <span className="font-mono"> ****{key.key_hash?.slice(-8)}</span>
                  </div>
                </div>
              </div>
              <NeoButton variant="secondary" onClick={() => handleRevoke(key.id)} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white gap-2 h-9 text-xs">
                <Trash2 className="w-3 h-3" /> Revoke
              </NeoButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApiKeysPage;
