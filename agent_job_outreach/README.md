# UAE AI Executive Job Outreach Agent System

An autonomous, multi-channel recruitment outreach system designed to scout **AI Lead, Forward Deployed Engineer (FDE), and AI Solutions Architect** roles across LinkedIn, GulfTalent, and Bayt in the UAE (**AED 35k–60k/month** salary bracket), discover technical hiring managers (CTOs, VPs of Engineering, Heads of AI), and generate hyper-personalized outreach campaigns based on production Voice AI deployments and enterprise telecom pedigree.

---

## 🏗️ Architecture & Component Overview

```
agent_job_outreach/
├── candidate_profile.json          # Structured candidate profile & Voice AI proof points
├── config.yaml                     # Search filters, salary thresholds (AED 35k-60k), target company tiers
├── cli.py                          # Master execution CLI
├── scrapers/
│   ├── linkedin_agent.py           # LinkedIn job intelligence & requirements extractor
│   ├── gulftalent_agent.py         # GulfTalent & Bayt UAE AI roles scraper
│   └── decision_maker_finder.py    # Discovery of CTOs, VPs of Engineering, Heads of AI
├── pipeline/
│   ├── role_filter.py              # Filtering rules (disqualifies low-yield junior/mass roles)
│   └── relevance_scorer.py         # Multi-factor alignment scorer (Voice AI, Telecom, FDE)
├── generator/
│   ├── pitch_templates.py          # High-converting personalized outreach templates
│   └── application_drafter.py      # Connection notes, executive InMails, and custom proposals
├── storage/
│   └── database.py                 # SQLite storage for jobs, leads, and outreach logs
└── hermes/
    ├── config.yaml                 # Hermes Agent profile configuration
    └── skills/
        └── uae-ai-job-hunter/
            └── SKILL.md            # Hermes Skill definition
```

---

## 🚀 Quickstart Guide

### 1. Run the Autonomous Pipeline via CLI
Execute the full scout, filter, decision-maker discovery, and drafting pipeline:
```bash
python3 agent_job_outreach/cli.py scout
```

### 2. Export High-Impact Outreach Dossier
Generate a comprehensive markdown dossier with all tailored pitches ready to send:
```bash
python3 agent_job_outreach/cli.py export --output UAE_AI_Job_Outreach_Report.md
```

### 3. List Current Qualified Opportunities
```bash
python3 agent_job_outreach/cli.py list
```

---

## 🤖 Running via Hermes Agent

### Option A: Interactive Command
Load the skill directly into Hermes:
```bash
hermes chat -q "Run uae-ai-job-hunter pipeline and show top 5 high-priority FDE roles in Dubai with tailored pitches."
```

### Option B: Automated Daily Cron Job
Configure Hermes to run a background scan every morning at 9:00 AM UAE Time:
```bash
hermes cron create "0 9 * * *" --prompt "Run uae-ai-job-hunter, scout new LinkedIn/GulfTalent AI Lead and FDE postings in UAE, identify hiring managers, draft custom outreach, and notify me with high-scoring matches."
```

### Option C: Telegram / Slack Gateway Alerts
Connect your Hermes Gateway so high-scoring matches trigger immediate mobile notifications:
```bash
hermes gateway setup
```

---

## 🎯 Best-Practice Outreach Strategy (AED 35k–60k Band)

For senior roles in the UAE, mass generic applications result in low conversion. This agent enforces:
1. **Targeting Decision Makers Directly:** Bypasses generic job board queues by reaching out directly to the CTO, VP of Engineering, or Practice Leader.
2. **Leading with Concrete Production Proof:** Emphasizes live production Voice AI agents (<600ms latency), real-time interruption handling, and multilingual support (Arabic/English/Hindi) built at AqionLabs.
3. **Highlighting Enterprise Telephony Bridge:** Demonstrates how 9+ years in Avaya, Cisco UC, SIP, WebRTC, and Kubernetes makes you the ideal Forward Deployed Engineer capable of embedding AI into legacy enterprise IT without disruption.
4. **Leveraging On-Ground UAE Presence:** Immediate availability, Dubai residency, and local market familiarity.
