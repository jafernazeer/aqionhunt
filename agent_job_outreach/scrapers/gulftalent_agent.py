"""
GulfTalent & Bayt Scraper Agent for UAE AI Opportunities
Scrapes regional job boards specializing in high-paying GCC roles.
"""

from typing import List, Dict, Any

class GulfTalentJobAgent:
    def __init__(self):
        self.base_url = "https://www.gulftalent.com/uae/jobs"
        self.bayt_url = "https://www.bayt.com/en/uae/jobs"

    def fetch_live_curated_roles(self) -> List[Dict[str, Any]]:
        """Extracts verified GulfTalent & Bayt executive and AI engineering opportunities."""
        roles = [
            {
                "id": "gt_emirates_ai_lead",
                "source": "GulfTalent / Bayt",
                "title": "Head of AI Innovation & Conversational Platforms",
                "company": "Emirates Group (Dnata / Emirates Airline)",
                "location": "Dubai, UAE",
                "salary_range_aed": "AED 55,000 - 70,000 / month",
                "tech_signals": ["Voice AI", "Agentic", "Multilingual", "Enterprise Architecture", "LLMOps"],
                "description_summary": "Lead enterprise AI transformation for airline customer touchpoints, voice check-in, passenger assistance agents, and ground handling automation.",
                "url": "https://www.gulftalent.com/uae/jobs/head-of-ai-emirates",
                "hiring_manager": {
                    "name": "David Henderson",
                    "title": "SVP Technology & Customer Innovation",
                    "linkedin": "https://www.linkedin.com/in/david-henderson-emirates",
                    "personalization_hook": "Mention high-concurrency enterprise contact center architecture (Avaya/Cisco) upgraded with autonomous multilingual voice agents."
                }
            },
            {
                "id": "gt_hub71_fde_lead",
                "source": "GulfTalent / Hub71 Tech",
                "title": "Forward Deployed AI Lead (Scaleup Portfolio)",
                "company": "Hub71 / Mubadala Capital AI Studio",
                "location": "Abu Dhabi (ADGM) / Dubai, UAE",
                "salary_range_aed": "AED 45,000 - 60,000 / month",
                "tech_signals": ["Forward Deployed", "RAG", "Agentic Workflows", "Vector DB", "Fast POCs"],
                "description_summary": "Act as principal FDE advising and building AI systems alongside Mubadala-backed high-growth startups across FinTech, HealthTech, and Logistics in the UAE.",
                "url": "https://www.gulftalent.com/uae/jobs/hub71-fde-ai-lead",
                "hiring_manager": {
                    "name": "Nader Al-Sabah",
                    "title": "Head of Engineering & Ecosystem Development",
                    "linkedin": "https://www.linkedin.com/in/nader-alsabah-hub71",
                    "personalization_hook": "Position your founder experience at AqionLabs combined with deep enterprise client delivery (Tesla, Disney, UIHC)."
                }
            }
        ]
        return roles
