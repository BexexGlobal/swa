// Top bar + Sidebar navigation — grouped sections

const TopBar = ({ onNavigate, current, currentUser, density, onAsk }) => {
  return (
    <div className="topbar">
      <div style={{ width: 224, display: 'flex', alignItems: 'center' }}>
        <button onClick={() => onNavigate('home')} style={{ display: 'flex' }} aria-label="eGrowth home">
          <Logo />
        </button>
      </div>
      <div className="search-input">
        <Icon name="search" size={16} />
        <input
          placeholder="Search questions, resources, jobs, people…"
          onFocus={() => onNavigate('search')}
          readOnly
          data-action="topbar-search-focus"
          style={{ cursor: 'pointer' }}
          aria-label="Open search"
        />
      </div>
      <div style={{ flex: 1 }} />
      <button
        className="btn btn-ghost"
        title="Activity"
        aria-label="Open activity inbox"
        onClick={() => onNavigate('feed')}
        data-action="topbar-bell"
        style={{ position: 'relative', padding: 8 }}
      >
        <Icon name="bell" size={20} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: 'var(--amber-500)', borderRadius: '50%' }} />
      </button>
      <button
        className="btn btn-ghost"
        title="Messages"
        aria-label="Open messages"
        onClick={() => onNavigate('messages')}
        data-action="topbar-messages"
        style={{ position: 'relative', padding: 8 }}
      >
        <Icon name="messages" size={20} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: 'var(--brand-500)', borderRadius: '50%' }} />
      </button>
      <button className="btn btn-primary" onClick={onAsk} data-action="topbar-share">
        <Icon name="plus" size={16} />
        Share
      </button>
      <button onClick={() => onNavigate('profile')} title={currentUser.name} aria-label="Open my profile" style={{ marginLeft: 4 }} data-action="topbar-profile">
        <Avatar user={currentUser} size={34} />
      </button>
    </div>
  );
};

// Grouped nav structure
const NAV_SECTIONS = [
  {
    id: 'discover', label: 'Discover',
    items: [
      { id: 'home',    label: 'Home',           icon: 'home' },
      { id: 'feed',    label: 'Activity · Inbox', icon: 'bell', count: '4' },
      { id: 'messages', label: 'Messages',      icon: 'messages', count: '2' },
      { id: 'search',  label: 'Search',         icon: 'search' },
    ],
  },
  {
    id: 'community', label: 'Community',
    items: [
      { id: 'library', label: 'Resource Library', icon: 'library', count: '4.2K' },
      { id: 'jobs',    label: 'Jobs Board',       icon: 'briefcase', count: '186' },
      { id: 'reels',   label: 'Knowledge Bytes',  icon: 'sparkle' },
      { id: 'posters', label: 'Posters',          icon: 'flag' },
      { id: 'collections', label: 'Collections',  icon: 'bookmark' },
    ],
  },
  {
    id: 'learn', label: 'Learn',
    items: [
      { id: 'learn',  label: 'Learn Hub',     icon: 'book',  count: '48' },
      { id: 'quiz',   label: 'Quiz Arena',    icon: 'award', count: '108' },
      { id: 'games',  label: 'Flashcards',    icon: 'layers' },
    ],
  },
  {
    id: 'connect', label: 'Connect',
    items: [
      { id: 'mentors',  label: 'Mentorship', icon: 'users' },
      { id: 'chapters', label: 'Chapters',   icon: 'globe' },
      { id: 'groups',   label: 'Groups',     icon: 'users' },
    ],
  },
  {
    id: 'me', label: 'Me',
    items: [
      { id: 'profile',  label: 'My Profile', icon: 'user' },
      { id: 'settings', label: 'Settings',   icon: 'settings' },
      { id: 'directory', label: 'Member Directory', icon: 'users' },
    ],
  },
  {
    id: 'about', label: 'About',
    collapsedByDefault: true,
    items: [
      { id: 'help',     label: 'Help & Support', icon: 'messages' },
      { id: 'about',    label: 'About eGrowth',  icon: 'sparkle' },
      { id: 'pricing',  label: 'Pricing',        icon: 'star' },
      { id: 'calendar', label: 'Events Calendar', icon: 'event' },
      { id: 'tag',      label: 'Tag detail (demo)', icon: 'flag' },
    ],
  },
  {
    id: 'demo', label: 'Demo & admin',
    collapsedByDefault: true,
    items: [
      { id: 'qdetail', label: 'Q&A example',     icon: 'question' },
      { id: 'rdetail', label: 'Resource detail', icon: 'resource' },
      { id: 'jdetail', label: 'Job detail',      icon: 'briefcase' },
      { id: 'cdetail', label: 'Course detail',   icon: 'book' },
      { id: 'chdetail', label: 'Chapter detail', icon: 'globe' },
      { id: 'public',  label: 'Public profile',  icon: 'eye' },
      { id: 'mobile',  label: 'Mobile app',      icon: 'layers' },
      { id: 'admin',   label: 'Admin · Mission Control', icon: 'settings' },
    ],
  },
];

const DOMAIN_NAV = [
  { id: 'quality',        label: 'Quality',        color: 'var(--brand-600)' },
  { id: 'environment',    label: 'Environment',    color: 'var(--moss-500)' },
  { id: 'health',         label: 'Health',         color: 'var(--rose-500)' },
  { id: 'safety',         label: 'Safety',         color: 'var(--amber-500)' },
  { id: 'energy',         label: 'Energy',         color: 'var(--brand-700)' },
  { id: 'sustainability', label: 'Sustainability', color: 'var(--moss-700)' },
  { id: 'esg',            label: 'ESG',            color: 'var(--brand-500)' },
];

const Sidebar = ({ current, onNavigate, currentUser, showFounder }) => {
  // Each section can be collapsed
  const [collapsed, setCollapsed] = React.useState(() => {
    const c = {};
    NAV_SECTIONS.forEach(s => { if (s.collapsedByDefault) c[s.id] = true; });
    return c;
  });
  // Auto-expand the section containing the current page
  React.useEffect(() => {
    const section = NAV_SECTIONS.find(s => s.items.some(i => i.id === current));
    if (section && collapsed[section.id]) {
      setCollapsed(c => ({ ...c, [section.id]: false }));
    }
  }, [current]);

  const toggleSection = (id) => setCollapsed(c => ({ ...c, [id]: !c[id] }));

  return (
    <aside className="sidebar">
      {NAV_SECTIONS.map(section => (
        <div key={section.id} style={{ marginBottom: 4 }}>
          <button
            onClick={() => toggleSection(section.id)}
            data-action={`sidebar-toggle-${section.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 14px 4px', width: '100%',
              fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--text-dim)',
              cursor: 'pointer', textAlign: 'left',
            }}
            aria-expanded={!collapsed[section.id]}
          >
            <Icon name="chevronDown" size={12} style={{ transform: collapsed[section.id] ? 'rotate(-90deg)' : 'none', transition: 'transform 0.15s', color: 'var(--text-dim)' }} />
            <span>{section.label}</span>
          </button>
          {!collapsed[section.id] && section.items.map(n => (
            <button
              key={n.id}
              className={`nav-item ${current === n.id ? 'active' : ''}`}
              onClick={() => onNavigate(n.id)}
              data-action={`nav-${n.id}`}
              aria-current={current === n.id ? 'page' : undefined}
            >
              <Icon name={n.icon} size={18} />
              <span>{n.label}</span>
              {n.count && <span className="count">{n.count}</span>}
            </button>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 8 }}>
        <button
          onClick={() => toggleSection('domains')}
          data-action="sidebar-toggle-domains"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 14px 4px', width: '100%',
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--text-dim)',
            cursor: 'pointer', textAlign: 'left',
          }}
        >
          <Icon name="chevronDown" size={12} style={{ transform: collapsed.domains ? 'rotate(-90deg)' : 'none', transition: 'transform 0.15s' }} />
          <span>Domains</span>
        </button>
        {!collapsed.domains && DOMAIN_NAV.map(d => (
          <button key={d.id} className="nav-item" onClick={() => onNavigate('home')} data-action={`nav-domain-${d.id}`}>
            <span style={{ width: 18, color: d.color, fontSize: 10 }}>◆</span>
            <span>{d.label}</span>
          </button>
        ))}
      </div>

      {showFounder && (
        <>
          <div className="nav-section-label">From the founders</div>
          <div style={{ padding: '0 12px' }}>
            <div className="card" style={{ padding: 14, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex' }}>
                  <Avatar user={USER_MAP['u8']} size={28} />
                  <div style={{ marginLeft: -8 }}>
                    <Avatar user={USER_MAP['u9']} size={28} />
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2, flex: 1, minWidth: 0 }}>
                  Pushpender &amp; Amit
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 400 }}>Founders · eGrowth India</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 8 }}>
                3 events · 48 courses · 1 new book
              </div>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: 12, padding: '6px 10px', justifyContent: 'center' }} onClick={() => onNavigate('learn')} data-action="nav-founder-learn">
                Open Learn hub
              </button>
            </div>
          </div>
        </>
      )}

      <div style={{ padding: '0 12px', marginTop: 8 }}>
        <button
          onClick={() => window.__openReferral && window.__openReferral()}
          data-action="open-referral-modal"
          className="card"
          style={{
            padding: 12, width: '100%', cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--amber-50), var(--brand-50))',
            borderColor: 'var(--amber-300)',
            display: 'flex', alignItems: 'center', gap: 10,
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: 22 }}>🎁</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Invite a colleague</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Both earn <strong>+100 REPO</strong></div>
          </div>
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 24 }} />
      <div style={{ padding: '12px 14px', fontSize: 11, color: 'var(--text-dim)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          <a href="#" data-action="sidebar-help" style={{ color: 'var(--text-muted)' }}>Help</a>
          <span>·</span>
          <a href="#" data-action="sidebar-about" style={{ color: 'var(--text-muted)' }}>About</a>
          <span>·</span>
          <a href="#" data-action="sidebar-terms" style={{ color: 'var(--text-muted)' }}>Terms</a>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}>egrowthindia.in</div>
        <div style={{ marginTop: 6 }}>© 2026 eGrowth India</div>
      </div>
    </aside>
  );
};

Object.assign(window, { TopBar, Sidebar });
