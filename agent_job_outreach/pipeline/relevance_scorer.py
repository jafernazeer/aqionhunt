"""
Candidate-to-Role Relevance Scoring Algorithm
Computes weighted matching scores between Mohammed Jafer's profile and job openings.
"""

from typing import Dict, Any

class RelevanceScorer:
    def __init__(self, candidate_profile: Dict[str, Any]):
        self.candidate = candidate_profile

    def score_match(self, job: Dict[str, Any]) -> Dict[str, Any]:
        """Calculates multi-dimensional alignment score."""
        title = job.get("title", "").lower()
        desc = job.get("description_summary", "").lower()
        tech_signals = [t.lower() for t in job.get("tech_signals", [])]

        factors = {
            "voice_ai_alignment": 0,
            "enterprise_infrastructure_fit": 0,
            "forward_deployed_consulting": 0,
            "agentic_llmops_depth": 0,
            "uae_localization": 100 # Candidate is UAE resident on ground
        }

        # Voice AI & Conversational scoring
        if any(w in title or w in desc or w in tech_signals for w in ["voice", "conversational", "speech", "contact center", "telecom"]):
            factors["voice_ai_alignment"] = 95
        else:
            factors["voice_ai_alignment"] = 70

        # Enterprise Infrastructure fit
        if any(w in desc or w in tech_signals for w in ["enterprise", "architect", "telecom", "infrastructure", "kubernetes", "cloud", "security"]):
            factors["enterprise_infrastructure_fit"] = 95
        else:
            factors["enterprise_infrastructure_fit"] = 80

        # Forward Deployed / Delivery capability
        if any(w in title or w in desc for w in ["forward deployed", "fde", "delivery", "client", "solutions lead", "consultant"]):
            factors["forward_deployed_consulting"] = 98
        else:
            factors["forward_deployed_consulting"] = 85

        # Agentic & LLMOps depth
        if any(w in desc or w in tech_signals for w in ["agentic", "rag", "vector", "llmops", "openai", "claude", "langchain", "mcp"]):
            factors["agentic_llmops_depth"] = 95
        else:
            factors["agentic_llmops_depth"] = 75

        # Overall weighted match
        overall_match = int(
            factors["voice_ai_alignment"] * 0.30 +
            factors["enterprise_infrastructure_fit"] * 0.25 +
            factors["forward_deployed_consulting"] * 0.25 +
            factors["agentic_llmops_depth"] * 0.20
        )

        return {
            "overall_match_percentage": overall_match,
            "breakdown": factors,
            "status": "High Priority Target" if overall_match >= 85 else "Standard Opportunity"
        }
