import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { BrowserMockup } from '@/components/ui/BrowserMockup';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  User, Zap, Key, Link as LinkIcon, Github, Code2, Award,
  Database, Plus, ChevronRight, ExternalLink, Loader2
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL?.split('/api/v1')[0] || '';

  const [codingStats, setCodingStats] = useState(null);
  const [badges, setBadges] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFullImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const normalizedPath = path.replace(/\\/g, '/');
    return `${backendBaseUrl}/${normalizedPath}`;
  };

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.allSettled([
        api.get('/codingStats'),
        api.get('/badges'),
        api.get('/certificates'),
        api.get('/projects'),
        api.get('/keys'),
        ...['github', 'leetcode', 'codeforces', 'credly'].map(p =>
          api.get(`/external-profile/${p}`).then(r => ({ platform: p, ...r.data }))
        ),
      ]);

      if (results[0].status === 'fulfilled') setCodingStats(results[0].value.data);
      if (results[1].status === 'fulfilled') setBadges(results[1].value.data);
      if (results[2].status === 'fulfilled') setCertificates(results[2].value.data || []);
      if (results[3].status === 'fulfilled') setProjects(results[3].value.data || []);
      if (results[4].status === 'fulfilled') setKeys(results[4].value.data?.keys || []);

      // Profiles (indices 5-8)
      const loaded = {};
      [5, 6, 7, 8].forEach((idx, i) => {
        const platforms = ['github', 'leetcode', 'codeforces', 'credly'];
        if (results[idx].status === 'fulfilled') {
          loaded[platforms[i]] = results[idx].value;
        }
      });
      setProfiles(loaded);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const badgesArray = badges ? Object.values(badges) : [];

  const PLATFORM_META = {
    github: { label: 'GitHub', icon: Github, color: 'bg-neutral-900 text-white' },
    leetcode: { label: 'LeetCode', icon: Code2, color: 'bg-[#FFA116] text-white' },
    codeforces: { label: 'Codeforces', icon: Zap, color: 'bg-[#1F8ACB] text-white' },
    credly: { label: 'Credly', icon: Award, color: 'bg-[#FF6B6B] text-white' },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-10 px-0 sm:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full">
          <h1 className="font-cabinet font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter break-words">Forge Home</h1>
          <p className="font-satoshi font-medium text-ui-black/60 mt-2 italic text-sm sm:text-base">Welcome to your professional command center, {user?.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* ── Profile Snapshot ─────────────────────────────────────────────── */}
        <div className="bg-primary-yellow neo-border neo-shadow p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-ui-white neo-border rounded-full overflow-hidden mb-6 flex items-center justify-center flex-shrink-0">
            {user?.profile_image_url ? (
              <img src={getFullImageUrl(user.profile_image_url)} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-ui-black/20" />
            )}
          </div>
          <h2 className="font-cabinet font-extrabold text-xl sm:text-2xl uppercase tracking-tighter mb-1 break-words">{user?.name}</h2>
          <p className="font-satoshi font-bold text-ui-black/60 text-xs sm:text-sm mb-6 break-all">{user?.email}</p>

          {/* Connected Platforms */}
          <div className="w-full space-y-2">
            {['github', 'leetcode', 'codeforces', 'credly'].map(p => {
              const meta = PLATFORM_META[p];
              const connected = !!profiles[p];
              const Icon = meta.icon;
              return (
                <div key={p} className="bg-ui-white neo-border-sm p-2 flex items-center gap-2">
                  <div className={`w-7 h-7 ${meta.color} flex items-center justify-center neo-border-sm flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-satoshi font-bold text-[10px] sm:text-xs flex-1 text-left truncate">{meta.label}</span>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${connected ? 'bg-green-500' : 'bg-ui-black/15'}`} />
                </div>
              );
            })}
          </div>

          <div className="mt-4 w-full">
            <NeoButton variant="secondary" size="sm" className="w-full text-xs justify-center" onClick={() => navigate('/dashboard/profiles')}>
              Manage Profiles
            </NeoButton>
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 min-w-0">

          {/* ── Coding Stats ─────────────────────────────────────────────── */}
          {codingStats && codingStats.totalSolved > 0 ? (
            <div className="neo-border neo-shadow bg-ui-white p-4 sm:p-6 overflow-hidden">
              <h3 className="font-cabinet font-extrabold text-base sm:text-lg uppercase tracking-tighter mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" /> Coding Stats
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div className="neo-border-sm p-2 sm:p-3 text-center">
                  <div className="font-cabinet font-extrabold text-xl sm:text-2xl">{codingStats.totalSolved}</div>
                  <div className="font-satoshi font-bold text-[8px] sm:text-[10px] uppercase tracking-widest text-ui-black/40">Total</div>
                </div>
                <div className="neo-border-sm p-2 sm:p-3 text-center bg-green-50">
                  <div className="font-cabinet font-extrabold text-xl sm:text-2xl text-green-600">{codingStats.easy}</div>
                  <div className="font-satoshi font-bold text-[8px] sm:text-[10px] uppercase tracking-widest text-green-600/60">Easy</div>
                </div>
                <div className="neo-border-sm p-2 sm:p-3 text-center bg-yellow-50">
                  <div className="font-cabinet font-extrabold text-xl sm:text-2xl text-yellow-600">{codingStats.medium}</div>
                  <div className="font-satoshi font-bold text-[8px] sm:text-[10px] uppercase tracking-widest text-yellow-600/60">Medium</div>
                </div>
                <div className="neo-border-sm p-2 sm:p-3 text-center bg-red-50">
                  <div className="font-cabinet font-extrabold text-xl sm:text-2xl text-red-600">{codingStats.hard}</div>
                  <div className="font-satoshi font-bold text-[8px] sm:text-[10px] uppercase tracking-widest text-red-600/60">Hard</div>
                </div>
              </div>
              {/* Top topics */}
              {codingStats.topics && codingStats.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {codingStats.topics.slice(0, 8).map(t => (
                    <span key={t.tag} className="px-1.5 py-0.5 bg-primary-yellow/20 neo-border-sm font-cabinet font-extrabold text-[8px] sm:text-[9px] uppercase tracking-widest">
                      {t.tag} ({t.count})
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="neo-border p-6 bg-sage/5 text-center">
              <Code2 className="w-10 h-10 mx-auto text-ui-black/15 mb-3" />
              <p className="font-satoshi font-bold text-sm text-ui-black/40">No coding stats yet.</p>
              <NeoButton variant="secondary" size="sm" className="mt-3 text-xs gap-1" onClick={() => navigate('/dashboard/profiles')}>
                <Plus className="w-3 h-3" /> Connect Platforms
              </NeoButton>
            </div>
          )}

          {/* ── Badges Carousel ──────────────────────────────────────────── */}
          {badgesArray.length > 0 ? (
            <div className="neo-border neo-shadow bg-ui-white p-4 sm:p-6 overflow-hidden">
              <h3 className="font-cabinet font-extrabold text-base sm:text-lg uppercase tracking-tighter mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" /> Badges ({badgesArray.length})
              </h3>
              <div className="relative px-8">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-2 sm:-ml-4">
                    {badgesArray.map((badge, i) => (
                      <CarouselItem key={i} className="pl-2 sm:pl-4 basis-full xs:basis-1/2 md:basis-1/3">
                        <div className="neo-border-sm p-3 sm:p-4 text-center h-full flex flex-col items-center hover:bg-primary-yellow/5 transition-colors">
                          {badge.image ? (
                            <img src={badge.image} alt={badge.name} className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-3" />
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-yellow/20 neo-border-sm flex items-center justify-center mb-3">
                              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-ui-black/20" />
                            </div>
                          )}
                          <h4 className="font-cabinet font-extrabold text-[10px] sm:text-xs uppercase tracking-tighter leading-tight break-words">{badge.name}</h4>
                          {badge.issuerName && (
                            <span className="font-satoshi text-[8px] sm:text-[10px] text-ui-black/40 mt-1 truncate w-full">{badge.issuerName}</span>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="neo-border-sm -left-4 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8" />
                  <CarouselNext className="neo-border-sm -right-4 sm:-right-6 w-6 h-6 sm:w-8 sm:h-8" />
                </Carousel>
              </div>
            </div>
          ) : null}

          {/* ── API Keys ─────────────────────────────────────────────────── */}
          <div className="neo-border p-4 sm:p-5 flex items-center justify-between hover:bg-primary-yellow/5 transition-colors cursor-pointer" onClick={() => navigate('/dashboard/keys')}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-ui-black neo-border flex items-center justify-center flex-shrink-0">
                <Key className="w-4 h-4 sm:w-5 sm:h-5 text-primary-yellow" />
              </div>
              <div className="min-w-0">
                <div className="font-cabinet font-extrabold text-xs sm:text-sm uppercase tracking-tighter truncate">API Keys</div>
                <div className="font-satoshi text-[10px] sm:text-xs text-ui-black/40 truncate">{keys.length} active key{keys.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-ui-black/30 flex-shrink-0" />
          </div>

          {/* ── Certificates ─────────────────────────────────────────────── */}
          <div className="neo-border neo-shadow bg-ui-white p-4 sm:p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4 gap-2">
              <h3 className="font-cabinet font-extrabold text-base sm:text-lg uppercase tracking-tighter flex items-center gap-2 truncate">
                <Award className="w-5 h-5 flex-shrink-0" /> Certificates
              </h3>
              <NeoButton variant="secondary" size="sm" className="text-[10px] sm:text-xs gap-1 h-7 sm:h-8 flex-shrink-0" onClick={() => navigate('/dashboard/certificates')}>
                {certificates.length > 0 ? 'View All' : <><Plus className="w-3 h-3" /> Add</>}
              </NeoButton>
            </div>
            {certificates.length === 0 ? (
              <div className="text-center py-6 bg-sage/5 neo-border-sm">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-ui-black/15 mb-2" />
                <p className="font-satoshi font-bold text-xs sm:text-sm text-ui-black/40">No entries yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certificates.slice(0, 4).map(cert => (
                  <div key={cert.id} className="neo-border-sm p-3 flex items-center gap-3 hover:bg-primary-yellow/5 transition-colors min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-yellow neo-border-sm flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-cabinet font-extrabold text-[10px] sm:text-xs uppercase tracking-tighter truncate">{cert.title}</div>
                      {cert.issuer && <div className="font-satoshi text-[8px] sm:text-[10px] text-ui-black/40 truncate">{cert.issuer}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Projects ─────────────────────────────────────────────────── */}
          <div className="neo-border neo-shadow bg-ui-white p-4 sm:p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4 gap-2">
              <h3 className="font-cabinet font-extrabold text-base sm:text-lg uppercase tracking-tighter flex items-center gap-2 truncate">
                <Database className="w-5 h-5 flex-shrink-0" /> Projects
              </h3>
              <NeoButton variant="secondary" size="sm" className="text-[10px] sm:text-xs gap-1 h-7 sm:h-8 flex-shrink-0" onClick={() => navigate('/dashboard/projects')}>
                {projects.length > 0 ? 'View All' : <><Plus className="w-3 h-3" /> Add</>}
              </NeoButton>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-6 bg-sage/5 neo-border-sm">
                <Database className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-ui-black/15 mb-2" />
                <p className="font-satoshi font-bold text-xs sm:text-sm text-ui-black/40">No entries yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 3).map(proj => (
                  <div key={proj.id} className="neo-border-sm p-3 flex items-center gap-3 hover:bg-primary-yellow/5 transition-colors min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-ui-black neo-border-sm flex items-center justify-center flex-shrink-0">
                      <Database className="w-3 h-3 sm:w-4 sm:h-4 text-primary-yellow" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-cabinet font-extrabold text-[10px] sm:text-xs uppercase tracking-tighter truncate">{proj.name}</div>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {(proj.techstack_used || []).slice(0, 3).map((t, i) => (
                          <span key={i} className="px-1 py-0.5 bg-primary-yellow/20 font-cabinet font-extrabold text-[7px] sm:text-[8px] uppercase tracking-widest whitespace-nowrap">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 text-ui-black/30 flex-shrink-0">
                      {proj.live_link && <a href={proj.live_link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3.5 h-3.5 hover:text-ui-black" /></a>}
                      {proj.github_link && <a href={proj.github_link} target="_blank" rel="noopener noreferrer"><Github className="w-3.5 h-3.5 hover:text-ui-black" /></a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
