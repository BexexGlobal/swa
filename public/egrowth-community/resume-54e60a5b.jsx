// Printable, downloadable resume — opens as a fullscreen overlay

const ResumeModal = ({ user, onClose }) => {
  if (!user) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(10, 21, 19, 0.7)',
      zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '24px 24px 48px',
      overflowY: 'auto',
      backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff',
        width: '210mm',
        maxWidth: '100%',
        minHeight: '297mm',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Floating toolbar */}
        <div style={{
          position: 'sticky', top: 0,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e2e5e3',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', gap: 12,
          zIndex: 2,
        }}>
          <div style={{ fontSize: 12, color: '#576460', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="check" size={13} style={{ color: '#2d5a3d' }} />
            All claims auto-verified by your community activity
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 13 }}>
            <Icon name="edit" size={13} /> Customize
          </button>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 13 }}>
            <Icon name="download" size={13} /> Download PDF
          </button>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>

        <ResumeBody user={user} />
      </div>
    </div>
  );
};

const ResumeBody = ({ user }) => {
  const tier = getTier(user.reputation);
  return (
    <div style={{
      padding: '40px 48px',
      color: '#1a211f',
      fontFamily: "'Inter', 'Instrument Sans', system-ui, sans-serif",
      fontSize: 11,
      lineHeight: 1.5,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, paddingBottom: 20, borderBottom: '2px solid #0e4040' }}>
        <div style={{
          width: 84, height: 84, borderRadius: '50%',
          background: user.color,
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 30,
          flexShrink: 0,
        }}>{user.initials}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 26, fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#0a2e2e', margin: 0, lineHeight: 1.1 }}>
            {user.name}
          </h1>
          <div style={{ fontSize: 13, color: '#3d4642', marginTop: 4, fontWeight: 500 }}>
            {user.title}
          </div>
          <div style={{ fontSize: 11, color: '#576460', marginTop: 10, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <span>📍 {user.location}</span>
            <span>✉ ananya.r@example.com</span>
            <span>📱 +91 98480 12345</span>
            <span>🔗 egrowth.in/u/{user.handle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <span style={{ padding: '3px 10px', background: '#fbe8a6', color: '#7d5a0a', borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {tier.roman} · {tier.label}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 4, background: '#0e4040', color: '#f7bf6e', fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}>
              <span style={{ width: 12, height: 12, background: '#f0a23c', color: '#0e4040', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800 }}>R</span>
              {user.reputation.toLocaleString()} REPO
            </span>
            <span style={{ fontSize: 10, color: '#576460' }}>Verified by 48,219 eGrowth members</span>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28, marginTop: 24 }}>
        {/* LEFT */}
        <div>
          <Section title="Profile Summary">
            <p style={{ margin: 0, color: '#3d4642' }}>
              ISO 9001 Lead Auditor with 8+ years across automotive, medical device, and consumer goods sectors. Trusted contributor in the eGrowth community with 217 expert answers and 28 widely-adopted resources. Specialized in audit program design, OFI/NC categorization, and APQP/PPAP rollouts. Currently expanding into ESG reporting (GRI &amp; BRSR).
            </p>
          </Section>

          <Section title="Experience">
            <ResumeJob
              role="Quality Systems Consultant" company="Independent" period="2022 — Present"
              bullets={[
                ['Conducted 40+ ISO 9001 internal audits across automotive &amp; medical device sectors', 'eGrowth: 14 audit answers, 9 resources'],
                ['Built audit question banks adopted by community members worldwide', '942 downloads of "ISO 9001 Audit Question Bank"'],
                ['Trained junior auditors on OFI/NC categorization', '142 endorsements for ISO 9001 skill'],
              ]}
            />
            <ResumeJob
              role="Senior Quality Engineer" company="Tata Consumer Products" period="2018 — 2022"
              bullets={[
                ['Led APQP/PPAP rollouts across 4 plants', '5 APQP templates · 64 endorsements'],
                ['Implemented FMEA program reducing escapes by 38%', '12 RCA/FMEA-related answers'],
              ]}
            />
            <ResumeJob
              role="Quality Engineer" company="Bosch India" period="2015 — 2018"
              bullets={[['Six Sigma Green Belt — Yield improvement projects', '54 endorsements for Six Sigma']]}
            />
          </Section>

          <Section title="Education">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>B.E. Industrial &amp; Production Engineering</div>
                <div style={{ color: '#576460' }}>R.V. College of Engineering, Bengaluru</div>
              </div>
              <div style={{ fontFamily: 'monospace', color: '#576460' }}>2011 — 2015</div>
            </div>
          </Section>
        </div>

        {/* RIGHT */}
        <div>
          <Section title="REPO Score">
            <div style={{ padding: 12, background: '#f1f8f8', borderRadius: 6 }}>
              <div style={{ fontSize: 22, fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#0e4040' }}>
                {user.reputation.toLocaleString()}
              </div>
              <div style={{ fontSize: 10, color: '#576460', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                {tier.label} · Top 4% of community
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10, fontSize: 10 }}>
              <Tally l="Answers" v={user.contributions.answers} />
              <Tally l="Resources shared" v={user.contributions.resources} />
              <Tally l="Endorsements" v={user.contributions.endorsements} />
              <Tally l="Quizzes passed" v={26} />
              <Tally l="Badges" v={9} />
            </div>
          </Section>

          <Section title="Verified Skills">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {user.skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontWeight: 600, fontSize: 10 }}>{s.name}</span>
                    <span style={{ fontSize: 9, color: '#576460', fontFamily: 'monospace' }}>{s.endorsements} endorsed</span>
                  </div>
                  <div style={{ height: 4, background: '#e2e5e3', borderRadius: 2 }}>
                    <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, #176e6e, #3eaaaa)', borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Certifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CertItem name="CQI/IRCA Lead Auditor — ISO 9001" issuer="Pushpender Sharma · eGrowth" year="2024" />
              <CertItem name="Six Sigma Green Belt" issuer="Bosch Internal" year="2017" />
              <CertItem name="ISO 14001 Awareness" issuer="eGrowth Learning Hub" year="2024" />
            </div>
          </Section>

          <Section title="Languages">
            <div style={{ fontSize: 10, color: '#3d4642' }}>English (Fluent) · Hindi (Native) · Tamil (Conversational)</div>
          </Section>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 36, paddingTop: 12, borderTop: '1px solid #e2e5e3', display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#788380' }}>
        <span>Generated from eGrowth Community profile · Verified by 48K+ peers · egrowth.in/u/{user.handle}</span>
        <span style={{ fontFamily: 'monospace' }}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 22 }}>
    <h3 style={{
      fontSize: 11, fontFamily: 'Sora, sans-serif', fontWeight: 700,
      color: '#0e4040', textTransform: 'uppercase', letterSpacing: '0.1em',
      paddingBottom: 5, marginBottom: 12,
      borderBottom: '1px solid #c8cecb',
    }}>{title}</h3>
    {children}
  </div>
);

const ResumeJob = ({ role, company, period, bullets }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 12 }}>{role}</div>
        <div style={{ color: '#176e6e', fontSize: 11, fontWeight: 600 }}>{company}</div>
      </div>
      <div style={{ fontSize: 10, color: '#576460', fontFamily: 'monospace' }}>{period}</div>
    </div>
    <ul style={{ paddingLeft: 14, margin: '6px 0 0' }}>
      {bullets.map(([b, evidence], i) => (
        <li key={i} style={{ marginBottom: 4, color: '#3d4642' }}>
          <span dangerouslySetInnerHTML={{ __html: b }} />
          <div style={{ fontSize: 9, color: '#176e6e', fontStyle: 'italic', marginTop: 1 }}>↳ Evidence: {evidence}</div>
        </li>
      ))}
    </ul>
  </div>
);

const Tally = ({ l, v }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: '#576460' }}>{l}</span>
    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{v}</span>
  </div>
);

const CertItem = ({ name, issuer, year }) => (
  <div style={{ fontSize: 10 }}>
    <div style={{ fontWeight: 600 }}>{name}</div>
    <div style={{ color: '#576460', display: 'flex', justifyContent: 'space-between' }}>
      <span>{issuer}</span>
      <span style={{ fontFamily: 'monospace' }}>{year}</span>
    </div>
  </div>
);

Object.assign(window, { ResumeModal });
