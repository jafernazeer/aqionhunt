"""
Procurement Database Layer for AqionProcure
Handles SQLite storage and query indexing for UAE MEP tenders, subcontractors, rate benchmarks, and scrape runs.
"""

import sqlite3
import json
import os
from datetime import datetime
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "procurement_intel.db"

def get_db_connection():
    os.makedirs(DB_PATH.parent, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Table: RFQs & Tenders
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS rfqs_tenders (
        id TEXT PRIMARY KEY,
        reference_no TEXT,
        title TEXT NOT NULL,
        client_name TEXT NOT NULL,
        category_id TEXT NOT NULL,
        service_id TEXT NOT NULL,
        service_name TEXT NOT NULL,
        emirate TEXT NOT NULL,
        location TEXT,
        budget_min_aed REAL,
        budget_max_aed REAL,
        scope_summary TEXT,
        technical_specs TEXT, -- JSON array
        authorities TEXT,     -- JSON array (e.g. DEWA, DCD)
        deadline_date TEXT,
        lead_age TEXT,
        source_portal TEXT,
        source_url TEXT,
        status TEXT DEFAULT 'Active',
        decision_maker_name TEXT,
        decision_maker_role TEXT,
        decision_maker_email TEXT,
        decision_maker_phone TEXT,
        decision_maker_linkedin TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Table: Verified Subcontractors & Suppliers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS contractors (
        id TEXT PRIMARY KEY,
        company_name TEXT NOT NULL,
        trade_license_no TEXT,
        emirate TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        categories TEXT, -- JSON array
        services TEXT,   -- JSON array
        authorities_approved TEXT, -- JSON array (DEWA, ADDC, DCD)
        classification TEXT, -- Grade 1, Grade 2, SME
        verified_date TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Table: Scraper Execution Audit Logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scrape_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portal_name TEXT NOT NULL,
        engine_used TEXT NOT NULL,
        query TEXT,
        items_extracted INTEGER,
        status TEXT,
        error_message TEXT,
        executed_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

def insert_rfq(rfq_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT OR REPLACE INTO rfqs_tenders (
        id, reference_no, title, client_name, category_id, service_id, service_name,
        emirate, location, budget_min_aed, budget_max_aed, scope_summary,
        technical_specs, authorities, deadline_date, lead_age, source_portal,
        source_url, status, decision_maker_name, decision_maker_role,
        decision_maker_email, decision_maker_phone, decision_maker_linkedin
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        rfq_data.get('id'),
        rfq_data.get('reference_no'),
        rfq_data.get('title'),
        rfq_data.get('client_name'),
        rfq_data.get('category_id'),
        rfq_data.get('service_id'),
        rfq_data.get('service_name'),
        rfq_data.get('emirate', 'Dubai'),
        rfq_data.get('location'),
        rfq_data.get('budget_min_aed', 0),
        rfq_data.get('budget_max_aed', 0),
        rfq_data.get('scope_summary'),
        json.dumps(rfq_data.get('technical_specs', [])),
        json.dumps(rfq_data.get('authorities', [])),
        rfq_data.get('deadline_date'),
        rfq_data.get('lead_age', 'Recently Posted'),
        rfq_data.get('source_portal'),
        rfq_data.get('source_url'),
        rfq_data.get('status', 'Active'),
        rfq_data.get('decision_maker', {}).get('name'),
        rfq_data.get('decision_maker', {}).get('role'),
        rfq_data.get('decision_maker', {}).get('email'),
        rfq_data.get('decision_maker', {}).get('phone'),
        rfq_data.get('decision_maker', {}).get('linkedin')
    ))

    conn.commit()
    conn.close()

def insert_contractor(contractor_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT OR REPLACE INTO contractors (
        id, company_name, trade_license_no, emirate, address, phone, email,
        website, categories, services, authorities_approved, classification, verified_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        contractor_data.get('id'),
        contractor_data.get('company_name'),
        contractor_data.get('trade_license_no'),
        contractor_data.get('emirate', 'Dubai'),
        contractor_data.get('address'),
        contractor_data.get('phone'),
        contractor_data.get('email'),
        contractor_data.get('website'),
        json.dumps(contractor_data.get('categories', [])),
        json.dumps(contractor_data.get('services', [])),
        json.dumps(contractor_data.get('authorities_approved', [])),
        contractor_data.get('classification', 'Grade 1 MEP'),
        contractor_data.get('verified_date', datetime.utcnow().strftime('%Y-%m-%d'))
    ))

    conn.commit()
    conn.close()

def log_scrape_run(portal_name, engine_used, query, items_extracted, status='SUCCESS', error_message=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO scrape_logs (portal_name, engine_used, query, items_extracted, status, error_message)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (portal_name, engine_used, query, items_extracted, status, error_message))
    conn.commit()
    conn.close()

def query_rfqs(category_id=None, service_id=None, emirate=None, search_term=None, min_budget=0):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM rfqs_tenders WHERE 1=1"
    params = []

    if category_id:
        query += " AND category_id = ?"
        params.append(category_id)
    if service_id:
        query += " AND service_id = ?"
        params.append(service_id)
    if emirate and emirate != 'All':
        query += " AND emirate = ?"
        params.append(emirate)
    if min_budget > 0:
        query += " AND budget_max_aed >= ?"
        params.append(min_budget)
    if search_term:
        query += " AND (title LIKE ? OR scope_summary LIKE ? OR client_name LIKE ?)"
        like_p = f"%{search_term}%"
        params.extend([like_p, like_p, like_p])

    query += " ORDER BY budget_max_aed DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        d = dict(r)
        d['technical_specs'] = json.loads(d['technical_specs']) if d['technical_specs'] else []
        d['authorities'] = json.loads(d['authorities']) if d['authorities'] else []
        d['decision_maker'] = {
            'name': d.pop('decision_maker_name', None),
            'role': d.pop('decision_maker_role', None),
            'email': d.pop('decision_maker_email', None),
            'phone': d.pop('decision_maker_phone', None),
            'linkedin': d.pop('decision_maker_linkedin', None)
        }
        results.append(d)
    return results

def query_contractors(category_name=None, emirate=None, search_term=None):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM contractors WHERE 1=1"
    params = []

    if emirate and emirate != 'All':
        query += " AND emirate = ?"
        params.append(emirate)
    if search_term:
        query += " AND (company_name LIKE ? OR address LIKE ?)"
        like_p = f"%{search_term}%"
        params.extend([like_p, like_p])

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        d = dict(r)
        d['categories'] = json.loads(d['categories']) if d['categories'] else []
        d['services'] = json.loads(d['services']) if d['services'] else []
        d['authorities_approved'] = json.loads(d['authorities_approved']) if d['authorities_approved'] else []
        if category_name and category_name != 'All':
            if not any(category_name.lower() in c.lower() for c in d['categories']):
                continue
        results.append(d)
    return results

# Initialize DB on load
init_db()
