// Login / Signup — multi-step onboarding

const AuthPage = ({ mode = 'signup', onLogin }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    firstName: 'Ananya', lastName: 'Ramaswamy',
    email: 'ananya.r@example.com', phone: '+91 98480 12345',
    country: 'India', city: 'Bengaluru',
    company: 'Independent', designation: 'ISO 9001 Lead Auditor',
    experience: '8',
    domains: ['quality', 'esg'],
    interests: ['iso-9001', 'iso-14001', 'audit'],
    password: '', confirm: '',
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggle = (k, v) => setData(d => ({ ...d, [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v] }));

  const TOTAL = mode === 'signup' ? 4 : 1;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 480px',
      background: 'var(--bg)',
    }}>
      {/* LEFT — brand panel */}
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 60%, var(--amber-600) 130%)',
        color: '#fff',
        padding: 48,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -120, top: -120, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.4 }} />
        <div style={{ position: 'absolute', left: -60, bottom: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, var(--brand-300), transparent 60%)', opacity: 0.18 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56, position: 'relative' }}>
          <div className="logo-mark" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--amber-300)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 14 L9 19 L20 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#fff' }}>e<span style={{ color: 'var(--brand-300)' }}>Growth</span></div>
          <div style={{ fontSize: 11, padding: '2px 8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontWeight: 600 }}>.in</div>
        </div>

        <div style={{ position: 'relative', maxWidth: 480 }}>
          <h1 style={{ fontSize: 42, color: '#fff', lineHeight: 1.1, fontWeight: 700, marginBottom: 18 }}>
            The world's largest community of QEHS &amp; ESG professionals.
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.55 }}>
            Free forever. No follow system. Just real practitioners sharing real knowledge — and earning <strong>REPO points</strong> along the way.
          </p>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, position: 'relative', maxWidth: 480 }}>
          <BrandStat n="48K+" l="Members worldwide" />
          <BrandStat n="4,200+" l="Free resources" />
          <BrandStat n="186" l="Open jobs" />
          <BrandStat n="108" l="Free quizzes" />
        </div>

        <div style={{ marginTop: 36, fontSize: 12, opacity: 0.6, position: 'relative' }}>
          Powered by eGrowthIndia.com · Built by practitioners, for practitioners.
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, marginBottom: 32 }}>
          <span style={{ color: 'var(--text-dim)' }}>
            {mode === 'signup' ? 'Already a member?' : "New here?"}{' '}
            <a href="#" style={{ fontWeight: 600 }}>{mode === 'signup' ? 'Sign in' : 'Create account'}</a>
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, marginBottom: 6 }}>
            {mode === 'signup' ? (step === 1 ? 'Create your account' : step === 2 ? 'Tell us about you' : step === 3 ? 'Your expertise' : 'Almost done!') : 'Welcome back'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 28px' }}>
            {mode === 'signup'
              ? (step === 1 ? 'Free forever. No credit card. No spam.' : step === 2 ? 'Helps us recommend the right people, jobs, and resources.' : step === 3 ? 'We auto-endorse skills based on your activity here.' : 'Choose your password and join the community.')
              : 'Sign in to keep your streak going.'}
          </p>

          {/* Stepper */}
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i + 1 <= step ? 'var(--brand-600)' : 'var(--ink-150)',
                  transition: 'background 0.2s',
                }} />
              ))}
            </div>
          )}

          {/* Step content */}
          {mode === 'signup' && step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Row>
                <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} />
                <Field label="Last name" value={data.lastName} onChange={v => set('lastName', v)} />
              </Row>
              <Field label="Work email" type="email" value={data.email} onChange={v => set('email', v)} hint="We'll use this for sign-in." />
              <Field label="Mobile (with country code)" value={data.phone} onChange={v => set('phone', v)} hint="Optional — useful for WhatsApp updates." />
              <Row>
                <Field label="Country" value={data.country} onChange={v => set('country', v)} />
                <Field label="City" value={data.city} onChange={v => set('city', v)} />
              </Row>
            </div>
          )}

          {mode === 'signup' && step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Company / Organization" value={data.company} onChange={v => set('company', v)} hint="Type 'Independent' if you're a consultant." />
              <Field label="Designation / Title" value={data.designation} onChange={v => set('designation', v)} />
              <Field label="Years of QEHS / ESG experience" value={data.experience} onChange={v => set('experience', v)} suffix="years" />
            </div>
          )}

          {mode === 'signup' && step === 3 && (
            <div>
              <Label>Pick your domains <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(2-4 recommended)</span></Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10, marginBottom: 22 }}>
                {['quality', 'environment', 'health', 'safety', 'energy', 'sustainability', 'esg'].map(d => {
                  const on = data.domains.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggle('domains', d)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 999,
                        background: on ? 'var(--brand-700)' : 'var(--bg-raised)',
                        color: on ? '#fff' : 'var(--text-muted)',
                        border: `1px solid ${on ? 'var(--brand-700)' : 'var(--border)'}`,
                        fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {on && <span style={{ marginRight: 4 }}>✓</span>}{d}
                    </button>
                  );
                })}
              </div>

              <Label>Topics you want to follow</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {['iso-9001', 'iso-14001', 'iso-45001', 'iso-50001', 'nebosh', 'gri', 'esrs', 'brsr', 'audit', 'rca', 'hazop', 'six-sigma', 'lopa', 'scope-3'].map(t => {
                  const on = data.interests.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggle('interests', t)}
                      className="chip"
                      style={{
                        cursor: 'pointer',
                        background: on ? 'var(--brand-100)' : 'var(--bg-raised)',
                        color: on ? 'var(--brand-800)' : 'var(--text-muted)',
                        border: `1px solid ${on ? 'var(--brand-300)' : 'var(--border)'}`,
                        padding: '4px 10px',
                        fontSize: 12, fontWeight: 600,
                      }}
                    >
                      #{t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {mode === 'signup' && step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Password" type="password" value={data.password} onChange={v => set('password', v)} hint="At least 10 characters." />
              <Field label="Confirm password" type="password" value={data.confirm} onChange={v => set('confirm', v)} />

              {/* Welcome reward */}
              <div style={{ marginTop: 10, padding: 18, background: 'linear-gradient(135deg, var(--brand-50), var(--amber-50))', borderRadius: 'var(--r-md)', border: '1px solid var(--brand-200)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 32 }}>🎁</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>You'll start with <Reputation points={100} /></div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    Plus the Welcome badge, and a 7-day streak head-start.
                  </div>
                </div>
              </div>

              <label style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-muted)', alignItems: 'flex-start', marginTop: 6 }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
                <span>I agree to eGrowth's <a href="#">Community Guidelines</a> and <a href="#">Privacy Policy</a>. Knowledge shared here is CC-BY-SA by default.</span>
              </label>
              <label style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-muted)', alignItems: 'flex-start' }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
                <span>Send me weekly digest emails (best Q&amp;A + new free resources).</span>
              </label>
            </div>
          )}

          {mode === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Work email" type="email" value={data.email} onChange={v => set('email', v)} />
              <Field label="Password" type="password" value={data.password} onChange={v => set('password', v)} />
              <a href="#" style={{ fontSize: 13, marginTop: -6, marginLeft: 'auto' }}>Forgot password?</a>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            {step > 1 && mode === 'signup' && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>
            )}
            <div style={{ flex: 1 }} />
            {mode === 'signup' && step < TOTAL && (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Continue <Icon name="arrow" size={14} />
              </button>
            )}
            {((mode === 'signup' && step === TOTAL) || mode === 'login') && (
              <button className="btn btn-primary" onClick={onLogin} style={{ padding: '10px 18px' }}>
                {mode === 'signup' ? 'Join eGrowth · Free' : 'Sign in'}
              </button>
            )}
          </div>

          {/* SSO */}
          {mode === 'login' || (mode === 'signup' && step === 1) ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                Or continue with
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <SSOBtn label="Google" />
                <SSOBtn label="LinkedIn" />
                <SSOBtn label="Microsoft" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Row = ({ children }) => <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>;

const Label = ({ children }) => <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{children}</div>;

const Field = ({ label, value, onChange, type = 'text', hint, suffix }) => (
  <div>
    <Label>{label}</Label>
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '11px 14px',
          paddingRight: suffix ? 70 : 14,
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--border)',
          background: 'var(--bg-raised)',
          fontSize: 14,
          outline: 'none',
          color: 'var(--text)',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--brand-500)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
      {suffix && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--text-dim)' }}>{suffix}</span>}
    </div>
    {hint && <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{hint}</div>}
  </div>
);

const SSOBtn = ({ label }) => (
  <button className="btn btn-outline" style={{ justifyContent: 'center', padding: '9px 12px', fontSize: 13 }}>
    {label}
  </button>
);

const BrandStat = ({ n, l }) => (
  <div style={{ padding: 14, borderRadius: 'var(--r-md)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
    <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{n}</div>
    <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{l}</div>
  </div>
);

Object.assign(window, { AuthPage });
