/* ============================================================
   Shell — shared navigation, header, and page utilities
   Used by every standalone HTML page
   ============================================================ */

/* ── Inject shared CSS rules missing from individual page heads ── */
(function() {
  const s = document.createElement('style');
  s.textContent = `
    .dark-hero {
      background:
        radial-gradient(ellipse 70% 50% at 80% 0%, rgba(227,24,55,0.18), transparent 55%),
        linear-gradient(165deg, #0A1628 0%, #122038 50%, #0A1628 100%);
    }
    .hero-gradient {
      background:
        radial-gradient(ellipse 80% 60% at 50% -20%, rgba(227,24,55,0.08), transparent 60%),
        radial-gradient(ellipse 60% 50% at 100% 0%, rgba(10,22,40,0.05), transparent 50%),
        linear-gradient(180deg, #FFFFFF 0%, #F7F8FA 100%);
    }
    .tafe-hero {
      background:
        radial-gradient(ellipse 60% 80% at 75% 60%, #FF4500 0%, transparent 65%),
        radial-gradient(ellipse 40% 50% at 85% 100%, #FF7B00 0%, transparent 60%),
        linear-gradient(135deg, #1A0500 0%, #2A0800 35%, #6B1000 70%, #A01800 100%);
      position: relative; overflow: hidden;
    }
    .shadow-card { box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -6px rgba(0,0,0,0.08); }
    .shadow-pop  { box-shadow: 0 20px 60px -12px rgba(0,0,0,0.18); }
    .shadow-lift { box-shadow: 0 8px 32px -8px rgba(0,0,0,0.12); }
    .shadow-glow { box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 12px 40px -8px rgba(227,24,55,0.15); }
    .text-balance { text-wrap: balance; }
    .snap-x-mandatory { scroll-snap-type: x mandatory; }
    .snap-center { scroll-snap-align: center; }
    input[type=range]::-webkit-slider-runnable-track { height:3px; border-radius:999px; background:#E5E7EB; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:22px; height:22px; margin-top:-9.5px; border-radius:50%; background:#0A1628; border:3px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.15); cursor:pointer; }
  `;
  document.head.appendChild(s);
})();

const NAV_MAP = {
  landing:   'index.html',
  profile:   'profile.html',
  recommend: 'matches.html',
  pitch:     'pitch.html',
  compare:   'compare.html',
  whatsapp:  'whatsapp.html',
  grounding: 'grounding.html',
  recent:    'recent.html',
  dashboard: 'dashboard.html',
};

const nav = (screen) => {
  window.location.href = NAV_MAP[screen] || 'index.html';
};

const BACK_MAP = {
  profile:   'landing',
  recommend: 'profile',
  pitch:     'recommend',
  compare:   'recommend',
  whatsapp:  'pitch',
  grounding: 'pitch',
  recent:    'landing',
  dashboard: 'landing',
};

const FLOW_STEPS  = ['profile', 'recommend', 'pitch'];
const FLOW_LABELS = ['Farmer', 'Matches', 'Pitch'];

/* ── Persist selected model across pages via sessionStorage ── */
const getSelected = () => {
  try {
    const id = sessionStorage.getItem('rb_model');
    return (id && MODELS.find(m => m.id === id)) || MODELS[0];
  } catch { return MODELS[0]; }
};
const setSelected = (m) => {
  try { sessionStorage.setItem('rb_model', m.id); } catch {}
};

/* ── Step progress bar ── */
function StepProgress({ screen }) {
  const idx = FLOW_STEPS.indexOf(screen);
  if (idx < 0) return null;
  return (
    <div className="px-[var(--gutter)] bg-white border-b border-line/80" style={{ minHeight: 'var(--step-h)' }}>
      <div className="mx-auto max-w-3xl flex items-center h-[var(--step-h)]">
        {FLOW_LABELS.map((label, i) => {
          const done   = i < idx;
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

/* ── Jump menu ── */
function JumpMenu({ current }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const SCREENS = [
    ['landing','Home'], ['profile','Farmer profile'], ['recommend','Matches'],
    ['pitch','Pitch'], ['compare','Compare'], ['recent','All recommendations'],
    ['dashboard','Manager insights'],
  ];
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="grid place-items-center w-9 h-9 rounded-full text-ink-muted hover:bg-canvas hover:text-navy transition">
        <IconMenu size={20} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-surface rounded-2xl shadow-pop border border-line py-2 z-[70] animate-fadeup">
          {SCREENS.map(([k, v]) => (
            <button key={k} onClick={() => nav(k)}
              className={cx('w-full flex items-center justify-between px-4 py-2.5 text-[14px] hover:bg-canvas transition',
                current === k ? 'text-navy font-semibold' : 'text-ink-muted')}>
              <span>{v}</span>
              {current === k && <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page header ── */
function PageHeader({ screen }) {
  const back = BACK_MAP[screen];
  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="h-[48px] px-3 sm:px-4 flex items-center justify-between">
        {back ? (
          <button onClick={() => nav(back)}
            className="grid place-items-center w-9 h-9 rounded-full text-ink-muted hover:bg-canvas hover:text-navy transition">
            <IconChevronLeft size={20} />
          </button>
        ) : screen === 'landing' ? (
          <div className="w-9" />
        ) : (
          <JumpMenu current={screen} />
        )}
        <button onClick={() => nav('dashboard')}
          className="h-8 px-4 rounded-full text-[12px] font-semibold bg-canvas text-ink-muted border border-line hover:text-navy transition-all">
          Manager view
        </button>
      </div>
      <StepProgress screen={screen} />
    </header>
  );
}

Object.assign(window, { nav, NAV_MAP, getSelected, setSelected, PageHeader, StepProgress, JumpMenu });
