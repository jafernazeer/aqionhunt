'use client';

import React from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function PainPointsAndSolutions({ companyName, painPoints, services }) {
  return (
    <section className="section" id="roi-solutions" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="content-shell">
        <div className="section-head">
          <p className="eyebrow">Enterprise Value & ROI</p>
          <h2>How AqionLabs Automates {companyName}'s Daily Operations</h2>
          <p className="section-sub">
            Eliminate operational bottlenecks, recover after-hours revenue, and deploy autonomous AI agents across your core workflows.
          </p>
        </div>

        {/* Identified Services Bar */}
        {services && services.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px'
          }}>
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono, monospace)',
              color: 'var(--taupe)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginRight: '6px'
            }}>
              Identified Core Services:
            </span>
            {services.map((srv, idx) => (
              <span
                key={idx}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  background: 'rgba(81, 69, 229, 0.08)',
                  border: '1px solid rgba(81, 69, 229, 0.22)',
                  color: 'var(--violet)',
                  fontSize: '12px',
                  fontWeight: 500
                }}
              >
                {srv}
              </span>
            ))}
          </div>
        )}

        {/* Pain Points Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '20px'
        }}>
          {painPoints?.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                padding: '32px 28px',
                borderRadius: '24px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                boxShadow: '0 16px 36px -20px rgba(23, 21, 19, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
            >
              <div>
                {/* Metric Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: 'rgba(56, 201, 134, 0.1)',
                  border: '1px solid rgba(56, 201, 134, 0.25)',
                  color: '#218d59',
                  fontSize: '11px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono, monospace)',
                  marginBottom: '18px'
                }}>
                  <Zap size={12} /> {item.metric || 'Instant Automation'}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans, "Bricolage Grotesque", sans-serif)',
                  fontSize: '20px',
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: 'var(--ink)'
                }}>
                  {item.title}
                </h3>

                {/* Problem */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '14px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(239, 93, 88, 0.06)',
                  border: '1px solid rgba(239, 93, 88, 0.15)'
                }}>
                  <AlertCircle size={16} style={{ color: 'var(--alert)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--alert)', fontFamily: 'var(--font-mono, monospace)', marginBottom: '3px' }}>
                      Current Challenge
                    </strong>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--graphite)', lineHeight: '1.5' }}>
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(81, 69, 229, 0.06)',
                  border: '1px solid rgba(81, 69, 229, 0.18)'
                }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--violet)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--violet)', fontFamily: 'var(--font-mono, monospace)', marginBottom: '3px' }}>
                      AqionLabs Automated Solution
                    </strong>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--graphite)', lineHeight: '1.5' }}>
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AutomationRoadmap({ companyName, roadmap }) {
  return (
    <section className="section" style={{ background: 'var(--parchment)', borderTop: '1px solid var(--line)' }}>
      <div className="content-shell">
        <div className="section-head">
          <p className="eyebrow">Seamless Onboarding</p>
          <h2>Turnkey Deployment Architecture</h2>
          <p className="section-sub">
            How AqionLabs embeds custom agentic AI pipelines into {companyName}'s current software stack with zero workflow disruption.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {roadmap?.map((step, idx) => (
            <div
              key={idx}
              style={{
                padding: '30px',
                borderRadius: '20px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                position: 'relative'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                color: 'var(--violet)',
                fontWeight: 600,
                letterSpacing: '0.1em'
              }}>
                STAGE {step.phase}
              </span>
              <h4 style={{
                fontFamily: 'var(--font-sans, "Bricolage Grotesque", sans-serif)',
                fontSize: '18px',
                fontWeight: 600,
                margin: '10px 0 8px',
                color: 'var(--ink)'
              }}>
                {step.title}
              </h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--taupe)', lineHeight: '1.6' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          marginTop: '56px',
          padding: '44px 36px',
          borderRadius: '26px',
          background: 'linear-gradient(135deg, #171724 0%, #242435 100%)',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          boxShadow: '0 24px 48px -20px rgba(0, 0, 0, 0.45)'
        }}>
          <div style={{ maxWidth: '540px' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#9b8cff',
              marginBottom: '8px'
            }}>
              Ready for Production
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif, "Fraunces", serif)',
              fontSize: '32px',
              fontWeight: 400,
              margin: '0 0 10px',
              lineHeight: 1.15
            }}>
              Deploy AqionVox for {companyName}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#c7c3cc', lineHeight: 1.6 }}>
              Get a tailored agentic voice integration and automated CRM connector configured for your exact business requirements.
            </p>
          </div>

          <a
            href="mailto:contact@aqionlabs.com?subject=AqionVox%20Deployment%20Inquiry"
            className="btn btn-primary"
            style={{
              padding: '0 28px',
              minHeight: '52px',
              fontSize: '14px',
              borderRadius: '999px',
              textDecoration: 'none'
            }}
          >
            Launch Production Agent <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
