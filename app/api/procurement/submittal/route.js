import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      type = 'mos', // 'mos' | 'mar' | 'itp' | 'bid' | 'inmail'
      rfqTitle = 'Specialized MEP Package',
      clientName = 'Dubai Enterprise / Developer',
      serviceName = 'Electrical Installation & Wiring',
      authorities = ['DEWA', 'Dubai Municipality', 'Dubai Civil Defense'],
      technicalSpecs = [],
      decisionMakerName = 'Procurement Director',
      decisionMakerRole = 'Head of Commercial Contracts'
    } = body;

    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const authList = Array.isArray(authorities) ? authorities.join(', ') : 'DEWA, Dubai Municipality';

    let content = '';

    if (type === 'mos') {
      content = `# METHOD STATEMENT (MOS)
**Document Ref:** MOS-AQION-${Date.now().toString().slice(-6)}-REV0
**Project / Package:** ${rfqTitle}
**Client / Sponsoring Authority:** ${clientName}
**Trade Discipline:** ${serviceName}
**Governing Statutory Authority:** ${authList}
**Date of Submittal:** ${dateStr}

---

## 1. PURPOSE & SCOPE OF WORKS
This Method Statement details the sequence of operations, installation methodology, quality control, and health & safety precautions for the execution of **${serviceName}** under the **${rfqTitle}** package in the United Arab Emirates. All activities will strictly comply with approved shop drawings, project specifications, and statutory regulations (${authList}).

## 2. STATUTORY SPECIFICATIONS & STANDARDS
${technicalSpecs.length > 0 ? technicalSpecs.map(s => `- ${s}`).join('\n') : '- Adherence to BS 7671 / IEC 60364, ASHRAE 62.1, and local authority guidelines.'}
- Mandatory coordination with BIM Level 2 architectural and structural models to guarantee zero MEP clashes.
- Full compliance with UAE Ministry of Human Resources (MOHRE) and municipal occupational health & safety codes.

## 3. RESOURCE & MANPOWER ALLOCATION
- **1x Qualified Lead MEP Project Engineer** (DEWA / SEWA / ADDC Registered)
- **1x Dedicated QA/QC Inspector** (Authority testing and WIR sign-offs)
- **1x Certified HSE Officer** (Daily tool-box talks, PPE enforcement, hot-work permits)
- **Trade-Certified Technicians & Helpers** (Equipped with calibrated torque tools, Megger meters, fusion welders).

## 4. DETAILED EXECUTION METHODOLOGY
### 4.1 Pre-Mobilization & Material Approvals
1. Ensure formal approval of shop drawings and Material Approval Requests (MAR).
2. Inspect delivered materials at site against approved submittals and obtain signed Material Inspection Requests (MIR).
3. Validate Permit to Work (PTW) and obtain all necessary hot-work or penetration permits from the main contractor.

### 4.2 Installation Procedures
1. **Survey Benchmarking:** Transfer reference benchmarks, invert elevations, and containment runs from survey data.
2. **Containment & Support:** Install galvanized unistrut channels, threaded drop rods, and anti-vibration hangers at spans < 1.2m.
3. **Core Drilling & Fire-Stopping:** Execute diamond core penetrations through concrete with minimum vibration. Immediately seal all pipe and cable annular spaces with Civil Defense approved intumescent fire pillows and elastomeric firestop sealants.
4. **Plant Positioning & Rough-in:** Uncrate, position on inertia bases/vibration springs, and secure plant. Terminate cables with calibrated torque wrenches and dual-wall heat-shrink lugs.

### 4.3 Testing, Commissioning & Inspection (ITP)
1. Perform insulation resistance Megger testing (1000V DC) / hydrostatic pressure testing at 1.5x working pressure (min 10 bar).
2. Raise Work Inspection Request (WIR) to Consultant and Authority Engineers for formal witnessed inspection.
3. Conduct operational load balancing, air balancing, and safety interlock trip tests.
4. Submit complete As-Built drawing dossiers, test certificates, and Operation & Maintenance (O&M) manuals.

## 5. HEALTH, SAFETY & ENVIRONMENTAL (HSE) PROTOCOLS
- Mandatory hard hats, safety boots, high-vis vests, eye protection, and full-body harnesses for works above 2.0m.
- 110V/240V step-down transformers with ground fault circuit interrupters on all power tools.
- Continuous waste segregation and recycling compliant with Dubai Municipality waste guidelines.

---
**Submitted By:** Technical Procurement & MEP Engineering Team, AqionProcure
**Reviewed & Sealed for Consultant / Authority Sign-Off**`;
    } else if (type === 'mar') {
      content = `# MATERIAL APPROVAL REQUEST (MAR)
**MAR Number:** MAR-AQION-${Date.now().toString().slice(-6)}
**Package Title:** ${rfqTitle}
**Client / Employer:** ${clientName}
**Discipline:** ${serviceName}
**Governing Authorities:** ${authList}
**Date:** ${dateStr}

---

## 1. MATERIAL DESCRIPTION & SPECIFICATION
| Parameter | Technical Details |
|---|---|
| **Trade Item** | Certified First-Tier Engineering Systems for ${serviceName} |
| **Manufacturer Brands** | Schneider / ABB / Daikin / Geberit / Halton / Somfy / Hikvision / Fosroc / Knauf |
| **Country of Origin** | UAE / Germany / UK / Japan / USA |
| **Applicable Standards** | IEC 60364, BS EN 61439, ASHRAE 62.1, NFPA 96, WRAS, ISO 9001:2015 |
| **Compliance Rating** | 100% Full Compliance (Zero Deviations from Project Specifications) |

## 2. ATTACHED VERIFICATION DOSSIER
- [x] Manufacturer Technical Catalogues & Performance Selection Curves
- [x] ISO 9001:2015 Quality & ISO 14001 Environmental Certificates
- [x] DEWA / ADDC / SEWA Pre-Qualification Approval Certificate
- [x] Dubai Civil Defense (DCD) Product Certificate of Conformity
- [x] Physical Sample Board with cutaway components and finish swatches
- [x] 10-Year Manufacturer Warranty Commitment Letter

## 3. CONTRACTOR COMPLIANCE STATEMENT
We certify that the proposed material has been reviewed and found to be in strict accordance with the contract drawings, BOQ, and local authority mandates (${authList}).

**Submitted By:** Lead Procurement Manager & Technical Consultant Liaison
**Signature & Official Seal:** _______________________`;
    } else if (type === 'bid') {
      content = `# FORMAL TENDER & BID SUBMISSION
**To:** ${decisionMakerName}, ${decisionMakerRole}
**Entity:** ${clientName}
**Package:** ${rfqTitle}
**Discipline:** ${serviceName}
**Date:** ${dateStr}

---

### Executive Expression of Interest (EOI)
We are pleased to submit our formal Technical Qualification and Commercial Bid for the **${rfqTitle}** package.

### Key Capabilities & Execution Guarantees:
1. **First-Pass Authority Sign-off:** Pre-qualified and licensed with ${authList}. All shop drawings, cable calculations, and pressure tests are certified by registered UAE engineers.
2. **Dedicated In-House Manpower:** 100% visa-compliant certified technicians and trade specialists equipped with calibrated tools.
3. **Turnkey Technical Documentation:** We provide end-to-end BIM coordination, Material Approval Requests (MAR), Method Statements (MOS), and as-built handover dossiers.

We welcome the opportunity to discuss our technical submittal in detail or present our sample boards at your offices.

**Prepared By:** Commercial Bidding Department, AqionProcure
**Contact:** +971 58 849 9663 | procurement@aqionlabs.ai`;
    } else {
      content = `Hi ${decisionMakerName.split(' ')[0] || 'there'}, noticed ${clientName}'s procurement requirements for ${rfqTitle}. Our specialized engineering and MEP team in Dubai is pre-qualified with ${authList}, providing turnkey shop drawings, certified technicians, and rapid on-ground mobilization. Would love to submit our technical qualification dossier for your tender evaluation.`;
    }

    return NextResponse.json({
      success: true,
      type: type,
      content: content,
      metadata: {
        rfqTitle,
        clientName,
        serviceName,
        authorities: authList,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate submittal document' },
      { status: 500 }
    );
  }
}
