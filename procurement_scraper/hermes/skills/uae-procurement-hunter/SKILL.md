---
name: uae-procurement-hunter
description: Autonomous UAE MEP, HVAC, Fit-Out & Facility Contracting Procurement Scout & Zero-Cap Notification Engine. Monitors eSupply Dubai, TAMM Abu Dhabi, Tejari, and directory boards for all 25 trades irrespective of AED cap.
---

# UAE MEP & Fit-Out Procurement Hunter (Zero-Cap Engine)

Autonomous scout and real-time notification engine for UAE procurement teams, general contractors, and MEP specialists across Dubai, Abu Dhabi, Sharjah, and Northern Emirates.

## Monitored Scope (8 Categories · 25 Specialized Trades)

1. **Electrical & Power**:
   - Electrical Installation & Wiring (`elec-01`)
   - Distribution Board Works (`elec-02`)
   - Lighting Installation (`elec-03`)
   - Testing & Certification (`elec-04`)
2. **Plumbing & Drainage**:
   - Water Supply Installation (`plumb-01`)
   - Drainage & Waste Systems (`plumb-02`)
   - Taps, Mixers & Sanitaryware (`plumb-03`)
   - Leak Detection & Repair (`plumb-04`)
3. **Air Conditioning & Ventilation**:
   - Air Conditioning (`hvac-01`)
   - Kitchen & Extract Ventilation (`hvac-02`)
4. **Smart Home & Automation**:
   - Home Automation (`smart-01`)
   - Automatic Curtains & Blinds (`smart-02`)
   - Automatic Garage Doors (`smart-03`)
   - Door & Window Sensors (`smart-04`)
   - House Control Sensors (`smart-05`)
5. **Security & Access**:
   - CCTV Cameras (`sec-01`)
   - Access Control & Intercom (`sec-02`)
6. **Specialist Equipment Installation**:
   - Imported & Specialist Equipment (`spec-01`)
   - Commercial Kitchen Equipment (`spec-02`)
7. **Ceilings, Finishes & Fit-Out**:
   - Gypsum Ceilings & Partitions (`finish-01`)
   - Epoxy Resin Flooring (`finish-02`)
   - Builders Work & Making Good (`finish-03`)
8. **Documentation & Support**:
   - Shop Drawings & Submittals (`doc-01`)
   - Maintenance Contracts (`doc-02`)
   - Manpower Supply (`doc-03`)

## Zero-Cap Autonomous Scout & Live Notification Workflow

```bash
# 1. Scout all live government and private portals without budget cap
python3 procurement_scraper/cli.py scout

# 2. Output live match notifications stream (capturing all matches irrespective of AED cap)
python3 procurement_scraper/cli.py notify --stream

# 3. Export synchronized master dossier
python3 procurement_scraper/cli.py export --output UAE_Procurement_MEP_Directory_Master.md
```

## Scheduled Cron Execution (Hermes Agent)

Set up background monitoring to broadcast all matched requirements (from AED 1,200 maintenance callouts to multi-million AED packages):

```bash
hermes cron create "0 */3 * * *" --prompt "Run uae-procurement-hunter in zero-cap mode, crawl all UAE government tender portals (eSupply, TAMM, Tejari) and directory boards across all 25 trades, and notify immediately of all new requirements irrespective of AED budget."
```
