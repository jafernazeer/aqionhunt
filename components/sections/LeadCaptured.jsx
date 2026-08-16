'use client';

import React from 'react';
import { CircleCheck, RotateCcw, Sparkles } from 'lucide-react';
import { CALL_STATE } from '@/lib/useVoiceAgent';

const FIELDS = [
  { key: 'name', label: 'Contact Name' },
  { key: 'company', label: 'Organization' },
  { key: 'place', label: 'Location' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email ID' },
  { key: 'requirement', label: 'Identified Requirement', wide: true },
];

function LeadField({ label, value, wide }) {
  const filled = Boolean(value);
  return (
    <div className={`lead-field ${wide ? 'is-wide' : ''} ${filled ? 'is-filled' : ''}`}>
      <dt>{label}</dt>
      <dd>{filled ? value : <span className="lead-placeholder">—</span>}</dd>
    </div>
  );
}

function CallSummary({ transcript, companyName }) {
  return (
    <div className={`lead-field is-summary ${transcript?.length ? 'is-filled' : ''}`}>
      <dt>Live Call Summary & Extracted Log</dt>
      <dd>
        {transcript?.length ? (
          <ol className="summary-list" aria-label="Call transcript summary">
            {transcript.map((entry, index) => (
              <li key={entry.id || `${entry.speaker}-${index}`}>
                <span>{entry.speaker === 'agent' ? `${companyName || 'AqionVox'} AI` : 'Prospect'}</span>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <span className="lead-placeholder">Transcript log will populate after conversation begins</span>
        )}
      </dd>
    </div>
  );
}

export function LeadCaptured({ lead, transcript = [], status, onClear, companyName }) {
  const processing = status === CALL_STATE.processing;
  const hasLead = Boolean(lead);
  const transcriptReady =
    status === CALL_STATE.processing ||
    status === CALL_STATE.completed ||
    status === CALL_STATE.idle ||
    status === CALL_STATE.error;
  const capturedTranscript = transcriptReady ? transcript.filter((entry) => entry?.text?.trim()) : [];
  const hasCapture = hasLead || capturedTranscript.length > 0;

  return (
    <section className="section lead-section" id="live-lead-intelligence" aria-labelledby="lead-heading">
      <div className="content-shell">
        <div className="section-card">
          <div className="section-head">
            <p className="eyebrow">Autonomous Intelligence Extraction</p>
            <h2 id="lead-heading">Live Structured Lead Capture</h2>
            <p className="section-sub">
              AqionVox automatically parses speech in real-time, extracts prospect intent, contact coordinates, and prepares high-intent CRM payloads.
            </p>
          </div>

          <div className="lead-panel">
            {!hasCapture && !processing && (
              <div className="lead-empty">
                <p>Start a test call above. Your structured lead data and conversation transcript will populate here automatically.</p>
              </div>
            )}

            {!hasCapture && processing && (
              <div className="lead-empty is-working">
                <p>Analysing conversation, classifying intent, and populating lead records…</p>
              </div>
            )}

            {hasCapture && (
              <>
                <div className="lead-confirmation">
                  <CircleCheck size={16} /> Live Voice Session Data Synchronized
                </div>
                <dl className="lead-grid">
                  {FIELDS.map((field) => (
                    <LeadField key={field.key} label={field.label} value={lead?.[field.key]} wide={field.wide} />
                  ))}
                  <CallSummary transcript={capturedTranscript} companyName={companyName} />
                </dl>
              </>
            )}
          </div>

          {hasCapture && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
              <button type="button" className="link-quiet" onClick={onClear}>
                <RotateCcw size={13} /> Reset session test data
              </button>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#8174ff', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)' }}>
                <Sparkles size={13} /> Ready for CRM Webhook Dispatch
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
