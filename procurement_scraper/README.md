# AqionProcure - UAE MEP, Fit-Out & Facility Contracting Procurement Engine

Autonomous multi-source procurement intelligence, web scraping framework, and AI submittal generator designed specifically for UAE contracting teams, MEP consultants, facility managers, and commercial directors.

---

## 🏗️ Architectural Overview

```
procurement_scraper/
├── services_catalog.json             # Structured 8 categories, 23 specialized trades, and compliance specs
├── config.yaml                       # Target portals, rate benchmarks (AED), proxy & scraper engines
├── cli.py                            # Master command-line interface
├── procurement_intel.db              # SQLite indexed repository for RFQs, contractors & audit logs
├── scrapers/
│   ├── scrapling_mep_agent.py        # Scrapling HTTP/Stealth fetcher with anti-bot bypass
│   ├── esupply_uae_agent.py          # eSupply Dubai, TAMM, Tejari tender scraper
│   └── yello_contractor_agent.py     # Yello.ae & UAE directory contractor registry scraper
├── pipeline/
│   ├── scope_classifier.py           # Trade classifier & authority detection (DEWA, DCD, DM, etc.)
│   └── boq_estimator.py              # UAE market rate estimation & man-days calculator
├── generator/
│   ├── submittal_drafter.py          # AI Method Statements (MOS) & Material Approvals (MAR)
│   └── rfq_pitch_templates.py        # Contractor tender bids, InMails & cold emails
└── hermes/
    └── skills/
        └── uae-procurement-hunter/
            └── SKILL.md              # Hermes Agent autonomous cron skill
```

---

## 🚀 Key Commands

### 1. Scout Active Tenders & Subcontractors
```bash
python3 procurement_scraper/cli.py scout
```

### 2. List Qualified Requirements
```bash
# Filter by trade category or emirate
python3 procurement_scraper/cli.py list --category electrical_power --emirate Dubai
```

### 3. Estimate BOQ & Labor Man-Days
```bash
python3 procurement_scraper/cli.py estimate --service-id elec-01 --quantity 500
```

### 4. Generate Formal Authority Submittal
```bash
# Method Statement (MOS)
python3 procurement_scraper/cli.py submittal --rfq-id rfq-elec-001 --type mos -o MOS_Electrical.md

# Material Approval Request (MAR)
python3 procurement_scraper/cli.py submittal --rfq-id rfq-hvac-001 --type mar -o MAR_HVAC.md
```

### 5. Export Master Procurement Dossier
```bash
python3 procurement_scraper/cli.py export --output UAE_Procurement_MEP_Directory_Master.md
```
