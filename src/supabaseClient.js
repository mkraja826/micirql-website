const viteEnvironment = import.meta.env ?? {};
const supabaseUrl = viteEnvironment.VITE_SUPABASE_URL;
const supabasePublishableKey = viteEnvironment.VITE_SUPABASE_PUBLISHABLE_KEY ?? viteEnvironment.VITE_SUPABASE_ANON_KEY;

const publicLeadError = 'We could not save your enquiry. Please try again or email support@micirql.com.';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export async function submitPublicLead(payload) {
  if (!isSupabaseConfigured) {
    throw new Error('Public enquiry backend is not configured.');
  }

  let response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/public_site_leads`, {
      method: 'POST',
      headers: {
        apikey: supabasePublishableKey,
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
  } catch {
    throw new Error(publicLeadError);
  }

  if (!response.ok) {
    throw new Error(publicLeadError);
  }
}

export const submitWebsiteRequest = submitPublicLead;
