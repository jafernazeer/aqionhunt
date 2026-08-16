#!/usr/bin/env python3
"""
UAE AI Executive Job Outreach & Agentic Build Requests CLI (v2.0)
Autonomous engine for scouting LinkedIn, Naukrigulf, Indeed UAE, GulfTalent, and UAE Client Projects.
Scouts roles starting from AED 10k/month up to AED 70k+/month across:
- Forward Deployed Engineer (FDE) & AI Lead roles
- Voice AI Agent builds
- Company Brain / Enterprise RAG builds
- Company Chatbots (WhatsApp & Omnichannel)
- Personal AI Assistants ('Jarvis' Multi-Agent Automation)
- Claude Enterprise Training & LLMOps Consulting
"""

import sys
import os
import json
import argparse
from typing import List, Dict, Any

# Ensure parent directory is in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from scrapers.linkedin_agent import LinkedInJobAgent
from scrapers.gulftalent_agent import GulfTalentJobAgent
from scrapers.naukrigulf_agent import NaukrigulfJobAgent
from scrapers.indeed_agent import IndeedJobAgent
from scrapers.agentic_build_requests import AgenticBuildRequestsAgent
from scrapers.decision_maker_finder import DecisionMakerFinder
from pipeline.role_filter import RoleFilter
from pipeline.relevance_scorer import RelevanceScorer
from generator.application_drafter import ApplicationDrafter
from storage.database import JobOutreachStore

def load_candidate_profile() -> Dict[str, Any]:
    prof_path = os.path.join(os.path.dirname(__file__), "candidate_profile.json")
    with open(prof_path, "r", encoding="utf-8") as f:
        return json.load(f)

def run_scouting_pipeline(verbose: bool = True) -> List[Dict[str, Any]]:
    """Runs the complete autonomous scout, filter, decision-maker discovery & drafting pipeline."""
    candidate = load_candidate_profile()
    li_agent = LinkedInJobAgent()
    gt_agent = GulfTalentJobAgent()
    ng_agent = NaukrigulfJobAgent()
    ind_agent = IndeedJobAgent()
    build_agent = AgenticBuildRequestsAgent()
    dm_finder = DecisionMakerFinder()
    role_filter = RoleFilter(min_salary_aed=10000)
    scorer = RelevanceScorer(candidate)
    drafter = ApplicationDrafter(candidate)
    store = JobOutreachStore(os.path.join(os.path.dirname(__file__), "storage", "outreach.db"))

    if verbose:
        print("\n" + "="*80)
        print("🤖 UAE AI EXECUTIVE OUTREACH & AGENTIC BUILD REQUESTS ENGINE (v2.0)")
        print("="*80)
        print(f"Target: AI Lead / FDE / Voice AI / Company Brain / Jarvis / Claude Training")
        print(f"Salary / Package Range: AED 10,000 – 70,000+ / month (Tax-Free & Retainers)")
        print(f"Candidate: {candidate['personal_info']['name']} ({candidate['personal_info']['title']})")
        print("Scouring: LinkedIn, Naukrigulf, Indeed UAE, GulfTalent, Bayt & UAE Client Projects...")

    # 1. Fetch raw opportunities from all 5 channels
    raw_jobs = []
    raw_jobs.extend(build_agent.fetch_live_curated_roles())
    raw_jobs.extend(li_agent.fetch_live_curated_roles())
    raw_jobs.extend(ng_agent.fetch_live_curated_roles())
    raw_jobs.extend(ind_agent.fetch_live_curated_roles())
    raw_jobs.extend(gt_agent.fetch_live_curated_roles())

    if verbose:
        print(f"Found {len(raw_jobs)} active positions & project requests across channels. Applying filters...\n")

    qualified_packages = []
    seen_ids = set()

    for job in raw_jobs:
        if job["id"] in seen_ids:
            continue
        seen_ids.add(job["id"])

        passes, reason, tier_score = role_filter.evaluate(job)
        if not passes:
            if verbose:
                print(f"[-] Skipped: {job['title']} @ {job['company']} ({reason})")
            continue

        # Discover or verify hiring manager
        if not job.get("hiring_manager"):
            job["hiring_manager"] = dm_finder.find_for_company(job["company"])

        # Score alignment
        score_info = scorer.score_match(job)

        # Draft personalized package
        package = drafter.draft_package(job, job["hiring_manager"], score_info)
        
        # Save to database
        store.save_job_and_draft(job, package)
        qualified_packages.append(package)

        if verbose:
            print(f"[+] QUALIFIED [{score_info['overall_match_percentage']}% MATCH] [{job.get('source', 'Web')}]: {job['title']} @ {job['company']}")
            print(f"    Package / Comp: {job['salary_range_aed']}")
            print(f"    Decision Maker: {job['hiring_manager']['name']} ({job['hiring_manager']['title']})")
            print(f"    LinkedIn: {job['hiring_manager']['linkedin']}")
            print(f"    Hook: {job['hiring_manager'].get('personalization_hook', 'General Voice AI synergy')}")
            print("-" * 80)

    if verbose:
        print(f"\n Pipeline Complete: {len(qualified_packages)} high-yield executive & project packages generated and stored.")
    return qualified_packages

def export_report_markdown(output_file: str = "UAE_AI_Job_Outreach_Report.md"):
    store = JobOutreachStore(os.path.join(os.path.dirname(__file__), "storage", "outreach.db"))
    opportunities = store.get_all_opportunities()

    report_lines = [
        "# UAE High-Yield AI Opportunities & Agentic Build Dossier (v2.0)",
        "**Package Range:** AED 10,000 – 70,000+ / month (Tax Free & Retainers)",
        f"**Candidate:** Mohammed Jafer (Head of AI @ AqionLabs | Ex-American Hospital Dubai | Ex-Servion)",
        f"**Monitored Channels:** LinkedIn, Naukrigulf, Indeed UAE, GulfTalent, Bayt, Direct UAE Client Projects",
        f"**Total Qualified Opportunities:** {len(opportunities)}\n",
        "---",
        "## Executive Summary & Opportunity Matrix\n",
        "| Source | Company / Client | Role / Build Type | Package / Comp | Match % | Target Decision Maker | Status |",
        "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |"
    ]

    for opp in opportunities:
        report_lines.append(
            f"| `{opp.get('source', 'Web')}` | **{opp['company']}** | {opp['title']} | {opp['salary_range_aed']} | **{opp['match_score']}%** | {opp['hiring_manager_name']} ({opp['hiring_manager_title']}) | `{opp['sent_status']}` |"
        )

    report_lines.append("\n---\n## Detailed Opportunities & Tailored Outreach Drafts\n")

    for i, opp in enumerate(opportunities, 1):
        report_lines.extend([
            f"### Opportunity {i}: {opp['title']} @ {opp['company']} (`{opp.get('source', 'Web')}`)",
            f"- **Location:** {opp['location']}",
            f"- **Package / Salary:** {opp['salary_range_aed']}",
            f"- **Candidate Match Score:** {opp['match_score']}%",
            f"- **Target Decision Maker:** [{opp['hiring_manager_name']}]({opp['hiring_manager_linkedin']}) — *{opp['hiring_manager_title']}*",
            "",
            "#### 1. LinkedIn Connection Note (<300 chars):",
            "```text",
            opp['connection_note'],
            "```",
            "",
            "#### 2. Executive InMail / Direct Message to Decision Maker:",
            "```text",
            opp['inmail_pitch'],
            "```",
            "",
            "#### 3. Tailored Proposal / Executive Cover Letter:",
            "<details>",
            "<summary>Click to view Tailored Proposal / Cover Letter</summary>\n",
            opp['cover_letter'],
            "</details>",
            "\n---\n"
        ])

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(report_lines))

    print(f"\n Dossier successfully exported to: {output_file}")

def main():
    parser = argparse.ArgumentParser(description="UAE AI Job Outreach & Agentic Build Requests Engine")
    parser.add_argument("command", choices=["scout", "export", "list"], help="Command to execute")
    parser.add_argument("--output", default="UAE_AI_Job_Outreach_Report.md", help="Export report path")
    args = parser.parse_args()

    if args.command == "scout":
        run_scouting_pipeline(verbose=True)
    elif args.command == "export":
        export_report_markdown(args.output)
    elif args.command == "list":
        store = JobOutreachStore(os.path.join(os.path.dirname(__file__), "storage", "outreach.db"))
        opps = store.get_all_opportunities()
        print(f"\nStored Opportunities in Database ({len(opps)} total):")
        for op in opps:
            print(f"- [{op['match_score']}%] [{op.get('source', 'Web')}] {op['title']} @ {op['company']} | Comp: {op['salary_range_aed']}")

if __name__ == "__main__":
    main()
