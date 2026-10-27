export const RELEASE_STATUS = Object.freeze({
  live: 'Live product',
  certified: 'Certified',
  validation: 'In validation',
  planned: 'Planned',
  assisted: 'Assisted',
  beta: 'Beta',
});

export const PRODUCT_RELEASES = Object.freeze([
  Object.freeze({ id: 'capdent', status: 'live' }),
  Object.freeze({ id: 'builder', status: 'validation' }),
  Object.freeze({ id: 'tools', status: 'beta' }),
  Object.freeze({ id: 'assisted', status: 'assisted' }),
]);

export const INDUSTRY_RELEASES = Object.freeze([
  Object.freeze({
    id: 'clinic-dental',
    name: 'Dental clinics',
    status: 'certified',
    description: 'Twenty compatibility-locked directions with treatment discovery, factual trust and appointment journeys.',
  }),
  Object.freeze({
    id: 'clinic-physiotherapy',
    name: 'Physiotherapy clinics',
    status: 'certified',
    description: 'Twenty movement-led directions with six-page care journeys, responsive evidence, supplied-logo preservation and a separate certified runtime.',
  }),
  Object.freeze({
    id: 'restaurant-restaurant',
    name: 'Restaurants',
    status: 'certified',
    description: 'Twenty table-editorial directions across six routes, with a fact-bound HTML menu, visit details and reservation requests.',
  }),
  Object.freeze({
    id: 'restaurant-cafe',
    name: 'Cafés',
    status: 'planned',
    description: 'A lighter menu, directions and order-enquiry system—not a recoloured restaurant or clinic site.',
  }),
  Object.freeze({
    id: 'corporate-consulting',
    name: 'Consulting',
    status: 'planned',
    description: 'A trust-led B2B enquiry journey with evidence-safe proof and no invented clients or outcomes.',
  }),
]);

export const TOOL_RELEASES = Object.freeze([
  Object.freeze({
    id: 'seo',
    name: 'SEO Studio',
    href: 'https://tools.micirql.com/tools/seo/',
    status: 'beta',
    description: 'Inspect metadata, headings, canonical URLs and indexing directives.',
  }),
  Object.freeze({
    id: 'qa',
    name: 'QA Testing Lab',
    href: 'https://tools.micirql.com/tools/qa/',
    status: 'beta',
    description: 'Check forms, links, navigation and important user journeys.',
  }),
  Object.freeze({
    id: 'ui-ux',
    name: 'UI/UX Inspector',
    href: 'https://tools.micirql.com/tools/ui-ux/',
    status: 'beta',
    description: 'Review typography, spacing, contrast and visual hierarchy.',
  }),
]);

export const CAPABILITY_RELEASES = Object.freeze([
  Object.freeze({
    name: 'Certified Dental generation',
    status: 'certified',
    description: 'Business brief, 20 ranked directions, responsive previews and exact supplied facts and brand input.',
  }),
  Object.freeze({
    name: 'Certified Physiotherapy generation',
    status: 'certified',
    description: 'Business brief, six-page care anatomy, 20 ranked directions, responsive previews and evidence-safe appointment requests.',
  }),
  Object.freeze({
    name: 'Certified Restaurant generation',
    status: 'certified',
    description: 'Twenty ranked directions, six routes and fact-bound menu, visit, story and reservation-request content.',
  }),
  Object.freeze({
    name: 'Builder product workflow',
    status: 'validation',
    description: 'Authentication, business brief, dashboard, design review, editor interactions and publish readiness pass local gates; deployed commercial operation remains in validation.',
  }),
  Object.freeze({
    name: 'Publishing, export and private media',
    status: 'validation',
    description: 'Publish, export, the durable private upload-to-render path, and Dental cross-surface gates pass locally; deployment verification and commercial release remain.',
  }),
  Object.freeze({
    name: 'Custom backend and product work',
    status: 'assisted',
    description: 'Scoped separately with MiCirql; it is not presented as an automatic self-serve Builder capability.',
  }),
]);
