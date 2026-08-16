"""
Application & Outreach Drafter
Generates complete outreach packages per opportunity.
"""

from typing import Dict, Any
from .pitch_templates import PitchTemplates

class ApplicationDrafter:
    def __init__(self, candidate_profile: Dict[str, Any]):
        self.candidate = candidate_profile
        self.templates = PitchTemplates()

    def draft_package(self, job: Dict[str, Any], manager: Dict[str, Any], score_info: Dict[str, Any]) -> Dict[str, Any]:
        """Builds a complete, multi-channel application & outreach package."""
        conn_note = self.templates.linkedin_connection_note(self.candidate, job, manager)
        inmail_pitch = self.templates.executive_inmail_pitch(self.candidate, job, manager)
        cover_letter = self.templates.tailored_cover_letter(self.candidate, job)

        return {
            "job_id": job.get("id"),
            "role_title": job.get("title"),
            "company": job.get("company"),
            "location": job.get("location"),
            "estimated_salary": job.get("salary_range_aed"),
            "match_score": score_info.get("overall_match_percentage"),
            "hiring_manager": {
                "name": manager.get("name"),
                "title": manager.get("title"),
                "linkedin": manager.get("linkedin"),
                "personalization_hook": manager.get("personalization_hook")
            },
            "outreach_assets": {
                "linkedin_connection_note": conn_note,
                "executive_inmail_message": inmail_pitch,
                "tailored_cover_letter": cover_letter
            }
        }
