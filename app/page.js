'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AudioLines,
  AudioWaveform,
  Globe,
  Link2,
  Loader2,
  ScanText,
  Sparkles,
  UserRoundCheck,
  Zap,
} from 'lucide-react';

export default function GeneratorDashboard() {
  const router = useRouter();
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');

  const loadingSteps = [
    'Crawling client website and metadata...',
    'Extracting business services, offerings, and value proposition...',
    'Synthesizing company pain points and ROI solutions...',
    'Configuring live AqionVox Voice AI Agent & prompt parameters...',
    'Building personalized presentation experience...',
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!website) {
      setError('Please provide a website URL.');
      return;
    }

    setError('');
    setLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, linkedin }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to synthesize client page.');
      }

      router.push(`/pitch/${data.id}`);
    } catch (err) {
      clearInterval(stepInterval);
      setLoading(false);
      setError(err.message || 'Something went wrong. Please check the URL and try again.');
    }
  };

  const handleQuickDemo = (sampleUrl, sampleName) => {
    setWebsite(sampleUrl);
    setLinkedin(`https://linkedin.com/company/${sampleName.toLowerCase()}`);
  };

  return (
    <div className="page">
      {/* Hairline Grid Background */}
      <div className="grid-backdrop" aria-hidden="true" />

      {/* Atmospheric Motion SVG */}
      <div className="motion-decoration" aria-hidden="true">
        <img
          className="motion-wave"
          src="/motion/service-motion.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Top Universal Header */}
      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'rgba(255, 254, 253, 0.85)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/brand/aqionlabs-icon.png"
            alt="AqionLabs"
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
          <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>
            Aqion<span style={{ color: 'var(--violet)' }}>Labs</span>
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/hunt"
            style={{
              textDecoration: 'none',
              background: 'var(--violet)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(81, 69, 229, 0.25)',
            }}
          >
            <Sparkles size={14} />
            UAE AI Hunting Portal (Live Leads)
          </Link>
        </nav>
      </header>

      <main className="stage" style={{ minHeight: 'calc(100vh - 60px)', justifyContent: 'center' }}>
        {/* Lockup Header */}
        <header className="hero" style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '14px' }}>
            <Link
              href="/hunt"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(56, 201, 134, 0.12)',
                color: '#1e8455',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid rgba(56, 201, 134, 0.3)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e8455' }} />
              Live: 18+ UAE AI Jobs, Tenders & SME Requests Found (AED 10k+) →
            </Link>
          </div>

          <div className="lockup" style={{ width: 'auto', borderBottom: 'none', padding: 0 }}>
            <span className="lockup-aqion">
              <img
                className="lockup-aqion-icon"
                src="/brand/aqionlabs-icon.png"
                alt=""
                aria-hidden="true"
              />
              <img
                className="lockup-aqion-wordmark"
                src="/brand/aqionlabs-wordmark.png"
                alt="AqionLabs"
              />
            </span>
          </div>

          <h1 className="hero-title" style={{ marginTop: '18px' }}>
            <span className="hero-title-primary">Automated Client Pitches,</span>
            <span className="hero-title-secondary">
              Powered by <em>AqionVox AI</em>
            </span>
          </h1>

          <p className="hero-sub" style={{ maxWidth: '640px' }}>
            Input any client's website URL. Our agentic pipeline scrapes their business data, formulates tailored ROI workflow automations, and instantly configures a real-time Voice AI testing portal.
          </p>
        </header>

        {/* Input Terminal Card */}
        <div
          style={{
            width: 'min(100%, 720px)',
            background: 'var(--paper)',
            borderRadius: '28px',
            border: '1px solid var(--line)',
            padding: '36px',
            boxShadow: '0 32px 64px -24px rgba(23, 21, 19, 0.12)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--taupe)',
                  marginBottom: '8px',
                }}
              >
                <Globe size={14} style={{ color: 'var(--violet)' }} />
                Target Business Website URL <span style={{ color: 'var(--alert)' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="https://examplecompany.com or examplecompany.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  height: '52px',
                  padding: '0 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--line)',
                  background: 'var(--bone)',
                  fontSize: '14px',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--taupe)',
                  marginBottom: '8px',
                }}
              >
                <Link2 size={14} style={{ color: 'var(--cyan)' }} />
                Company LinkedIn URL <span style={{ color: 'var(--ash)', fontSize: '10px' }}>(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/company/example"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  height: '52px',
                  padding: '0 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--line)',
                  background: 'var(--bone)',
                  fontSize: '14px',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(239, 93, 88, 0.08)',
                  border: '1px solid rgba(239, 93, 88, 0.2)',
                  color: 'var(--alert)',
                  fontSize: '13px',
                }}
              >
                {error}
              </div>
            )}

            {loading ? (
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(81, 69, 229, 0.05)',
                  border: '1px solid rgba(81, 69, 229, 0.18)',
                  textAlign: 'center',
                  display: 'grid',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--violet)' }}>
                  <Loader2 size={20} className="spin" />
                  <strong style={{ fontSize: '14px' }}>Autonomous Agent Pipeline Running</strong>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--taupe)', fontFamily: 'var(--font-mono, monospace)' }}>
                  {loadingSteps[loadingStep]}
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  height: '54px',
                  borderRadius: '16px',
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Sparkles size={18} />
                Generate Tailored Pitch & Voice AI Portal
              </button>
            )}
          </form>

          {/* Quick Demo Suggestions */}
          {!loading && (
            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10px',
                  color: 'var(--ash)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Try sample businesses:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('https://stripe.com', 'Stripe')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: '1px solid var(--line)',
                    background: 'var(--bone)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    color: 'var(--graphite)',
                  }}
                >
                  Stripe.com
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('https://linear.app', 'Linear')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: '1px solid var(--line)',
                    background: 'var(--bone)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    color: 'var(--graphite)',
                  }}
                >
                  Linear.app
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('https://ethikcorp.com', 'EthikCorp')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: '1px solid var(--line)',
                    background: 'var(--bone)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    color: 'var(--graphite)',
                  }}
                >
                  EthikCorp.com
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature annotations below */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            width: 'min(100%, 880px)',
            marginTop: '44px',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ padding: '8px', borderRadius: '10px', background: 'rgba(81, 69, 229, 0.1)', color: 'var(--violet)' }}>
              <AudioLines size={18} />
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '3px' }}>
                Real-Time Voice AI
              </strong>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--taupe)', lineHeight: 1.5 }}>
                Sub-500ms voice conversational agent trained dynamically on client site structure.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ padding: '8px', borderRadius: '10px', background: 'rgba(81, 69, 229, 0.1)', color: 'var(--violet)' }}>
              <ScanText size={18} />
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '3px' }}>
                Live Lead Intelligence
              </strong>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--taupe)', lineHeight: 1.5 }}>
                Real-time transcript streaming with structured lead and intent classification.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ padding: '8px', borderRadius: '10px', background: 'rgba(81, 69, 229, 0.1)', color: 'var(--violet)' }}>
              <UserRoundCheck size={18} />
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '3px' }}>
                Tailored Workflow ROI
              </strong>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--taupe)', lineHeight: 1.5 }}>
                Auto-diagnosed business operational pain points & agentic solution architecture.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <span>AqionLabs • Agentic AI & Voice Automation Architecture</span>
        <span>AqionVox Platform</span>
      </footer>
    </div>
  );
}
