// Tier C — Help, About, Pricing, Calendar, Tag detail, Member directory, Skeletons

// ─── HELP / SUPPORT ───────────────────────────────────────────────────
const HelpPage = () => {
  const [q, setQ] = React.useState('');
  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900), var(--brand-600))',
        color: '#fff', padding: 40, borderRadius: 'var(--r-lg)', marginBottom: 24,
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.3 }} />
        <h1 style={{ fontSize: 30, color: '#fff', position: 'relative' }}>How can we help?</h1>
        <div style={{ position: 'relative', maxWidth: 540, margin: '20px auto 0' }}>
          <Icon name="search" size={18} style={{ position: 'absolute', left: 16, top: 14, color: 'var(--text-dim)' }} />
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search help articles, guides, troubleshooting…"
            style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 'var(--r-md)', border: 'none', fontSize: 14, outline: 'none', color: 'var(--text)' }}
            data-action="help-search"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { i: 'sparkle', t: 'Getting started', n: 12, link: 'help-start' },
          { i: 'award',   t: 'REPO & badges',   n: 8,  link: 'help-repo' },
          { i: 'resource', t: 'Sharing resources', n: 18, link: 'help-resources' },
          { i: 'briefcase', t: 'Jobs & hiring',  n: 9, link: 'help-jobs' },
          { i: 'book',    t: 'Courses (.com)',  n: 14, link: 'help-courses' },
          { i: 'settings', t: 'Account & privacy', n: 22, link: 'help-account' },
        ].map(c => (
          <button key={c.t} className="card card-hover" style={{ padding: 18, textAlign: 'left', cursor: 'pointer' }} data-action={c.link}>
            <Icon name={c.i} size={22} style={{ color: 'var(--brand-700)' }} />
            <h3 style={{ fontSize: 14, marginTop: 10 }}>{c.t}</h3>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{c.n} articles</div>
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Frequently asked</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {[
          ['Why is REPO not increasing after I post?', 'REPO is awarded when others engage with your content (upvote, download, accept). You\'ll see daily REPO movements in Activity Inbox → REPO changes.'],
          ['Can I delete a resource I uploaded?', 'Yes — open the resource, click ⋮ menu, choose Delete. If it has downloads, REPO earned stays with you.'],
          ['How do I report something?', 'Every post and resource has a ⋮ menu with Report. Confidential info and copyright reports auto-hide content while we review (~24h).'],
          ['What\'s the difference between .in and .com?', '.in is the free community (this site). .com hosts paid courses, certificates, and events. Same identity — you sign in once.'],
          ['How do I become a mentor?', 'Once you cross 2,500 REPO and your standing is clean, you can apply via Mentorship → Become a mentor.'],
          ['Is my data being sold?', 'No. We don\'t sell, share, or rent member data. See Settings → Privacy → Data download for full transparency on what we hold.'],
        ].map(([q, a], i) => (
          <details key={i} style={{ padding: '14px 18px', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
            <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {q} <Icon name="chevronDown" size={14} />
            </summary>
            <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{a}</p>
          </details>
        ))}
      </div>

      <div className="card" style={{ padding: 22, marginTop: 22, display: 'flex', alignItems: 'center', gap: 16, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
        <Icon name="messages" size={28} style={{ color: 'var(--brand-700)' }} />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15 }}>Still stuck?</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>Email <strong>help@egrowthindia.in</strong> — typical response time: 4 hrs (India business hours).</p>
        </div>
        <button className="btn btn-primary" data-action="help-contact">Contact support</button>
      </div>
    </div>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────
const AboutPage = () => (
  <div style={{ maxWidth: 960 }}>
    <div style={{
      background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 50%, var(--amber-600) 130%)',
      color: '#fff', padding: 40, borderRadius: 'var(--r-lg)', marginBottom: 28, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.35 }} />
      <h1 style={{ fontSize: 36, color: '#fff', maxWidth: 560, position: 'relative' }}>
        QEHS &amp; ESG knowledge belongs to everyone.
      </h1>
      <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 580, marginTop: 14, lineHeight: 1.55, position: 'relative' }}>
        eGrowth is a free, peer-to-peer community for Quality, Environment, Health, Safety, Energy, Sustainability, and ESG professionals. No follow system, no algorithmic feed, no popularity contests. Just contribution.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
      {[['48,219', 'Members'], ['4,219', 'Free resources'], ['11,240', 'Answers'], ['108', 'Free quizzes']].map(([n, l]) => (
        <div key={l} className="card" style={{ padding: 18, textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: 'var(--brand-800)' }}>{n}</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>

    <div className="card" style={{ padding: 28, marginBottom: 18 }}>
      <h2 style={{ fontSize: 20, marginBottom: 14 }}>Why we built this</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 0 12px' }}>
        QEHS and ESG professionals are the most generous learners we know — and yet the best knowledge sits trapped in paid courses, vendor decks, and private LinkedIn DMs. We wanted a place where the playbook is open, the templates are free, and your reputation is built on actual contribution, not who you follow.
      </p>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
        Founded in 2024 by <strong>Pushpender Sharma</strong> (QEHS trainer, author) and <strong>Amit Singh</strong> (CEO, eGrowth India). Based in New Delhi. Funded by our paid training programs at <strong>eGrowthIndia.com</strong> — which keeps the community free.
      </p>
    </div>

    <h2 style={{ fontSize: 20, marginBottom: 14 }}>The founding team</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 28 }}>
      {[{ id: 'u8', r: 'Founder · QEHS Trainer · Author' }, { id: 'u9', r: 'Co-Founder & CEO' }, { id: 'u3', r: 'ESG Practice Lead' }, { id: 'u2', r: 'HSE Practice Lead' }].map(p => {
        const u = USER_MAP[p.id];
        return (
          <div key={p.id} className="card" style={{ padding: 22, display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar user={u} size={56} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: 'var(--brand-700)', fontWeight: 600, marginTop: 2 }}>{p.r}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>📍 {u.location}</div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="card" style={{ padding: 28 }}>
      <h2 style={{ fontSize: 20, marginBottom: 14 }}>Our principles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          ['Open by default', 'All resources are CC-BY-SA. Adapt, share, credit.'],
          ['Quality over popularity', 'No follow system, no engagement bait. REPO is earned by contribution that helps others.'],
          ['Privacy as a feature', 'We don\'t sell data. You can download or delete everything we hold on you, anytime.'],
          ['Practitioners, not pundits', 'Moderation, mentorship, and content curation done by working professionals, not influencers.'],
          ['Free forever', 'The community will always be free. Paid programs on .com fund this — they\'re optional.'],
        ].map(([t, d]) => (
          <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-100)', color: 'var(--brand-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={14} /></span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── PRICING (for .com handoff) ───────────────────────────────────────
const PricingPage = () => (
  <div style={{ maxWidth: 1080 }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Community is forever free
      </span>
      <h1 style={{ fontSize: 38, marginBottom: 10 }}>Paid programs that fund the community</h1>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.55 }}>
        Industry-recognised certifications + premium learning programs. Hosted on <strong>eGrowthIndia.com</strong>. Profile, REPO, and badges sync automatically.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 36 }}>
      {[
        { name: 'Community', price: '₹0', sub: 'Forever', features: ['All Q&A · resources · jobs', 'Quiz Arena · Flashcards', 'Country chapters · groups', 'Free events &amp; AMAs', 'REPO + badges + public profile', 'Mentorship (peer-to-peer)'], cta: 'You\'re already on it', popular: false, current: true },
        { name: 'Learner', price: '₹6,999', sub: 'per certificate', features: ['Pick any course on .com', 'Self-paced + live Q&A', 'Industry-recognised certificate', 'Mock exams + project review', '14-day money-back', 'Free upgrades to course revisions'], cta: 'Browse courses', popular: true },
        { name: 'Enterprise', price: 'Talk to us', sub: 'Custom', features: ['Bulk seats for your team (10+)', 'Custom learning paths', 'Co-branded certificates', 'Dedicated trainer for cohorts', 'API access for HRIS integration', 'Quarterly strategy review'], cta: 'Book a call' },
      ].map(p => (
        <div key={p.name} className="card" style={{
          padding: 28, position: 'relative',
          borderColor: p.popular ? 'var(--brand-500)' : 'var(--border)',
          borderWidth: p.popular ? 2 : 1,
          background: p.popular ? 'var(--brand-50)' : 'var(--bg-raised)',
        }}>
          {p.popular && <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', padding: '3px 12px', background: 'var(--amber-500)', color: 'var(--brand-900)', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Most popular</span>}
          {p.current && <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', padding: '3px 12px', background: 'var(--moss-500)', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>You are here</span>}
          <h3 style={{ fontSize: 18 }}>{p.name}</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
            <span className="mono" style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand-800)' }}>{p.price}</span>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{p.sub}</span>
          </div>
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.features.map(f => (
              <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                <Icon name="check" size={14} style={{ color: 'var(--moss-500)', flexShrink: 0, marginTop: 3 }} />
                <span dangerouslySetInnerHTML={{ __html: f }} />
              </li>
            ))}
          </ul>
          <button
            className={p.current ? 'btn btn-outline' : 'btn btn-primary'}
            style={{ width: '100%', justifyContent: 'center', padding: 11 }}
            disabled={p.current}
            data-action={`pricing-${p.name.toLowerCase()}`}
          >
            {p.cta}
          </button>
          {!p.current && <div style={{ marginTop: 8, textAlign: 'center' }}><HandoffPill /></div>}
        </div>
      ))}
    </div>

    <div className="card" style={{ padding: 28, marginBottom: 18 }}>
      <h2 style={{ fontSize: 18, marginBottom: 14 }}>Compare</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Feature</th>
            <th style={{ padding: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Community</th>
            <th style={{ padding: 12, color: 'var(--brand-700)', fontWeight: 700 }}>Learner</th>
            <th style={{ padding: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Resources library', '✓', '✓', '✓'],
            ['Quiz Arena', '✓', '✓', '✓'],
            ['Course access', '✗', 'Single course', 'All courses'],
            ['Industry certificate', '✗', '✓', '✓'],
            ['Live cohort + Q&A', '✗', '✓', '✓'],
            ['Project review', '✗', '✓', '✓'],
            ['Cohort for your team', '✗', '✗', '✓'],
            ['HRIS integration', '✗', '✗', '✓'],
          ].map(([f, a, b, c], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: 12, fontWeight: 500 }}>{f}</td>
              <td style={{ padding: 12, textAlign: 'center', color: a === '✗' ? 'var(--text-dim)' : 'var(--moss-700)' }}>{a}</td>
              <td style={{ padding: 12, textAlign: 'center', color: b === '✗' ? 'var(--text-dim)' : 'var(--brand-700)', fontWeight: 600 }}>{b}</td>
              <td style={{ padding: 12, textAlign: 'center', color: c === '✗' ? 'var(--text-dim)' : 'var(--moss-700)' }}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── CALENDAR ──────────────────────────────────────────────────────────
const CalendarPage = () => {
  const [view, setView] = React.useState('month');
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Events Calendar</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>Webinars · AMAs · cohort kickoffs · book launches · local meetups</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ display: 'flex', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', padding: 2, border: '1px solid var(--border)' }}>
            {['month', 'week', 'agenda'].map(v => (
              <button key={v} onClick={() => setView(v)} data-action={`cal-view-${v}`} style={{
                padding: '5px 12px', fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                background: view === v ? 'var(--brand-800)' : 'transparent',
                color: view === v ? '#fff' : 'var(--text-muted)',
                borderRadius: 6, cursor: 'pointer',
              }}>{v}</button>
            ))}
          </div>
          <button className="btn btn-outline" data-action="cal-subscribe"><Icon name="bell" size={14} /> Subscribe (iCal)</button>
        </div>
      </div>

      {view === 'month' && <MonthGrid />}
      {view === 'agenda' && <AgendaList />}
      {view === 'week' && <EmptyState icon="event" title="Week view coming soon" body="Use month or agenda for now." />}
    </div>
  );
};

const MonthGrid = () => {
  const events = {
    8: [{ t: 'ESG MasterClass cohort opens', c: 'var(--amber-500)' }],
    12: [{ t: 'Decoding ISO 9001:2026 webinar', c: 'var(--brand-600)' }, { t: 'India: NEBOSH study (Mumbai)', c: 'var(--rose-500)' }],
    20: [{ t: '📚 Book launch: Lead Auditor Handbook', c: 'var(--moss-500)' }],
    23: [{ t: 'AMA: Pushpender — ISO 9001 transition', c: 'var(--brand-600)' }],
    24: [{ t: 'AMA: Sonu — BRSR lessons', c: 'var(--brand-600)' }],
    25: [{ t: 'Bengaluru meetup — BRSR roundtable', c: 'var(--rose-500)' }],
  };
  const days = Array.from({ length: 35 }, (_, i) => i - 3);
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button className="btn btn-ghost" style={{ padding: 6 }} data-action="cal-prev"><Icon name="chevronRight" size={16} style={{ transform: 'rotate(180deg)' }} /></button>
        <h3 style={{ fontSize: 17 }}>May 2026</h3>
        <button className="btn btn-ghost" style={{ padding: 6 }} data-action="cal-next"><Icon name="chevronRight" size={16} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--border)' }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} style={{ background: 'var(--bg-sunken)', padding: '8px 10px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</div>
        ))}
        {days.map(d => {
          const isOther = d < 1 || d > 31;
          const isToday = d === 21;
          const evts = events[d] || [];
          return (
            <div key={d} style={{
              background: isOther ? 'var(--bg-sunken)' : 'var(--bg-raised)',
              minHeight: 90, padding: 8, opacity: isOther ? 0.4 : 1,
              border: isToday ? '2px solid var(--brand-500)' : 'none', borderRadius: isToday ? 4 : 0,
            }}>
              <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 500, color: isToday ? 'var(--brand-700)' : 'var(--text)', marginBottom: 4 }}>{isOther ? '' : (d < 1 ? 30 + d : d)}</div>
              {evts.map((e, i) => (
                <div key={i} style={{ fontSize: 10, padding: '2px 6px', background: e.c, color: '#fff', borderRadius: 3, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{e.t}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AgendaList = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {[
      ['Thu, May 22', '19:00 IST', 'AMA: ISO 9001 transition with Pushpender', '1,820 registered', 'var(--brand-600)'],
      ['Fri, May 23', '18:00 IST', 'BRSR Core lessons — Sonu Singh', '720 registered', 'var(--brand-600)'],
      ['Sat, May 25', '11:00 IST', 'Bengaluru BRSR roundtable (in person)', '48 RSVPed', 'var(--rose-500)'],
      ['Mon, Jun 3', '19:00 IST', 'ESG MasterClass — cohort kickoff', '82 enrolled · paid', 'var(--amber-500)'],
      ['Tue, Jun 9', '20:00 IST', 'NEBOSH IGC Group Study (weekly)', '24 attending', 'var(--rose-500)'],
      ['Fri, May 20', '—', '📚 Book Launch: Lead Auditor Handbook', '340 pre-orders', 'var(--moss-500)'],
    ].map(([d, t, ev, sub, c], i) => (
      <div key={i} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16, borderLeft: `4px solid ${c}` }}>
        <div style={{ textAlign: 'center', minWidth: 80 }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{d.split(',')[0]}</div>
          <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-700)' }}>{d.split(' ').slice(2).join(' ')}</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{t}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>{ev}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
        </div>
        <button className="btn btn-primary" data-action={`cal-rsvp-${i}`}>RSVP</button>
      </div>
    ))}
  </div>
);

// ─── TAG DETAIL ───────────────────────────────────────────────────────
const TagDetailPage = ({ tag = 'iso-9001', onBack }) => (
  <div style={{ maxWidth: 1080 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
      <button onClick={onBack} style={{ color: 'var(--brand-700)', cursor: 'pointer' }}>← Home</button>
    </div>
    <div className="card" style={{ padding: 28, marginBottom: 18, background: 'linear-gradient(135deg, var(--brand-50), var(--bg-raised))' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', background: 'var(--brand-700)', color: 'var(--amber-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '0.04em' }}>#</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>#{tag}</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '6px 0 0', maxWidth: 580 }}>
            Quality Management System standard published by ISO. Used by 1M+ organizations globally. Current version: 2015 (revision expected 2026).
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
            <span><strong className="mono" style={{ color: 'var(--text)' }}>342</strong> posts this month</span>
            <span><strong className="mono" style={{ color: 'var(--text)' }}>1,820</strong> total posts</span>
            <span><strong className="mono" style={{ color: 'var(--text)' }}>148</strong> resources</span>
            <span><strong className="mono" style={{ color: 'var(--text)' }}>4,820</strong> followers</span>
          </div>
        </div>
        <button className="btn btn-primary" data-action="tag-follow">Follow tag</button>
      </div>
    </div>

    <div className="tabs">
      {['Top this week', 'Newest', 'Resources', 'Questions', 'People'].map((t, i) => (
        <button key={t} className={`tab ${i === 0 ? 'active' : ''}`} data-action={`tag-tab-${i}`}>{t}</button>
      ))}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {FEED.filter(p => p.tags?.some(t => t.includes('quality') || t.includes('audit'))).slice(0, 4).map(p => (
        <FeedItem key={p.id} post={p} savedSet={new Set()} toggleSave={() => {}} votedSet={new Set()} toggleVote={() => {}} onComment={() => {}} />
      ))}
    </div>
  </div>
);

// ─── MEMBER DIRECTORY ─────────────────────────────────────────────────
const MemberDirectoryPage = () => {
  const [filter, setFilter] = React.useState({ domain: 'all', country: 'all', role: 'all' });
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Member Directory</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>48,219 QEHS &amp; ESG professionals. Searchable, filterable. No follow — just discover.</p>
      </div>

      <div className="card" style={{ padding: 14, marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: 9, color: 'var(--text-dim)' }} />
          <input placeholder="Search by name, company, skill…" style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-sunken)', fontSize: 13, outline: 'none' }} />
        </div>
        <select style={{ padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 13 }}>
          <option>All domains</option><option>Quality</option><option>Safety</option><option>Health</option><option>Environment</option><option>Energy</option><option>ESG</option>
        </select>
        <select style={{ padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 13 }}>
          <option>All countries</option><option>India</option><option>UAE</option><option>UK</option><option>USA</option><option>Singapore</option>
        </select>
        <select style={{ padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 13 }}>
          <option>Any role</option><option>Mentors only</option><option>Top contributors</option><option>Founders</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {USERS.map(u => (
          <div key={u.id} className="card card-hover" style={{ padding: 18, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} data-action={`directory-user-${u.id}`}>
            <Avatar user={u} size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                {u.isFounder && <span className="chip chip-amber" style={{ padding: '1px 5px', fontSize: 9 }}>F</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.title}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <Reputation points={u.reputation} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── LOADING SKELETONS ────────────────────────────────────────────────
const Skeleton = ({ w = '100%', h = 14, rounded = 4, style = {} }) => (
  <div style={{
    width: w, height: h, borderRadius: rounded,
    background: 'linear-gradient(90deg, var(--ink-150) 0%, var(--ink-100) 50%, var(--ink-150) 100%)',
    backgroundSize: '200% 100%',
    animation: 'skeletonShimmer 1.5s infinite',
    ...style,
  }} />
);

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-kf')) {
  const s = document.createElement('style');
  s.id = 'skeleton-kf';
  s.textContent = '@keyframes skeletonShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }';
  document.head.appendChild(s);
}

const SkeletonFeedItem = () => (
  <div className="card" style={{ padding: 22 }}>
    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <Skeleton w={42} h={42} rounded={21} />
      <div style={{ flex: 1 }}>
        <Skeleton w="40%" h={14} />
        <div style={{ height: 6 }} />
        <Skeleton w="25%" h={10} />
      </div>
    </div>
    <Skeleton w="80%" h={20} />
    <div style={{ height: 8 }} />
    <Skeleton w="100%" h={12} />
    <div style={{ height: 6 }} />
    <Skeleton w="92%" h={12} />
    <div style={{ height: 16 }} />
    <div style={{ display: 'flex', gap: 6 }}>
      <Skeleton w={60} h={20} rounded={999} />
      <Skeleton w={70} h={20} rounded={999} />
      <Skeleton w={50} h={20} rounded={999} />
    </div>
  </div>
);

// ─── ACCESSIBILITY: focus rings (global CSS injection) ────────────────
if (typeof document !== 'undefined' && !document.getElementById('a11y-styles')) {
  const s = document.createElement('style');
  s.id = 'a11y-styles';
  s.textContent = `
    *:focus-visible {
      outline: 2px solid var(--brand-500);
      outline-offset: 2px;
      border-radius: 4px;
    }
    button:focus-visible, a:focus-visible {
      box-shadow: 0 0 0 3px var(--brand-100);
    }
    [data-theme="dark"] *:focus-visible { outline-color: var(--amber-400); }
    [data-theme="dark"] button:focus-visible { box-shadow: 0 0 0 3px rgba(240, 162, 60, 0.25); }
    /* High-contrast badge fixes for dark mode */
    [data-theme="dark"] .chip-brand { background: rgba(30, 138, 138, 0.25); color: var(--brand-300); }
    [data-theme="dark"] .chip-amber { background: rgba(224, 138, 20, 0.25); color: var(--amber-300); }
    [data-theme="dark"] .chip-moss { background: rgba(74, 138, 94, 0.25); color: #8ec4a1; }
    [data-theme="dark"] .chip-rose { background: rgba(209, 86, 103, 0.25); color: #f0a8b1; }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  HelpPage, AboutPage, PricingPage, CalendarPage, TagDetailPage, MemberDirectoryPage,
  Skeleton, SkeletonFeedItem,
});
