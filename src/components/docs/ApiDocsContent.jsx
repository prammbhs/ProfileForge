import React from 'react';
import { NeoButton } from "@/components/ui/NeoButton";
import { Zap, Key, Copy, Check, Terminal, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";

const ApiDocsContent = () => {
  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, language, id }) => (
    <div className="relative group mt-4">
      <div className="absolute -inset-1 bg-ui-black rounded-sm blur-none transition-all duration-300 group-hover:-inset-1.5" />
      <div className="relative bg-[#1A1A1A] p-6 pt-12 rounded-sm border-2 border-ui-black overflow-x-auto">
        <div className="absolute top-0 left-0 right-0 h-10 border-b-2 border-ui-black flex items-center justify-between px-4 bg-[#2A2A2A]">
          <span className="text-[10px] font-cabinet font-extrabold uppercase tracking-widest text-[#888]">{language}</span>
          <button 
            onClick={() => copyToClipboard(code, id)}
            className="text-[#888] hover:text-primary-yellow transition-colors flex items-center gap-2 text-[10px] font-cabinet font-extrabold uppercase"
          >
            {copied === id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied === id ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-white font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  const SectionHeading = ({ children, icon: Icon, id }) => (
    <h2 id={id} className="font-cabinet font-extrabold text-4xl mb-8 mt-16 flex items-center gap-4 group">
      <div className="w-10 h-10 bg-primary-yellow flex items-center justify-center neo-border">
        <Icon className="w-6 h-6" />
      </div>
      <span className="uppercase tracking-tighter">{children}</span>
      <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-ui-black/20 hover:text-ui-black">#</a>
    </h2>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-0 selection:bg-primary-yellow overflow-x-hidden">
      <header className="mb-16">
        <h1 className="font-cabinet font-extrabold text-5xl sm:text-7xl lg:text-8xl mb-6 tracking-tighter uppercase leading-[0.9]">
          API <br /> <span className="text-primary-yellow stroke-black" style={{ WebkitTextStroke: '2px black' }}>FORGE</span>
        </h1>
        <p className="font-satoshi text-2xl text-ui-black/60 max-w-2xl leading-relaxed">
          The fastest way to integrate your professional coding identity into any personal portfolio or landing page.
        </p>
      </header>

      <div className="space-y-12">
        {/* Quick Start Section */}
        <section>
          <SectionHeading icon={Terminal} id="quickstart">Quick Start</SectionHeading>
          <div className="bg-ui-white p-4 sm:p-8 neo-border mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Sign Up", desc: "Create a free account to access your developer workbench Dashboard." },
                { step: "2", title: "Generate Key", desc: "Navigate to Dashboard -> API Keys and click 'Generate Key'." },
                { step: "3", title: "Start Requesting", desc: "Send your first GET request appending headers mapping securely." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-ui-white neo-border border-dashed">
                  <div className="font-cabinet font-extrabold text-5xl text-primary-yellow" style={{ WebkitTextStroke: '1px black' }}>{item.step}</div>
                  <div>
                    <h4 className="font-cabinet font-extrabold text-lg uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="font-satoshi font-medium text-xs text-ui-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section>
          <SectionHeading icon={ShieldCheck} id="auth">Authentication</SectionHeading>
          <div className="bg-ui-white p-4 sm:p-8 neo-border mb-8 max-w-full overflow-hidden">
            <p className="font-satoshi text-lg mb-6 leading-relaxed">
              All API access is **Read-Only** and requires a secure API Key generated from your dashboard. 
              The key must be sent in the <code className="bg-primary-yellow/20 px-1 font-bold">x-api-key</code> header.
            </p>
            <CodeBlock 
              id="auth-curl"
              language="SHELL / CURL"
              code={`curl -X GET "https://profileforge.duckdns.org/api/v1/keys/data" \\
  -H "x-api-key: YOUR_GENERATED_API_KEY"`}
            />
          </div>
        </section>

        {/* Global Endpoints */}
        <section>
          <SectionHeading icon={Zap} id="endpoints">Core Endpoints</SectionHeading>
          <p className="font-satoshi text-xl mb-8 font-bold">
            All endpoints are scoped to the user who owns the API key. No UserID required.
          </p>
          
          <div className="grid gap-6">
            <div className="p-4 sm:p-8 bg-ui-white neo-border group hover:bg-primary-yellow/5 transition-colors max-w-full overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-ui-black text-white px-3 py-1 font-cabinet font-extrabold text-xs uppercase">GET</span>
                <span className="font-mono text-sm font-bold text-ui-black/40">/api/v1/keys/data</span>
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase mb-3 tracking-tight">The Unified Payload</h3>
              <p className="text-ui-black/60 font-medium mb-4">The ultimate endpoint. Returns everything: projects, stats, certificates, and connected profiles in one request.</p>
              <CodeBlock 
                id="fetch-example"
                language="JAVASCRIPT / FETCH"
                code={`fetch("https://profileforge.duckdns.org/api/v1/keys/data", {
  headers: { "x-api-key": "your_key_here" }
})
.then(res => res.json())
.then(data => console.log(data));`}
              />

              <div className="mt-6 border-t font-extrabold border-ui-black/10 pt-4">
                <h4 className="font-cabinet font-extrabold text-sm uppercase mb-3 text-ui-black/60">Example JSON Response</h4>
                <CodeBlock 
                  id="response-example"
                  language="JSON"
                  code={`{
  "user": { "name": "John Doe", "email": "john@example.com" },
  "profiles": {
    "github": { "username": "johndoe", "stats": { "public_repos": 45, "followers": 120 } },
    "leetcode": { "username": "johndoe", "stats": { "solved": 342, "rating": 1940 } }
  },
  "projects": [
    { "name": "ProfileForge", "description": "Unified identity...", "techstack": ["React", "Express"] }
  ],
  "certificates": [
    { "title": "AWS Solutions Architect", "issuer": "Amazon Web Services" }
  ]
}`}
                />
              </div>
            </div>

            <div className="p-4 sm:p-8 bg-ui-white neo-border max-w-full overflow-hidden">
              <h3 className="font-cabinet font-extrabold text-2xl uppercase mb-6 tracking-tight">Granular Modules</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Projects", path: "/projects", desc: "Showcase your curated work." },
                  { name: "Stats", path: "/stats", desc: "GitHub, LeetCode, Codeforces numbers." },
                  { name: "Certificates", path: "/certificates", desc: "All your verified credentials." },
                  { name: "Badges", path: "/badges", desc: "Aggregated professional badges." }
                ].map(item => (
                  <div key={item.name} className="p-4 border-2 border-ui-black bg-ui-white hover:bg-primary-yellow transition-colors cursor-default">
                    <div className="flex items-center gap-2 mb-2 font-cabinet font-extrabold uppercase text-sm">
                      <Zap className="w-3 h-3 fill-current" /> {item.name}
                    </div>
                    <code className="text-[10px] font-bold block mb-2 opacity-40">/api/v1/keys{item.path}</code>
                    <p className="text-xs font-bold leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section>
          <SectionHeading icon={ExternalLink} id="platforms">Platform Specifics</SectionHeading>
          <p className="font-satoshi text-lg mb-8">
            Access raw platform metadata specifically for deep integrations.
          </p>
          <div className="bg-[#1A1A1A] text-white p-4 sm:p-8 neo-border-sm relative overflow-hidden group">
            <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-primary-yellow/5 fill-current rotate-12 transition-transform duration-1000 group-hover:rotate-45" />
            <div className="relative z-10">
              <span className="font-mono text-primary-yellow mb-2 block">GET /api/v1/keys/platforms/:name</span>
              <div className="flex flex-wrap gap-2 mt-4">
                {['github', 'leetcode', 'codeforces', 'credly'].map(p => (
                  <span key={p} className="px-3 py-1 border border-white/20 text-xs font-mono">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rate Limits & CORS */}
        <section>
          <SectionHeading icon={ShieldCheck} id="ratelimits">Rate Limits & CORS</SectionHeading>
          <div className="bg-ui-white p-4 sm:p-8 neo-border mb-8 max-w-full overflow-hidden">
            <p className="font-satoshi text-lg mb-4 leading-relaxed">
              To maintain service stability, all endpoints are rate-limited to **1000 requests per hour** per API key.
            </p>
            <p className="font-satoshi text-lg leading-relaxed">
              🚀 **CORS is enabled globally**, meaning you can securely make calls directly from client-side JavaScript applications without hitting cross-origin blocks!
            </p>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-20">
          <SectionHeading icon={AlertCircle} id="errors">Status Codes</SectionHeading>
          <div className="grid gap-4">
            {[
              { code: "200", status: "SUCCESS", desc: "Data delivered successfully." },
              { code: "401", status: "UNAUTHORIZED", desc: "Invalid or missing x-api-key." },
              { code: "403", status: "READ-ONLY", desc: "You tried a non-GET method." },
              { code: "429", status: "THROTTLED", desc: "Hourly rate limit reached (1000 req/h)." }
            ].map(err => (
              <div key={err.code} className="flex gap-6 items-center p-4 border-l-4 border-ui-black bg-ui-white neo-border-sm">
                <span className="font-cabinet font-extrabold text-3xl min-w-16">{err.code}</span>
                <div>
                  <div className="font-cabinet font-extrabold text-xs tracking-widest text-[#888] mb-1">{err.status}</div>
                  <div className="font-bold text-sm">{err.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-32 pt-20 border-t-2 border-ui-black text-center">
        <p className="font-cabinet font-extrabold text-2xl uppercase mb-8 italic">Go build something legendary.</p>
        <NeoButton variant="primary" size="lg" className="px-12 py-6 text-xl">
          Back to Dashboard
        </NeoButton>
      </footer>
    </div>
  );
};

export default ApiDocsContent;
