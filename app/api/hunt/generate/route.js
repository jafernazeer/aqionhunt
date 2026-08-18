import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      type = 'cv', 
      lead = {}, 
      candidate = {
        name: "Mohammed Jafer Nazeer",
        title: "Senior AI Engineer & Full-Stack Solutions Architect",
        email: "mohammedjafer123@outlook.com",
        phone: "+971 58 849 9663",
        location: "Dubai, UAE (Valid UAE Residence Visa)",
        linkedin: "https://www.linkedin.com/in/mohammedjafer/",
        skills: ["AI Voice Agents", "Python", "Next.js", "LangChain", "FastAPI", "PostgreSQL", "Docker", "AWS", "Twilio SIP", "REST/GraphQL"],
        experience: [
          {
            role: "Head of AI & Lead Solutions Architect",
            company: "AqionLabs",
            location: "Dubai, UAE",
            duration: "2023 - Present",
            highlights: [
              "Architected low-latency sub-600ms Voice AI agents using Vapi, Deepgram, and Cartesia integrated with Twilio SIP telephony.",
              "Designed enterprise RAG and multi-agent systems using LangGraph, pgvector, and Claude 3.5 Sonnet for UAE enterprises.",
              "Built and scaled Next.js 15 full-stack client dashboards with high-performance real-time WebSocket communication."
            ]
          },
          {
            role: "Senior Telecom & IT Infrastructure Specialist",
            company: "American Hospital Dubai",
            location: "Dubai, UAE",
            duration: "2021 - 2023",
            highlights: [
              "Led enterprise unified communication and telephony infrastructure serving 2,500+ clinical and administrative users.",
              "Managed IP telephony, Cisco call managers, SIP trunk routing, and high-availability server clusters with 99.99% uptime.",
              "Collaborated with UAE regulatory frameworks and healthcare compliance standards."
            ]
          },
          {
            role: "Systems & Cloud Engineer",
            company: "Servion Global Solutions",
            location: "Dubai, UAE",
            duration: "2018 - 2021",
            highlights: [
              "Delivered enterprise customer experience and contact center integrations for Fortune 500 clients (Tesla, Bank of America).",
              "Implemented automated speech recognition (ASR) pipelines and CRM integrations across omni-channel contact centers."
            ]
          }
        ]
      }
    } = body;

    const jobTitle = lead.title || "Senior IT / AI Specialist";
    const company = lead.company || "UAE Enterprise";
    const requiredSkills = lead.tech_signals || lead.required_skills || ["Python", "Cloud Architecture", "System Design"];
    const decisionMaker = lead.decision_maker?.name || "Hiring Manager";
    const decisionRole = lead.decision_maker?.role || "Talent Acquisition Lead";
    const decisionEmail = lead.decision_maker?.email || "careers@company.ae";

    // 1. GENERATE TAILORED CV (DOCX & PDF formatted)
    if (type === 'cv') {
      const addedSkills = requiredSkills.filter(s => !candidate.skills.includes(s));
      const allSkills = [...new Set([...candidate.skills, ...requiredSkills])];

      const tailoredDoc = `# ${candidate.name}
${candidate.title} · ${candidate.location}
Email: ${candidate.email} | Phone: ${candidate.phone} | LinkedIn: ${candidate.linkedin}

---

## PROFESSIONAL SUMMARY
Results-driven ${jobTitle} with proven experience in architecting and delivering enterprise-grade software, AI systems, and scalable IT infrastructure in the UAE. Adept at aligning technical execution with strategic business goals for ${company}, with deep hands-on expertise in ${requiredSkills.slice(0, 4).join(', ')}. Strong background in client-facing solution delivery, system performance optimization, and UAE regulatory compliance.

---

## CORE TECHNICAL COMPETENCIES & SKILLS
${allSkills.map(s => `• ${s}`).join('\n')}

---

## PROFESSIONAL EXPERIENCE

### ${candidate.experience[0].role} — ${candidate.experience[0].company} (${candidate.experience[0].location})
*${candidate.experience[0].duration}*
• Spearheaded end-to-end development of production ${jobTitle} capabilities directly utilizing ${requiredSkills.slice(0, 3).join(', ')}.
• Designed high-availability architectures and microservices, reducing deployment latency by 45% and ensuring seamless integration with enterprise systems.
• Championed technical delivery, code review standards, and automated CI/CD pipelines compliant with UAE cybersecurity standards.
• Engineered client-tailored workflows in ${allSkills.slice(0, 4).join(', ')}, delivering high-impact solutions for regional stakeholders.

### ${candidate.experience[1].role} — ${candidate.experience[1].company} (${candidate.experience[1].location})
*${candidate.experience[1].duration}*
• Managed high-scale IT infrastructure and mission-critical communications supporting 2,500+ active enterprise users with 99.99% SLA.
• Integrated enterprise backend services with ${requiredSkills[0] || 'Cloud API'} infrastructure, automating monitoring and fault-tolerance.
• Formulated standard operating procedures (SOP) and coordinated with cross-functional technical teams for timely project milestones.

### ${candidate.experience[2].role} — ${candidate.experience[2].company} (${candidate.experience[2].location})
*${candidate.experience[2].duration}*
• Delivered enterprise-grade technical solutions for global accounts (Tesla, Bank of America), ensuring zero-downtime migrations.
• Developed automated data pipelines and customized interfaces utilizing ${requiredSkills[1] || 'Python & Modern APIs'}.

---

## EDUCATION & PROFESSIONAL CERTIFICATIONS
• Bachelor of Science / Engineering in Computer Science & Information Technology
• Certified Cloud & Solutions Architecture
• UAE Ministry of Human Resources (MOHRE) & Attested Credentials
`;

      return NextResponse.json({
        success: true,
        type: 'cv',
        document: tailoredDoc,
        metadata: {
          jobTitle,
          company,
          addedSkillsCount: addedSkills.length,
          addedSkills: addedSkills,
          matchScore: 98
        }
      });
    }

    // 2. GENERATE TAILORED COVER LETTER
    if (type === 'cover_letter') {
      const todayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const coverLetterDoc = `${candidate.name}
${candidate.location}
${candidate.email} | ${candidate.phone}

${todayDate}

To: ${decisionMaker}, ${decisionRole}
${company}
United Arab Emirates

Subject: Application for ${jobTitle} position at ${company} (Ref: AqionHunt UAE Verified Lead)

Dear ${decisionMaker || 'Hiring Team'},

I am writing to express my strong interest in the ${jobTitle} position at ${company}. Having closely followed ${company}'s recent technical milestones and market expansion across the UAE, I am excited by the opportunity to bring my hands-on background in ${requiredSkills.slice(0, 3).join(', ')} to your engineering initiatives.

Currently located in the UAE with immediate availability, I have spent the past several years engineering scalable software architectures, mission-critical IT infrastructure, and AI workflows. In my recent roles, I have:
1. Engineered production-grade systems utilizing ${requiredSkills.join(', ')}, delivering high-performance throughput with sub-second response times.
2. Led enterprise IT and telephony infrastructure serving over 2,500+ active users at American Hospital Dubai with 99.99% uptime.
3. Delivered high-stakes customer solutions for tier-1 multinational clients, ensuring seamless integration, security compliance, and rapid time-to-market.

What excites me most about joining ${company} is the opportunity to tackle complex technical challenges and deliver tangible business value through robust, modern engineering practices. My direct experience with ${requiredSkills[0] || 'modern tech stacks'} and local UAE business ecosystem allows me to onboard rapidly and contribute from Day 1.

I would welcome the opportunity to discuss how my skill set and background align with ${company}'s immediate engineering roadmap. Thank you for your time and consideration.

Sincerely,

${candidate.name}
${candidate.phone} | ${candidate.email}
LinkedIn: ${candidate.linkedin}
`;

      return NextResponse.json({
        success: true,
        type: 'cover_letter',
        document: coverLetterDoc,
        metadata: {
          jobTitle,
          company,
          decisionMaker
        }
      });
    }

    // 3. GENERATE LINKEDIN CONNECTION NOTE (<300 characters)
    if (type === 'linkedin_note') {
      const note = `Hi ${decisionMaker.split(' ')[0] || 'there'}, saw ${company}'s opening for ${jobTitle}. As a UAE-based engineer experienced in ${requiredSkills.slice(0, 2).join(' & ')} (2.5k+ enterprise users), I'd love to connect and share how I can add immediate value to your team.`;
      
      return NextResponse.json({
        success: true,
        type: 'linkedin_note',
        document: note,
        charCount: note.length,
        isUnder300: note.length <= 300
      });
    }

    // 4. GENERATE EXECUTIVE INMAIL / DIRECT EMAIL PITCH
    if (type === 'inmail') {
      const emailPitch = `Subject: ${jobTitle} Application — ${candidate.name} (UAE Immediate Availability)

Dear ${decisionMaker || 'Hiring Team'},

I am reaching out regarding the ${jobTitle} role at ${company}. 

With a strong track record of designing high-scale IT infrastructure and AI software in the UAE—including leading unified systems for 2,500+ users at American Hospital Dubai and global accounts at Servion—I offer the exact hands-on expertise in ${requiredSkills.slice(0, 3).join(', ')} needed for this position.

Key Highlights of My Experience:
• Expertise across ${requiredSkills.join(', ')} with rapid deployment velocity.
• UAE-based with valid visa and immediate onboarding capacity.
• Proven track record in high-availability enterprise environments and client-facing delivery.

Could we schedule a brief 10-minute introductory call this week to discuss how I can support ${company}'s immediate engineering objectives?

Best regards,

${candidate.name}
${candidate.title}
Phone: ${candidate.phone} | WhatsApp: ${candidate.phone}
Email: ${candidate.email}
LinkedIn: ${candidate.linkedin}`;

      return NextResponse.json({
        success: true,
        type: 'inmail',
        document: emailPitch,
        metadata: {
          jobTitle,
          company,
          decisionMaker,
          decisionEmail
        }
      });
    }

    // 5. GENERATE FREELANCE / TENDER PROPOSAL
    if (type === 'proposal') {
      const proposalDoc = `# COMMERCIAL & TECHNICAL PROPOSAL: ${jobTitle.toUpperCase()}
Client: ${company} · UAE Market Requirement
Prepared By: ${candidate.name} (${candidate.title})
Contact: ${candidate.email} | ${candidate.phone}

---

## 1. EXECUTIVE SUMMARY
AqionLabs / ${candidate.name} is pleased to submit this comprehensive technical proposal to ${company} for the execution of ${jobTitle}. We specialize in rapid, secure delivery of custom software, AI voice/LLM agents, and scalable cloud solutions tailored for the UAE market.

---

## 2. SCOPE OF DELIVERABLES & TECHNICAL ARCHITECTURE
• Core Technology Stack: ${requiredSkills.join(', ')}
• Phase 1 (Architecture & Prototyping): System design, API specifications, database schema, and interactive PoC delivery.
• Phase 2 (Core Build & Integration): Production development, third-party API/telephony integration, CRM synchronization, and security hardening.
• Phase 3 (Testing & Deployment): Automated unit/load testing, UAE cloud hosting configuration (AWS/Azure UAE Region), and staging sign-off.
• Phase 4 (Handover & Support): Source code handover, documentation, and dedicated warranty support.

---

## 3. TIMELINE & MILESTONES
• Milestone 1 (Sprint 1-2): Architecture Blueprint & Wireframes (25% Payment)
• Milestone 2 (Sprint 3-4): Functional MVP & Core Engine Integration (35% Payment)
• Milestone 3 (Sprint 5-6): UAT, Security Audit & Cloud Launch (30% Payment)
• Milestone 4 (Post-Launch): 30-Day Hypercare & SLA Support (10% Payment)

---

## 4. WHY PARTNER WITH US
• Local UAE Presence: Based in Dubai with full UAE market familiarity and local regulatory compliance.
• Enterprise Pedigree: Proven experience leading systems for 2,500+ enterprise users and Fortune 500 integrations.
• Direct Engineer-Led Execution: Zero overhead, transparent GitHub commits, and daily Slack/WhatsApp progress updates.
`;

      return NextResponse.json({
        success: true,
        type: 'proposal',
        document: proposalDoc,
        metadata: {
          jobTitle,
          company
        }
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid generation type' }, { status: 400 });
  } catch (error) {
    console.error('Error in generation API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
