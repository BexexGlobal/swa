// Engagement features: QOTD, polls, country chapters, mentorship, flashcards, AMAs, referrals, public profile

// ─── QUESTION OF THE DAY ────────────────────────────────────────────────
const QOTD = {
  id: 'qotd-2026-05-21',
  title: 'When your client refuses to call a finding a Nonconformity and insists it\'s only an Opportunity For Improvement, what evidence wins the argument?',
  context: 'A real situation from a 3rd-party audit last week. Auditee pushed back hard. Looking for crowd-sourced wisdom on what actually convinces a senior management team.',
  responsesNeeded: 1247,
  responsesGot: 89,
  hoursLeft: 14,
  reward: 100,
  topAnswerers: ['u8', 'u3', 'u2', 'u6', 'me'],
  category: 'quality',
  asker: 'u9',
};

const QuestionOfTheDay = () => {
  const asker = USER_MAP[QOTD.asker];
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 60%, var(--amber-600) 130%)',
      color: '#fff', borderColor: 'transparent', marginBottom: 14,
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.35 }} />
      <div style={{ padding: 22, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 10px', background: 'var(--amber-500)', color: 'var(--brand-900)',
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
            borderRadius: 999,
          }}>
            <Icon name="fire" size={11} /> Question of the Day
          </span>
          <span style={{ fontSize: 11, opacity: 0.75 }}>
            ⏳ {QOTD.hoursLeft}h left · {QOTD.responsesGot} of {QOTD.responsesNeeded.toLocaleString()} responses
          </span>
        </div>
        <h2 style={{ fontSize: 19, lineHeight: 1.35, color: '#fff', marginBottom: 6 }}>{QOTD.title}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '0 0 14px', lineHeight: 1.55 }}>{QOTD.context}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <Avatar user={asker} size={24} />
            <span style={{ opacity: 0.9 }}>Posed by <strong>{asker.name}</strong> (Co-Founder)</span>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, opacity: 0.75 }}>
            Answers earn <span className="repo-token" style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'transparent' }}><span className="glyph">R</span>+{QOTD.reward}<span style={{ fontSize: 10, opacity: 0.7, fontWeight: 600 }}>REPO</span></span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button className="btn btn-amber" style={{ flex: 1, justifyContent: 'center' }} data-action="qotd-answer">
            Write your answer
            <Icon name="arrow" size={13} />
          </button>
          <button className="btn btn-ghost" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }} data-action="qotd-see-all">
            See all 89 answers
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── POLL CARD ──────────────────────────────────────────────────────────
const SAMPLE_POLL = {
  id: 'poll-1',
  author: 'u2',
  ts: '6h',
  question: 'For your next ISO 45001 internal audit, what do you find HARDEST to evidence well?',
  options: [
    { id: 'a', label: 'Hazard identification (process and behavioral)', votes: 412 },
    { id: 'b', label: 'Worker consultation & participation (Clause 5.4)', votes: 1024 },
    { id: 'c', label: 'Operational planning & control (8.1)', votes: 320 },
    { id: 'd', label: 'Management of change',                  votes: 588 },
  ],
  totalVotes: 2344,
  daysLeft: 2,
  myVote: null,
};

const PollCard = ({ poll = SAMPLE_POLL }) => {
  const [vote, setVote] = React.useState(poll.myVote);
  const author = USER_MAP[poll.author];
  const total = poll.totalVotes + (vote ? 1 : 0);

  return (
    <article className="feed-item fade-in">
      <div className="post-header">
        <Avatar user={author} size={42} />
        <div className="post-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="post-name">{author.name}</span>
            <RankBadge points={author.reputation} showLabel={false} />
          </div>
          <div className="post-sub" style={{ marginTop: 2 }}>{author.title} · {poll.ts} ago</div>
        </div>
        <span className="post-kind" style={{ background: 'var(--brand-100)', color: 'var(--brand-800)' }}>
          <Icon name="trend" size={11} /> Poll
        </span>
      </div>

      <h3 style={{ fontSize: 16, lineHeight: 1.35, marginBottom: 12 }}>{poll.question}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {poll.options.map(o => {
          const isVoted = vote === o.id;
          const pct = ((o.votes + (isVoted ? 1 : 0)) / total) * 100;
          const showResults = !!vote;
          return (
            <button
              key={o.id}
              onClick={() => !vote && setVote(o.id)}
              data-action={`poll-vote-${o.id}`}
              style={{
                position: 'relative', padding: '12px 14px',
                borderRadius: 'var(--r-md)',
                border: `1px solid ${isVoted ? 'var(--brand-500)' : 'var(--border)'}`,
                background: 'var(--bg-raised)',
                cursor: vote ? 'default' : 'pointer',
                textAlign: 'left', width: '100%',
                overflow: 'hidden',
                transition: 'all 0.15s',
              }}
            >
              {showResults && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  width: `${pct}%`,
                  background: isVoted ? 'var(--brand-100)' : 'var(--bg-sunken)',
                  transition: 'width 0.4s ease-out',
                }} />
              )}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: isVoted ? 600 : 500, flex: 1, color: 'var(--text)' }}>
                  {isVoted && <span style={{ color: 'var(--brand-600)', marginRight: 6 }}>✓</span>}
                  {o.label}
                </span>
                {showResults && (
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: isVoted ? 'var(--brand-700)' : 'var(--text-muted)' }}>
                    {Math.round(pct)}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span><span className="mono" style={{ color: 'var(--text)', fontWeight: 600 }}>{total.toLocaleString()}</span> votes</span>
        <span>·</span>
        <span>{poll.daysLeft} days left</span>
        {vote && <><span>·</span><span style={{ color: 'var(--moss-700)', fontWeight: 600 }}>+3 REPO for voting</span></>}
        <div style={{ flex: 1 }} />
        <button className="activity-btn" style={{ padding: '4px 8px' }}>
          <Icon name="comment" size={13} /> 38 comments
        </button>
      </div>
    </article>
  );
};

// ─── COUNTRY CHAPTERS ───────────────────────────────────────────────────
const CHAPTERS = [
  { id: 'in', name: 'India', flag: '🇮🇳', members: 18420, posts: 4280, leads: ['u8', 'u9', 'u3'], featured: true, color: '#FF9300', desc: 'Largest chapter · BRSR, ISO, NEBOSH-India focus' },
  { id: 'ae', name: 'UAE & GCC', flag: '🇦🇪', members: 4820, posts: 1240, leads: ['u5'], color: '#176e6e', desc: 'HSE in oil & gas, construction, mining' },
  { id: 'sg', name: 'Singapore & SEA', flag: '🇸🇬', members: 3140, posts: 980, leads: ['u7'], color: '#b84557', desc: 'CSRD prep, supply-chain ESG, apparel' },
  { id: 'za', name: 'South Africa', flag: '🇿🇦', members: 1820, posts: 620, leads: ['u2'], color: '#c2700a', desc: 'Mining HSE, JSE Sustainability Disclosures' },
  { id: 'br', name: 'Brazil & LATAM', flag: '🇧🇷', members: 1240, posts: 480, leads: ['u4'], color: '#4a8a5e', desc: 'Process safety, offshore O&G, Bracell-style RFM' },
  { id: 'eu', name: 'Europe', flag: '🇪🇺', members: 4620, posts: 1820, leads: ['u6'], color: '#3a52a0', desc: 'ESRS, CSRD, ISO 50001, energy auditing' },
  { id: 'uk', name: 'UK & Ireland', flag: '🇬🇧', members: 2840, posts: 980, leads: [], color: '#0e4040', desc: 'NEBOSH home country · IOSH, post-Brexit ESG' },
  { id: 'us', name: 'North America', flag: '🇺🇸', members: 3920, posts: 1340, leads: [], color: '#475467', desc: 'SEC climate disclosure, OSHA, SASB' },
  { id: 'au', name: 'Australia & NZ', flag: '🇦🇺', members: 1120, posts: 380, leads: [], color: '#c2700a', desc: 'Modern Slavery Act, ISSB adoption' },
];

const ChaptersPage = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Country Chapters</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
          Local communities for local regulations. Join your country's chapter to see geo-specific posts, jobs, events, and people.
        </p>
      </div>
      <button className="btn btn-outline" data-action="propose-new-chapter">
        <Icon name="plus" size={14} /> Propose a new chapter
      </button>
    </div>

    <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {CHAPTERS.map(ch => (
        <div key={ch.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{
            background: `linear-gradient(135deg, ${ch.color}, ${ch.color}dd)`,
            color: '#fff', padding: '20px 22px',
            position: 'relative',
          }}>
            {ch.featured && (
              <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, padding: '2px 7px', background: 'rgba(0,0,0,0.3)', borderRadius: 4, fontWeight: 700, letterSpacing: '0.05em' }}>
                ★ FEATURED
              </span>
            )}
            <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 8 }}>{ch.flag}</div>
            <h3 style={{ fontSize: 18, color: '#fff' }}>{ch.name}</h3>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{ch.desc}</div>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
              <span><strong className="mono" style={{ color: 'var(--text)' }}>{ch.members.toLocaleString()}</strong> members</span>
              <span><strong className="mono" style={{ color: 'var(--text)' }}>{ch.posts.toLocaleString()}</strong> posts/mo</span>
            </div>
            {ch.leads.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', marginRight: 4 }}>Leads:</span>
                {ch.leads.map(uid => {
                  const u = USER_MAP[uid];
                  return u ? <Avatar key={uid} user={u} size={24} /> : null;
                })}
              </div>
            )}
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} data-action={`join-chapter-${ch.id}`}>
              Join chapter
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── MENTORSHIP MATCHING ────────────────────────────────────────────────
const MENTORS = [
  { id: 'u8', focus: 'ISO 9001 · Audit programs · Career', exp: '18 yrs', rate: 'Free · 30 min/mo', slots: 'Mentoring 4 of 5', testimonials: 87, badge: 'Founder' },
  { id: 'u3', focus: 'ESG reporting · GRI · BRSR · Materiality', exp: '14 yrs', rate: 'Free · 45 min/mo', slots: 'Mentoring 3 of 5', testimonials: 62 },
  { id: 'u2', focus: 'HSE in mining · NEBOSH IGC prep · Career', exp: '16 yrs', rate: 'Free · 30 min/mo', slots: 'Mentoring 5 of 5 (waitlist)', testimonials: 54 },
  { id: 'u6', focus: 'Energy auditing · ISO 50001 · BEE prep', exp: '11 yrs', rate: 'Free · 60 min/mo', slots: 'Mentoring 2 of 4', testimonials: 38 },
];

const MentorshipPage = ({ currentUser }) => {
  const [tab, setTab] = React.useState('find');
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-600) 60%, var(--moss-500) 130%)',
        color: '#fff', borderRadius: 'var(--r-lg)', padding: 32, marginBottom: 24,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.3 }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
          <Icon name="users" size={12} /> Free · Peer-to-peer · No followers
        </div>
        <h1 style={{ fontSize: 30, color: '#fff', maxWidth: 580 }}>
          Mentorship — quietly, peer to peer.
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 560, marginTop: 10 }}>
          1,420 mentors across QEHS &amp; ESG, matched on skill overlap, time zone, and language. Most offer 30–60 minutes a month for free. No follow system means quality, not popularity.
        </p>
      </div>

      <div className="tabs">
        {[
          { id: 'find', label: 'Find a mentor', count: 1420 },
          { id: 'become', label: 'Become a mentor' },
          { id: 'mine', label: 'My sessions', count: 2 },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} data-action={`mentor-tab-${t.id}`}>
            {t.label}{t.count != null && <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 10 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === 'find' && (
        <>
          <div className="card" style={{ padding: 16, background: 'var(--brand-50)', borderColor: 'var(--brand-200)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon name="sparkle" size={20} style={{ color: 'var(--amber-500)' }} />
            <div style={{ flex: 1, fontSize: 13 }}>
              <strong>Smart match suggestion:</strong> based on your skills (ISO 9001, ESG Reporting) and goals, we see <strong>3 strong matches</strong> for you below.
            </div>
            <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 13 }} data-action="mentor-smart-match">Smart match me</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MENTORS.map(m => <MentorRow key={m.id} mentor={m} />)}
          </div>
        </>
      )}

      {tab === 'become' && (
        <div className="card" style={{ padding: 28, maxWidth: 640 }}>
          <Icon name="award" size={28} style={{ color: 'var(--amber-500)', marginBottom: 10 }} />
          <h2 style={{ fontSize: 20 }}>Pay it forward — become a mentor</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '10px 0', lineHeight: 1.6 }}>
            You've earned enough REPO and your community standing meets our mentor criteria. Set your availability, pick your focus areas, and start helping the next generation of QEHS professionals.
          </p>
          <ul style={{ paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <li>Earn <Reputation points={50} /> per session completed</li>
            <li>Mentor badge on your profile</li>
            <li>Priority access to founder events</li>
            <li>Auto-added to "Verified Mentor" public collections</li>
          </ul>
          <button className="btn btn-primary" style={{ marginTop: 14 }} data-action="apply-to-mentor">Apply to mentor</button>
        </div>
      )}

      {tab === 'mine' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar user={USER_MAP['u8']} size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Pushpender Sharma</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>ISO 9001 audit programs · Active mentorship since Mar 2026</div>
              <div style={{ fontSize: 12, marginTop: 4, color: 'var(--moss-700)' }}>Next session: <strong>Thu, May 23 · 19:00 IST</strong></div>
            </div>
            <button className="btn btn-outline" data-action="mentor-reschedule">Reschedule</button>
            <button className="btn btn-primary" data-action="mentor-join-call">Join call</button>
          </div>
          <div className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar user={USER_MAP['u3']} size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Sonu Singh</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>ESG / GRI mentoring · Active since Apr 2026</div>
              <div style={{ fontSize: 12, marginTop: 4, color: 'var(--text-dim)' }}>Next session: <em>Awaiting confirmation</em></div>
            </div>
            <button className="btn btn-outline" data-action="mentor-message">Message</button>
          </div>
        </div>
      )}
    </div>
  );
};

const MentorRow = ({ mentor }) => {
  const u = USER_MAP[mentor.id];
  return (
    <div className="card card-hover" style={{ padding: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar user={u} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{u.name}</span>
          <RankBadge points={u.reputation} showLabel={false} />
          {mentor.badge && <span className="chip chip-amber" style={{ padding: '1px 7px', fontSize: 10 }}>{mentor.badge}</span>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{u.title}</div>
        <div style={{ fontSize: 12, color: 'var(--brand-700)', fontWeight: 600, marginTop: 6 }}>{mentor.focus}</div>
        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>
          <span>{mentor.exp} exp</span>
          <span>· {mentor.rate}</span>
          <span>· {mentor.slots}</span>
          <span>· {mentor.testimonials} testimonials</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }} data-action={`request-mentor-${mentor.id}`}>
          Request mentor
        </button>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }} data-action={`mentor-profile-${mentor.id}`}>
          View profile
        </button>
      </div>
    </div>
  );
};

// ─── FLASHCARDS MINI-GAME ───────────────────────────────────────────────
const FLASHCARD_DECKS = [
  { id: 'ho-controls', title: 'Hierarchy of Controls — drag-to-rank', kind: 'rank', cards: 5, plays: 8420, avgScore: 78, color: '#b84557' },
  { id: 'iso9001-clauses', title: 'ISO 9001 — clause memorization', kind: 'flip', cards: 24, plays: 14820, avgScore: 64, color: '#1e8a8a' },
  { id: 'gri-esrs', title: 'GRI → ESRS mapping match', kind: 'match', cards: 18, plays: 4280, avgScore: 71, color: '#2d5a3d' },
  { id: 'nebosh-terms', title: 'NEBOSH IGC terminology', kind: 'flip', cards: 64, plays: 9820, avgScore: 73, color: '#c2700a' },
  { id: 'hazop-words', title: 'HAZOP guide words', kind: 'match', cards: 14, plays: 2120, avgScore: 68, color: '#475467' },
  { id: 'iso50001', title: 'ISO 50001 essentials', kind: 'flip', cards: 32, plays: 1820, avgScore: 70, color: '#3979c4' },
];

const FlashcardsPage = () => {
  const [active, setActive] = React.useState(null);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Flashcards &amp; Mini-games</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Bite-sized practice for terminology, mappings, and frameworks. Designed for waiting-in-line learning.
          </p>
        </div>
        <button className="btn btn-outline" data-action="create-deck">
          <Icon name="plus" size={14} /> Build a deck
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 22 }}>
        {FLASHCARD_DECKS.map(d => (
          <div key={d.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setActive(d)}>
            <div style={{
              background: d.color, color: '#fff',
              padding: 22, position: 'relative', minHeight: 130,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.18), transparent 60%)' }} />
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ padding: '3px 10px', background: 'rgba(0,0,0,0.25)', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', backdropFilter: 'blur(4px)' }}>
                  {d.kind === 'flip' ? '↻ Flip' : d.kind === 'match' ? '↔ Match' : '↕ Rank'}
                </span>
                <span className="mono" style={{ fontSize: 11, opacity: 0.85 }}>{d.cards} cards</span>
              </div>
              <h3 style={{ fontSize: 17, color: '#fff', position: 'relative', marginTop: 12 }}>{d.title}</h3>
            </div>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                <span className="mono" style={{ color: 'var(--text)' }}>{d.plays.toLocaleString()}</span> plays · avg <strong>{d.avgScore}%</strong>
              </div>
              <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: 12 }} data-action={`play-deck-${d.id}`}>
                Play
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && <FlashcardPlayer deck={active} onClose={() => setActive(null)} />}
    </div>
  );
};

const FlashcardPlayer = ({ deck, onClose }) => {
  const [flipped, setFlipped] = React.useState(false);
  const [i, setI] = React.useState(0);
  const cards = [
    { front: 'Clause 9.2', back: 'Internal Audit — Conformity to org\'s own requirements + ISO 9001, effectively implemented + maintained' },
    { front: 'Clause 9.3', back: 'Management Review — At planned intervals, with specified inputs and outputs' },
    { front: 'Clause 10.2', back: 'Nonconformity and Corrective Action — React, evaluate, implement, review, change' },
  ];
  const card = cards[i % cards.length];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.75)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', maxWidth: 540, width: '100%' }}>
        {/* Top bar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, color: '#fff' }}>
          <h2 style={{ flex: 1, color: '#fff', fontSize: 16 }}>{deck.title}</h2>
          <span className="mono" style={{ fontSize: 13, opacity: 0.7 }}>{i + 1} / {deck.cards}</span>
          <button className="btn btn-ghost" style={{ color: '#fff', padding: 6 }} onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        {/* Card */}
        <div
          onClick={() => setFlipped(!flipped)}
          style={{
            width: '100%', aspectRatio: '3 / 2',
            background: '#fff', borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 40, cursor: 'pointer',
            position: 'relative', transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{
            position: 'absolute', inset: 40,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backfaceVisibility: 'hidden',
          }}>
            <div style={{ fontSize: 11, color: 'var(--brand-600)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 18 }}>
              ISO 9001:2015
            </div>
            <div style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-800)' }}>
              {card.front}
            </div>
            <div style={{ marginTop: 20, fontSize: 11, color: 'var(--text-dim)' }}>(tap to flip)</div>
          </div>
          <div style={{
            position: 'absolute', inset: 40,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
            <div style={{ fontSize: 11, color: 'var(--moss-700)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 14 }}>
              Answer
            </div>
            <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--text)' }}>{card.back}</div>
          </div>
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'center' }}>
          <button className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }} onClick={() => { setI(Math.max(0, i - 1)); setFlipped(false); }} data-action="flashcard-prev">
            <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Prev
          </button>
          <button className="btn btn-outline" style={{ color: 'var(--rose-600)', background: '#fff', borderColor: '#fff' }} data-action="flashcard-still-learning" onClick={() => { setI(i + 1); setFlipped(false); }}>
            Still learning
          </button>
          <button className="btn btn-amber" data-action="flashcard-got-it" onClick={() => { setI(i + 1); setFlipped(false); }}>
            Got it! <Icon name="check" size={14} />
          </button>
          <button className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }} onClick={() => { setI(i + 1); setFlipped(false); }} data-action="flashcard-next">
            Next <Icon name="chevronRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── LIVE AMAs ──────────────────────────────────────────────────────────
const AMA_SCHEDULE = [
  { id: 'ama-1', date: 'Tomorrow', time: '19:00 IST', duration: '60 min', host: 'u8', topic: 'ISO 9001:2026 transition — what you actually need to do', registered: 1820, status: 'upcoming', tag: 'quality' },
  { id: 'ama-2', date: 'Fri, May 24', time: '18:00 IST', duration: '45 min', host: 'u3', topic: 'BRSR Core: lessons from 50 companies in 2025', registered: 720, status: 'upcoming', tag: 'esg' },
  { id: 'ama-3', date: 'Last Tue', time: '19:00 IST', duration: '60 min', host: 'u2', topic: 'NEBOSH IGC — common mistakes and how to dodge them', registered: 2240, status: 'recorded', recordingViews: 8120, tag: 'safety' },
  { id: 'ama-4', date: 'Last Wed', time: '20:00 IST', duration: '50 min', host: 'u6', topic: 'BEE Energy Auditor exam — paper 1 walkthrough', registered: 480, status: 'recorded', recordingViews: 1820, tag: 'energy' },
];

const AMASection = () => (
  <div className="card" style={{ padding: 22, marginBottom: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rose-100)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>●</div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 17 }}>Live AMAs &amp; Office Hours</h2>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
          Free 30–60 minute live sessions with founders &amp; community leaders. Recordings posted within 24 hrs.
        </div>
      </div>
      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 13 }} data-action="ama-suggest-topic">Suggest a topic</button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {AMA_SCHEDULE.map(a => {
        const host = USER_MAP[a.host];
        const isLive = a.date === 'Tomorrow';
        return (
          <div key={a.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px',
            background: a.status === 'upcoming' ? 'var(--brand-50)' : 'var(--bg-sunken)',
            borderRadius: 'var(--r-md)',
            border: `1px solid ${a.status === 'upcoming' ? 'var(--brand-200)' : 'var(--border)'}`,
          }}>
            <Avatar user={host} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{a.topic}</span>
                {a.status === 'upcoming' && isLive && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '1px 7px', background: 'var(--rose-500)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4 }}>
                    <span style={{ width: 5, height: 5, background: '#fff', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                    LIVE TOMORROW
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Hosted by <strong>{host.name}</strong> · {a.date} at {a.time} · {a.duration}
                {a.status === 'recorded' && <> · <span className="mono">{a.recordingViews.toLocaleString()} replays</span></>}
              </div>
            </div>
            {a.status === 'upcoming' ? (
              <button className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }} data-action={`ama-register-${a.id}`}>
                Register · Free
              </button>
            ) : (
              <button className="btn btn-outline" style={{ padding: '7px 14px', fontSize: 13 }} data-action={`ama-replay-${a.id}`}>
                <Icon name="eye" size={13} /> Watch replay
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ─── REFERRAL MODAL ─────────────────────────────────────────────────────
const ReferralModal = ({ open, onClose, currentUser }) => {
  if (!open) return null;
  const link = `egrowth.in/r/${currentUser.handle}`;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 520, borderRadius: 'var(--r-lg)', overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)', animation: 'fadeIn 0.2s ease-out',
      }}>
        <div style={{
          padding: 24, background: 'linear-gradient(135deg, var(--brand-900), var(--amber-600))',
          color: '#fff', position: 'relative',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.4 }} />
          <button className="btn btn-ghost" style={{ position: 'absolute', top: 12, right: 12, color: '#fff', padding: 6 }} onClick={onClose}><Icon name="x" size={18} /></button>
          <Icon name="users" size={32} style={{ marginBottom: 10 }} />
          <h2 style={{ fontSize: 22, color: '#fff' }}>Invite a QEHS colleague.</h2>
          <h2 style={{ fontSize: 22, color: '#fff' }}>Both earn <span style={{ color: 'var(--amber-300)' }}>+100 REPO</span>.</h2>
          <p style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>
            When they join &amp; complete their first contribution (an answer, resource, or quiz), the bonus REPO is credited to both of you.
          </p>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 6 }}>Your referral link</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            <input value={link} readOnly style={{
              flex: 1, padding: '10px 12px',
              border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
              background: 'var(--bg-sunken)', fontSize: 13, fontFamily: 'var(--font-mono)',
              color: 'var(--brand-700)', outline: 'none',
            }} />
            <button className="btn btn-primary" data-action="copy-referral-link">Copy</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
            {[
              { id: 'wa', label: 'WhatsApp', color: '#25D366' },
              { id: 'em', label: 'Email', color: 'var(--brand-700)' },
              { id: 'li', label: 'LinkedIn', color: '#0a66c2' },
              { id: 'qr', label: 'QR code', color: 'var(--ink-700)' },
            ].map(c => (
              <button key={c.id} className="btn btn-outline" style={{ justifyContent: 'center', fontSize: 12, padding: '8px 6px' }} data-action={`refer-via-${c.id}`}>
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 8 }}>Your referrals</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-800)' }}>7</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>colleagues joined</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--moss-700)' }}>+700</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>REPO earned from referrals</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--amber-600)' }}>#12</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>top inviter this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PUBLIC PROFILE URL CARD (for the profile page) ─────────────────────
const PublicURLCard = ({ user }) => {
  const url = `egrowth.in/u/${user.handle}`;
  return (
    <div className="card" style={{ padding: 18 }}>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>
        Public profile
      </h3>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>
        Anyone can view your verified contributions, skills, badges, and certificates.
      </div>
      <div style={{ padding: '10px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-700)', marginBottom: 10, border: '1px solid var(--border)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {url}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 12, padding: '6px 8px' }} data-action="copy-profile-url">
          <Icon name="share" size={12} /> Copy
        </button>
        <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 12, padding: '6px 8px' }} data-action="view-as-public">
          <Icon name="eye" size={12} /> View as public
        </button>
      </div>
    </div>
  );
};

Object.assign(window, {
  QuestionOfTheDay, PollCard, SAMPLE_POLL,
  ChaptersPage, MentorshipPage, FlashcardsPage,
  AMASection, ReferralModal, PublicURLCard,
});
