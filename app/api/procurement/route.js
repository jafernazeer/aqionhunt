import { NextResponse } from 'next/server';
import { SERVICES_CATALOG, VERIFIED_CONTRACTORS, ALL_VERIFIED_TENDERS } from './route_catalog_data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const service = searchParams.get('service') || '';
  const emirate = searchParams.get('emirate') || '';
  const minBudget = parseInt(searchParams.get('min_budget') || '0', 10);

  let filtered = [...ALL_VERIFIED_TENDERS];

  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.client_name.toLowerCase().includes(term) ||
      item.scope_summary.toLowerCase().includes(term) ||
      item.service_name.toLowerCase().includes(term) ||
      item.technical_specs.some(s => s.toLowerCase().includes(term))
    );
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(item => item.category_id === category || item.category_id.includes(category));
  }

  if (service && service !== 'All') {
    filtered = filtered.filter(item => item.service_id === service || item.service_id.includes(service));
  }

  if (emirate && emirate !== 'All') {
    filtered = filtered.filter(item => item.emirate.toLowerCase() === emirate.toLowerCase());
  }

  if (minBudget > 0) {
    filtered = filtered.filter(item => item.budget_max_aed >= minBudget);
  }

  const totalValueAED = filtered.reduce((acc, curr) => acc + (curr.budget_max_aed || 0), 0);

  return NextResponse.json({
    success: true,
    total: filtered.length,
    totalValueAED: totalValueAED,
    totalValueFormatted: totalValueAED > 1000000 
      ? `AED ${(totalValueAED / 1000000).toFixed(2)}M`
      : `AED ${totalValueAED.toLocaleString()}`,
    categories: SERVICES_CATALOG,
    rfqs: filtered,
    contractors: VERIFIED_CONTRACTORS,
    meta: {
      zeroCapEnabled: true,
      portalsScraped: [
        "eSupply Dubai", "Abu Dhabi TAMM", "Tejari GCC Procurement",
        "Emaar Contractor Portal", "Aldar Supplier Network", "DAMAC Procurement",
        "Nakheel Vendor Portal", "Yello.ae UAE Contractors", "Dubizzle Commercial"
      ],
      totalTradesCovered: 25,
      categoriesCount: 8
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { query = '', category = '', service = '', emirate = '', minBudget = 0 } = body;

    let filtered = [...ALL_VERIFIED_TENDERS];

    if (query) {
      const term = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.client_name.toLowerCase().includes(term) ||
        item.scope_summary.toLowerCase().includes(term) ||
        item.service_name.toLowerCase().includes(term) ||
        item.technical_specs.some(s => s.toLowerCase().includes(term))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(item => item.category_id === category || item.category_id.includes(category));
    }

    if (service && service !== 'All') {
      filtered = filtered.filter(item => item.service_id === service || item.service_id.includes(service));
    }

    if (emirate && emirate !== 'All') {
      filtered = filtered.filter(item => item.emirate.toLowerCase() === emirate.toLowerCase());
    }

    if (minBudget > 0) {
      filtered = filtered.filter(item => item.budget_max_aed >= minBudget);
    }

    const totalValueAED = filtered.reduce((acc, curr) => acc + (curr.budget_max_aed || 0), 0);

    return NextResponse.json({
      success: true,
      query: query,
      total: filtered.length,
      totalValueAED: totalValueAED,
      totalValueFormatted: totalValueAED > 1000000 
        ? `AED ${(totalValueAED / 1000000).toFixed(2)}M`
        : `AED ${totalValueAED.toLocaleString()}`,
      categories: SERVICES_CATALOG,
      rfqs: filtered,
      contractors: VERIFIED_CONTRACTORS
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to query procurement API' },
      { status: 500 }
    );
  }
}
