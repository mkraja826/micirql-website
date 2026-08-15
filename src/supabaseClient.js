const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export async function submitPublicLead(payload) {
  if (!isSupabaseConfigured) {
    throw new Error('Public enquiry backend is not configured.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/public_site_leads`, {
    method: 'POST',
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${supabasePublishableKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      ...payload,
      source: 'micirql.com',
      page_url: typeof window === 'undefined' ? null : window.location.href,
      referrer: typeof document === 'undefined' ? null : document.referrer || null,
      status: 'new',
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Request failed. Please try again.');
  }
}

export const submitWebsiteRequest = submitPublicLead;
