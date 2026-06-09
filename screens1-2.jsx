/* ============================================================
   Screen 1 - Landing   |   Screen 2 - Farmer Profile
   ============================================================ */

function ModulePill({ mod, onClick, featured }) {
  const Icon = mod.id === 'dsp' ? IconSparkles
    : mod.id === 'leads' ? IconUser
    : mod.id === 'inventory' ? IconList
    : mod.id === 'service' ? IconFile
    : IconBank;

  return (
    <button onClick={onClick}
      className={cx(
        'flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-200',
        featured
          ? 'bg-navy text-white border-navy shadow-card min-w-[180px]'
          : 'bg-white text-ink border-line hover:border-navy/20 min-w-[150px]'
      )}>
      <span className={cx('grid place-items-center w-9 h-9 rounded-lg shrink-0', featured ? 'bg-white/15' : 'bg-canvas text-navy')}>
        <Icon size={16} />
      </span>
      <div className="text-left min-w-0">
        <p className={cx('text-[13px] font-semibold leading-tight truncate', featured ? 'text-white' : 'text-navy')}>{mod.title}</p>
        <p className={cx('text-[11px] mt-0.5 truncate', featured ? 'text-white/65' : 'text-ink-muted')}>{mod.subtitle}</p>
      </div>
      {featured && <IconArrowRight size={14} className="text-white/70 shrink-0" />}
    </button>
  );
}

function ScreenLanding({ nav, setRole }) {
  const toast = useToast();
  const open = (mod) => {
    if (mod.id === 'dsp') nav('profile');
    else toast(mod.title + ' coming soon', { sub: 'This demo focuses on the DSP Assistant module.' });
  };

  return (
    <div>
      {/* ── Hero banner ── */}
      <button
        onClick={() => nav('profile')}
        className="w-full block relative overflow-hidden focus:outline-none group tafe-hero"
        style={{ minHeight: '420px' }}
        aria-label="Explore DSP Assistant"
      >
        {/* Tractor photo — right-anchored */}
        <img
          src="assets/hero-tractor.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-full w-auto object-contain object-right-bottom pointer-events-none select-none"
          style={{ maxWidth: '70%' }}
          onError={(e) => { e.target.style.opacity = '0'; }}
        />

        {/* Left-to-right gradient: dark on left so text is legible, fades out */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.90) 30%, rgba(10,22,40,0.55) 58%, transparent 80%)' }}
        />

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center px-7 sm:px-10 py-14 sm:py-16 text-left" style={{ minHeight: '420px', maxWidth: '560px' }}>
          {/* Badge */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-7 h-[2.5px] rounded-full bg-brand-red shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">AI Sales Co-pilot · TAFE</span>
          </div>

          {/* Headline */}
          <h1 className="text-[40px] sm:text-[52px] font-bold text-white leading-[1.06] tracking-[-0.025em]">
            TAFE DSP<br />ASSISTANT
          </h1>

          {/* Tagline */}
          <p className="text-[17px] sm:text-[19px] font-semibold text-white/90 mt-4 leading-snug">
            The right tractor.<br className="sm:hidden" /> For the right farmer. Every time.
          </p>

          {/* Description */}
          <p className="text-[13px] sm:text-[14px] text-white/55 mt-2.5 leading-relaxed" style={{ maxWidth: '340px' }}>
            TAFE's AI Sales Co-pilot helps you recommend, justify, and confidently pitch the ideal tractor for every customer.
          </p>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red rounded-full text-white text-[14px] font-semibold shadow-glow group-hover:bg-brand-redDark transition-colors duration-200">
              Start matching <IconArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300 pointer-events-none" />
      </button>

      {/* ── Recent recommendations ── */}
      <ScreenBlock className="pt-8 pb-0">
        <Screen>
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] font-semibold text-brand-red uppercase tracking-[0.12em] mb-1.5">Recent</p>
              <h2 className="text-[26px] font-bold text-navy tracking-[-0.02em] leading-tight">Your recommendations</h2>
            </div>
            <button onClick={() => nav('recent')} className="text-[12px] text-ink-faint hover:text-navy font-medium py-1 transition">See all →</button>
          </div>
          <div className="h-scroll-rail no-sb -mx-1 px-1">
            {RECENT.map((r, i) => (
              <button key={i} onClick={() => nav('recommend')}
                style={{ animationDelay: `${i * 80}ms` }}
                className="w-[200px] text-left bg-white rounded-[var(--radius-card)] border border-line/60 p-5 hover:border-navy/20 hover:shadow-lift transition-all duration-200 group animate-fadeup">
                <p className="text-[10px] font-semibold text-ink-faint uppercase tracking-[0.1em] mb-2">{r.date}</p>
                <p className="font-bold text-[17px] text-navy leading-tight tracking-tight">{r.farmer}</p>
                <p className="text-[12px] text-ink-muted mt-1 font-medium">{r.model}</p>
                <div className="flex items-center justify-between mt-4">
                  <ConfidenceBadge score={r.confidence} />
                  <IconChevronRight size={14} className="text-ink-faint group-hover:text-brand-red transition" />
                </div>
              </button>
            ))}
          </div>
        </Screen>
      </ScreenBlock>

      {/* ── Stats ── */}
      <ScreenBlock className="pt-6 pb-8">
        <Screen>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '12', label: 'This week', screen: 'recent' },
              { val: '91%', label: 'Avg. match', screen: 'recommend' },
              { val: '3', label: 'Follow-ups', screen: 'dashboard', manager: true },
            ].map(({ val, label, screen, manager }, i) => (
              <button key={i}
                style={{ animationDelay: `${120 + i * 60}ms` }}
                onClick={() => { if (manager) { setRole && setRole('manager'); } nav(screen); }}
                className="text-left p-4 sm:p-5 rounded-[var(--radius-card)] bg-white border border-line/60 hover:border-navy/20 hover:shadow-lift transition-all duration-200 animate-fadeup group">
                <p className="text-[32px] sm:text-[36px] font-bold text-navy tabnums leading-none tracking-[-0.03em]">{val}</p>
                <p className="text-[11px] text-ink-faint mt-2 font-medium">{label}</p>
              </button>
            ))}
          </div>
        </Screen>
      </ScreenBlock>

      {/* ── DWM modules ── */}
      <ScreenBlock className="pt-0 pb-6 border-t border-line/50">
        <Screen className="pt-5">
          <p className="text-[10px] font-semibold text-ink-faint uppercase tracking-[0.12em] mb-3">DWM Workspace</p>
          <div className="h-scroll-rail no-sb -mx-1 px-1">
            {DWM_MODULES.map((m) => (
              <ModulePill key={m.id} mod={m} onClick={() => open(m)} featured={m.id === 'dsp'} />
            ))}
          </div>
        </Screen>
      </ScreenBlock>
    </div>
  );
}

const ANALYSIS_STEPS = [
  'Reading farmer profile from CRM',
  'Mapping crops to Application-Implement matrix',
  'Matching against 170+ models',
  'Applying Tiruvannamalai district context',
];

function AnalysingOverlay() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, ANALYSIS_STEPS.length)), 480);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-navy/50 backdrop-blur-md animate-fadein px-[var(--gutter)]">
      <Card className="w-full max-w-sm p-6 text-center shadow-pop">
        <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-brand-redSoft text-brand-red mb-4">
          <Spinner size={24} className="text-brand-red" />
        </div>
        <h3 className="text-[18px] font-bold text-navy">Finding the best fit</h3>
        <p className="text-[13px] text-ink-muted mt-1">Matching against 170+ TAFE models</p>
        <div className="mt-4 space-y-2.5 text-left">
          {ANALYSIS_STEPS.map((s, i) => (
            <div key={i} className={cx('flex items-center gap-2.5 text-[13px] transition-all',
              i < step ? 'text-navy' : i === step ? 'text-ink' : 'text-ink-faint')}>
              <span className={cx('grid place-items-center w-5 h-5 rounded-full shrink-0',
                i < step ? 'bg-good text-white' : i === step ? 'bg-navy text-white' : 'bg-canvas')}>
                {i < step ? <IconCheck size={11} /> : i === step ? <Spinner size={9} className="text-white" /> : null}
              </span>
              {s}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ScreenRecent({ nav }) {
  return (
    <ScreenBlock>
      <Screen>
        <button onClick={() => nav('landing')} className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-navy mb-3 font-medium">
          <IconArrowLeft size={15} /> Back
        </button>
        <SectionHead
          eyebrow="History"
          title="All recommendations"
          subtitle="Your recent farmer matches across Tiruvannamalai district."
          compact
        />
        <div className="space-y-2.5">
          {RECENT_ALL.map((r, i) => (
            <button key={i} onClick={() => nav('recommend')}
              className="w-full flex items-center gap-3 p-3.5 rounded-[var(--radius-card)] bg-white shadow-card hover:shadow-lift transition text-left group">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-canvas text-navy font-semibold text-[13px] shrink-0">
                {r.farmer.split(' ').map((x) => x[0]).slice(0, 2).join('')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] text-navy leading-tight">{r.farmer}</p>
                <p className="text-[13px] text-ink-muted">{r.model}</p>
                <p className="text-[11px] text-ink-faint mt-0.5">{r.date}</p>
              </div>
              <ConfidenceBadge score={r.confidence} />
              <IconChevronRight size={16} className="text-ink-faint group-hover:text-brand-red shrink-0" />
            </button>
          ))}
        </div>
      </Screen>
    </ScreenBlock>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ScreenProfile({ nav }) {
  const [f, setF] = useState({ ...FARMER });
  const [analysing, setAnalysing] = useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const submit = () => {
    setAnalysing(true);
    setTimeout(() => nav('recommend'), 2200);
  };

  return (
    <>
      {analysing && <AnalysingOverlay />}
      <ScreenHero>
        <SectionHead
          eyebrow="Step 1"
          title="Who is the farmer?"
          subtitle="Pre-filled from Zoho CRM. Review and adjust before we find the right tractor."
          compact
        />
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white shadow-card">
          <IconSparkles size={15} className="text-brand-red shrink-0" />
          <p className="text-[13px] text-ink"><span className="font-semibold text-navy">9 fields auto-filled</span> from CRM</p>
        </div>
      </ScreenHero>

      <ScreenBlock className="pt-3">
        <Screen>
          <Card flat className="p-4 sm:p-5">
            <ProfileSection title="Basic details">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Farmer name">
                  <TextInput value={f.name} onChange={(e) => set('name')(e.target.value)} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Age">
                    <TextInput type="number" value={f.age} onChange={(e) => set('age')(e.target.value)} />
                  </Field>
                  <Field label="Gender">
                    <Select value={f.gender} onChange={(e) => set('gender')(e.target.value)} options={['Male', 'Female', 'Other']} />
                  </Field>
                </div>
                <Field label="Mobile">
                  <TextInput value={f.mobile} onChange={(e) => set('mobile')(e.target.value)} />
                </Field>
                <Field label="Location">
                  <TextInput icon={<IconMapPin size={15} />} value={f.location} onChange={(e) => set('location')(e.target.value)} />
                </Field>
              </div>
            </ProfileSection>

            <ProfileSection title="Land & crops">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Land size" hint="Acres">
                  <TextInput type="number" value={f.land} onChange={(e) => set('land')(e.target.value)} />
                </Field>
                <Field label="Soil type" derived="From location">
                  <TextInput value={f.soil} readOnly className="!bg-canvas text-ink-muted cursor-default" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Primary crops">
                    <ChipSelect options={['Paddy', 'Sugarcane', 'Cotton', 'Groundnut', 'Maize']} value={f.crops} onChange={set('crops')} allowCustom addLabel="Add crop" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Application">
                    <RadioGroup options={['Agriculture', 'Commercial', 'Both']} value={f.application} onChange={set('application')} />
                  </Field>
                </div>
              </div>
            </ProfileSection>

            <ProfileSection title="Buying context">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Persona">
                  <RadioGroup options={['First-time buyer', 'Existing TAFE owner', 'Competitor owner']} value={f.persona} onChange={set('persona')} />
                </Field>
                {f.persona === 'Competitor owner' && (
                  <Field label="Current tractor" hint="For competitor comparison">
                    <TextInput value={f.currentBrand} onChange={(e) => set('currentBrand')(e.target.value)} />
                  </Field>
                )}
              </div>
            </ProfileSection>

            <ProfileSection title="Preferences">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Preferred HP range">
                  <RangeSlider min={20} max={75} value={f.hp} onChange={set('hp')} format={(v) => v + ' HP'} />
                </Field>
                <Field label="Budget range" hint="On-road indicative">
                  <RangeSlider min={300000} max={1500000} step={50000} value={f.budget} onChange={set('budget')}
                    format={(v) => '\u20B9' + (v / 100000).toFixed(1) + 'L'} />
                </Field>
              </div>
            </ProfileSection>
          </Card>
        </Screen>
      </ScreenBlock>

      <ActionBar>
        <Button size="lg" variant="red" className="w-full" onClick={submit} iconRight={<IconArrowRight size={16} />}>
          Find best matches
        </Button>
      </ActionBar>
    </>
  );
}

Object.assign(window, { ScreenLanding, ScreenRecent, ScreenProfile });
