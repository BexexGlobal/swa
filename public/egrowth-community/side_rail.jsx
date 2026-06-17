// Right-side rail widgets

const TopContributorsCard = () => (
  <div className="card" style={{ padding: 18 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
        Top contributors this week
      </h3>
      <Icon name="trend" size={14} style={{ color: 'var(--amber-500)' }} />
    </div>
    {TOP_CONTRIBUTORS.map((c, i) => {
      const u = USER_MAP[c.id];
      return (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', width: 16 }}>{i + 1}</span>
          <Avatar user={u} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{c.delta}</div>
          </div>
          <RankBadge points={u.reputation} showLabel={false} size="xs" />
        </div>
      );
    })}
  </div>
);

const TrendingTagsCard = () => (
  <div className="card" style={{ padding: 18 }}>
    <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
      Trending
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {TRENDING_TAGS.map(t => (
        <div key={t.tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--brand-700)' }}>#{t.tag}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }} className="mono">{t.posts}</span>
        </div>
      ))}
    </div>
  </div>
);

const FounderPromoCard = ({ onLearn }) => {
  const founder = USER_MAP['u8'];
  return (
    <div className="promo-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, position: 'relative', zIndex: 1 }}>
        <Avatar user={founder} size={36} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Pushpender Sharma</div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>Founder · eGrowth</div>
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amber-300)', marginBottom: 6 }}>
        Upcoming · Free
      </div>
      <h3 style={{ fontSize: 17, color: '#fff', marginBottom: 4, position: 'relative', zIndex: 1 }}>
        Decoding ISO 9001:2026
      </h3>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>
        Tue, May 12 · 14:00 UTC · 45 min + Q&amp;A
      </div>

      <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
        <button className="btn btn-amber" style={{ flex: 1, justifyContent: 'center' }}>
          Register free
        </button>
        <button className="btn btn-ghost" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} onClick={onLearn}>
          More
        </button>
      </div>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: 12, color: 'rgba(255,255,255,0.7)', position: 'relative', zIndex: 1 }}>
        Also: 4-week ESG Masterclass · Lead Auditor Handbook 2026
      </div>
    </div>
  );
};

const YourRankCard = ({ user }) => {
  const tier = getTier(user.reputation);
  const nextTier = RANK_TIERS[Math.min(RANK_TIERS.findIndex(t => t.id === tier.id) + 1, RANK_TIERS.length - 1)];
  const progress = nextTier && nextTier !== tier
    ? Math.min(100, ((user.reputation - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;
  return (
    <div className="card" style={{ padding: 18 }}>
      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
        Your standing
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Avatar user={user} size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <RankBadge points={user.reputation} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {user.reputation.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {nextTier && nextTier !== tier && (
        <>
          <div className="skill-bar"><div className="skill-fill" style={{ width: `${progress}%` }} /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>
            <span>{tier.label}</span>
            <span>{(nextTier.min - user.reputation).toLocaleString()} to {nextTier.label}</span>
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 14, fontSize: 12 }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: 'var(--bg-sunken)', borderRadius: 8 }}>
          <div className="mono" style={{ fontWeight: 700, fontSize: 16 }}>{user.contributions.answers}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 11 }}>answers</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: 'var(--bg-sunken)', borderRadius: 8 }}>
          <div className="mono" style={{ fontWeight: 700, fontSize: 16 }}>{user.contributions.resources}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 11 }}>resources</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: 'var(--bg-sunken)', borderRadius: 8 }}>
          <div className="mono" style={{ fontWeight: 700, fontSize: 16 }}>{user.contributions.endorsements}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 11 }}>endorsed</div>
        </div>
      </div>
    </div>
  );
};

const HowRankingWorksCard = () => (
  <div className="card" style={{ padding: 18, background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
    <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-800)', marginBottom: 10 }}>
      How rank works
    </h3>
    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
      Everything you do here earns reputation — answers, resources, endorsements, even questions that help others. There is no follow system. We're all equal contributors.
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, fontSize: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)' }}>Upvoted answer</span>
        <span className="mono" style={{ fontWeight: 600 }}>+10</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)' }}>Resource downloaded</span>
        <span className="mono" style={{ fontWeight: 600 }}>+2</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)' }}>Endorsed for a skill</span>
        <span className="mono" style={{ fontWeight: 600 }}>+5</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)' }}>Job posted</span>
        <span className="mono" style={{ fontWeight: 600 }}>+15</span>
      </div>
    </div>
  </div>
);

const StatsBlock = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
    <div className="card" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-700)' }}>48.2K</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Members worldwide</div>
    </div>
    <div className="card" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--moss-500)' }}>4,219</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Free resources</div>
    </div>
    <div className="card" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--amber-600)' }}>186</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Open jobs</div>
    </div>
    <div className="card" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--rose-500)' }}>912</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Questions this week</div>
    </div>
  </div>
);

Object.assign(window, { TopContributorsCard, TrendingTagsCard, FounderPromoCard, YourRankCard, HowRankingWorksCard, StatsBlock });
