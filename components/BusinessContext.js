import styles from './BusinessContext.module.css';

export default function BusinessContext({ companyName, services, team, clients }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What We Know About {companyName}</h2>
      <p className={styles.description}>
        Our autonomous agents have mapped your organization's digital footprint. Here is the context our AI uses to generate bespoke solutions.
      </p>

      <div className={styles.bentoGrid}>
        <div className={`glass-panel ${styles.bentoCard} ${styles.servicesCard}`}>
          <h3 className={styles.cardTitle}>Core Services</h3>
          <ul className={styles.list}>
            {services.map((service, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.bullet}></span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className={`glass-panel ${styles.bentoCard} ${styles.teamCard}`}>
          <h3 className={styles.cardTitle}>Key Leadership</h3>
          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <div key={i} className={styles.teamMember}>
                <div className={styles.avatar}>{member.name.charAt(0)}</div>
                <div className={styles.memberInfo}>
                  <p className={styles.memberName}>{member.name}</p>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`glass-panel ${styles.bentoCard} ${styles.clientsCard}`}>
          <h3 className={styles.cardTitle}>Existing Clients & Partners</h3>
          <div className={styles.tags}>
            {clients.map((client, i) => (
              <span key={i} className={styles.tag}>{client}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
