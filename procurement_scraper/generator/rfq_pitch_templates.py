"""
RFQ Bid Proposals & Procurement Pitch Templates
Generates tailored contractor bid submittals, InMail outreach to procurement directors, and technical clarification letters.
"""

from typing import Dict, Any

class RFQPitchTemplates:
    """
    Produces executive tender submittals and tailored outreach for UAE procurement officers.
    """
    @staticmethod
    def generate_tender_proposal(rfq: Dict[str, Any]) -> str:
        title = rfq.get('title', 'Tender Package')
        client = rfq.get('client_name', 'Procurement Committee')
        ref = rfq.get('reference_no', 'REF-2026')
        service = rfq.get('service_name', 'Specialized MEP Package')
        emirate = rfq.get('emirate', 'Dubai')
        dm = rfq.get('decision_maker', {})
        dm_name = dm.get('name') or "Procurement & Commercial Director"
        dm_role = dm.get('role') or "Head of Procurement"

        proposal = f"""# TECHNICAL & COMMERCIAL TENDER SUBMISSION
**To:** {dm_name}, {dm_role}
**Organization:** {client} ({emirate}, UAE)
**Tender Reference:** {ref}
**Package:** {title}
**Trade Discipline:** {service}

---

### Executive Summary & Capability Statement
We are pleased to submit our formal Expression of Interest (EOI) and Technical Proposal for the **{title}** package under reference **{ref}**.

Our engineering and contracting execution model provides:
1. **Full Statutory Compliance:** Pre-qualified and licensed with {', '.join(rfq.get('authorities', ['DEWA', 'Dubai Municipality', 'Dubai Civil Defense']))}. All cable sizing, load schedules, pipe pressure testing, and fire-stopping meet strict authority inspection sign-offs on the first pass.
2. **Turnkey Trade Execution:** End-to-end management spanning CAD/BIM shop drawings, Material Approval Requests (MAR), Method Statements (MOS), site execution with certified technicians, calibrated testing, and handover documentation.
3. **Rapid Mobilization & Risk Mitigation:** Dedicated site supervisors, insured manpower supply under valid UAE visas, calibrated testing gear, and guaranteed SLA response times.

### Summary Scope of Work
{rfq.get('scope_summary', 'As detailed in tender specifications.')}

### Proposed Deliverables & Authority Milestones
- **Milestone 1:** Baseline BIM/AutoCAD Shop Drawings & Material Approval Request (MAR) submittal (Day 7).
- **Milestone 2:** Material mobilization, containment, wiring/piping rough-in, and core fire-stopping.
- **Milestone 3:** Equipment positioning, final terminations, pressure/Megger testing, and Work Inspection Requests (WIR).
- **Milestone 4:** Authority witnessed testing, municipality/DEWA inspection sign-off, and As-Built handover dossier.

We would be pleased to attend a technical clarification meeting at your offices or provide a detailed rate-breakdown BOQ upon request.

**Commercial Submittal Prepared By:**
AqionProcure MEP Contracting & Engineering Group
Contact: +971 58 849 9663 | procurement@aqionlabs.ai
"""
        return proposal

    @staticmethod
    def generate_linkedin_inmail(rfq: Dict[str, Any]) -> str:
        dm = rfq.get('decision_maker', {})
        dm_name = dm.get('name', 'Sir/Madam')
        first_name = dm_name.split()[0] if dm_name else "there"
        title = rfq.get('title', 'MEP Package')
        client = rfq.get('client_name', 'your organization')

        return f"Hi {first_name}, noticed {client}'s procurement requirements for {title}. Our MEP & specialized engineering team in Dubai is pre-qualified with DEWA/Civil Defense, providing turnkey shop drawings, certified technicians, and rapid on-ground mobilization. Would love to submit our technical qualification dossier for your tender evaluation."

    @staticmethod
    def generate_cold_email(rfq: Dict[str, Any]) -> str:
        dm = rfq.get('decision_maker', {})
        dm_name = dm.get('name', 'Procurement Director')
        title = rfq.get('title', 'Specialized Trade Package')
        ref = rfq.get('reference_no', 'REF-2026')
        client = rfq.get('client_name', 'your organization')
        service = rfq.get('service_name', 'MEP Works')

        return f"""Subject: Technical Prequalification & Proposal: {ref} - {title}

Dear {dm_name},

I am writing regarding {client}'s active procurement tender for {title} (Ref: {ref}).

Our contracting group specializes in turnkey {service} across the UAE, fully compliant with DEWA, ADDC, SEWA, and Dubai Civil Defense codes. 

Key reasons main contractors and developers choose our team:
1. First-Time Authority Approvals: We prepare comprehensive BIM shop drawings, Method Statements (MOS), and Material Approval Requests (MAR) that eliminate consultant rejection cycles.
2. In-House Visa Compliant Manpower: 100% certified electricians, pipefitters, HVAC technicians, and duct men equipped with calibrated testing tools and safety gear.
3. Guaranteed Turnaround: Rapid site mobilization within 48 hours of submittal approval.

Could I share our technical compliance matrix and pre-qualification dossier for your evaluation?

Warm regards,

Procurement & Commercial Bidding Team
AqionProcure / AqionLabs
Phone: +971 58 849 9663
Email: procurement@aqionlabs.ai | Dubai, UAE"""
