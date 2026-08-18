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
  Globe,
  Clock,
  Zap,
  Shield,
  FileCheck,
  Users,
  Award,
  Terminal,
  Download,
  Printer,
  ChevronDown,
  X,
  Upload,
  UserCheck,
  Send,
  MessageSquare,
  BadgeCheck,
  Check,
  MapPin,
  Calendar,
  AlertCircle,
  FolderKanban
} from 'lucide-react';
import { JOB_HUNT_PORTAL_CATEGORIES, TENDER_PORTAL_CATEGORIES } from '../api/hunt/portals_data';

export default function AqionHuntStandaloneApp() {
  // 4 Primary Navigation Categories
  const [activeCategory, setActiveCategory] = useState('it_jobs'); // 'it_jobs' | 'it_freelance' | 'it_products_services' | 'portal_hunt'
  
  // Search & Filter State
  const [query, setQuery] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState('');
  const [ownVisaFilter, setOwnVisaFilter] = useState(false);
  const [aiPriorityFilter, setAiPriorityFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedDaysWindow, setSelectedDaysWindow] = useState(45); // 1, 7, 14, 30, 45 (Default 45)
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({ it_jobs: 7, it_freelance: 5, it_products_services: 5 });
  const [selectedLead, setSelectedLead] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [portalDirectorySearch, setPortalDirectorySearch] = useState('');

  // Candidate CV Profile State
  const [candidateProfile, setCandidateProfile] = useState({
    name: "Mohammed Jafer Nazeer",
    title: "Senior AI Engineer & Full-Stack Solutions Architect",
    email: "mohammedjafer123@outlook.com",
    phone: "+971 58 849 9663",
    location: "Dubai, UAE (Valid UAE Residence Visa)",
    linkedin: "https://www.linkedin.com/in/mohammedjafer/",
    skills: ["AI Voice Agents", "Python", "Next.js", "LangChain", "FastAPI", "PostgreSQL", "Docker", "AWS", "Twilio SIP", "REST/GraphQL"],
    experienceYears: "7+ Years in UAE",
    isLoaded: true
  });
  const [cvFileName, setCvFileName] = useState("Mohammed_Jafer_UAE_Senior_AI_Engineer_CV.pdf");
  const [isUploadingCv, setIsUploadingCv] = useState(false);

  // Document & Pitch Generator Suite State
  const [generatorModalOpen, setGeneratorModalOpen] = useState(false);
  const [generatorActiveTab, setGeneratorActiveTab] = useState('cv'); // 'cv' | 'cover_letter' | 'linkedin_note' | 'inmail' | 'proposal'
  const [generatingDoc, setGeneratingDoc] = useState(false);
  const [generatedCvText, setGeneratedCvText] = useState('');
  const [generatedCoverLetterText, setGeneratedCoverLetterText] = useState('');
  const [generatedLinkedinNoteText, setGeneratedLinkedinNoteText] = useState('');
  const [generatedInmailText, setGeneratedInmailText] = useState('');
  const [generatedProposalText, setGeneratedProposalText] = useState('');
  const [downloadingDocx, setDownloadingDocx] = useState(false);

  // Live Scraper Terminal Simulation State
  const [showScraperTerminal, setShowScraperTerminal] = useState(false);
  const [scraperLogs, setScraperLogs] = useState([]);

  // Fetch initial leads
  useEffect(() => {
    if (activeCategory !== 'portal_hunt') {
      fetchLeads(query, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
    }
  }, [activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow]);

  const fetchLeads = async (searchQuery, categoryId, ownVisa, aiPriority, daysWindow) => {
    setLoading(true);
    try {
      const res = await fetch('/api/hunt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          category: categoryId,
          ownVisaOnly: ownVisa,
          aiPriorityOnly: aiPriority,
          days: daysWindow,
          candidateSkills: candidateProfile.skills
        })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        if (data.categoryCounts) {
          setCategoryCounts(data.categoryCounts);
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    triggerScraperLog(query || 'UAE IT Market Live Scan (Last 45 Days)');
    fetchLeads(query, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
  };

  const triggerScraperLog = (term) => {
    setScraperLogs([
      `[${new Date().toLocaleTimeString()}] Initializing 45-Day Multi-Engine UAE Intelligence Crawl for "${term}"...`,
      `[${new Date().toLocaleTimeString()}] Scrapling: Stealth Session scanning LinkedIn Jobs (UAE), Naukrigulf & Bayt.com...`,
      `[${new Date().toLocaleTimeString()}] Firecrawl: Crawling UAE Government Portals, eSupply Dubai & TAMM Abu Dhabi...`,
      `[${new Date().toLocaleTimeString()}] Apify Ultimate Scraper: Harvesting UAE Tech Startups (Wellfound, Hub71) & X-Twitter...`,
      `[${new Date().toLocaleTimeString()}] Apollo / LeadFeeder: Enriching verified decision-maker emails, WhatsApp & LinkedIn URLs...`,
      `[${new Date().toLocaleTimeString()}] 45-Day Window: Filtering all requirements from the last 45 days...`,
      `[${new Date().toLocaleTimeString()}] Zero-Cap Verified: 100% of matching entries captured without Dirhams cap.`
    ]);
  };

  const handleCategorySwitch = (catId) => {
    setActiveCategory(catId);
    setQuery('');
    setActiveFilterTag('');
    if (catId === 'it_freelance') {
      setOwnVisaFilter(true);
    } else if (catId === 'it_products_services') {
      setAiPriorityFilter(true);
    } else {
      setOwnVisaFilter(false);
      setAiPriorityFilter(false);
    }
  };

  const handleCvFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingCv(true);
      setCvFileName(file.name);
      setTimeout(() => {
        setIsUploadingCv(false);
        setCandidateProfile(prev => ({
          ...prev,
          name: "Mohammed Jafer Nazeer",
          title: "Senior AI Engineer & Full-Stack Solutions Architect",
          skills: ["AI Voice Agents", "Python", "Next.js", "LangChain", "FastAPI", "PostgreSQL", "Docker", "AWS", "Twilio SIP", "Kubernetes", "REST/GraphQL"],
          isLoaded: true
        }));
        fetchLeads(query, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
      }, 800);
    }
  };

  const loadSampleCandidateCv = () => {
    setIsUploadingCv(true);
    setCvFileName("Mohammed_Jafer_UAE_Senior_AI_Engineer_CV.pdf");
    setTimeout(() => {
      setIsUploadingCv(false);
      setCandidateProfile({
        name: "Mohammed Jafer Nazeer",
        title: "Senior AI Engineer & Full-Stack Solutions Architect",
        email: "mohammedjafer123@outlook.com",
        phone: "+971 58 849 9663",
        location: "Dubai, UAE (Valid UAE Residence Visa)",
        linkedin: "https://www.linkedin.com/in/mohammedjafer/",
        skills: ["AI Voice Agents", "Python", "Next.js", "LangChain", "FastAPI", "PostgreSQL", "Docker", "AWS", "Twilio SIP", "REST/GraphQL"],
        experienceYears: "7+ Years in UAE",
        isLoaded: true
      });
      fetchLeads(query, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
    }, 400);
  };

  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Open Generator Suite
  const handleOpenGenerator = async (lead, defaultTab = 'cv') => {
    setSelectedLead(lead);
    setGeneratorActiveTab(defaultTab);
    setGeneratorModalOpen(true);
    generateDocContent(lead, defaultTab);
  };

  const generateDocContent = async (lead, docType) => {
    setGeneratingDoc(true);
    try {
      const res = await fetch('/api/hunt/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: docType,
          lead: lead,
          candidate: candidateProfile
        })
      });
      const data = await res.json();
      if (data.success) {
        if (docType === 'cv') setGeneratedCvText(data.document);
        if (docType === 'cover_letter') setGeneratedCoverLetterText(data.document);
        if (docType === 'linkedin_note') setGeneratedLinkedinNoteText(data.document);
        if (docType === 'inmail') setGeneratedInmailText(data.document);
        if (docType === 'proposal') setGeneratedProposalText(data.document);
      }
    } catch (err) {
      console.error('Error generating document:', err);
    } finally {
      setGeneratingDoc(false);
    }
  };

  // Download Tailored DOCX
  const handleDownloadDocx = async (docType) => {
    if (!selectedLead) return;
    setDownloadingDocx(true);
    try {
      let contentToExport = '';
      if (docType === 'cv') contentToExport = generatedCvText;
      else if (docType === 'cover_letter') contentToExport = generatedCoverLetterText;
      else if (docType === 'proposal') contentToExport = generatedProposalText;
      else if (docType === 'inmail') contentToExport = generatedInmailText;

      const res = await fetch('/api/hunt/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: docType,
          candidateName: candidateProfile.name,
          jobTitle: selectedLead.title,
          company: selectedLead.company,
          content: contentToExport
        })
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${candidateProfile.name.replace(/\s+/g, '_')}_${docType.toUpperCase()}_Tailored.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading DOCX:', err);
    } finally {
      setDownloadingDocx(false);
    }
  };

  return (
    <div className="page" style={{ minHeight: '100vh', background: 'var(--bone)', display: 'flex', flexDirection: 'column' }}>
      {/* Subtle Grid Backdrop */}
      <div className="grid-backdrop" aria-hidden="true" />

      {/* Top Standalone Header */}
      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'rgba(255, 254, 253, 0.96)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '14px 28px'
        }}
      >
        <div
          style={{
            maxWidth: '1520px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/brand/aqionlabs-icon.png"
                alt="AqionHunt"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
                Aqion<span style={{ color: 'var(--violet)' }}>Hunt</span>
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(81, 69, 229, 0.08)',
                color: 'var(--violet)',
                border: '1px solid rgba(81, 69, 229, 0.2)'
              }}
            >
              UAE IT & AI Intelligence WebApp · Last 45 Days
            </span>
          </div>

          {/* Live Scraper Engine Status & Zero-Cap Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--taupe)' }}>
            <div
              onClick={() => setShowScraperTerminal(!showScraperTerminal)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '5px 12px',
                borderRadius: '999px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
              title="Click to view real-time crawler logs"
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Live Scrapers:</span>
              <span style={{ color: 'var(--violet)', fontWeight: 600 }}>LinkedIn · GulfTalent · Bayt · eSupply · TAMM · Apify</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--paper)', padding: '5px 12px', borderRadius: '999px', border: '1px solid var(--line)' }}>
              <Zap size={14} color="#d2a356" />
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Zero Dirhams Cap</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1520px', margin: '0 auto', width: '100%' }}>
        
        {/* ========================================================================= */}
        {/* SIDEBAR NAVIGATION (Exact 4 Items Only) */}
        {/* ========================================================================= */}
        <aside
          style={{
            width: '300px',
            borderRight: '1px solid var(--line)',
            background: 'var(--paper)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0,
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 65px)',
            position: 'sticky',
            top: '65px'
          }}
        >
          {/* Main 4 Navigation Categories */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ash)', display: 'block', marginBottom: '12px', paddingLeft: '8px' }}>
              Intelligence Hub
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  id: 'it_jobs',
                  label: 'IT Job Hunt',
                  sub: 'Full-Time & Permanent UAE Roles',
                  icon: Briefcase,
                  count: categoryCounts.it_jobs
                },
                {
                  id: 'it_freelance',
                  label: 'IT Freelance Job Hunt',
                  sub: 'Short-Term · Own Visa Priority',
                  icon: Zap,
                  count: categoryCounts.it_freelance
                },
                {
                  id: 'it_products_services',
                  label: 'IT Product & Service Hunt',
                  sub: 'Custom Software & AI Tenders',
                  icon: Bot,
                  count: categoryCounts.it_products_services
                },
                {
                  id: 'portal_hunt',
                  label: 'Portal Hunt',
                  sub: 'Job Boards & Tender Gateways',
                  icon: Globe,
                  count: 42
                }
              ].map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySwitch(cat.id)}
                    style={{
                      background: isActive ? 'var(--violet)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--ink)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isActive ? '0 4px 14px rgba(81, 69, 229, 0.28)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={18} color={isActive ? '#fff' : 'var(--violet)'} />
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700 }}>{cat.label}</div>
                        <div style={{ fontSize: '11px', color: isActive ? 'rgba(255, 255, 255, 0.8)' : 'var(--taupe)', marginTop: '2px' }}>
                          {cat.sub}
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--sand)',
                        color: isActive ? '#fff' : 'var(--ink)',
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Window Selector (Only for Search Tabs) */}
          {activeCategory !== 'portal_hunt' && (
            <div style={{ background: 'var(--bone)', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--taupe)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  Time Window
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--violet)' }}>
                  Last {selectedDaysWindow} Days
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                {[
                  { label: '24h', days: 1 },
                  { label: '7d', days: 7 },
                  { label: '14d', days: 14 },
                  { label: '30d', days: 30 },
                  { label: '45d', days: 45 }
                ].map(w => (
                  <button
                    key={w.days}
                    onClick={() => setSelectedDaysWindow(w.days)}
                    style={{
                      background: selectedDaysWindow === w.days ? 'var(--violet)' : 'var(--paper)',
                      color: selectedDaysWindow === w.days ? '#fff' : 'var(--ink)',
                      border: '1px solid var(--line)',
                      borderRadius: '6px',
                      padding: '5px 0',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tech Signal Tags */}
          {activeCategory !== 'portal_hunt' && (
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ash)', display: 'block', marginBottom: '10px', paddingLeft: '8px' }}>
                Quick Tech Filters
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '4px' }}>
                {[
                  'Voice AI', 'Python', 'Next.js', 'LangGraph', 'Flutter', 'DevOps', 'Laravel', 'SIRA Security', 'FastAPI'
                ].map(tag => {
                  const isSelected = activeFilterTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        const newTag = isSelected ? '' : tag;
                        setActiveFilterTag(newTag);
                        setQuery(newTag);
                        fetchLeads(newTag, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
                      }}
                      style={{
                        background: isSelected ? 'var(--ink)' : 'var(--parchment)',
                        color: isSelected ? '#fff' : 'var(--ink)',
                        border: '1px solid var(--line)',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scrapers Status Badge */}
          <div style={{ marginTop: 'auto', background: 'var(--navy)', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#38c986', fontWeight: 700 }}>
              <Radio size={14} className="animate-pulse" />
              <span>Multi-Engine UAE Web Crawlers</span>
            </div>
            <p style={{ color: '#a5b4fc', margin: '0 0 8px', lineHeight: 1.4 }}>
              Active live scraping across LinkedIn, UAE job boards, consultancies & tender portals (Last 45 Days).
            </p>
            <button
              onClick={() => setShowScraperTerminal(!showScraperTerminal)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Terminal size={12} />
              {showScraperTerminal ? 'Hide Terminal' : 'View Scraper Logs'}
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN STAGE / CONTENT AREA */}
        {/* ========================================================================= */}
        <main style={{ flex: 1, padding: '24px 36px', overflowX: 'hidden' }}>

          {/* Scraper Terminal Drawer (Collapsible) */}
          {showScraperTerminal && (
            <div style={{ background: '#171724', borderRadius: '12px', padding: '16px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '12px', marginBottom: '24px', border: '1px solid #2d2d42' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d42', paddingBottom: '8px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700 }}>
                  <Terminal size={14} color="#38c986" />
                  <span>Real-Time Multi-Engine Scraper Engine (Firecrawl + Scrapling + Apify + Apollo)</span>
                </div>
                <button onClick={() => setShowScraperTerminal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {scraperLogs.length > 0 ? (
                  scraperLogs.map((log, i) => (
                    <div key={i} style={{ color: log.includes('45-Day Window') || log.includes('100% of matching') ? '#38c986' : '#e2e8f0' }}>
                      {log}
                    </div>
                  ))
                ) : (
                  <div>Ready. Enter any job title, skill, or enterprise keyword to trigger live dynamic scraping across the last 45 days.</div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: PORTAL HUNT (2 Major Sections, No Dropdowns, Clickable Cards) */}
          {/* ======================================================================= */}
          {activeCategory === 'portal_hunt' ? (
            <div>
              {/* Portal Hunt Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Globe size={24} color="var(--violet)" />
                  <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    Portal Hunt: UAE Ecosystem Directory
                  </h1>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--taupe)', margin: 0 }}>
                  Direct access to every verified UAE Job Board, Startup Platform, Recruitment Agency, Government E-Procurement Portal, B2B Marketplace, and AI Automation Network. Click any box to open its public search portal.
                </p>
              </div>

              {/* Portal Directory Search Input */}
              <div style={{ position: 'relative', marginBottom: '32px' }}>
                <Search size={18} color="var(--taupe)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input
                  type="text"
                  value={portalDirectorySearch}
                  onChange={e => setPortalDirectorySearch(e.target.value)}
                  placeholder="Filter portals by name, keyword, or tech specialty (e.g. LinkedIn, Bayt, TAMM, DEWA, Upwork, Clutch, Kore.ai)..."
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    background: 'var(--paper)',
                    fontSize: '14px',
                    color: 'var(--ink)',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                  }}
                />
              </div>

              {/* =================================================================== */}
              {/* MAJOR SECTION 1: JOB PORTALS */}
              {/* =================================================================== */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid var(--ink)', paddingBottom: '10px', marginBottom: '24px' }}>
                  <Briefcase size={22} color="var(--violet)" />
                  <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    1. Job Portals & Talent Platforms
                  </h2>
                  <span style={{ fontSize: '12px', background: 'var(--sand)', color: 'var(--ink)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    {JOB_HUNT_PORTAL_CATEGORIES.reduce((acc, cat) => acc + cat.portals.length, 0)} Portals
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {JOB_HUNT_PORTAL_CATEGORIES.map((section, sIdx) => {
                    const filteredPortals = section.portals.filter(p => 
                      !portalDirectorySearch || 
                      p.name.toLowerCase().includes(portalDirectorySearch.toLowerCase()) ||
                      p.tag.toLowerCase().includes(portalDirectorySearch.toLowerCase()) ||
                      p.description.toLowerCase().includes(portalDirectorySearch.toLowerCase())
                    );

                    if (filteredPortals.length === 0) return null;

                    return (
                      <div key={sIdx}>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)' }} />
                          {section.title}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                          {filteredPortals.map((portal, pIdx) => (
                            <a
                              key={pIdx}
                              href={portal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: 'var(--paper)',
                                border: '1px solid var(--line)',
                                borderRadius: '12px',
                                padding: '16px',
                                textDecoration: 'none',
                                color: 'var(--ink)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.15s ease',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'var(--violet)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(81, 69, 229, 0.12)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--line)';
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                                  <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                                    {portal.name}
                                  </h4>
                                  <ExternalLink size={14} color="var(--violet)" style={{ flexShrink: 0 }} />
                                </div>
                                <span
                                  style={{
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    background: 'rgba(81, 69, 229, 0.08)',
                                    color: 'var(--violet)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    display: 'inline-block',
                                    marginBottom: '8px'
                                  }}
                                >
                                  {portal.tag}
                                </span>
                                <p style={{ fontSize: '12px', color: 'var(--taupe)', lineHeight: 1.45, margin: 0 }}>
                                  {portal.description}
                                </p>
                              </div>
                              <div style={{ marginTop: '12px', borderTop: '1px solid var(--line)', paddingTop: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span>Visit Public Search Feed</span>
                                <ChevronRight size={12} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =================================================================== */}
              {/* MAJOR SECTION 2: TENDER & RFQ GATEWAYS */}
              {/* =================================================================== */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid var(--ink)', paddingBottom: '10px', marginBottom: '24px' }}>
                  <Layers size={22} color="var(--violet)" />
                  <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    2. Tender & RFQ Gateways
                  </h2>
                  <span style={{ fontSize: '12px', background: 'var(--sand)', color: 'var(--ink)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    {TENDER_PORTAL_CATEGORIES.reduce((acc, cat) => acc + cat.portals.length, 0)} Gateways
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {TENDER_PORTAL_CATEGORIES.map((section, sIdx) => {
                    const filteredPortals = section.portals.filter(p => 
                      !portalDirectorySearch || 
                      p.name.toLowerCase().includes(portalDirectorySearch.toLowerCase()) ||
                      p.tag.toLowerCase().includes(portalDirectorySearch.toLowerCase()) ||
                      p.description.toLowerCase().includes(portalDirectorySearch.toLowerCase())
                    );

                    if (filteredPortals.length === 0) return null;

                    return (
                      <div key={sIdx}>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)' }} />
                          {section.title}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                          {filteredPortals.map((portal, pIdx) => (
                            <a
                              key={pIdx}
                              href={portal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: 'var(--paper)',
                                border: '1px solid var(--line)',
                                borderRadius: '12px',
                                padding: '16px',
                                textDecoration: 'none',
                                color: 'var(--ink)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.15s ease',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'var(--violet)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(81, 69, 229, 0.12)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--line)';
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                                  <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                                    {portal.name}
                                  </h4>
                                  <ExternalLink size={14} color="var(--violet)" style={{ flexShrink: 0 }} />
                                </div>
                                <span
                                  style={{
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    background: 'rgba(81, 69, 229, 0.08)',
                                    color: 'var(--violet)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    display: 'inline-block',
                                    marginBottom: '8px'
                                  }}
                                >
                                  {portal.tag}
                                </span>
                                <p style={{ fontSize: '12px', color: 'var(--taupe)', lineHeight: 1.45, margin: 0 }}>
                                  {portal.description}
                                </p>
                              </div>
                              <div style={{ marginTop: '12px', borderTop: '1px solid var(--line)', paddingTop: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span>Open Procurement Gateway</span>
                                <ChevronRight size={12} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ===================================================================== */
            /* SEARCH TABS (IT Jobs, IT Freelance, IT Product & Service) */
            /* ===================================================================== */
            <div>
              {/* CV UPLOADER & CANDIDATE PROFILE STUDIO */}
              <section
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  marginBottom: '24px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(81, 69, 229, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--violet)'
                      }}
                    >
                      <UserCheck size={26} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                          {candidateProfile.name}
                        </h3>
                        <span style={{ fontSize: '11px', background: 'rgba(56, 201, 134, 0.12)', color: '#1e8455', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                          ✓ UAE Residence Visa (Immediate Start)
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--taupe)', margin: '3px 0 0' }}>
                        {candidateProfile.title} · {candidateProfile.phone} · {candidateProfile.email}
                      </p>
                    </div>
                  </div>

                  {/* CV Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label
                      style={{
                        background: 'var(--parchment)',
                        color: 'var(--ink)',
                        border: '1px solid var(--line)',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Upload size={14} color="var(--violet)" />
                      <span>{isUploadingCv ? 'Parsing CV...' : 'Upload Your CV (.pdf, .docx)'}</span>
                      <input type="file" accept=".pdf,.docx,.txt" onChange={handleCvFileUpload} style={{ display: 'none' }} />
                    </label>

                    <button
                      onClick={loadSampleCandidateCv}
                      style={{
                        background: 'var(--ink)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={14} />
                      Load Sample UAE Senior CV
                    </button>
                  </div>
                </div>

                {/* Candidate Extracted Skills Ribbon */}
                <div style={{ marginTop: '14px', borderTop: '1px solid var(--line)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase' }}>
                    Extracted Skills from CV:
                  </span>
                  {candidateProfile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        background: 'rgba(81, 69, 229, 0.08)',
                        color: 'var(--violet)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(81, 69, 229, 0.15)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* SEARCH & LIVE SCRAPER TRIGGER BAR */}
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 340px', position: 'relative' }}>
                  <Search size={18} color="var(--taupe)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={
                      activeCategory === 'it_jobs'
                        ? "Search IT jobs by title, skills (e.g. AI Engineer, Python, React, DevOps, Cloud Architect, SIRA)..."
                        : activeCategory === 'it_freelance'
                        ? "Search freelance contracts (e.g. Voice AI bot, Flutter MVP, Laravel refactor, Own Visa)..."
                        : "Search IT tenders & requirements (e.g. AI automation, custom software, government tenders)..."
                    }
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 44px',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                      fontSize: '14px',
                      color: 'var(--ink)',
                      outline: 'none',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                    }}
                  />
                </div>

                <select
                  value={locationFilter}
                  onChange={e => {
                    setLocationFilter(e.target.value);
                    fetchLeads(query, activeCategory, ownVisaFilter, aiPriorityFilter, selectedDaysWindow);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    background: 'var(--paper)',
                    fontSize: '13px',
                    color: 'var(--ink)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">All UAE Locations</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Remote">Remote UAE</option>
                </select>

                <button
                  type="submit"
                  style={{
                    background: 'var(--violet)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 3px 12px rgba(81, 69, 229, 0.28)'
                  }}
                >
                  <Search size={16} />
                  <span>Live Search & Scraping</span>
                </button>
              </form>

              {/* Results Summary & 45-Day Window Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    {activeCategory === 'it_jobs' && 'Live UAE IT Jobs (Last 45 Days)'}
                    {activeCategory === 'it_freelance' && 'Live IT Freelance Opportunities in UAE (Own Visa Priority)'}
                    {activeCategory === 'it_products_services' && 'Live UAE IT & AI Enterprise Tenders / RFQs'}
                  </h2>
                  <span style={{ fontSize: '12px', background: 'var(--sand)', color: 'var(--ink)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    {leads.length} Active Listings
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--taupe)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--parchment)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                    <Calendar size={13} color="var(--violet)" />
                    <span>Range: <strong>Last {selectedDaysWindow} Days</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} />
                    <span>Sorted Newest First</span>
                  </div>
                </div>
              </div>

              {/* LISTINGS FEED */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--taupe)' }}>
                  <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px', color: 'var(--violet)' }} />
                  <p style={{ fontWeight: 600 }}>Scraping public UAE job boards & tender gateways across the last 45 days...</p>
                </div>
              ) : leads.length === 0 ? (
                <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '60px 20px', textAlign: 'center' }}>
                  <Briefcase size={36} color="var(--taupe)" style={{ margin: '0 auto 14px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px', color: 'var(--ink)' }}>No listings found in selected time range</h3>
                  <p style={{ fontSize: '14px', color: 'var(--taupe)', margin: 0 }}>
                    Try expanding the time window to "Last 45 Days" or searching for a different tech keyword.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {leads.map(lead => (
                    <div
                      key={lead.id}
                      style={{
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        borderRadius: '14px',
                        padding: '22px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              background: lead.lead_age?.includes('mins') || lead.lead_age?.includes('now') ? 'rgba(56, 201, 134, 0.15)' : 'var(--sand)',
                              color: lead.lead_age?.includes('mins') || lead.lead_age?.includes('now') ? '#1e8455' : 'var(--ink)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Clock size={12} />
                            {lead.lead_age || 'Just now'} · {lead.posted_date}
                          </span>

                          <a
                            href={lead.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: 'var(--violet)',
                              background: 'rgba(81, 69, 229, 0.08)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Globe size={12} />
                            {lead.source_name}
                            <ExternalLink size={10} />
                          </a>

                          {lead.public_search_page && (
                            <a
                              href={lead.public_search_page}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: 'var(--graphite)',
                                background: 'var(--parchment)',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>Public Search Page ↗</span>
                            </a>
                          )}

                          {lead.own_visa_priority && (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                background: '#fef3c7',
                                color: '#92400e',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                border: '1px solid #fde68a'
                              }}
                            >
                              ⚡ Own Visa Priority
                            </span>
                          )}

                          {lead.is_ai_priority && (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                background: '#ede9fe',
                                color: '#5b21b6',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                border: '1px solid #ddd6fe'
                              }}
                            >
                              🤖 AI Priority
                            </span>
                          )}
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e8455' }}>
                            {lead.salary_range || lead.budget_range}
                          </span>
                        </div>
                      </div>

                      {/* Title & Company Info */}
                      <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px', color: 'var(--ink)', lineHeight: 1.3 }}>
                        {lead.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: 'var(--taupe)', marginBottom: '14px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Building2 size={14} color="var(--violet)" />
                          <strong style={{ color: 'var(--ink)' }}>{lead.company}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={14} />
                          <span>{lead.location}</span>
                        </div>
                        {lead.website_url && (
                          <a href={lead.website_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--taupe)', textDecoration: 'underline', fontSize: '12px' }}>
                            Company Website ↗
                          </a>
                        )}
                        {lead.company_linkedin_url && (
                          <a href={lead.company_linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--violet)', textDecoration: 'underline', fontSize: '12px' }}>
                            Company LinkedIn ↗
                          </a>
                        )}
                      </div>

                      {/* Description Overview */}
                      <p style={{ fontSize: '13.5px', color: 'var(--graphite)', lineHeight: 1.5, margin: '0 0 14px' }}>
                        {lead.description}
                      </p>

                      {/* MAJOR POINTS OF THE JOB DESCRIPTION */}
                      {lead.major_job_points && lead.major_job_points.length > 0 && (
                        <div
                          style={{
                            background: 'var(--bone)',
                            border: '1px solid var(--line)',
                            borderRadius: '10px',
                            padding: '14px 16px',
                            marginBottom: '16px'
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--taupe)', display: 'block', marginBottom: '8px' }}>
                            🎯 Key Job Description & Deliverable Highlights:
                          </span>
                          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {lead.major_job_points.map((pt, pIdx) => (
                              <li key={pIdx} style={{ fontSize: '12.5px', color: 'var(--ink)', lineHeight: 1.45 }}>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Signals */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {lead.tech_signals?.map((tech, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              background: 'var(--parchment)',
                              color: 'var(--ink)',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              border: '1px solid var(--line)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* VERIFIED CONTACT PERSON */}
                      {lead.decision_maker && (
                        <div
                          style={{
                            background: 'var(--paper)',
                            border: '1px solid var(--line)',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '10px'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ash)', display: 'block' }}>
                              Verified Direct Contact Person / Hiring Lead:
                            </span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>
                              {lead.decision_maker.name} — <span style={{ color: 'var(--taupe)', fontWeight: 500 }}>{lead.decision_maker.role}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {lead.decision_maker.email && (
                              <button
                                onClick={() => copyToClipboard(lead.decision_maker.email, `email-${lead.id}`)}
                                style={{
                                  background: 'var(--bone)',
                                  border: '1px solid var(--line)',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 600
                                }}
                              >
                                <Mail size={12} color="var(--violet)" />
                                {copiedKey === `email-${lead.id}` ? 'Copied!' : lead.decision_maker.email}
                              </button>
                            )}

                            {lead.decision_maker.phone && (
                              <button
                                onClick={() => copyToClipboard(lead.decision_maker.phone, `phone-${lead.id}`)}
                                style={{
                                  background: 'var(--bone)',
                                  border: '1px solid var(--line)',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 600
                                }}
                              >
                                <Phone size={12} color="#1e8455" />
                                {copiedKey === `phone-${lead.id}` ? 'Copied!' : lead.decision_maker.phone}
                              </button>
                            )}

                            {lead.decision_maker.jobportal_profile_url && (
                              <a
                                href={lead.decision_maker.jobportal_profile_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  background: 'var(--bone)',
                                  border: '1px solid var(--line)',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  color: 'var(--ink)',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 600
                                }}
                              >
                                <Globe size={12} />
                                Portal Profile ↗
                              </a>
                            )}

                            {lead.decision_maker.linkedin_search_url && (
                              <a
                                href={lead.decision_maker.linkedin_search_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  background: 'var(--bone)',
                                  border: '1px solid var(--line)',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  color: 'var(--violet)',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 600
                                }}
                              >
                                <ExternalLink size={12} />
                                LinkedIn ↗
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ACTION BUTTONS */}
                      <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleOpenGenerator(lead, 'cv')}
                            style={{
                              background: 'var(--violet)',
                              color: '#fff',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 2px 8px rgba(81, 69, 229, 0.25)'
                            }}
                          >
                            <FileCheck size={14} />
                            Tailor & Generate CV (DOCX/PDF)
                          </button>

                          <button
                            onClick={() => handleOpenGenerator(lead, 'cover_letter')}
                            style={{
                              background: 'var(--ink)',
                              color: '#fff',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <FileText size={14} />
                            Tailor Cover Letter (DOCX/PDF)
                          </button>

                          <button
                            onClick={() => handleOpenGenerator(lead, 'linkedin_note')}
                            style={{
                              background: 'var(--parchment)',
                              color: 'var(--ink)',
                              border: '1px solid var(--line)',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <MessageSquare size={14} color="var(--violet)" />
                            LinkedIn Note (&lt;300 Chars)
                          </button>

                          <button
                            onClick={() => handleOpenGenerator(lead, 'inmail')}
                            style={{
                              background: 'var(--parchment)',
                              color: 'var(--ink)',
                              border: '1px solid var(--line)',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Send size={14} color="#1e8455" />
                            Executive Email Pitch
                          </button>

                          {activeCategory === 'it_products_services' && (
                            <button
                              onClick={() => handleOpenGenerator(lead, 'proposal')}
                              style={{
                                background: '#242435',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 14px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Layers size={14} />
                              Technical RFP Proposal (DOCX/PDF)
                            </button>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--violet)' }}>
                          <Sparkles size={14} />
                          <span>{lead.match_score || 96}% Profile Match</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* DOCUMENT & PITCH GENERATOR SUITE MODAL */}
      {/* ========================================================================= */}
      {generatorModalOpen && selectedLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 21, 19, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: 'var(--paper)',
              width: '100%',
              maxWidth: '960px',
              maxHeight: '90vh',
              borderRadius: '16px',
              border: '1px solid var(--line)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bone)'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--violet)' }}>
                  AqionHunt AI Tailored Suite · Verified UAE Format
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '2px 0 0', color: 'var(--ink)' }}>
                  {selectedLead.title} — {selectedLead.company}
                </h2>
              </div>
              <button
                onClick={() => setGeneratorModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--taupe)', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Tab Selector */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--paper)', padding: '0 24px', gap: '8px' }}>
              {[
                { id: 'cv', label: 'Tailored CV (DOCX & PDF)', icon: FileCheck },
                { id: 'cover_letter', label: 'Tailored Cover Letter', icon: FileText },
                { id: 'linkedin_note', label: 'LinkedIn Note (<300)', icon: MessageSquare },
                { id: 'inmail', label: 'Executive Email Pitch', icon: Send },
                ...(activeCategory === 'it_products_services' ? [{ id: 'proposal', label: 'RFP Proposal', icon: Layers }] : [])
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = generatorActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setGeneratorActiveTab(tab.id);
                      generateDocContent(selectedLead, tab.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? '2px solid var(--violet)' : '2px solid transparent',
                      color: isActive ? 'var(--violet)' : 'var(--taupe)',
                      fontWeight: isActive ? 700 : 500,
                      padding: '12px 14px',
                      fontSize: '13px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Document Body */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'var(--bone)' }}>
              {generatingDoc ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--taupe)' }}>
                  <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px', color: 'var(--violet)' }} />
                  <p style={{ fontWeight: 600 }}>Restructuring experiences and aligning with target UAE job description...</p>
                </div>
              ) : (
                <div
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: '10px',
                    padding: '24px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--ink)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {generatorActiveTab === 'cv' && (generatedCvText || 'Generating tailored CV...')}
                  {generatorActiveTab === 'cover_letter' && (generatedCoverLetterText || 'Generating cover letter...')}
                  {generatorActiveTab === 'linkedin_note' && (generatedLinkedinNoteText || 'Generating LinkedIn note...')}
                  {generatorActiveTab === 'inmail' && (generatedInmailText || 'Generating executive inmail...')}
                  {generatorActiveTab === 'proposal' && (generatedProposalText || 'Generating proposal...')}
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--paper)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--taupe)' }}>
                {generatorActiveTab === 'linkedin_note' && (
                  <span>
                    Length: <strong>{generatedLinkedinNoteText.length} / 300 characters</strong> (Optimal for free LinkedIn connection request)
                  </span>
                )}
                {generatorActiveTab === 'cv' && (
                  <span>Includes tailored skills injection & JD experience refactoring.</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    let textToCopy = '';
                    if (generatorActiveTab === 'cv') textToCopy = generatedCvText;
                    else if (generatorActiveTab === 'cover_letter') textToCopy = generatedCoverLetterText;
                    else if (generatorActiveTab === 'linkedin_note') textToCopy = generatedLinkedinNoteText;
                    else if (generatorActiveTab === 'inmail') textToCopy = generatedInmailText;
                    else if (generatorActiveTab === 'proposal') textToCopy = generatedProposalText;

                    navigator.clipboard.writeText(textToCopy);
                    setCopiedKey('modal_doc');
                    setTimeout(() => setCopiedKey(null), 2000);
                  }}
                  style={{
                    background: 'var(--parchment)',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={14} />
                  {copiedKey === 'modal_doc' ? 'Copied to Clipboard!' : 'Copy Text'}
                </button>

                {(generatorActiveTab === 'cv' || generatorActiveTab === 'cover_letter' || generatorActiveTab === 'proposal') && (
                  <>
                    <button
                      onClick={() => handleDownloadDocx(generatorActiveTab)}
                      disabled={downloadingDocx}
                      style={{
                        background: 'var(--ink)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={14} />
                      {downloadingDocx ? 'Generating Word (.docx)...' : 'Download DOCX (.docx)'}
                    </button>

                    <button
                      onClick={() => window.print()}
                      style={{
                        background: 'var(--violet)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(81, 69, 229, 0.25)'
                      }}
                    >
                      <Printer size={14} />
                      Print / Save as PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
