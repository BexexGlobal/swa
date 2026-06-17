// Resource Library, Jobs Board, Learn (founder content)

const LibraryPage = () => {
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('popular');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const all = [...RESOURCES_LIBRARY, ...(window.EXPANDED_RESOURCES || [])];
  const filtered = all.filter(r => {
    if (filter !== 'all' && !r.tags.includes(filter)) return false;
    if (typeFilter === 'all') return true;
    if (typeFilter === 'office') return ['docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt', 'pdf'].includes(r.type);
    if (typeFilter === 'apple') return ['key', 'pages', 'numbers'].includes(r.type);
    if (typeFilter === 'external') return ['yt', 'drive', 'sharepoint', 'dropbox', 'link'].includes(r.type);
    if (typeFilter === 'archives') return r.type === 'zip';
    return true;
  }).sort((a, b) => sort === 'popular' ? (b.downloads || b.views || 0) - (a.downloads || a.views || 0) : 0);

  return (
    <div>
      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--moss-100), var(--brand-50))',
        borderRadius: 'var(--r-lg)',
        padding: 32,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--brand-200)',
      }}>
        <div style={{ position: 'absolute', right: 32, top: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <FileGlyph type="pdf" size={70} />
          <FileGlyph type="xls" size={84} />
          <FileGlyph type="ppt" size={70} />
        </div>
        <div style={{ position: 'relative', maxWidth: 540 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--moss-700)', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            <Icon name="sparkle" size={12} /> 100% free · 100% community-built
          </div>
          <h1 style={{ fontSize: 32, lineHeight: 1.15, fontWeight: 700 }}>The QEHS Library</h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8, maxWidth: 480, lineHeight: 1.55 }}>
            4,219 templates, checklists, decks, and audit kits — shared by professionals like you. Download anything, upload yours, and earn reputation.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button className="btn btn-primary" data-action="open-upload-resource">
              <Icon name="plus" size={14} /> Upload a resource
            </button>
            <button className="btn btn-outline" data-action="open-request-resource">
              <Icon name="request" size={14} /> Request a resource
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <DisclaimerBanner variant="content" />
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        {['all', 'quality', 'environment', 'health', 'safety', 'energy', 'sustainability', 'esg'].map(f => (
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
        <div style={{ flex: 1 }} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: '7px 12px',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border)',
            background: 'var(--bg-raised)',
            fontSize: 13,
            color: 'var(--text)',
            cursor: 'pointer',
          }}
        >
          <option value="popular">Most downloaded</option>
          <option value="recent">Most recent</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* File type filter — second row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18, flexWrap: 'wrap', padding: '10px 14px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
        <span style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginRight: 6 }}>File type:</span>
        {[
          { id: 'all',      label: 'All', icon: null },
          { id: 'office',   label: 'Office · PDF', icon: 'doc' },
          { id: 'apple',    label: 'Apple iWork', icon: 'apple' },
          { id: 'archives', label: 'Archives (ZIP)', icon: 'zip' },
          { id: 'external', label: 'YouTube · Drive · SharePoint', icon: 'link' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTypeFilter(t.id)}
            className="chip"
            style={{
              cursor: 'pointer',
              background: typeFilter === t.id ? 'var(--bg-raised)' : 'transparent',
              color: typeFilter === t.id ? 'var(--brand-700)' : 'var(--text-muted)',
              border: typeFilter === t.id ? '1px solid var(--brand-300)' : '1px solid transparent',
              padding: '4px 10px',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filtered.map(r => <ResourceGridCard key={r.id} r={r} />)}
      </div>
    </div>
  );
};

const FileGlyph = ({ type, size = 60 }) => (
  <div className={`resource-preview ft-${type}`} style={{
    width: size * 0.78, height: size,
    borderRadius: 6,
    transform: `rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`,
  }}>
    <span className="filetype" style={{ fontSize: size * 0.28 }}>{type.toUpperCase()}</span>
  </div>
);

const ResourceGridCard = ({ r }) => {
  const author = USER_MAP[r.uploadedBy];
  const isExternal = ['yt', 'drive', 'sharepoint', 'dropbox', 'link'].includes(r.type);
  const TYPE_LABEL = { yt: 'YOUTUBE', drive: 'GOOGLE DRIVE', sharepoint: 'SHAREPOINT', dropbox: 'DROPBOX', key: 'KEYNOTE', pages: 'PAGES', numbers: 'NUMBERS', pptx: 'PPTX', xlsx: 'XLSX', docx: 'DOCX', zip: 'ZIP' };
  const TYPE_GLYPH = { yt: '▶', drive: '◯', sharepoint: '▣', dropbox: '◇', key: '◆', pages: '¶', numbers: 'Σ' };
  return (
    <div className="card card-hover resource-card fade-in" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => window.__openPreview && window.__openPreview(r)}>
      <div className={`resource-preview ft-${r.type}`} style={{ height: 110, position: 'relative' }}>
        {TYPE_GLYPH[r.type] && (
          <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 18, color: '#fff', opacity: 0.5 }}>{TYPE_GLYPH[r.type]}</div>
        )}
        <span className="filetype" style={{ fontSize: r.type.length > 4 ? 14 : 22 }}>
          {TYPE_LABEL[r.type] || r.type.toUpperCase()}
        </span>
        {isExternal && (
          <span style={{
            position: 'absolute', bottom: 8, left: 10,
            padding: '1px 7px',
            background: 'rgba(255,255,255,0.2)',
            color: '#fff', fontSize: 9, fontWeight: 700,
            borderRadius: 3, letterSpacing: '0.08em',
            backdropFilter: 'blur(4px)',
          }}>
            EXTERNAL
          </span>
        )}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          padding: '2px 8px',
          background: 'rgba(0,0,0,0.3)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 600,
          borderRadius: 999,
          backdropFilter: 'blur(4px)',
        }}>
          {r.type === 'yt' ? r.duration : r.size}
        </span>
      </div>
      <div style={{ padding: 14 }}>
        <h4 style={{ fontSize: 14, lineHeight: 1.3, fontWeight: 600, margin: '0 0 8px', minHeight: 36, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {r.title}
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {r.tags.map(t => (
            <span key={t} className="chip chip-outline" style={{ padding: '1px 7px', fontSize: 10 }}>#{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <Avatar user={author} size={22} />
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{author.name.split(' ')[0]}</span>
          <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>· {r.ts}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }} className="mono">
            ↓ {(r.downloads || r.views || 0).toLocaleString()}
          </span>
          <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} onClick={(e) => { e.stopPropagation(); }}>
            <Icon name={r.type === 'yt' ? 'eye' : isExternal ? 'arrow' : 'download'} size={12} />
            {r.type === 'yt' ? 'Watch' : isExternal ? 'Open' : 'Get'}
          </button>
        </div>
      </div>
    </div>
  );
};

const JobsPage = () => {
  const [filter, setFilter] = React.useState('all');
  const filtered = JOBS.filter(j => filter === 'all' || j.tags.includes(filter));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 6 }}>Jobs Board</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
            186 open roles across QEHS &amp; ESG · 100% free to post, 100% free to apply
          </p>
        </div>
        <button className="btn btn-primary" data-action="open-post-job">
          <Icon name="plus" size={14} />
          Post a job
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0 18px', flexWrap: 'wrap' }}>
        {['all', 'quality', 'safety', 'health', 'environment', 'energy', 'sustainability', 'esg'].map(f => (
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

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(j => <JobListItem key={j.id} job={j} />)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 88 }}>
          <div className="card" style={{ padding: 20, background: 'var(--amber-50)', borderColor: 'var(--amber-300)' }}>
            <Icon name="sparkle" size={22} style={{ color: 'var(--amber-600)', marginBottom: 8 }} />
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Get matched to roles</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
              Based on your skills (Quality, ESG, Audit), we'd surface <strong>14 strong matches</strong> this week.
            </p>
            <button className="btn btn-amber" style={{ width: '100%', justifyContent: 'center' }}>
              Turn on matching
            </button>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>
              Top hiring companies
            </h3>
            {['Kopano Resources', 'GreenArc Advisory', 'Vantara Textiles', 'NovaDiagnostics', 'Nebula Infra'].map((c, i) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-700)', fontSize: 12 }}>
                  {c.split(' ').map(w => w[0]).slice(0,2).join('')}
                </div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{c}</div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>{[7,4,3,2,2][i]} open</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListItem = ({ job }) => {
  const poster = USER_MAP[job.postedBy];
  return (
    <div className="card card-hover" style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 'var(--r-md)',
          background: 'var(--bg-sunken)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-700)',
          fontSize: 16, flexShrink: 0,
          border: '1px solid var(--border)',
        }}>
          {job.company.split(' ').map(w => w[0]).slice(0,2).join('')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>{job.title}</h3>
            {job.remote && <span className="chip chip-moss" style={{ padding: '1px 8px', fontSize: 10 }}>Remote</span>}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <span>{job.company}</span>
            <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}><Icon name="location" size={12} /> {job.location}</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-700)' }}>{job.salary}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {job.tags.map(t => <Tag key={t} name={t} />)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <button className="btn btn-amber" style={{ padding: '6px 14px' }} data-action={`apply-job-${job.id}`}>Apply</button>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }} className="mono">
            {job.applications} applied · {job.ts}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
        <Avatar user={poster} size={22} />
        Posted by <strong style={{ color: 'var(--text)' }}>{poster.name}</strong>
        <RankBadge points={poster.reputation} showLabel={false} size="xs" />
        <div style={{ flex: 1 }} />
        <button className="activity-btn" style={{ padding: '4px 8px' }}>
          <Icon name="bookmark" size={13} /> Save
        </button>
      </div>
    </div>
  );
};

const LearnPage = () => {
  const founder = USER_MAP['u8'];
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 60%, var(--amber-600) 130%)',
        color: '#fff',
        borderRadius: 'var(--r-lg)',
        padding: 36,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400) 0%, transparent 60%)', opacity: 0.4 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, position: 'relative' }}>
          <Avatar user={founder} size={56} />
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Founder · Author · QEHS Trainer</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Pushpender Sharma</div>
          </div>
        </div>
        <h1 style={{ fontSize: 30, lineHeight: 1.2, color: '#fff', maxWidth: 580, position: 'relative' }}>
          The Learn hub — webinars, trainings &amp; books from the eGrowth founder
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 580, marginTop: 12, position: 'relative' }}>
          Most things here are free — that's the eGrowth way. A few deep-dive programs are paid; every cent goes back into building this community.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {EVENTS.map(e => (
          <div key={e.id} className="card" style={{ padding: 22 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 10px', background: 'var(--brand-100)', color: 'var(--brand-800)',
              borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
              marginBottom: 14,
            }}>
              {e.kind}
            </div>
            <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{e.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
              <Icon name="clock" size={13} />
              {e.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: e.price === 'Free' ? 'var(--moss-700)' : 'var(--amber-600)' }}>{e.price}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{e.registered.toLocaleString()} {e.kind.includes('Book') ? 'pre-orders' : 'registered'}</div>
              </div>
              <button className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }}>
                {e.price === 'Free' ? 'Register' : 'Reserve seat'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { LibraryPage, JobsPage, LearnPage });
