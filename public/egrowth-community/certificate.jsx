// Certificate templates — portrait + landscape (mirrors the supplied design)

// Sample certificate data
const SAMPLE_CERTS_DATA = {
  recipient: 'Ananya Ramaswamy',
  course: 'INTERNAL AUDITOR\u2019S TRAINING COURSE',
  topics: [
    'Terminology of ISO 14001:2015 & ISO 45001:2018',
    'ISO 14001:2015 & ISO 45001:2018 Standards Interpretation',
    'Auditing Methodology as per ISO 19011:2018',
    'Auditing Processes — Planning, Execution, Reporting, & Close Out',
  ],
  certNumber: 'eG-IA-2026-04823',
  courseDate: '15.04.2026',
  issueDate: '22.04.2026',
  duration: '32 Hrs',
  locationLine1: 'eGrowth Hub, New Delhi',
  locationLine2: 'Live Online + 2-day workshop',
  director1: 'Pushpender Sharma',
  director2: 'Amit Singh',
};

// ── Reusable decorative pieces ──────────────────────────────────────────
const DotsPattern = ({ rows = 8, cols = 4, color = '#0096FF' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 8px)`, gap: 12 }}>
    {Array.from({ length: rows * cols }).map((_, i) => (
      <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: color }} />
    ))}
  </div>
);

const CornerCirclesTL = () => (
  <svg width="220" height="160" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
    <circle cx="-20" cy="40" r="80" fill="#bce5e5" />
    <circle cx="120" cy="-10" r="40" fill="#cfe7f5" />
    <circle cx="60" cy="130" r="22" fill="#4ec0d5" />
  </svg>
);

const CornerCirclesBR = ({ height = '36%' }) => (
  <svg viewBox="0 0 900 320" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height, pointerEvents: 'none' }}>
    <defs>
      <linearGradient id="waveg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4abfb3" />
        <stop offset="100%" stopColor="#3979c4" />
      </linearGradient>
    </defs>
    <path d="M0,160 C150,80 320,260 520,200 C700,150 800,250 900,200 L900,320 L0,320 Z" fill="url(#waveg)" />
    <circle cx="820" cy="120" r="80" fill="#4abfb3" opacity="0.6" />
    <circle cx="560" cy="150" r="14" fill="#3979c4" opacity="0.6" />
  </svg>
);

const RoundSeal = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 110 110">
    <defs>
      <path id="sealcircle" d="M 55,55 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
    </defs>
    <circle cx="55" cy="55" r="50" fill="none" stroke="#3a52a0" strokeWidth="1.2" />
    <circle cx="55" cy="55" r="44" fill="none" stroke="#3a52a0" strokeWidth="0.8" />
    <circle cx="55" cy="55" r="28" fill="none" stroke="#3a52a0" strokeWidth="0.6" />
    <text fontSize="6.2" fill="#3a52a0" fontFamily="serif" letterSpacing="0.5">
      <textPath href="#sealcircle" startOffset="0%">eGrowth Training and Consultancy Services ★ </textPath>
    </text>
    <text x="55" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3a52a0" fontFamily="serif">New</text>
    <text x="55" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3a52a0" fontFamily="serif">Delhi</text>
    <text x="55" y="74" textAnchor="middle" fontSize="6" fill="#3a52a0" fontFamily="serif" letterSpacing="2">SEAL</text>
  </svg>
);

const QRMock = ({ size = 90 }) => {
  // Visually-plausible QR
  const cells = 13;
  const cellSize = size / cells;
  const pattern = [
    '1111111010111111111',
    '1000001010000000001',
    '1011101011101111101',
    '1011101001101010101',
    '1011101010001110101',
    '1000001000110000001',
    '1111111010111111111',
    '0000000010100000000',
    '1010110110011010110',
    '0110010001001011001',
    '1011101100011010011',
    '0001000110100010110',
    '1110011010011110100',
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: '#fff' }}>
      {pattern.slice(0, cells).map((row, y) => [...row].slice(0, cells).map((c, x) => c === '1' && (
        <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="#000" />
      )))}
      {/* Corner finders — fix shape */}
      {[[0,0],[cells-7,0],[0,cells-7]].map(([fx,fy], i) => (
        <g key={i}>
          <rect x={fx*cellSize} y={fy*cellSize} width={cellSize*7} height={cellSize*7} fill="none" stroke="#000" strokeWidth={cellSize} />
          <rect x={(fx+2)*cellSize} y={(fy+2)*cellSize} width={cellSize*3} height={cellSize*3} fill="#000" />
        </g>
      ))}
      {/* eGrowth logo bug center */}
      <rect x={size/2 - 9} y={size/2 - 9} width="18" height="18" fill="#fff" />
      <text x={size/2} y={size/2 + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#FF9300" fontFamily="sans-serif">eG</text>
    </svg>
  );
};

const EGrowthLogo = ({ size = 'normal' }) => {
  const s = size === 'large' ? 1.25 : 1;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={28 * s} height={26 * s} viewBox="0 0 28 26">
        {/* Bar chart */}
        <rect x="2" y="14" width="4" height="10" fill="#4abfb3"/>
        <rect x="8" y="8" width="4" height="16" fill="#3a52a0"/>
        <rect x="14" y="4" width="4" height="20" fill="#FF9300"/>
        {/* Trend arrow */}
        <path d="M2 14 L8 8 L14 4 L20 2" stroke="#FF9300" strokeWidth="1.5" fill="none" />
        <polygon points="20,2 24,2 22,6" fill="#FF9300"/>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 18 * s, color: '#3a52a0', letterSpacing: '-0.01em' }}>
          eGrowth
        </div>
        <div style={{ fontFamily: 'serif', fontSize: 8 * s, color: '#576460', letterSpacing: '0.1em', marginTop: 2 }}>
          Training and Consultancy Services
        </div>
        <div style={{ fontFamily: 'serif', fontSize: 7 * s, color: '#3979c4', letterSpacing: '0.15em', marginTop: 1, fontStyle: 'italic' }}>
          Consult. Train. Audit. Grow.
        </div>
      </div>
    </div>
  );
};

// ── PORTRAIT certificate ────────────────────────────────────────────────
const CertificatePortrait = ({ data = SAMPLE_CERTS_DATA, scale = 1 }) => (
  <div style={{
    width: 800 * scale, height: 1130 * scale,
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#1a211f',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    transform: scale !== 1 ? `scale(${scale})` : 'none',
    transformOrigin: 'top left',
  }}>
    {/* Decorations */}
    <CornerCirclesTL />
    <div style={{ position: 'absolute', top: 30, right: 28 }}><DotsPattern rows={8} cols={4} color="#3a52a0" /></div>
    <div style={{ position: 'absolute', bottom: 200, left: 28 }}><DotsPattern rows={6} cols={4} color="#3a52a0" /></div>
    <CornerCirclesBR height="22%" />

    {/* Logo */}
    <div style={{ position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <EGrowthLogo />
    </div>

    {/* Title */}
    <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontFamily: '"UnifrakturCook", "Old English Text MT", "Cinzel", Georgia, serif', fontSize: 88, color: '#1a1a1a', lineHeight: 1, letterSpacing: '0.01em' }}>
        Certi<span style={{ fontStyle: 'italic' }}>ficate</span>
      </div>
      <div style={{ fontVariant: 'small-caps', fontSize: 22, fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.18em', marginTop: 12 }}>
        Of Completion
      </div>
    </div>

    {/* Body */}
    <div style={{ position: 'absolute', top: 340, left: 80, right: 80, textAlign: 'center' }}>
      <div style={{ fontSize: 18, color: '#3d4642' }}>This certifies that</div>
      <h1 style={{
        fontSize: 44, fontWeight: 700,
        color: '#3a52a0', letterSpacing: '0.18em',
        margin: '14px 0 0', fontFamily: 'Sora, sans-serif',
      }}>{data.recipient.toUpperCase()}</h1>
      <div style={{
        height: 2, width: 360, background: '#c2a45a',
        margin: '12px auto 0', borderRadius: 1,
      }} />
      <div style={{ fontSize: 17, color: '#3d4642', marginTop: 18 }}>
        has been awarded a certificate of successful completion in
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a211f', margin: '14px 0 0', letterSpacing: '0.02em' }}>
        {data.course}
      </h2>
      <div style={{ fontSize: 16, color: '#3d4642', marginTop: 14 }}>
        by demonstrating proficiency in the following topics:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 32px', marginTop: 16, textAlign: 'left', fontSize: 13, color: '#3d4642', lineHeight: 1.5, padding: '0 30px' }}>
        {data.topics.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: '#3a52a0', flexShrink: 0 }}>•</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Seal + signatures */}
    <div style={{ position: 'absolute', top: 740, left: 80, right: 80, display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 40, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}><RoundSeal size={110} /></div>
      <SigBlock name={data.director1} />
      <SigBlock name={data.director2} />
    </div>

    {/* Bottom info grid */}
    <div style={{ position: 'absolute', top: 900, left: 80, right: 220, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 24px', fontSize: 11, color: '#3a52a0', letterSpacing: '0.12em', fontFamily: 'serif' }}>
      <InfoCell label="Certificate Number" value={data.certNumber} />
      <InfoCell label="Course Date" value={data.courseDate} />
      <InfoCell label="Course Location" value={`${data.locationLine1} · ${data.locationLine2}`} />
      <InfoCell label="Course Duration" value={data.duration} />
      <InfoCell label="Issue Date" value={data.issueDate} />
    </div>

    {/* QR code */}
    <div style={{ position: 'absolute', top: 900, right: 80 }}>
      <QRMock size={100} />
      <div style={{ fontSize: 8, color: '#576460', writingMode: 'vertical-rl', position: 'absolute', right: -16, top: 10, letterSpacing: '0.05em' }}>
        eGrowthIndia.com/verify
      </div>
    </div>

    {/* Footer text on wave */}
    <div style={{ position: 'absolute', bottom: 24, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#fff', fontSize: 10, zIndex: 2 }}>
      <div style={{ maxWidth: 520, lineHeight: 1.5, fontFamily: 'serif' }}>
        The course meets the formal training requirements of the accredited program and aligns with the International Society of Quality's body of knowledge. The certificate's authenticity can be verified via our website or by scanning the QR code provided.
      </div>
      <div style={{ textAlign: 'right', fontWeight: 600 }}>
        <div style={{ textDecoration: 'underline' }}>www.eGrowthIndia.com</div>
        <div style={{ marginTop: 2 }}>info@eGrowthIndia.com</div>
      </div>
    </div>
  </div>
);

// ── LANDSCAPE certificate ───────────────────────────────────────────────
const CertificateLandscape = ({ data = SAMPLE_CERTS_DATA, scale = 1 }) => (
  <div style={{
    width: 1130 * scale, height: 800 * scale,
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#1a211f',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    transform: scale !== 1 ? `scale(${scale})` : 'none',
    transformOrigin: 'top left',
  }}>
    <CornerCirclesTL />
    <div style={{ position: 'absolute', top: 30, right: 30 }}><DotsPattern rows={9} cols={5} color="#3a52a0" /></div>
    <div style={{ position: 'absolute', bottom: 150, left: 30 }}><DotsPattern rows={5} cols={4} color="#3a52a0" /></div>
    <CornerCirclesBR height="18%" />

    {/* Logo (top-left in landscape) */}
    <div style={{ position: 'absolute', top: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <EGrowthLogo />
    </div>

    {/* Title — same big script style */}
    <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontFamily: '"UnifrakturCook", "Old English Text MT", "Cinzel", Georgia, serif', fontSize: 70, color: '#1a1a1a', lineHeight: 1 }}>
        Certi<span style={{ fontStyle: 'italic' }}>ficate</span>
      </div>
      <div style={{ fontVariant: 'small-caps', fontSize: 18, fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.18em', marginTop: 6 }}>
        Of Completion
      </div>
    </div>

    <div style={{ position: 'absolute', top: 270, left: 100, right: 100, textAlign: 'center' }}>
      <div style={{ fontSize: 16, color: '#3d4642' }}>This certifies that</div>
      <h1 style={{ fontSize: 44, fontWeight: 700, color: '#3a52a0', letterSpacing: '0.2em', margin: '10px 0 0', fontFamily: 'Sora, sans-serif' }}>
        {data.recipient.toUpperCase()}
      </h1>
      <div style={{ height: 2, width: 380, background: '#c2a45a', margin: '10px auto 0', borderRadius: 1 }} />
      <div style={{ fontSize: 15, color: '#3d4642', marginTop: 14 }}>
        has been awarded a certificate of successful completion in
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a211f', margin: '8px 0 0' }}>
        {data.course}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 30px', marginTop: 14, textAlign: 'left', fontSize: 12, color: '#3d4642', lineHeight: 1.4, padding: '0 60px' }}>
        {data.topics.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: '#3a52a0' }}>•</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom row: seal, sigs, info, QR */}
    <div style={{ position: 'absolute', bottom: 130, left: 80, right: 80, display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 100px', gap: 24, alignItems: 'end' }}>
      <div><RoundSeal size={92} /></div>
      <SigBlock name={data.director1} />
      <SigBlock name={data.director2} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 10, color: '#3a52a0', letterSpacing: '0.1em', fontFamily: 'serif' }}>
        <InfoCell label="Certificate Number" value={data.certNumber} compact />
        <InfoCell label="Course Date" value={data.courseDate} compact />
        <InfoCell label="Duration" value={data.duration} compact />
      </div>
      <div><QRMock size={86} /></div>
    </div>

    <div style={{ position: 'absolute', bottom: 24, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#fff', fontSize: 10, zIndex: 2 }}>
      <div style={{ maxWidth: 620, lineHeight: 1.5, fontFamily: 'serif' }}>
        The course meets the formal training requirements of the accredited program and aligns with the International Society of Quality's body of knowledge. The certificate's authenticity can be verified via our website or by scanning the QR code provided.
      </div>
      <div style={{ textAlign: 'right', fontWeight: 600 }}>
        <div style={{ textDecoration: 'underline' }}>www.eGrowthIndia.com</div>
        <div style={{ marginTop: 2 }}>info@eGrowthIndia.com</div>
      </div>
    </div>
  </div>
);

const SigBlock = ({ name }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      fontFamily: '"Brush Script MT", cursive', fontSize: 26,
      color: '#3a52a0', height: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      {name.split(' ')[0]}
    </div>
    <div style={{ borderTop: '1px solid #3a52a0', paddingTop: 6, fontSize: 12, color: '#1a211f', letterSpacing: '0.1em', fontFamily: 'serif' }}>
      {name}<br />
      <span style={{ fontSize: 11, color: '#576460' }}>Director</span>
    </div>
  </div>
);

const InfoCell = ({ label, value, compact }) => (
  <div>
    <div style={{ fontSize: compact ? 9 : 10, color: '#3a52a0', letterSpacing: '0.1em', textTransform: 'capitalize', fontWeight: 500 }}>
      {label}:
    </div>
    <div style={{ fontSize: compact ? 11 : 13, color: '#1a211f', fontWeight: 700, marginTop: 2, letterSpacing: '0.05em' }}>
      {value}
    </div>
  </div>
);

// ── Certificate viewer modal ────────────────────────────────────────────
const CertificateViewer = ({ open, onClose, data, defaultOrientation = 'portrait' }) => {
  const [orientation, setOrientation] = React.useState(defaultOrientation);
  if (!open) return null;
  const cert = data || SAMPLE_CERTS_DATA;

  // Scale the certificate to fit the viewer
  const targetWidth = orientation === 'portrait' ? 600 : 920;
  const scale = orientation === 'portrait' ? targetWidth / 800 : targetWidth / 1130;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.8)',
      zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '24px 24px 48px', overflowY: 'auto', backdropFilter: 'blur(4px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', maxWidth: '100%' }}>
        {/* Toolbar */}
        <div style={{
          background: 'var(--bg-raised)', borderRadius: 'var(--r-md)',
          padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: 920,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--moss-100)', color: 'var(--moss-700)', borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 600 }}>
            <Icon name="check" size={13} /> Verified
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{cert.certNumber}</span>
          <div style={{ flex: 1 }} />

          {/* Orientation toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)', padding: 2, border: '1px solid var(--border)' }}>
            {[
              { id: 'portrait',  label: 'Portrait',  icon: '▯' },
              { id: 'landscape', label: 'Landscape', icon: '▭' },
            ].map(o => (
              <button
                key={o.id}
                onClick={() => setOrientation(o.id)}
                data-action={`cert-orientation-${o.id}`}
                style={{
                  padding: '5px 12px', fontSize: 12, fontWeight: 600,
                  background: orientation === o.id ? 'var(--brand-800)' : 'transparent',
                  color: orientation === o.id ? '#fff' : 'var(--text-muted)',
                  borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 14 }}>{o.icon}</span> {o.label}
              </button>
            ))}
          </div>

          <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 13 }} data-action="cert-share">
            <Icon name="share" size={13} /> Share
          </button>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 13 }} data-action="cert-download">
            <Icon name="download" size={13} /> Download PDF
          </button>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Certificate */}
        <div style={{
          width: orientation === 'portrait' ? 800 * scale : 1130 * scale,
          height: orientation === 'portrait' ? 1130 * scale : 800 * scale,
          position: 'relative',
        }}>
          {orientation === 'portrait'
            ? <CertificatePortrait data={cert} scale={scale} />
            : <CertificateLandscape data={cert} scale={scale} />
          }
        </div>

        {/* Verification card */}
        <div style={{
          background: 'var(--bg-raised)', borderRadius: 'var(--r-md)',
          padding: 16, width: '100%', maxWidth: 920,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <Icon name="award" size={28} style={{ color: 'var(--brand-700)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Public verification</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              Anyone can verify this certificate at <strong>eGrowthIndia.com/verify/{cert.certNumber}</strong>
            </div>
          </div>
          <span className="handoff-pill">Hosted on eGrowthIndia.com</span>
          <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12 }} data-action="cert-copy-link">
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CertificatePortrait, CertificateLandscape, CertificateViewer, SAMPLE_CERTS_DATA });
