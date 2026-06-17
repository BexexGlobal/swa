// Home page — feed + right rail
// Also exposes Ask modal

const HomePage = ({ currentUser, onNavigate, showFounder, savedSet, toggleSave, votedSet, toggleVote, onAsk }) => {
  const [filter, setFilter] = React.useState('all');
  const items = filter === 'all' ? FEED : FEED.filter(p => p.kind === filter);
  return (
    <div>
      {/* Welcome strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 22, padding: '0 4px',
      }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>
            Good morning, {currentUser.name.split(' ')[0]}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '4px 0 0' }}>
            48,219 QEHS &amp; ESG professionals are sharing &amp; growing today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" onClick={() => onNavigate('library')}>
            <Icon name="library" size={14} /> Browse library
          </button>
          <button className="btn btn-primary" onClick={onAsk}>
            <Icon name="plus" size={14} /> Share
          </button>
        </div>
      </div>

      <div className="main-with-rail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Compose currentUser={currentUser} onAsk={onAsk} />
          <QuestionOfTheDay />
          <FeedFilters active={filter} onChange={setFilter} />
          {items.map((p, idx) => (
            <React.Fragment key={p.id}>
              <FeedItem
                post={p}
                savedSet={savedSet}
                toggleSave={toggleSave}
                votedSet={votedSet}
                toggleVote={toggleVote}
                onComment={() => {}}
              />
              {idx === 1 && <PollCard />}
            </React.Fragment>
          ))}
          <div style={{ textAlign: 'center', padding: 20 }}>
            <button className="btn btn-outline">Load more</button>
          </div>
        </div>

        <div className="side-rail" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <YourRankCard user={currentUser} />
          {showFounder && <FounderPromoCard onLearn={() => onNavigate('learn')} />}
          <TopContributorsCard />
          <TrendingTagsCard />
          <HowRankingWorksCard />
          <StatsBlock />
        </div>
      </div>
    </div>
  );
};

const AskModal = ({ open, onClose, onSubmit, currentUser }) => {
  const [kind, setKind] = React.useState('question');
  const [title, setTitle] = React.useState('');
  if (!open) return null;

  const KINDS = [
    { id: 'question', label: 'Ask a question', icon: 'question', color: 'var(--brand-700)', bg: 'var(--brand-50)', placeholder: 'What\'s your QEHS / ESG question?' },
    { id: 'resource', label: 'Share a resource', icon: 'resource', color: 'var(--moss-700)', bg: 'var(--moss-100)', placeholder: 'Brief description of the file you\'re sharing…' },
    { id: 'request',  label: 'Request a resource', icon: 'request', color: 'var(--rose-600)', bg: 'var(--rose-100)', placeholder: 'What template, deck, or doc are you looking for?' },
    { id: 'job',      label: 'Post a job',       icon: 'briefcase', color: 'var(--amber-600)', bg: 'var(--amber-50)', placeholder: 'Job title, e.g. "Senior HSE Manager — Mining"' },
  ];
  const current = KINDS.find(k => k.id === kind);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10, 21, 19, 0.55)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: 80, zIndex: 150, backdropFilter: 'blur(2px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 560, borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        border: '1px solid var(--border)',
        animation: 'fadeIn 0.18s ease-out',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar user={currentUser} size={32} />
            <div style={{ fontSize: 13, fontWeight: 600 }}>{currentUser.name}</div>
            <RankBadge points={currentUser.reputation} showLabel={false} />
          </div>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
            {KINDS.map(k => (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                style={{
                  padding: '12px 8px',
                  borderRadius: 'var(--r-md)',
                  background: kind === k.id ? k.bg : 'var(--bg-sunken)',
                  border: `1px solid ${kind === k.id ? k.color : 'var(--border)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  cursor: 'pointer',
                  color: kind === k.id ? k.color : 'var(--text-muted)',
                  transition: 'all 0.15s',
                  fontWeight: kind === k.id ? 600 : 500,
                  fontSize: 12,
                }}
              >
                <Icon name={k.icon} size={20} />
                {k.label}
              </button>
            ))}
          </div>

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={current.placeholder}
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: 16,
              border: 'none',
              borderBottom: '1px solid var(--border)',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
            }}
          />
          <textarea
            placeholder="Add more details (markdown supported)…"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: 14,
              border: 'none',
              outline: 'none',
              resize: 'none',
              minHeight: 100,
              background: 'transparent',
              lineHeight: 1.55,
            }}
          />

          {kind === 'resource' && (
            <div style={{
              border: '2px dashed var(--border-strong)',
              borderRadius: 'var(--r-md)',
              padding: 24,
              textAlign: 'center',
              background: 'var(--bg-sunken)',
              marginBottom: 12,
            }}>
              <Icon name="download" size={28} style={{ color: 'var(--text-dim)', transform: 'rotate(180deg)' }} />
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8 }}>Drop your PDF, PPT, XLS, or DOC here</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>Max 25 MB · License will be CC-BY-SA</div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 0', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Tag:</span>
            {['quality', 'safety', 'esg', 'environment', 'health', 'energy'].map(t => (
              <span key={t} className="chip chip-outline" style={{ cursor: 'pointer', fontSize: 12 }}>#{t}</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            <Icon name="sparkle" size={12} style={{ verticalAlign: 'middle', color: 'var(--amber-500)' }} /> {kind === 'question' ? '+5 rep when answered' : kind === 'resource' ? '+2 rep per download' : kind === 'job' ? '+15 rep for posting' : '+3 rep when a peer helps'}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onSubmit} disabled={!title} data-action={`post-${kind}`}>
              Post to community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HomePage, AskModal });
