"""
High-Converting Executive Outreach Pitch Templates (v2.0)
Supports both High-Tier Enterprise FDE Roles (AED 35k-60k+) AND Specialized Agentic AI Build Requests (AED 10k-35k+)
covering: Voice AI Agents, Company Brain, Company Chatbots, Jarvis Assistants, and Claude Training.
"""

from typing import Dict, Any

class PitchTemplates:
    @staticmethod
    def linkedin_connection_note(candidate: Dict[str, Any], job: Dict[str, Any], manager: Dict[str, Any]) -> str:
        """Concise connection note strictly under 300 characters for LinkedIn."""
        manager_name = manager.get("name", "").split()[0] if manager.get("name") else "there"
        company = job.get("company", "your team")
        title = job.get("title", "AI initiative")
        
        if "voice" in title.lower():
            return f"Hi {manager_name} - saw {company}'s focus on Voice AI. At AqionLabs in Dubai, I architect sub-600ms latency voice agents with 9+ yrs enterprise telecom pedigree. Would love to connect regarding your voice & conversational build in UAE."
        elif "brain" in title.lower() or "rag" in title.lower():
            return f"Hi {manager_name} - noticed {company}'s Company Brain & RAG roadmap. I architect secure enterprise knowledge systems indexing Notion/Drive/Slack with strict UAE compliance. Let's connect on your AI architecture."
        elif "claude" in title.lower():
            return f"Hi {manager_name} - saw your focus on Claude enablement. I specialize in Anthropic Claude prompt engineering, MCP server architecture, and enterprise team training. Would love to connect."
        else:
            return f"Hi {manager_name} - saw {company}'s AI expansion. At AqionLabs in Dubai, I build production Agentic & Voice AI systems backed by 9+ yrs enterprise infrastructure. Would love to connect on your AI roadmap."

    @staticmethod
    def executive_inmail_pitch(candidate: Dict[str, Any], job: Dict[str, Any], manager: Dict[str, Any]) -> str:
        """Personalized InMail / Direct Email pitch tailored to specific archetype."""
        manager_name = manager.get("name", "Hiring Lead")
        manager_title = manager.get("title", "Technology Leader")
        company = job.get("company", "your organization")
        role_title = job.get("title", "AI Project / Role")
        hook = manager.get("personalization_hook", "your current AI roadmap")
        title_lower = role_title.lower()

        # Custom pitch body based on project archetype
        if "voice" in title_lower or "receptionist" in title_lower:
            archetype_bullets = """1. Production Sub-600ms Voice AI: Built and deployed live conversational voice agents (Vapi, Cartesia Sonic, Deepgram, OpenAI) handling real-time interruption, intent parsing, and instant CRM tool-calling.
2. Enterprise Telephony Bridge: 9+ years managing Avaya Aura, Cisco UC, SIP, and WebRTC (ex-American Hospital Dubai), ensuring zero friction when integrating voice bots with PBX, phone numbers, or WhatsApp calling.
3. Multilingual UAE Fluency: Native support for Emirati/Gulf Arabic, English, and Hindi dialects with context-aware localization."""
        elif "brain" in title_lower or "rag" in title_lower:
            archetype_bullets = """1. Enterprise RAG & Multi-Source Indexing: Designed production 'Company Brain' architectures synchronizing unstructured files (Notion, Google Drive, Slack, PDFs) with hybrid vector search (Qdrant, pgvector) and sub-second retrieval.
2. Sovereign Data Governance: Strict alignment with UAE PDPL and DIFC data privacy standards, ensuring zero data leakage and deterministic access control.
3. Hallucination-Free Guardrails: Implemented dynamic reranking and citation validation pipelines for high-stakes financial, legal, and operational intelligence."""
        elif "claude" in title_lower:
            archetype_bullets = """1. Anthropic Claude & MCP Mastery: Deep practitioner of Claude 3.7 Sonnet, Claude Code, Model Context Protocol (MCP) server design, and advanced prompt engineering chains.
2. Enterprise Team Enablement: Structured curriculum training technical teams and business analysts on prompt evaluation benchmarks, tool calling, and automated agentic pipelines.
3. LLMOps & Observability: Establishing automated regression testing, prompt versioning, and cost-latency optimization suites."""
        elif "jarvis" in title_lower or "personal" in title_lower:
            archetype_bullets = """1. Autonomous Multi-Agent Workflows: Architecting executive assistant systems (CrewAI, LangGraph, Hermes Agent) that execute multi-step tasks across email, calendar, web research, and CRM.
2. Voice & Messaging Interface: Direct interaction via Telegram, WhatsApp, or low-latency voice notes with real-time briefing synthesis.
3. High-Security Privacy: Local/private cloud hosting with strict API key rotation and credential containment."""
        else:
            archetype_bullets = """1. Production Agentic & Voice AI Engineering: Deployed live low-latency voice agents and multi-agent workflows at AqionLabs across healthcare, real estate, and finance in UAE.
2. Enterprise Telecom & Cloud Pedigree: 9+ years scaling mission-critical systems across Avaya, Cisco, VMware, and AWS/Azure (American Hospital Dubai, Servion, Betsol).
3. Forward Deployed Delivery: Rapid turnaround from client technical discovery to working production MVP within days."""

        return f"""Subject: {role_title} / Architecture & Rapid Deployment (Dubai)

Hi {manager_name},

I noticed {company}’s initiative regarding {role_title}. As {manager_title}, you know that moving from conversational prototypes to reliable, production-grade AI requires both advanced LLM orchestration and deep enterprise infrastructure integration.

As Head of AI at AqionLabs (Dubai) and with a 9-year pedigree delivering enterprise communication and cloud transformations, I provide immediate end-to-end execution:

{archetype_bullets}

Personalization Context: {hook}

Whether you are looking for an executive FDE/Solutions Architect or a hands-on AI partner to rapidly build and ship this system, I can provide immediate on-ground delivery in Dubai.

I’d welcome 15 minutes for a brief technical walkthrough of our live production architectures.

Best regards,

Mohammed Jafer
AI Product Leader & Solutions Architect | AqionLabs.ai
Dubai, UAE | +971588499663 | mohammedjafer123@outlook.com
LinkedIn: https://www.linkedin.com/in/jafermohammed
"""

    @staticmethod
    def tailored_cover_letter(candidate: Dict[str, Any], job: Dict[str, Any]) -> str:
        """Formal executive proposal and project application."""
        company = job.get("company", "the Organization")
        role_title = job.get("title", "AI Product Lead / Solutions Architect")
        location = job.get("location", "Dubai / UAE")
        comp = job.get("salary_range_aed", "Negotiable")

        return f"""Mohammed Jafer
Dubai, UAE | +971 58 849 9663 | mohammedjafer123@outlook.com
LinkedIn: linkedin.com/in/jafermohammed | Portfolio: aqionlabs.ai

To: The Leadership Team & AI Evaluation Committee
Company: {company}
Role / Project: {role_title} ({location})
Target Package: {comp}

Subject: Proposal & Application for {role_title} — Production Agentic AI, Voice AI & Enterprise Systems

Dear Hiring & Project Leadership at {company},

I am submitting my application and technical proposal for the {role_title} position with {company}. As Head of AI at AqionLabs in Dubai, I specialize in architecting and delivering production Agentic AI systems, enterprise Voice AI agents, Company Brain knowledge platforms, and custom LLM solutions.

Key Differentiators & Technical Proof Points:

1. Voice AI & Conversational Automation:
At AqionLabs, I have engineered and deployed sub-600ms latency voice agents (Cartesia Sonic, Deepgram Flux, OpenAI Realtime, Vapi) capable of real-time interruption handling, dynamic caller entity extraction, and automatic CRM synchronization (HubSpot, Salesforce) in Arabic, English, and Hindi.

2. Enterprise 'Company Brain' & RAG Architecture:
I design high-accuracy Retrieval-Augmented Generation (RAG) platforms indexing heterogeneous corporate data (Notion, Google Drive, Slack, SQL, ERPs) with hybrid vector search, semantic chunking, and strict UAE data sovereignty compliance.

3. 9+ Years Enterprise Communications & Infrastructure Bridge:
Having served as IT Voice Lead Engineer at American Hospital Dubai (2,500+ users) and Senior Implementation Consultant at Servion (delivering for Tesla, Disney, UPS, and Bank of America), I have the rare background required to bridge legacy telecom (Avaya, Cisco, SIP, WebRTC) with cutting-edge Agentic LLMs and MCP servers without operational disruption.

4. Claude & LLMOps Enablement:
Extensive hands-on expertise building on Anthropic Claude (Claude 3.7 Sonnet, Claude Code), Model Context Protocol (MCP) servers, structured tool-calling, and team prompt engineering training programs.

Based on the ground in Dubai with immediate availability and deep regional insight, I am prepared to accelerate {company}'s AI delivery roadmap immediately.

I look forward to discussing how we can collaborate.

Sincerely,

Mohammed Jafer
AI Product Leader & Solutions Architect
Head of AI, AqionLabs.ai
"""
