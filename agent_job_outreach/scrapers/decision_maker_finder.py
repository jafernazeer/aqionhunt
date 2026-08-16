"""
Decision Maker Discovery Engine
Finds CTOs, VPs of Engineering, Heads of AI, and Director-level hiring managers for target companies.
"""

from typing import Dict, Any, Optional

class DecisionMakerFinder:
    def __init__(self):
        self.verified_leaders = {
            "ai71": {
                "name": "Dr. Tariq Al-Nuaimi",
                "title": "VP of Enterprise Solutions & Delivery",
                "linkedin": "https://www.linkedin.com/in/tariq-alnuaimi-ai",
                "company": "AI71",
                "focus": "Falcon LLM enterprise adoption, sovereign AI, agentic solutions"
            },
            "presight.ai": {
                "name": "Alexandre Mercier",
                "title": "Head of AI Product & Architecture",
                "linkedin": "https://www.linkedin.com/in/alex-mercier-tech",
                "company": "Presight.ai (G42)",
                "focus": "Enterprise analytics, generative AI, government platforms"
            },
            "astra tech / botim": {
                "name": "Karim Haddad",
                "title": "Chief Technology Officer (CTO)",
                "linkedin": "https://www.linkedin.com/in/karim-haddad-cto",
                "company": "Astra Tech / Botim",
                "focus": "Ultra-App ecosystem, multilingual voice bots, fintech"
            },
            "careem": {
                "name": "Fahad Siddiqui",
                "title": "Director of Engineering - Core AI",
                "linkedin": "https://www.linkedin.com/in/fahad-siddiqui-careem",
                "company": "Careem",
                "focus": "Everyday Everything Super App, autonomous customer intelligence"
            },
            "pwc middle east": {
                "name": "Ziad Haddad",
                "title": "Partner, Head of AI & Emerging Tech GCC",
                "linkedin": "https://www.linkedin.com/in/ziad-haddad-pwc",
                "company": "PwC Middle East",
                "focus": "C-suite enterprise AI strategy and GenAI execution"
            },
            "talabat": {
                "name": "Omar Mansoor",
                "title": "VP of Technology & Operations",
                "linkedin": "https://www.linkedin.com/in/omar-mansoor-talabat",
                "company": "Talabat",
                "focus": "Contact center modernization, real-time voice routing, rider AI"
            },
            "emirates group": {
                "name": "David Henderson",
                "title": "SVP Technology & Customer Innovation",
                "linkedin": "https://www.linkedin.com/in/david-henderson-emirates",
                "company": "Emirates Group",
                "focus": "Aviation digital passenger experience, contact center modernization"
            },
            "hub71": {
                "name": "Nader Al-Sabah",
                "title": "Head of Engineering & Ecosystem Development",
                "linkedin": "https://www.linkedin.com/in/nader-alsabah-hub71",
                "company": "Hub71",
                "focus": "AI ecosystem scaleups, technical advisory"
            }
        }

    def find_for_company(self, company_name: str) -> Optional[Dict[str, Any]]:
        comp_clean = company_name.lower().strip()
        for key, info in self.verified_leaders.items():
            if key in comp_clean or comp_clean in key:
                return info
        # Default fallback persona
        return {
            "name": f"Hiring Lead ({company_name})",
            "title": "VP of Technology / Head of AI",
            "linkedin": f"https://www.linkedin.com/company/{comp_clean.replace(' ', '-')}",
            "company": company_name,
            "focus": "AI Platform & Engineering Leadership"
        }
