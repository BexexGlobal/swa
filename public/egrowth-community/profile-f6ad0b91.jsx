// Profile page — resume-style with auto-endorsements

const ProfilePage = ({ user, onNavigate }) => {
  const tier = getTier(user.reputation);
  const next = RANK_TIERS[RANK_TIERS.findIndex(t => t.id === tier.id) + 1];
  return (
    <div style={{ maxWidth: 1080 }}>
      {/* Header banner */}
      <div style={{
        background: `linear-gradient(135deg, var(--brand-900), var(--brand-600))`,
        height: 140,
        borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 40%, var(--amber-400) 0%, transparent 50%)', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent 0 30px, rgba(255,255,255,0.03) 30px 60px)' }} />
      </div>

      <div className="card" style={{ borderRadius: '0 0 var(--r-lg) var(--r-lg)', borderTop: 'none', padding: '0 32px 28px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -56 }}>
          <div style={{ background: 'var(--bg-raised)', padding: 4, borderRadius: '50%' }}>
            <Avatar user={user} size={120} />
          </div>
          <div style={{ flex: 1, paddingBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 26, fontWeight: 700 }}>{user.name}</h1>
              <RankBadge points={user.reputation} />
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 6 }}>{user.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                <Icon name="location" size={13} />
                {user.location}
              </span>
              <span>·</span>
              <span>Joined {user.joined}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 12 }}>
            <button className="btn btn-outline" onClick={() => window.__openResume && window.__openResume(user)}>
              <Icon name="download" size={14} />
              Export resume (PDF)
            </button>
            <button className="btn btn-primary" onClick={() => window.__navigate && window.__navigate('settings')} data-action="profile-edit">
              <Icon name="edit" size={14} />
              Edit profile
            </button>
          </div>
        </div>

        {/* Reputation strip */}
        <div style={{ display: 'flex', gap: 0, marginTop: 24, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <ReputationCell label="Reputation" value={user.reputation.toLocaleString()} sub={tier.label} highlight />
          <ReputationCell label="Answers" value={user.contributions.answers} sub="217 helpful" />
          <ReputationCell label="Resources" value={user.contributions.resources} sub="14.2K downloads" />
          <ReputationCell label="Questions" value={user.contributions.questions} sub="36 resolved" />
          <ReputationCell label="Endorsements" value={user.contributions.endorsements} sub="186 from peers" />
          <ReputationCell label="Jobs filled" value={user.contributions.jobs} sub="via referral" />
        </div>

        {/* Progress to next tier */}
        {next && (
          <div style={{ marginTop: 18, padding: 14, background: 'var(--brand-50)', borderRadius: 'var(--r-md)', border: '1px solid var(--brand-200)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon name="sparkle" size={22} style={{ color: 'var(--amber-500)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {(next.min - user.reputation).toLocaleString()} reputation to reach <span style={{ color: 'var(--brand-700)' }}>{next.label} {next.roman}</span>
              </div>
              <div className="skill-bar" style={{ marginTop: 8 }}>
                <div className="skill-fill" style={{ width: `${Math.min(100, ((user.reputation - tier.min) / (next.min - tier.min)) * 100)}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24, marginTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SkillsSection user={user} />
          <ActivitySection user={user} />
          <ResumeSection user={user} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <PublicURLCard user={user} />
          <DomainsCard user={user} />
          <EndorsersCard />
          <AchievementsCard user={user} />
        </div>
      </div>
    </div>
  );
};

const ReputationCell = ({ label, value, sub, highlight }) => (
  <div style={{
    flex: 1,
    padding: '14px 16px',
    borderRight: '1px solid var(--border)',
    background: highlight ? 'linear-gradient(180deg, var(--brand-100), var(--bg-sunken))' : 'transparent',
  }}>
    <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: highlight ? 'var(--brand-800)' : 'var(--text)' }}>{value}</div>
    <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
  </div>
);

const SkillsSection = ({ user }) => (
  <section className="card" style={{ padding: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
      <h2 style={{ fontSize: 18 }}>Skills</h2>
      <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Auto-endorsed by your activity</span>
    </div>
    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.55 }}>
      No self-declared skills here — each level reflects what the community has actually validated through your answers, resources, and endorsements.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {user.skills.map(s => (
        <div key={s.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
              <span className="chip" style={{ padding: '1px 8px', fontSize: 10 }}>
                {s.endorsements} endorsements
              </span>
            </div>
            <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-700)' }}>{s.level}%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-fill" style={{ width: `${s.level}%` }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>↳ Derived from {s.from}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 16, padding: 12, background: 'var(--moss-100)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon name="sparkle" size={16} style={{ color: 'var(--moss-700)' }} />
      <span style={{ fontSize: 12, color: 'var(--moss-700)', fontWeight: 500 }}>
        Your <strong>ESG Reporting</strong> skill grew 12% this month thanks to 3 highly-upvoted answers.
      </span>
    </div>
  </section>
);

const ActivitySection = ({ user }) => {
  const activity = [
    { ts: '2d ago',  type: 'resource', text: 'Shared',  highlight: 'Internal Audit Question Bank — 127 questions',  meta: '942 downloads · +186 rep' },
    { ts: '4d ago',  type: 'question', text: 'Answered', highlight: 'How do you defend OFI vs NC categorization in customer audits?', meta: '23 upvotes · +52 rep' },
    { ts: '6d ago',  type: 'event',    text: 'Attended', highlight: 'CSRD Readiness: Practical Steps webinar', meta: '+3 rep' },
    { ts: '1w ago',  type: 'question', text: 'Asked',   highlight: 'Best ESG disclosure framework for mid-size manufacturers in APAC?', meta: '34 answers · +15 rep' },
    { ts: '2w ago',  type: 'resource', text: 'Endorsed by 8 people for', highlight: 'Root Cause Analysis', meta: '+40 rep' },
    { ts: '3w ago',  type: 'job',      text: 'Posted',   highlight: 'Junior Quality Auditor — Pune (Hybrid)', meta: '18 applications · +15 rep' },
  ];
  const iconMap = { resource: 'resource', question: 'question', event: 'event', job: 'briefcase' };
  return (
    <section className="card" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 18, marginBottom: 18 }}>Activity timeline</h2>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        <div style={{ position: 'absolute', left: 12, top: 8, bottom: 8, width: 2, background: 'var(--border)' }} />
        {activity.map((a, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: 18 }}>
            <div style={{
              position: 'absolute', left: -22, top: 2,
              width: 26, height: 26, borderRadius: '50%',
              background: 'var(--bg-raised)',
              border: '2px solid var(--brand-300)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--brand-700)',
            }}>
              <Icon name={iconMap[a.type]} size={12} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.ts}</div>
            <div style={{ fontSize: 14, marginTop: 3 }}>
              <span style={{ color: 'var(--text-muted)' }}>{a.text} </span>
              <span style={{ fontWeight: 600 }}>{a.highlight}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--moss-700)', marginTop: 2, fontWeight: 500 }}>{a.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ResumeSection = ({ user }) => {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <h2 style={{ fontSize: 18 }}>Experience</h2>
        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>✨ Linked to your community contributions</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px' }}>
        Each role's claims are backed by activity here. Hover for the linked evidence.
      </p>

      <ResumeEntry
        role="Quality Systems Consultant"
        company="Independent"
        dates="2022 — Present"
        bullets={[
          { t: 'Conducted 40+ ISO 9001 internal audits across automotive & medical device sectors', evidence: '14 audit-related answers, 9 resources shared' },
          { t: 'Built audit question banks adopted by community members worldwide', evidence: '942 downloads of "ISO 9001 Audit Question Bank"' },
          { t: 'Trained junior auditors on OFI/NC categorization', evidence: '142 endorsements for ISO 9001 skill' },
        ]}
      />
      <ResumeEntry
        role="Senior Quality Engineer"
        company="Tata Consumer Products"
        dates="2018 — 2022"
        bullets={[
          { t: 'Led APQP/PPAP rollouts across 4 plants', evidence: 'Shared 5 APQP templates · 64 endorsements' },
          { t: 'Implemented FMEA program reducing escapes by 38%', evidence: '12 RCA/FMEA-related answers' },
        ]}
      />
      <ResumeEntry
        role="Quality Engineer"
        company="Bosch India"
        dates="2015 — 2018"
        last
        bullets={[
          { t: 'Six Sigma Green Belt — Yield improvement projects', evidence: '54 endorsements for Six Sigma' },
        ]}
      />
    </section>
  );
};

const ResumeEntry = ({ role, company, dates, bullets, last }) => (
  <div style={{ paddingBottom: last ? 0 : 20, marginBottom: last ? 0 : 20, borderBottom: last ? 'none' : '1px solid var(--border)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{role}</div>
        <div style={{ fontSize: 13, color: 'var(--brand-700)' }}>{company}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{dates}</div>
    </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, padding: '6px 0', display: 'flex', gap: 10 }}>
          <Icon name="check" size={14} style={{ color: 'var(--moss-500)', marginTop: 3, flexShrink: 0 }} />
          <span>
            {b.t}
            <div style={{ fontSize: 11, color: 'var(--brand-600)', marginTop: 2, fontStyle: 'italic' }}>
              ↳ {b.evidence}
            </div>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const DomainsCard = ({ user }) => (
  <div className="card" style={{ padding: 20 }}>
    <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>
      Active in
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      <span className="chip chip-brand">Quality</span>
      <span className="chip chip-brand">ESG</span>
      <span className="chip chip-moss">Sustainability</span>
      <span className="chip chip-outline">Environment</span>
    </div>
    <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.5 }}>
      Your domain mix is updated automatically based on the tags you engage with.
    </div>
  </div>
);

const EndorsersCard = () => (
  <div className="card" style={{ padding: 20 }}>
    <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
      Recent endorsers
    </h3>
    {['u2', 'u6', 'u3', 'u7', 'u4'].map(id => {
      const u = USER_MAP[id];
      return (
        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <Avatar user={u} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>endorsed ISO 9001</div>
          </div>
          <RankBadge points={u.reputation} showLabel={false} size="xs" />
        </div>
      );
    })}
  </div>
);

const AchievementsCard = ({ user }) => {
  const badges = [
    { name: 'First answer', earned: true, icon: '🌱', color: 'var(--moss-100)' },
    { name: '100 endorsements', earned: true, icon: '🎯', color: 'var(--brand-100)' },
    { name: 'Resource hero', earned: true, icon: '📦', color: 'var(--amber-100)' },
    { name: '1K downloads', earned: false, icon: '🚀', color: 'var(--ink-100)' },
    { name: 'Top 10% week', earned: true, icon: '⚡', color: 'var(--rose-100)' },
    { name: 'Mentor', earned: false, icon: '🧭', color: 'var(--ink-100)' },
  ];
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
        Badges
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {badges.map(b => (
          <div key={b.name} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: 10, background: b.earned ? b.color : 'var(--bg-sunken)',
            borderRadius: 'var(--r-md)',
            opacity: b.earned ? 1 : 0.5,
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: 22 }}>{b.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, textAlign: 'center', lineHeight: 1.2 }}>{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ProfilePage });
