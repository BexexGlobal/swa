// Quiz Hub — gamified MCQ + leaderboard + badges + take-quiz UI

const QuizHubPage = ({ currentUser }) => {
  const [tab, setTab] = React.useState('categories');
  const [activeQuiz, setActiveQuiz] = React.useState(null);
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-600) 50%, var(--amber-600) 130%)',
        color: '#fff',
        borderRadius: 'var(--r-lg)',
        padding: 32,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-400), transparent 60%)', opacity: 0.45 }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 }}>
          <Icon name="award" size={12} /> Learn · compete · earn REPO
        </div>
        <h1 style={{ fontSize: 32, lineHeight: 1.15, color: '#fff', maxWidth: 620, position: 'relative' }}>
          Quiz Arena — test what you know
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 620, marginTop: 12, position: 'relative' }}>
          108 quizzes across QEHS &amp; ESG standards. Each question is written and reviewed by certified practitioners. Score, earn REPO, climb the global leaderboard.
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 13, position: 'relative' }}>
          <QStat n="108" l="Quizzes" />
          <QStat n="12" l="Categories" />
          <QStat n="9,420" l="Players" />
          <QStat n="42" l="Badges to earn" />
        </div>
      </div>

      {/* Your snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--amber-500), var(--amber-300))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: 'var(--brand-900)', fontFamily: 'var(--font-mono)' }}>R</div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your REPO</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--brand-800)' }}>{currentUser.reputation.toLocaleString()}</div>
          </div>
        </div>
        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--rose-500), var(--amber-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🔥</div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current streak</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--brand-800)' }}>11 days</div>
            <div style={{ fontSize: 11, color: 'var(--moss-700)' }}>+19 days to 30-day badge</div>
          </div>
        </div>
        <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-700), var(--brand-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff' }}>🏆</div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Global rank</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--brand-800)' }}>#5</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>of 9,420 players</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {[
          { id: 'categories', label: 'Categories' },
          { id: 'leaderboard', label: 'Leaderboard' },
          { id: 'badges',     label: 'Badges' },
          { id: 'daily',      label: 'Daily challenges' },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'categories' && <QuizCategoryGrid onStart={() => setActiveQuiz(SAMPLE_QUIZ)} />}
      {tab === 'leaderboard' && <QuizLeaderboard currentUser={currentUser} />}
      {tab === 'badges' && <BadgeGrid />}
      {tab === 'daily' && <DailyChallenges />}

      {activeQuiz && <QuizTakerModal quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />}
    </div>
  );
};

const QStat = ({ n, l }) => (
  <div>
    <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
    <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{l}</div>
  </div>
);

const QuizCategoryGrid = ({ onStart }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
    {QUIZ_CATEGORIES.map(cat => (
      <div key={cat.id} className="card card-hover" style={{ padding: 18, cursor: 'pointer' }} onClick={onStart}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-md)',
            background: cat.color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, flexShrink: 0,
          }}>{cat.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{cat.label}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {cat.quizzes} quizzes · {cat.takenBy.toLocaleString()} players
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="skill-bar"><div className="skill-fill" style={{ width: `${cat.avg}%`, background: `linear-gradient(90deg, ${cat.color}, var(--amber-400))` }} /></div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Avg score: <strong className="mono" style={{ color: 'var(--text)' }}>{cat.avg}%</strong></span>
                  <span>{cat.avg >= 70 ? '🟢 Beatable' : cat.avg >= 60 ? '🟡 Tricky' : '🔴 Tough'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const QuizLeaderboard = ({ currentUser }) => (
  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ padding: '14px 20px', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h3 style={{ fontSize: 14 }}>This month · Global</h3>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="chip" style={{ background: 'var(--brand-800)', color: '#fff', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Global</button>
        <button className="chip" style={{ background: 'var(--ink-100)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>India</button>
        <button className="chip" style={{ background: 'var(--ink-100)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Friends</button>
      </div>
    </div>
    {QUIZ_LEADERBOARD.map(row => {
      const u = USER_MAP[row.userId];
      const isMe = row.userId === 'me';
      return (
        <div key={row.rank} style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '14px 20px',
          background: isMe ? 'var(--brand-50)' : 'transparent',
          borderBottom: '1px solid var(--border)',
          borderLeft: isMe ? '3px solid var(--amber-500)' : 'none',
          paddingLeft: isMe ? 17 : 20,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: row.rank === 1 ? 'linear-gradient(135deg, #fbbf24, #d97706)' :
                        row.rank === 2 ? 'linear-gradient(135deg, #d4d4d8, #71717a)' :
                        row.rank === 3 ? 'linear-gradient(135deg, #c2853b, #92400e)' :
                        'var(--bg-sunken)',
            color: row.rank <= 3 ? '#fff' : 'var(--text-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-mono)',
            border: row.rank > 3 ? '1px solid var(--border)' : 'none',
          }}>
            {row.rank <= 3 ? ['🥇','🥈','🥉'][row.rank - 1] : `#${row.rank}`}
          </div>
          <Avatar user={u} size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>{u.name}{isMe && <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--amber-600)', fontWeight: 700 }}>· YOU</span>}</span>
              {u.isFounder && <span className="chip chip-amber" style={{ padding: '1px 6px', fontSize: 9 }}>Founder</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {row.quizzes} quizzes · {row.badges} badges
            </div>
          </div>
          <Reputation points={row.score} />
        </div>
      );
    })}
  </div>
);

const BadgeGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
    {QUIZ_BADGES.map(b => (
      <div key={b.id} className="card" style={{
        padding: 16, textAlign: 'center',
        background: b.earned ? 'var(--bg-raised)' : 'var(--bg-sunken)',
        opacity: b.earned ? 1 : 0.55,
        border: b.earned && b.rarity === 'Legendary' ? '2px solid var(--amber-400)' :
                b.earned && b.rarity === 'Epic' ? '2px solid var(--brand-500)' :
                '1px solid var(--border)',
      }}>
        <div style={{
          width: 60, height: 60, margin: '0 auto 12px',
          borderRadius: '50%',
          background: b.earned ? (
            b.rarity === 'Legendary' ? 'linear-gradient(135deg, #fbbf24, #d97706)' :
            b.rarity === 'Epic'      ? 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' :
            b.rarity === 'Rare'      ? 'linear-gradient(135deg, var(--moss-500), var(--brand-600))' :
                                       'var(--ink-150)'
          ) : 'var(--ink-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30,
          filter: b.earned ? 'none' : 'grayscale(1)',
        }}>{b.icon}</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4, fontWeight: 600 }}>
          {b.rarity}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.4 }}>{b.desc}</div>
      </div>
    ))}
  </div>
);

const DailyChallenges = () => (
  <div>
    <div className="card" style={{ padding: 22, marginBottom: 16, background: 'var(--amber-50)', borderColor: 'var(--amber-300)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontSize: 36 }}>🔥</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16 }}>Today's challenges · 11-day streak</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Complete all three to earn a 2× REPO multiplier for tomorrow.
          </p>
        </div>
        <Reputation points={DAILY_CHALLENGES.reduce((s, d) => s + d.reward, 0)} size="lg" />
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {DAILY_CHALLENGES.map(d => (
        <div key={d.id} className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: d.done ? 'var(--moss-500)' : 'var(--bg-sunken)',
            color: d.done ? '#fff' : 'var(--text-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: d.done ? 'none' : '2px dashed var(--border-strong)',
          }}>
            {d.done ? <Icon name="check" size={20} /> : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{d.progress}/{d.total}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: d.done ? 'var(--text-muted)' : 'var(--text)', textDecoration: d.done ? 'line-through' : 'none' }}>
              {d.title}
            </div>
            <div className="skill-bar" style={{ marginTop: 8 }}>
              <div className="skill-fill" style={{ width: `${(d.progress / d.total) * 100}%` }} />
            </div>
          </div>
          <Reputation points={d.reward} />
        </div>
      ))}
    </div>
  </div>
);

// Take-a-quiz modal
const QuizTakerModal = ({ quiz, onClose }) => {
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [revealed, setRevealed] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const item = quiz.items[i];
  const selected = answers[i];

  const handleSelect = (idx) => {
    if (revealed) return;
    setAnswers({ ...answers, [i]: idx });
  };
  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
    if (i < quiz.items.length - 1) setI(i + 1);
    else setDone(true);
  };

  const correctCount = Object.keys(answers).filter(k => answers[k] === quiz.items[k].correct).length;
  const pct = Math.round((correctCount / quiz.items.length) * 100);
  const earned = pct >= 70 ? Math.round(quiz.reward * (pct / 100)) : Math.round(quiz.reward * 0.3);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,21,19,0.7)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-raised)',
        width: 720, maxHeight: '90vh',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {!done && (
          <>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="chip chip-brand" style={{ padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{quiz.level}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{quiz.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{quiz.duration} · Earn up to <Reputation points={quiz.reward} /></div>
              </div>
              <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><Icon name="x" size={18} /></button>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: 'var(--ink-150)' }}>
              <div style={{ height: '100%', width: `${((i + (revealed ? 1 : 0)) / quiz.items.length) * 100}%`, background: 'linear-gradient(90deg, var(--brand-600), var(--amber-400))', transition: 'width 0.3s' }} />
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                Question {i + 1} of {quiz.items.length}
              </div>
              <h2 style={{ fontSize: 20, marginTop: 8, lineHeight: 1.35, color: 'var(--text)' }}>{item.q}</h2>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {item.options.map((opt, idx) => {
                  const isSel = selected === idx;
                  const isCorrect = revealed && idx === item.correct;
                  const isWrongSel = revealed && isSel && idx !== item.correct;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 14,
                        padding: '14px 18px',
                        borderRadius: 'var(--r-md)',
                        border: `2px solid ${
                          isCorrect ? 'var(--moss-500)' :
                          isWrongSel ? 'var(--rose-500)' :
                          isSel ? 'var(--brand-600)' : 'var(--border)'
                        }`,
                        background: isCorrect ? 'var(--moss-100)' :
                                   isWrongSel ? 'var(--rose-100)' :
                                   isSel ? 'var(--brand-50)' : 'var(--bg-raised)',
                        cursor: revealed ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        width: '100%',
                      }}
                    >
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: isCorrect ? 'var(--moss-500)' :
                                   isWrongSel ? 'var(--rose-500)' :
                                   isSel ? 'var(--brand-600)' : 'var(--ink-150)',
                        color: (isCorrect || isWrongSel || isSel) ? '#fff' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                        flexShrink: 0,
                      }}>
                        {isCorrect ? '✓' : isWrongSel ? '✕' : ['A','B','C','D'][idx]}
                      </span>
                      <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text)' }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div style={{
                  marginTop: 18, padding: 14,
                  background: selected === item.correct ? 'var(--moss-100)' : 'var(--brand-50)',
                  borderRadius: 'var(--r-md)',
                  borderLeft: `3px solid ${selected === item.correct ? 'var(--moss-500)' : 'var(--brand-600)'}`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: selected === item.correct ? 'var(--moss-700)' : 'var(--brand-800)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    {selected === item.correct ? '✓ Correct!' : '↳ Explanation'}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.explain}</div>
                </div>
              )}
            </div>

            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--bg-sunken)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                {selected != null ? '✓ Answer locked' : 'Pick an answer'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!revealed && (
                  <button className="btn btn-primary" onClick={handleReveal} disabled={selected == null} data-action="quiz-submit-answer">
                    Submit answer
                  </button>
                )}
                {revealed && (
                  <button className="btn btn-primary" onClick={handleNext} data-action="quiz-next-question">
                    {i < quiz.items.length - 1 ? 'Next question' : 'See results'}
                    <Icon name="arrow" size={14} />
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {done && (
          <div style={{ padding: 36, textAlign: 'center' }}>
            <div style={{
              width: 96, height: 96, margin: '0 auto 20px',
              borderRadius: '50%',
              background: pct >= 70 ? 'linear-gradient(135deg, var(--moss-500), var(--brand-500))' : 'var(--ink-150)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48,
              color: '#fff',
            }}>{pct >= 90 ? '🎉' : pct >= 70 ? '🎯' : '📚'}</div>
            <h2 style={{ fontSize: 28, marginBottom: 8 }}>{pct >= 70 ? 'Quiz passed!' : 'Keep going!'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '0 0 24px' }}>
              You scored <strong className="mono" style={{ color: pct >= 70 ? 'var(--moss-700)' : 'var(--rose-600)' }}>{correctCount} / {quiz.items.length} ({pct}%)</strong>
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '14px 22px', background: 'var(--brand-50)', borderRadius: 'var(--r-md)', border: '1px solid var(--brand-200)', marginBottom: 24 }}>
              <Reputation points={earned} size="lg" />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>earned · added to your profile</span>
            </div>
            {pct >= 70 && (
              <div style={{ marginTop: 8, padding: 18, background: 'var(--amber-50)', borderRadius: 'var(--r-md)', border: '1px solid var(--amber-300)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 36 }}>🎯</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: 'var(--amber-600)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>New badge unlocked</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{quiz.badge}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
              <button className="btn btn-outline" onClick={onClose}>Back to quizzes</button>
              <button className="btn btn-primary">Share result</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { QuizHubPage });
