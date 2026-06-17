// Mock data for eGrowth Community

const DOMAINS = [
  { id: 'quality', label: 'Quality', color: 'brand' },
  { id: 'environment', label: 'Environment', color: 'moss' },
  { id: 'health', label: 'Health', color: 'rose' },
  { id: 'safety', label: 'Safety', color: 'amber' },
  { id: 'energy', label: 'Energy', color: 'brand' },
  { id: 'sustainability', label: 'Sustainability', color: 'moss' },
  { id: 'esg', label: 'ESG', color: 'brand' },
];

const RANK_TIERS = [
  { id: 'newbie', label: 'Newcomer',   min: 0,     className: 'rank-silver',   roman: 'I' },
  { id: 'contrib', label: 'Contributor', min: 150,  className: 'rank-bronze',   roman: 'II' },
  { id: 'mentor', label: 'Mentor',     min: 800,   className: 'rank-silver',   roman: 'III' },
  { id: 'expert', label: 'Expert',     min: 2500,  className: 'rank-gold',     roman: 'IV' },
  { id: 'leader', label: 'Leader',     min: 6000,  className: 'rank-platinum', roman: 'V' },
  { id: 'luminary', label: 'Luminary', min: 12000, className: 'rank-luminary', roman: 'VI' },
];

function getTier(points) {
  let t = RANK_TIERS[0];
  for (const tier of RANK_TIERS) if (points >= tier.min) t = tier;
  return t;
}

const USERS = [
  {
    id: 'me',
    name: 'Ananya Ramaswamy',
    handle: 'ananya.r',
    title: 'ISO 9001 Lead Auditor · Quality Systems Consultant',
    location: 'Bengaluru, India',
    avatar: null,
    color: '#1e8a8a',
    initials: 'AR',
    reputation: 3842,
    contributions: { answers: 217, questions: 42, resources: 28, jobs: 3, endorsements: 186 },
    skills: [
      { name: 'ISO 9001',      level: 96, endorsements: 142, from: 'answers + resources' },
      { name: 'Internal Audit', level: 88, endorsements: 98, from: 'answers + webinar' },
      { name: 'APQP/PPAP',     level: 72, endorsements: 64, from: 'resources shared' },
      { name: 'Root Cause Analysis', level: 85, endorsements: 112, from: 'highly-upvoted answers' },
      { name: 'Six Sigma',     level: 68, endorsements: 54, from: 'comments + book purchase' },
      { name: 'ESG Reporting', level: 42, endorsements: 23, from: 'recently active' },
    ],
    domains: ['quality', 'esg'],
    joined: 'Mar 2024',
  },
  {
    id: 'u2',
    name: 'Nakul Rohilla',
    handle: 'nakul.r',
    title: 'HSE Manager · Mining & Heavy Industry',
    location: 'Gurugram, India',
    avatar: null,
    color: '#c2700a',
    initials: 'NR',
    reputation: 7820,
  },
  {
    id: 'u3',
    name: 'Sonu Singh',
    handle: 'sonu.s',
    title: 'Sustainability Lead · GRI Certified',
    location: 'Mumbai, India',
    avatar: null,
    color: '#4a8a5e',
    initials: 'SS',
    reputation: 11250,
  },
  {
    id: 'u4',
    name: 'Mukul Mehlawat',
    handle: 'mukul.m',
    title: 'Process Safety Engineer · Refining & Petrochem',
    location: 'Vadodara, India',
    avatar: null,
    color: '#d15667',
    initials: 'MM',
    reputation: 2140,
  },
  {
    id: 'u5',
    name: 'Manish Rohilla',
    handle: 'manish.r',
    title: 'Environmental Compliance Specialist',
    location: 'Delhi NCR, India',
    avatar: null,
    color: '#176e6e',
    initials: 'MR',
    reputation: 940,
  },
  {
    id: 'u6',
    name: 'Rohit Mehra',
    handle: 'rohit.m',
    title: 'Energy Auditor · ISO 50001 Lead',
    location: 'Pune, India',
    avatar: null,
    color: '#3d5a6d',
    initials: 'RM',
    reputation: 4600,
  },
  {
    id: 'u7',
    name: 'Linh Tran',
    handle: 'linh.t',
    title: 'CSR & ESG Analyst · Apparel Supply Chain',
    location: 'Ho Chi Minh City, Vietnam',
    avatar: null,
    color: '#8b4a1e',
    initials: 'LT',
    reputation: 1820,
  },
  {
    id: 'u8',
    name: 'Pushpender Sharma',
    handle: 'pushpender',
    title: 'Founder, eGrowth India · QEHS Trainer · Author',
    location: 'New Delhi, India',
    avatar: null,
    color: '#0e4040',
    initials: 'PS',
    reputation: 38400,
    isFounder: true,
  },
  {
    id: 'u9',
    name: 'Amit Singh',
    handle: 'amit.s',
    title: 'Co-Founder & CEO, eGrowth India',
    location: 'New Delhi, India',
    avatar: null,
    color: '#c2700a',
    initials: 'AS',
    reputation: 24600,
    isFounder: true,
  },
];

const USER_MAP = Object.fromEntries(USERS.map(u => [u.id, u]));

const FEED = [
  {
    id: 'p1',
    kind: 'question',
    author: 'u4',
    ts: '2h',
    tags: ['safety', 'process-safety'],
    title: 'How are you handling LOPA studies for legacy offshore platforms without full P&ID documentation?',
    body: 'We inherited a 1998-era platform from an acquisition and the documentation is patchy. Looking for practical approaches — has anyone reverse-engineered P&IDs from field walkdowns for LOPA? How much confidence can regulators accept?',
    counts: { upvotes: 47, answers: 12, views: 1840 },
  },
  {
    id: 'p2',
    kind: 'resource',
    author: 'u3',
    ts: '5h',
    tags: ['esg', 'sustainability', 'reporting'],
    title: 'GRI 2024 Disclosure Mapping Template — aligned with ESRS & TCFD',
    body: 'Spent the last two months mapping every GRI 2024 indicator to the corresponding ESRS data point and TCFD recommendation. Sharing the working spreadsheet — free, 43 indicators covered, formulas intact.',
    file: { type: 'xls', name: 'GRI-2024-Mapping-v3.xlsx', size: '2.1 MB' },
    counts: { upvotes: 214, downloads: 1289, comments: 38 },
  },
  {
    id: 'p3',
    kind: 'job',
    author: 'u2',
    ts: '8h',
    tags: ['health', 'safety', 'hse'],
    title: 'Senior HSE Manager — Mining Operations (Botswana)',
    body: 'Leading a team of 14 across three open-pit sites. Must have 10+ yrs in extractive industries, NEBOSH Diploma, experience with ICMM principles. Competitive expat package, 6/2 rotation.',
    company: 'Kopano Resources',
    location: 'Selebi-Phikwe, Botswana',
    salary: 'USD 140–180K + package',
    counts: { applications: 23, views: 892, saves: 67 },
  },
  {
    id: 'p4',
    kind: 'request',
    author: 'u5',
    ts: '11h',
    tags: ['environment', 'compliance'],
    title: 'Looking for UAE Cabinet Decision 37/2001 implementation guide',
    body: 'Specifically for cement manufacturing — stack emission limits and monitoring frequency. Has anyone got a practical checklist they\'ve used? Happy to share my own water-quality one in return.',
    counts: { responses: 5, upvotes: 14 },
  },
  {
    id: 'p5',
    kind: 'event',
    author: 'u8',
    ts: '1d',
    tags: ['training', 'webinar', 'quality'],
    title: '🎙️ Free webinar: Decoding ISO 9001:2026 — What\'s Actually Changing',
    body: 'Walking through the draft revision, clause-by-clause, with practical transition checklists. 45 minutes + live Q&A. Recording sent to all registrants. 1,200+ already signed up.',
    eventDate: 'Tue, May 12 · 14:00 UTC',
    counts: { registrations: 1247, interested: 340 },
    isFounder: true,
  },
  {
    id: 'p6',
    kind: 'question',
    author: 'u6',
    ts: '1d',
    tags: ['energy', 'iso-50001'],
    title: 'Energy baseline normalization — degree-days vs. regression: which does your auditor prefer?',
    body: 'I\'ve used both for different clients. Auditors seem split. In practice, for a mixed-use facility (offices + light manufacturing), the regression approach gives a tighter fit but is harder to defend to non-technical stakeholders. Thoughts?',
    counts: { upvotes: 34, answers: 8, views: 512 },
  },
  {
    id: 'p7',
    kind: 'resource',
    author: 'me',
    ts: '2d',
    tags: ['quality', 'audit'],
    title: 'Internal Audit Question Bank — 127 questions across all ISO 9001:2015 clauses',
    body: 'Compiled from 6 years of auditing across automotive, pharma, and medical device sectors. Organized by clause, with follow-up probes and typical non-conformities flagged.',
    file: { type: 'pdf', name: 'ISO9001-Audit-Question-Bank.pdf', size: '1.8 MB' },
    counts: { upvotes: 186, downloads: 942, comments: 24 },
  },
  {
    id: 'p8',
    kind: 'job',
    author: 'u3',
    ts: '2d',
    tags: ['esg', 'sustainability'],
    title: 'ESG Reporting Analyst — Remote (APAC timezones)',
    body: 'Growing climate-tech consultancy. 3–5 yrs ESG reporting experience, GRI or SASB certification required. Supporting clients across SEA on CSRD readiness. Fully remote.',
    company: 'GreenArc Advisory',
    location: 'Remote (Singapore / Manila / HCMC)',
    salary: 'USD 65–85K',
    counts: { applications: 41, views: 1204, saves: 89 },
  },
  {
    id: 'p9',
    kind: 'question',
    author: 'u7',
    ts: '3d',
    tags: ['esg', 'supply-chain', 'apparel'],
    title: 'How do you handle Scope 3 Category 1 data from tier-3 fabric mills that won\'t respond?',
    body: 'Our top-tier suppliers are engaged, but we can only trace 40% of fabric to specific mills, and of those, ~15% respond to data requests. Using spend-based for the rest feels weak. Any creative approaches working for you?',
    counts: { upvotes: 28, answers: 11, views: 680 },
  },
];

const RESOURCES_LIBRARY = [
  { id: 'r1', title: 'GRI 2024 Disclosure Mapping Template', type: 'xls', tags: ['esg', 'reporting'], size: '2.1 MB', downloads: 1289, uploadedBy: 'u3', ts: '5h' },
  { id: 'r2', title: 'ISO 9001 Internal Audit Question Bank', type: 'pdf', tags: ['quality', 'audit'], size: '1.8 MB', downloads: 942, uploadedBy: 'me', ts: '2d' },  { id: 'r3', title: 'LOTO Procedure Template — Manufacturing', type: 'doc', tags: ['safety'], size: '180 KB', downloads: 2104, uploadedBy: 'u2', ts: '1w' },
  { id: 'r4', title: 'GHG Inventory Calculator — Scope 1, 2, 3', type: 'xls', tags: ['environment', 'esg'], size: '3.4 MB', downloads: 3560, uploadedBy: 'u3', ts: '2w' },
  { id: 'r5', title: 'Incident Investigation — TapRooT Deck', type: 'ppt', tags: ['safety', 'health'], size: '5.2 MB', downloads: 867, uploadedBy: 'u4', ts: '3w' },
  { id: 'r6', title: 'ISO 14001 Gap Assessment Workbook', type: 'xls', tags: ['environment'], size: '890 KB', downloads: 1420, uploadedBy: 'u5', ts: '3w' },
  { id: 'r7', title: 'Energy Audit Report — ISO 50001 Template', type: 'doc', tags: ['energy'], size: '620 KB', downloads: 734, uploadedBy: 'u6', ts: '1mo' },
  { id: 'r8', title: 'CSRD Readiness Checklist (v2)', type: 'pdf', tags: ['esg', 'sustainability'], size: '1.2 MB', downloads: 2890, uploadedBy: 'u7', ts: '1mo' },
  { id: 'r9', title: 'Process Hazard Analysis — HAZOP Workbook', type: 'xls', tags: ['safety'], size: '1.5 MB', downloads: 1106, uploadedBy: 'u4', ts: '1mo' },
  { id: 'r10', title: 'ESG Materiality Assessment Playbook', type: 'ppt', tags: ['esg'], size: '8.1 MB', downloads: 1934, uploadedBy: 'u3', ts: '2mo' },
  { id: 'r11', title: 'APQP Phase Gate Review Pack', type: 'zip', tags: ['quality'], size: '14 MB', downloads: 640, uploadedBy: 'me', ts: '2mo' },
  { id: 'r12', title: 'Water Stewardship KPIs — AWS aligned', type: 'pdf', tags: ['environment', 'sustainability'], size: '920 KB', downloads: 512, uploadedBy: 'u5', ts: '2mo' },
];

const JOBS = [
  { id: 'j1', title: 'Senior HSE Manager — Mining Operations', company: 'Kopano Resources', location: 'Selebi-Phikwe, Botswana', salary: 'USD 140–180K', remote: false, tags: ['safety', 'health'], postedBy: 'u2', ts: '8h', applications: 23, saves: 67 },
  { id: 'j2', title: 'ESG Reporting Analyst (Remote APAC)', company: 'GreenArc Advisory', location: 'Remote · SG / MNL / HCMC', salary: 'USD 65–85K', remote: true, tags: ['esg'], postedBy: 'u3', ts: '2d', applications: 41, saves: 89 },
  { id: 'j3', title: 'Head of Sustainability', company: 'Vantara Textiles', location: 'Coimbatore, India', salary: 'INR 45–60L', remote: false, tags: ['sustainability', 'esg'], postedBy: 'u3', ts: '3d', applications: 18, saves: 32 },
  { id: 'j4', title: 'Lead Quality Auditor — Medical Devices', company: 'NovaDiagnostics', location: 'Munich, Germany', salary: 'EUR 85–100K', remote: false, tags: ['quality'], postedBy: 'u6', ts: '4d', applications: 12, saves: 24 },
  { id: 'j5', title: 'Energy Manager — Data Centers', company: 'Nebula Infra', location: 'Dublin, Ireland', salary: 'EUR 90–110K', remote: false, tags: ['energy'], postedBy: 'u6', ts: '5d', applications: 27, saves: 56 },
  { id: 'j6', title: 'Environmental Compliance Coordinator', company: 'GulfTech Industries', location: 'Abu Dhabi, UAE', salary: 'AED 25–32K/mo', remote: false, tags: ['environment'], postedBy: 'u5', ts: '6d', applications: 34, saves: 45 },
  { id: 'j7', title: 'CSR Manager — Apparel Supply Chain', company: 'Ethical Weave Co.', location: 'HCMC, Vietnam', salary: 'USD 55–70K', remote: false, tags: ['esg', 'sustainability'], postedBy: 'u7', ts: '1w', applications: 9, saves: 18 },
];

const EVENTS = [
  { id: 'e1', title: 'Decoding ISO 9001:2026', kind: 'Webinar · Free', date: 'May 12', price: 'Free', registered: 1247, host: 'Pushpender Sharma' },
  { id: 'e2', title: 'ESG Report Writing Masterclass', kind: '4-week cohort', date: 'Starts Jun 3', price: '$149', registered: 82, host: 'Pushpender Sharma' },
  { id: 'e3', title: 'Lead Auditor Handbook (2026 ed.)', kind: 'Book launch', date: 'Launching May 20', price: 'Pre-order $28', registered: 340, host: 'Pushpender Sharma' },
];

const TOP_CONTRIBUTORS = [
  { id: 'u8', delta: '+240 this week' },
  { id: 'u3', delta: '+180 this week' },
  { id: 'u2', delta: '+124 this week' },
  { id: 'u6', delta: '+96 this week' },
  { id: 'me', delta: '+72 this week' },
];

const TRENDING_TAGS = [
  { tag: 'iso-9001', posts: 342 },
  { tag: 'esg-reporting', posts: 286 },
  { tag: 'lopa', posts: 47 },
  { tag: 'csrd', posts: 198 },
  { tag: 'scope-3', posts: 124 },
  { tag: 'process-safety', posts: 86 },
  { tag: 'iso-14001', posts: 215 },
];

// ───── Reels / Knowledge Bytes ────────────────────────────────────────────
const REELS = [
  { id: 'rl1', author: 'u8', duration: '0:47', title: '3 ways to defend an OFI vs an NC during certification audit', tags: ['quality', 'audit'],
    plays: 14820, likes: 1240, comments: 89, saves: 412,
    gradient: 'linear-gradient(135deg, #0e4040 0%, #1e8a8a 60%, #e08a14 100%)',
    caption: 'Stop arguing with auditors. Use this 3-question framework instead. 👇' },
  { id: 'rl2', author: 'u3', duration: '1:14', title: 'Scope 3 Category 1 in 90 seconds — the spend-based shortcut that works', tags: ['esg', 'scope-3'],
    plays: 28940, likes: 2180, comments: 156, saves: 890,
    gradient: 'linear-gradient(135deg, #2d5a3d 0%, #4a8a5e 60%, #f0a23c 100%)',
    caption: 'When suppliers ghost you, here\'s the EPA-approved fallback.' },
  { id: 'rl3', author: 'u2', duration: '0:58', title: 'LOTO violations I see every single audit — and the 1 fix', tags: ['safety', 'loto'],
    plays: 9230, likes: 780, comments: 42, saves: 234,
    gradient: 'linear-gradient(135deg, #b84557 0%, #d15667 60%, #f7bf6e 100%)',
    caption: 'If your team does ANY of these 4 things, stop work today.' },
  { id: 'rl4', author: 'u6', duration: '1:32', title: 'Energy baseline regression — when to use what (with real numbers)', tags: ['energy', 'iso-50001'],
    plays: 6420, likes: 510, comments: 31, saves: 198,
    gradient: 'linear-gradient(135deg, #125656 0%, #3eaaaa 60%, #b8e2e2 100%)',
    caption: 'Watched 50 audits. Here\'s the regression vs degree-day verdict.' },
  { id: 'rl5', author: 'u9', duration: '0:38', title: 'My non-negotiables when hiring a Quality Manager', tags: ['quality', 'careers'],
    plays: 18200, likes: 1640, comments: 234, saves: 567,
    gradient: 'linear-gradient(135deg, #c2700a 0%, #e08a14 60%, #fdeccb 100%)',
    caption: 'Skip these 3 things → never call them back. 🎯' },
  { id: 'rl6', author: 'u4', duration: '1:08', title: 'HAZOP node walkthrough — live, on a real P&ID', tags: ['safety', 'hazop'],
    plays: 4810, likes: 420, comments: 28, saves: 167,
    gradient: 'linear-gradient(135deg, #3d5a6d 0%, #5b6b82 60%, #d0d5dd 100%)',
    caption: 'No theory. Real refinery node, 60 seconds, every step.' },
];

// ───── Posters ────────────────────────────────────────────────────────────
const POSTERS = [
  { id: 'po1', title: 'The 5 Steps of LOTO',     domain: 'safety',       downloads: 8420, lang: ['EN', 'HI', 'AR', 'ES'], bg: '#b84557', accent: '#fdeccb', icon: '⚡', kind: 'A3 · Print' },
  { id: 'po2', title: 'Hierarchy of Controls',   domain: 'safety',       downloads: 14210, lang: ['EN', 'HI', 'ZH'], bg: '#c2700a', accent: '#fef7ea', icon: '⬡', kind: 'A2 · Print' },
  { id: 'po3', title: 'PPE Compliance — Visual', domain: 'health',       downloads: 6890, lang: ['EN', 'HI'], bg: '#0e4040', accent: '#f0a23c', icon: '👷', kind: 'A4 · Display' },
  { id: 'po4', title: 'GRI to ESRS Map',         domain: 'esg',          downloads: 3210, lang: ['EN'], bg: '#2d5a3d', accent: '#dcefe2', icon: '📊', kind: 'A1 · Wall chart' },
  { id: 'po5', title: 'Incident Reporting Flow', domain: 'safety',       downloads: 5420, lang: ['EN', 'HI', 'AR'], bg: '#176e6e', accent: '#b8e2e2', icon: '🚨', kind: 'A3 · Print' },
  { id: 'po6', title: 'Spill Response in 6 Steps', domain: 'environment', downloads: 4180, lang: ['EN', 'HI'], bg: '#4a8a5e', accent: '#dcefe2', icon: '💧', kind: 'A3 · Print' },
  { id: 'po7', title: 'PDCA Cycle for Audits',   domain: 'quality',      downloads: 7240, lang: ['EN'], bg: '#125656', accent: '#fdeccb', icon: '↻', kind: 'A4 · Office' },
  { id: 'po8', title: 'Energy Conservation Wins',domain: 'energy',       downloads: 2890, lang: ['EN', 'HI'], bg: '#1e8a8a', accent: '#f7bf6e', icon: '⚡', kind: 'A2 · Display' },
];

// ───── LMS — Courses ──────────────────────────────────────────────────────
const COURSES = [
  { id: 'c1', title: 'ISO 9001:2015 Lead Auditor (CQI/IRCA Aligned)',
    instructor: 'u8', tag: 'quality',
    level: 'Advanced', duration: '40 hrs · 5 weeks', modules: 12, lessons: 64,
    enrolled: 3240, rating: 4.9, certificate: true,
    price: '₹14,999', original: '₹24,999',
    cohort: 'Next cohort: Jun 3', spots: '8 of 30 left',
    thumb: 'linear-gradient(135deg, #0e4040, #1e8a8a, #e08a14)',
    desc: 'CQI/IRCA-aligned curriculum. Live online sessions, 4 practical audits, capstone project on a real organization. Certificate accepted by 200+ employers in India and GCC.',
    badges: ['CQI/IRCA aligned', 'Live cohort', 'Certificate'] },
  { id: 'c2', title: 'ESG Reporting Masterclass — GRI · ESRS · BRSR',
    instructor: 'u3', tag: 'esg',
    level: 'Intermediate', duration: '24 hrs · 4 weeks', modules: 8, lessons: 42,
    enrolled: 1820, rating: 4.8, certificate: true,
    price: '₹9,999', original: '₹14,999',
    cohort: 'Self-paced + live Q&A',
    thumb: 'linear-gradient(135deg, #2d5a3d, #4a8a5e, #f0a23c)',
    desc: 'Map any framework to any other. Build a board-ready ESG report in 4 weeks. Includes BRSR Core compliance for Indian listed entities.',
    badges: ['BRSR Core', 'Live Q&A', 'Templates included'] },
  { id: 'c3', title: 'NEBOSH IGC — International General Certificate',
    instructor: 'u2', tag: 'safety',
    level: 'Foundational', duration: '80 hrs · 8 weeks', modules: 11, lessons: 96,
    enrolled: 4890, rating: 4.7, certificate: true,
    price: '₹39,999', original: '₹54,999',
    cohort: 'Next: May 28 · Hybrid (Delhi)',
    thumb: 'linear-gradient(135deg, #c2700a, #e08a14, #fdeccb)',
    desc: 'Full prep for NEBOSH IGC Unit 1 & 2. Mock exams, on-site visit, exam-day support. 92% first-attempt pass rate.',
    badges: ['NEBOSH official', '92% pass rate', 'Mocks included'] },
  { id: 'c4', title: 'ISO 14001:2015 Internal Auditor',
    instructor: 'u5', tag: 'environment',
    level: 'Intermediate', duration: '16 hrs · 2 weeks', modules: 6, lessons: 28,
    enrolled: 1240, rating: 4.6, certificate: true,
    price: '₹4,999',
    cohort: 'Self-paced',
    thumb: 'linear-gradient(135deg, #176e6e, #3eaaaa, #b8e2e2)',
    desc: 'Internal audit competency for EMS. Practical checklist building, finding writing, opening/closing meeting rehearsal.',
    badges: ['Self-paced', 'Certificate'] },
  { id: 'c5', title: 'Energy Manager (BEE) Exam Prep',
    instructor: 'u6', tag: 'energy',
    level: 'Advanced', duration: '60 hrs · 12 weeks', modules: 14, lessons: 78,
    enrolled: 920, rating: 4.8, certificate: true,
    price: '₹19,999',
    cohort: 'Next batch: Jul 1',
    thumb: 'linear-gradient(135deg, #125656, #1e8a8a, #b8e2e2)',
    desc: 'BEE Energy Manager / Auditor exam preparation. Paper-wise mock tests, numerical labs, industry visits.',
    badges: ['BEE aligned', 'Industry visits'] },
  { id: 'c6', title: 'Six Sigma Green Belt — Manufacturing Focus',
    instructor: 'me', tag: 'quality',
    level: 'Intermediate', duration: '32 hrs · 6 weeks', modules: 10, lessons: 54,
    enrolled: 2140, rating: 4.7, certificate: true,
    price: '₹7,999',
    cohort: 'Self-paced + project review',
    thumb: 'linear-gradient(135deg, #344054, #5b6b82, #d0d5dd)',
    desc: 'DMAIC end-to-end with a real plant project. Minitab walkthroughs. Green Belt project review and certification by industry assessor.',
    badges: ['Project-based', 'Industry assessor'] },
];

// ───── LMS — My learning ──────────────────────────────────────────────────
const MY_LEARNING = [
  { courseId: 'c1', progress: 64, lastLesson: 'Module 8: Audit Reporting & Follow-Up', nextLive: 'Tomorrow · 19:00 IST' },
  { courseId: 'c2', progress: 22, lastLesson: 'Module 2: Materiality Assessment in Practice', nextLive: null },
];

const MY_CERTS = [
  { id: 'cert1', course: 'ISO 9001:2015 Awareness', issued: 'Aug 2024', verified: true },
  { id: 'cert2', course: 'Six Sigma White Belt', issued: 'Nov 2024', verified: true },
];

// ───── Quizzes — gamified MCQ knowledge checks ────────────────────────────
const QUIZ_CATEGORIES = [
  { id: 'iso9001', label: 'ISO 9001:2015', domain: 'quality',       color: '#1e8a8a', icon: '◆', quizzes: 14, takenBy: 8420, avg: 72 },
  { id: 'iso14001', label: 'ISO 14001:2015', domain: 'environment', color: '#4a8a5e', icon: '🌿', quizzes: 9,  takenBy: 4120, avg: 68 },
  { id: 'iso45001', label: 'ISO 45001 (OHS)', domain: 'safety',      color: '#d15667', icon: '⛑', quizzes: 12, takenBy: 6240, avg: 75 },
  { id: 'iso50001', label: 'ISO 50001 (Energy)', domain: 'energy',   color: '#3eaaaa', icon: '⚡', quizzes: 7,  takenBy: 2180, avg: 64 },
  { id: 'nebosh', label: 'NEBOSH IGC Prep', domain: 'safety',        color: '#c2700a', icon: '🛡', quizzes: 18, takenBy: 9230, avg: 70 },
  { id: 'gri', label: 'GRI Standards',   domain: 'esg',              color: '#176e6e', icon: '📊', quizzes: 8,  takenBy: 3140, avg: 66 },
  { id: 'esrs', label: 'ESRS / CSRD',    domain: 'esg',              color: '#2d5a3d', icon: '🇪🇺', quizzes: 6,  takenBy: 1820, avg: 58 },
  { id: 'brsr', label: 'BRSR Core (India)', domain: 'esg',           color: '#c2700a', icon: '🇮🇳', quizzes: 5,  takenBy: 1240, avg: 60 },
  { id: 'sixsigma', label: 'Six Sigma Green Belt', domain: 'quality', color: '#475467', icon: '6σ', quizzes: 10, takenBy: 5420, avg: 71 },
  { id: 'rca', label: 'Root Cause Analysis', domain: 'quality',       color: '#3d5a6d', icon: '↳', quizzes: 6,  takenBy: 2890, avg: 74 },
  { id: 'hazop', label: 'HAZOP & Process Safety', domain: 'safety',   color: '#b84557', icon: '⚠', quizzes: 8,  takenBy: 1820, avg: 62 },
  { id: 'fmea', label: 'FMEA',  domain: 'quality',                    color: '#1e8a8a', icon: '⊕', quizzes: 5,  takenBy: 2140, avg: 70 },
];

const SAMPLE_QUIZ = {
  id: 'iso9001-clause9',
  category: 'iso9001',
  title: 'ISO 9001:2015 — Clause 9: Performance Evaluation',
  level: 'Intermediate',
  duration: '12 min',
  questions: 10,
  reward: 80,
  badge: 'Audit Acolyte',
  items: [
    {
      q: 'According to ISO 9001:2015, what is the PRIMARY purpose of internal audits (Clause 9.2)?',
      options: [
        'To check that employees are following procedures correctly',
        'To determine whether the QMS conforms to the organization\'s own requirements and the requirements of ISO 9001, and is effectively implemented and maintained',
        'To prepare staff for the external certification audit',
        'To identify non-conforming product before customer delivery',
      ],
      correct: 1,
      explain: 'Clause 9.2.1 explicitly states audits determine conformity to BOTH the organization\'s own requirements AND ISO 9001 requirements, and whether the QMS is effectively implemented and maintained — not just procedure following or audit prep.',
    },
    {
      q: 'How frequently must Management Review be conducted under ISO 9001:2015?',
      options: ['Quarterly', 'Annually', 'At planned intervals — frequency is not prescribed by the standard', 'Every 3 years before recertification'],
      correct: 2,
      explain: 'Clause 9.3.1 requires reviews "at planned intervals" — the standard intentionally does not fix a frequency. Most organizations choose annual or semi-annual, but the timing must be appropriate to the organization\'s context.',
    },
    {
      q: 'Which of the following is NOT a mandatory input to Management Review per Clause 9.3.2?',
      options: [
        'The status of actions from previous management reviews',
        'Changes in external and internal issues relevant to the QMS',
        'The financial performance of the organization',
        'The adequacy of resources',
      ],
      correct: 2,
      explain: 'Financial performance is NOT a required input per Clause 9.3.2. While organizations may include it voluntarily, the mandatory inputs focus on QMS-specific items: previous actions, context changes, QMS performance, resources, action effectiveness, and improvement opportunities.',
    },
  ],
};

const QUIZ_LEADERBOARD = [
  { rank: 1, userId: 'u3', score: 4280, quizzes: 47, badges: 18 },
  { rank: 2, userId: 'u8', score: 3920, quizzes: 42, badges: 16 },
  { rank: 3, userId: 'u2', score: 3140, quizzes: 38, badges: 14 },
  { rank: 4, userId: 'u6', score: 2890, quizzes: 31, badges: 12 },
  { rank: 5, userId: 'me', score: 2240, quizzes: 26, badges: 9 },
  { rank: 6, userId: 'u4', score: 1820, quizzes: 22, badges: 8 },
  { rank: 7, userId: 'u9', score: 1640, quizzes: 19, badges: 7 },
];

const QUIZ_BADGES = [
  { id: 'b1', name: 'Audit Acolyte', earned: true, rarity: 'Common',  icon: '🎯', desc: 'Pass 5 ISO 9001 quizzes' },
  { id: 'b2', name: 'Risk Master',   earned: true, rarity: 'Rare',    icon: '🧠', desc: 'Score 90%+ on any HAZOP quiz' },
  { id: 'b3', name: 'ESG Voyager',   earned: true, rarity: 'Common',  icon: '🌍', desc: 'Complete the ESG starter pack' },
  { id: 'b4', name: 'Streak: 7 days', earned: true, rarity: 'Common',  icon: '🔥', desc: '7 consecutive days of activity' },
  { id: 'b5', name: 'Streak: 30 days', earned: false, rarity: 'Rare', icon: '🔥', desc: '30 consecutive days of activity' },
  { id: 'b6', name: 'Quiz Perfectionist', earned: false, rarity: 'Epic',  icon: '💯', desc: 'Score 100% on 10 different quizzes' },
  { id: 'b7', name: 'Polyglot Auditor', earned: false, rarity: 'Rare', icon: '🌐', desc: 'Pass quizzes in 5 different standards' },
  { id: 'b8', name: 'NEBOSH Sharpshooter', earned: true, rarity: 'Rare', icon: '🛡', desc: '85%+ on all NEBOSH IGC mocks' },
  { id: 'b9', name: 'Sustainability Sage', earned: false, rarity: 'Legendary', icon: '👑', desc: 'Top 10 on global ESG leaderboard' },
];

// ───── Daily challenges ───────────────────────────────────────────────────
const DAILY_CHALLENGES = [
  { id: 'd1', title: 'Answer 3 questions in your domain', reward: 50, progress: 1, total: 3 },
  { id: 'd2', title: 'Take 1 quiz today',                 reward: 30, progress: 0, total: 1 },
  { id: 'd3', title: 'Save or share 2 resources',          reward: 20, progress: 2, total: 2, done: true },
];

// ───── Expanded resources — all file types + external links + YouTube ─────
const EXPANDED_RESOURCES = [
  { id: 'r13', title: 'Internal Audit Walkthrough — full video tutorial', type: 'yt', source: 'youtube', externalUrl: 'https://youtu.be/abc123', videoId: 'iso9001-audit', duration: '42 min', views: 18420, tags: ['quality', 'audit'], uploadedBy: 'u8', ts: '3d' },
  { id: 'r14', title: 'CSRD Implementation Toolkit (Drive)',  type: 'drive', source: 'gdrive', externalUrl: 'https://drive.google.com/...', tags: ['esg'], downloads: 2340, uploadedBy: 'u3', ts: '5d', size: 'Drive folder · 28 files' },
  { id: 'r15', title: 'NEBOSH Past Papers (2020-2024) — SharePoint', type: 'sharepoint', source: 'sharepoint', externalUrl: 'https://...sharepoint.com/...', tags: ['safety'], downloads: 4820, uploadedBy: 'u2', ts: '1w', size: 'SharePoint · 480 MB' },
  { id: 'r16', title: 'Keynote — Sustainability Strategy 2030', type: 'key', tags: ['esg', 'sustainability'], downloads: 612, uploadedBy: 'u3', ts: '1w', size: '14.2 MB' },
  { id: 'r17', title: 'Pages — Audit Findings Letter Template',  type: 'pages', tags: ['quality'], downloads: 248, uploadedBy: 'me', ts: '2w', size: '320 KB' },
  { id: 'r18', title: 'Numbers — Energy Tracking Dashboard',     type: 'numbers', tags: ['energy'], downloads: 412, uploadedBy: 'u6', ts: '2w', size: '1.8 MB' },
  { id: 'r19', title: 'PPTX — HSE Onboarding Deck (32 slides)',  type: 'pptx', tags: ['safety', 'health'], downloads: 3240, uploadedBy: 'u2', ts: '3w', size: '12 MB' },
  { id: 'r20', title: 'DOCX — Quality Manual Template (ISO 9001 ready)', type: 'docx', tags: ['quality'], downloads: 5680, uploadedBy: 'me', ts: '1mo', size: '480 KB' },
  { id: 'r21', title: 'XLSX — RACI Matrix Builder',               type: 'xlsx', tags: ['quality'], downloads: 1820, uploadedBy: 'u8', ts: '1mo', size: '120 KB' },
  { id: 'r22', title: 'ZIP — Complete BRSR Reporting Bundle (12 templates)', type: 'zip', tags: ['esg', 'brsr'], downloads: 942, uploadedBy: 'u3', ts: '1mo', size: '38 MB' },
];

Object.assign(window, {
  DOMAINS, RANK_TIERS, getTier,
  USERS, USER_MAP, FEED,
  RESOURCES_LIBRARY, JOBS, EVENTS,
  TOP_CONTRIBUTORS, TRENDING_TAGS,
  REELS, POSTERS, COURSES, MY_LEARNING, MY_CERTS,
  QUIZ_CATEGORIES, SAMPLE_QUIZ, QUIZ_LEADERBOARD, QUIZ_BADGES,
  DAILY_CHALLENGES, EXPANDED_RESOURCES,
});
