import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { Loader2, RefreshCw, CheckCircle2, AlertTriangle, Github, Code2, Zap, Award, Link2, X, Eye, Edit2, Check, Copy } from 'lucide-react';

const PLATFORMS = [
  { value: 'github', label: 'GitHub', icon: Github, color: 'bg-ui-black text-white', accent: '#333' },
  { value: 'leetcode', label: 'LeetCode', icon: Code2, color: 'bg-[#FFA116] text-white', accent: '#FFA116' },
  { value: 'codeforces', label: 'Codeforces', icon: Zap, color: 'bg-[#1F8ACB] text-white', accent: '#1F8ACB' },
  { value: 'credly', label: 'Credly', icon: Award, color: 'bg-[#FF6B6B] text-white', accent: '#FF6B6B' },
];

// ── Data Preview Modal ────────────────────────────────────────────────────────
const DataModal = ({ platform, data, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <p className="font-satoshi text-xs text-ui-black/40">Raw structured data preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy} 
              className="flex items-center gap-1.5 px-3 py-1.5 neo-border-sm bg-ui-white hover:bg-primary-yellow transition-colors font-satoshi font-bold text-xs"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={onClose} className="p-2 neo-border-sm hover:bg-primary-yellow transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Modal Body */}
        <div className="p-4 bg-[#1E1E1E] flex-1 overflow-hidden flex flex-col border-t border-ui-black">
          <div className="flex-1 overflow-auto font-mono text-xs rounded-md bg-[#181818] border border-white/10 p-4 text-green-400">
            <pre className="whitespace-pre scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {jsonString}
            </pre>
          </div>
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

  // Editing username state
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [updating, setUpdating] = useState(false);

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

  const handleUpdateUsername = async (platformValue) => {
    if (!editUsername.trim()) return;
    setUpdating(true);
    setError('');
    setSuccess('');
    try {
      await api.put('/external-profile/update', { platform: platformValue, username: editUsername.trim() });
      setSuccess(`@${editUsername} updated successfully for ${platformValue}!`);
      setEditingPlatform(null);
      fetchProfiles();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to update ${platformValue} username`);
    } finally {
      setUpdating(false);
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
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-0 sm:px-4">
      <header>
        <h1 className="font-cabinet font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter break-words">Connected Profiles</h1>
        <p className="font-satoshi font-medium text-ui-black/60 mt-2 text-sm sm:base">Link your coding platforms to pull data into your portfolio.</p>
      </header>

      {success && (
        <div className="bg-green-50 border-2 border-green-600 p-4 flex items-center gap-3 mx-2 sm:mx-0">
          <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0" />
          <p className="font-satoshi font-bold text-green-600 text-sm">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-2 border-red-600 p-4 flex items-center gap-3 mx-2 sm:mx-0">
          <AlertTriangle className="text-red-600 w-5 h-5 flex-shrink-0" />
          <p className="font-satoshi font-bold text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          const profile = profiles[platform.value];
          const isConnected = !!profile;

          return (
            <div key={platform.value} className="neo-border neo-shadow bg-ui-white flex flex-col overflow-hidden">
              {/* Card Header */}
              <div className="p-4 sm:p-6 flex items-center gap-4" style={{ borderBottom: `3px solid ${platform.accent}` }}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${platform.color} neo-border flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-cabinet font-extrabold text-lg sm:text-xl uppercase tracking-tighter truncate">{platform.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {isConnected ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-satoshi font-bold text-[10px] sm:text-xs text-green-600 uppercase tracking-widest">Connected</span>
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-ui-black/20" />
                        <span className="font-satoshi font-bold text-[10px] sm:text-xs text-ui-black/40 uppercase tracking-widest">Not Linked</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex-1">
                {isConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-cabinet font-extrabold text-[10px] uppercase tracking-widest text-ui-black/40">Username</p>
                        {editingPlatform === platform.value ? (
                          <div className="flex gap-1.5 mt-1">
                            <input 
                              type="text"
                              value={editUsername}
                              onChange={(e) => setEditUsername(e.target.value)}
                              className="w-full flex-1 px-2 py-1 neo-border-sm font-satoshi font-bold text-sm focus:outline-none"
                              placeholder="New username"
                            />
                            <button 
                              onClick={() => handleUpdateUsername(platform.value)}
                              disabled={updating}
                              className="p-1.5 neo-border-sm bg-green-500 text-white hover:bg-green-600 flex-shrink-0"
                            >
                              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => setEditingPlatform(null)}
                              className="p-1.5 neo-border-sm bg-red-500 text-white hover:bg-red-600 flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-satoshi font-bold text-base sm:text-lg truncate">@{profile.username}</p>
                            <button 
                              onClick={() => {
                                setEditingPlatform(platform.value);
                                setEditUsername(profile.username);
                              }}
                              className="p-1 hover:bg-primary-yellow/20 rounded transition-opacity bg-primary-yellow/10"
                              title="Edit Username"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-ui-black" />
                            </button>
                          </div>
                        )}
                      </div>
                      {profile.profile_url && !editingPlatform && (
                        <a href={profile.profile_url} target="_blank" rel="noopener noreferrer"
                          className="p-2 neo-border-sm hover:bg-primary-yellow/20 transition-colors flex-shrink-0">
                          <Link2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2">
                      <NeoButton variant="secondary" size="sm" className="flex-1 gap-1 justify-center text-[10px] sm:text-xs h-9 sm:h-auto"
                        onClick={() => handleSync(platform.value, profile.username)}
                        disabled={syncing === platform.value}>
                        {syncing === platform.value
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <RefreshCw className="w-3 h-3" />}
                        Fetch Data
                      </NeoButton>
                      <NeoButton variant="secondary" size="sm" className="gap-1 justify-center text-[10px] sm:text-xs px-4 h-9 sm:h-auto"
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
              {isConnected && profile?.created_at && !isNaN(new Date(profile.created_at).getTime()) && (
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
