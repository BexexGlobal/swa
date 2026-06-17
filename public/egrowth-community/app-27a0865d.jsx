// Main App for eGrowth Community

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#176e6e",
  "rankStyle": "tier",
  "density": "comfortable",
  "role": "expert",
  "dark": false,
  "showFounderPromo": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ['#176e6e', '#2a6d45', '#344054', '#9c4f26', '#FF9300'];
const ACCENT_NAME = { '#176e6e': 'teal', '#2a6d45': 'forest', '#344054': 'slate', '#9c4f26': 'rust', '#ff9300': 'energy' };

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [authed, setAuthed] = React.useState(true); // Start authed for demo; toggle via tweaks
  const [authMode, setAuthMode] = React.useState('signup');
  const [page, setPage] = React.useState('home');
  const [askOpen, setAskOpen] = React.useState(false);
  const [savedSet, setSavedSet] = React.useState(new Set(['p2', 'p7']));
  const [votedSet, setVotedSet] = React.useState(new Set(['p2', 'p3', 'p5']));
  const [toast, setToast] = React.useState(null);
  const [previewRes, setPreviewRes] = React.useState(null);
  const [resumeUser, setResumeUser] = React.useState(null);
  const [reportTarget, setReportTarget] = React.useState(null);
  const [whyOpen, setWhyOpen] = React.useState(false);
  const [referralOpen, setReferralOpen] = React.useState(false);
  const [tourOpen, setTourOpen] = React.useState(false);
  const [activeGroup, setActiveGroup] = React.useState(null);

  // Expose preview + resume + report + why + referral + tour to children via window
  React.useEffect(() => {
    window.__openPreview = (r) => setPreviewRes(r);
    window.__openResume = (u) => setResumeUser(u);
    window.__openReport = (t) => setReportTarget(t);
    window.__openWhy = () => setWhyOpen(true);
    window.__openReferral = () => setReferralOpen(true);
    window.__openTour = () => setTourOpen(true);
    window.__navigate = (p) => setPage(p);
    return () => { delete window.__openPreview; delete window.__openResume; delete window.__openReport; delete window.__openWhy; delete window.__openReferral; delete window.__openTour; };
  }, []);

  // Role-based user adjustment
  const roleUsers = {
    newbie: {
      ...USER_MAP['me'],
      reputation: 78,
      contributions: { answers: 3, questions: 4, resources: 1, jobs: 0, endorsements: 2 },
      skills: [
        { name: 'ISO 9001',      level: 28, endorsements: 2, from: 'just getting started' },
        { name: 'Internal Audit', level: 14, endorsements: 1, from: '1 question asked' },
      ],
      title: 'Quality Engineer · Recently joined',
      joined: 'Apr 2026',
    },
    expert: USER_MAP['me'],
    admin: {
      ...USER_MAP['u8'],
      skills: USER_MAP['me'].skills,
      contributions: { answers: 1840, questions: 124, resources: 96, jobs: 22, endorsements: 1240 },
      domains: ['quality', 'esg'],
      joined: 'Jan 2024',
    },
  };
  const currentUser = roleUsers[t.role] || USER_MAP['me'];

  // Apply theme to root
  React.useEffect(() => {
    const accentName = ACCENT_NAME[t.accent] || t.accent;
    document.documentElement.setAttribute('data-accent', accentName);
    document.documentElement.setAttribute('data-density', t.density);
    document.documentElement.setAttribute('data-theme', t.dark ? 'dark' : 'light');
  }, [t.accent, t.density, t.dark]);

  const toggleSave = (id) => {
    setSavedSet(s => {
      const next = new Set(s);
      if (next.has(id)) { next.delete(id); showToast('Removed from saved'); }
      else { next.add(id); showToast('Saved!'); }
      return next;
    });
  };
  const toggleVote = (id) => {
    setVotedSet(s => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else { next.add(id); showToast('+1 reputation to the author'); }
      return next;
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };
  // Expose toast globally for any component to call
  React.useEffect(() => { window.__toast = showToast; return () => { delete window.__toast; }; }, []);

  const handleAsk = () => setAskOpen(true);
  const handleSubmit = () => {
    setAskOpen(false);
    showToast('Posted to community · +5 reputation');
  };

  const pageProps = {
    currentUser,
    onNavigate: setPage,
    showFounder: t.showFounderPromo,
    savedSet, toggleSave, votedSet, toggleVote,
    onAsk: handleAsk,
  };

  // Escape key closes any open modal
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (askOpen) setAskOpen(false);
      else if (previewRes) setPreviewRes(null);
      else if (resumeUser) setResumeUser(null);
      else if (reportTarget) setReportTarget(null);
      else if (whyOpen) setWhyOpen(false);
      else if (referralOpen) setReferralOpen(false);
      else if (tourOpen) setTourOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [askOpen, previewRes, resumeUser, reportTarget, whyOpen, referralOpen, tourOpen]);

  let content;
  if (page === 'home') content = <HomePage {...pageProps} />;
  else if (page === 'feed') content = <ActivityPage currentUser={currentUser} onNavigate={setPage} />;
  else if (page === 'library') content = <LibraryPage />;
  else if (page === 'jobs') content = <JobsPage />;
  else if (page === 'profile') content = <ProfilePage user={currentUser} onNavigate={setPage} />;
  else if (page === 'learn') content = <LearnPageV2 onNavigate={setPage} />;
  else if (page === 'reels') content = <ReelsPage />;
  else if (page === 'posters') content = <PostersPage />;
  else if (page === 'quiz') content = <QuizHubPage currentUser={currentUser} />;
  else if (page === 'collections') content = <CollectionsPage />;
  else if (page === 'settings') content = <SettingsPage currentUser={currentUser} />;
  else if (page === 'chapters') content = <ChaptersPage />;
  else if (page === 'mentors') content = <MentorshipPage currentUser={currentUser} />;
  else if (page === 'games') content = <FlashcardsPage />;
  else if (page === 'admin') content = <AdminDashboard />;
  else if (page === 'public') content = <PublicProfilePage user={currentUser} />;
  else if (page === 'qdetail') content = <QuestionDetailPage onClose={() => setPage('home')} />;
  else if (page === 'rdetail') content = <ResourceDetailPage onClose={() => setPage('library')} />;
  else if (page === 'mobile') content = <MobileShowcasePage />;
  else if (page === 'groups') content = activeGroup
    ? <GroupDetailPage group={activeGroup} onBack={() => setActiveGroup(null)} />
    : <GroupsPage onOpenGroup={(g) => setActiveGroup(g)} />;
  else if (page === 'search') content = <SearchPage />;
  else if (page === 'messages') content = <MessagesPage />;
  else if (page === 'jdetail') content = <JobDetailPage onBack={() => setPage('jobs')} />;
  else if (page === 'cdetail') content = <CourseDetailPage onBack={() => setPage('learn')} />;
  else if (page === 'chdetail') content = <ChapterDetailPage onBack={() => setPage('chapters')} />;
  else if (page === 'help') content = <HelpPage />;
  else if (page === 'about') content = <AboutPage />;
  else if (page === 'pricing') content = <PricingPage />;
  else if (page === 'calendar') content = <CalendarPage />;
  else if (page === 'tag') content = <TagDetailPage onBack={() => setPage('home')} />;
  else if (page === 'directory') content = <MemberDirectoryPage />;
  else if (typeof page === 'string' && !['home','feed','library','jobs','profile','learn','reels','posters','quiz','collections','settings','chapters','mentors','games','admin','public','qdetail','rdetail','mobile','groups','search','messages','jdetail','cdetail','chdetail','help','about','pricing','calendar','tag','directory'].includes(page)) {
    content = <NotFoundPage onGoHome={() => setPage('home')} />;
  }
  else content = <HomePage {...pageProps} />;

  // If not authed, just show the auth page
  if (!authed) {
    return (
      <div data-screen-label="eGrowth Community · auth">
        <AuthPage mode={authMode} onLogin={() => setAuthed(true)} />
        <TweaksPanel title="Tweaks">
          <TweakSection label="Auth">
            <TweakRadio label="Auth mode" value={authMode} onChange={v => setAuthMode(v)}
              options={[{ id: 'signup', label: 'Sign up' }, { id: 'login', label: 'Sign in' }]} />
            <TweakButton label="Skip to app" onClick={() => setAuthed(true)} />
          </TweakSection>
        </TweaksPanel>
      </div>
    );
  }

  return (
    <div data-screen-label={`eGrowth Community · ${page}`}>
      <TopBar
        onNavigate={setPage}
        current={page}
        currentUser={currentUser}
        density={t.density}
        onAsk={handleAsk}
      />
      <div className="app-shell" style={{ gridTemplateColumns: '240px 1fr' }}>
        <Sidebar current={page} onNavigate={setPage} currentUser={currentUser} showFounder={t.showFounderPromo} />
        <main className="main" style={{ paddingBottom: 36 }}>
          {content}
        </main>
      </div>
      <AppFooter />

      <AskModal open={askOpen} onClose={() => setAskOpen(false)} onSubmit={handleSubmit} currentUser={currentUser} />
      <FilePreviewModal resource={previewRes} onClose={() => setPreviewRes(null)} />
      <ResumeModal user={resumeUser} onClose={() => setResumeUser(null)} />
      <ReportModal
        open={!!reportTarget} target={reportTarget}
        onClose={() => setReportTarget(null)}
        onSubmit={() => { setReportTarget(null); showToast('Report submitted · our moderators will review within 24 hrs'); }}
      />
      <WhyAmISeeingThis open={whyOpen} onClose={() => setWhyOpen(false)} />
      <ReferralModal open={referralOpen} onClose={() => setReferralOpen(false)} currentUser={currentUser} />
      <OnboardingTour open={tourOpen} onClose={() => setTourOpen(false)} />
      <Toast msg={toast} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor
            label="Brand accent"
            value={t.accent}
            onChange={v => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
          <TweakToggle label="Dark mode" value={t.dark} onChange={v => setTweak('dark', v)} />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Feed density"
            value={t.density}
            onChange={v => setTweak('density', v)}
            options={[{ id: 'compact', label: 'Compact' }, { id: 'comfortable', label: 'Cozy' }]}
          />
          <TweakRadio
            label="Rank display"
            value={t.rankStyle}
            onChange={v => setTweak('rankStyle', v)}
            options={[{ id: 'tier', label: 'Tier' }, { id: 'points', label: 'Points' }]}
          />
        </TweakSection>

        <TweakSection label="Persona">
          <TweakSelect
            label="Logged-in as"
            value={t.role}
            onChange={v => setTweak('role', v)}
            options={[
              { id: 'newbie', label: 'Newcomer (78 rep)' },
              { id: 'expert', label: 'Expert (3,842 rep)' },
              { id: 'admin',  label: 'Admin / Founder' },
            ]}
          />
          <TweakToggle label="Show founder promo" value={t.showFounderPromo} onChange={v => setTweak('showFounderPromo', v)} />
          <TweakButton label="Sign out (see auth page)" onClick={() => setAuthed(false)} />
          <TweakButton label="Start onboarding tour" onClick={() => setTourOpen(true)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
