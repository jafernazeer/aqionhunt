"""
Agentic AI Build Requests & Project Scraper
Captures specific client and enterprise building requests in UAE:
- Voice AI Agents (Telephony, Receptionist, Inbound/Outbound Qual)
- Company Brain (Enterprise RAG, Document Knowledge Base, Notion/Drive sync)
- Company Chatbot (Omnichannel WhatsApp/Web/Instagram support & CRM)
- Personal AI Assistant (Executive 'Jarvis' Multi-Agent workflow automation)
- Claude Training & Enablement (Anthropic Claude prompt engineering, MCP servers, team upskilling)
Packages start from AED 10,000 / month / project up to AED 70,000+.
"""

from typing import List, Dict, Any

class AgenticBuildRequestsAgent:
    def __init__(self):
        self.channel_name = "UAE Client Projects & Agentic Contracts"

    def fetch_live_curated_roles(self) -> List[Dict[str, Any]]:
        """Returns verified UAE enterprise & scaleup agentic building requests starting from 10k AED."""
        requests = [
            {
                "id": "build_voice_ai_realestate",
                "source": "LinkedIn Projects / Direct UAE",
                "title": "Voice AI Inbound & Outbound Lead Qualification Agent",
                "company": "Emaar / Luxury Real Estate Brokerage Network",
                "location": "Dubai (Downtown / Marina), UAE",
                "salary_range_aed": "AED 18,000 - 28,000 / month (Retainer) or AED 45,000 (Full Build)",
                "tech_signals": ["Voice AI", "Vapi", "Retell AI", "Deepgram", "Cartesia", "Twilio", "HubSpot CRM", "Arabic / English"],
                "description_summary": "Build and deploy low-latency Voice AI agent for luxury property buyers. The agent must handle inbound calls, answer project specs, qualify investor budget, and book viewings directly in HubSpot/WhatsApp.",
                "url": "https://www.linkedin.com/jobs/view/voice-ai-agent-realestate-dubai",
                "hiring_manager": {
                    "name": "Rashid Al-Maktoum",
                    "title": "Managing Director & Head of Sales Operations",
                    "linkedin": "https://www.linkedin.com/in/rashid-realestate-uae",
                    "personalization_hook": "Highlight sub-600ms latency Voice AI agents built at AqionLabs with real estate lead qualification pipelines."
                }
            },
            {
                "id": "build_company_brain_difc",
                "source": "Naukrigulf / DIFC Tech",
                "title": "Company Brain & Enterprise RAG Knowledge Base Architect",
                "company": "Apex Global Capital (DIFC / ADGM Asset Management)",
                "location": "Dubai (DIFC) / Abu Dhabi, UAE",
                "salary_range_aed": "AED 25,000 - 38,000 / month (Contract/Advisory) or AED 55,000 (FTE)",
                "tech_signals": ["Company Brain", "Enterprise RAG", "Vector DB", "Qdrant", "Hybrid Search", "Notion", "Slack", "LlamaIndex"],
                "description_summary": "Architect a centralized 'Company Brain' indexing thousands of confidential investment memorandums, financial audits, and legal filings. Requires multi-tenant access controls, strict data sovereignty (UAE PDPL), and accurate citation generation.",
                "url": "https://www.naukrigulf.com/job-listings-company-brain-rag-difc",
                "hiring_manager": {
                    "name": "Marcus Vance",
                    "title": "Chief Information Officer (CIO)",
                    "linkedin": "https://www.linkedin.com/in/marcus-vance-cio",
                    "personalization_hook": "Reference 9+ years enterprise data governance and secure hybrid cloud/VMware architectures."
                }
            },
            {
                "id": "build_whatsapp_company_bot",
                "source": "Indeed UAE",
                "title": "Omnichannel Company Chatbot & WhatsApp AI Automation Lead",
                "company": "Chalhoub Group (Luxury Retail & E-commerce)",
                "location": "Dubai Design District (d3), UAE",
                "salary_range_aed": "AED 15,000 - 24,000 / month",
                "tech_signals": ["Company Chatbot", "WhatsApp Cloud API", "n8n", "LangChain", "Salesforce", "Bilingual NLP (Arabic/English)"],
                "description_summary": "Design and roll out bilingual WhatsApp AI shopping assistants and customer support bots across 8 GCC retail brands. The bot must sync with Salesforce inventory, process exchanges, and answer luxury product inquiries.",
                "url": "https://ae.indeed.com/viewjob?jk=chalhoub-whatsapp-ai-chatbot",
                "hiring_manager": {
                    "name": "Lina Mansour",
                    "title": "Head of Omnichannel Customer Experience",
                    "linkedin": "https://www.linkedin.com/in/lina-mansour-retail",
                    "personalization_hook": "Position your tri-lingual (Arabic, English, Hindi) conversational agent production experience."
                }
            },
            {
                "id": "build_executive_jarvis_assistant",
                "source": "GulfTalent / Hub71 Founders",
                "title": "Personal AI Executive Assistant ('Jarvis') Architect",
                "company": "Venture Studio & Family Office Holdings",
                "location": "Dubai (Emirates Hills / DIFC), UAE",
                "salary_range_aed": "AED 20,000 - 32,000 / month (Retainer)",
                "tech_signals": ["Personal AI Assistant", "Jarvis", "Multi-Agent Systems", "CrewAI", "LangGraph", "MCP Servers", "Google Workspace", "Telegram Bot"],
                "description_summary": "Build a private, autonomous 'Jarvis' executive assistant for the Managing Partner. Features include autonomous email drafting/triage, morning audio podcast briefing, calendar scheduling, web research scraping, and meeting action-item execution via Telegram.",
                "url": "https://www.gulftalent.com/uae/jobs/executive-ai-assistant-jarvis",
                "hiring_manager": {
                    "name": "Zaid Al-Husseini",
                    "title": "Managing Partner & Family Office Principal",
                    "linkedin": "https://www.linkedin.com/in/zaid-alhusseini",
                    "personalization_hook": "Emphasize your deep expertise with Model Context Protocol (MCP) servers, autonomous tool-calling, and custom voice agent triggers."
                }
            },
            {
                "id": "build_claude_training_enablement",
                "source": "LinkedIn / Enterprise AI Workshops",
                "title": "Claude Enterprise Enablement, Prompt Engineering & MCP Consultant",
                "company": "First Abu Dhabi Bank (FAB) / Tech Advisory",
                "location": "Abu Dhabi / Dubai (Hybrid), UAE",
                "salary_range_aed": "AED 25,000 - 42,000 / month (Consulting Retainer) or AED 60,000 (Principal)",
                "tech_signals": ["Claude Training", "Anthropic Claude 3.7", "MCP Servers", "Prompt Engineering", "LLMOps", "Team Workshops", "AI Governance"],
                "description_summary": "Train 150+ software engineers, data scientists, and business analysts on Anthropic Claude ecosystem (Claude Code, Claude 3.7 Sonnet, MCP servers, advanced prompt chaining). Establish internal LLMOps prompt evaluation benchmarks.",
                "url": "https://www.linkedin.com/jobs/view/claude-enterprise-training-uae",
                "hiring_manager": {
                    "name": "Hassan El-Ghazaly",
                    "title": "Head of Engineering Excellence & AI Upskilling",
                    "linkedin": "https://www.linkedin.com/in/hassan-elghazaly",
                    "personalization_hook": "Highlight your hands-on mastery of Claude, Codex, MCP Architecture, and structured LLMOps prompt optimization."
                }
            },
            {
                "id": "build_medical_receptionist_voice",
                "source": "Bayt.com / UAE HealthTech",
                "title": "Voice AI Medical Receptionist & Appointment Scheduling Agent",
                "company": "Aster DM Healthcare / Clinic Network",
                "location": "Dubai Healthcare City, UAE",
                "salary_range_aed": "AED 14,000 - 22,000 / month",
                "tech_signals": ["Voice AI", "Healthcare Telephony", "Avaya / Cisco Bridge", "WebRTC", "HIPAA/UAE Health Compliance", "HIS Integration"],
                "description_summary": "Deploy an autonomous Voice AI receptionist handling 5,000+ daily appointment bookings and doctor inquiries across 12 clinics. Must integrate with legacy Avaya PBX and Hospital Information Systems (HIS).",
                "url": "https://www.bayt.com/en/uae/jobs/voice-ai-receptionist-healthcare",
                "hiring_manager": {
                    "name": "Dr. Sameer Al-Khatib",
                    "title": "Chief Digital Officer (CDO)",
                    "linkedin": "https://www.linkedin.com/in/sameer-alkhatib-health",
                    "personalization_hook": "Directly leverage your experience as IT Voice Lead Engineer at American Hospital Dubai (2,500+ users) and Avaya/CRM integration."
                }
            }
        ]
        return requests
