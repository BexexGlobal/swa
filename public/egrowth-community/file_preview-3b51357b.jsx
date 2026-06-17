// File preview modal — supports PDF/PPT/XLS/DOC mock previews

const FilePreviewModal = ({ resource, onClose }) => {
  const [page, setPage] = React.useState(1);
  const [zoom, setZoom] = React.useState(100);
  if (!resource) return null;
  const author = USER_MAP[resource.uploadedBy] || USER_MAP[resource.author] || USER_MAP['u8'];

  // External link types route to a different layout
  if (['yt', 'drive', 'sharepoint', 'dropbox', 'link'].includes(resource.type)) {
    return <ExternalPreview resource={resource} author={author} onClose={onClose} />;
  }

  const totalPages = ['xls', 'xlsx', 'numbers'].includes(resource.type) ? 4 : ['ppt', 'pptx', 'key'].includes(resource.type) ? 24 : 12;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.75)',
      zIndex: 200, display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)',
        margin: 24,
        maxWidth: 1200, width: '100%',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--bg-sunken)',
        }}>
          <div className={`resource-preview ft-${resource.type}`} style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)' }}>
            <span className="filetype" style={{ fontSize: 11 }}>{resource.type.toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{resource.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Shared by {author.name} · {resource.size} · CC-BY-SA
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '6px 10px' }}>
            <Icon name="download" size={14} /> Download
          </button>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Body: preview canvas */}
        <div style={{ flex: 1, display: 'flex', background: '#2a322f', overflow: 'hidden', minHeight: 480 }}>
          {/* Page thumbnail strip */}
          <div style={{
            width: 100, background: 'rgba(0,0,0,0.25)',
            padding: 10, overflow: 'auto',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  width: 80, height: resource.type === 'ppt' ? 50 : 100,
                  background: '#fff',
                  border: page === i + 1 ? '2px solid var(--amber-400)' : '2px solid transparent',
                  borderRadius: 4,
                  position: 'relative',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <MockPageContent type={resource.type} page={i + 1} mini />
                <span style={{
                  position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 9, color: '#fff', fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,0,0,0.6)', padding: '0 4px', borderRadius: 2,
                }}>{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Main preview */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, overflow: 'auto', position: 'relative' }}>
            <div style={{
              width: resource.type === 'ppt' ? 720 * (zoom / 100) : 540 * (zoom / 100),
              height: resource.type === 'ppt' ? 405 * (zoom / 100) : 700 * (zoom / 100),
              background: '#fff',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <MockPageContent type={resource.type} page={page} title={resource.title} />
              {/* Watermark */}
              <div style={{
                position: 'absolute', bottom: 16, right: 16,
                fontSize: 10, color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-display)',
                fontWeight: 600, letterSpacing: '0.05em',
              }}>eGrowth Community</div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div style={{
          padding: '10px 20px', borderTop: '1px solid var(--border)',
          background: 'var(--bg-sunken)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setPage(p => Math.max(1, p - 1))}>
              <Icon name="chevronRight" size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <span className="mono" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{page} / {totalPages}</span>
            <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
              <Icon name="chevronRight" size={16} />
            </button>
          </div>
          <div style={{ width: 1, height: 22, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 13 }} onClick={() => setZoom(z => Math.max(50, z - 25))}>−</button>
            <span className="mono" style={{ fontSize: 13, minWidth: 44, textAlign: 'center' }}>{zoom}%</span>
            <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 13 }} onClick={() => setZoom(z => Math.min(200, z + 25))}>+</button>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="eye" size={13} />
            {(resource.downloads || resource.counts?.downloads || 0).toLocaleString()} downloads · Preview only
          </div>
          <button className="activity-btn" style={{ padding: '6px 10px' }}>
            <Icon name="bookmark" size={14} /> Save
          </button>
          <button className="activity-btn" style={{ padding: '6px 10px' }}>
            <Icon name="share" size={14} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock content renderer — visually believable PDF/PPT/XLS previews
const MockPageContent = ({ type, page, title = '', mini = false }) => {
  const t = type;
  if (['xls', 'xlsx', 'numbers'].includes(t)) return <MockSpreadsheet page={page} mini={mini} />;
  if (['ppt', 'pptx', 'key'].includes(t)) return <MockSlide page={page} title={title} mini={mini} />;
  return <MockDocument page={page} title={title} mini={mini} />;
};

// External link / YouTube preview
const ExternalPreview = ({ resource, author, onClose }) => {
  const source = resource.source || resource.type;
  const META = {
    youtube:    { name: 'YouTube',     icon: '▶', color: '#ff0000', cta: 'Watch on YouTube' },
    yt:         { name: 'YouTube',     icon: '▶', color: '#ff0000', cta: 'Watch on YouTube' },
    gdrive:     { name: 'Google Drive', icon: '◯', color: '#fbbc04', cta: 'Open in Google Drive' },
    drive:      { name: 'Google Drive', icon: '◯', color: '#fbbc04', cta: 'Open in Google Drive' },
    sharepoint: { name: 'SharePoint',  icon: '▣', color: '#0078d4', cta: 'Open in SharePoint' },
    dropbox:    { name: 'Dropbox',     icon: '◇', color: '#0061ff', cta: 'Open in Dropbox' },
    link:       { name: 'External',    icon: '🔗', color: '#176e6e', cta: 'Open link' },
  };
  const meta = META[source] || META.link;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.75)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 920, maxHeight: '90vh',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-sunken)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: meta.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
            {meta.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{resource.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Hosted on {meta.name} · Shared by {author.name}
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Body — embed mock */}
        <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, position: 'relative' }}>
          {(source === 'yt' || source === 'youtube') ? (
            <div style={{
              width: '100%', aspectRatio: '16/9', maxHeight: 480,
              background: 'linear-gradient(135deg, #1a1a1a, #000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Mock thumbnail */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(176, 30, 30, 0.3), transparent 70%)' }} />
              <div style={{
                width: 76, height: 56, background: '#ff0000', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255,0,0,0.4)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div style={{ position: 'absolute', top: 16, left: 16, color: '#fff', fontSize: 11, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.5)', padding: '3px 8px', borderRadius: 4 }}>
                ▶ youtube.com
              </div>
              <div style={{ position: 'absolute', bottom: 16, right: 16, color: '#fff', fontSize: 11, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 4 }}>
                {resource.duration}
              </div>
              <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff', fontSize: 12, maxWidth: 540 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{resource.title}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{resource.views?.toLocaleString()} views · YouTube</div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 48, textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 72, marginBottom: 18, color: meta.color }}>{meta.icon}</div>
              <h2 style={{ color: '#fff', fontSize: 22, marginBottom: 8 }}>Hosted externally on {meta.name}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 460, margin: '0 auto', fontSize: 13, lineHeight: 1.6 }}>
                The owner shared this from their {meta.name}. {resource.size && <span>Bundle: <strong>{resource.size}</strong>.</span>} Click the button below to open it in a new tab — your eGrowth REPO travels with you.
              </p>
              <div style={{ marginTop: 28, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', maxWidth: 600, margin: '28px auto 0', overflow: 'hidden', textOverflow: 'ellipsis', padding: '8px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
                🔗 {resource.externalUrl || `https://${source}.com/...`}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="eye" size={13} />
            {(resource.downloads || resource.views || 0).toLocaleString()} {source === 'yt' || source === 'youtube' ? 'plays' : 'opens'}
          </div>
          <div style={{ flex: 1 }} />
          <button className="activity-btn" style={{ padding: '6px 10px' }}>
            <Icon name="bookmark" size={14} /> Save
          </button>
          <button className="activity-btn" style={{ padding: '6px 10px' }}>
            <Icon name="share" size={14} /> Share
          </button>
          <button className="btn btn-primary" style={{ padding: '7px 14px' }}>
            {meta.cta} <Icon name="arrow" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MockDocument = ({ page, title, mini }) => {
  if (mini) {
    return (
      <div style={{ padding: 6, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ height: 4, background: '#1e8a8a', width: '40%', borderRadius: 1 }} />
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ height: 2, background: '#ddd', borderRadius: 1, width: `${85 - (i % 3) * 8}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding: 56, height: '100%', fontFamily: 'Georgia, serif', color: '#333', fontSize: 13, lineHeight: 1.6 }}>
      <div style={{ borderBottom: '2px solid #1e8a8a', paddingBottom: 12, marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Section {page} of 12</div>
        <h2 style={{ fontSize: 22, color: '#0e4040', margin: '6px 0', fontFamily: 'Sora, sans-serif' }}>{title || 'Internal Audit Procedures'}</h2>
        <div style={{ fontSize: 11, color: '#888' }}>eGrowth Community · Free under CC-BY-SA</div>
      </div>
      <p>This section walks through the practical application of internal audit techniques in a manufacturing context, with a focus on ISO 9001:2015 clause 9.2 requirements.</p>
      <h3 style={{ fontSize: 14, marginTop: 18, marginBottom: 6, color: '#0e4040', fontFamily: 'Sora, sans-serif' }}>{['Audit Planning', 'Opening Meeting Conduct', 'Evidence Collection', 'Finding Categorization', 'Reporting', 'Follow-up Verification'][page % 6]}</h3>
      <p>The auditor's first task is to confirm scope, criteria, and audit objectives with the auditee. Failure to align here is the single most common reason audits drift off-track in practice.</p>
      <ol style={{ paddingLeft: 18, marginTop: 12 }}>
        <li style={{ marginBottom: 4 }}>Confirm scope boundaries with process owners</li>
        <li style={{ marginBottom: 4 }}>Review prior audit findings for unclosed items</li>
        <li style={{ marginBottom: 4 }}>Sample selection — risk-based, not random</li>
        <li style={{ marginBottom: 4 }}>Document objective evidence at the point of observation</li>
      </ol>
      <p style={{ marginTop: 14, padding: 12, background: '#f1f8f8', borderLeft: '3px solid #1e8a8a', fontSize: 12, fontStyle: 'italic' }}>
        Pro tip: A finding without supporting objective evidence is just an opinion. Always cite clause, observation, evidence — in that order.
      </p>
    </div>
  );
};

const MockSlide = ({ page, title, mini }) => {
  if (mini) {
    return (
      <div style={{ padding: 4, height: '100%', display: 'flex', flexDirection: 'column', gap: 2, background: page % 3 === 0 ? '#0e4040' : '#fff' }}>
        <div style={{ height: 4, background: page % 3 === 0 ? '#f0a23c' : '#1e8a8a', width: '50%', borderRadius: 1 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: page % 3 === 0 ? '#fff' : '#333', fontSize: 8 }}>
          {page}
        </div>
      </div>
    );
  }
  if (page === 1) {
    return (
      <div style={{ height: '100%', background: 'linear-gradient(135deg, #0e4040, #1e8a8a)', color: '#fff', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Sora, sans-serif' }}>
        <div style={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>eGrowth Community · Free Deck</div>
        <h1 style={{ fontSize: 36, color: '#fff', lineHeight: 1.1, fontWeight: 700, maxWidth: 560 }}>{title || 'Incident Investigation using TapRooT'}</h1>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0a23c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0e4040' }}>MM</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Mukul Mehlawat</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Process Safety Engineer · Refining & Petrochem</div>
          </div>
        </div>
      </div>
    );
  }
  const titles = ['Why TapRooT?', 'The 7-Step Method', 'SnapCharT Walkthrough', 'Causal Factor Worksheet', 'Root Cause Tree', 'Generic Causes', 'Corrective Actions', 'Case Study: Tank Overflow', 'Lessons Learned', 'Common Pitfalls', 'Q&A'];
  const bodies = ['Identifies systemic causes, not just immediate ones', 'Begin with the incident chronology', 'Visual evidence-gathering tool', 'Bridges symptoms to causes', 'Hierarchical, repeatable analysis'];
  return (
    <div style={{ height: '100%', padding: 56, fontFamily: 'Sora, sans-serif', color: '#1a211f', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: '#1e8a8a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{page} / 24</div>
      <h2 style={{ fontSize: 30, marginTop: 4, color: '#0e4040', lineHeight: 1.15 }}>{titles[page % titles.length]}</h2>
      <div style={{ height: 4, width: 60, background: '#f0a23c', margin: '18px 0 28px', borderRadius: 2 }} />
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {bodies.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', fontSize: 15, color: '#3d4642' }}>
            <span style={{ color: '#1e8a8a', fontWeight: 700 }}>◆</span>
            {b}
          </li>
        ))}
      </ul>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, color: '#888', borderTop: '1px solid #eee', paddingTop: 10 }}>eGrowth Community · Free under CC-BY-SA</div>
    </div>
  );
};

const MockSpreadsheet = ({ page, mini }) => {
  if (mini) {
    return (
      <div style={{ padding: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: '#2d5a3d', width: '100%' }} />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, padding: 2 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{ background: '#f0f0f0', height: 6 }} />
          ))}
        </div>
      </div>
    );
  }
  const sheets = ['Indicator Map', 'ESRS Crosswalk', 'TCFD Alignment', 'Notes'];
  const headers = [['GRI Code', 'Title', 'ESRS Pillar', 'TCFD Rec.', 'Data Required', 'Status'],
                   ['ESRS Code', 'Topic', 'GRI Source', 'Mandatory?', 'Frequency', 'Owner']];
  const rows = [
    ['GRI 305-1', 'Direct (Scope 1) GHG emissions', 'E1', 'Metrics & Targets', 'tCO₂e', 'Complete'],
    ['GRI 305-2', 'Energy indirect (Scope 2) GHG emissions', 'E1', 'Metrics & Targets', 'tCO₂e · location + market', 'Complete'],
    ['GRI 305-3', 'Other indirect (Scope 3) GHG emissions', 'E1', 'Metrics & Targets', '15 categories', 'In progress'],
    ['GRI 305-4', 'GHG emissions intensity', 'E1', 'Metrics & Targets', 'tCO₂e / unit', 'Not started'],
    ['GRI 305-5', 'Reduction of GHG emissions', 'E1', 'Strategy', 'tCO₂e + baseline year', 'In progress'],
    ['GRI 401-1', 'New employee hires & turnover', 'S1', '—', 'Headcount by region/age', 'Complete'],
    ['GRI 403-9', 'Work-related injuries', 'S1', '—', 'LTIFR, fatalities', 'Complete'],
    ['GRI 302-1', 'Energy consumption within org', 'E1', 'Metrics & Targets', 'GJ by fuel type', 'Complete'],
    ['GRI 303-3', 'Water withdrawal', 'E3', '—', 'Megaliters by source', 'In progress'],
    ['GRI 306-3', 'Waste generated', 'E5', '—', 'tonnes by stream', 'Complete'],
    ['GRI 308-1', 'New suppliers screened — env. criteria', 'G1', '—', '%', 'Not started'],
    ['GRI 414-1', 'New suppliers screened — social', 'S2', '—', '%', 'Not started'],
  ];
  const h = headers[page % 2];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#222' }}>
      {/* Toolbar */}
      <div style={{ background: '#2d5a3d', color: '#fff', padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>
        GRI-2024-Mapping-v3.xlsx
      </div>
      {/* Formula bar */}
      <div style={{ background: '#f0f0f0', padding: '4px 12px', fontSize: 10, color: '#666', display: 'flex', gap: 12, borderBottom: '1px solid #ccc' }}>
        <span className="mono">A1</span>
        <span style={{ color: '#999' }}>fx</span>
        <span>{h[0]}</span>
      </div>
      {/* Sheet */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#dcefe2' }}>
              <th style={{ width: 32, padding: '6px 4px', border: '1px solid #c0d8c8', color: '#666', fontWeight: 500 }}></th>
              {h.map((c, i) => (
                <th key={i} style={{ padding: '6px 8px', border: '1px solid #c0d8c8', textAlign: 'left', fontWeight: 600, color: '#2d5a3d' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 ? '#fafafa' : '#fff' }}>
                <td style={{ padding: '6px 4px', border: '1px solid #e0e0e0', background: '#f0f0f0', textAlign: 'center', color: '#666' }}>{i + 2}</td>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: '6px 8px', border: '1px solid #e0e0e0' }}>
                    {c === 'Complete' && <span style={{ background: '#dcefe2', color: '#2d5a3d', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>✓ {c}</span>}
                    {c === 'In progress' && <span style={{ background: '#fdeccb', color: '#c2700a', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>⋯ {c}</span>}
                    {c === 'Not started' && <span style={{ background: '#fbe2e5', color: '#b84557', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>{c}</span>}
                    {!['Complete', 'In progress', 'Not started'].includes(c) && c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Sheet tabs */}
      <div style={{ background: '#f0f0f0', display: 'flex', gap: 2, padding: '4px 8px', borderTop: '1px solid #ccc' }}>
        {sheets.map((s, i) => (
          <div key={s} style={{
            padding: '4px 12px',
            background: i === 0 ? '#fff' : 'transparent',
            border: i === 0 ? '1px solid #ccc' : 'none',
            borderBottom: 'none',
            fontSize: 10, fontWeight: i === 0 ? 600 : 400, color: '#333',
            borderRadius: '3px 3px 0 0',
          }}>{s}</div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { FilePreviewModal });
