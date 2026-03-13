import React from 'react';
import ApiDocsContent from '@/components/docs/ApiDocsContent';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { NeoButton } from '@/components/ui/NeoButton';
import { Key } from 'lucide-react';

const DashboardDocsPage = () => {
  return (
    <div className="min-h-screen bg-ui-white">
      <Helmet>
        <title>Docs - ProfileForge Dashboard</title>
      </Helmet>
      
      <div className="mb-12 p-8 bg-primary-yellow neo-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="font-cabinet font-extrabold text-3xl uppercase mb-2 tracking-tight">Need a Key?</h2>
          <p className="font-bold text-ui-black/60 text-lg leading-tight">Generate a secure API key to start pulling your live stats and projects into your personal portfolio.</p>
        </div>
        <Link to="/dashboard/keys">
          <NeoButton variant="primary" size="lg" className="whitespace-nowrap flex items-center gap-2">
            <Key className="w-5 h-5" /> Manage Keys
          </NeoButton>
        </Link>
      </div>

      <ApiDocsContent />
    </div>
  );
};

export default DashboardDocsPage;
