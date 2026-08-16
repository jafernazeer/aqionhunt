import { NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/scraper';
import { generateClientPitchData } from '@/lib/pitchSynthesizer';
import { savePitch } from '@/lib/pitchStore';

export async function POST(request) {
  try {
    const { website, linkedin } = await request.json();

    if (!website) {
      return NextResponse.json({ error: 'Website URL is required.' }, { status: 400 });
    }

    // 1. Scrape client's website in real time
    const scrapedData = await scrapeWebsite(website);

    // 2. Synthesize custom business intelligence & Voice AI config
    const pitchData = await generateClientPitchData(scrapedData, website);

    // 3. Generate a clean URL slug / ID
    const baseSlug = (pitchData.companyName || 'client')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const pitchId = `${baseSlug}-${Date.now().toString(36)}`;

    // 4. Save to pitch store
    const record = savePitch(pitchId, {
      ...pitchData,
      websiteUrl: website,
      linkedinUrl: linkedin || '',
      scrapedData,
    });

    return NextResponse.json({
      success: true,
      id: pitchId,
      companyName: pitchData.companyName,
      pitch: record,
    });
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze website.' },
      { status: 500 }
    );
  }
}
