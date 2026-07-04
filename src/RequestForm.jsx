import React, { useState } from 'react';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Android App Development',
  message: '',
};

export function RequestForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter name, phone, and project details.' });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        type: 'error',
        message: 'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    const { error } = await supabase.from('website_requests').insert({
      name: form.name.trim(),
      email: form.email.trim() || null,
      phone: form.phone.trim(),
      company: form.company.trim() || null,
      service: form.service,
      message: form.message.trim(),
      source: 'micirql-website',
    });

    setLoading(false);

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Request failed. Please try again.' });
      return;
    }

    setForm(initialForm);
    setStatus({ type: 'success', message: 'Request sent successfully. Micirql will contact you soon.' });
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name *
          <input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your name" />
        </label>
        <label>
          Phone *
          <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone / WhatsApp" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Email
          <input value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="email@example.com" />
        </label>
        <label>
          Company / Clinic
          <input value={form.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Company or clinic name" />
        </label>
      </div>

      <label>
        Service needed
        <select value={form.service} onChange={(e) => updateField('service', e.target.value)}>
          <option>Android App Development</option>
          <option>Landing Page Design</option>
          <option>Clinic Software</option>
          <option>Business Dashboard</option>
          <option>Startup MVP</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        Project details *
        <textarea value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Tell us what you want to build" rows="5" />
      </label>

      <button className="primary-button form-button" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Request'} <span>→</span>
      </button>

      {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
    </form>
  );
}
