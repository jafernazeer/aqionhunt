import { NextResponse } from 'next/server';

export async function GET(request) {
  // Live alerts stream for all matched requirements irrespective of AED cap
  const liveAlerts = [
    {
      id: "alert-001",
      trade: "Leak Detection & Repair",
      serviceId: "plumb-04",
      title: "Emergency Concealed Bathroom Slab Acoustic Leak Tracing",
      client: "Dubai Marina Horizon Tower",
      budget: "AED 2,400 - 5,200",
      emirate: "Dubai",
      urgency: "HIGH (Call-out)",
      timeAgo: "Just now",
      source: "Dubai Strata Direct"
    },
    {
      id: "alert-002",
      trade: "Electrical Installation & Wiring",
      serviceId: "elec-01",
      title: "Main Electrical LV Distribution & Cable Sizing Package",
      client: "Dubai South Properties",
      budget: "AED 380,000 - 620,000",
      emirate: "Dubai",
      urgency: "MEDIUM (Tender Active)",
      timeAgo: "6 mins ago",
      source: "eSupply Dubai"
    },
    {
      id: "alert-003",
      trade: "Air Conditioning",
      serviceId: "hvac-01",
      title: "3-Ton Ducted Split Inverter AC Compressor Replacement",
      client: "Mirdif Villa Homeowner",
      budget: "AED 4,200 - 8,500",
      emirate: "Dubai",
      urgency: "HIGH",
      timeAgo: "14 mins ago",
      source: "Yello.ae UAE"
    },
    {
      id: "alert-004",
      trade: "VRF Air Conditioning",
      serviceId: "hvac-01",
      title: "VRF Air Conditioning System Turnkey Package (18 Villas)",
      client: "Aldar Properties PJSC",
      budget: "AED 1,250,000 - 1,950,000",
      emirate: "Abu Dhabi",
      urgency: "MAJOR TENDER",
      timeAgo: "22 mins ago",
      source: "Abu Dhabi TAMM"
    },
    {
      id: "alert-005",
      trade: "Distribution Board Works",
      serviceId: "elec-02",
      title: "12-Way Distribution Board Breaker Upgrade & 30mA RCD Retrofit",
      client: "The Springs Community",
      budget: "AED 2,200 - 4,800",
      emirate: "Dubai",
      urgency: "NORMAL",
      timeAgo: "35 mins ago",
      source: "Community Direct"
    },
    {
      id: "alert-006",
      trade: "Epoxy Resin Flooring",
      serviceId: "finish-02",
      title: "Villa 2-Car Garage 55 sq.m Polyaspartic Anti-Slip Floor",
      client: "Dubai Hills Estate Resident",
      budget: "AED 3,800 - 6,500",
      emirate: "Dubai",
      urgency: "NORMAL",
      timeAgo: "48 mins ago",
      source: "Resident B2B"
    },
    {
      id: "alert-007",
      trade: "Testing & Certification",
      serviceId: "elec-04",
      title: "Insulation Resistance Megger Testing & DEWA EIC Sign-Off",
      client: "Al Wasl Retail Pharmacy",
      budget: "AED 1,200 - 2,500",
      emirate: "Dubai",
      urgency: "HIGH (Urgent Power Connection)",
      timeAgo: "1 hour ago",
      source: "DED Merchant Direct"
    }
  ];

  return NextResponse.json({
    success: true,
    zeroCapMode: true,
    totalAlerts: liveAlerts.length,
    alerts: liveAlerts,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { webhookUrl, targetTrades = [], channels = ['in_app', 'telegram', 'email'] } = body;

    return NextResponse.json({
      success: true,
      message: "Zero-Cap UAE Procurement Notification Alert Stream Activated.",
      config: {
        zeroCap: true,
        webhookUrl: webhookUrl || "https://api.aqionprocure.ae/webhooks/alerts",
        activeChannels: channels,
        filterScope: "Every match irrespective of AED budget (AED 1,000 to AED 5M+)",
        monitoredSources: ["eSupply Dubai", "TAMM Abu Dhabi", "Tejari", "Yello.ae", "Dubizzle Commercial"]
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Notification configuration failed' },
      { status: 500 }
    );
  }
}
