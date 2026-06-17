// Question + Resource detail pages — deep dive views

// ───────────────────────────────────────────────────────────────────────
//   QUESTION DETAIL (threaded answers + acceptance)
// ───────────────────────────────────────────────────────────────────────
const QUESTION_DETAIL = {
  id: 'q1',
  title: 'How are you handling LOPA studies for legacy offshore platforms without full P&ID documentation?',
  body: `We inherited a 1998-era platform from an acquisition and the documentation is patchy. Looking for practical approaches — has anyone reverse-engineered P&IDs from field walkdowns for LOPA?

Specifically interested in:
- How much field verification is enough to defend a LOPA SIL determination to the regulator
- Whether anyone uses standardized walkdown checklists
- How you handle interlocks that may exist but aren't drawn

Happy to share back what I learn. We're 6 weeks into this and budget for documentation is tight.`,
  author: 'u4',
  ts: '2 hrs ago',
  tags: ['safety', 'process-safety', 'lopa'],
  upvotes: 47,
  views: 1840,
  saves: 89,
  followers: 23,
  hasAccepted: true,
};

const ANSWERS = [
  {
    id: 'a1', author: 'u8', ts: '38 min ago', upvotes: 124, accepted: true, founder: true,
    body: `Great question — we did exactly this for a 1995 Bombay High platform three years back. Here's what worked:

**1. Risk-rank your walkdowns.** Not every node deserves equal P&ID reconstruction effort. Start with the 20% of nodes that drive 80% of your LOPA risk reduction targets (typically hydrocarbon containment and emergency shutdown).

**2. Two-engineer walkdowns.** One reads the existing (incomplete) drawings; the other physically traces. Any discrepancy gets photographed and re-walked the next day.

**3. The "blind reveal" test.** After your walkdown reconstruction, hand the new P&IDs to a senior operator who's been on the platform 10+ years. Ask them to mark anything missing or wrong, on paper, without seeing your sources. ~85% of our gaps surfaced this way.

**4. For interlocks specifically** — get the OEM cause-and-effect matrix from the ESD vendor (Honeywell, ABB, whoever installed). Even if the install is 25 years old, the matrix usually survives in their archive. ₹50K well spent.

**5. Regulator defensibility.** Document your walkdown methodology BEFORE walking. We used IEC 61511 Edition 2 Annex E.4 + ISA TR84.00.04. If your method maps to a recognized standard, the regulator can poke at execution but not approach.

DM me if you want the walkdown checklist template — it's ~40 pages, made into a free resource [here on eGrowth →]`,
    comments: [
      { id: 'c1', author: 'u4', ts: '14 min ago', body: 'This is exactly what I needed. Especially the "blind reveal" test — borrowed straight from my next session. Thank you.' },
      { id: 'c2', author: 'u2', ts: '8 min ago', body: 'Co-sign on the ESD vendor matrix. Honeywell will charge but it\'s worth it. We did the same on a Sasol asset.' },
    ],
    repoEarned: 50,
  },
  {
    id: 'a2', author: 'u2', ts: '1 hr ago', upvotes: 67, accepted: false,
    body: `Adding to Pushpender's excellent answer with mining/heavy-industry experience:

We use a **3-tier evidence framework** when defending LOPA to regulators with incomplete docs:
- **Tier 1 (highest):** vendor docs, original commissioning records, operator interviews recorded
- **Tier 2:** field walkdown verified by 2+ engineers, photographed
- **Tier 3 (weakest):** inference from similar units, manufacturer typicals

We grade every assumption in our LOPA worksheet by tier, and any Tier 3 evidence triggers either a SIL bump or a explicit conservatism in the IPL credit. Regulators accept this because it's transparent.`,
    comments: [],
    repoEarned: 28,
  },
  {
    id: 'a3', author: 'u6', ts: '1.5 hr ago', upvotes: 19, accepted: false,
    body: `Slightly orthogonal — but consider whether a full LOPA is actually right for nodes with weak documentation. For legacy systems with ambiguous IPLs, qualitative methods (LOPA-equivalent risk matrix or risk graph) can be more defensible than pretending to a quantitative number you can't really back up.`,
    comments: [
      { id: 'c3', author: 'u8', ts: '40 min ago', body: 'Fair point. We\'ve seen regulators actually prefer the honesty of "we did risk graph because data isn\'t there" over a fabricated LOPA.' },
    ],
    repoEarned: 12,
  },
];

const QuestionDetailPage = ({ onClose }) => {
  const [voted, setVoted] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const asker = USER_MAP[QUESTION_DETAIL.author];
  return (
    <div style={{ maxWidth: 920 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onClose} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="qdetail-back">← Back to feed</button>
        <span>·</span>
        <span>Safety</span>
        <span>·</span>
        <span>Process Safety</span>
      </div>

      {/* Question */}
      <div className="card" style={{ padding: 26 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
          {/* Vote column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <button onClick={() => setVoted(!voted)} data-action="qdetail-upvote" style={{
              width: 38, height: 38, borderRadius: 'var(--r-md)',
              background: voted ? 'var(--brand-700)' : 'var(--bg-sunken)',
              color: voted ? '#fff' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)', cursor: 'pointer',
            }}>
              <Icon name="upvote" size={18} />
            </button>
            <span className="mono" style={{ fontWeight: 700, fontSize: 18 }}>{QUESTION_DETAIL.upvotes + (voted ? 1 : 0)}</span>
            <button onClick={() => setSaved(!saved)} data-action="qdetail-save" style={{ padding: 6, color: saved ? 'var(--amber-500)' : 'var(--text-dim)' }}>
              <Icon name="bookmark" size={18} />
            </button>
          </div>
          {/* Body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 10 }}>{QUESTION_DETAIL.title}</h1>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--text-dim)', flexWrap: 'wrap', marginBottom: 16 }}>
              <span>Asked {QUESTION_DETAIL.ts}</span>
              <span>·</span>
              <span><span className="mono" style={{ color: 'var(--text)', fontWeight: 600 }}>{QUESTION_DETAIL.views.toLocaleString()}</span> views</span>
              <span>·</span>
              <span><span className="mono" style={{ color: 'var(--text)', fontWeight: 600 }}>{QUESTION_DETAIL.followers}</span> following</span>
              <span>·</span>
              <span><span className="mono" style={{ color: 'var(--moss-700)', fontWeight: 600 }}>+15 REPO</span> if answered</span>
            </div>
            {QUESTION_DETAIL.body.split('\n\n').map((p, i) => (
              <p key={i} style={{ margin: '0 0 12px', fontSize: 15, color: 'var(--text)', lineHeight: 1.65 }}
                 dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') }} />
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {QUESTION_DETAIL.tags.map(t => <Tag key={t} name={t} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <Avatar user={asker} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{asker.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{asker.title}</div>
              </div>
              <RankBadge points={asker.reputation} />
              <button className="btn btn-outline" data-action="qdetail-follow" onClick={() => setFollowing(!following)}>
                {following ? '✓ Following' : 'Follow for updates'}
              </button>
              <KebabMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Answers header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '24px 0 14px' }}>
        <h2 style={{ fontSize: 18 }}>
          <span className="mono" style={{ color: 'var(--brand-700)' }}>{ANSWERS.length}</span> Answers
        </h2>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="chip" style={{ background: 'var(--brand-800)', color: '#fff', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Top</button>
          <button className="chip" style={{ background: 'var(--ink-100)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Newest</button>
          <button className="chip" style={{ background: 'var(--ink-100)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Founder picks</button>
        </div>
      </div>

      {/* Answers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ANSWERS.map(a => <AnswerCard key={a.id} answer={a} canAccept={QUESTION_DETAIL.author === 'u4'} />)}
      </div>

      {/* Compose answer */}
      <div className="card" style={{ padding: 22, marginTop: 24, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
        <h3 style={{ fontSize: 15, marginBottom: 10 }}>Your answer</h3>
        <textarea
          placeholder="Share what you've actually seen work. Markdown supported."
          style={{
            width: '100%', minHeight: 140, padding: 14,
            borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
            background: 'var(--bg-raised)', fontSize: 14, color: 'var(--text)',
            outline: 'none', resize: 'vertical', lineHeight: 1.55,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <button className="activity-btn" style={{ padding: '4px 8px', fontSize: 12 }}><strong>B</strong></button>
          <button className="activity-btn" style={{ padding: '4px 8px', fontSize: 12, fontStyle: 'italic' }}>I</button>
          <button className="activity-btn" style={{ padding: '4px 8px', fontSize: 12 }}>Link</button>
          <button className="activity-btn" style={{ padding: '4px 8px', fontSize: 12 }}>📎 Attach</button>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Earn <Reputation points={10} /> per upvote</span>
          <button className="btn btn-primary" data-action="qdetail-post-answer">Post answer</button>
        </div>
      </div>
    </div>
  );
};

const AnswerCard = ({ answer, canAccept }) => {
  const [voted, setVoted] = React.useState(false);
  const [showComments, setShowComments] = React.useState(answer.comments.length > 0);
  const author = USER_MAP[answer.author];
  return (
    <div className="card" style={{
      padding: 22, position: 'relative',
      borderLeft: answer.accepted ? '4px solid var(--moss-500)' : '1px solid var(--border)',
      background: answer.accepted ? 'linear-gradient(180deg, var(--moss-100) 0%, var(--bg-raised) 80px)' : 'var(--bg-raised)',
    }}>
      {answer.accepted && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'var(--moss-500)', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          <Icon name="check" size={11} /> Accepted answer
        </div>
      )}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <button onClick={() => setVoted(!voted)} data-action={`answer-upvote-${answer.id}`} style={{
            width: 36, height: 36, borderRadius: 'var(--r-md)',
            background: voted ? 'var(--brand-700)' : 'var(--bg-sunken)',
            color: voted ? '#fff' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)', cursor: 'pointer',
          }}>
            <Icon name="upvote" size={16} />
          </button>
          <span className="mono" style={{ fontWeight: 700, fontSize: 16 }}>{answer.upvotes + (voted ? 1 : 0)}</span>
          {canAccept && !answer.accepted && (
            <button data-action={`answer-accept-${answer.id}`} title="Mark as accepted answer" style={{
              padding: 6, color: 'var(--text-dim)', cursor: 'pointer',
            }}>
              <Icon name="check" size={18} />
            </button>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {answer.body.split('\n\n').map((p, i) => (
            <p key={i} style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}
               dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]/g, '<a href="#">$1</a>').replace(/\n/g, '<br>') }} />
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <Avatar user={author} size={34} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <strong>{author.name}</strong>
                <RankBadge points={author.reputation} showLabel={false} />
                {answer.founder && <span className="chip chip-amber" style={{ padding: '1px 6px', fontSize: 9 }}>Founder</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{author.title} · answered {answer.ts}</div>
            </div>
            {answer.repoEarned > 0 && (
              <span style={{ fontSize: 11, color: 'var(--moss-700)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>+{answer.repoEarned} REPO</span>
            )}
            <KebabMenu />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <button className="activity-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setShowComments(!showComments)} data-action={`answer-comment-${answer.id}`}>
              <Icon name="comment" size={13} /> {answer.comments.length} comment{answer.comments.length !== 1 ? 's' : ''}
            </button>
            <button className="activity-btn" style={{ padding: '4px 10px', fontSize: 12 }}>
              <Icon name="share" size={13} /> Share
            </button>
            <button className="activity-btn" style={{ padding: '4px 10px', fontSize: 12 }}>
              <Icon name="award" size={13} /> Endorse this answer
            </button>
          </div>

          {showComments && (
            <div style={{ marginTop: 12, marginLeft: 0, paddingLeft: 14, borderLeft: '2px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {answer.comments.map(c => {
                const cAuthor = USER_MAP[c.author];
                return (
                  <div key={c.id} style={{ display: 'flex', gap: 10 }}>
                    <Avatar user={cAuthor} size={26} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13 }}>
                        <strong>{cAuthor.name}</strong>{' '}
                        <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>· {c.ts}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2, lineHeight: 1.5 }}>{c.body}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <input placeholder="Add a comment…" style={{ flex: 1, padding: '7px 12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--bg-sunken)', fontSize: 12, outline: 'none' }} />
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }} data-action={`answer-add-comment-${answer.id}`}>Reply</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────
//   RESOURCE DETAIL (versions + reviews + related)
// ───────────────────────────────────────────────────────────────────────
const RESOURCE_DETAIL = {
  id: 'r1',
  title: 'GRI 2024 Disclosure Mapping Template — aligned with ESRS & TCFD',
  type: 'xls',
  size: '2.1 MB',
  uploadedBy: 'u3',
  ts: 'May 21, 2026',
  downloads: 1289,
  saves: 412,
  rating: 4.8,
  ratingCount: 87,
  license: 'CC-BY-SA 4.0',
  description: `Spent the last two months mapping every GRI 2024 indicator to the corresponding ESRS data point and TCFD recommendation. Sharing the working spreadsheet — free, 43 indicators covered, formulas intact.

**What's inside:**
- Sheet 1: Indicator-by-indicator mapping (GRI → ESRS → TCFD)
- Sheet 2: ESRS-first reverse mapping (for entities starting from CSRD)
- Sheet 3: TCFD alignment with industry-specific guidance
- Sheet 4: Notes, assumptions, and known ambiguities

**Who it's for:**
Sustainability managers preparing first-time GRI reports, CSRD-ready CFOs, ESG consultants needing a starter framework.

**License:** CC-BY-SA 4.0 — use it, adapt it, share it (please credit + share alike).`,
  versions: [
    { v: 'v3.0', ts: 'May 21, 2026', changes: 'Added BRSR Core mapping (India-listed)', author: 'u3' },
    { v: 'v2.1', ts: 'Apr 8, 2026', changes: 'Fixed Scope 3 Cat 11 formula error (HT @u9)', author: 'u3' },
    { v: 'v2.0', ts: 'Mar 15, 2026', changes: 'Updated for ESRS 2 (final) — 14 indicators repositioned', author: 'u3' },
    { v: 'v1.0', ts: 'Jan 30, 2026', changes: 'Initial release', author: 'u3' },
  ],
};

const REVIEWS = [
  { author: 'u8', rating: 5, ts: '2 days ago', text: 'This is the single best free GRI/ESRS mapping I\'ve seen. I\'ve recommended it to 12 clients already. Formulas are clean and the notes column is gold.' },
  { author: 'u7', rating: 5, ts: '5 days ago', text: 'Saved us roughly 80 hours of work. The BRSR Core additions in v3.0 are clutch for our Indian listed clients.' },
  { author: 'u6', rating: 4, ts: '1 week ago', text: 'Excellent template. Marked 4 stars only because the Scope 3 Cat 1 spend-based fallback could use a worked example. Otherwise perfect.' },
  { author: 'u4', rating: 5, ts: '2 weeks ago', text: 'Used this for our offshore-O&G entity\'s pilot CSRD report. Auditors loved the cross-reference column.' },
];

const ResourceDetailPage = ({ onClose }) => {
  const [tab, setTab] = React.useState('overview');
  const author = USER_MAP[RESOURCE_DETAIL.uploadedBy];
  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onClose} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="rdetail-back">← Back to library</button>
        <span>·</span>
        <span>ESG</span>
        <span>·</span>
        <span>Reporting</span>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          <div className={`resource-preview ft-${RESOURCE_DETAIL.type}`} style={{ width: 130, height: 170, borderRadius: 'var(--r-md)', flexShrink: 0, position: 'relative' }}>
            <span className="filetype" style={{ fontSize: 32 }}>{RESOURCE_DETAIL.type.toUpperCase()}</span>
            <span style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: '#fff', fontWeight: 600, opacity: 0.8 }}>{RESOURCE_DETAIL.size}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <PostKindTag kind="resource" />
              <span style={{ fontSize: 11, padding: '2px 8px', background: 'var(--brand-100)', color: 'var(--brand-700)', borderRadius: 4, fontWeight: 600 }}>v3.0 — latest</span>
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>· {RESOURCE_DETAIL.license}</span>
            </div>
            <h1 style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 12 }}>{RESOURCE_DETAIL.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <Avatar user={author} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{author.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{author.title}</div>
              </div>
              <RankBadge points={author.reputation} />
              <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }}>+ Endorse</button>
            </div>
            <div style={{ display: 'flex', gap: 22, padding: '14px 16px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', marginBottom: 16 }}>
              <RStat label="Downloads" value={RESOURCE_DETAIL.downloads.toLocaleString()} />
              <RStat label="Saved by" value={RESOURCE_DETAIL.saves.toLocaleString()} />
              <RStat label="Rating" value={`${RESOURCE_DETAIL.rating} ★`} sub={`${RESOURCE_DETAIL.ratingCount} reviews`} />
              <RStat label="Versions" value={RESOURCE_DETAIL.versions.length} />
              <RStat label="Last update" value={RESOURCE_DETAIL.ts} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} data-action="rdetail-download">
                <Icon name="download" size={14} /> Download v3.0
              </button>
              <button className="btn btn-outline" data-action="rdetail-preview" onClick={() => window.__openPreview && window.__openPreview({ ...RESOURCE_DETAIL, type: 'xls' })}>
                <Icon name="eye" size={14} /> Preview
              </button>
              <button className="btn btn-outline" data-action="rdetail-save"><Icon name="bookmark" size={14} /> Save</button>
              <button className="btn btn-outline" data-action="rdetail-share"><Icon name="share" size={14} /> Share</button>
              <KebabMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'versions', label: 'Version history', count: RESOURCE_DETAIL.versions.length },
          { id: 'reviews',  label: 'Reviews', count: RESOURCE_DETAIL.ratingCount },
          { id: 'related',  label: 'Related' },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} data-action={`rdetail-tab-${t.id}`}>
            {t.label}{t.count != null && <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 10 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24 }}>
        <div>
          {tab === 'overview' && (
            <div className="card" style={{ padding: 24 }}>
              {RESOURCE_DETAIL.description.split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.65 }}
                   dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>').replace(/^- /gm, '• ') }} />
              ))}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {['esg', 'reporting', 'gri', 'esrs', 'csrd', 'brsr', 'tcfd'].map(t => <Tag key={t} name={t} />)}
              </div>
            </div>
          )}

          {tab === 'versions' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {RESOURCE_DETAIL.versions.map((v, i) => (
                <div key={v.v} style={{ padding: '14px 18px', borderBottom: i < RESOURCE_DETAIL.versions.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--brand-700)' : 'var(--text-muted)', minWidth: 50 }}>
                    {v.v}{i === 0 && <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 5px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 3 }}>NEW</span>}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{v.changes}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{v.ts} · by {USER_MAP[v.author].name}</div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 11 }}>Download</button>
                  {i > 0 && <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 11 }}>Diff</button>}
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: 36, fontWeight: 700, color: 'var(--brand-800)' }}>{RESOURCE_DETAIL.rating}</div>
                  <div style={{ color: 'var(--amber-500)', fontSize: 16 }}>★★★★★</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{RESOURCE_DETAIL.ratingCount} reviews</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[5,4,3,2,1].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <span style={{ width: 12, color: 'var(--text-muted)' }}>{s}★</span>
                      <span style={{ flex: 1, height: 6, background: 'var(--ink-150)', borderRadius: 3 }}>
                        <span style={{ display: 'block', height: '100%', width: `${[78,18,3,1,0][5-s]}%`, background: 'var(--amber-400)', borderRadius: 3 }} />
                      </span>
                      <span className="mono" style={{ width: 30, textAlign: 'right', color: 'var(--text-dim)' }}>{[78,18,3,1,0][5-s]}%</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" data-action="rdetail-write-review">Write a review</button>
              </div>
              {REVIEWS.map((r, i) => {
                const a = USER_MAP[r.author];
                return (
                  <div key={i} className="card" style={{ padding: 18 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                      <Avatar user={a} size={36} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{a.title} · {r.ts}</div>
                      </div>
                      <span style={{ color: 'var(--amber-500)', fontSize: 14 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>{r.text}</p>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'related' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {RESOURCES_LIBRARY.slice(0, 6).map(r => (
                <div key={r.id} className="card card-hover" style={{ padding: 14, display: 'flex', gap: 12 }}>
                  <div className={`resource-preview ft-${r.type}`} style={{ width: 50, height: 64, borderRadius: 4, flexShrink: 0 }}>
                    <span className="filetype" style={{ fontSize: 12 }}>{r.type.toUpperCase()}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>↓ {r.downloads.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>
              People who downloaded this also got
            </h3>
            {RESOURCES_LIBRARY.slice(2, 5).map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12 }}>
                <div className={`resource-preview ft-${r.type}`} style={{ width: 24, height: 30, borderRadius: 3 }}>
                  <span className="filetype" style={{ fontSize: 8 }}>{r.type.toUpperCase()}</span>
                </div>
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
              </div>
            ))}
          </div>
          <DisclaimerBanner variant="content" />
        </div>
      </div>
    </div>
  );
};

const RStat = ({ label, value, sub }) => (
  <div>
    <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-800)' }}>{value}</div>
    <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
  </div>
);

Object.assign(window, { QuestionDetailPage, ResourceDetailPage });
