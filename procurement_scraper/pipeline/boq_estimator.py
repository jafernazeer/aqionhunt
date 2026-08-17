"""
UAE MEP BOQ Estimator & Pricing Engine
Calculates standard Bill of Quantities (BOQ), material costs, and labor man-days in AED.
"""

from typing import Dict, Any, List

class BOQEstimator:
    """
    Computes realistic UAE market rate estimates and BOQ item schedules for any of the 23 trades.
    """
    RATE_TABLE = {
        "elec-01": {"unit": "Points / LM", "rate": 120, "labor_days_factor": 0.05, "desc": "Power & wiring circuits with conduit, XLPE/LSZH cabling, backbox"},
        "elec-02": {"unit": "Panels / Ways", "rate": 2800, "labor_days_factor": 1.5, "desc": "Form 2 DB panel with Schneider breakers & phase balancing"},
        "elec-03": {"unit": "Fixtures / Points", "rate": 220, "labor_days_factor": 0.08, "desc": "Architectural LED fixtures, DALI/0-10V dimming & drivers"},
        "elec-04": {"unit": "Test Packages", "rate": 1200, "labor_days_factor": 0.5, "desc": "Megger insulation resistance, earth pit & RCD certification"},
        "plumb-01": {"unit": "Points / LM", "rate": 140, "labor_days_factor": 0.06, "desc": "PPR PN20 potable water pipework, isolation valves & insulation"},
        "plumb-02": {"unit": "Points / Traps", "rate": 180, "labor_days_factor": 0.07, "desc": "HDPE electrofusion / uPVC drainage & stainless steel cleanouts"},
        "plumb-03": {"unit": "Sets", "rate": 750, "labor_days_factor": 0.35, "desc": "Concealed cistern, wall-hung WC, thermostatic mixer & accessories"},
        "plumb-04": {"unit": "Inspections", "rate": 1400, "labor_days_factor": 0.5, "desc": "Thermal imaging, tracer gas leak acoustic detection & repair"},
        "hvac-01": {"unit": "Tons (TR)", "rate": 2200, "labor_days_factor": 0.8, "desc": "VRF / Ducted Split supply, insulated copper piping & thermostats"},
        "hvac-02": {"unit": "Hoods / CFM (k)", "rate": 3500, "labor_days_factor": 1.2, "desc": "SS304 kitchen extract hood, fire-rated black duct & ecology unit"},
        "smart-01": {"unit": "Nodes / Channels", "rate": 480, "labor_days_factor": 0.15, "desc": "KNX lighting/climate modules, scene controllers & app gateway"},
        "smart-02": {"unit": "Tracks (LM)", "rate": 360, "labor_days_factor": 0.1, "desc": "Somfy ultra-quiet motorized curtain tracks with concealed cabling"},
        "smart-03": {"unit": "Door / Gate Motors", "rate": 3200, "labor_days_factor": 1.0, "desc": "Overhead / sliding motor kit with safety photocell beams & remotes"},
        "smart-04": {"unit": "Sensors", "rate": 190, "labor_days_factor": 0.05, "desc": "Tamper-proof magnetic door/window contacts with automation triggers"},
        "smart-05": {"unit": "Sensor Points", "rate": 260, "labor_days_factor": 0.06, "desc": "mmWave radar presence, temperature & motorized water shut-off probes"},
        "sec-01": {"unit": "Camera Points", "rate": 850, "labor_days_factor": 0.25, "desc": "SIRA-approved 4K IP night-vision camera, Cat6 cabling & NVR storage"},
        "sec-02": {"unit": "Access Doors", "rate": 2100, "labor_days_factor": 0.6, "desc": "IP video intercom, facial/card reader, electromagnetic lock & egress"},
        "spec-01": {"unit": "Equipment Sets", "rate": 4200, "labor_days_factor": 2.0, "desc": "Assembly, 3-phase hardwiring, chilled water & sauna/cryo commissioning"},
        "spec-02": {"unit": "Kitchen Appliances", "rate": 1800, "labor_days_factor": 0.8, "desc": "Combi-oven, fryer & dishwasher power, water & drain rough-in to HACCP"},
        "finish-01": {"unit": "SQM", "rate": 85, "labor_days_factor": 0.04, "desc": "Suspended moisture-resistant gypsum ceiling, shadow gap & paint finish"},
        "finish-02": {"unit": "SQM", "rate": 95, "labor_days_factor": 0.05, "desc": "Shot-blasting, moisture primer & self-leveling anti-slip epoxy resin screed"},
        "finish-03": {"unit": "Cores / Areas", "rate": 350, "labor_days_factor": 0.12, "desc": "Diamond core drilling, certified fire-stop collar & architectural making good"},
        "doc-01": {"unit": "Packages / Sheets", "rate": 2500, "labor_days_factor": 1.0, "desc": "Revit 3D BIM MEP shop drawings, MAR material approvals & method statements"},
        "doc-02": {"unit": "Annual Contract", "rate": 14500, "labor_days_factor": 8.0, "desc": "Quarterly PPM preventive maintenance visits & 24/7 SLA emergency call-outs"},
        "doc-03": {"unit": "Man-Days", "rate": 185, "labor_days_factor": 1.0, "desc": "Visa-compliant certified MEP technician with PPE & tooling"}
    }

    @classmethod
    def estimate_scope(cls, service_id: str, quantity: float = 10.0) -> Dict[str, Any]:
        info = cls.RATE_TABLE.get(service_id, cls.RATE_TABLE["elec-01"])
        total_aed = round(info["rate"] * quantity, 2)
        min_aed = round(total_aed * 0.88, 2)
        max_aed = round(total_aed * 1.18, 2)
        man_days = round(info["labor_days_factor"] * quantity, 1)

        return {
            "service_id": service_id,
            "unit": info["unit"],
            "unit_rate_aed": info["rate"],
            "quantity": quantity,
            "estimated_total_aed": total_aed,
            "estimated_range_aed": f"AED {min_aed:,.0f} - AED {max_aed:,.0f}",
            "estimated_man_days": man_days,
            "scope_specification": info["desc"]
        }
