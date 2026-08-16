'use client';

import { useState, useEffect } from 'react';
import styles from './VoiceAgentDemo.module.css';

export default function VoiceAgentDemo({ companyName }) {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        // Simulate volume changes for the visualizer
        setVolume(Math.random() * 100);
      }, 100);
    } else {
      setVolume(0);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleCall = () => {
    if (!isActive) {
      setStatus('Connecting...');
      setTimeout(() => {
        setIsActive(true);
        setStatus(`Speaking with Agent trained on ${companyName}`);
      }, 1500);
    } else {
      setIsActive(false);
      setStatus('Call Ended');
      setTimeout(() => setStatus('Idle'), 2000);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Experience the Agentic AI</h2>
      <p className={styles.description}>
        We have trained a Voice AI agent on {companyName}'s data. Start the demo below to interact with an AI that understands your business context.
      </p>

      <div className={`glass-panel ${styles.demoContainer}`}>
        <div className={styles.visualizerContainer}>
          <div 
            className={`${styles.orb} ${isActive ? styles.orbActive : ''}`}
            style={{ 
              transform: `scale(${1 + (volume / 300)})`,
              boxShadow: isActive ? `0 0 ${20 + volume}px var(--accent-glow)` : 'none'
            }}
          />
        </div>
        
        <div className={styles.controls}>
          <p className={styles.status}>{status}</p>
          <button 
            className={`btn-primary ${isActive ? styles.btnEnd : ''}`}
            onClick={toggleCall}
          >
            {isActive ? 'End Call' : 'Start AI Demo'}
            {!isActive && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
