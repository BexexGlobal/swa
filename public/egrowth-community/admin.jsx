// Admin Dashboard + Public Profile + Onboarding Tour

// ───────────────────────────────────────────────────────────────────────
//   ADMIN DASHBOARD
// ───────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [tab, setTab] = React.useState('overview');
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', padding: '3px 10px', background: 'var(--rose-100)', color: 'var(--rose-600)', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            <Icon name="settings" size={11} /> Admin · Founders only
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Mission Control</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Health of the community at a glance. Reports, content, members, and platform metrics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" data-action="admin-export-metrics"><Icon name="download" size={14} /> Export</button>
          <button className="btn btn-primary" data-action="admin-broadcast"><Icon name="bell" size={14} /> Broadcast</button>
        </div>
      </div>

      <div className="tabs" style={{ marginTop: 22 }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'reports', label: 'Moderation queue', count: 14 },
          { id: 'content', label: 'Content', count: '4.2K' },
          { id: 'members', label: 'Members', count: '48K' },
          { id: 'finance', label: 'Finance', count: '.com' },
          { id: 'experiments', label: 'A/B Experiments', count: 4 },
          { id: 'system', label: 'System health' },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} data-action={`admin-tab-${t.id}`}>
            {t.label}{t.count != null && <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 10 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === 'overview' && <AdminOverview />}
      {tab === 'reports' && <ModerationQueue />}
      {tab === 'content' && <ContentManagement />}
      {tab === 'members' && <MemberManagement />}
      {tab === 'finance' && <FinanceTab />}
      {tab === 'experiments' && <ExperimentsTab />}
      {tab === 'system' && <SystemHealth />}
    </div>
  );
};

const AdminOverview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {/* Top KPIs */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      <KPI label="Daily Active" value="12,420" delta="+8.2%" trend="up" />
      <KPI label="New signups today" value="187" delta="+23%" trend="up" />
      <KPI label="REPO earned today" value="48,200" delta="+5.4%" trend="up" />
      <KPI label="Open reports" value="14" delta="-3 since yesterday" trend="down" goodDown />
    </div>

    {/* Live activity feed + chart */}
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15 }}>Daily activity · last 14 days</h3>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <Legend dot="var(--brand-600)" label="Posts" />
            <Legend dot="var(--amber-500)" label="Answers" />
            <Legend dot="var(--moss-500)" label="Resources" />
            <Legend dot="var(--rose-500)" label="Reports" />
          </div>
        </div>
        <MockChart />
      </div>

      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 15, marginBottom: 14 }}>Live now</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { actor: 'u3', text: 'shared a resource: "BRSR Core checklist"', ts: '12s ago', kind: 'r' },
            { actor: 'u2', text: 'answered a question on LOPA studies', ts: '38s ago', kind: 'a' },
            { actor: 'u6', text: 'started a Quiz Arena session', ts: '1m ago', kind: 'q' },
            { actor: 'u7', text: 'joined Country Chapter — Vietnam', ts: '2m ago', kind: 'j' },
            { actor: 'u4', text: 'reported a comment (Misinformation)', ts: '3m ago', kind: 'f' },
          ].map((a, i) => {
            const u = USER_MAP[a.actor];
            return (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12 }}>
                <Avatar user={u} size={26} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--text)' }}>
                    <strong>{u.name}</strong> {a.text}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{a.ts}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Pulse — community health indicators */}
    <div className="card" style={{ padding: 22 }}>
      <h3 style={{ fontSize: 15, marginBottom: 16 }}>Community pulse</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <PulseCell title="Answer quality" score={87} delta="+2" desc="Avg upvotes per answer is trending up" />
        <PulseCell title="Response time" score={92} delta="+5" desc="Median: 47 min to first answer" />
        <PulseCell title="Toxicity (lower is better)" score={6} bad delta="-1" desc="Reports stable, mostly off-topic" />
        <PulseCell title="Founder visibility" score={68} delta="-3" desc="Less founder content this week" warn />
        <PulseCell title=".com handoff completion" score={73} delta="+8" desc="73% of paid CTAs convert to purchase" />
        <PulseCell title="Domain spread" score={84} delta="0" desc="Healthy mix across QEHS + ESG" />
      </div>
    </div>

    {/* Geo map (mock) */}
    <div className="card" style={{ padding: 22 }}>
      <h3 style={{ fontSize: 15, marginBottom: 16 }}>Members by country (this month)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, fontSize: 13 }}>
        {[
          ['🇮🇳 India', '18,420', 96, '+1.2K'],
          ['🇺🇸 USA', '3,920', 21, '+180'],
          ['🇪🇺 EU', '4,620', 24, '+220'],
          ['🇦🇪 UAE', '4,820', 25, '+340'],
          ['🇬🇧 UK', '2,840', 15, '+90'],
          ['🇸🇬 Singapore', '3,140', 16, '+110'],
          ['🇿🇦 S. Africa', '1,820', 10, '+60'],
          ['🇧🇷 Brazil', '1,240', 6, '+40'],
          ['🇦🇺 Australia', '1,120', 6, '+30'],
        ].map(([n, c, pct, delta]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ flex: 1 }}>{n}</span>
            <span className="mono" style={{ fontWeight: 600 }}>{c}</span>
            <span style={{ width: 80, height: 6, background: 'var(--ink-150)', borderRadius: 3, overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', width: `${pct}%`, background: 'var(--brand-500)' }} />
            </span>
            <span style={{ width: 50, fontSize: 11, color: 'var(--moss-700)', textAlign: 'right' }}>{delta}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const KPI = ({ label, value, delta, trend, goodDown }) => {
  const good = trend === 'up' ? !goodDown : goodDown;
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
      <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: 'var(--brand-800)', marginTop: 4, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: good ? 'var(--moss-700)' : 'var(--rose-600)', fontWeight: 600, marginTop: 6 }}>
        {trend === 'up' ? '↑' : '↓'} {delta}
      </div>
    </div>
  );
};

const Legend = ({ dot, label }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
    <span style={{ width: 8, height: 8, background: dot, borderRadius: '50%' }} />
    {label}
  </span>
);

const PulseCell = ({ title, score, delta, desc, bad, warn }) => (
  <div style={{ padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{delta}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
      <span className="mono" style={{ fontSize: 24, fontWeight: 700, color: bad ? 'var(--rose-600)' : warn ? 'var(--amber-600)' : 'var(--moss-700)' }}>{score}</span>
      <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{bad ? 'incidents/1K posts' : '/ 100'}</span>
    </div>
    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{desc}</div>
  </div>
);

const MockChart = () => {
  const series = {
    posts:     [52, 48, 60, 58, 72, 65, 55, 68, 78, 82, 76, 88, 92, 86],
    answers:   [82, 78, 90, 88, 100, 96, 85, 92, 110, 118, 105, 124, 132, 128],
    resources: [12, 14, 18, 10, 22, 18, 15, 24, 28, 22, 26, 32, 28, 34],
    reports:   [2, 1, 3, 2, 4, 1, 2, 2, 3, 1, 2, 3, 1, 2],
  };
  const colors = { posts: '#176e6e', answers: '#e08a14', resources: '#4a8a5e', reports: '#d15667' };
  const max = 140;
  const W = 580, H = 180;
  const step = W / (series.posts.length - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H }}>
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map(p => (
        <line key={p} x1={0} y1={H * p} x2={W} y2={H * p} stroke="var(--border)" strokeWidth="1" />
      ))}
      {Object.entries(series).map(([k, data]) => (
        <polyline
          key={k}
          fill="none"
          stroke={colors[k]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((v, i) => `${i * step},${H - (v / max) * H}`).join(' ')}
        />
      ))}
      {/* x-axis labels */}
      {Array.from({ length: series.posts.length }).map((_, i) => i % 3 === 0 && (
        <text key={i} x={i * step} y={H - 4} fontSize="9" fill="var(--text-dim)" textAnchor="middle">
          {14 - i}d
        </text>
      ))}
    </svg>
  );
};

const ModerationQueue = () => {
  const REPORTS = [
    { id: 'rp1', kind: 'Confidential info', target: 'Resource: "Acme Co. Audit Findings 2024.pdf"', reporter: 'u6', age: '2 hrs', severity: 'high', summary: 'Reporter says PDF contains the actual Acme Co. name in the header and findings refer to specific employees by name.' },
    { id: 'rp2', kind: 'Copyright', target: 'Resource: "NEBOSH Past Papers 2020-2024.zip"', reporter: 'u8', age: '4 hrs', severity: 'high', summary: 'NEBOSH past papers are copyrighted by NEBOSH. Founder flagged this for immediate action.' },
    { id: 'rp3', kind: 'Misinformation', target: 'Answer to "Best practice for OFI vs NC categorization"', reporter: 'u3', age: '8 hrs', severity: 'med', summary: 'Answer claims OFIs are mandatory under ISO 9001 — incorrect.' },
    { id: 'rp4', kind: 'Spam', target: 'Comment on "GRI 2024 Disclosure Mapping"', reporter: 'me', age: '11 hrs', severity: 'low', summary: 'Repeated promotional links to a third-party consulting firm.' },
    { id: 'rp5', kind: 'Off-topic', target: 'Question: "Best laptop for auditors"', reporter: 'u7', age: '1d', severity: 'low', summary: 'Not really QEHS/ESG related.' },
  ];
  return (
    <div>
      <div className="card" style={{ padding: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14, background: 'var(--rose-100)', borderColor: 'var(--rose-500)' }}>
        <span style={{ width: 8, height: 8, background: 'var(--rose-500)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
        <strong style={{ fontSize: 13, color: 'var(--rose-600)' }}>2 high-severity reports need urgent review</strong>
        <span style={{ fontSize: 12, color: 'var(--rose-600)' }}>(content already auto-hidden)</span>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <span style={{ flex: 2 }}>Report</span>
          <span style={{ width: 80 }}>Severity</span>
          <span style={{ width: 100 }}>Reporter</span>
          <span style={{ width: 80 }}>Age</span>
          <span style={{ width: 180 }}>Actions</span>
        </div>
        {REPORTS.map(r => (
          <div key={r.id} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 2 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="chip" style={{ background: 'var(--ink-100)', color: 'var(--text)', padding: '1px 7px', fontSize: 10, fontWeight: 600 }}>{r.kind}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.target}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{r.summary}</div>
            </div>
            <div style={{ width: 80 }}>
              <span className="chip" style={{
                background: r.severity === 'high' ? 'var(--rose-100)' : r.severity === 'med' ? 'var(--amber-100)' : 'var(--ink-100)',
                color: r.severity === 'high' ? 'var(--rose-600)' : r.severity === 'med' ? 'var(--amber-600)' : 'var(--text-muted)',
                padding: '2px 8px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              }}>{r.severity}</span>
            </div>
            <div style={{ width: 100, display: 'flex', gap: 6, alignItems: 'center' }}>
              <Avatar user={USER_MAP[r.reporter]} size={22} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{USER_MAP[r.reporter].name.split(' ')[0]}</span>
            </div>
            <span style={{ width: 80, fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{r.age}</span>
            <div style={{ width: 180, display: 'flex', gap: 4 }}>
              <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 11 }} data-action={`mod-review-${r.id}`}>Review</button>
              <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 11, color: 'var(--moss-700)' }} data-action={`mod-dismiss-${r.id}`}>Dismiss</button>
              <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 11, color: 'var(--rose-600)' }} data-action={`mod-remove-${r.id}`}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentManagement = () => (
  <div className="card" style={{ padding: 22 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
      <ContentCounter type="Questions" count={3420} delta="+87 today" />
      <ContentCounter type="Answers" count={11240} delta="+412 today" />
      <ContentCounter type="Resources" count={4219} delta="+18 today" />
      <ContentCounter type="Knowledge Bytes" count={284} delta="+9 today" />
    </div>
    <h3 style={{ fontSize: 15, marginBottom: 12 }}>Featured this week (curated by admins)</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { t: 'GRI 2024 Disclosure Mapping Template', kind: 'Resource', stat: '1,289 downloads', pin: true },
        { t: 'How to defend OFI vs NC categorization', kind: 'Question', stat: '47 answers · 12K views' },
        { t: 'Decoding ISO 9001:2026 — Free webinar', kind: 'Event', stat: '1,247 registered', pin: true },
      ].map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)' }}>
          {c.pin && <span style={{ color: 'var(--amber-500)' }}>📌</span>}
          <span style={{ fontSize: 11, padding: '2px 7px', background: 'var(--brand-100)', color: 'var(--brand-700)', borderRadius: 999, fontWeight: 600 }}>{c.kind}</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{c.t}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{c.stat}</span>
          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 11 }} data-action={`admin-${c.pin ? 'unpin' : 'pin'}-${i}`}>{c.pin ? 'Unpin' : 'Pin'}</button>
        </div>
      ))}
    </div>
  </div>
);

const ContentCounter = ({ type, count, delta }) => (
  <div style={{ padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)' }}>
    <div className="mono" style={{ fontSize: 22, fontWeight: 700 }}>{count.toLocaleString()}</div>
    <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{type}</div>
    <div style={{ fontSize: 11, color: 'var(--moss-700)', marginTop: 4 }}>{delta}</div>
  </div>
);

const MemberManagement = () => (
  <div className="card" style={{ padding: 22 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <input placeholder="Search by name, email, REPO range…" style={{ flex: 1, padding: '9px 14px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-sunken)', fontSize: 13, outline: 'none' }} />
      <select style={{ padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 13 }}>
        <option>All members</option>
        <option>Mentors only</option>
        <option>Reported in last 30 days</option>
        <option>Top 100 by REPO</option>
        <option>Inactive 30+ days</option>
      </select>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {USERS.slice(0, 6).map(u => (
        <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)' }}>
          <Avatar user={u} size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{u.title}</div>
          </div>
          <Reputation points={u.reputation} />
          <RankBadge points={u.reputation} />
          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 11 }} data-action={`admin-view-${u.id}`}>View</button>
          <KebabMenu />
        </div>
      ))}
    </div>
  </div>
);

const FinanceTab = () => (
  <div>
    <div className="card" style={{ padding: 16, marginBottom: 14, background: 'var(--brand-50)', borderColor: 'var(--brand-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="handoff-pill">All paid flows on eGrowthIndia.com</span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Numbers below pulled from your Stripe / Razorpay accounts on .com</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
      <KPI label="MRR (₹)" value="14.2L" delta="+18% MoM" trend="up" />
      <KPI label="Course enrolments (M)" value="284" delta="+62" trend="up" />
      <KPI label="Refunds" value="0.8%" delta="-0.2%" trend="down" goodDown />
      <KPI label="Avg cart value (₹)" value="9,840" delta="+₹420" trend="up" />
    </div>
    <div className="card" style={{ padding: 22 }}>
      <h3 style={{ fontSize: 15, marginBottom: 14 }}>Top revenue courses</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['NEBOSH IGC Prep', '₹4.8L', 12, 92],
          ['ISO 9001 Lead Auditor', '₹3.2L', 21, 78],
          ['ESG Reporting Masterclass', '₹2.4L', 24, 62],
          ['BEE Energy Manager Prep', '₹1.8L', 9, 48],
          ['ISO 14001 Internal Auditor', '₹0.9L', 18, 32],
        ].map(([n, r, w, p]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
            <span style={{ flex: 1 }}>{n}</span>
            <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{w} enrolments</span>
            <span style={{ width: 100, height: 6, background: 'var(--ink-150)', borderRadius: 3, overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', width: `${p}%`, background: 'linear-gradient(90deg, var(--moss-500), var(--brand-600))' }} />
            </span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--brand-800)' }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SystemHealth = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
    {[
      { name: 'eGrowthIndia.in (community)', status: 'green', uptime: '99.98%', latency: '142ms' },
      { name: 'eGrowthIndia.com (LMS)',      status: 'green', uptime: '99.95%', latency: '187ms' },
      { name: 'Auth (OAuth + email)',        status: 'green', uptime: '100%',   latency: '64ms' },
      { name: 'Payments (Stripe + Razorpay)', status: 'green', uptime: '100%',  latency: '290ms' },
      { name: 'Video / Reels CDN',           status: 'yellow', uptime: '99.81%', latency: '410ms', note: 'Mumbai PoP slow' },
      { name: 'Resource storage (S3)',       status: 'green', uptime: '99.99%', latency: '88ms' },
      { name: 'Email delivery (SES)',        status: 'green', uptime: '99.97%', latency: '—' },
      { name: 'WhatsApp gateway',            status: 'green', uptime: '99.84%', latency: '—' },
      { name: 'Certificate verifier (blockchain)', status: 'yellow', uptime: '98.7%', latency: '—', note: 'Slow on Polygon today' },
    ].map(s => (
      <div key={s.name} className="card" style={{ padding: 16, borderLeft: `3px solid ${s.status === 'green' ? 'var(--moss-500)' : s.status === 'yellow' ? 'var(--amber-500)' : 'var(--rose-500)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.status === 'green' ? 'var(--moss-500)' : s.status === 'yellow' ? 'var(--amber-500)' : 'var(--rose-500)' }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          <span>↑ {s.uptime}</span>
          <span>· {s.latency}</span>
        </div>
        {s.note && <div style={{ fontSize: 11, color: 'var(--amber-600)', marginTop: 4 }}>⚠ {s.note}</div>}
      </div>
    ))}
  </div>
);

// ───────────────────────────────────────────────────────────────────────
//   PUBLIC PROFILE (what others see at egrowth.in/u/ananya.r)
// ───────────────────────────────────────────────────────────────────────
const PublicProfilePage = ({ user }) => {
  const tier = getTier(user.reputation);
  return (
    <div style={{ maxWidth: 1080 }}>
      {/* Public chrome — fake browser URL bar */}
      <div style={{
        background: '#000', color: '#fff', padding: '8px 16px',
        borderRadius: 'var(--r-md) var(--r-md) 0 0',
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: -1,
      }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 16, opacity: 0.6 }}>🔒</span>
        <span style={{ flex: 1, color: '#fff', textAlign: 'left' }}>
          egrowth.in/u/{user.handle}
        </span>
        <span style={{ fontSize: 10, padding: '1px 7px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>PUBLIC</span>
      </div>

      <div style={{
        background: `linear-gradient(135deg, var(--brand-900), var(--brand-600))`,
        height: 180, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 35%, var(--amber-400), transparent 50%)', opacity: 0.3 }} />
      </div>

      <div className="card" style={{ borderRadius: '0 0 var(--r-lg) var(--r-lg)', borderTop: 'none', padding: '0 32px 28px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -56 }}>
          <div style={{ background: 'var(--bg-raised)', padding: 4, borderRadius: '50%' }}>
            <Avatar user={user} size={120} />
          </div>
          <div style={{ flex: 1, paddingBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 26, fontWeight: 700 }}>{user.name}</h1>
              <RankBadge points={user.reputation} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', background: 'var(--moss-100)', color: 'var(--moss-700)', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                <Icon name="check" size={11} /> Verified member
              </span>
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 6 }}>{user.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                <Icon name="location" size={13} />
                {user.location}
              </span>
              <span>·</span>
              <span>Member since {user.joined}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 12 }}>
            <button className="btn btn-outline" data-action="public-message">
              <Icon name="messages" size={14} /> Message
            </button>
            <button className="btn btn-outline" data-action="public-endorse">
              <Icon name="award" size={14} /> Endorse a skill
            </button>
            <button className="btn btn-primary" data-action="public-mentor">
              <Icon name="users" size={14} /> Request mentorship
            </button>
          </div>
        </div>

        {/* What the public sees: reputation + verified contributions */}
        <div style={{ display: 'flex', gap: 18, marginTop: 24 }}>
          <PublicStat label="REPO" value={user.reputation.toLocaleString()} sub={tier.label} />
          <PublicStat label="Helpful answers" value={user.contributions.answers} sub="217 with 5+ upvotes" />
          <PublicStat label="Resources shared" value={user.contributions.resources} sub="14.2K downloads" />
          <PublicStat label="Endorsements received" value={user.contributions.endorsements} sub="from 142 peers" />
          <PublicStat label="Quizzes passed" value="26" sub="9 badges" />
          <PublicStat label="Mentees helped" value="0" sub="becoming mentor soon" muted />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24, marginTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <PublicSection title="Top contributions">
            <ContribPreview kind="resource" title="ISO 9001 Audit Question Bank — 127 questions" stat="942 downloads · +186 REPO" />
            <ContribPreview kind="answer" title="How to defend OFI vs NC during recertification" stat="47 upvotes · accepted answer" />
            <ContribPreview kind="resource" title="APQP Phase Gate Review Pack" stat="640 downloads" />
            <ContribPreview kind="answer" title="Best ESG disclosure framework for mid-size APAC" stat="32 upvotes" />
          </PublicSection>

          <PublicSection title="Verified skills">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {user.skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{s.endorsements} endorsed</span>
                  </div>
                  <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                </div>
              ))}
            </div>
          </PublicSection>

          <PublicSection title="Public certificates">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['ISO 14001 & 45001 Internal Auditor', 'Six Sigma White Belt', 'ISO 9001 Awareness'].map(c => (
                <span key={c} className="chip" style={{ background: 'var(--brand-50)', color: 'var(--brand-800)', padding: '4px 10px', fontSize: 12, border: '1px solid var(--brand-200)' }}>
                  <Icon name="award" size={12} /> {c}
                </span>
              ))}
            </div>
          </PublicSection>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>
              Share
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['LinkedIn', 'WhatsApp', 'Email', 'Copy link', 'QR code'].map(s => (
                <button key={s} className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '7px 12px', fontSize: 13 }} data-action={`public-share-${s.toLowerCase().replace(' ','-')}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>
              Active in
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span className="chip chip-brand">Quality</span>
              <span className="chip chip-brand">ESG</span>
              <span className="chip chip-moss">Sustainability</span>
              <span className="chip chip-outline">India 🇮🇳</span>
            </div>
          </div>
          <div className="card" style={{ padding: 18, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
            <Icon name="sparkle" size={20} style={{ color: 'var(--amber-500)', marginBottom: 6 }} />
            <h3 style={{ fontSize: 14 }}>Like what you see?</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 12px' }}>
              Join the eGrowth community — 48,219 QEHS & ESG professionals sharing free knowledge.
            </p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} data-action="public-join-cta">
              Join free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PublicStat = ({ label, value, sub, muted }) => (
  <div style={{ padding: '12px 0', flex: 1 }}>
    <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: muted ? 'var(--text-dim)' : 'var(--text)' }}>{value}</div>
    <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>
    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>
  </div>
);

const PublicSection = ({ title, children }) => (
  <div className="card" style={{ padding: 22 }}>
    <h2 style={{ fontSize: 16, marginBottom: 14 }}>{title}</h2>
    {children}
  </div>
);

const ContribPreview = ({ kind, title, stat }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
    <Icon name={kind === 'resource' ? 'resource' : 'comment'} size={16} style={{ color: 'var(--brand-700)' }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 11, color: 'var(--moss-700)', marginTop: 2 }}>{stat}</div>
    </div>
    <Icon name="chevronRight" size={14} style={{ color: 'var(--text-dim)' }} />
  </div>
);

Object.assign(window, { AdminDashboard, PublicProfilePage });
