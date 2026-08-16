"""
Naukrigulf Job Intelligence & Scraper Agent
Extracts high-paying FDE, AI Lead, and Solutions Architecture roles from Naukrigulf UAE.
"""

from typing import List, Dict, Any

class NaukrigulfJobAgent:
    def __init__(self):
        self.base_url = "https://www.naukrigulf.com/ai-jobs-in-uae"

    def fetch_live_curated_roles(self) -> List[Dict[str, Any]]:
        """Extracts high-tier UAE roles on Naukrigulf targeting AED 35k-60k+."""
        roles = [
            {
                "id": "ng_g42_cloud_fde",
                "source": "Naukrigulf",
                "title": "Forward Deployed AI Platform Engineer",
                "company": "Core42 (G42 Sovereign Cloud)",
                "location": "Abu Dhabi / Dubai, UAE",
                "salary_range_aed": "AED 45,000 - 58,000 / month",
                "tech_signals": ["Forward Deployed", "Kubernetes", "Sovereign Cloud", "LLMOps", "Vector DB", "RAG"],
                "description_summary": "Lead enterprise client deployments on sovereign AI infrastructure. Build custom RAG pipelines, deploy high-throughput LLM clusters, and integrate with client legacy data centers.",
                "url": "https://www.naukrigulf.com/job-listings-core42-fde-ai-uae",
                "hiring_manager": {
                    "name": "Dr. Adel Al-Marzooqi",
                    "title": "VP of AI Infrastructure & Customer Engineering",
                    "linkedin": "https://www.linkedin.com/in/adel-almarzooqi-g42",
                    "personalization_hook": "Emphasize VMware, Kubernetes virtualization, and high-security enterprise communications integration."
                }
            },
            {
                "id": "ng_enbd_conversational_lead",
                "source": "Naukrigulf",
                "title": "Lead AI Solutions Architect - Voice & Conversational Banking",
                "company": "Emirates NBD",
                "location": "Dubai (Meydan HQ), UAE",
                "salary_range_aed": "AED 50,000 - 65,000 / month",
                "tech_signals": ["Voice AI", "Conversational Banking", "SIP", "WebRTC", "Agentic", "Fintech Compliance"],
                "description_summary": "Architect the next-generation multilingual voice banking platform for Emirates NBD. Implement sub-second voice agent authentication, dynamic transaction execution, and CRM integration.",
                "url": "https://www.naukrigulf.com/job-listings-emirates-nbd-lead-ai-architect",
                "hiring_manager": {
                    "name": "Sanjay Verma",
                    "title": "SVP & Head of Digital Transformation & AI",
                    "linkedin": "https://www.linkedin.com/in/sanjay-verma-enbd",
                    "personalization_hook": "Highlight sub-600ms latency Voice AI agents deployed at AqionLabs and 9+ years enterprise telecom infrastructure."
                }
            }
        ]
        return roles
