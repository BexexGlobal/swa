// Shared UI primitives — Avatar, Icon, Rank badge, etc.

const Icon = ({ name, size = 18, className = '', style }) => {
  const s = size;
  const paths = {
    home: <><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/></>,
    feed: <><path d="M4 6h16M4 12h16M4 18h10"/></>,
    library: <><path d="M4 4h6v16H4zM14 4h6v16h-6z"/><path d="M10 8h4M10 12h4M10 16h4" strokeWidth="0"/></>,
    jobs: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/></>,
    question: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/></>,
    resource: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/></>,
    job: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/></>,
    request: <><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></>,
    event: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    upvote: <><path d="M12 4l8 10H4z"/></>,
    comment: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    bookmark: <><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
    bell: <><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></>,
    messages: <><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></>,
    sparkle: <><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/></>,
    star: <><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 016-6h4a6 6 0 016 6v2"/></>,
    users: <><circle cx="9" cy="8" r="4"/><circle cx="17" cy="10" r="3"/><path d="M3 21v-2a5 5 0 015-5h2a5 5 0 015 5v2M15 14h2a4 4 0 014 4v3"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    trend: <><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></>,
    location: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    check: <><path d="M5 12l5 5L20 7"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></>,
    book: <><path d="M4 4a2 2 0 012-2h12v16H6a2 2 0 00-2 2V4z"/><path d="M4 20a2 2 0 012-2h12"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    flag: <><path d="M4 21V4M4 4h14l-3 4 3 4H4"/></>,
    folder: <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></>,
    moon: <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 110-4h.09A1.65 1.65 0 004.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V2a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H22a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    layers: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></>,
    x: <><path d="M18 6L6 18M6 6l12 12"/></>,
    filter: <><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    fire: <><path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-2 1-3 1-3s-1 6 3 6c2 0 2-2 2-3 0-3-2-8-2-8z"/></>,
    arrow: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {paths[name] || null}
    </svg>
  );
};

const Avatar = ({ user, size = 40, badge = false }) => {
  if (!user) return null;
  const styleObj = {
    width: size, height: size,
    background: user.color || 'var(--brand-100)',
    color: '#fff',
    fontSize: size * 0.4,
  };
  return (
    <span className="avatar" style={styleObj}>{user.initials}</span>
  );
};

const RankBadge = ({ points, showLabel = true, size = 'sm' }) => {
  const tier = getTier(points);
  const fontSize = size === 'xs' ? 10 : 11;
  return (
    <span className={`rank-badge ${tier.className}`} style={{ fontSize }}>
      <span>{tier.roman}</span>
      {showLabel && <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{tier.label}</span>}
    </span>
  );
};

const Reputation = ({ points, size = 'sm' }) => (
  <span className={`repo-token ${size === 'lg' ? 'large' : ''}`}>
    <span className="glyph">R</span>
    <span>{points.toLocaleString()}</span>
    <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 600 }}>REPO</span>
  </span>
);

const RepoChange = ({ delta }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    color: delta > 0 ? 'var(--moss-700)' : 'var(--rose-600)',
    fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)',
  }}>
    {delta > 0 ? '+' : ''}{delta} REPO
  </span>
);

const PostKindTag = ({ kind }) => {
  const map = {
    question: { label: 'Question', cls: 'kind-question', icon: 'question' },
    resource: { label: 'Resource', cls: 'kind-resource', icon: 'resource' },
    job:      { label: 'Job',      cls: 'kind-job',      icon: 'briefcase' },
    request:  { label: 'Request',  cls: 'kind-request',  icon: 'request' },
    event:    { label: 'Event',    cls: 'kind-event',    icon: 'event' },
  };
  const m = map[kind];
  if (!m) return null;
  return (
    <span className={`post-kind ${m.cls}`}>
      <Icon name={m.icon} size={11} />
      {m.label}
    </span>
  );
};

const Tag = ({ name, onClick }) => (
  <span className="chip chip-outline" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    #{name}
  </span>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="logo-mark">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 14 L9 19 L20 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
    <div className="logo-text">e<span>Growth</span></div>
  </div>
);

const Toast = ({ msg }) => msg ? <div className="toast">{msg}</div> : null;

Object.assign(window, { Icon, Avatar, RankBadge, Reputation, RepoChange, PostKindTag, Tag, Logo, Toast });
