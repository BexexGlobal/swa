// Disclaimers, footer, .com/.in handoff, Activity inbox

// ────────────────────────────────────────────────────────────────────
//  GLOBAL APP FOOTER (black bar per brand identity)
// ────────────────────────────────────────────────────────────────────
const AppFooter = () => (
  <footer className="app-footer">
    <div className="footer-brand">
      <span className="logo-mark" style={{ width: 22, height: 22, fontSize: 12 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M4 14 L9 19 L20 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </span>
      eGrowth
    </div>
    <span className="domain-pill">Community · eGrowthIndia.in</span>
    <span className="domain-pill com">Learning &amp; Paid · eGrowthIndia.com</span>
    <span style={{ flex: 1 }} />
    <a href="#" data-action="footer-about">About</a>
    <a href="#" data-action="footer-coc">Community Guidelines</a>
    <a href="#" data-action="footer-content-policy">Content Policy</a>
    <a href="#" data-action="footer-dmca">DMCA / Copyright</a>
    <a href="#" data-action="footer-privacy">Privacy</a>
    <a href="#" data-action="footer-terms">Terms</a>
    <a href="#" data-action="footer-contact">Contact</a>
    <span style={{ opacity: 0.5, fontSize: 11 }}>© 2026 eGrowth India</span>
  </footer>
);

// ────────────────────────────────────────────────────────────────────
//  CONTENT-RESPONSIBILITY DISCLAIMER BANNER (page-level)
// ────────────────────────────────────────────────────────────────────
const DisclaimerBanner = ({ variant = 'content' }) => {
  const COPY = {
    content: {
      title: 'About files shared here',
      body: <>All resources are <strong>uploaded by community members</strong>. eGrowth does not pre-review uploads and cannot verify authorship, accuracy, or whether a file contains confidential material. <strong>You are responsible for what you share.</strong> Spotted something inappropriate or copyrighted? <a href="#" data-action="report-content">Report it</a>.</>,
    },
    external: {
      title: 'External links (YouTube · Drive · SharePoint)',
      body: <>Links shared by members open in the source platform's own player or viewer. eGrowth doesn't host the file and isn't responsible for its content, ads, tracking, or availability. Open with care.</>,
    },
    quiz: {
      title: 'Quizzes are practice, not certification',
      body: <>Quiz questions are community-authored and reviewed by certified practitioners, but they are <strong>not official certification exams</strong>. Your REPO and badges are recognized only within eGrowth Community. For official credentials (NEBOSH, CQI/IRCA, BEE, etc.) enroll in a certified program on <a href="#" data-action="link-egindia-com">eGrowthIndia.com</a>.</>,
    },
    payment: {
      title: 'Payments handled on eGrowthIndia.com',
      body: <>Course enrollment, event tickets, and any paid resources are processed securely on <strong>eGrowthIndia.com</strong> (our certified Learning Hub). You'll be redirected, complete payment there, and your access will sync back to your community profile automatically.</>,
    },
  };
  const c = COPY[variant];
  return (
    <div className="disclaimer-banner">
      <span className="icon-wrap">!</span>
      <div>
        <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 2, fontSize: 13 }}>{c.title}</div>
        <div>{c.body}</div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────
//  HANDOFF PILL — "Continues on eGrowthIndia.com →"
// ────────────────────────────────────────────────────────────────────
const HandoffPill = ({ to = '.com' }) => (
  <span className="handoff-pill" data-handoff={to}>
    Continues on eGrowthIndia{to}
  </span>
);

// ────────────────────────────────────────────────────────────────────
//  SUBMIT-YOUR-DESIGN modal — for Posters
// ────────────────────────────────────────────────────────────────────
const SubmitDesignModal = ({ open, onClose, onSubmit, kind = 'poster' }) => {
  const [agreed, setAgreed] = React.useState(false);
  const [original, setOriginal] = React.useState(false);
  if (!open) return null;

  const KIND_COPY = {
    poster: {
      title: 'Submit your poster design',
      what: 'Print-ready safety, quality, environment, or ESG posters (PDF or PNG, A4–A2). Reviewed by 2 community moderators before going live (~48 hrs).',
      rewards: <><Reputation points={150} /> per accepted poster · +5 per download · Top monthly designer gets featured</>,
    },
    reel: {
      title: 'Upload a Knowledge Byte',
      what: 'Vertical short video (9:16), 30s–2min, MP4 under 200 MB. Practical QEHS / ESG tips. No promotional content for unrelated products.',
      rewards: <><Reputation points={100} /> per published byte · +5 per 1,000 plays</>,
    },
    resource: {
      title: 'Share a free resource',
      what: 'Any file type: PDF, DOCX, XLSX, PPTX, KEY, Pages, Numbers, ZIP, or a link (YouTube, Drive, SharePoint, Dropbox). Templates, checklists, decks, audit kits — anything useful.',
      rewards: <><Reputation points={50} /> per published resource · +2 per download</>,
    },
  };
  const c = KIND_COPY[kind] || KIND_COPY.poster;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.65)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 620, maxHeight: '90vh',
        borderRadius: 'var(--r-lg)', overflow: 'auto',
        boxShadow: 'var(--shadow-lg)', animation: 'fadeIn 0.2s ease-out',
      }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="resource" size={20} style={{ color: 'var(--brand-700)' }} />
          <h2 style={{ fontSize: 18, flex: 1 }}>{c.title}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><Icon name="x" size={18} /></button>
        </div>

        <div style={{ padding: 22 }}>
          {/* What we accept */}
          <SubSection title="What we accept">
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{c.what}</p>
          </SubSection>

          {/* Rewards */}
          <SubSection title="What you earn">
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.rewards}</div>
          </SubSection>

          {/* Guidelines — what's NOT accepted */}
          <SubSection title="What's NOT allowed" danger>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <li>Confidential information from your employer or clients (incident reports with names, internal procedures with company branding, etc.)</li>
              <li>Copyrighted material you don't have rights to redistribute (paid books, vendor decks, standards bodies' verbatim text)</li>
              <li>Promotional content for unrelated products or services</li>
              <li>Personal data of any kind (PII, photos identifying individuals without consent)</li>
              <li>Material that misrepresents standards or could cause harm if followed</li>
            </ul>
          </SubSection>

          {/* IP + license */}
          <SubSection title="License">
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>
              By uploading, you confirm you have the right to share this content, and you license it under <strong>Creative Commons BY-SA 4.0</strong> — anyone may reuse and adapt it with attribution to you, sharing alike.
            </div>
          </SubSection>

          {/* Upload zone (mock) */}
          <div style={{
            marginTop: 18,
            border: '2px dashed var(--border-strong)',
            borderRadius: 'var(--r-md)',
            padding: 24, textAlign: 'center',
            background: 'var(--bg-sunken)',
          }}>
            <Icon name="download" size={28} style={{ color: 'var(--text-dim)', transform: 'rotate(180deg)' }} />
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8 }}>Drop file here or click to browse</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>Max 200 MB · {kind === 'poster' ? 'PDF, PNG, JPG' : kind === 'reel' ? 'MP4, MOV' : 'Any file type'} · Or paste a link below</div>
            <input
              placeholder="Or paste a YouTube / Drive / SharePoint / Dropbox link…"
              style={{
                marginTop: 12, width: '100%', padding: '8px 12px',
                borderRadius: 'var(--r-sm)', border: '1px solid var(--border)',
                background: 'var(--bg-raised)', fontSize: 12, outline: 'none',
              }}
            />
          </div>

          {/* Required checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
            <label style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-muted)', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={original} onChange={e => setOriginal(e.target.checked)} style={{ marginTop: 3 }} />
              <span>I confirm this content is <strong>original work or properly licensed for redistribution</strong>, contains no confidential or personal data, and that I am responsible if a claim is later made.</span>
            </label>
            <label style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-muted)', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 3 }} />
              <span>I agree to license under <strong>CC-BY-SA 4.0</strong> and accept the <a href="#" data-action="open-content-policy">Content Policy</a> &amp; <a href="#" data-action="open-terms">Terms</a>.</span>
            </label>
          </div>
        </div>

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            Reviewed within 48 hours · You'll be notified by email
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={onClose} data-action="submit-design-cancel">Cancel</button>
            <button
              className="btn btn-primary"
              disabled={!agreed || !original}
              onClick={onSubmit}
              data-action={`submit-design-${kind}`}
              style={{ opacity: (agreed && original) ? 1 : 0.5, cursor: (agreed && original) ? 'pointer' : 'not-allowed' }}
            >
              Submit for review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubSection = ({ title, children, danger }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{
      fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
      color: danger ? 'var(--rose-600)' : 'var(--brand-700)',
      fontWeight: 700, marginBottom: 6,
    }}>{title}</div>
    {children}
  </div>
);

// ────────────────────────────────────────────────────────────────────
//  ACTIVITY page — user's inbox / own activity timeline
// ────────────────────────────────────────────────────────────────────
const ActivityPage = ({ currentUser, onNavigate }) => {
  const [tab, setTab] = React.useState('all');
  return (
    <div style={{ maxWidth: 920 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Your activity</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Replies to your posts, REPO changes, mentions, endorsements — everything addressed to you.
          </p>
        </div>
        <button className="btn btn-outline" data-action="mark-all-read">
          <Icon name="check" size={14} /> Mark all read
        </button>
      </div>

      <div className="tabs" style={{ marginTop: 22 }}>
        {[
          { id: 'all', label: 'All', count: 23 },
          { id: 'mentions', label: 'Mentions', count: 4 },
          { id: 'answers', label: 'Answers to you', count: 7 },
          { id: 'endorsements', label: 'Endorsements', count: 8 },
          { id: 'repo', label: 'REPO changes', count: 12 },
          { id: 'system', label: 'System', count: 2 },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} data-action={`activity-tab-${t.id}`}>
            {t.label}
            <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: tab === t.id ? 'var(--brand-100)' : 'var(--ink-100)', color: tab === t.id ? 'var(--brand-800)' : 'var(--text-dim)', borderRadius: 10 }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ACTIVITY_FEED.filter(a => tab === 'all' || a.kind === tab).map(a => <ActivityRow key={a.id} item={a} onNavigate={onNavigate} />)}
      </div>

      <div style={{ marginTop: 22 }}>
        <DisclaimerBanner variant="content" />
      </div>
    </div>
  );
};

const ACTIVITY_FEED = [
  { id: 'a1', kind: 'answers', actor: 'u2', ts: '24 min ago', text: <>answered your question <strong>"How are you handling LOPA studies for legacy offshore platforms without full P&amp;ID documentation?"</strong></>, reward: '+8 REPO if accepted', unread: true },
  { id: 'a2', kind: 'endorsements', actor: 'u6', ts: '1h ago', text: <>endorsed you for <strong>Energy Auditing</strong>. Your skill level rose to 71%.</>, reward: '+5 REPO', unread: true },
  { id: 'a3', kind: 'repo', actor: null, ts: '2h ago', text: <>Your resource <strong>"ISO 9001 Audit Question Bank"</strong> hit a milestone — 1,000 downloads.</>, reward: '+50 REPO milestone bonus', unread: true },
  { id: 'a4', kind: 'mentions', actor: 'u3', ts: '3h ago', text: <>mentioned you in a comment on <strong>"GRI 2024 Disclosure Mapping Template"</strong>: "…@ananya's audit question bank pairs really well with this for SOX-style mapping."</>, unread: true },
  { id: 'a5', kind: 'answers', actor: 'u4', ts: '5h ago', text: <>upvoted your answer on <strong>"Best practices for defending OFI vs NC during recertification"</strong></>, reward: '+10 REPO' },
  { id: 'a6', kind: 'endorsements', actor: 'u8', ts: '1d ago', text: <>(Founder) endorsed you for <strong>ISO 9001</strong>. Cred++.</>, reward: '+10 REPO (founder endorsement 2× bonus)' },
  { id: 'a7', kind: 'system', actor: null, ts: '1d ago', text: <>You earned the <strong>NEBOSH Sharpshooter</strong> badge — 85%+ on all NEBOSH IGC mocks.</>, reward: '+100 REPO + badge' },
  { id: 'a8', kind: 'mentions', actor: 'u7', ts: '2d ago', text: <>added you to <strong>"Top auditors I learned from this year"</strong> — a public collection.</>, reward: '+15 REPO' },
  { id: 'a9', kind: 'repo', actor: null, ts: '2d ago', text: <>11-day streak! 🔥 You're 19 days from the 30-day badge.</>, reward: '+5 REPO daily streak bonus' },
  { id: 'a10', kind: 'system', actor: null, ts: '3d ago', text: <>You climbed to <strong>Rank #5 globally</strong> on the Quiz Leaderboard.</>, reward: 'No REPO change · leaderboard glory' },
];

const ActivityRow = ({ item, onNavigate }) => {
  const actor = item.actor ? USER_MAP[item.actor] : null;
  const KIND_META = {
    answers:      { icon: 'comment',  color: 'var(--brand-600)' },
    endorsements: { icon: 'award',    color: 'var(--moss-700)' },
    mentions:     { icon: 'user',     color: 'var(--amber-600)' },
    repo:         { icon: 'sparkle',  color: 'var(--brand-700)' },
    system:       { icon: 'bell',     color: 'var(--rose-600)' },
  };
  const m = KIND_META[item.kind] || KIND_META.system;
  return (
    <div className="card" style={{
      padding: 14,
      display: 'flex', gap: 14, alignItems: 'flex-start',
      borderLeft: item.unread ? `3px solid ${m.color}` : '1px solid var(--border)',
      background: item.unread ? 'var(--bg-raised)' : 'var(--bg-sunken)',
    }}>
      {actor ? (
        <Avatar user={actor} size={40} />
      ) : (
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: m.color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}><Icon name={m.icon} size={18} /></div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
          {actor && <strong>{actor.name} </strong>}
          {item.text}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, fontSize: 11, color: 'var(--text-dim)' }}>
          <span>{item.ts}</span>
          {item.reward && (
            <>
              <span>·</span>
              <span style={{ color: 'var(--moss-700)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{item.reward}</span>
            </>
          )}
        </div>
      </div>
      {item.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, marginTop: 6 }} />}
    </div>
  );
};

Object.assign(window, { AppFooter, DisclaimerBanner, HandoffPill, SubmitDesignModal, ActivityPage });
