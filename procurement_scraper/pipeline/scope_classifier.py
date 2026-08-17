"""
Procurement Scope Classifier & Authority Tagging Engine
Classifies unstructured RFQ text into 8 categories, 23 specialized trades, and relevant UAE compliance bodies.
"""

import re
from typing import Dict, List, Any

TRADE_KEYWORDS = {
    "elec-01": ["wiring", "cable", "circuit", "xlpe", "swa", "conduit", "power supply", "rewiring", "feeder", "load calculation"],
    "elec-02": ["distribution board", "db", "mdb", "smdb", "breaker", "mccb", "rcbo", "elcb", "phase balance", "busbar"],
    "elec-03": ["lighting", "led", "downlight", "chandelier", "dali", "dimming", "landscape light", "luminaire", "dialux"],
    "elec-04": ["megger", "insulation resistance", "earth continuity", "loop impedance", "rcd test", "certification", "eic"],
    "plumb-01": ["water supply", "ppr", "pex", "pipework", "booster pump", "filtration", "potable water", "prv", "valve"],
    "plumb-02": ["drainage", "hdpe", "upvc", "grease trap", "interceptor", "floor drain", "gully", "f&b kitchen", "waste water"],
    "plumb-03": ["sanitaryware", "tap", "mixer", "shower", "wc", "toilet", "basin", "water heater", "geyser", "grohe", "geberit"],
    "plumb-04": ["leak detection", "hidden leak", "acoustic leak", "thermal imaging", "tracer gas", "pipe repair", "water loss"],
    "hvac-01": ["air conditioning", "ac", "hvac", "vrf", "vrv", "split unit", "ducted split", "chiller", "cooling", "thermostat"],
    "hvac-02": ["kitchen extract", "ventilation", "exhaust hood", "duct", "ecology unit", "esp", "fan", "air balancing", "cfm"],
    "smart-01": ["home automation", "knx", "crestron", "control4", "smart home", "scene control", "touch panel", "zigbee"],
    "smart-02": ["motorized curtain", "automatic blind", "somfy", "curtain track", "electric shade", "roller blind"],
    "smart-03": ["garage door", "automatic gate", "sliding gate", "barrier", "motorized door", "safety beam", "photocell"],
    "smart-04": ["door sensor", "window sensor", "magnetic contact", "reed switch", "intrusion contact"],
    "smart-05": ["motion sensor", "presence sensor", "mmwave", "temperature sensor", "humidity sensor", "water leak sensor", "smoke detector"],
    "sec-01": ["cctv", "camera", "nvr", "surveillance", "sira", "night vision", "ip camera", "hikvision", "dahua"],
    "sec-02": ["access control", "intercom", "video door phone", "maglock", "biometric", "facial recognition", "card reader", "gate automation"],
    "spec-01": ["specialist equipment", "imported equipment", "cryo", "cryotherapy", "sauna", "wellness chamber", "cold plunge", "gym plant"],
    "spec-02": ["commercial kitchen", "catering equipment", "combi oven", "deep fryer", "rational", "blast chiller", "haccp"],
    "finish-01": ["gypsum", "ceiling", "partition", "drywall", "bulkhead", "cove", "shadow gap", "knauf", "skim coat", "plaster"],
    "finish-02": ["epoxy", "resin floor", "polyurethane screed", "anti-slip", "quartz broadcast", "floor coating", "fosroc"],
    "finish-03": ["builders work", "core drilling", "penetration", "fire stopping", "fire-stop", "making good", "reinstatement"],
    "doc-01": ["shop drawings", "bim", "revit", "submittal", "material approval", "mar", "method statement", "mos", "itp", "as-built"],
    "doc-02": ["maintenance contract", "amc", "ppm", "preventive maintenance", "facility management", "annual maintenance", "call out"],
    "doc-03": ["manpower supply", "technicians", "electricians", "plumbers", "ductman", "helpers", "labor supply", "man-days"]
}

CATEGORY_MAPPING = {
    "elec-01": ("electrical_power", "Electrical & Power", "Electrical Installation & Wiring"),
    "elec-02": ("electrical_power", "Electrical & Power", "Distribution Board Works"),
    "elec-03": ("electrical_power", "Electrical & Power", "Lighting Installation"),
    "elec-04": ("electrical_power", "Electrical & Power", "Testing & Certification"),
    "plumb-01": ("plumbing_drainage", "Plumbing & Drainage", "Water Supply Installation"),
    "plumb-02": ("plumbing_drainage", "Plumbing & Drainage", "Drainage & Waste Systems"),
    "plumb-03": ("plumbing_drainage", "Plumbing & Drainage", "Taps, Mixers & Sanitaryware"),
    "plumb-04": ("plumbing_drainage", "Plumbing & Drainage", "Leak Detection & Repair"),
    "hvac-01": ("ac_ventilation", "Air Conditioning & Ventilation", "Air Conditioning"),
    "hvac-02": ("ac_ventilation", "Air Conditioning & Ventilation", "Kitchen & Extract Ventilation"),
    "smart-01": ("smart_home_automation", "Smart Home & Automation", "Home Automation"),
    "smart-02": ("smart_home_automation", "Smart Home & Automation", "Automatic Curtains & Blinds"),
    "smart-03": ("smart_home_automation", "Smart Home & Automation", "Automatic Garage Doors"),
    "smart-04": ("smart_home_automation", "Smart Home & Automation", "Door & Window Sensors"),
    "smart-05": ("smart_home_automation", "Smart Home & Automation", "House Control Sensors"),
    "sec-01": ("security_access", "Security & Access", "CCTV Cameras"),
    "sec-02": ("security_access", "Security & Access", "Access Control & Intercom"),
    "spec-01": ("specialist_equipment", "Specialist Equipment Installation", "Imported & Specialist Equipment"),
    "spec-02": ("specialist_equipment", "Specialist Equipment Installation", "Commercial Kitchen Equipment"),
    "finish-01": ("ceilings_finishes", "Ceilings, Finishes & Fit-Out", "Gypsum Ceilings & Partitions"),
    "finish-02": ("ceilings_finishes", "Ceilings, Finishes & Fit-Out", "Epoxy Resin Flooring"),
    "finish-03": ("ceilings_finishes", "Ceilings, Finishes & Fit-Out", "Builders Work & Making Good"),
    "doc-01": ("documentation_support", "Documentation & Support", "Shop Drawings & Submittals"),
    "doc-02": ("documentation_support", "Documentation & Support", "Maintenance Contracts"),
    "doc-03": ("documentation_support", "Documentation & Support", "Manpower Supply")
}

AUTHORITY_KEYWORDS = {
    "DEWA": ["dewa", "dubai electricity", "dewa wiring", "dewa water", "dewa approved"],
    "ADDC": ["addc", "abu dhabi distribution", "doe abu dhabi"],
    "SEWA": ["sewa", "sharjah electricity"],
    "FEWA": ["fewa", "etihad water and electricity"],
    "Dubai Civil Defense": ["dcd", "civil defense", "fire rated", "fire-stopping", "fire-rated", "ansul", "nfpa 96"],
    "Dubai Municipality": ["dubai municipality", "dm approval", "al sa'fat", "green building"],
    "Food Safety / HACCP": ["haccp", "food safety", "commercial kitchen", "grease interceptor", "hygiene"],
    "SIRA": ["sira", "security industry regulatory", "sira approved", "cctv storage"],
    "TDRA": ["tdra", "tra uae", "smart home wireless"],
    "MOHRE": ["mohre", "manpower", "visas", "workmen compensation"]
}

class ScopeClassifier:
    """
    Intelligently analyzes requirements and classifies into 23 trades with authority tags.
    """
    @staticmethod
    def classify_text(text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        
        # Match trade service
        matched_scores = {}
        for service_id, keywords in TRADE_KEYWORDS.items():
            score = sum(1 for kw in keywords if re.search(r'\b' + re.escape(kw) + r'\b', text_lower))
            if score > 0:
                matched_scores[service_id] = score
                
        if matched_scores:
            best_service_id = max(matched_scores, key=matched_scores.get)
        else:
            best_service_id = "elec-01" # Default fallback
            
        category_id, category_name, service_name = CATEGORY_MAPPING[best_service_id]
        
        # Match authorities
        detected_authorities = []
        for auth_name, auth_kws in AUTHORITY_KEYWORDS.items():
            if any(kw in text_lower for kw in auth_kws):
                detected_authorities.append(auth_name)
                
        if not detected_authorities:
            if "dubai" in text_lower or category_id == "electrical_power":
                detected_authorities.append("DEWA")
            else:
                detected_authorities.append("Dubai Municipality")
                
        return {
            "category_id": category_id,
            "category_name": category_name,
            "service_id": best_service_id,
            "service_name": service_name,
            "authorities": list(set(detected_authorities)),
            "match_confidence": "HIGH" if matched_scores.get(best_service_id, 0) >= 2 else "MEDIUM"
        }
