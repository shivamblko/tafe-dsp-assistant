/* ============================================================
   App shell — minimal header, step progress, bottom nav
   ============================================================ */

const SCREENS = {
  landing: { label: 'Home', comp: 'ScreenLanding', step: null, action: false },
  recent: { label: 'All recommendations', comp: 'ScreenRecent', step: null, action: false },
  profile: { label: 'Farmer profile', comp: 'ScreenProfile', step: 1, action: true },
  recommend: { label: 'Matches', comp: 'ScreenRecommend', step: 2, action: false },
  pitch: { label: 'Pitch', comp: 'ScreenPitch', step: 3, action: true },
  compare: { label: 'Compare', comp: 'ScreenCompare', step: null, action: false },
  whatsapp: { label: 'Sent', comp: 'ScreenWhatsApp', step: null, action: false },
  grounding: { label: 'Grounding demo', comp: 'ScreenGrounding', step: null, action: false },
  dashboard: { label: 'Insights', comp: 'ScreenDashboard', step: null, action: false },
};

const FLOW_STEPS = ['profile', 'recommend', 'pitch'];
const FLOW_LABELS = ['Farmer', 'Matches', 'Pitch'];

function StepProgress({ screen }) {
  const idx = FLOW_STEPS.indexOf(screen);
  if (idx < 0) return null;
  return (
    <div className="px-[var(--gutter)] bg-white border-b border-line/80" style={{ minHeight: 'var(--step-h)' }}>
      <div className="mx-auto max-w-3xl flex items-center h-[var(--step-h)]">
        {FLOW_LABELS.map((label, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-0.5 shrink-0 w-14">
                <span className={cx(
                  'w-6 h-6 rounded-full grid place-items-center text-[10px] font-semibold transition-all duration-300',
                  done ? 'bg-good text-white' : active ? 'bg-navy text-white' : 'bg-line text-ink-faint'
                )}>
                  {done ? <IconCheck size={12} /> : i + 1}
                </span>
                <span className={cx('text-[9px] font-medium', active ? 'text-navy' : done ? 'text-good' : 'text-ink-faint')}>
                  {label}
                </span>
              </div>
              {i < FLOW_LABELS.length - 1 && (
                <div className="flex-1 h-px mx-1.5 bg-line overflow-hidden -mt-3">
                  <div className={cx('h-full bg-good transition-all duration-500', done ? 'w-full' : active ? 'w-1/2' : 'w-0')} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function JumpMenu({ go, current }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="grid place-items-center w-9 h-9 rounded-full text-ink-muted hover:bg-canvas hover:text-navy transition" title="Demo navigation">
        <IconMenu size={20} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-surface rounded-2xl shadow-pop border border-line py-2 z-[70] animate-fadeup max-h-[70vh] overflow-y-auto">
          <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Demo screens</p>
          {Object.entries(SCREENS).map(([k, v]) => (
            <button key={k} onClick={() => { go(k); setOpen(false); }}
              className={cx('w-full flex items-center justify-between px-4 py-2.5 text-[14px] hover:bg-canvas transition', current === k ? 'text-navy font-semibold' : 'text-ink-muted')}>
              <span>{v.label}</span>
              {current === k && <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RoleSwitch({ role, onChange }) {
  return (
    <div className="inline-flex p-0.5 rounded-full bg-canvas border border-line">
      {[['dsp', 'DSP'], ['manager', 'Mgr']].map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)}
          className={cx('px-2.5 h-7 rounded-full text-[11px] font-semibold transition',
            role === v ? 'bg-navy text-white shadow-sm' : 'text-ink-muted hover:text-navy')}>
          {l}
        </button>
      ))}
    </div>
  );
}

const BACK_MAP = {
  profile: 'landing',
  recommend: 'profile',
  pitch: 'recommend',
  compare: 'recommend',
  whatsapp: 'pitch',
  grounding: 'pitch',
  recent: 'landing',
  dashboard: 'landing',
};

function Header({ screen, go, role, setRole }) {
  const backScreen = BACK_MAP[screen];
  const switchRole = (r) => { setRole(r); go(r === 'manager' ? 'dashboard' : 'landing'); };

  if (screen === 'landing') return null;

  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="h-[48px] px-3 sm:px-4 flex items-center justify-between">

        {/* Left: back or jump menu */}
        {backScreen ? (
          <button onClick={() => go(backScreen)}
            className="grid place-items-center w-9 h-9 rounded-full text-ink-muted hover:bg-canvas hover:text-navy transition">
            <IconChevronLeft size={20} />
          </button>
        ) : (
          <JumpMenu go={go} current={screen} />
        )}

        {/* Right: Manager toggle */}
        <button
          onClick={() => switchRole(role === 'manager' ? 'dsp' : 'manager')}
          className={cx(
            'h-8 px-4 rounded-full text-[12px] font-semibold transition-all',
            role === 'manager'
              ? 'bg-brand-red text-white'
              : 'bg-canvas text-ink-muted border border-line hover:text-navy'
          )}>
          {role === 'manager' ? '← DSP view' : 'Manager view'}
        </button>
      </div>

      <StepProgress screen={screen} />
    </header>
  );
}

/* BottomNav removed — navigation handled by header back button + flow stepper */

function App() {
  const [screen, setScreen] = useState('landing');
  const [role, setRole] = useState('dsp');
  const [selected, setSelected] = useState(MODELS[0]);
  const [audit, setAudit] = useState(false);
  const scrollRef = useRef();

  const go = useCallback((s) => {
    setScreen(s);
    requestAnimationFrame(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; });
  }, []);
  const openAudit = useCallback(() => setAudit(true), []);

  const meta = SCREENS[screen];
  const props = { nav: go, setSelected, selected, openAudit, role, setRole };
  const Comp = window[meta.comp];

  return (
    <div className="h-full flex flex-col app-bg overflow-hidden">
      <Header screen={screen} go={go} role={role} setRole={setRole} />
      <main ref={scrollRef} className={cx('scroll-main no-sb', meta.action && 'with-action')}>
        <div key={screen} className="animate-fadeup">
          <Comp {...props} />
        </div>
      </main>
      {/* BottomNav removed */}
      <AuditPanel open={audit} onClose={() => setAudit(false)} context={`${selected.name} recommendation for Suresh Patel, Tiruvannamalai district.`} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastProvider><App /></ToastProvider>
);
