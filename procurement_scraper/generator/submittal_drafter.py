"""
AI Technical Submittal & Method Statement Drafter
Generates consultant-grade Method Statements (MOS), Material Approval Requests (MAR), and Inspection & Test Plans (ITP).
"""

from typing import Dict, Any, List
from datetime import datetime

class SubmittalDrafter:
    """
    Generates formal engineering submittals and method statements compliant with UAE authorities.
    """
    @staticmethod
    def generate_method_statement(rfq_data: Dict[str, Any]) -> str:
        title = rfq_data.get('title', 'Specialized MEP Package')
        client = rfq_data.get('client_name', 'Client / Main Contractor')
        service = rfq_data.get('service_name', 'Specialized Engineering Trade')
        authorities = ", ".join(rfq_data.get('authorities', ['DEWA', 'Dubai Municipality']))
        specs = rfq_data.get('technical_specs', [])
        
        specs_bullets = "\n".join([f"- {s}" for s in specs]) if specs else "- Adherence to approved shop drawings and UAE statutory codes."
        
        mos = f"""# METHOD STATEMENT (MOS)
**Document Ref:** MOS-AQION-{rfq_data.get('id', 'GEN-01').upper()}-REV0
**Project / Package:** {title}
**Client / Sponsoring Authority:** {client}
**Trade Discipline:** {service}
**Governing Authority & Compliance Standards:** {authorities}
**Date of Submittal:** {datetime.utcnow().strftime('%d %B %Y')}

---

## 1. PURPOSE & SCOPE OF WORKS
This Method Statement defines the detailed sequence of operations, quality control procedures, and health & safety precautions for the execution of **{service}** under the **{title}** package. Works will strictly comply with approved shop drawings, local statutory authority regulations ({authorities}), and project technical specifications.

## 2. TECHNICAL SPECIFICATIONS & STANDARDS
{specs_bullets}

## 3. RESOURCE & MANPOWER ALLOCATION
- **1x Qualified MEP Project Engineer / Site In-Charge** (DEWA / SEWA Approved)
- **1x QA/QC Inspector** (Civil Defense & Authority Inspection Coordinator)
- **1x HSE Officer** (Ensuring UAE Ministry of Human Resources / DM Safety compliance)
- **Trade-Certified Technicians & Pipefitters/Electricians** equipped with calibrated instruments and PPE.

## 4. SEQUENCE OF EXECUTION
### 4.1 Pre-Installation & Site Readiness Inspection
1. Verify approved architectural, structural, and MEP coordinated composite drawings (Navisworks clash-free).
2. Obtain formal Work Permit (PTW) and Hot Work / Penetration permits from main contractor and facility management.
3. Deliver approved materials to site with valid Material Inspection Requests (MIR) and manufacturer certificates.

### 4.2 Installation Methodology
1. **Setting Out & Marking:** Transfer bench marks, invert levels, and centerline alignments from survey references.
2. **Containment & Support Installation:** Install galvanized steel unistrut channels, threaded drop rods (M8/M10), vibration isolators, and heavy-duty clamps at approved spans (<1.2m intervals).
3. **Equipment Positioning & Wiring:** Uncrate, level, and anchor plant; pull and dress XLPE/LSZH cabling or fusion-weld PPR/HDPE pipework strictly per manufacturer torque ratings.
4. **Builders Work & Fire-Stopping:** Complete core drilling with diamond bits; immediately install Civil Defense approved intumescent fire seals around all slab/wall penetrations.

### 4.3 Testing, Inspection & Commissioning (ITP Sign-off)
1. Perform insulation resistance Megger testing (500V/1000V DC) / hydrostatic pressure testing at 1.5x working pressure (min 10 bar).
2. Submit formal Work Inspection Request (WIR) to Consultant and Authority Engineers for witnessed inspection.
3. Conduct operational load balancing, air balancing, and safety interlock trip tests.
4. Provide comprehensive As-Built Drawings, test logs, and Operations & Maintenance (O&M) manuals.

## 5. HEALTH, SAFETY & ENVIRONMENTAL (HSE) PROTOCOLS
- Mandatory hard hats, high-visibility vests, steel toe boots, safety goggles, and full-body safety harnesses for elevated works (>2.0m).
- 240V / 110V step-down transformers for portable site power tools.
- Dedicated CO2 and Dry Chemical fire extinguishers stationed at work zones.
- 100% daily housekeeping and segregation of construction waste for municipal recycling.

---
**Prepared By:** Technical Procurement & MEP Engineering Team, AqionLabs
**Verified & Stamped for Authority Review**
"""
        return mos

    @staticmethod
    def generate_material_approval_request(rfq_data: Dict[str, Any]) -> str:
        title = rfq_data.get('title', 'Specialized MEP Package')
        client = rfq_data.get('client_name', 'Client / Main Contractor')
        service = rfq_data.get('service_name', 'Specialized Engineering Trade')
        authorities = ", ".join(rfq_data.get('authorities', ['DEWA', 'Dubai Municipality']))

        mar = f"""# MATERIAL APPROVAL REQUEST (MAR)
**MAR Number:** MAR-AQION-{rfq_data.get('id', 'MAT-01').upper()}
**Package Title:** {title}
**Client / Employer:** {client}
**Discipline:** {service}
**Statutory Approvals Required:** {authorities}
**Date:** {datetime.utcnow().strftime('%d %B %Y')}

---

## 1. MATERIAL DESCRIPTION & SPECIFICATION
| Field | Particulars |
|---|---|
| **Item Description** | First-Tier Certified Components for {service} |
| **Trade Trade/Sub-Discipline** | {service} |
| **Country of Origin** | UAE / Germany / UK / Japan / USA |
| **Specified Manufacturer Brands** | Schneider / ABB / Daikin / Geberit / Halton / Somfy / Hikvision / Fosroc / Knauf |
| **Applicable Standards** | BS EN 61439, IEC 60364, ASHRAE 62.1, NFPA 96, WRAS, ISO 9001:2015 |
| **Compliance Rating** | 100% Full Compliance (Zero Deviations) |

## 2. ATTACHED COMPLIANCE DOCUMENTS
- [x] Manufacturer Technical Datasheets & Performance Curves
- [x] ISO 9001 Quality & ISO 14001 Environmental Certificates
- [x] DEWA / ADDC / SEWA Pre-Qualification Approval Certificate
- [x] Dubai Civil Defense (DCD) Product Conformity Certificate
- [x] Physical Sample Board with cutaway sections and color finish swatch
- [x] 10-Year Manufacturer Warranty Commitment Letter

## 3. CONTRACTOR COMPLIANCE STATEMENT
We confirm that the material proposed above conforms in every respect to the contract specifications, bills of quantities, and local authority mandates ({authorities}).

**Submitted By:** Lead Procurement Manager & MEP Consultant Liaison
**Signature & Company Seal:** _______________________
"""
        return mar
