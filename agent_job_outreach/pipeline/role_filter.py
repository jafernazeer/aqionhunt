"""
Role Filter & Qualification Pipeline (v2.1)
Filters and qualifies both high-tier AI Leadership / FDE roles AND specialized Agentic AI building requests
(Voice AI, Company Brain, Company Chatbots, Jarvis Assistants, Claude Training) starting from AED 10,000/month.
"""

from typing import Dict, Any, Tuple

class RoleFilter:
    def __init__(self, min_salary_aed: int = 10000):
        self.min_salary_aed = min_salary_aed
        self.priority_titles = [
            # Leadership & FDE
            "forward deployed", "fde", "ai lead", "head of ai", "ai solutions architect",
            "principal ai architect", "genai consultant", "ai delivery manager", "ai delivery lead",
            "ai engineering manager", "conversational ai lead", "staff ai architect", "enterprise ai architect",
            "conversational ai", "ai product & delivery", "lead ai solutions", "solutions engineer",
            # Agentic Build Requests
            "voice ai", "company brain", "chatbot", "chat bot", "personal ai", "jarvis",
            "claude", "prompt engineering", "mcp", "receptionist", "automation lead", "rag",
            "real estate intelligence", "conversational banking"
        ]
        self.disqualify_keywords = [
            "unpaid", "free internship", "telemarketer", "data entry clerk"
        ]

    def evaluate(self, job: Dict[str, Any]) -> Tuple[bool, str, int]:
        """
        Evaluates whether a job or project request passes criteria.
        Returns: (passes: bool, reason: str, tier_score: int)
        """
        title = job.get("title", "").lower()
        company = job.get("company", "").lower()
        desc = job.get("description_summary", "").lower()
        tech_signals = [t.lower() for t in job.get("tech_signals", [])]
        
        # 1. Check disqualifications
        for bad in self.disqualify_keywords:
            if bad in title or bad in desc:
                return False, f"Disqualified by keyword: '{bad}'", 0

        # 2. Check title or tech signal relevance
        title_matched = any(pt in title or pt in desc for pt in self.priority_titles)
        if not title_matched:
            return False, "Does not match targeted AI Leadership, FDE, or Agentic Build Archetypes", 0

        # 3. Calculate Tier Score (1-100)
        score = 60
        
        # High value signals
        if "voice ai" in title or "voice ai" in desc or "voice" in tech_signals:
            score += 20
        if "company brain" in title or "rag" in desc or "rag" in tech_signals:
            score += 15
        if "claude" in title or "claude" in desc or "mcp" in desc:
            score += 15
        if "jarvis" in title or "personal ai" in title:
            score += 15
        if "chatbot" in title or "whatsapp" in desc:
            score += 10
        if "forward deployed" in title or "fde" in title or "solutions architect" in title:
            score += 15
        if any(c in company for c in ["g42", "ai71", "emaar", "difc", "enbd", "emirates", "tii", "aster", "property"]):
            score += 10

        return True, "Qualified Opportunity / Build Request", min(score, 100)
