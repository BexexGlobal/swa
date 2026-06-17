// Learn / LMS — Courses, certificates, my learning

const LearnPageV2 = ({ onNavigate }) => {
  const [tab, setTab] = React.useState('catalog');
  const founder = USER_MAP['u8'];
  const ceo = USER_MAP['u9'];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 50%, var(--amber-600) 130%)',
        color: '#fff', borderRadius: 'var(--r-lg)',
        padding: 36, marginBottom: 24,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.4 }} />
        <div style={{ position: 'absolute', right: 60, bottom: 30, fontSize: 11, opacity: 0.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          POWERED BY eGrowthIndia.com →
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18, position: 'relative' }}>
          <Icon name="award" size={12} /> Certificate programs · live cohorts · self-paced
        </div>
        <h1 style={{ fontSize: 32, lineHeight: 1.15, color: '#fff', maxWidth: 620, position: 'relative' }}>
          The eGrowth Learning Hub
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 620, marginTop: 12, position: 'relative' }}>
          Industry-recognized certifications in Quality, Safety, ESG and Energy — built and delivered by the founders. Courses sync directly with eGrowthIndia.com — your progress, your certificates, one identity.
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 13, position: 'relative' }}>
          <Stat n="14,200+" l="Learners" />
          <Stat n="48" l="Courses" />
          <Stat n="92%" l="Pass rate (NEBOSH)" />
          <Stat n="9" l="Certifications" />
        </div>
      </div>

      {/* Founders */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <FounderTile user={founder} role="Founder · QEHS Trainer · Author" stats="38.4K rep · 24 courses · Author of 3 books" />
        <FounderTile user={ceo} role="Co-Founder & CEO" stats="24.6K rep · Strategy, partnerships, eGrowthIndia.com" />
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          { id: 'catalog', label: 'Course catalog' },
          { id: 'mylearning', label: 'My learning', count: MY_LEARNING.length },
          { id: 'live', label: 'Live & upcoming' },
          { id: 'certs', label: 'My certificates', count: MY_CERTS.length },
          { id: 'paths', label: 'Career paths' },
        ].map(t => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.count != null && <span style={{ marginLeft: 6, fontSize: 11, padding: '1px 6px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 10 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === 'catalog' && <CourseCatalog />}
      {tab === 'mylearning' && <MyLearning />}
      {tab === 'live' && <UpcomingEvents />}
      {tab === 'certs' && <MyCertificates />}
      {tab === 'paths' && <CareerPaths />}
    </div>
  );
};

const Stat = ({ n, l }) => (
  <div>
    <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
    <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{l}</div>
  </div>
);

const FounderTile = ({ user, role, stats }) => (
  <div className="card" style={{ padding: 18, flex: 1, display: 'flex', gap: 14, alignItems: 'center' }}>
    <Avatar user={user} size={56} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{user.name}</div>
      <div style={{ fontSize: 12, color: 'var(--brand-700)', fontWeight: 500, marginTop: 2 }}>{role}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{stats}</div>
    </div>
    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}>Follow</button>
  </div>
);

const CourseCatalog = () => (
  <>
    <div style={{ marginBottom: 16 }}>
      <DisclaimerBanner variant="payment" />
    </div>
    <div style={{ display: 'flex', gap: 8, margin: '0 0 18px', flexWrap: 'wrap' }}>
      {['All courses', 'Quality', 'Safety', 'ESG', 'Environment', 'Energy', 'Live cohort', 'Self-paced'].map((f, i) => (
        <button key={f} className="chip" style={{ cursor: 'pointer', background: i === 0 ? 'var(--brand-800)' : 'var(--ink-100)', color: i === 0 ? '#fff' : 'var(--text-muted)', padding: '6px 14px', fontWeight: 600, fontSize: 13 }}>
          {f}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <select style={{ padding: '7px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-raised)', fontSize: 13, color: 'var(--text)' }}>
        <option>Most enrolled</option>
        <option>Highest rated</option>
        <option>Newest</option>
        <option>Starting soon</option>
      </select>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
      {COURSES.map(c => <CourseCard key={c.id} course={c} />)}
    </div>
  </>
);

const CourseCard = ({ course }) => {
  const inst = USER_MAP[course.instructor];
  return (
    <div className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Thumbnail */}
      <div style={{
        height: 140,
        background: course.thumb,
        position: 'relative',
        padding: 18,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        color: '#fff',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 60%)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <span style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {course.level}
          </span>
          {course.certificate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600 }}>
              <Icon name="award" size={11} /> Certificate
            </span>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, opacity: 0.85, fontFamily: 'var(--font-mono)' }}>
            <span>{course.modules} modules</span>
            <span>·</span>
            <span>{course.lessons} lessons</span>
            <span>·</span>
            <span>{course.duration}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: 16, lineHeight: 1.3, marginBottom: 8 }}>{course.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.desc}
        </p>

        <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
          {course.badges.map(b => (
            <span key={b} className="chip" style={{ background: 'var(--brand-50)', color: 'var(--brand-800)', padding: '2px 8px', fontSize: 10 }}>{b}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
          <Avatar user={inst} size={26} />
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{inst.name}</span>
          {inst.isFounder && <span style={{ background: 'var(--amber-100)', color: 'var(--amber-600)', padding: '1px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>FOUNDER</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="star" size={12} style={{ color: 'var(--amber-500)' }} />
            <span className="mono" style={{ fontWeight: 600, color: 'var(--text)' }}>{course.rating}</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="users" size={12} />
            <span className="mono">{course.enrolled.toLocaleString()}</span>
          </span>
          <div style={{ flex: 1 }} />
          {course.spots && <span style={{ color: 'var(--rose-600)', fontWeight: 600, fontSize: 11 }}>{course.spots}</span>}
        </div>

        {course.cohort && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="clock" size={13} style={{ color: 'var(--brand-600)' }} />
            {course.cohort}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <div>
            <span className="mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-800)' }}>{course.price}</span>
            {course.original && <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'line-through', marginLeft: 6 }}>{course.original}</span>}
            <div style={{ marginTop: 4 }}><HandoffPill to=".com" /></div>
          </div>
          <button className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }} data-action={`enroll-course-${course.id}`}>
            Enroll <Icon name="arrow" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MyLearning = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    {MY_LEARNING.map(l => {
      const c = COURSES.find(x => x.id === l.courseId);
      const inst = USER_MAP[c.instructor];
      return (
        <div key={l.courseId} className="card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ width: 84, height: 84, borderRadius: 'var(--r-md)', background: c.thumb, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>{c.title}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Instructor: {inst.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>↳ {l.lastLesson}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="skill-bar"><div className="skill-fill" style={{ width: `${l.progress}%` }} /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
                  <span className="mono">{l.progress}% complete</span>
                  {l.nextLive && <span style={{ color: 'var(--amber-600)', fontWeight: 600 }}>Live class: {l.nextLive}</span>}
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary">Resume</button>
        </div>
      );
    })}

    <div className="card" style={{ padding: 22, background: 'var(--brand-50)', borderColor: 'var(--brand-200)', textAlign: 'center' }}>
      <Icon name="book" size={28} style={{ color: 'var(--brand-700)', marginBottom: 8 }} />
      <h3 style={{ fontSize: 15, marginBottom: 4 }}>Browse the full catalog</h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px' }}>48 courses across QEHS &amp; ESG, with new ones every month.</p>
      <button className="btn btn-primary">Browse courses</button>
    </div>
  </div>
);

const UpcomingEvents = () => (
  <div>
    <AMASection />
    <h3 style={{ fontSize: 16, marginBottom: 14 }}>Webinars &amp; book launches</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
    {EVENTS.map(e => (
      <div key={e.id} className="card" style={{ padding: 22 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'var(--brand-100)', color: 'var(--brand-800)', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
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

const MyCertificates = () => {
  const [viewing, setViewing] = React.useState(null);
  return (
    <div>
      <DisclaimerBanner variant="payment" />
      <div style={{ height: 16 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 18 }}>
        {[
          { id: 'eG-IA-2026-04823', course: 'ISO 14001:2015 & ISO 45001:2018 Internal Auditor', issued: 'Apr 2026', verified: true, orientation: 'portrait' },
          { id: 'eG-SS-2024-01290', course: 'Six Sigma White Belt',  issued: 'Nov 2024', verified: true, orientation: 'landscape' },
          { id: 'eG-9K-2024-00832', course: 'ISO 9001:2015 Awareness', issued: 'Aug 2024', verified: true, orientation: 'portrait' },
        ].map(c => (
          <div key={c.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setViewing({ ...SAMPLE_CERTS_DATA, course: c.course.toUpperCase(), certNumber: c.id, issueDate: c.issued, _orientation: c.orientation })}>
            <div style={{
              background: '#fff', padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <EGrowthLogo />
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 10, padding: '2px 7px', background: c.orientation === 'portrait' ? 'var(--brand-100)' : 'var(--moss-100)', color: c.orientation === 'portrait' ? 'var(--brand-800)' : 'var(--moss-700)', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>
                {c.orientation}
              </span>
            </div>
            {/* Mini preview */}
            <div style={{
              background: 'linear-gradient(180deg, #fff 0%, #f1f8f8 100%)',
              padding: 28, textAlign: 'center',
              fontFamily: 'Georgia, serif',
              position: 'relative', minHeight: 180,
            }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--brand-700)', marginBottom: 8 }}>
                Certificate of Completion
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>This certifies that</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#3a52a0', letterSpacing: '0.18em', fontFamily: 'Sora, sans-serif' }}>ANANYA RAMASWAMY</div>
              <div style={{ height: 2, width: 220, background: '#c2a45a', margin: '8px auto' }} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>has successfully completed</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-800)', marginTop: 6 }}>{c.course}</div>
            </div>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
              {c.verified ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--moss-700)', fontSize: 12, fontWeight: 600 }}>
                  <Icon name="check" size={14} /> Blockchain-verified
                </span>
              ) : <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Pending verification</span>}
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} onClick={(e) => { e.stopPropagation(); }} data-action={`cert-share-${c.id}`}>
                  <Icon name="share" size={12} /> Share
                </button>
                <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 12 }} data-action={`cert-view-${c.id}`}>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CertificateViewer open={!!viewing} onClose={() => setViewing(null)} data={viewing} defaultOrientation={viewing?._orientation || 'portrait'} />
    </div>
  );
};

const CareerPaths = () => {
  const PATHS = [
    { id: 'p1', title: 'Quality Auditor Track', from: 'Quality Engineer', to: 'Lead Auditor', courses: 4, weeks: 22, icon: '◆', color: 'var(--brand-100)', accent: 'var(--brand-700)' },
    { id: 'p2', title: 'ESG Reporting Specialist',  from: 'Compliance Analyst', to: 'Head of Sustainability', courses: 5, weeks: 28, icon: '🌱', color: 'var(--moss-100)', accent: 'var(--moss-700)' },
    { id: 'p3', title: 'HSE Manager Track', from: 'Safety Officer', to: 'HSE Manager', courses: 6, weeks: 34, icon: '⚡', color: 'var(--amber-100)', accent: 'var(--amber-600)' },
    { id: 'p4', title: 'Energy Manager Track', from: 'Junior Engineer', to: 'BEE Energy Auditor', courses: 3, weeks: 18, icon: '◇', color: 'var(--ink-150)', accent: 'var(--brand-700)' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {PATHS.map(p => (
        <div key={p.id} className="card card-hover" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-md)',
            background: p.color, color: p.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>{p.icon}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>{p.title}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text-dim)' }}>{p.from}</span>
              <Icon name="arrow" size={11} style={{ verticalAlign: 'middle', margin: '0 6px', color: 'var(--text-dim)' }} />
              <strong style={{ color: 'var(--brand-700)' }}>{p.to}</strong>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>{p.courses} courses · {p.weeks} weeks · Certificate at end</div>
          </div>
          <Icon name="chevronRight" size={18} style={{ color: 'var(--text-dim)' }} />
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { LearnPageV2 });
