import React, { useState } from 'react';
import { isSupabaseConfigured, submitWebsiteRequest } from './supabaseClient';

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

    if (!isSupabaseConfigured) {
      setStatus({
        type: 'error',
        message: 'The enquiry service is temporarily unavailable. Please contact support@micirql.com.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await submitWebsiteRequest({
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim(),
        company: form.company.trim() || null,
        service: form.service,
        message: form.message.trim(),
        source: 'micirql-website',
      });

      setForm(initialForm);
      setStatus({ type: 'success', message: 'Request sent successfully. Micirql will contact you soon.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Request failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} aria-label="Micirql project enquiry form">
      <div className="form-grid">
        <label htmlFor="request-name">
          Name *
          <input id="request-name" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your name" required />
        </label>
        <label htmlFor="request-phone">
          Phone *
          <input id="request-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="Phone / WhatsApp" required />
        </label>
      </div>

      <div className="form-grid">
        <label htmlFor="request-email">
          Email
          <input id="request-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="email@example.com" />
        </label>
        <label htmlFor="request-company">
          Company / Clinic
          <input id="request-company" name="company" autoComplete="organization" value={form.company} onChange={(event) => updateField('company', event.target.value)} placeholder="Company or clinic name" />
        </label>
      </div>

      <label htmlFor="request-service">
        Service needed
        <select id="request-service" name="service" value={form.service} onChange={(event) => updateField('service', event.target.value)}>
          <option>Android App Development</option>
          <option>Landing Page Design</option>
          <option>Clinic Software</option>
          <option>Business Dashboard</option>
          <option>Startup MVP</option>
          <option>Other</option>
        </select>
      </label>

      <label htmlFor="request-message">
        Project details *
        <textarea id="request-message" name="message" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Describe the workflow, problem or product you want to build" rows="5" required />
      </label>

      <button className="button button-primary form-button" type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">→</span>
      </button>

      {status.message ? <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
