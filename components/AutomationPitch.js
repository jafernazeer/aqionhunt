import styles from './AutomationPitch.module.css';

export default function AutomationPitch({ companyName, painPoints }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Automate Your Workflows</h2>
      <p className={styles.description}>
        At AqionLabs, we analyzed {companyName}'s current operations. Here is how our custom Agentic AI solutions can eliminate bottlenecks and scale your business.
      </p>

      <div className={styles.grid}>
        {painPoints.map((point, index) => (
          <div key={index} className={`glass-panel ${styles.card}`}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h4l3-9 5 18 3-9h5" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{point.problem}</h3>
            <p className={styles.cardDesc}>{point.solution}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <button className="btn-primary">
          Schedule an AqionLabs Consultation
        </button>
      </div>
    </section>
  );
}
