import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { NeoButton } from '@/components/ui/NeoButton';
import { BrowserMockup } from '@/components/ui/BrowserMockup';
import { User, Mail, Shield, Zap, LogOut, Settings, BarChart } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-[calc(100vh-80px)] bg-ui-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">Your Forge</h1>
            <p className="font-satoshi font-medium text-ui-black/60 mt-2">Welcome back, {user?.name || 'Forger'}. Your professional edge is sharp.</p>
          </div>
          <div className="flex gap-4">
            <NeoButton variant="secondary" size="sm" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </NeoButton>
            <NeoButton variant="primary" size="sm" className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </NeoButton>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-sage neo-border neo-shadow p-8 rounded-[2rem]">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-ui-white neo-border rounded-full overflow-hidden mb-6 flex items-center justify-center">
                {user?.profile_image_url ? (
                  <img src={user.profile_image_url} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-ui-black/20" />
                )}
              </div>
              <h2 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter mb-2">{user?.name}</h2>
              <p className="font-satoshi font-bold text-ui-black/60 mb-8">{user?.email}</p>
              
              <div className="w-full space-y-4">
                <div className="bg-ui-white neo-border p-4 flex items-center gap-4">
                  <Shield className="w-6 h-6 text-ui-black" />
                  <div className="text-left">
                    <div className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/40">Status</div>
                    <div className="font-satoshi font-bold">Forge Master</div>
                  </div>
                </div>
                <div className="bg-ui-white neo-border p-4 flex items-center gap-4">
                  <Zap className="w-6 h-6 text-ui-black" />
                  <div className="text-left">
                    <div className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/40">Tokens</div>
                    <div className="font-satoshi font-bold">1,240 XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-8">
            <BrowserMockup className="h-full">
              <div className="mb-8 flex justify-between items-center">
                <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter flex items-center gap-3">
                  <BarChart className="w-6 h-6" /> Live Analytics
                </h3>
                <div className="bg-primary-yellow px-3 py-1 neo-border font-satoshi font-bold text-xs uppercase">Live</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Profile Views", value: "842", trend: "+12%" },
                  { label: "Badge Clicks", value: "148", trend: "+5%" },
                  { label: "API Requests", value: "2.4k", trend: "+24%" },
                  { label: "Projects Sync", value: "Active", trend: "Stable" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 neo-border p-6 transition-all hover:bg-primary-yellow hover:translate-x-1 hover:-translate-y-1">
                    <div className="font-satoshi font-bold text-ui-black/40 uppercase text-xs tracking-widest mb-1">{stat.label}</div>
                    <div className="flex justify-between items-end">
                      <div className="font-cabinet font-extrabold text-3xl tracking-tighter">{stat.value}</div>
                      <div className="font-satoshi font-bold text-green-600 text-sm">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t-2 border-ui-black/5">
                <h4 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter mb-4">Recent Deployments</h4>
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 border-2 border-dashed border-ui-black/10 rounded-xl">
                      <div className="w-10 h-10 bg-sage neo-border flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-satoshi font-bold uppercase text-sm">Portfolio Update v2.0.{i}</div>
                        <div className="font-satoshi text-xs text-ui-black/40 font-medium">Deployed 2 hours ago</div>
                      </div>
                      <NeoButton variant="secondary" size="sm" className="h-8 px-4 text-xs">View</NeoButton>
                    </div>
                  ))}
                </div>
              </div>
            </BrowserMockup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
