// Moderation & safety — Report modal, kebab menu, Settings, Saved Collections

// ─── Report Modal ──────────────────────────────────────────────────────
const REPORT_REASONS = [
  { id: 'spam',         label: 'Spam or promotional',    desc: 'Repetitive promotion of unrelated products or services' },
  { id: 'harassment',   label: 'Harassment or bullying', desc: 'Personal attacks, intimidation, or hate speech' },
  { id: 'copyright',    label: 'Copyright violation',     desc: 'Shared content the uploader does not own or have rights to' },
  { id: 'confidential', label: 'Confidential info',        desc: 'Contains internal company data, personal info, or trade secrets' },
  { id: 'misinformation', label: 'Misinformation',        desc: 'Inaccurate or misleading QEHS / ESG guidance that could cause harm' },
  { id: 'offtopic',     label: 'Off-topic',               desc: 'Unrelated to Quality, Environment, Health, Safety, Energy, or ESG' },
  { id: 'impersonation', label: 'Impersonation or fake', desc: 'Posing as someone else or misrepresenting credentials' },
  { id: 'other',        label: 'Something else',          desc: 'You\'ll be able to describe the issue in detail' },
];

const ReportModal = ({ open, target, onClose, onSubmit }) => {
  const [reason, setReason] = React.useState(null);
  const [details, setDetails] = React.useState('');
  const [step, setStep] = React.useState(1);
  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 540, maxHeight: '90vh',
        borderRadius: 'var(--r-lg)', overflow: 'auto', boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="flag" size={20} style={{ color: 'var(--rose-600)' }} />
          <h2 style={{ fontSize: 18, flex: 1 }}>Report this {target?.kind || 'content'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><Icon name="x" size={18} /></button>
        </div>

        {step === 1 && (
          <div style={{ padding: 22 }}>
            <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Reports are confidential. Our community moderation team (5 senior practitioners) reviews every report within 24 hours.
              <strong> If you\'re reporting <span style={{ color: 'var(--rose-600)' }}>confidential info or copyright</span>, the content is hidden immediately while we review.</strong>
            </p>

            <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 10 }}>
              What's the issue?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {REPORT_REASONS.map(r => (
                <label key={r.id} style={{
                  display: 'flex', gap: 12, padding: 12, borderRadius: 'var(--r-md)',
                  border: `1px solid ${reason === r.id ? 'var(--brand-500)' : 'var(--border)'}`,
                  background: reason === r.id ? 'var(--brand-50)' : 'var(--bg-raised)',
                  cursor: 'pointer', alignItems: 'flex-start',
                  transition: 'all 0.15s',
                }}>
                  <input
                    type="radio" name="reason"
                    checked={reason === r.id} onChange={() => setReason(r.id)}
                    style={{ marginTop: 3 }}
                    data-action={`report-reason-${r.id}`}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: 22 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 10 }}>
              Tell us more (optional but helpful)
            </div>
            <textarea
              value={details} onChange={e => setDetails(e.target.value)}
              placeholder="What specifically is the problem? Quote text, point to a section, or share context our moderators should know."
              style={{
                width: '100%', minHeight: 120, padding: 12,
                borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
                background: 'var(--bg-sunken)', fontSize: 13, color: 'var(--text)',
                outline: 'none', resize: 'vertical', lineHeight: 1.5,
              }}
            />
            <label style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-muted)', marginTop: 14, alignItems: 'flex-start' }}>
              <input type="checkbox" defaultChecked />
              <span>Email me the outcome of this report (typically within 24 hours)</span>
            </label>
            <label style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-muted)', marginTop: 8, alignItems: 'flex-start' }}>
              <input type="checkbox" />
              <span>Also <strong>block this user</strong> so I don\'t see their posts again</span>
            </label>
          </div>
        )}

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            <Icon name="award" size={11} style={{ verticalAlign: 'middle' }} /> Helpful reports earn <Reputation points={2} /> · false reports may affect your standing
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {step === 2 && <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>}
            {step === 1 && <button className="btn btn-primary" disabled={!reason} onClick={() => setStep(2)} data-action="report-step-next" style={{ opacity: reason ? 1 : 0.5 }}>Continue</button>}
            {step === 2 && <button className="btn btn-primary" onClick={onSubmit} data-action="report-submit">Submit report</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Kebab menu — Report / Block / Hide / Why am I seeing this ──────────
const KebabMenu = ({ onReport, onBlock, onHide, onWhy, isOwn }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        data-action="open-kebab-menu"
        style={{
          padding: 6, borderRadius: 6, color: 'var(--text-dim)',
          background: open ? 'var(--ink-100)' : 'transparent', cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4,
          background: 'var(--bg-raised)', borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)',
          minWidth: 220, padding: 4, zIndex: 50,
          animation: 'fadeIn 0.12s ease-out',
        }}>
          {isOwn ? (
            <>
              <MenuItem icon="edit" label="Edit" action="kebab-edit" onClick={() => setOpen(false)} />
              <MenuItem icon="x"    label="Delete" action="kebab-delete" danger onClick={() => setOpen(false)} />
            </>
          ) : (
            <>
              <MenuItem icon="bookmark" label="Save for later" action="kebab-save"  onClick={() => setOpen(false)} />
              <MenuItem icon="eye"      label="Why am I seeing this?" action="kebab-why" onClick={() => { setOpen(false); onWhy && onWhy(); }} />
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 6px' }} />
              <MenuItem icon="x"        label="Hide this post" action="kebab-hide" onClick={() => { setOpen(false); onHide && onHide(); }} />
              <MenuItem icon="user"     label="Mute author" action="kebab-mute" onClick={() => setOpen(false)} />
              <MenuItem icon="x"        label="Block author" action="kebab-block" danger onClick={() => { setOpen(false); onBlock && onBlock(); }} />
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 6px' }} />
              <MenuItem icon="flag"     label="Report" action="kebab-report" danger onClick={() => { setOpen(false); onReport && onReport(); }} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, danger, onClick, action }) => (
  <button
    onClick={onClick}
    data-action={action}
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px', borderRadius: 6, width: '100%',
      color: danger ? 'var(--rose-600)' : 'var(--text)',
      cursor: 'pointer', fontSize: 13, fontWeight: 500,
      textAlign: 'left',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-100)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <Icon name={icon} size={15} />
    {label}
  </button>
);

// ─── Why am I seeing this? popover (content) ───────────────────────────
const WhyAmISeeingThis = ({ open, onClose, reasons = [] }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.55)', zIndex: 180,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)', width: 480, borderRadius: 'var(--r-lg)',
        padding: 24, boxShadow: 'var(--shadow-lg)', animation: 'fadeIn 0.18s ease-out',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
          <Icon name="eye" size={22} style={{ color: 'var(--brand-700)', marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: 16 }}>Why am I seeing this?</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Your feed is built from your skills, interests, and recent activity. No follow graph, no engagement-bait algorithm.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(reasons.length ? reasons : [
            'You skill-matched on ISO 9001 (top 5% rank)',
            'You\'ve engaged with 8 posts tagged #audit this week',
            'This post got 47 upvotes from members in your domain (Quality)',
          ]).map((r, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--text)', padding: 10, background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Icon name="check" size={14} style={{ color: 'var(--moss-500)', marginTop: 2, flexShrink: 0 }} />
              {r}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={onClose}>Got it</button>
          <button className="btn btn-primary" data-action="why-tune-feed">Tune my feed</button>
        </div>
      </div>
    </div>
  );
};

// ─── SETTINGS page (privacy, notifications, account) ───────────────────
const SettingsPage = ({ currentUser }) => {
  const [tab, setTab] = React.useState('account');
  return (
    <div style={{ maxWidth: 920 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Settings</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 24px' }}>
        Manage your account, privacy, notifications, and data.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
        {/* Side nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { id: 'account', label: 'Account', icon: 'user' },
            { id: 'privacy', label: 'Privacy', icon: 'eye' },
            { id: 'notifications', label: 'Notifications', icon: 'bell' },
            { id: 'feed', label: 'Feed tuning', icon: 'feed' },
            { id: 'blocked', label: 'Blocked &amp; muted', icon: 'x' },
            { id: 'data', label: 'Your data', icon: 'download' },
            { id: 'safety', label: 'Safety center', icon: 'flag' },
            { id: 'deactivate', label: 'Deactivate', icon: 'x' },
          ].map(s => (
            <button
              key={s.id}
              className={`nav-item ${tab === s.id ? 'active' : ''}`}
              onClick={() => setTab(s.id)}
              data-action={`settings-tab-${s.id}`}
            >
              <Icon name={s.icon} size={16} />
              <span dangerouslySetInnerHTML={{ __html: s.label }} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {tab === 'account' && <AccountSettings user={currentUser} />}
          {tab === 'privacy' && <PrivacySettings />}
          {tab === 'notifications' && <NotificationSettings />}
          {tab === 'feed' && <FeedSettings />}
          {tab === 'blocked' && <BlockedList />}
          {tab === 'data' && <DataExport />}
          {tab === 'safety' && <SafetyCenter />}
          {tab === 'deactivate' && <DeactivatePanel />}
        </div>
      </div>
    </div>
  );
};

const SettingSection = ({ title, desc, children }) => (
  <div className="card" style={{ padding: 22, marginBottom: 16 }}>
    <h2 style={{ fontSize: 16, marginBottom: desc ? 4 : 14 }}>{title}</h2>
    {desc && <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 16px' }}>{desc}</p>}
    {children}
  </div>
);

const ToggleRow = ({ label, sub, defaultOn = true, action }) => {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        data-action={action}
        style={{
          width: 38, height: 22, borderRadius: 999,
          background: on ? 'var(--brand-700)' : 'var(--ink-300)',
          position: 'relative', cursor: 'pointer', transition: 'background 0.15s',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: on ? 18 : 2,
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          transition: 'left 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
    </div>
  );
};

const AccountSettings = ({ user }) => (
  <>
    <SettingSection title="Profile">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <SField label="First name" value={user.name.split(' ')[0]} />
        <SField label="Last name" value={user.name.split(' ').slice(1).join(' ')} />
        <SField label="Email" value="ananya.r@example.com" />
        <SField label="Phone" value="+91 98480 12345" />
        <SField label="Company" value="Independent" />
        <SField label="Designation" value={user.title} />
        <SField label="Country" value="India" />
        <SField label="City" value="Bengaluru" />
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" data-action="account-save">Save changes</button>
        <button className="btn btn-outline" data-action="account-change-password">Change password</button>
      </div>
    </SettingSection>
    <SettingSection title="Linked accounts" desc="Sign in faster with your existing accounts.">
      <ToggleRow label="Google" sub="ananya.r@gmail.com · connected" defaultOn action="link-google" />
      <ToggleRow label="LinkedIn" sub="Not connected" defaultOn={false} action="link-linkedin" />
      <ToggleRow label="Microsoft" sub="Not connected" defaultOn={false} action="link-microsoft" />
    </SettingSection>
  </>
);

const PrivacySettings = () => (
  <>
    <SettingSection title="Profile visibility" desc="Control who can see your profile and activity.">
      <ToggleRow label="Show my profile to everyone (egrowth.in/u/ananya.r)" sub="Required for resume export to work publicly" action="priv-public" />
      <ToggleRow label="Show my email on my profile" defaultOn={false} action="priv-email" />
      <ToggleRow label="Show my phone on my profile" defaultOn={false} action="priv-phone" />
      <ToggleRow label="Show my company name" action="priv-company" />
      <ToggleRow label="Show my REPO score on my profile" action="priv-repo" />
      <ToggleRow label="Show my activity timeline" action="priv-activity" />
      <ToggleRow label="Allow other members to message me" action="priv-messages" />
      <ToggleRow label="Appear on the leaderboard" action="priv-leaderboard" />
    </SettingSection>
    <SettingSection title="Indexing" desc="Should search engines (Google, Bing) be able to find your profile?">
      <ToggleRow label="Allow search engines to index my profile" defaultOn={false} action="priv-seo" />
    </SettingSection>
  </>
);

const NotificationSettings = () => (
  <>
    <SettingSection title="What we notify you about">
      <ToggleRow label="Replies to my questions" action="notif-replies" />
      <ToggleRow label="Mentions of my name (@ananya)" action="notif-mentions" />
      <ToggleRow label="Endorsements for my skills" action="notif-endorse" />
      <ToggleRow label="REPO milestones (every 500 REPO)" action="notif-repo-milestones" />
      <ToggleRow label="Quiz leaderboard updates" defaultOn={false} action="notif-leaderboard" />
      <ToggleRow label="New jobs matching my skills" action="notif-jobs" />
      <ToggleRow label="New resources tagged with my domains" defaultOn={false} action="notif-resources" />
      <ToggleRow label="Daily challenge reminders" action="notif-daily" />
      <ToggleRow label="Founder announcements (Pushpender / Amit)" action="notif-founder" />
    </SettingSection>
    <SettingSection title="How we notify you">
      <ToggleRow label="In-app (Activity tab)" action="notif-channel-app" />
      <ToggleRow label="Email — instant" defaultOn={false} action="notif-channel-email" />
      <ToggleRow label="Email — daily digest" action="notif-channel-digest" />
      <ToggleRow label="Email — weekly digest" defaultOn={false} action="notif-channel-weekly" />
      <ToggleRow label="WhatsApp (via eGrowthIndia.com)" defaultOn={false} action="notif-channel-whatsapp" />
    </SettingSection>
  </>
);

const FeedSettings = () => (
  <SettingSection title="Tune your feed" desc="No follow system here. Your feed is shaped by what you engage with, your skills, and your domains.">
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Your active domains</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Quality', 'ESG', 'Sustainability', 'Environment'].map(d => (
          <span key={d} className="chip chip-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {d}
            <button data-action={`feed-remove-domain-${d.toLowerCase()}`} style={{ color: 'inherit', display: 'flex' }}>
              <Icon name="x" size={11} />
            </button>
          </span>
        ))}
        <button className="chip chip-outline" data-action="feed-add-domain">+ Add domain</button>
      </div>
    </div>
    <ToggleRow label="Show jobs in my feed" action="feed-show-jobs" />
    <ToggleRow label="Show Knowledge Bytes (reels) in my feed" action="feed-show-reels" />
    <ToggleRow label="Show resource recommendations" action="feed-show-resources" />
    <ToggleRow label="Show external links (YouTube, Drive, SharePoint)" action="feed-show-external" />
    <ToggleRow label="Show founder announcements" action="feed-show-founder" />
  </SettingSection>
);

const BlockedList = () => (
  <SettingSection title="Blocked & muted" desc="Blocked members can't see your profile or interact with you. Muted members are hidden from your feed.">
    <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
      You haven't blocked or muted anyone. Good vibes 🌱
    </div>
  </SettingSection>
);

const DataExport = () => (
  <>
    <SettingSection title="Download your data" desc="Get a copy of everything you've contributed: questions, answers, resources, profile, and REPO history. Delivered as a ZIP within 24 hours.">
      <button className="btn btn-primary" data-action="data-export">
        <Icon name="download" size={14} /> Request my data archive
      </button>
    </SettingSection>
    <SettingSection title="What we have on you" desc="Transparency over everything:">
      <DataRow label="Profile data"   sub="Name, email, phone, company, designation, location" />
      <DataRow label="Activity logs"  sub="217 answers, 28 resources, 42 questions, 186 endorsements you gave" />
      <DataRow label="REPO history"   sub="3,842 REPO across 1,420 events" />
      <DataRow label="Saved items"    sub="14 posts, 9 resources" />
      <DataRow label="Quiz attempts"  sub="26 quizzes taken · 9 badges earned" />
      <DataRow label="Course enrolment (eGrowthIndia.com)" sub="2 courses · 1 certificate · shared via OAuth" />
    </SettingSection>
  </>
);

const DataRow = ({ label, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
    </div>
    <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} data-action={`data-view-${label.toLowerCase().split(' ')[0]}`}>View</button>
  </div>
);

const SafetyCenter = () => (
  <>
    <SettingSection title="Community guidelines" desc="The norms that keep eGrowth a place worth coming back to.">
      <ul style={{ paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        <li><strong>Be specific, be helpful.</strong> Answers and resources should add real value.</li>
        <li><strong>No confidential info.</strong> Never share company internals, client data, or anything under NDA.</li>
        <li><strong>Credit your sources.</strong> If you adapt someone's template, say so.</li>
        <li><strong>Disagree on substance, not on people.</strong> Personal attacks get one warning, then a ban.</li>
        <li><strong>No follow system means no popularity contest.</strong> Don't game REPO.</li>
      </ul>
      <button className="btn btn-outline" style={{ marginTop: 12 }} data-action="open-full-guidelines">Read full guidelines</button>
    </SettingSection>
    <SettingSection title="Report something serious">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }} data-action="safety-report-copyright"><Icon name="flag" size={14} /> Copyright violation (DMCA)</button>
        <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }} data-action="safety-report-confidential"><Icon name="flag" size={14} /> Leaked confidential info</button>
        <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }} data-action="safety-report-harassment"><Icon name="flag" size={14} /> Harassment or threats</button>
        <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }} data-action="safety-report-impersonation"><Icon name="flag" size={14} /> Impersonation / fake account</button>
      </div>
    </SettingSection>
    <SettingSection title="Wellbeing">
      <ToggleRow label="Take a daily limit on time spent here" sub="We'll show a gentle reminder after 60 minutes" defaultOn={false} action="wellbeing-limit" />
      <ToggleRow label="Quiet hours — pause notifications 22:00 → 07:00" action="wellbeing-quiet" />
    </SettingSection>
  </>
);

const DeactivatePanel = () => (
  <SettingSection title="Deactivate your account" desc="We're sorry to see you go. You can come back any time — your contributions stay (anonymized) so others can keep learning.">
    <div style={{ padding: 14, background: 'var(--rose-100)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--rose-600)', marginBottom: 14 }}>
      Deactivation is permanent for your profile, REPO, and saved items. Public contributions (answers, resources) stay but are attributed to "Former member".
    </div>
    <button className="btn btn-outline" style={{ color: 'var(--rose-600)', borderColor: 'var(--rose-600)' }} data-action="deactivate-account">
      Deactivate account
    </button>
  </SettingSection>
);

const SField = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
    <input
      defaultValue={value}
      style={{
        width: '100%', padding: '9px 12px',
        borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
        background: 'var(--bg-raised)', fontSize: 13, color: 'var(--text)', outline: 'none',
      }}
    />
  </div>
);

// ─── Saved Collections page ─────────────────────────────────────────────
const SAMPLE_COLLECTIONS = [
  { id: 'c1', title: 'ISO 9001 starter kit', items: 14, kind: 'mixed', covers: ['pdf', 'xls', 'doc'], color: '#1e8a8a', isPublic: true, savedBy: 248 },
  { id: 'c2', title: 'ESG reporting templates I trust', items: 22, kind: 'mixed', covers: ['xls', 'ppt', 'pdf'], color: '#4a8a5e', isPublic: true, savedBy: 134 },
  { id: 'c3', title: 'NEBOSH IGC prep — 2026 attempt', items: 18, kind: 'mixed', covers: ['pdf', 'yt', 'xls'], color: '#c2700a', isPublic: false, savedBy: 0 },
  { id: 'c4', title: 'Founder picks (Pushpender)', items: 9, kind: 'curated', covers: ['ppt', 'pdf', 'doc'], color: '#0e4040', isPublic: true, savedBy: 1820, byFounder: true },
];

const CollectionsPage = () => (
  <div style={{ maxWidth: 1080 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Saved Collections</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
          Curate the best resources, posts, and Bytes into named lists. Keep them private, or share with the community.
        </p>
      </div>
      <button className="btn btn-primary" data-action="create-collection"><Icon name="plus" size={14} /> New collection</button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18, marginTop: 22 }}>
      {SAMPLE_COLLECTIONS.map(c => (
        <div key={c.id} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{
            height: 140, background: c.color, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)' }} />
            <div style={{ display: 'flex', gap: 6, position: 'relative' }}>
              {c.covers.map((t, i) => (
                <div key={i} className={`resource-preview ft-${t}`} style={{
                  width: 50, height: 64,
                  borderRadius: 4, transform: `rotate(${(i - 1) * 6}deg)`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}>
                  <span className="filetype" style={{ fontSize: 11 }}>{t.toUpperCase()}</span>
                </div>
              ))}
            </div>
            {c.byFounder && (
              <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, padding: '2px 8px', background: 'var(--amber-500)', color: '#0e4040', fontWeight: 700, borderRadius: 999 }}>
                FOUNDER PICK
              </span>
            )}
            <span style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 10, padding: '2px 8px', background: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
              {c.isPublic ? '👁 Public' : '🔒 Private'}
            </span>
          </div>
          <div style={{ padding: 14 }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>{c.title}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {c.items} items {c.isPublic && `· ${c.savedBy.toLocaleString()} saved this`}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, {
  ReportModal, KebabMenu, WhyAmISeeingThis,
  SettingsPage, CollectionsPage,
});
