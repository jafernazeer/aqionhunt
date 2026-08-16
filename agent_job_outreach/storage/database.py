"""
Persistence & Storage Engine
Maintains local SQLite database and JSON exports for tracked jobs, hiring managers, and outreach history.
"""

import json
import sqlite3
import os
from typing import List, Dict, Any, Optional

class JobOutreachStore:
    def __init__(self, db_path: str = "storage/outreach.db"):
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS jobs (
                    id TEXT PRIMARY KEY,
                    source TEXT,
                    title TEXT,
                    company TEXT,
                    location TEXT,
                    salary_range_aed TEXT,
                    match_score INTEGER,
                    status TEXT DEFAULT 'SCOUTED',
                    hiring_manager_name TEXT,
                    hiring_manager_title TEXT,
                    hiring_manager_linkedin TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS outreach_drafts (
                    job_id TEXT PRIMARY KEY,
                    connection_note TEXT,
                    inmail_pitch TEXT,
                    cover_letter TEXT,
                    sent_status TEXT DEFAULT 'PENDING_REVIEW',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (job_id) REFERENCES jobs (id)
                )
            """)
            conn.commit()

    def save_job_and_draft(self, job_data: Dict[str, Any], package: Dict[str, Any]):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            mgr = package.get("hiring_manager", {})
            cursor.execute("""
                INSERT OR REPLACE INTO jobs (
                    id, source, title, company, location, salary_range_aed, match_score,
                    status, hiring_manager_name, hiring_manager_title, hiring_manager_linkedin
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                package.get("job_id"),
                job_data.get("source", "LinkedIn"),
                package.get("role_title"),
                package.get("company"),
                package.get("location"),
                package.get("estimated_salary"),
                package.get("match_score"),
                "DRAFTED",
                mgr.get("name"),
                mgr.get("title"),
                mgr.get("linkedin")
            ))
            
            assets = package.get("outreach_assets", {})
            cursor.execute("""
                INSERT OR REPLACE INTO outreach_drafts (
                    job_id, connection_note, inmail_pitch, cover_letter, sent_status
                ) VALUES (?, ?, ?, ?, ?)
            """, (
                package.get("job_id"),
                assets.get("linkedin_connection_note"),
                assets.get("executive_inmail_message"),
                assets.get("tailored_cover_letter"),
                "PENDING_REVIEW"
            ))
            conn.commit()

    def get_all_opportunities(self) -> List[Dict[str, Any]]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("""
                SELECT j.*, d.connection_note, d.inmail_pitch, d.cover_letter, d.sent_status
                FROM jobs j
                LEFT JOIN outreach_drafts d ON j.id = d.job_id
                ORDER BY j.match_score DESC
            """)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
