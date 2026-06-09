/* ============================================================
   Screen 5 - Competitor Comparison   |   Screen 6 - Manager Dashboard
   ============================================================ */

const IconArrowDown = (props) => {
  const { size = 14, className = '' } = props || {};
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5v14" /><path d="M6 13l6 6 6-6" />
    </svg>
  );
};

function SpecRow({ label, comp, rec, wins }) {
  const recWins = wins === 'rec';
  const compWins = wins === 'comp';
  return (
    <div className="grid grid-cols-3 items-center py-2.5 border-b border-line/80 last:border-0">
      <p className="text-[12px] text-ink-muted pr-2">{label}</p>
      <p className={cx('text-center text-[13px] tabnums flex items-center justify-center gap-1',
        compWins ? 'font-bold text-navy' : 'text-ink')}>
        {compWins && <IconArrowUp size={12} className="text-navy" />}{comp}
      </p>
      <p className={cx('text-center text-[13px] tabnums flex items-center justify-center gap-1',
        recWins ? 'font-bold text-good' : compWins ? 'text-ink-faint' : 'text-ink')}>
        {recWins && <IconArrowUp size={12} className="text-good" />}
        {compWins && <IconArrowDown size={12} className="text-ink-faint" />}
        {rec}
      </p>
    </div>
  );
}

function ScreenCompare({ nav, openAudit }) {
  return (
    <ScreenBlock>
      <Screen>
        <SectionHead
          eyebrow="Competitor response"
          title="Honest comparison"
          subtitle="Balanced specs from the Tiruvannamalai district playbook."
          compact
          trailing={<AuditButton onClick={openAudit} className="shrink-0" />}
        />

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <Card flat className="p-3 text-center">
            <p className="text-[10px] font-semibold text-ink-faint uppercase tracking-wider mb-0.5">Farmer's current</p>
            <p className="text-[14px] font-bold text-ink leading-tight">{COMPARE.competitor}</p>
          </Card>
          <Card flat className="p-3 text-center bg-brand-redSoft border-brand-red/15">
            <p className="text-[10px] font-semibold text-brand-red uppercase tracking-wider mb-0.5">Recommended</p>
            <p className="text-[14px] font-bold text-brand-red leading-tight">{COMPARE.recommended}</p>
          </Card>
        </div>

        <Card className="p-4">
          {COMPARE.rows.map((r, i) => (
            <SpecRow key={i} label={r.label} comp={r.comp} rec={r.rec} wins={r.wins} />
          ))}
        </Card>

        <div className="mt-4 space-y-3">
          <Card flat className="p-4">
            <p className="text-[11px] font-semibold text-good uppercase tracking-wider mb-2 flex items-center gap-1">
              <IconSparkles size={12} /> TAFE advantages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMPARE.advantages.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-good-soft text-good text-[12px] font-medium">
                  <IconCheck size={12} /> {a}
                </span>
              ))}
            </div>
          </Card>

          <Card flat className="p-4">
            <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-2 flex items-center gap-1">
              <IconInfo size={12} /> Where competitor is stronger
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMPARE.competitorStrengths.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-canvas text-ink text-[12px] font-medium">
                  <IconArrowDown size={11} className="text-ink-faint" /> {s}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <Button variant="secondary" size="sm" onClick={() => nav('recommend')} icon={<IconArrowLeft size={14} />}>Back</Button>
          <Button variant="red" size="sm" onClick={() => nav('pitch')} iconRight={<IconArrowRight size={14} />}>Counter-pitch</Button>
        </div>
      </Screen>
    </ScreenBlock>
  );
}

function ScreenDashboard({ nav, openAudit }) {
  const [range, setRange] = useState('This week');
  const [dealer, setDealer] = useState('All dealerships');
  const max = Math.max(...MODEL_BARS.map((m) => m.count));
  const total = MODEL_BARS.reduce((s, m) => s + m.count, 0);
  const sevTone = { high: 'red', warn: 'warn', low: 'grey' };

  return (
    <>
      <ScreenHero dark>
        <Badge tone="grey" className="!bg-white/10 !text-white/80 mb-3">Manager view</Badge>
        <h1 className="text-[26px] sm:text-[30px] font-bold tracking-tight leading-[1.15]">Sales intelligence</h1>
        <p className="text-[14px] text-white/65 mt-1.5">DSP Assistant performance across your region.</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="relative flex-1 min-w-[130px]">
            <Select value={range} onChange={(e) => setRange(e.target.value)}
              options={['This week', 'Last 7 days', 'This month', 'Last 30 days', 'Quarter to date']}
              className="!h-9 !text-[12px] !bg-white/10 !border-white/15 !text-white !rounded-full !pl-8" />
            <IconCalendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
          <div className="relative flex-1 min-w-[140px]">
            <Select value={dealer} onChange={(e) => setDealer(e.target.value)}
              options={['All dealerships', 'MF Tractors, Tiruvannamalai', 'MF Tractors, Vellore', 'MF Tractors, Cheyyar']}
              className="!h-9 !text-[12px] !bg-white/10 !border-white/15 !text-white !rounded-full !pl-8" />
            <IconBuilding size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
        </div>
      </ScreenHero>

      <ScreenBlock className="-mt-4 pt-2">
        <Screen>
          <div className="grid grid-cols-2 gap-2.5">
            {KPIS.map((k, i) => (
              <Card key={i} className="p-3.5">
                <p className="text-[11px] text-ink-muted leading-snug">{k.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[26px] font-bold text-navy tabnums leading-none">{k.value}</span>
                  <span className={cx('text-[10px] font-semibold', k.trend === 'up' ? 'text-good' : 'text-ink-faint')}>
                    {k.trend === 'up' && <IconArrowUp size={10} className="inline" />} {k.delta}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Screen>
      </ScreenBlock>

      <ScreenBlock className="pt-2">
        <Screen className="space-y-3">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <h3 className="font-semibold text-[15px] text-navy flex items-center gap-1.5">
                <IconFlag size={15} className="text-brand-red" /> Flagged
              </h3>
              <Badge tone="warn">{FLAGGED.length}</Badge>
            </div>
            <div className="divide-y divide-line max-h-[280px] overflow-y-auto">
              {FLAGGED.map((row, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] text-ink truncate">{row.farmer}</p>
                    <p className="text-[12px] text-ink-muted truncate">{row.reason}</p>
                    <p className="text-[10px] text-ink-faint mt-0.5">DSP {row.dsp} · {row.time}</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={openAudit}>Review</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-end justify-between mb-1">
              <h3 className="font-semibold text-[15px] text-navy flex items-center gap-1.5">
                <IconChart size={15} /> Top models
              </h3>
              <span className="text-[10px] text-ink-faint tabnums">{total} total</span>
            </div>
            <p className="text-[10px] text-ink-faint mb-3">{range.toLowerCase()} · % of recommendations</p>
            <div className="space-y-2.5">
              {MODEL_BARS.map((m, i) => {
                const pct = Math.round((m.count / total) * 100);
                const barPct = Math.max(8, (m.count / max) * 100);
                return (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 items-center">
                    <span className="text-[12px] text-ink truncate">{m.model}</span>
                    <span className="text-[12px] font-bold text-navy tabnums">{m.count}</span>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-canvas rounded-full overflow-hidden">
                        <div className={cx('h-full rounded-full', i === 0 ? 'bg-brand-red' : 'bg-navy-600')}
                          style={{ width: barPct + '%' }} />
                      </div>
                      <span className="text-[10px] text-ink-faint tabnums w-7 text-right shrink-0">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Button variant="secondary" size="sm" onClick={() => nav('landing')} icon={<IconArrowLeft size={14} />}>Back to DSP Assistant</Button>
        </Screen>
      </ScreenBlock>
    </>
  );
}

Object.assign(window, { ScreenCompare, ScreenDashboard });
