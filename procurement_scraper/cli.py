#!/usr/bin/env python3
"""
Master CLI for UAE MEP & Fit-Out Procurement Intelligence (AqionProcure)
Supports zero-cap autonomous tender scouting, live notification streaming, AI submittal generation, and BOQ estimation.
"""

import sys
import os
import argparse
import json
import time
from pathlib import Path
from datetime import datetime, timezone

# Adjust Python path to allow running from any working directory
sys.path.insert(0, str(Path(__file__).parent.parent))

from procurement_scraper.storage.procurement_db import (
    init_db, insert_rfq, insert_contractor, query_rfqs, query_contractors, log_scrape_run
)
from procurement_scraper.scrapers.esupply_uae_agent import ESupplyUAEAgent
from procurement_scraper.scrapers.yello_contractor_agent import YelloContractorAgent
from procurement_scraper.pipeline.scope_classifier import ScopeClassifier
from procurement_scraper.pipeline.boq_estimator import BOQEstimator
from procurement_scraper.generator.submittal_drafter import SubmittalDrafter
from procurement_scraper.generator.rfq_pitch_templates import RFQPitchTemplates

def cmd_scout(args):
    """
    Executes tender scouting across UAE portals without any AED cap and stores results.
    """
    print("================================================================================")
    print("🚀 [AqionProcure] Initializing Zero-Cap UAE Procurement & Tender Scout Engine...")
    print("================================================================================")
    
    init_db()
    
    # 1. Scout Tenders
    esupply_agent = ESupplyUAEAgent()
    tenders = esupply_agent.get_verified_uae_tenders()
    print(f"[*] Fetched {len(tenders)} active UAE requirements (Zero-Cap mode: AED 1.2k to AED 1.95M).")
    
    for t in tenders:
        insert_rfq(t)
    log_scrape_run("eSupply Dubai & Sovereign Tenders", "Scrapling + Cheerio", "All 25 Trades (Zero Cap)", len(tenders), "SUCCESS")

    # 2. Scout Contractors
    yello_agent = YelloContractorAgent()
    contractors = yello_agent.get_verified_contractors()
    print(f"[*] Fetched {len(contractors)} verified UAE MEP subcontractors & suppliers from Yello.ae / YellowPages.")
    
    for c in contractors:
        insert_contractor(c)
    log_scrape_run("Yello.ae UAE Directory", "FetcherSession", "MEP Contractors", len(contractors), "SUCCESS")

    print("\n✅ [SUCCESS] Database synchronized with complete UAE procurement intelligence.")
    print(f"   • Total Active Requirements: {len(tenders)}")
    print(f"   • Total Verified Subcontractors: {len(contractors)}")
    print("   • Covered Service Categories: 8 (All 25 Specialized Trades - Zero Budget Cap)")
    print("================================================================================\n")

def cmd_list(args):
    """
    Lists active tenders with zero-cap default.
    """
    rfqs = query_rfqs(
        category_id=args.category,
        service_id=args.service,
        emirate=args.emirate,
        search_term=args.query,
        min_budget=args.min_budget or 0
    )
    
    print(f"\n📋 [AqionProcure] Active UAE Tenders & Procurement Requirements ({len(rfqs)} Found - Zero Cap):")
    print("-" * 110)
    print(f"{'Ref No':<28} | {'Category / Service':<32} | {'Budget (AED)':<22} | {'Emirate':<10} | {'Status'}")
    print("-" * 110)
    
    for r in rfqs:
        budget_str = f"AED {r['budget_min_aed']:,.0f} - {r['budget_max_aed']:,.0f}"
        cat_serv = f"{r['category_id'][:12]} / {r['service_id']}"
        print(f"{r.get('reference_no', r['id']):<28} | {cat_serv:<32} | {budget_str:<22} | {r.get('emirate', 'Dubai'):<10} | {r.get('status', 'Active')}")
        print(f"  └─ Title: {r['title']}")
        print(f"     Client: {r['client_name']} | Decision Maker: {r.get('decision_maker', {}).get('name', 'N/A')} ({r.get('decision_maker', {}).get('role', 'N/A')})")
        print()
    print("-" * 110 + "\n")

def cmd_notify(args):
    """
    Simulates real-time notification stream alerting on every requirement match irrespective of AED cap.
    """
    print("================================================================================")
    print("🔔 [AqionProcure] Zero-Cap Live UAE Procurement Notification Stream")
    print("   Filter: Capturing ALL matches irrespective of AED cap (AED 1,000 to AED 5,000,000+)")
    print("================================================================================")
    
    rfqs = query_rfqs(category_id=args.category, emirate=args.emirate, search_term=args.query)
    
    for idx, r in enumerate(rfqs, 1):
        budget_str = f"AED {r['budget_min_aed']:,.0f} - {r['budget_max_aed']:,.0f}"
        print(f"\n[ALERT #{idx:02d} - {r.get('lead_age', 'Just now')}] ⚡ {r['service_name']} ({r['emirate']})")
        print(f"  • Ref:     {r.get('reference_no', r['id'])}")
        print(f"  • Title:   {r['title']}")
        print(f"  • Client:  {r['client_name']}")
        print(f"  • Value:   {budget_str}")
        print(f"  • Contact: {r.get('decision_maker', {}).get('name', 'Procurement Officer')} | Email: {r.get('decision_maker', {}).get('email', 'N/A')}")
        print(f"  • Scope:   {r.get('scope_summary')[:100]}...")
        if args.stream:
            time.sleep(0.5)

    print(f"\n✅ Total {len(rfqs)} alerts dispatched. Zero-Cap notification engine active.")
    print("================================================================================\n")

def cmd_submittal(args):
    """
    Generates AI Technical Method Statement and Material Approval Request.
    """
    rfqs = query_rfqs(search_term=args.rfq_id)
    if not rfqs:
        classification = ScopeClassifier.classify_text(args.rfq_id or "Electrical Installation and cable sizing")
        rfq = {
            "id": "CUSTOM-01",
            "title": f"Custom Scope: {classification['service_name']}",
            "client_name": "Consultant / Client",
            "service_name": classification['service_name'],
            "authorities": classification['authorities'],
            "technical_specs": ["Strict adherence to approved shop drawings, local UAE authority codes, and BS/IEC standards."]
        }
    else:
        rfq = rfqs[0]

    if args.type == 'mar':
        doc = SubmittalDrafter.generate_material_approval_request(rfq)
    elif args.type == 'bid':
        doc = RFQPitchTemplates.generate_tender_proposal(rfq)
    else:
        doc = SubmittalDrafter.generate_method_statement(rfq)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(doc)
        print(f"✅ Submittal written to: {args.output}")
    else:
        print(doc)

def cmd_estimate(args):
    """
    Estimates BOQ quantities, costs, and labor man-days for any of the 25 services.
    """
    est = BOQEstimator.estimate_scope(args.service_id, args.quantity)
    print("\n💰 [AqionProcure] UAE Market Rate & BOQ Estimation:")
    print("=" * 60)
    print(f"Service Code:          {est['service_id']}")
    print(f"Specification:         {est['scope_specification']}")
    print(f"Quantity Input:        {est['quantity']} {est['unit']}")
    print(f"Standard Unit Rate:    AED {est['unit_rate_aed']:,.2f} per {est['unit']}")
    print(f"Calculated Total:      AED {est['estimated_total_aed']:,.2f}")
    print(f"Estimated Bid Range:   {est['estimated_range_aed']}")
    print(f"Required Labor:        ~{est['estimated_man_days']} Man-Days")
    print("=" * 60 + "\n")

def cmd_export(args):
    """
    Exports the comprehensive master procurement dossier to Markdown or JSON.
    """
    output_path = args.output or "UAE_Procurement_MEP_Directory_Master.md"
    
    rfqs = query_rfqs()
    contractors = query_contractors()
    
    catalog_path = Path(__file__).parent / "services_catalog.json"
    with open(catalog_path, 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    total_pipeline_val = sum(r['budget_max_aed'] for r in rfqs)
    utc_now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')

    doc = f"""# UAE MEP, Fit-Out & Facility Contracting Procurement Master Directory
**Portal:** AqionProcure - UAE Web Scraping & Zero-Cap Procurement Intelligence
**Generated At:** {utc_now_str}
**Total Identified Tenders Pipeline:** AED {total_pipeline_val:,.0f}
**Total Active Requirements:** {len(rfqs)} (All 25 Trades Covered · Zero AED Cap)
**Total Verified Subcontractors & Suppliers:** {len(contractors)}

---

## 🏛️ Executive Directory Index
This master procurement dossier consolidates real requirements, technical specifications, UAE authority compliance standards (DEWA, ADDC, SEWA, DCD, DM, HACCP, SIRA), and vetted subcontractors across **8 Core Categories** and **25 Specialized Trades**—spanning small emergency repairs (AED 1.2k) to multi-million commercial contracts.

---

## 📊 Summary of 8 Core Categories & 25 Specialized Trades

"""
    for cat in catalog.get('categories', []):
        doc += f"### {cat['name']}\n"
        doc += f"*{cat['description']}*\n\n"
        for serv in cat.get('services', []):
            doc += f"- **{serv['name']}** (`{serv['id']}`)\n"
            doc += f"  - *Scope:* {serv['description']}\n"
            doc += f"  - *Authorities:* {', '.join(serv['authorities'])}\n"
            doc += f"  - *Typical BOQ Units:* {', '.join(serv['typical_boq_units'])}\n"
        doc += "\n"

    doc += """---

## 📑 Active UAE Tenders & Procurement Requirements (Zero Cap Feed)

"""
    for r in rfqs:
        doc += f"### [{r.get('reference_no', r['id'])}] {r['title']}\n"
        doc += f"- **Client / Sponsoring Entity:** {r['client_name']} ({r.get('location', r['emirate'])})\n"
        doc += f"- **Trade Category:** {r['category_id']} | **Service:** {r['service_name']}\n"
        doc += f"- **Budget / Value Range:** AED {r['budget_min_aed']:,.0f} - AED {r['budget_max_aed']:,.0f}\n"
        doc += f"- **Governing Authorities:** {', '.join(r.get('authorities', []))}\n"
        doc += f"- **Lead Age & Status:** {r.get('lead_age', 'Recently Posted')} | {r.get('status', 'Active')}\n"
        doc += f"- **Source Portal:** [{r.get('source_portal', 'eSupply Dubai')}]({r.get('source_url', '#')})\n"
        
        dm = r.get('decision_maker', {})
        if dm.get('name'):
            doc += f"- **Verified Decision Maker:** {dm.get('name')} — *{dm.get('role')}*\n"
            doc += f"  - Email: `{dm.get('email')}` | Phone: `{dm.get('phone')}`\n"
            if dm.get('linkedin'):
                doc += f"  - [LinkedIn Profile Query]({dm.get('linkedin')})\n"

        doc += f"\n**Scope Summary:**\n{r.get('scope_summary')}\n\n"
        doc += "**Technical Specifications:**\n"
        for spec in r.get('technical_specs', []):
            doc += f"- {spec}\n"
        doc += "\n---\n\n"

    doc += """## 🏢 Verified UAE Subcontractors & Material Suppliers Directory

"""
    for c in contractors:
        doc += f"### {c['company_name']}\n"
        doc += f"- **License & Classification:** {c.get('trade_license_no')} | *{c.get('classification')}*\n"
        doc += f"- **Emirate / Address:** {c.get('address')}\n"
        doc += f"- **Direct Contact:** Phone: `{c.get('phone')}` | Email: `{c.get('email')}` | [Website]({c.get('website')})\n"
        doc += f"- **Approved Authority Pre-Qualifications:** {', '.join(c.get('authorities_approved', []))}\n"
        doc += f"- **Specialized Services:** {', '.join(c.get('services', []))}\n\n"

    doc += """---
*Generated by AqionProcure Autonomous Intelligence Engine.*
"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(doc)
    print(f"\n✅ [SUCCESS] Zero-Cap Master Procurement Dossier exported to: {output_path}")

def main():
    parser = argparse.ArgumentParser(description="AqionProcure - UAE MEP & Fit-Out Procurement CLI (Zero Cap Engine)")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # scout
    p_scout = subparsers.add_parser("scout", help="Scout active tenders across UAE portals without budget cap")
    p_scout.set_defaults(func=cmd_scout)

    # list
    p_list = subparsers.add_parser("list", help="List active RFQs and tenders")
    p_list.add_argument("--category", help="Filter by category ID (e.g. electrical_power)")
    p_list.add_argument("--service", help="Filter by service ID (e.g. elec-01)")
    p_list.add_argument("--emirate", help="Filter by Emirate (Dubai, Abu Dhabi, Sharjah)")
    p_list.add_argument("--query", "-q", help="Search keywords")
    p_list.add_argument("--min-budget", type=float, default=0, help="Minimum budget in AED (default 0 - zero cap)")
    p_list.set_defaults(func=cmd_list)

    # notify
    p_not = subparsers.add_parser("notify", help="Stream real-time match notifications irrespective of AED cap")
    p_not.add_argument("--category", help="Filter category (optional)")
    p_not.add_argument("--emirate", help="Filter emirate (optional)")
    p_not.add_argument("--query", "-q", help="Search keyword (optional)")
    p_not.add_argument("--stream", action="store_true", help="Stream alerts continuously")
    p_not.set_defaults(func=cmd_notify)

    # submittal
    p_sub = subparsers.add_parser("submittal", help="Generate AI Method Statement or Material Approval Request")
    p_sub.add_argument("--rfq-id", required=True, help="RFQ ID or search term")
    p_sub.add_argument("--type", choices=["mos", "mar", "bid"], default="mos", help="Submittal type: mos, mar, bid")
    p_sub.add_argument("--output", "-o", help="Output file path (optional)")
    p_sub.set_defaults(func=cmd_submittal)

    # estimate
    p_est = subparsers.add_parser("estimate", help="Estimate BOQ costs and man-days for any trade")
    p_est.add_argument("--service-id", required=True, help="Service ID (e.g. elec-01, hvac-01, finish-02)")
    p_est.add_argument("--quantity", type=float, default=10.0, help="Scope quantity")
    p_est.set_defaults(func=cmd_estimate)

    # export
    p_exp = subparsers.add_parser("export", help="Export comprehensive master procurement markdown dossier")
    p_exp.add_argument("--output", "-o", default="UAE_Procurement_MEP_Directory_Master.md", help="Target markdown file")
    p_exp.set_defaults(func=cmd_export)

    args = parser.parse_args()
    if not hasattr(args, "func"):
        parser.print_help()
        sys.exit(1)
        
    args.func(args)

if __name__ == "__main__":
    main()
