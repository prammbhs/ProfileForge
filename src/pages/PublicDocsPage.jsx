import React from 'react';
import ApiDocsContent from '@/components/docs/ApiDocsContent';
import { Helmet } from 'react-helmet-async';

const PublicDocsPage = () => {
  return (
    <div className="bg-ui-white pt-24 min-h-screen dot-pattern">
      <Helmet>
        <title>API Documentation | ProfileForge</title>
        <meta name="description" content="Learn how to integrate ProfileForge's unified coding data into your own portfolio using our secure Public API." />
      </Helmet>
      <ApiDocsContent />
    </div>
  );
};

export default PublicDocsPage;
