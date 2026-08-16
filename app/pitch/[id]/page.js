'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AudioLines,
  ScanText,
  UserRoundCheck,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { PhoneMockup } from '@/components/phone/PhoneMockup';
import { LeadCaptured } from '@/components/sections/LeadCaptured';
import {
  PainPointsAndSolutions,
  AutomationRoadmap,
} from '@/components/sections/PainPointsAndSolutions';
import { useVoiceAgent } from '@/lib/useVoiceAgent';

const notes = {
  left: [
    {
      number: '01',
      icon: AudioLines,
      title: 'Speak naturally',
      copy: 'No forms. No scripts. Experience natural conversation with the agent.',
    },
    {
      number: '02',
      icon: ScanText,
      title: 'Watch it understand',
      copy: 'See each exchange become a clear live transcript in real time.',
    },
  ],
  right: [
    {
      number: '03',
      icon: UserRoundCheck,
      title: 'Receive a qualified lead',
      copy: 'Contact details and requirements become structured CRM data.',
    },
  ],
};

function ExperienceNotes({ side }) {
  return (
    <aside className={`experience-notes notes-${side}`} aria-label={`${side} experience annotations`}>
      {notes[side].map(({ number, icon: Icon, title, copy }) => (
        <div className="experience-note" key={number}>
          <span className="note-number">{number}</span>
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
          <strong>{title}</strong>
          <p>{copy}</p>
        </div>
      ))}
    </aside>
  );
}

export default function ClientPitchExperience({ params }) {
  const [pitchId, setPitchId] = useState(null);
  const [pitchData, setPitchData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params in Next.js
  useEffect(() => {
    Promise.resolve(params).then((p) => {
      if (p?.id) setPitchId(p.id);
    });
  }, [params]);

  // Fetch pitch data
  useEffect(() => {
    if (!pitchId) return;

    fetch(`/api/pitch/${pitchId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.pitch) {
          setPitchData(data.pitch);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch pitch error:', err);
        setLoading(false);
      });
  }, [pitchId]);

  const companyName = pitchData?.companyName || 'Target Business';
  const voiceConfig = pitchData?.voiceAgent || {};

  const call = useVoiceAgent({
    companyName,
    voiceConfig,
  });

  if (loading) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', display: 'grid', gap: '14px' }}>
          <Loader2 size={36} className="spin" style={{ color: 'var(--violet)', margin: '0 auto' }} />
          <p style={{ fontFamily: 'var(--font-mono, monospace)', color: 'var(--taupe)', fontSize: '13px' }}>
            Assembling bespoke pitch & live Voice AI experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Background Grid & Atmospheric Motion */}
      <div className="grid-backdrop" aria-hidden="true" />
      <div className="motion-decoration" aria-hidden="true">
        <img
          className="motion-wave"
          src="/motion/service-motion.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Top Navigation Bar */}
      <header
        style={{
          width: 'min(calc(100% - 48px), var(--shell))',
          margin: '0 auto',
          padding: '24px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontSize: '13px',
            color: 'var(--taupe)',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={16} /> New Pitch Scan
        </Link>

        {pitchData?.websiteUrl && (
          <a
            href={pitchData.websiteUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              color: 'var(--ash)',
            }}
          >
            {pitchData.websiteUrl.replace(/^https?:\/\//i, '')} <ExternalLink size={12} />
          </a>
        )}
      </header>

      {/* Stage: Hero & Live Phone Mockup Portal */}
      <main className="stage" style={{ minHeight: 'auto', paddingBottom: '90px' }}>
        <div className="hero">
          {/* Brand Lockup: Client × AqionLabs */}
          <div className="lockup" aria-label={`${companyName} and AqionLabs`}>
            <div className="lockup-client">
              <strong
                style={{
                  fontFamily: 'var(--font-sans, "Bricolage Grotesque", sans-serif)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                {companyName}
              </strong>
            </div>
            <span className="lockup-x" aria-hidden="true">
              ×
            </span>
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

          {/* Dynamic Hero Title */}
          <h1 className="hero-title" id="experience-title">
            <span className="hero-title-primary">
              {pitchData?.tagline?.split(',')[0] || `${companyName} Transformation,`}
            </span>
            <span className="hero-title-secondary">
              Now Powered by <em>Agentic Voice AI</em>
            </span>
          </h1>

          <p className="hero-sub">
            Experience <strong>{voiceConfig.agentName || `AqionVox for ${companyName}`}</strong>, trained on {companyName}'s real-time service portfolio to qualify inbound leads 24/7.
          </p>
        </div>

        {/* 3-Column Experience Installation (Notes Left, Phone Center, Notes Right) */}
        <section className="installation" aria-label="Interactive voice agent demonstration">
          <ExperienceNotes side="left" />
          <PhoneMockup call={call} companyName={companyName} />
          <ExperienceNotes side="right" />
        </section>

        <p className="stage-caption">
          Live Test Environment • Powered by AqionVox Ultra-Low Latency Engine
        </p>
      </main>

      {/* Section 1: Real-time Structured Lead Capture */}
      <LeadCaptured
        lead={call.lead}
        transcript={call.transcript}
        status={call.status}
        onClear={call.clearData}
        companyName={companyName}
      />

      {/* Section 2: Pain Points and ROI Solutions */}
      <PainPointsAndSolutions
        companyName={companyName}
        painPoints={pitchData?.identifiedPainPoints}
        services={pitchData?.servicesIdentified}
      />

      {/* Section 3: Automation Roadmap & Turnkey Deployment */}
      <AutomationRoadmap
        companyName={companyName}
        roadmap={pitchData?.automationRoadmap}
      />

      {/* Footer */}
      <footer className="page-footer">
        <span>Tailored for {companyName} • Generated by AqionVox</span>
        <span>AqionLabs • Autonomous Enterprise Solutions</span>
      </footer>
    </div>
  );
}
