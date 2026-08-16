'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Building2,
  Mail,
  Phone,
  Link2,
  Sparkles,
  Filter,
  CheckCircle2,
  ExternalLink,
  Copy,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Layers,
  Database,
  Cpu,
  Bot,
  FileText,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Info,
  Radio,
  SlidersHorizontal,
  X
} from 'lucide-react';

const QUICK_FILTERS = [
  { label: 'All Portals & Requests', value: '' },
  { label: '🎙️ Voice AI Agents', value: 'Voice AI' },
  { label: '🧠 Company Brain (RAG)', value: 'Company Brain' },
  { label: '💬 WhatsApp Chatbots', value: 'Chatbot' },
  { label: '🤖 Jarvis Assistants', value: 'Jarvis' },
  { label: '🎓 Claude & MCP', value: 'Claude' },
  { label: '🏛️ Gov Tenders (eSupply/TAMM)', value: 'Tender' },
  { label: '💼 FDE Leadership (AED 40k+)', value: 'Forward Deployed' },
  { label: '📒 Yello.ae Verified Firms', value: 'Yello' }
];

export default function AqionHuntingPortal() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [minSalary, setMinSalary] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'portals' | 'accounts'

  // Fetch initial leads
  useEffect(() => {
    fetchLeads('', '');
  }, []);

  const fetchLeads = async (searchQuery, categoryFilter) => {
    setLoading(true);
    try {
      const res = await fetch('/api/hunt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: searchQuery,
          category: categoryFilter,
          minSalary: minSalary,
          includeYello: true
        })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads(query, activeFilter);
  };

  const handleFilterClick = (val) => {
    setActiveFilter(val);
    fetchLeads(query, val);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="page" style={{ minHeight: '100vh', background: 'var(--bone)' }}>
      {/* Background Grid */}
      <div className="grid-backdrop" aria-hidden="true" />

      {/* Top Universal Navigation Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'rgba(255, 254, 253, 0.85)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '12px 24px'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/brand/aqionlabs-icon.png"
                alt="AqionLabs"
                style={{ width: '28px', height: '28px', objectFit: 'contain' }}
              />
              <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                Aqion<span style={{ color: 'var(--violet)' }}>Hunt</span>
              </span>
            </Link>
            <span
              style={{
                fontSize: '11px',
                background: 'rgba(81, 69, 229, 0.1)',
                color: 'var(--violet)',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono, monospace)'
              }}
            >
              UAE AI SCOUT v2.0
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              style={{
                background: activeTab === 'leads' ? 'var(--violet)' : 'transparent',
                color: activeTab === 'leads' ? '#fff' : 'var(--graphite)',
                border: activeTab === 'leads' ? 'none' : '1px solid var(--line)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Search size={14} />
              AI Hunting Board
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('portals')}
              style={{
                background: activeTab === 'portals' ? 'var(--violet)' : 'transparent',
                color: activeTab === 'portals' ? '#fff' : 'var(--graphite)',
                border: activeTab === 'portals' ? 'none' : '1px solid var(--line)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={14} />
              UAE Portals & Tenders Directory
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('accounts')}
              style={{
                background: activeTab === 'accounts' ? 'var(--violet)' : 'transparent',
                color: activeTab === 'accounts' ? '#fff' : 'var(--graphite)',
                border: activeTab === 'accounts' ? 'none' : '1px solid var(--line)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Info size={14} />
              Credentials & Scraping Guide
            </button>

            <Link
              href="/"
              style={{
                textDecoration: 'none',
                background: 'var(--bone)',
                border: '1px solid var(--line)',
                color: 'var(--taupe)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              Pitch Generator ↗
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 80px' }}>
        
        {/* TAB 1: LEADS & TENDERS HUNTING BOARD */}
        {activeTab === 'leads' && (
          <div>
            {/* HERO SECTION */}
            <section style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(56, 201, 134, 0.12)',
                  color: '#1e8455',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '16px'
                }}
              >
                <Radio size={14} className="animate-pulse" />
                Live Scouting UAE Job Portals, Tenders & SME Build Requests (AED 10k+)
              </div>

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                  lineHeight: 1.15,
                  margin: '0 auto 14px',
                  maxWidth: '820px'
                }}
              >
                Find Every AI Job & Build Request Across UAE Channels
              </h1>

              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--taupe)',
                  maxWidth: '680px',
                  margin: '0 auto 28px',
                  lineHeight: 1.5
                }}
              >
                Autonomous intelligence searching LinkedIn UAE, Naukrigulf, eSupply Dubai, TAMM Abu Dhabi, and Yello.ae. Enriches decision-makers, direct emails, phone numbers, and generates tailored Voice AI pitches.
              </p>

              {/* SEARCH TERMINAL INPUT */}
              <div
                style={{
                  maxWidth: '840px',
                  margin: '0 auto',
                  background: 'var(--paper)',
                  padding: '8px',
                  borderRadius: '20px',
                  border: '1px solid var(--line)',
                  boxShadow: '0 18px 40px -12px rgba(23, 21, 19, 0.1)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                  <Search size={18} style={{ color: 'var(--violet)', marginRight: '10px' }} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    placeholder="Enter skill, role, or archetype (e.g., Voice AI, Company Brain, FDE, Claude Training)..."
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: '14.5px',
                      color: 'var(--ink)',
                      height: '46px'
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    background: 'var(--violet)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0 24px',
                    height: '46px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(81, 69, 229, 0.3)'
                  }}
                >
                  {loading ? (
                    <RefreshCw size={16} className="spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {loading ? 'Scouting Web...' : 'Scout Portals & Contacts'}
                </button>
              </div>

              {/* QUICK FILTER PILLS */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '18px',
                  maxWidth: '920px',
                  margin: '18px auto 0'
                }}
              >
                {QUICK_FILTERS.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => handleFilterClick(f.value)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: activeFilter === f.value ? 'var(--violet)' : 'var(--line)',
                      background: activeFilter === f.value ? 'rgba(81, 69, 229, 0.1)' : 'var(--paper)',
                      color: activeFilter === f.value ? 'var(--violet)' : 'var(--graphite)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            {/* METRICS & STATS BAR */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '28px'
              }}
            >
              <div style={{ background: 'var(--paper)', padding: '18px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--taupe)', fontSize: '12px', marginBottom: '6px' }}>
                  <Briefcase size={14} style={{ color: 'var(--violet)' }} />
                  Total Qualified UAE Opportunities
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>{leads.length} Leads</div>
                <div style={{ fontSize: '11px', color: 'var(--ash)' }}>Across 8 Channels & Directories</div>
              </div>

              <div style={{ background: 'var(--paper)', padding: '18px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--taupe)', fontSize: '12px', marginBottom: '6px' }}>
                  <DollarSign size={14} style={{ color: 'var(--live)' }} />
                  Package / Compensation Floor
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>AED 10k – 70k+</div>
                <div style={{ fontSize: '11px', color: 'var(--ash)' }}>SME Retainers to Sovereign FDE</div>
              </div>

              <div style={{ background: 'var(--paper)', padding: '18px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--taupe)', fontSize: '12px', marginBottom: '6px' }}>
                  <Mail size={14} style={{ color: 'var(--cyan)' }} />
                  Decision Makers & Emails
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>100% Enriched</div>
                <div style={{ fontSize: '11px', color: 'var(--ash)' }}>Direct C-Suite & Technical Heads</div>
              </div>

              <div style={{ background: 'var(--paper)', padding: '18px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--taupe)', fontSize: '12px', marginBottom: '6px' }}>
                  <Bot size={14} style={{ color: 'var(--amber)' }} />
                  Voice AI & RAG Proof Points
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>AqionLabs Ready</div>
                <div style={{ fontSize: '11px', color: 'var(--ash)' }}>American Hospital Dubai & Servion</div>
              </div>
            </div>

            {/* RESULTS LISTING */}
            <div style={{ display: 'grid', gap: '16px' }}>
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    background: 'var(--paper)',
                    borderRadius: '20px',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    display: 'grid',
                    gap: '16px',
                    transition: 'box-shadow 0.2s ease',
                    boxShadow: '0 4px 16px rgba(23, 21, 19, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span
                          style={{
                            background: lead.match_score >= 90 ? 'rgba(56, 201, 134, 0.15)' : 'rgba(81, 69, 229, 0.1)',
                            color: lead.match_score >= 90 ? '#1e8455' : 'var(--violet)',
                            fontWeight: 700,
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono, monospace)'
                          }}
                        >
                          {lead.match_score}% MATCH
                        </span>
                        <span
                          style={{
                            background: 'var(--bone)',
                            color: 'var(--graphite)',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--line)'
                          }}
                        >
                          {lead.source}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--taupe)',
                            fontWeight: 500
                          }}
                        >
                          📍 {lead.location}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>
                        {lead.title}
                      </h3>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--violet)', marginTop: '4px' }}>
                        🏢 {lead.company}
                      </div>
                    </div>

                    {/* Salary Tag */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          background: 'rgba(210, 163, 86, 0.12)',
                          color: '#9e6e18',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '13px',
                          fontFamily: 'var(--font-mono, monospace)'
                        }}
                      >
                        {lead.salary_range}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ash)', marginTop: '4px' }}>
                        Type: {lead.type}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--taupe)', lineHeight: 1.5 }}>
                    {lead.description}
                  </p>

                  {/* Tech Signals */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {lead.tech_signals?.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'var(--bone)',
                          border: '1px solid var(--line)',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: 'var(--graphite)',
                          fontFamily: 'var(--font-mono, monospace)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Decision Maker & Action Toolbar */}
                  <div
                    style={{
                      borderTop: '1px solid var(--line)',
                      paddingTop: '16px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: 'rgba(81, 69, 229, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--violet)',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        {lead.decision_maker?.name ? lead.decision_maker.name[0] : 'D'}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                          {lead.decision_maker?.name} • <span style={{ color: 'var(--taupe)', fontWeight: 400 }}>{lead.decision_maker?.role}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--taupe)', marginTop: '2px' }}>
                          {lead.decision_maker?.email && (
                            <a
                              href={`mailto:${lead.decision_maker.email}`}
                              style={{ color: 'var(--violet)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Mail size={12} /> {lead.decision_maker.email}
                            </a>
                          )}
                          {lead.decision_maker?.phone && (
                            <a
                              href={`tel:${lead.decision_maker.phone}`}
                              style={{ color: 'var(--graphite)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Phone size={12} /> {lead.decision_maker.phone}
                            </a>
                          )}
                          {lead.decision_maker?.linkedin && (
                            <a
                              href={lead.decision_maker.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: 'var(--cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Link2 size={12} /> Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action button to open pitch modal */}
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      style={{
                        background: 'var(--bone)',
                        border: '1px solid var(--violet)',
                        color: 'var(--violet)',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={14} />
                      View Personalized Pitch Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMPLETE DIRECTORY OF UAE JOB, PRODUCT & TENDER PORTALS */}
        {activeTab === 'portals' && (
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
              Comprehensive UAE Portals & Tender Boards Directory
            </h2>
            <p style={{ color: 'var(--taupe)', fontSize: '14px', marginBottom: '28px' }}>
              The complete map of every job platform, SME product requirement board, and public/private tender portal in the UAE for AI and Tech services.
            </p>

            <div style={{ display: 'grid', gap: '28px' }}>
              {/* Category 1: Public & Government Tender Portals */}
              <div style={{ background: 'var(--paper)', borderRadius: '20px', border: '1px solid var(--line)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--live)' }} />
                  1. UAE Public & Semi-Government Tender Portals (AI & IT RFPs)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Dubai Government eSupply</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Official procurement for 40+ Dubai Gov entities (Digital Dubai, DEWA, RTA, DHA).</div>
                    <a href="https://esupply.dubai.gov.ae" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>esupply.dubai.gov.ae ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Abu Dhabi TAMM / ADGEX</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Unified procurement portal for all Abu Dhabi Government departments and councils.</div>
                    <a href="https://www.tamm.abudhabi" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>tamm.abudhabi ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>UAE Ministry of Finance (MoF)</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Federal Government supplier register for national ministries and federal councils.</div>
                    <a href="https://mof.gov.ae" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>mof.gov.ae ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>e& (Etisalat) Sourcing Portal</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Telecommunications, Conversational AI, and Cloud Contact Center modernization RFPs.</div>
                    <a href="https://www.eand.com" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>eand.com ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>ADNOC Sourcing & Tenders</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Oil & Gas, Automation, AI Predictive Maintenance, and IT Infrastructure.</div>
                    <a href="https://www.adnoc.ae" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>adnoc.ae ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>ProTenders Middle East</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>Private enterprise & commercial developer tenders across GCC.</div>
                    <a href="https://www.protenders.com" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>protenders.com ↗</a>
                  </div>
                </div>
              </div>

              {/* Category 2: UAE B2B Business Directories & Product Requirement Boards */}
              <div style={{ background: 'var(--paper)', borderRadius: '20px', border: '1px solid var(--line)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Database size={20} style={{ color: 'var(--cyan)' }} />
                  2. UAE B2B Product Requirement Boards & Verified Business Directories
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Yello.ae (UAE Yellow Pages)</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>150,000+ UAE firms with phone numbers, emails, and direct category listings. Zero login needed.</div>
                    <a href="https://www.yello.ae" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>yello.ae ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Clutch.co UAE AI & Software Directory</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>UAE business clients posting RFQs for AI chatbots, custom software, and voice agents.</div>
                    <a href="https://clutch.co/ae" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>clutch.co/ae ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>GoodFirms UAE</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>B2B tech matchmaking and enterprise software requirement briefs.</div>
                    <a href="https://www.goodfirms.co" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>goodfirms.co ↗</a>
                  </div>

                  <div style={{ background: 'var(--bone)', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Upwork UAE Client Project Feed</strong>
                    <div style={{ fontSize: '12px', color: 'var(--taupe)', margin: '4px 0' }}>UAE SME client postings for Voice AI bots, RAG pipelines, and WhatsApp bots.</div>
                    <a href="https://www.upwork.com" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>upwork.com ↗</a>
                  </div>
                </div>
              </div>

              {/* Category 3: Major UAE Job Boards */}
              <div style={{ background: 'var(--paper)', borderRadius: '20px', border: '1px solid var(--line)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Briefcase size={20} style={{ color: 'var(--violet)' }} />
                  3. UAE Recruitment Portals & Free Zone Boards
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {[
                    { name: 'LinkedIn UAE', url: 'https://linkedin.com/jobs', desc: 'Prime source for AI Leads & FDEs' },
                    { name: 'Naukrigulf.com', url: 'https://www.naukrigulf.com', desc: 'Tier-1 GCC banking & enterprise roles' },
                    { name: 'Indeed UAE', url: 'https://ae.indeed.com', desc: 'Direct corporate tech openings' },
                    { name: 'GulfTalent.com', url: 'https://www.gulftalent.com', desc: 'Executive & senior leadership' },
                    { name: 'Bayt.com', url: 'https://www.bayt.com', desc: 'Largest Middle East jobs database' },
                    { name: 'Foundit Gulf (Monster)', url: 'https://www.founditgulf.com', desc: 'IT & software engineering' },
                    { name: 'Dubai Careers (Gov)', url: 'https://dubaicareers.ae', desc: 'Official Dubai Gov hiring portal' },
                    { name: 'Hub71 Abu Dhabi', url: 'https://hub71.com', desc: 'Mubadala AI startup ecosystem' },
                    { name: 'DIFC Careers', url: 'https://www.difc.ae', desc: 'Financial center & FinTech roles' },
                    { name: 'MBZUAI Careers', url: 'https://mbzuai.ac.ae', desc: 'AI research university positions' },
                    { name: 'Laimoon UAE', url: 'https://www.laimoon.com', desc: 'Professional tech careers' },
                    { name: 'Dubizzle Jobs', url: 'https://dubai.dubizzle.com/jobs', desc: 'Local SME & agency hiring' }
                  ].map((p) => (
                    <div key={p.name} style={{ background: 'var(--bone)', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{p.name}</strong>
                      <div style={{ fontSize: '11.5px', color: 'var(--taupe)', margin: '2px 0' }}>{p.desc}</div>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>Visit Portal ↗</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREDENTIALS & SCRAPING ADVISORY */}
        {activeTab === 'accounts' && (
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
              Account & Credentials Advisory
            </h2>
            <p style={{ color: 'var(--taupe)', fontSize: '14px', marginBottom: '24px' }}>
              Everything you need to know about accounts, scraping limits, and email enrichment for your automated outreach.
            </p>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                  🔑 1. Is LinkedIn Premium or Sales Navigator Required?
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.6 }}>
                  <p>
                    <strong>For Automated Scraping & Lead Discovery:</strong> <span style={{ color: 'var(--live)', fontWeight: 600 }}>NO</span>. Our Python/Cheerio scrapers extract public job postings, decision-maker names, and company data without needing your LinkedIn login credentials.
                  </p>
                  <p>
                    <strong>For Sending Outreach:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Standard Free LinkedIn:</strong> You can send up to <strong>100 connection requests per week</strong> with our pre-drafted 300-character custom notes. This costs $0 and is the most effective approach for high response rates.
                    </li>
                    <li>
                      <strong>LinkedIn Sales Navigator Core ($79.99/mo):</strong> Recommended <em>only</em> if you wish to send 50 direct InMails per month to C-Suite leaders without connecting first, or build hyper-targeted lead lists across UAE VPs of Engineering.
                    </li>
                    <li>
                      <strong>Our Strategy:</strong> Since our engine extracts their verified direct email (e.g. <code>tariq.alnuaimi@ai71.ai</code>), you can send direct cold emails with zero LinkedIn InMail costs!
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                  📒 2. Is a Yello.ae Account Required?
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.6 }}>
                  <p>
                    <strong>Answer:</strong> <span style={{ color: 'var(--live)', fontWeight: 600 }}>NO ACCOUNT REQUIRED</span>.
                  </p>
                  <p>
                    Yello.ae provides open access to business directory listings. Our automated scraping engine can query categories like Information Technology, Real Estate, and Healthcare, parsing phone numbers (<code>+971 4 ...</code>) and <code>mailto:</code> email addresses with zero subscription or login fees.
                  </p>
                </div>
              </div>

              <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                  🏛️ 3. How to Register for UAE Government Tender Portals
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.6 }}>
                  <ul>
                    <li>
                      <strong>eSupply Dubai (esupply.dubai.gov.ae):</strong> Free registration for UAE trade licenses / free zone entities. Allows bidding on Digital Dubai, DEWA, and RTA AI tenders.
                    </li>
                    <li>
                      <strong>TAMM Abu Dhabi (tamm.abudhabi):</strong> Free registration with UAE Pass or commercial trade license to view Abu Dhabi government RFPs.
                    </li>
                    <li>
                      <strong>Ministry of Finance Federal Supplier Register:</strong> Requires UAE Trade License & tax registration number (TRN).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* OUTREACH PITCH MODAL */}
      {selectedLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 21, 19, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              background: 'var(--paper)',
              width: 'min(100%, 760px)',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              border: '1px solid var(--line)',
              padding: '32px',
              boxShadow: '0 32px 64px -16px rgba(23, 21, 19, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'var(--bone)',
                border: '1px solid var(--line)',
                borderRadius: '999px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--taupe)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', background: 'rgba(81, 69, 229, 0.1)', color: 'var(--violet)', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                {selectedLead.match_score}% MATCH
              </span>
              <span style={{ fontSize: '12px', color: 'var(--taupe)' }}>{selectedLead.source}</span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px', paddingRight: '40px' }}>
              {selectedLead.title}
            </h2>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--violet)', marginBottom: '18px' }}>
              🏢 {selectedLead.company} • 📍 {selectedLead.location}
            </div>

            {/* Decision Maker Card */}
            <div style={{ background: 'var(--bone)', padding: '16px', borderRadius: '14px', border: '1px solid var(--line)', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ash)', fontWeight: 600, marginBottom: '6px' }}>
                Target Decision Maker
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
                {selectedLead.decision_maker?.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--taupe)', marginBottom: '8px' }}>
                {selectedLead.decision_maker?.role}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px' }}>
                <a href={`mailto:${selectedLead.decision_maker?.email}`} style={{ color: 'var(--violet)', textDecoration: 'none', fontWeight: 500 }}>
                  ✉️ {selectedLead.decision_maker?.email}
                </a>
                <a href={`tel:${selectedLead.decision_maker?.phone}`} style={{ color: 'var(--graphite)', textDecoration: 'none', fontWeight: 500 }}>
                  📞 {selectedLead.decision_maker?.phone}
                </a>
                <a href={selectedLead.decision_maker?.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 500 }}>
                  🔗 LinkedIn Profile
                </a>
              </div>
            </div>

            {/* LinkedIn Connection Note */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                  1. LinkedIn Connection Note (&lt; 300 characters)
                </strong>
                <button
                  type="button"
                  onClick={() => copyToClipboard(selectedLead.outreach?.linkedin_note, 'note')}
                  style={{
                    background: 'var(--bone)',
                    border: '1px solid var(--line)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    color: 'var(--graphite)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedKey === 'note' ? <CheckCircle2 size={12} style={{ color: 'var(--live)' }} /> : <Copy size={12} />}
                  {copiedKey === 'note' ? 'Copied!' : 'Copy Note'}
                </button>
              </div>
              <div
                style={{
                  background: 'var(--bone)',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: 'var(--graphite)',
                  lineHeight: 1.5,
                  border: '1px solid var(--line)',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                {selectedLead.outreach?.linkedin_note}
              </div>
            </div>

            {/* Cold Email Copy */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                  2. Executive InMail / Direct Email Pitch
                </strong>
                <button
                  type="button"
                  onClick={() => copyToClipboard(selectedLead.outreach?.cold_email, 'email')}
                  style={{
                    background: 'var(--bone)',
                    border: '1px solid var(--line)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    color: 'var(--graphite)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedKey === 'email' ? <CheckCircle2 size={12} style={{ color: 'var(--live)' }} /> : <Copy size={12} />}
                  {copiedKey === 'email' ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
              <pre
                style={{
                  background: 'var(--bone)',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  color: 'var(--graphite)',
                  lineHeight: 1.6,
                  border: '1px solid var(--line)',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  margin: 0
                }}
              >
                {selectedLead.outreach?.cold_email}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
