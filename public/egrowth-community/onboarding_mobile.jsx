// Onboarding tour + Mobile companion screens

// ───────────────────────────────────────────────────────────────────────
//   ONBOARDING TOUR (overlay with sequential steps)
// ───────────────────────────────────────────────────────────────────────
const TOUR_STEPS = [
  {
    title: 'Welcome to eGrowth, Ananya!',
    body: 'A 60-second tour to show you where everything lives. You can skip anytime.',
    icon: '👋',
    illustration: <span style={{ fontSize: 56 }}>🌱</span>,
    cta: "Let's go",
  },
  {
    title: 'Your Home feed',
    body: 'A mix of questions, answers, resources, and Knowledge Bytes — personalised to your skills (Quality, ESG). No follow system means no popularity contest.',
    icon: '🏠',
    pointTo: 'home',
    illustration: <Icon name="home" size={48} style={{ color: 'var(--brand-700)' }} />,
  },
  {
    title: 'Earn REPO for everything',
    body: 'Answer questions (+10/upvote), share resources (+2/download), pass quizzes (up to +100), endorse peers (+5). REPO unlocks tiers — Newcomer → Luminary. There\'s no algorithmic boost; only contribution counts.',
    icon: '🪙',
    illustration: <Reputation points={100} size="lg" />,
  },
  {
    title: 'The Resource Library is free',
    body: '4,200+ templates, decks, audit kits, checklists. Office files, Apple iWork, ZIP archives, plus YouTube + Drive + SharePoint links. Upload yours to grow the library AND your REPO.',
    icon: '📚',
    pointTo: 'library',
    illustration: <div style={{ display: 'flex', gap: 4 }}>
      <div className="resource-preview ft-pdf" style={{ width: 32, height: 42, borderRadius: 4 }}><span className="filetype" style={{ fontSize: 10 }}>PDF</span></div>
      <div className="resource-preview ft-xls" style={{ width: 32, height: 42, borderRadius: 4 }}><span className="filetype" style={{ fontSize: 10 }}>XLS</span></div>
      <div className="resource-preview ft-ppt" style={{ width: 32, height: 42, borderRadius: 4 }}><span className="filetype" style={{ fontSize: 10 }}>PPT</span></div>
    </div>,
  },
  {
    title: 'Quiz Arena · Daily Challenges',
    body: '108 quizzes across 12 categories. Take a quiz, climb the leaderboard, earn badges, build a streak. Daily challenges = bite-sized REPO + multipliers.',
    icon: '🎯',
    pointTo: 'quiz',
    illustration: <span style={{ fontSize: 48 }}>🏆</span>,
  },
  {
    title: 'Learn Hub (eGrowthIndia.com)',
    body: 'Industry-recognised certificates (NEBOSH IGC, CQI/IRCA, BEE, ISO Lead Auditor). Self-paced + live cohorts. Free quizzes prep you for paid certs — your REPO travels with you.',
    icon: '🎓',
    pointTo: 'learn',
    illustration: <span style={{ fontSize: 48 }}>📜</span>,
  },
  {
    title: 'Your country has a Chapter',
    body: 'India is the largest chapter (18K+ members). Local jobs, local regulations (BRSR, GDPR-equivalent), local meetups. Join yours to make your feed even more relevant.',
    icon: '🌍',
    pointTo: 'chapters',
    illustration: <span style={{ fontSize: 48 }}>🇮🇳</span>,
  },
  {
    title: 'Need a mentor? Free.',
    body: '1,420 mentors offer 30–60 minutes a month, free. Smart-matched on skill overlap, time zone, language. When you\'re ready, you can mentor back.',
    icon: '🤝',
    pointTo: 'mentors',
    illustration: <Icon name="users" size={48} style={{ color: 'var(--brand-700)' }} />,
  },
  {
    title: 'Your profile is your living resume',
    body: 'Skills auto-endorsed by your activity. One-click export to PDF. Public URL (egrowth.in/u/ananya.r) anyone can verify. Recruiters can find you without a follow system.',
    icon: '📄',
    pointTo: 'profile',
    illustration: <span style={{ fontSize: 48 }}>👤</span>,
  },
  {
    title: 'You\'re ready 🌱',
    body: 'You start with 100 REPO + the Welcome badge + a 7-day streak head-start. Want a quick win? Take a quiz, then answer one question. Tour anytime via Settings.',
    icon: '🎉',
    illustration: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <Reputation points={100} size="lg" />
      <span style={{ fontSize: 12, color: 'var(--moss-700)', fontWeight: 600 }}>+ Welcome badge unlocked</span>
    </div>,
    cta: 'Take me to my feed',
    final: true,
  },
];

const OnboardingTour = ({ open, onClose }) => {
  const [step, setStep] = React.useState(0);
  if (!open) return null;
  const s = TOUR_STEPS[step];
  const isLast = step === TOUR_STEPS.length - 1;
  const isFirst = step === 0;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.55)',
      zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(2px)',
    }}>
      <div style={{
        background: 'var(--bg-raised)', width: 520, borderRadius: 'var(--r-lg)',
        overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out', position: 'relative',
      }}>
        {/* Top progress dots */}
        <div style={{ display: 'flex', gap: 4, padding: '14px 22px 0' }}>
          {TOUR_STEPS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? 'var(--brand-700)' : 'var(--ink-150)',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>

        {/* Hero illustration area */}
        <div style={{
          background: `linear-gradient(135deg, var(--brand-50), var(--amber-50))`,
          padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 140,
        }}>
          {s.illustration}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <h2 style={{ fontSize: 20, lineHeight: 1.2, flex: 1 }}>{s.title}</h2>
            <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              {step + 1} / {TOUR_STEPS.length}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.body}</p>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', gap: 8 }}>
          {!isLast && (
            <button className="btn btn-ghost" onClick={onClose} data-action="tour-skip">
              Skip tour
            </button>
          )}
          <div style={{ flex: 1 }} />
          {!isFirst && (
            <button className="btn btn-outline" onClick={() => setStep(step - 1)} data-action="tour-back">
              Back
            </button>
          )}
          <button
            className="btn btn-primary"
            data-action={isLast ? 'tour-finish' : 'tour-next'}
            onClick={() => isLast ? onClose() : setStep(step + 1)}
          >
            {s.cta || (isLast ? 'Finish' : 'Next')} <Icon name="arrow" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────
//   MOBILE COMPANION SCREENS  (iOS + Android frames)
// ───────────────────────────────────────────────────────────────────────
const MobileShowcasePage = () => {
  const [platform, setPlatform] = React.useState('ios');
  const [screen, setScreen] = React.useState('home');

  const SCREENS = [
    { id: 'home',     label: 'Home feed' },
    { id: 'qotd',     label: 'Question of the Day' },
    { id: 'library',  label: 'Resource Library' },
    { id: 'quiz',     label: 'Quiz in progress' },
    { id: 'profile',  label: 'Profile + REPO' },
    { id: 'preview',  label: 'File preview' },
    { id: 'mentor',   label: 'Mentorship' },
    { id: 'cert',     label: 'Certificate' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Mobile companion app</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Same identity, same REPO, same content — optimized for one-thumb use on the train, in the field, between meetings.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" data-action="download-app-store">
            <Icon name="download" size={14} /> App Store
          </button>
          <button className="btn btn-outline" data-action="download-play-store">
            <Icon name="download" size={14} /> Play Store
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', padding: 2, border: '1px solid var(--border)' }}>
          {[{ id: 'ios', label: 'iOS' }, { id: 'android', label: 'Android' }].map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              data-action={`mobile-platform-${p.id}`}
              style={{
                padding: '6px 16px', fontSize: 13, fontWeight: 600,
                background: platform === p.id ? 'var(--brand-800)' : 'transparent',
                color: platform === p.id ? '#fff' : 'var(--text-muted)',
                borderRadius: 6, cursor: 'pointer',
              }}
            >{p.label}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        {SCREENS.map(s => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            data-action={`mobile-screen-${s.id}`}
            className="chip"
            style={{
              cursor: 'pointer',
              background: screen === s.id ? 'var(--brand-800)' : 'var(--ink-100)',
              color: screen === s.id ? '#fff' : 'var(--text-muted)',
              padding: '6px 12px', fontWeight: 600, fontSize: 12,
            }}
          >{s.label}</button>
        ))}
      </div>

      {/* Device frames showcase — 3 abreast */}
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', padding: '20px 0 40px', flexWrap: 'wrap' }}>
        {(screen === 'home' ? ['home', 'qotd', 'library'] :
          screen === 'qotd' ? ['qotd', 'home', 'profile'] :
          screen === 'library' ? ['library', 'preview', 'home'] :
          screen === 'quiz' ? ['quiz', 'profile', 'qotd'] :
          screen === 'profile' ? ['profile', 'qotd', 'library'] :
          screen === 'mentor' ? ['mentor', 'profile', 'home'] :
          screen === 'cert' ? ['cert', 'profile', 'home'] :
          screen === 'settings' ? ['settings', 'profile', 'home'] :
          ['preview', 'library', 'home']
        ).map((sId, i) => (
          <DeviceWrap key={i} platform={platform} primary={i === 0} screen={sId} />
        ))}
      </div>
    </div>
  );
};

const DeviceWrap = ({ platform, primary, screen }) => {
  const Device = platform === 'ios' ? IOSDevice : AndroidDevice;
  return (
    <div style={{ transform: primary ? 'scale(1)' : 'scale(0.85)', transformOrigin: 'top center', opacity: primary ? 1 : 0.7 }}>
      <Device width={360} height={780} title="eGrowth">
        <MobileScreen screen={screen} platform={platform} />
      </Device>
    </div>
  );
};

const MobileScreen = ({ screen, platform }) => {
  if (screen === 'home') return <MobileHome />;
  if (screen === 'qotd') return <MobileQOTD />;
  if (screen === 'library') return <MobileLibrary />;
  if (screen === 'quiz') return <MobileQuiz />;
  if (screen === 'profile') return <MobileProfile />;
  if (screen === 'preview') return <MobilePreview />;
  if (screen === 'mentor') return <MobileMentor />;
  if (screen === 'cert') return <MobileCert />;
  if (screen === 'settings') return <MobileSettings />;
  return <MobileHome />;
};

// Wrapper for mobile pages (handles top bar + bottom nav)
const MobileShell = ({ title = 'Home', children, activeTab = 'home', noTopBar = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', color: 'var(--text)' }}>
    {!noTopBar && (
      <div style={{
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-raised)', borderBottom: '1px solid var(--border)',
      }}>
        <span className="logo-mark" style={{ width: 28, height: 28, fontSize: 14 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 14 L9 19 L20 5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </span>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, flex: 1 }}>{title}</div>
        <Icon name="search" size={18} style={{ color: 'var(--text-muted)' }} />
        <Icon name="bell" size={18} style={{ color: 'var(--text-muted)' }} />
      </div>
    )}
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>{children}</div>
    <div style={{
      display: 'flex', justifyContent: 'space-around',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-raised)', padding: '8px 0',
      paddingBottom: platform === 'ios' ? 20 : 8,
    }}>
      {[
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'feed', icon: 'bell', label: 'Inbox', badge: 4 },
        { id: 'quiz', icon: 'award', label: 'Quiz' },
        { id: 'library', icon: 'library', label: 'Library' },
        { id: 'profile', icon: 'user', label: 'Me' },
      ].map(t => (
        <button key={t.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: t.id === activeTab ? 'var(--brand-700)' : 'var(--text-dim)',
          fontWeight: 600, fontSize: 10, position: 'relative',
          padding: '4px 10px',
        }}>
          <Icon name={t.icon} size={20} />
          {t.label}
          {t.badge && (
            <span style={{
              position: 'absolute', top: 0, right: 4,
              background: 'var(--rose-500)', color: '#fff',
              fontSize: 8, fontWeight: 700, padding: '0 4px', borderRadius: 8,
              minWidth: 12, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{t.badge}</span>
          )}
        </button>
      ))}
    </div>
  </div>
);

const MobileHome = () => (
  <MobileShell title="eGrowth" activeTab="home">
    {/* Greeting + REPO */}
    <div style={{ padding: '14px 14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar user={USER_MAP['me']} size={36} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Good morning</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Ananya</div>
        </div>
        <Reputation points={3842} />
      </div>
    </div>

    {/* QOTD mini */}
    <div style={{ padding: 14 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900), var(--amber-600))',
        color: '#fff', borderRadius: 12, padding: 14,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', background: 'var(--amber-500)', color: 'var(--brand-900)', fontSize: 9, fontWeight: 800, borderRadius: 999, textTransform: 'uppercase' }}>
          🔥 Q of the Day
        </span>
        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginTop: 8 }}>
          OFI vs NC — what evidence wins the argument?
        </div>
        <div style={{ fontSize: 10, opacity: 0.8, marginTop: 6 }}>+100 REPO · 14h left</div>
      </div>
    </div>

    {/* Filter chips */}
    <div style={{ display: 'flex', gap: 5, padding: '0 14px 8px', overflowX: 'auto' }}>
      {['All', 'Quality', 'Safety', 'ESG', 'Jobs', 'Resources'].map((f, i) => (
        <span key={f} className="chip" style={{
          background: i === 0 ? 'var(--brand-800)' : 'var(--ink-100)',
          color: i === 0 ? '#fff' : 'var(--text-muted)',
          padding: '4px 10px', fontSize: 11, fontWeight: 600, flexShrink: 0,
        }}>{f}</span>
      ))}
    </div>

    {/* Feed items */}
    {FEED.slice(0, 3).map(p => <MobileFeedItem key={p.id} post={p} />)}
  </MobileShell>
);

const MobileFeedItem = ({ post }) => {
  const author = USER_MAP[post.author];
  return (
    <div style={{ padding: 14, borderBottom: '6px solid var(--bg)', background: 'var(--bg-raised)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Avatar user={author} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {author.name.split(' ')[0]} {author.name.split(' ')[1]?.[0]}.
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{post.ts} ago</div>
        </div>
        <PostKindTag kind={post.kind} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, marginBottom: 4 }}>{post.title}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.body}</div>
      <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>
        <span><Icon name="upvote" size={11} /> {(post.counts.upvotes || post.counts.registrations || 0).toLocaleString()}</span>
        {post.counts.answers != null && <span><Icon name="comment" size={11} /> {post.counts.answers}</span>}
        {post.counts.downloads != null && <span><Icon name="download" size={11} /> {post.counts.downloads.toLocaleString()}</span>}
      </div>
    </div>
  );
};

const MobileQOTD = () => (
  <MobileShell title="Q of the Day" activeTab="home">
    <div style={{ padding: 18 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900), var(--brand-700), var(--amber-600))',
        color: '#fff', borderRadius: 14, padding: 18,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'var(--amber-500)', color: 'var(--brand-900)', fontSize: 10, fontWeight: 800, borderRadius: 999, textTransform: 'uppercase' }}>
          🔥 Question of the Day
        </span>
        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 8 }}>⏳ 14h left · 89 of 1,247 answers</div>
        <h2 style={{ fontSize: 17, lineHeight: 1.3, color: '#fff', margin: '10px 0' }}>
          When your client refuses to call a finding a Nonconformity and insists it's only an OFI, what evidence wins the argument?
        </h2>
        <p style={{ fontSize: 12, opacity: 0.8, margin: '6px 0 14px' }}>
          A real situation from a 3rd-party audit last week. Looking for crowd-sourced wisdom.
        </p>
        <button className="btn btn-amber" style={{ width: '100%', justifyContent: 'center', padding: 10 }}>
          Write your answer · Earn <Reputation points={100} size="sm" />
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 10 }}>
          Top answerers
        </div>
        {[8, 3, 6, 2].map((idx) => {
          const u = USER_MAP[`u${idx}`];
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <Avatar user={u} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{u.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{u.title}</div>
              </div>
              <RankBadge points={u.reputation} showLabel={false} size="xs" />
            </div>
          );
        })}
      </div>
    </div>
  </MobileShell>
);

const MobileLibrary = () => (
  <MobileShell title="Library" activeTab="library">
    <div style={{ padding: 14 }}>
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input placeholder="Search 4,200+ resources" style={{
          width: '100%', padding: '10px 14px 10px 38px',
          borderRadius: 10, border: '1px solid var(--border)',
          background: 'var(--bg-sunken)', fontSize: 13, outline: 'none',
        }} />
        <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 14, overflowX: 'auto' }}>
        {['All', 'PDF', 'XLS', 'PPT', 'YouTube', 'Drive'].map((f, i) => (
          <span key={f} className="chip" style={{
            background: i === 0 ? 'var(--brand-800)' : 'var(--ink-100)',
            color: i === 0 ? '#fff' : 'var(--text-muted)',
            padding: '4px 10px', fontSize: 11, fontWeight: 600, flexShrink: 0,
          }}>{f}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {RESOURCES_LIBRARY.slice(0, 6).map(r => (
          <div key={r.id} style={{ background: 'var(--bg-raised)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div className={`resource-preview ft-${r.type}`} style={{ height: 70 }}>
              <span className="filetype" style={{ fontSize: 16 }}>{r.type.toUpperCase()}</span>
            </div>
            <div style={{ padding: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 30 }}>
                {r.title}
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 4 }}>↓ {r.downloads.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MobileShell>
);

const MobileQuiz = () => (
  <MobileShell title="ISO 9001 Clause 9" activeTab="quiz">
    <div style={{ height: 4, background: 'var(--ink-150)' }}>
      <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, var(--brand-600), var(--amber-400))' }} />
    </div>
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-dim)', marginBottom: 12 }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Question 3 of 10</span>
        <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
          <Icon name="clock" size={11} /> 8:32
        </span>
      </div>
      <h2 style={{ fontSize: 16, lineHeight: 1.35, marginBottom: 16 }}>
        Which of the following is NOT a mandatory input to Management Review per Clause 9.3.2?
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { l: 'A', t: 'The status of actions from previous management reviews' },
          { l: 'B', t: 'Changes in external and internal issues relevant to the QMS', sel: true },
          { l: 'C', t: 'The financial performance of the organization' },
          { l: 'D', t: 'The adequacy of resources' },
        ].map(o => (
          <div key={o.l} style={{
            display: 'flex', gap: 12, padding: '12px 14px',
            border: `2px solid ${o.sel ? 'var(--brand-600)' : 'var(--border)'}`,
            background: o.sel ? 'var(--brand-50)' : 'var(--bg-raised)',
            borderRadius: 10,
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: o.sel ? 'var(--brand-600)' : 'var(--ink-150)',
              color: o.sel ? '#fff' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0,
            }}>{o.l}</span>
            <span style={{ fontSize: 12, lineHeight: 1.5 }}>{o.t}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12, marginTop: 18 }}>
        Submit answer
      </button>
    </div>
  </MobileShell>
);

const MobileProfile = () => (
  <MobileShell title="My Profile" activeTab="profile">
    <div style={{
      background: 'linear-gradient(135deg, var(--brand-900), var(--brand-600))',
      color: '#fff', padding: '24px 18px 18px', textAlign: 'center',
    }}>
      <Avatar user={USER_MAP['me']} size={72} />
      <h2 style={{ color: '#fff', marginTop: 10, fontSize: 18 }}>Ananya Ramaswamy</h2>
      <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>ISO 9001 Lead Auditor</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        <RankBadge points={3842} />
        <Reputation points={3842} />
      </div>
    </div>

    <div style={{ background: 'var(--bg-raised)', padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 10 }}>
      <div>
        <div className="mono" style={{ fontSize: 17, fontWeight: 700 }}>217</div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>Answers</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 17, fontWeight: 700 }}>28</div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>Resources</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 17, fontWeight: 700 }}>9</div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>Badges</div>
      </div>
    </div>

    <div style={{ padding: 14 }}>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 11 }}>
        <Icon name="download" size={13} /> Download my resume
      </button>
      <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 8 }}>
        Skills (auto-endorsed)
      </div>
      {[
        { n: 'ISO 9001', l: 96 },
        { n: 'Internal Audit', l: 88 },
        { n: 'Root Cause Analysis', l: 85 },
      ].map(s => (
        <div key={s.n} style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
            <span style={{ fontWeight: 600 }}>{s.n}</span>
            <span className="mono" style={{ color: 'var(--brand-700)' }}>{s.l}%</span>
          </div>
          <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.l}%` }} /></div>
        </div>
      ))}
    </div>
  </MobileShell>
);

const MobilePreview = () => (
  <MobileShell noTopBar activeTab="library">
    <div style={{
      background: '#2a322f', color: '#fff', padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 8, fontSize: 11,
    }}>
      <Icon name="x" size={16} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>GRI-2024-Mapping-v3.xlsx</div>
        <div style={{ opacity: 0.6, fontSize: 10 }}>2.1 MB · Sonu Singh</div>
      </div>
      <button style={{
        padding: '4px 10px', background: 'var(--amber-500)', color: 'var(--brand-900)',
        fontSize: 11, fontWeight: 700, borderRadius: 4,
      }}>↓ Get</button>
    </div>
    <div style={{ background: '#fff', padding: 14, flex: 1, fontFamily: 'sans-serif', fontSize: 10, color: '#222', overflow: 'auto' }}>
      <div style={{ background: '#2d5a3d', color: '#fff', padding: '6px 10px', fontSize: 11, fontWeight: 600 }}>GRI-2024-Mapping-v3.xlsx</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, fontSize: 9 }}>
        <thead>
          <tr style={{ background: '#dcefe2' }}>
            <th style={{ padding: 4, border: '1px solid #c0d8c8', textAlign: 'left', color: '#2d5a3d' }}>GRI</th>
            <th style={{ padding: 4, border: '1px solid #c0d8c8', textAlign: 'left', color: '#2d5a3d' }}>Topic</th>
            <th style={{ padding: 4, border: '1px solid #c0d8c8', textAlign: 'left', color: '#2d5a3d' }}>ESRS</th>
            <th style={{ padding: 4, border: '1px solid #c0d8c8', textAlign: 'left', color: '#2d5a3d' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['305-1', 'Scope 1 GHG', 'E1', '✓'],
            ['305-2', 'Scope 2 GHG', 'E1', '✓'],
            ['305-3', 'Scope 3 GHG', 'E1', '⋯'],
            ['305-4', 'GHG intensity', 'E1', '○'],
            ['305-5', 'GHG reduction', 'E1', '⋯'],
            ['401-1', 'Hires & turnover', 'S1', '✓'],
            ['403-9', 'Work injuries', 'S1', '✓'],
            ['302-1', 'Energy use', 'E1', '✓'],
          ].map(([a,b,c,d], i) => (
            <tr key={i} style={{ background: i % 2 ? '#fafafa' : '#fff' }}>
              <td style={{ padding: 4, border: '1px solid #e0e0e0' }}>{a}</td>
              <td style={{ padding: 4, border: '1px solid #e0e0e0' }}>{b}</td>
              <td style={{ padding: 4, border: '1px solid #e0e0e0' }}>{c}</td>
              <td style={{ padding: 4, border: '1px solid #e0e0e0', color: d === '✓' ? '#2d5a3d' : d === '⋯' ? '#c2700a' : '#b84557' }}>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ background: '#2a322f', color: '#fff', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
      <span>← 1 / 4 →</span>
      <span>Indicator Map</span>
    </div>
  </MobileShell>
);

Object.assign(window, { OnboardingTour, MobileShowcasePage });

// Additional mobile screens
const MobileMentor = () => (
  <MobileShell title="Mentorship" activeTab="profile">
    <div style={{ background: 'linear-gradient(135deg, var(--brand-900), var(--moss-500))', color: '#fff', padding: 18 }}>
      <div style={{ fontSize: 11, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Smart match</div>
      <div style={{ fontSize: 15, marginTop: 4 }}>3 strong matches for you</div>
    </div>
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[{ id: 'u8', focus: 'ISO 9001 · Audit programs', slots: '4 of 5 booked' },
        { id: 'u3', focus: 'ESG · GRI · BRSR', slots: '3 of 5 booked' },
        { id: 'u2', focus: 'NEBOSH IGC · Mining HSE', slots: 'Waitlist' }].map(m => {
        const u = USER_MAP[m.id];
        return (
          <div key={m.id} style={{ background: 'var(--bg-raised)', borderRadius: 12, padding: 12, display: 'flex', gap: 12, alignItems: 'center', border: '1px solid var(--border)' }}>
            <Avatar user={u} size={44} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
              <div style={{ fontSize: 11, color: 'var(--brand-700)', fontWeight: 600, marginTop: 2 }}>{m.focus}</div>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{m.slots}</div>
            </div>
          </div>
        );
      })}
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12, marginTop: 4 }}>
        Request a mentor
      </button>
      <div style={{ marginTop: 16, padding: 14, background: 'var(--amber-50)', borderRadius: 10, border: '1px solid var(--amber-300)' }}>
        <div style={{ fontSize: 11, color: 'var(--amber-600)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next session</div>
        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Pushpender Sharma · ISO 9001</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Thu, May 23 · 19:00 IST</div>
        <button className="btn btn-amber" style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: 8, fontSize: 13 }}>Join call</button>
      </div>
    </div>
  </MobileShell>
);

const MobileCert = () => (
  <MobileShell noTopBar activeTab="profile">
    <div style={{ background: '#000', color: '#fff', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
      <Icon name="x" size={16} />
      <span style={{ flex: 1, fontWeight: 600 }}>Certificate</span>
      <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--moss-500)', borderRadius: 3, fontWeight: 700 }}>✓ VERIFIED</span>
    </div>
    <div style={{ background: '#fff', padding: 14, flex: 1, color: '#1a211f', position: 'relative', overflow: 'hidden' }}>
      <svg width="80" height="80" style={{ position: 'absolute', top: -20, left: -20, opacity: 0.4 }}>
        <circle cx="20" cy="40" r="30" fill="#bce5e5" />
      </svg>
      <div style={{ position: 'relative', textAlign: 'center', paddingTop: 14 }}>
        <div style={{ fontSize: 10, color: '#3979c4', fontWeight: 700, letterSpacing: '0.1em' }}>eGROWTH</div>
        <div style={{ fontFamily: '"Old English Text MT", "Cinzel", Georgia, serif', fontSize: 36, color: '#1a1a1a', marginTop: 12 }}>
          Certi<span style={{ fontStyle: 'italic' }}>ficate</span>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.18em', marginTop: 4, fontVariant: 'small-caps' }}>Of Completion</div>
        <div style={{ fontSize: 11, color: '#3d4642', marginTop: 16 }}>This certifies that</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#3a52a0', letterSpacing: '0.15em', marginTop: 6, fontFamily: 'Sora, sans-serif' }}>ANANYA RAMASWAMY</div>
        <div style={{ height: 1.5, width: 150, background: '#c2a45a', margin: '8px auto' }} />
        <div style={{ fontSize: 11, color: '#3d4642' }}>has successfully completed</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a211f', marginTop: 8, padding: '0 14px' }}>ISO 14001 & 45001 INTERNAL AUDITOR TRAINING</div>
        <div style={{ fontSize: 9, color: '#3a52a0', marginTop: 14 }}>Cert #: eG-IA-2026-04823</div>
        <div style={{ fontSize: 9, color: '#576460', marginTop: 4 }}>Issued: 22.04.2026</div>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'inline-block', width: 50, height: 50, border: '2px solid #000', borderRadius: 4 }}>
            {/* mini QR placeholder */}
            <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #000 0 4px, #fff 4px 7px)' }} />
          </div>
        </div>
      </div>
    </div>
    <div style={{ background: '#000', color: '#fff', padding: '8px 14px', display: 'flex', gap: 6 }}>
      <button style={{ flex: 1, padding: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', fontSize: 11, fontWeight: 600 }}>
        <Icon name="share" size={12} /> Share
      </button>
      <button style={{ flex: 1, padding: 8, background: 'var(--amber-500)', borderRadius: 6, color: '#0e4040', fontSize: 11, fontWeight: 700 }}>
        <Icon name="download" size={12} /> PDF
      </button>
    </div>
  </MobileShell>
);

const MobileSettings = () => (
  <MobileShell title="Settings" activeTab="profile">
    {[
      { sec: 'Account', items: [['Profile', '→'], ['Email & phone', 'ananya.r@…'], ['Change password', '→']] },
      { sec: 'Privacy', items: [['Public profile', 'On'], ['Show email', 'Off'], ['Allow messages', 'On'], ['Indexing by Google', 'Off']] },
      { sec: 'Notifications', items: [['In-app', 'On'], ['Email digest', 'Daily'], ['WhatsApp', 'Off'], ['Quiet hours', '22:00–07:00']] },
      { sec: 'Feed', items: [['Show jobs', 'On'], ['Show Bytes', 'On'], ['Show external links', 'On']] },
      { sec: 'Safety', items: [['Blocked accounts', '0'], ['Community guidelines', '→'], ['Report a problem', '→']] },
      { sec: 'About', items: [['eGrowth v4.2.1', null], ['Sign out', null]] },
    ].map(s => (
      <div key={s.sec} style={{ marginTop: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, padding: '0 14px 6px' }}>{s.sec}</div>
        <div style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          {s.items.map(([label, val], i) => (
            <div key={i} style={{
              padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: i < s.items.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: 13,
            }}>
              <span style={{ flex: 1, color: label === 'Sign out' ? 'var(--rose-600)' : 'var(--text)', fontWeight: label === 'Sign out' ? 600 : 400 }}>{label}</span>
              {val && (
                <span style={{ fontSize: 11, color: val === 'On' || val === 'Daily' ? 'var(--moss-700)' : 'var(--text-dim)', fontWeight: 600 }}>
                  {val}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
    <div style={{ padding: 14, fontSize: 10, color: 'var(--text-dim)', textAlign: 'center' }}>
      eGrowthIndia.in · v4.2.1 · build 8420
    </div>
  </MobileShell>
);

Object.assign(window, { MobileMentor, MobileCert, MobileSettings });
