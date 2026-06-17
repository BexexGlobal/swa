// Reels — vertical short videos for QEHS tips

const ReelsPage = () => {
  const [filter, setFilter] = React.useState('For you');
  const [liked, setLiked] = React.useState(new Set([1]));
  const [submitOpen, setSubmitOpen] = React.useState(false);

  const REEL_FILTERS = [
    { id: 'For you',   match: () => true },
    { id: 'Following', match: r => ['u8','u3'].includes(r.author) },
    { id: 'Quality',   match: r => r.tags.includes('quality') || r.tags.includes('audit') },
    { id: 'Safety',    match: r => r.tags.includes('safety') || r.tags.includes('loto') || r.tags.includes('hazop') },
    { id: 'ESG',       match: r => r.tags.includes('esg') || r.tags.includes('scope-3') },
    { id: 'Energy',    match: r => r.tags.includes('energy') || r.tags.includes('iso-50001') },
    { id: 'Career',    match: r => r.tags.includes('careers') },
    { id: 'Trending',  match: r => r.plays > 10000 },
  ];
  const current = REEL_FILTERS.find(f => f.id === filter) || REEL_FILTERS[0];
  const filtered = REELS.filter(current.match);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Knowledge Bytes</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            30-second to 2-minute videos from QEHS practitioners. Watch · learn · save · share.
          </p>
        </div>
        <button className="btn btn-primary" data-action="open-submit-reel" onClick={() => setSubmitOpen(true)}>
          <Icon name="plus" size={14} />
          Record a Byte
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', flexWrap: 'wrap' }}>
        {REEL_FILTERS.map(f => (
          <button
            key={f.id}
            data-action={`reel-filter-${f.id.toLowerCase().replace(/\s+/g,'-')}`}
            onClick={() => setFilter(f.id)}
            className="chip"
            style={{
              cursor: 'pointer',
              background: filter === f.id ? 'var(--brand-800)' : 'var(--ink-100)',
              color: filter === f.id ? '#fff' : 'var(--text-muted)',
              padding: '6px 14px',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {f.id}
          </button>
        ))}
      </div>

      {/* Reels grid (TikTok-style cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.map((r, i) => (
          <ReelCard
            key={r.id}
            reel={r}
            isLiked={liked.has(i)}
            isActive={false}
            onClick={() => {}}
            onLike={() => {
              const next = new Set(liked);
              if (next.has(i)) next.delete(i);
              else next.add(i);
              setLiked(next);
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', color: 'var(--text-dim)', background: 'var(--bg-sunken)', borderRadius: 'var(--r-lg)' }}>
            <Icon name="sparkle" size={28} />
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8 }}>No Bytes in “{filter}” yet</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Be the first — record one and earn <Reputation points={100} /></div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 26 }}>
        <DisclaimerBanner variant="content" />
      </div>

      <SubmitDesignModal open={submitOpen} onClose={() => setSubmitOpen(false)} onSubmit={() => { setSubmitOpen(false); window.__toast && window.__toast('Submitted for review · we’ll email you in ~48 hrs'); }} kind="reel" />

      <div style={{ marginTop: 26, textAlign: 'center', padding: 18, background: 'var(--brand-50)', borderRadius: 'var(--r-lg)', border: '1px solid var(--brand-200)' }}>
        <Icon name="sparkle" size={20} style={{ color: 'var(--amber-500)' }} />
        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>Earn <Reputation points={5} /> per 1,000 plays · <Reputation points={10} /> per save</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Record on your phone, upload here, help thousands. Top creators get featured on eGrowthIndia.com.
        </div>
      </div>
    </div>
  );
};

const ReelCard = ({ reel, isLiked, isActive, onClick, onLike }) => {
  const author = USER_MAP[reel.author];
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '9 / 16',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: reel.gradient,
        boxShadow: isActive ? '0 0 0 3px var(--amber-400), var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: 'all 0.15s',
      }}
      className="card-hover"
    >
      {/* Animated dot pattern overlay for visual interest */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0, transparent 50%)',
      }} />

      {/* Play button center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 56, height: 56, borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 3 }}>
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>

      {/* Duration top-right */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        padding: '2px 8px',
        background: 'rgba(0,0,0,0.5)',
        color: '#fff', fontSize: 11, fontWeight: 600,
        borderRadius: 4,
        fontFamily: 'var(--font-mono)',
      }}>
        {reel.duration}
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 14,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7) 60%)',
        color: '#fff',
      }}>
        <h3 style={{ fontSize: 14, color: '#fff', lineHeight: 1.3, marginBottom: 10, fontWeight: 600 }}>{reel.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, marginBottom: 8 }}>
          <Avatar user={author} size={22} />
          <span style={{ fontWeight: 600 }}>{author.name.split(' ')[0]}</span>
          {author.isFounder && <span style={{ background: 'var(--amber-500)', color: 'var(--brand-900)', padding: '0 5px', borderRadius: 3, fontWeight: 700, fontSize: 9 }}>FOUNDER</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
          <span className="mono">{(reel.plays / 1000).toFixed(1)}K plays</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              style={{
                color: '#fff', display: 'flex', alignItems: 'center', gap: 3,
                background: 'transparent',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill={isLiked ? '#f0a23c' : 'none'} stroke="#fff" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {(reel.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </button>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon name="comment" size={12} /> {reel.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Posters page ─────────────────────────────────────────────────────────
const PostersPage = () => {
  const [filter, setFilter] = React.useState('all');
  const [submitOpen, setSubmitOpen] = React.useState(false);
  const filtered = POSTERS.filter(p => filter === 'all' || p.domain === filter);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Posters & Visuals</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Print-ready safety posters, infographics, and visual SOPs. Free for any workplace. Multiple languages.
          </p>
        </div>
        <button className="btn btn-primary" data-action="open-submit-poster" onClick={() => setSubmitOpen(true)}>
          <Icon name="plus" size={14} />
          Submit your design
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', flexWrap: 'wrap' }}>
        {['all', 'safety', 'health', 'environment', 'quality', 'esg', 'energy'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="chip"
            style={{
              cursor: 'pointer',
              background: filter === f ? 'var(--brand-800)' : 'var(--ink-100)',
              color: filter === f ? '#fff' : 'var(--text-muted)',
              padding: '6px 14px',
              fontWeight: 600,
              fontSize: 13,
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
        {filtered.map(p => <PosterCard key={p.id} poster={p} />)}
      </div>

      <div style={{ marginTop: 22 }}>
        <DisclaimerBanner variant="content" />
      </div>

      <SubmitDesignModal open={submitOpen} onClose={() => setSubmitOpen(false)} onSubmit={() => { setSubmitOpen(false); window.__toast && window.__toast('Poster submitted for review'); }} kind="poster" />
    </div>
  );
};

const PosterCard = ({ poster }) => (
  <div className="card card-hover" style={{ overflow: 'hidden' }}>
    {/* Poster preview — A-series-ish */}
    <div style={{
      aspectRatio: '0.707',
      background: poster.bg,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: poster.accent,
      padding: 20,
      textAlign: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15), transparent 70%)' }} />
      <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 14, fontFamily: 'var(--font-display)', fontWeight: 800 }}>{poster.icon}</div>
      <h3 style={{ fontSize: 17, color: poster.accent, lineHeight: 1.2, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        {poster.title}
      </h3>
      <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: poster.accent, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        eGrowth · Free
      </div>
    </div>
    <div style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className="chip chip-outline" style={{ padding: '1px 8px', fontSize: 10, textTransform: 'capitalize' }}>#{poster.domain}</span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{poster.kind}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
        {poster.lang.map(l => (
          <span key={l} style={{
            fontSize: 9, fontWeight: 600, color: 'var(--brand-700)',
            padding: '1px 5px', background: 'var(--brand-100)', borderRadius: 3,
            fontFamily: 'var(--font-mono)',
          }}>{l}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }} className="mono">↓ {poster.downloads.toLocaleString()}</span>
        <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }}>
          <Icon name="download" size={12} /> PDF
        </button>
      </div>
    </div>
  </div>
);

Object.assign(window, { ReelsPage, PostersPage });
