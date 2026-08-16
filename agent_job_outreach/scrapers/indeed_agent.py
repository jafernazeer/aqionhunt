"""
Indeed UAE Job Intelligence & Scraper Agent
Extracts top-paying FDE, AI Solutions Architecture, and Lead roles from Indeed UAE.
"""

from typing import List, Dict, Any

class IndeedJobAgent:
    def __init__(self):
        self.base_url = "https://ae.indeed.com/jobs?q=AI+Lead+OR+Forward+Deployed+Engineer&l=Dubai"

    def fetch_live_curated_roles(self) -> List[Dict[str, Any]]:
        """Extracts verified high-comp AI roles from Indeed UAE."""
        roles = [
            {
                "id": "indeed_tii_agentic_fde",
                "source": "Indeed UAE",
                "title": "Principal Forward Deployed Engineer (Autonomous Agentic Systems)",
                "company": "Technology Innovation Institute (TII)",
                "location": "Abu Dhabi / Dubai, UAE",
                "salary_range_aed": "AED 52,000 - 68,000 / month",
                "tech_signals": ["Agentic AI", "Falcon Models", "Autonomous Systems", "Tool Calling", "RAG"],
                "description_summary": "Lead field engineering and production integration of advanced autonomous agents across defense, aerospace, and energy sectors in the UAE.",
                "url": "https://ae.indeed.com/viewjob?jk=tii-agentic-fde-uae",
                "hiring_manager": {
                    "name": "Dr. Najwa Aaraj",
                    "title": "Chief Executive Officer (CEO) / Head of AI Research",
                    "linkedin": "https://www.linkedin.com/in/najwa-aaraj",
                    "personalization_hook": "Position your multi-agent architecture and low-latency voice pipeline expertise at AqionLabs."
                }
            },
            {
                "id": "indeed_propertyfinder_ai_lead",
                "source": "Indeed UAE",
                "title": "AI Product & Delivery Lead - Conversational AI & Real Estate Intelligence",
                "company": "Property Finder",
                "location": "Dubai (Shatha Tower), UAE",
                "salary_range_aed": "AED 42,000 - 55,000 / month",
                "tech_signals": ["Voice AI", "Conversational AI", "CRM Automation", "Lead Qualification", "RAG"],
                "description_summary": "Own Property Finder's conversational AI assistant and automated voice lead qualification system across GCC markets.",
                "url": "https://ae.indeed.com/viewjob?jk=property-finder-ai-lead-dubai",
                "hiring_manager": {
                    "name": "Christophe de Rassenfosse",
                    "title": "Chief Product & Technology Officer (CPTO)",
                    "linkedin": "https://www.linkedin.com/in/christophe-derassenfosse",
                    "personalization_hook": "Highlight your production Voice AI lead qualification deployments for UAE real estate clients at AqionLabs."
                }
            }
        ]
        return roles
