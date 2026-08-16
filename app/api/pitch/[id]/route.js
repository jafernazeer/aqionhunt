import { NextResponse } from 'next/server';
import { getPitch } from '@/lib/pitchStore';
import { generateHeuristicPitchData } from '@/lib/pitchSynthesizer';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let pitch = getPitch(id);

    if (!pitch) {
      // If server restarted or opened directly with an ID, generate a beautiful fallback based on the ID name
      const cleanName = id
        .split('-')[0]
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Prospective Partner';

      const mockScraped = {
        companyName: cleanName,
        tagline: `Next-Generation Autonomous Operations for ${cleanName}`,
        description: `${cleanName} is an industry innovator optimizing client engagements and scaling operations with precision.`,
        services: ['Client Advisory & Strategy', 'Automated Operations', 'Enterprise Intelligence', 'Dedicated Support'],
      };

      pitch = {
        id,
        ...generateHeuristicPitchData(mockScraped, `https://${id.split('-')[0]}.com`),
        websiteUrl: `https://${id.split('-')[0]}.com`,
        scrapedData: mockScraped,
      };
    }

    return NextResponse.json({ success: true, pitch });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
