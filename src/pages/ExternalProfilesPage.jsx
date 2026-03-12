import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { Loader2, RefreshCw, CheckCircle2, AlertTriangle, Github, Code2, Zap, Award, Link2, X, Eye } from 'lucide-react';

const PLATFORMS = [
  { value: 'github', label: 'GitHub', icon: Github, color: 'bg-ui-black text-white', accent: '#333' },
  { value: 'leetcode', label: 'LeetCode', icon: Code2, color: 'bg-[#FFA116] text-white', accent: '#FFA116' },
  { value: 'codeforces', label: 'Codeforces', icon: Zap, color: 'bg-[#1F8ACB] text-white', accent: '#1F8ACB' },
  { value: 'credly', label: 'Credly', icon: Award, color: 'bg-[#FF6B6B] text-white', accent: '#FF6B6B' },
];

// ── Data Preview Modal ────────────────────────────────────────────────────────
const DataModal = ({ platform, data, onClose }) => {
  if (!data) return null;
  const entries = typeof data === 'object' && !Array.isArray(data) ? Object.entries(data) : [];

  const renderValue = (val, depth = 0) => {
    if (val === null || val === undefined) return <span className="text-ui-black/30">null</span>;
    if (typeof val === 'boolean') return <span className={val ? 'text-green-600' : 'text-red-500'}>{String(val)}</span>;
    if (typeof val === 'number') return <span className="text-blue-600">{val.toLocaleString()}</span>;
    if (typeof val === 'string') {
      if (val.startsWith('http')) return <a href={val} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{val}</a>;
      return <span className="break-all">{val.length > 120 ? val.slice(0, 120) + '…' : val}</span>;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return <span className="text-ui-black/30">[]</span>;
      if (depth > 1) return <span className="text-ui-black/40">[{val.length} items]</span>;
      return (
        <div className="pl-3 border-l-2 border-ui-black/10 space-y-1 mt-1">
          {val.slice(0, 5).map((item, i) => <div key={i} className="text-xs">{renderValue(item, depth + 1)}</div>)}
          {val.length > 5 && <span className="text-[10px] text-ui-black/30">+ {val.length - 5} more</span>}
        </div>
      );
    }
    if (typeof val === 'object') {
      if (depth > 1) return <span className="text-ui-black/40">Object</span>;
      const subEntries = Object.entries(val).slice(0, 6);
      return (
        <div className="pl-3 border-l-2 border-ui-black/10 space-y-1 mt-1">
          {subEntries.map(([k, v]) => (
            <div key={k} className="text-xs"><span className="font-bold text-ui-black/50">{k}:</span> {renderValue(v, depth + 1)}</div>
          ))}
          {Object.keys(val).length > 6 && <span className="text-[10px] text-ui-black/30">+ {Object.keys(val).length - 6} more</span>}
        </div>
      );
    }
    return <span>{String(val)}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ui-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-ui-white neo-border neo-shadow w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b-3 border-ui-black" style={{ borderBottomColor: platform.accent }}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${platform.color} neo-border flex items-center justify-center`}>
              <platform.icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cabinet font-extrabold text-xl uppercase tracking-tighter">{platform.label} Data</h2>
              <p className="font-satoshi text-xs text-ui-black/40">Fetched platform data preview</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 neo-border-sm hover:bg-primary-yellow transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {entries.length === 0 ? (
            <p className="font-satoshi text-sm text-ui-black/40 text-center py-8">No data available yet. Try fetching data first.</p>
          ) : (
            entries.map(([key, val]) => (
              <div key={key} className="neo-border-sm p-3 hover:bg-primary-yellow/5 transition-colors">
                <div className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/50 mb-1">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="font-satoshi text-sm">{renderValue(val)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const ExternalProfilesPage = () => {
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [connecting, setConnecting] = useState(null);
  const [syncing, setSyncing] = useState(null);
  const [modalData, setModalData] = useState(null); // { platform, data }

  const fetchProfiles = async () => {
    setLoading(true);
    const loaded = {};
    for (const p of PLATFORMS) {
      try {
        const res = await api.get(`/external-profile/${p.value}`);
        loaded[p.value] = res.data;
      } catch (err) {
        // 404 = not connected
      }
    }
    setProfiles(loaded);
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleConnect = async (platform) => {
    const username = inputValues[platform]?.trim();
    if (!username) return;
    setConnecting(platform);
    setError('');
    setSuccess('');
    try {
      await api.post('/external-profile/add', { platform, username });
      setSuccess(`${platform} profile connected! Data is being fetched in the background.`);
      setInputValues({ ...inputValues, [platform]: '' });
      fetchProfiles();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to connect ${platform}`);
    } finally {
      setConnecting(null);
    }
  };

  const handleSync = async (platformValue, username) => {
    setSyncing(platformValue);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/external-profile/update', { platform: platformValue, username });
      setSuccess(`${platformValue} data refreshed!`);
      await fetchProfiles();
      // Show the data popup after fetching
      const platformObj = PLATFORMS.find(p => p.value === platformValue);
      const freshProfile = profiles[platformValue] || res.data;
      if (freshProfile?.data || freshProfile?.platform_data) {
        setModalData({ platform: platformObj, data: freshProfile.data || freshProfile.platform_data });
      }
    } catch (err) {
      setError(err.response?.data?.error || `Failed to sync ${platformValue}`);
    } finally {
      setSyncing(null);
    }
  };

  const openDataModal = (platformValue) => {
    const profile = profiles[platformValue];
    const platformObj = PLATFORMS.find(p => p.value === platformValue);
    if (profile) {
      setModalData({ platform: platformObj, data: profile.data || profile.platform_data || {} });
    }
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
        <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">Connected Profiles</h1>
        <p className="font-satoshi font-medium text-ui-black/60 mt-2">Link your coding platforms to pull data into your portfolio.</p>
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

      <div className="grid sm:grid-cols-2 gap-6">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          const profile = profiles[platform.value];
          const isConnected = !!profile;

          return (
            <div key={platform.value} className="neo-border neo-shadow bg-ui-white flex flex-col overflow-hidden">
              {/* Card Header */}
              <div className="p-6 flex items-center gap-4" style={{ borderBottom: `3px solid ${platform.accent}` }}>
                <div className={`w-14 h-14 ${platform.color} neo-border flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-cabinet font-extrabold text-xl uppercase tracking-tighter">{platform.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {isConnected ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-satoshi font-bold text-xs text-green-600 uppercase tracking-widest">Connected</span>
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-ui-black/20" />
                        <span className="font-satoshi font-bold text-xs text-ui-black/40 uppercase tracking-widest">Not Linked</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1">
                {isConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/40">Username</p>
                        <p className="font-satoshi font-bold text-lg">@{profile.username}</p>
                      </div>
                      {profile.profile_url && (
                        <a href={profile.profile_url} target="_blank" rel="noopener noreferrer"
                          className="p-2 neo-border-sm hover:bg-primary-yellow/20 transition-colors">
                          <Link2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <NeoButton variant="secondary" size="sm" className="flex-1 gap-1 justify-center text-xs"
                        onClick={() => handleSync(platform.value, profile.username)}
                        disabled={syncing === platform.value}>
                        {syncing === platform.value
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <RefreshCw className="w-3 h-3" />}
                        Fetch Data
                      </NeoButton>
                      <NeoButton variant="secondary" size="sm" className="gap-1 justify-center text-xs px-4"
                        onClick={() => openDataModal(platform.value)}>
                        <Eye className="w-3 h-3" /> View
                      </NeoButton>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-satoshi text-sm text-ui-black/50">Enter your {platform.label} username to connect.</p>
                    <input
                      className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10 transition-colors"
                      placeholder={`Your ${platform.label} username`}
                      value={inputValues[platform.value] || ''}
                      onChange={(e) => setInputValues({ ...inputValues, [platform.value]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleConnect(platform.value)}
                    />
                    <NeoButton variant="primary" size="sm" className="w-full gap-2 justify-center"
                      onClick={() => handleConnect(platform.value)}
                      disabled={connecting === platform.value || !inputValues[platform.value]?.trim()}>
                      {connecting === platform.value
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Link2 className="w-4 h-4" />}
                      Connect {platform.label}
                    </NeoButton>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              {isConnected && (
                <div className="px-6 py-3 border-t-2 border-ui-black/10 bg-sage/5">
                  <span className="font-satoshi text-[10px] text-ui-black/30">
                    Added {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data Modal */}
      {modalData && (
        <DataModal platform={modalData.platform} data={modalData.data} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

export default ExternalProfilesPage;
