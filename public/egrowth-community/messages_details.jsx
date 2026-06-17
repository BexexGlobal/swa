// Messages (DMs), Job detail, Course detail, Chapter detail, Empty state, 404

// ─── EMPTY STATE primitive ─────────────────────────────────────────────
const EmptyState = ({ icon = 'sparkle', title, body, cta, onCta }) => (
  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: 'var(--bg-sunken)', color: 'var(--text-muted)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
    }}>
      <Icon name={icon} size={26} />
    </div>
    <h3 style={{ fontSize: 16, marginBottom: 6, color: 'var(--text)' }}>{title}</h3>
    <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 360, margin: '0 auto 14px', lineHeight: 1.55 }}>{body}</p>
    {cta && <button className="btn btn-primary" onClick={onCta} data-action="empty-cta">{cta}</button>}
  </div>
);

// ─── 404 PAGE ──────────────────────────────────────────────────────────
const NotFoundPage = ({ onGoHome }) => (
  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: 80, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-700)', lineHeight: 1 }}>404</div>
    <h1 style={{ fontSize: 24, marginTop: 14 }}>This page doesn't exist… yet</h1>
    <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '12px auto 22px', lineHeight: 1.55 }}>
      Maybe it's a feature we haven't built. Or a link that's gone stale. Either way — let's get you back to something useful.
    </p>
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      <button className="btn btn-outline" onClick={onGoHome} data-action="404-home">Take me home</button>
      <button className="btn btn-primary" onClick={onGoHome} data-action="404-search">Search instead</button>
    </div>
  </div>
);

// ─── MESSAGES / DMs ─────────────────────────────────────────────────────
const CONVERSATIONS = [
  { id: 'c1', with: 'u8', last: 'Let me share the walkdown checklist — DM\'d the link', ts: '2m', unread: 2, online: true },
  { id: 'c2', with: 'u3', last: 'Yes! v3.0 of the mapping is ready. Try the BRSR tab.', ts: '1h', unread: 0, online: true },
  { id: 'c3', with: 'u2', last: 'Happy to mentor — let me check my slots and ping back tomorrow', ts: '3h', unread: 1 },
  { id: 'c4', with: 'u6', last: 'Energy baseline question I posted got 8 answers, thanks for the nudge!', ts: '1d', unread: 0 },
  { id: 'c5', with: 'u4', last: 'You: Thanks for the HAZOP node walkthrough — gold', ts: '2d', unread: 0 },
  { id: 'c6', with: 'u7', last: 'Adding you to the Apparel ESG group I just started', ts: '3d', unread: 0 },
];

const SAMPLE_THREAD = [
  { who: 'them', author: 'u8', body: 'Saw your Q on LOPA — really good question. We did exactly this on a Bombay High platform.', ts: '11:42 AM' },
  { who: 'me',  body: 'Oh! Really appreciate the context. We\'re 6 weeks in and the docs are messier than we expected.', ts: '11:44 AM' },
  { who: 'them', author: 'u8', body: 'Three things saved us: 1) two-engineer walkdowns 2) blind reveal with senior ops 3) cause-and-effect matrix from the ESD vendor.', ts: '11:45 AM' },
  { who: 'them', author: 'u8', body: 'I made the walkdown checklist into a free resource — let me share the link.', ts: '11:45 AM' },
  { who: 'them', author: 'u8', kind: 'resource', body: { type: 'pdf', name: 'LOPA-Walkdown-Checklist-v2.pdf', size: '380 KB' }, ts: '11:46 AM' },
  { who: 'them', author: 'u8', body: 'Let me share the walkdown checklist — DM\'d the link 👆', ts: '2m ago' },
];

const MessagesPage = () => {
  const [active, setActive] = React.useState('c1');
  const [input, setInput] = React.useState('');
  const conv = CONVERSATIONS.find(c => c.id === active);
  const peer = conv ? USER_MAP[conv.with] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, height: 'calc(100vh - 60px - 50px - 56px)', background: 'var(--bg-raised)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Left: conversation list */}
      <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <h2 style={{ fontSize: 18, flex: 1 }}>Messages</h2>
            <button className="btn btn-ghost" style={{ padding: 6 }} aria-label="Compose" data-action="msg-new"><Icon name="edit" size={16} /></button>
          </div>
          <div style={{ position: 'relative' }}>
            <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: 8, color: 'var(--text-dim)' }} />
            <input
              placeholder="Search messages…"
              style={{ width: '100%', padding: '6px 10px 6px 30px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-sunken)', fontSize: 12, outline: 'none' }}
            />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {CONVERSATIONS.map(c => {
            const p = USER_MAP[c.with];
            const sel = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                data-action={`msg-conv-${c.id}`}
                style={{
                  display: 'flex', gap: 12, padding: '12px 14px', width: '100%',
                  alignItems: 'center', textAlign: 'left',
                  background: sel ? 'var(--brand-50)' : 'transparent',
                  borderLeft: sel ? '3px solid var(--brand-700)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar user={p} size={40} />
                  {c.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, background: 'var(--moss-500)', borderRadius: '50%', border: '2px solid var(--bg-raised)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: c.unread ? 700 : 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{c.ts}</span>
                  </div>
                  <div style={{ fontSize: 12, color: c.unread ? 'var(--text)' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2, fontWeight: c.unread ? 600 : 400 }}>
                    {c.last}
                  </div>
                </div>
                {c.unread > 0 && (
                  <span style={{
                    background: 'var(--brand-700)', color: '#fff',
                    fontSize: 10, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 999, minWidth: 18, textAlign: 'center',
                  }}>{c.unread}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: thread */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {peer ? (
          <>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar user={peer} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{peer.name}</span>
                  {peer.isFounder && <span className="chip chip-amber" style={{ padding: '1px 6px', fontSize: 9 }}>Founder</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{peer.title}</div>
              </div>
              <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} data-action="msg-call">📞 Call</button>
              <KebabMenu />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 22, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg)' }}>
              <div style={{ alignSelf: 'center', fontSize: 11, color: 'var(--text-dim)', background: 'var(--bg-raised)', padding: '4px 10px', borderRadius: 999, border: '1px solid var(--border)', margin: '6px 0 12px' }}>
                Today
              </div>
              {SAMPLE_THREAD.map((m, i) => <MessageBubble key={i} msg={m} peer={peer} />)}
            </div>

            <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-raised)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <button className="btn btn-ghost" style={{ padding: 8 }} aria-label="Attach file" data-action="msg-attach"><Icon name="download" size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                <button className="btn btn-ghost" style={{ padding: 8 }} aria-label="Send resource" data-action="msg-resource"><Icon name="resource" size={18} /></button>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={`Message ${peer.name.split(' ')[0]}…`}
                  style={{
                    flex: 1, padding: '10px 14px',
                    borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
                    background: 'var(--bg-sunken)', fontSize: 13, color: 'var(--text)',
                    outline: 'none', resize: 'none', minHeight: 38, maxHeight: 120, fontFamily: 'inherit',
                  }}
                />
                <button className="btn btn-primary" disabled={!input.trim()} onClick={() => setInput('')} data-action="msg-send" style={{ opacity: input.trim() ? 1 : 0.5 }}>
                  Send
                </button>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text-dim)' }}>
                Be specific. Be kind. Never share confidential info via DM either — see our <a href="#">community guidelines</a>.
              </div>
            </div>
          </>
        ) : (
          <EmptyState icon="messages" title="Pick a conversation" body="Or start a new one with anyone in the community." cta="New message" />
        )}
      </div>
    </div>
  );
};

const MessageBubble = ({ msg, peer }) => {
  const isMe = msg.who === 'me';
  return (
    <div style={{ display: 'flex', gap: 8, alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
      {!isMe && <Avatar user={peer} size={28} />}
      <div style={{ minWidth: 0 }}>
        <div style={{
          padding: '9px 14px', borderRadius: 14,
          background: isMe ? 'var(--brand-700)' : 'var(--bg-raised)',
          color: isMe ? '#fff' : 'var(--text)',
          fontSize: 14, lineHeight: 1.5,
          borderTopRightRadius: isMe ? 4 : 14,
          borderTopLeftRadius: isMe ? 14 : 4,
          border: isMe ? 'none' : '1px solid var(--border)',
        }}>
          {msg.kind === 'resource' ? (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 4 }}>
              <div className={`resource-preview ft-${msg.body.type}`} style={{ width: 44, height: 54, borderRadius: 4 }}>
                <span className="filetype" style={{ fontSize: 11 }}>{msg.body.type.toUpperCase()}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 12, color: isMe ? '#fff' : 'var(--text)' }}>{msg.body.name}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{msg.body.size} · Tap to open</div>
              </div>
            </div>
          ) : msg.body}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4, textAlign: isMe ? 'right' : 'left' }}>{msg.ts}</div>
      </div>
    </div>
  );
};

// ─── JOB DETAIL ────────────────────────────────────────────────────────
const JobDetailPage = ({ onBack }) => {
  const job = JOBS[0];
  const poster = USER_MAP[job.postedBy];
  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onBack} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="jdetail-back">← Jobs Board</button>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--r-md)',
            background: 'var(--bg-sunken)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-700)',
            fontSize: 24, flexShrink: 0,
            border: '1px solid var(--border)',
          }}>KR</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <PostKindTag kind="job" />
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>Posted 8 hrs ago · {job.applications} applied · {job.saves} saved</span>
            </div>
            <h1 style={{ fontSize: 26, lineHeight: 1.2 }}>{job.title}</h1>
            <div style={{ display: 'flex', gap: 18, fontSize: 14, color: 'var(--text-muted)', marginTop: 10, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', fontWeight: 600, color: 'var(--text)' }}>
                <Icon name="briefcase" size={14} /> {job.company}
              </span>
              <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Icon name="location" size={14} /> {job.location}</span>
              <span style={{ fontWeight: 600, color: 'var(--brand-700)' }}>{job.salary}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-amber" style={{ padding: '10px 22px', fontSize: 14 }} data-action="jdetail-apply">
                Apply now <Icon name="arrow" size={14} />
              </button>
              <button className="btn btn-outline" data-action="jdetail-save"><Icon name="bookmark" size={14} /> Save</button>
              <button className="btn btn-outline" data-action="jdetail-share"><Icon name="share" size={14} /> Share</button>
              <button className="btn btn-outline" data-action="jdetail-refer">Refer a friend (+50 REPO)</button>
              <KebabMenu />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24, marginTop: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <JDetailSection title="About the role">
            <p>Leading a team of 14 across three open-pit copper-nickel sites in Botswana. You'll own the HSE strategy end-to-end — from corporate policy through site implementation, audits, regulatory engagement, and incident response.</p>
            <p>This is a high-autonomy role reporting directly to the COO. Budget responsibility for the HSE function. Will sit on the executive committee.</p>
          </JDetailSection>

          <JDetailSection title="What you'll do">
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7 }}>
              <li>Lead implementation of ICMM principles across all three sites</li>
              <li>Drive ISO 45001 certification for the newest site (currently 90% ready)</li>
              <li>Own the incident investigation program — chair the high-severity review board</li>
              <li>Engage regulators (DEAT, DMRE) on quarterly and ad-hoc basis</li>
              <li>Mentor 4 site HSE managers, hire for 2 additional positions</li>
            </ul>
          </JDetailSection>

          <JDetailSection title="What we're looking for">
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7 }}>
              <li><strong>10+ years</strong> HSE experience in extractive industries (mining strongly preferred, O&amp;G considered)</li>
              <li><strong>NEBOSH Diploma</strong> or equivalent (CMIOSH, IOSH MIOSH)</li>
              <li>Working knowledge of <strong>ICMM Health & Safety Critical Controls</strong></li>
              <li>Comfortable working in remote sites · 6/2 rotation (6 weeks on, 2 weeks off)</li>
              <li>English required; Setswana / French / Portuguese a plus</li>
            </ul>
          </JDetailSection>

          <JDetailSection title="Compensation & benefits">
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7 }}>
              <li><strong>USD 140–180K</strong> base + 20% performance bonus</li>
              <li>Full expat package (housing, schooling, flights, tax equalisation)</li>
              <li>6/2 rotation with chartered flights from JNB/CPT/LHR</li>
              <li>Family medical (international cover)</li>
              <li>Dedicated training budget — <strong>+ free access to eGrowth Learn Hub</strong></li>
            </ul>
          </JDetailSection>

          <JDetailSection title="About Kopano Resources">
            <p>Mid-cap copper-nickel producer with three operating sites in Botswana. Producing since 2014, ~3,400 employees. Listed on JSE. Strong sustainability track record (zero fatalities 2022–25, ICMM signatory since 2018).</p>
            <p style={{ marginTop: 8, fontSize: 12, color: 'var(--text-dim)' }}>14 reviews from eGrowth members average 4.2 ★ for Culture, 4.6 ★ for Safety standards.</p>
          </JDetailSection>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 88 }}>
          <div className="card" style={{ padding: 18, background: 'var(--amber-50)', borderColor: 'var(--amber-300)' }}>
            <Icon name="sparkle" size={20} style={{ color: 'var(--amber-500)', marginBottom: 6 }} />
            <h3 style={{ fontSize: 14 }}>You match 8 of 10 criteria</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 10px' }}>Based on your skills, NEBOSH Cert, and 8 years of experience.</p>
            <button className="btn btn-amber" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} data-action="jdetail-quick-apply">
              Quick apply with my profile
            </button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>Posted by</h3>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar user={poster} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{poster.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{poster.title}</div>
              </div>
            </div>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 12, fontSize: 12, padding: '6px 10px' }} data-action="jdetail-message-poster">
              <Icon name="messages" size={12} /> Ask a question
            </button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>Similar roles</h3>
            {JOBS.slice(1, 4).map(j => (
              <div key={j.id} style={{ padding: '8px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{j.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{j.company} · {j.location}</div>
                <div style={{ fontSize: 11, color: 'var(--brand-700)', fontWeight: 600, marginTop: 2 }}>{j.salary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JDetailSection = ({ title, children }) => (
  <div className="card" style={{ padding: 22 }}>
    <h2 style={{ fontSize: 16, marginBottom: 10 }}>{title}</h2>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65 }}>{children}</div>
  </div>
);

// ─── COURSE DETAIL ─────────────────────────────────────────────────────
const CourseDetailPage = ({ onBack }) => {
  const c = COURSES[0];
  const inst = USER_MAP[c.instructor];
  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onBack} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="cdetail-back">← Learn Hub</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{ background: c.thumb, color: '#fff', padding: 32, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 60%)' }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 10px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.level}</span>
              {c.badges.map(b => (
                <span key={b} style={{ padding: '3px 10px', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <span className="handoff-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Hosted on eGrowthIndia.com</span>
          </div>
          <h1 style={{ fontSize: 28, color: '#fff', lineHeight: 1.2, position: 'relative' }}>{c.title}</h1>
          <div style={{ display: 'flex', gap: 18, fontSize: 13, opacity: 0.9, marginTop: 12, position: 'relative' }}>
            <span>📚 {c.modules} modules · {c.lessons} lessons</span>
            <span>⏱ {c.duration}</span>
            <span>👥 {c.enrolled.toLocaleString()} enrolled</span>
            <span>⭐ {c.rating}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <JDetailSection title="What you'll learn">
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7 }}>
              <li>Conduct a full ISO 9001 audit from planning to closing meeting</li>
              <li>Categorize findings correctly (NC, OFI, observation) and defend categorization to clients</li>
              <li>Write findings that survive challenge — using the IO+EE method (Issue/Objective + Evidence/Effect)</li>
              <li>Lead an audit team (planning, briefing, conducting, reporting, follow-up)</li>
              <li>Pass the CQI/IRCA assessment with confidence</li>
            </ul>
          </JDetailSection>

          <JDetailSection title="Curriculum">
            {[
              { n: 1, t: 'ISO 9001 Foundations (refresher)', lessons: 5, dur: '3h 20m' },
              { n: 2, t: 'Audit principles & roles', lessons: 6, dur: '4h 10m' },
              { n: 3, t: 'Audit planning & preparation', lessons: 5, dur: '3h 40m' },
              { n: 4, t: 'Opening meetings & document review', lessons: 4, dur: '2h 50m' },
              { n: 5, t: 'Conducting the audit — process tracing', lessons: 7, dur: '5h' },
              { n: 6, t: 'Evidence collection & sampling', lessons: 5, dur: '3h 30m' },
              { n: 7, t: 'Audit findings — writing & categorization', lessons: 8, dur: '5h 40m' },
              { n: 8, t: 'Audit Reporting & follow-up', lessons: 6, dur: '4h' },
              { n: 9, t: 'Auditing in practice — workshop', lessons: 4, dur: '4h LIVE' },
              { n: 10, t: 'Auditing complex orgs (multi-site)', lessons: 5, dur: '3h 30m' },
              { n: 11, t: 'Capstone — real-org audit project', lessons: 4, dur: '6h' },
              { n: 12, t: 'CQI/IRCA exam prep + mock', lessons: 5, dur: '4h' },
            ].map(m => (
              <details key={m.n} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <summary style={{ cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-100)', color: 'var(--brand-800)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{m.n}</span>
                  <span style={{ flex: 1 }}>{m.t}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{m.lessons} lessons · {m.dur}</span>
                </summary>
              </details>
            ))}
          </JDetailSection>

          <JDetailSection title="About the instructor">
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <Avatar user={inst} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{inst.name}</div>
                <div style={{ fontSize: 12, color: 'var(--brand-700)', fontWeight: 600, marginTop: 2 }}>{inst.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.55 }}>
                  Founder of eGrowth India. 22 years as a CQI/IRCA Lead Auditor across automotive, pharma, and food sectors. Author of "The Lead Auditor's Handbook" (Hindi + English editions, 2024). Has trained 3,800+ auditors across India, GCC, and SEA.
                </p>
                <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--text-dim)' }}>
                  <span>⭐ <strong>4.9</strong> avg across his courses</span>
                  <span>👥 <strong>3,840 learners</strong> taught</span>
                </div>
              </div>
            </div>
          </JDetailSection>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 88 }}>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="mono" style={{ fontSize: 28, fontWeight: 700, color: 'var(--brand-800)' }}>{c.price}</span>
              {c.original && <span className="mono" style={{ fontSize: 14, color: 'var(--text-dim)', textDecoration: 'line-through' }}>{c.original}</span>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--rose-600)', fontWeight: 700, marginTop: 4 }}>{c.spots}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{c.cohort}</div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14, padding: 12, fontSize: 14 }} data-action="cdetail-enroll">
              Enroll now <Icon name="arrow" size={14} />
            </button>
            <div style={{ marginTop: 8 }}><HandoffPill /></div>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 13 }} data-action="cdetail-syllabus">
              Download syllabus (PDF)
            </button>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 12, lineHeight: 1.55 }}>
              ✓ Lifetime access · ✓ Mobile-friendly · ✓ Certificate on completion · ✓ 14-day money-back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CHAPTER DETAIL ────────────────────────────────────────────────────
const ChapterDetailPage = ({ onBack }) => {
  const ch = { name: 'India', flag: '🇮🇳', members: 18420, posts: 4280, color: '#FF9300', leads: ['u8', 'u9', 'u3'], desc: 'Largest chapter · BRSR, ISO, NEBOSH-India focus' };
  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
        <button onClick={onBack} style={{ color: 'var(--brand-700)', cursor: 'pointer' }} data-action="chdetail-back">← All chapters</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{
          background: `linear-gradient(135deg, ${ch.color}, ${ch.color}dd)`,
          color: '#fff', padding: 36, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 60%)' }} />
          <div style={{ position: 'relative', display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ fontSize: 64, lineHeight: 1 }}>{ch.flag}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 32, color: '#fff' }}>{ch.name} Chapter</h1>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{ch.desc}</div>
              <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 12, opacity: 0.9 }}>
                <span><strong>{ch.members.toLocaleString()}</strong> members</span>
                <span>·</span>
                <span><strong>{ch.posts.toLocaleString()}</strong> posts this month</span>
                <span>·</span>
                <span><strong>14</strong> upcoming meetups</span>
                <span>·</span>
                <span><strong>42</strong> active jobs in India</span>
              </div>
            </div>
            <button className="btn btn-amber" data-action="chdetail-join">Join chapter</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ fontSize: 16, marginBottom: 14 }}>Upcoming local meetups</h2>
            {[
              { d: 'Sat, May 25', city: 'Bengaluru', title: 'BRSR Core implementation — practitioners\' roundtable', attending: 48 },
              { d: 'Wed, Jun 4',  city: 'Mumbai',    title: 'NEBOSH IGC group study (every Wed)', attending: 24 },
              { d: 'Sat, Jun 14', city: 'Delhi NCR', title: 'ISO 9001:2026 transition walkthrough · with Pushpender', attending: 124 },
              { d: 'Fri, Jun 27', city: 'Chennai',   title: 'Quality leaders dinner (₹1,500/person)', attending: 18 },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                <div style={{ textAlign: 'center', minWidth: 60 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>{m.d.split(',')[0]}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-700)' }}>{m.d.split(' ').slice(2).join(' ')}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>📍 {m.city} · {m.attending} attending</div>
                </div>
                <button className="btn btn-outline" style={{ padding: '5px 12px', fontSize: 12 }} data-action={`chdetail-rsvp-${i}`}>RSVP</button>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ fontSize: 16, marginBottom: 12 }}>India-specific regulations watch</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 14px' }}>Curated by chapter leads. New rules, draft revisions, enforcement trends.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['BRSR Core 2026 — additional KPIs effective Apr 2027', 'New'],
                ['SEBI ESG rating regulator framework — draft out for comments', 'Draft'],
                ['CPCB consent renewal — new digital portal mandatory', 'Active'],
                ['Bureau of Energy Efficiency — ISO 50001 incentive scheme', 'Open'],
              ].map(([t, badge], i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)' }}>
                  <span style={{ fontSize: 9, padding: '2px 6px', background: 'var(--amber-100)', color: 'var(--amber-600)', borderRadius: 3, fontWeight: 700 }}>{badge}</span>
                  <span style={{ fontSize: 12, flex: 1 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>Chapter leads</h3>
            {ch.leads.map(uid => {
              const u = USER_MAP[uid];
              return (
                <div key={uid} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                  <Avatar user={u} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{u.title}</div>
                  </div>
                  {u.isFounder && <span className="chip chip-amber" style={{ padding: '1px 6px', fontSize: 9 }}>Founder</span>}
                </div>
              );
            })}
          </div>
          <div className="card" style={{ padding: 16, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
            <h3 style={{ fontSize: 13 }}>Volunteer as a chapter co-lead</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 10px' }}>Help organize meetups, moderate posts, curate the regulations watch.</p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} data-action="chdetail-apply-colead">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { EmptyState, NotFoundPage, MessagesPage, JobDetailPage, CourseDetailPage, ChapterDetailPage });
