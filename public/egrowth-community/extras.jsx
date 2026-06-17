// Extras: Groups/Circles, Search, A/B Experiments

// ───────────────────────────────────────────────────────────────────────
//   GROUPS / CIRCLES
// ───────────────────────────────────────────────────────────────────────
const GROUPS = [
  { id: 'g1', name: 'Indian Auto Quality Engineers',     domain: 'quality', icon: '🚗', members: 4820, posts: 384, color: '#176e6e', mod: 'me',  joined: true,  active: 'Very active · 12 posts/day' },
  { id: 'g2', name: 'Mining HSE — Global',                domain: 'safety',  icon: '⛏', members: 3140, posts: 218, color: '#c2700a', mod: 'u2',  joined: false, active: 'Active · 5 posts/day' },
  { id: 'g3', name: 'ESG Reporting Practitioners',        domain: 'esg',     icon: '📊', members: 5240, posts: 412, color: '#2d5a3d', mod: 'u3',  joined: true,  active: 'Very active · 14 posts/day' },
  { id: 'g4', name: 'NEBOSH IGC Study Group · 2026',      domain: 'safety',  icon: '🛡', members: 2480, posts: 624, color: '#b84557', mod: 'u2',  joined: false, active: 'Buzzing · 28 posts/day · exam in 6 weeks' },
  { id: 'g5', name: 'ISO 9001:2026 Transition',           domain: 'quality', icon: '🔄', members: 1820, posts: 156, color: '#3a52a0', mod: 'u8',  joined: false, active: 'New \u2013 founded last week' },
  { id: 'g6', name: 'BRSR Core — Listed Entities (India)', domain: 'esg',     icon: '🇮🇳', members: 1240, posts: 94,  color: '#FF9300', mod: 'u9',  joined: true,  active: 'Active · 6 posts/day' },
  { id: 'g7', name: 'Process Safety in Refining',         domain: 'safety',  icon: '🛢', members: 1480, posts: 128, color: '#3d5a6d', mod: 'u4',  joined: false, active: 'Active · 4 posts/day' },
  { id: 'g8', name: 'Energy Managers India',              domain: 'energy',  icon: '⚡', members: 980,  posts: 84,  color: '#1e8a8a', mod: 'u6',  joined: false, active: 'Steady · 2 posts/day' },
  { id: 'g9', name: 'Women in QEHS',                       domain: 'community', icon: '👩‍💼', members: 2140, posts: 234, color: '#d15667', mod: 'me', joined: true,  active: 'Active · monthly virtual coffees' },
];

const GroupsPage = ({ onOpenGroup }) => {
  const [filter, setFilter] = React.useState('all');
  const [mine, setMine] = React.useState(false);
  const filtered = GROUPS.filter(g => (mine ? g.joined : true) && (filter === 'all' || g.domain === filter));
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Groups &amp; Circles</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Focus communities inside the main feed. Same REPO, same identity — just narrower context. Member-moderated.
          </p>
        </div>
        <button className="btn btn-primary" data-action="propose-new-group">
          <Icon name="plus" size={14} /> Start a group
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', flexWrap: 'wrap', alignItems: 'center' }}>
        {['all', 'quality', 'safety', 'health', 'environment', 'energy', 'esg', 'community'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="chip"
            style={{
              cursor: 'pointer',
              background: filter === f ? 'var(--brand-800)' : 'var(--ink-100)',
              color: filter === f ? '#fff' : 'var(--text-muted)',
              padding: '6px 14px', fontWeight: 600, fontSize: 13, textTransform: 'capitalize',
            }}
            data-action={`groups-filter-${f}`}
          >{f}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setMine(!mine)}
          className="chip"
          style={{ cursor: 'pointer', background: mine ? 'var(--brand-100)' : 'transparent', color: mine ? 'var(--brand-800)' : 'var(--text-muted)', border: mine ? '1px solid var(--brand-300)' : '1px solid var(--border)', padding: '6px 12px', fontSize: 12, fontWeight: 600 }}
          data-action="groups-only-mine"
        >
          {mine ? '✓ My groups' : 'My groups only'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(g => <GroupCard key={g.id} group={g} onOpen={() => onOpenGroup(g)} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-dim)', background: 'var(--bg-sunken)', borderRadius: 'var(--r-lg)' }}>
          <Icon name="users" size={28} />
          <div style={{ marginTop: 8, fontWeight: 600 }}>No groups match this filter</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Try a different domain — or start one!</div>
        </div>
      )}
    </div>
  );
};

const GroupCard = ({ group, onOpen }) => {
  const mod = USER_MAP[group.mod];
  return (
    <div className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={onOpen}>
      <div style={{
        background: `linear-gradient(135deg, ${group.color}, ${group.color}dd)`,
        color: '#fff', padding: '20px 22px', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.18), transparent 60%)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 30 }}>{group.icon}</div>
          {group.joined && (
            <span style={{ padding: '2px 8px', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, backdropFilter: 'blur(4px)' }}>
              ✓ Joined
            </span>
          )}
        </div>
        <h3 style={{ fontSize: 16, color: '#fff', marginTop: 10, lineHeight: 1.3, position: 'relative' }}>{group.name}</h3>
        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 6, position: 'relative' }}>{group.active}</div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
          <span><strong className="mono" style={{ color: 'var(--text)' }}>{group.members.toLocaleString()}</strong> members</span>
          <span><strong className="mono" style={{ color: 'var(--text)' }}>{group.posts}</strong> posts this month</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Avatar user={mod} size={24} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Moderated by <strong>{mod.name}</strong></span>
        </div>
        <button
          className={group.joined ? 'btn btn-outline' : 'btn btn-primary'}
          style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
          data-action={`${group.joined ? 'leave' : 'join'}-group-${group.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {group.joined ? '← Leave group' : 'Join group'}
        </button>
      </div>
    </div>
  );
};

// Group detail page
const GroupDetailPage = ({ group, onBack }) => {
  const mod = USER_MAP[group.mod];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onBack} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="gdetail-back">← All groups</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{
          background: `linear-gradient(135deg, ${group.color}, ${group.color}dd)`,
          color: '#fff', padding: 36, position: 'relative',
        }}>
          <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)' }} />
          <div style={{ position: 'relative', display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 'var(--r-md)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, backdropFilter: 'blur(8px)' }}>{group.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 26, color: '#fff' }}>{group.name}</h1>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{group.active}</div>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 12, opacity: 0.85 }}>
                <span><strong>{group.members.toLocaleString()}</strong> members</span>
                <span>·</span>
                <span><strong>{group.posts}</strong> posts this month</span>
                <span>·</span>
                <span>Founded Mar 2024</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }} data-action="gdetail-invite">+ Invite</button>
              {group.joined ? (
                <button className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }} data-action="gdetail-leave">✓ Joined</button>
              ) : (
                <button className="btn btn-amber" data-action="gdetail-join">Join group</button>
              )}
            </div>
          </div>
        </div>
        <div style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
          <Avatar user={mod} size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13 }}>Moderated by <strong>{mod.name}</strong> · {mod.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>Rules: be specific · cite sources · no recruiting · QEHS context only</div>
          </div>
          <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} data-action="gdetail-rules">Read rules</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="compose-card">
            <Avatar user={USER_MAP['me']} size={36} />
            <input className="compose-input" placeholder={`Post to ${group.name}…`} />
            <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 13 }} data-action={`gdetail-post-${group.id}`}>Post</button>
          </div>
          {FEED.slice(0, 4).map(p => (
            <FeedItem key={p.id} post={p} savedSet={new Set()} toggleSave={() => {}} votedSet={new Set()} toggleVote={() => {}} onComment={() => {}} />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>Top contributors</h3>
            {['u8', 'u3', 'me', 'u2'].map(uid => {
              const u = USER_MAP[uid];
              return (
                <div key={uid} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <Avatar user={u} size={28} />
                  <div style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{u.name}</div>
                  <Reputation points={u.reputation} />
                </div>
              );
            })}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>Pinned</h3>
            <div style={{ fontSize: 12, color: 'var(--text)', padding: 8, background: 'var(--brand-50)', borderRadius: 6, marginBottom: 6, borderLeft: '3px solid var(--brand-600)' }}>
              📌 <strong>Group reading list</strong> — 14 curated resources for new members
            </div>
            <div style={{ fontSize: 12, color: 'var(--text)', padding: 8, background: 'var(--bg-sunken)', borderRadius: 6 }}>
              📌 <strong>This month's challenge</strong> — Share your worst audit finding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────
//   GLOBAL SEARCH
// ───────────────────────────────────────────────────────────────────────
const SearchPage = ({ query: initialQuery = 'ISO 9001 audit', onClose }) => {
  const [q, setQ] = React.useState(initialQuery);
  const [tab, setTab] = React.useState('all');

  const counts = {
    all: 1820,
    questions: 482,
    answers: 620,
    resources: 312,
    jobs: 14,
    people: 48,
    courses: 12,
    groups: 6,
    chapters: 2,
  };

  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Icon name="search" size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            data-action="search-input"
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              fontSize: 16, fontWeight: 500,
              borderRadius: 'var(--r-md)', border: '1px solid var(--border-strong)',
              background: 'var(--bg-raised)', outline: 'none',
              color: 'var(--text)',
            }}
            autoFocus
          />
          {q && (
            <button onClick={() => setQ('')} data-action="search-clear" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
              <Icon name="x" size={16} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontSize: 13 }}>
        <span style={{ color: 'var(--text-muted)' }}>
          <strong className="mono">{counts.all.toLocaleString()}</strong> results for <strong style={{ color: 'var(--text)' }}>"{q}"</strong>
        </span>
        <span style={{ color: 'var(--text-dim)' }}>· Found in 0.18s</span>
      </div>

      <div className="tabs">
        {[
          { id: 'all', label: 'All' },
          { id: 'questions', label: 'Questions' },
          { id: 'answers', label: 'Answers' },
          { id: 'resources', label: 'Resources' },
          { id: 'jobs', label: 'Jobs' },
          { id: 'people', label: 'People' },
          { id: 'courses', label: 'Courses' },
          { id: 'groups', label: 'Groups' },
          { id: 'chapters', label: 'Chapters' },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} data-action={`search-tab-${t.id}`}>
            {t.label}
            <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: tab === t.id ? 'var(--brand-100)' : 'var(--ink-100)', color: tab === t.id ? 'var(--brand-800)' : 'var(--text-dim)', borderRadius: 10 }}>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Top result — question */}
          <SearchResult kind="question" title="How are you handling LOPA studies for legacy offshore platforms without full P&ID documentation?" snippet="…inherited a 1998-era platform from an acquisition and the documentation is patchy. Looking for practical approaches — has anyone reverse-engineered P&IDs from field walkdowns for LOPA?…" meta="Asked 2 hrs ago · 12 answers · 47 upvotes" tags={['safety', 'lopa']} highlight={['ISO 9001 audit']} />

          {/* Top result — resource */}
          <SearchResult kind="resource" title="ISO 9001 Internal Audit Question Bank — 127 questions" snippet="Compiled from 6 years of auditing across automotive, pharma, and medical device sectors. Organized by clause, with follow-up probes and typical non-conformities flagged." meta="PDF · 1.8 MB · 942 downloads · by Ananya Ramaswamy" tags={['quality', 'audit']} highlight={['ISO 9001 audit']} />

          {/* Top result — person */}
          <SearchResult kind="person" name="Ananya Ramaswamy" snippet="ISO 9001 Lead Auditor · Quality Systems Consultant · Bengaluru" meta="3,842 REPO · 217 answers · 28 resources · Top contributor in Quality" badge="IV Expert" />

          {/* Top result — course */}
          <SearchResult kind="course" title="ISO 9001:2015 Lead Auditor (CQI/IRCA Aligned)" snippet="40 hrs · 5 weeks · Live online sessions, 4 practical audits, capstone project. Certificate accepted by 200+ employers in India and GCC." meta="₹14,999 · Next cohort Jun 3 · 3,240 enrolled · 4.9 ★" badge="Hosted on eGrowthIndia.com" />

          {/* Top result — job */}
          <SearchResult kind="job" title="Lead Quality Auditor — Medical Devices" snippet="3+ years of ISO 9001 + ISO 13485 audit experience required. Lead role overseeing 4 audit programs across DACH." meta="NovaDiagnostics · Munich · EUR 85–100K · 12 applied" tags={['quality']} />

          {/* Top result — group */}
          <SearchResult kind="group" title="Indian Auto Quality Engineers" snippet="4,820 members · Quality professionals in Indian automotive sector. Mostly OEMs and Tier 1 suppliers. Very active — 12 posts/day." meta="Moderated by Ananya R. · You're a member" />

          {/* Top result — answer */}
          <SearchResult kind="answer" title="Answer to 'Best practice for OFI vs NC categorization'" snippet="…Use a 3-tier evidence framework when defending categorization to clients. Document every assumption by source quality — vendor docs vs walkdown vs inference…" meta="by Nakul Rohilla · 124 upvotes · Accepted answer" tags={['quality']} />

          <div style={{ padding: 18, textAlign: 'center' }}>
            <button className="btn btn-outline" data-action="search-load-more">Load 20 more results</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>Refine</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
              <RefineSection label="Posted by" opts={['Anyone', 'Founders only', 'Top contributors', 'Mentors']} />
              <RefineSection label="Time" opts={['Anytime', 'Past 24h', 'Past week', 'Past month']} />
              <RefineSection label="Tags" opts={['Any', 'ISO 9001', 'ISO 14001', 'Audit', 'NEBOSH']} />
              <RefineSection label="Language" opts={['English', '+ Hindi', '+ Arabic', '+ Spanish']} />
            </div>
          </div>
          <div className="card" style={{ padding: 16, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
            <Icon name="sparkle" size={18} style={{ color: 'var(--amber-500)' }} />
            <h3 style={{ fontSize: 13, marginTop: 6 }}>Save this search</h3>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 10px' }}>Get emailed when new results match.</p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '6px 10px' }} data-action="search-save">Save search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResult = ({ kind, title, name, snippet, meta, tags = [], highlight = [], badge }) => {
  const ICONS = { question: 'question', answer: 'comment', resource: 'resource', job: 'briefcase', person: 'user', course: 'book', group: 'users' };
  const COLORS = { question: 'var(--brand-100)', answer: 'var(--moss-100)', resource: 'var(--moss-100)', job: 'var(--amber-100)', person: 'var(--ink-100)', course: 'var(--brand-100)', group: 'var(--rose-100)' };
  return (
    <div className="card card-hover" style={{ padding: 18, display: 'flex', gap: 14, cursor: 'pointer' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 'var(--r-md)',
        background: COLORS[kind] || 'var(--ink-100)', color: 'var(--brand-700)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={ICONS[kind]} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--brand-700)' }}>{kind}</span>
          {badge && <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--amber-100)', color: 'var(--amber-600)', borderRadius: 4, fontWeight: 700 }}>{badge}</span>}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{title || name}</h3>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}
           dangerouslySetInnerHTML={{ __html: snippet.replace(new RegExp(highlight.join('|'), 'gi'), m => `<mark style="background:var(--amber-100);color:var(--text);padding:0 2px;border-radius:2px">${m}</mark>`) }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, fontSize: 11, color: 'var(--text-dim)' }}>
          <span>{meta}</span>
          {tags.length > 0 && (
            <>
              <span>·</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {tags.map(t => <Tag key={t} name={t} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RefineSection = ({ label, opts }) => (
  <div>
    <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
    <select style={{ width: '100%', padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 12, color: 'var(--text)' }}>
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

// ───────────────────────────────────────────────────────────────────────
//   A/B EXPERIMENTS (admin tab)
// ───────────────────────────────────────────────────────────────────────
const ExperimentsTab = () => {
  const EXPERIMENTS = [
    { id: 'exp-1', name: 'Compose CTA wording — "Ask" vs "Share"', status: 'running', traffic: 50, days: 8,
      variants: [
        { name: 'A: "Ask a question…"',   conv: 8.4, sample: 4820 },
        { name: 'B: "Share what you know…"', conv: 11.2, sample: 4810, winner: true, lift: '+33%', sig: '99.4%' },
      ],
      decision: 'Ship B — significant lift',
    },
    { id: 'exp-2', name: 'QOTD reward — 50 vs 100 REPO', status: 'running', traffic: 100, days: 3,
      variants: [
        { name: 'A: +50 REPO',  conv: 6.2, sample: 18420 },
        { name: 'B: +100 REPO', conv: 7.1, sample: 18380, lift: '+15%', sig: '92%' },
      ],
      decision: 'Inconclusive — extend by 4 days',
    },
    { id: 'exp-3', name: 'Quiz results screen — confetti vs minimal', status: 'shipped', traffic: 100, days: 14,
      variants: [
        { name: 'A: Minimal',   conv: 24.0, sample: 3120 },
        { name: 'B: Confetti',  conv: 38.4, sample: 3140, winner: true, lift: '+60% next-quiz', sig: '99.9%' },
      ],
      decision: 'Shipped variant B on May 14',
    },
    { id: 'exp-4', name: 'Sidebar order — Quiz before Learn', status: 'planning', traffic: 0, days: 0,
      variants: [],
      decision: 'Launching tomorrow',
    },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16 }}>Active experiments</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>Statistically rigorous A/B tests. Each runs at least 7 days OR until 95% significance.</p>
        </div>
        <button className="btn btn-primary" data-action="exp-create"><Icon name="plus" size={14} /> Design new experiment</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {EXPERIMENTS.map(e => (
          <div key={e.id} className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 999, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: e.status === 'running' ? 'var(--moss-100)' : e.status === 'shipped' ? 'var(--brand-100)' : 'var(--amber-100)',
                    color: e.status === 'running' ? 'var(--moss-700)' : e.status === 'shipped' ? 'var(--brand-700)' : 'var(--amber-600)',
                  }}>
                    {e.status === 'running' ? '● Running' : e.status === 'shipped' ? '✓ Shipped' : '◇ Planning'}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{e.id}</span>
                  {e.traffic > 0 && <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>· {e.traffic}% traffic · day {e.days}</span>}
                </div>
                <h3 style={{ fontSize: 15 }}>{e.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {e.status === 'running' && (
                  <>
                    <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 11 }} data-action={`exp-pause-${e.id}`}>Pause</button>
                    <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 11 }} data-action={`exp-ship-${e.id}`}>Ship winner</button>
                  </>
                )}
                {e.status === 'planning' && <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 11 }} data-action={`exp-launch-${e.id}`}>Launch</button>}
                {e.status === 'shipped' && <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 11 }} data-action={`exp-report-${e.id}`}>Read report</button>}
              </div>
            </div>

            {e.variants.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {e.variants.map(v => (
                  <div key={v.name} style={{
                    padding: 14, background: v.winner ? 'var(--moss-100)' : 'var(--bg-sunken)',
                    borderRadius: 'var(--r-md)', position: 'relative',
                    border: v.winner ? '1px solid var(--moss-500)' : '1px solid var(--border)',
                  }}>
                    {v.winner && <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, padding: '1px 6px', background: 'var(--moss-500)', color: '#fff', borderRadius: 3, fontWeight: 700 }}>WINNING</span>}
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{v.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span className="mono" style={{ fontSize: 22, fontWeight: 700, color: v.winner ? 'var(--moss-700)' : 'var(--text)' }}>{v.conv}%</span>
                      {v.lift && <span style={{ fontSize: 11, color: 'var(--moss-700)', fontWeight: 600 }}>{v.lift}</span>}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>
                      n={v.sample.toLocaleString()} · {v.sig && <strong>{v.sig} significance</strong>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--brand-50)', borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--brand-800)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="sparkle" size={13} /> <strong>Decision:</strong> {e.decision}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { GroupsPage, GroupDetailPage, SearchPage, ExperimentsTab });
