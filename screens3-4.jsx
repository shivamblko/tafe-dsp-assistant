/* ============================================================
   Screen 3 - Recommendations   |   Screen 4 - Pitch Generator
   ============================================================ */

function ConfidenceWithInfo({ score }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-1 shrink-0">
      <ConfidenceBadge score={score} />
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="text-ink-faint hover:text-navy transition"
        aria-label="How is the match score calculated?">
        <IconInfo size={13} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-30 w-56 px-3 py-2.5 rounded-xl bg-navy text-white text-[11px] leading-relaxed shadow-pop">
          {MATCH_INFO}
        </div>
      )}
    </div>
  );
}

function RecCard({ m, nav, setSelected, primary, checked, onCheck }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cx(
      'relative bg-white rounded-[var(--radius-card)] shadow-card overflow-hidden flex flex-col transition-all duration-200',
      checked ? 'ring-2 ring-navy shadow-lift' : primary ? 'ring-2 ring-brand-red/20' : 'ring-2 ring-transparent'
    )}>
      {/* ── Checkbox ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onCheck && onCheck(); }}
        className={cx(
          'absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full border-2 grid place-items-center transition-all duration-200',
          checked ? 'bg-navy border-navy' : 'bg-white/90 border-line hover:border-navy/40'
        )}>
        {checked && <IconCheck size={11} className="text-white" />}
      </button>

      {/* ── Banner: always rendered so all cards align at the same top position ── */}
      <div className={cx(
        'py-1.5 text-[10px] font-semibold tracking-wide flex items-center justify-center gap-1 shrink-0',
        primary ? 'bg-navy text-white' : 'bg-white text-transparent select-none pointer-events-none'
      )}>
        <IconSparkles size={11} className={primary ? 'text-brand-red' : 'opacity-0'} />
        Top match
      </div>

      {/* ── Fixed-height image container ── */}
      <div className="px-3 pt-2 pb-1 h-[148px] flex items-center justify-center shrink-0 bg-white">
        <ModelImage src={m.img} alt={m.name} compact className="!bg-transparent w-full h-full" />
      </div>

      {/* ── Content: flex-col so buttons pin to bottom ── */}
      <div className="px-4 pb-4 pt-2 flex flex-col flex-1">

        {/* Name + score */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-ink-faint truncate">{m.series}</p>
            <h3 className="font-bold text-[16px] text-navy leading-tight">{m.name}</h3>
          </div>
          <ConfidenceWithInfo score={m.confidence} />
        </div>

        {/* Specs row */}
        <div className="flex items-end gap-0 mt-3 border-t border-line/50 pt-3">
          {[
            [m.specs.hp.split(' ')[0], 'HP'],
            [m.specs.cyl.split(' ')[0], 'Cyl'],
            [m.specs.lift.split(' ')[0], 'kg'],
          ].map(([v, unit], idx) => (
            <div key={unit} className={cx('flex-1', idx > 0 && 'border-l border-line/50 pl-3')}>
              <p className="text-[20px] font-bold text-navy tabnums leading-none">{v}</p>
              <p className="text-[10px] text-ink-faint mt-0.5 uppercase tracking-wide">{unit}</p>
            </div>
          ))}
        </div>

        {/* Implements — fixed min-height so all cards have consistent zone */}
        <div className="flex flex-wrap gap-1 mt-3 min-h-[44px] content-start">
          {m.implements.slice(0, 3).map((im) => (
            <span key={im} className="px-2 py-0.5 rounded-full bg-canvas border border-line/60 text-[11px] text-ink font-medium">{im}</span>
          ))}
          {m.implements.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-canvas border border-line/60 text-[11px] text-ink-faint font-medium">+{m.implements.length - 3}</span>
          )}
        </div>

        {/* Why this model accordion */}
        <details open={open} onToggle={(e) => setOpen(e.target.open)} className="mt-3 group">
          <summary className="flex items-center justify-between py-1.5 text-[13px] font-semibold text-navy cursor-pointer">
            <span className="flex items-center gap-1"><IconSparkles size={13} className="text-brand-red" /> Why this model</span>
            <IconChevronDown size={14} className={cx('text-ink-faint transition-transform duration-200', open && 'rotate-180')} />
          </summary>
          <ul className="pb-1 space-y-1.5">
            {m.rationale.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[12px] text-ink-muted leading-snug">
                <IconCheckCircle size={13} className="text-good mt-0.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </details>

        {/* CTA buttons — pushed to bottom of card */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-3">
          <Button variant="red" size="sm" onClick={() => { setSelected(m); nav('pitch'); }}>Pitch</Button>
          <Button variant="secondary" size="sm" onClick={() => { setSelected(m); nav('compare'); }}>Compare</Button>
        </div>
      </div>
    </div>
  );
}

function ScreenRecommend({ nav, setSelected, openAudit }) {
  const [checkedIds, setCheckedIds] = useState([MODELS[0].id]);
  const [flagged, setFlagged] = useState(false);
  const toast = useToast();

  const toggleCheck = (id) => setCheckedIds((prev) =>
    prev.includes(id)
      ? prev.length > 1 ? prev.filter((x) => x !== id) : prev   // keep at least 1 checked
      : [...prev, id]
  );

  const primaryModel = MODELS.find((m) => checkedIds.includes(m.id)) || MODELS[0];

  return (
    <>
      <ScreenHero>
        <SectionHead
          eyebrow="Step 2"
          title="Three models. One clear winner."
          subtitle="Matched for Suresh Patel · 8 acres · Paddy & Sugarcane · Tiruvannamalai."
          compact
          trailing={<AuditButton onClick={openAudit} className="shrink-0" />}
        />
      </ScreenHero>

      <ScreenBlock className="pt-2 pb-4">
        <div className="px-[var(--gutter)] max-w-[920px] mx-auto">
          <div className="grid grid-cols-3 gap-3">
            {MODELS.map((m, i) => (
              <RecCard key={m.id} m={m} nav={nav} setSelected={setSelected} primary={i === 0}
                checked={checkedIds.includes(m.id)}
                onCheck={() => toggleCheck(m.id)} />
            ))}
          </div>
        </div>
      </ScreenBlock>

      <ScreenBlock className="pt-0">
        <Screen>
          <Card flat className="p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] text-ink-faint">{checkedIds.length > 1 ? `${checkedIds.length} selected` : 'Selected'}</p>
              <p className="text-[15px] font-bold text-navy truncate">{primaryModel.name}</p>
            </div>
            <Button variant="red" size="sm" onClick={() => { setSelected(primaryModel); nav('pitch'); }} iconRight={<IconArrowRight size={14} />}>
              Generate pitch
            </Button>
          </Card>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px]">
            <button onClick={() => nav('profile')} className="inline-flex items-center gap-1.5 text-ink-muted hover:text-navy font-medium">
              <IconUser size={14} /> Edit profile
            </button>
            <button onClick={() => { setFlagged(true); toast('Recommendation flagged for review', { sub: 'Your sales manager will be notified.' }); }}
              className={cx('inline-flex items-center gap-1.5 font-medium', flagged ? 'text-warn' : 'text-ink-muted hover:text-brand-red')}>
              <IconFlag size={14} /> {flagged ? 'Flagged' : 'Flag for review'}
            </button>
          </div>
        </Screen>
      </ScreenBlock>
    </>
  );
}

const LANGS = ['English', 'Hindi', 'Hinglish'];

/* \u2500\u2500 Structured pitch content per model \u00D7 language \u2500\u2500 */
const PITCH_CONTENT = {
  mf254: {
    Hinglish: {
      hook: "Suresh ji, aapke paddy aur sugarcane ke liye humne sabse sahi tractor dhundha \u2014 aur ye raha.",
      why: [
        { text: "Harvest time pe khet mein kabhi nahi atakenge \u2014 DT (Dual Traction) ka matlab hai, geela paddy field ho ya kaadha, tractor poori grip ke saath chalega. Peak season mein ek ghante ki bhi delay nahi hogi.", benefit: "No stalling at harvest" },
        { text: "Ek trip mein 200 KG zyada load \u2014 John Deere 5050D ki tulna mein 1800 KG lift matlab har trolley mein zyada maal, kam trips, diesel ki bachaat. Ek season mein \u20B98,000\u201310,000 tak ka farak pad sakta hai.", benefit: "\u20B98\u201310K annual saving" },
        { text: "Tiruvannamalai mein 500+ Massey owners ka matlab \u2014 agar kuch bhi ho, kal subah repair ho jaayega. Aapka harvest wait nahi karega. John Deere ka koi local mechanic nahi hai yahan.", benefit: "Same-day service" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Powerful engine' },
        { val: '1800 KG', desc: 'Lift capacity' },
        { val: '4WD DT', desc: 'Dual Traction' },
        { val: '500+', desc: 'Local owners' },
      ],
      vs: {
        label: "John Deere 5050D se behtar kyun hai?",
        rows: [
          { attr: "Lift per trip", ours: "1800 kg \u2191", theirs: "1600 kg", win: true, note: "10% more load per trip" },
          { attr: "Fuel cost/season", ours: "12% less", theirs: "Higher", win: true, note: "~\u20B98K annual savings" },
          { attr: "4WD included", ours: "Free (standard)", theirs: "Pay extra \u20B935K+", win: true, note: "No hidden cost" },
          { attr: "Local service", ours: "500+ owners", theirs: "Limited network", win: true, note: "Same-day repairs" },
        ],
      },
      finance: { label: "HDFC Special Finance Offer", detail: "8.5% p.a. \u00B7 Zero down payment for existing TAFE customers \u00B7 Same-day loan approval \u00B7 EMI from \u20B99,200/month" },
      social: "Tiruvannamalai district mein is saal 38 farmers ne yahi model choose kiya \u2014 mostly paddy + sugarcane farms.",
      cta: "Ek demo book karein? Hum aapke khet par hi leke aayenge.",
    },
    Hindi: {
      hook: "\u0938\u0941\u0930\u0947\u0936 \u091C\u0940, \u0906\u092A\u0915\u0947 \u0927\u093E\u0928 \u0914\u0930 \u0917\u0928\u094D\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0939\u092E\u0928\u0947 \u0938\u092C\u0938\u0947 \u0938\u0939\u0940 \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 \u0922\u0942\u0902\u0922\u093E \u2014 \u0914\u0930 \u092F\u0939 \u0930\u0939\u093E\u0964",
      why: [
        { text: "\u092B\u093C\u0938\u0932 \u0915\u091F\u093E\u0908 \u0915\u0947 \u0935\u0915\u094D\u0924 \u0916\u0947\u0924 \u092E\u0947\u0902 \u0915\u092D\u0940 \u0928\u0939\u0940\u0902 \u0905\u091F\u0915\u0947\u0902\u0917\u0947 \u2014 DT (Dual Traction) \u092F\u093E\u0928\u0940 \u0917\u0940\u0932\u093E \u0927\u093E\u0928 \u0915\u093E \u0916\u0947\u0924 \u0939\u094B \u092F\u093E \u0915\u0940\u091A\u0921\u093C, \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 \u092A\u0942\u0930\u0940 \u092A\u0915\u0921\u093C \u0915\u0947 \u0938\u093E\u0925 \u091A\u0932\u0947\u0917\u093E\u0964 \u092A\u0940\u0915 \u0938\u0940\u091C\u093C\u0928 \u092E\u0947\u0902 \u090F\u0915 \u0918\u0902\u091F\u0947 \u0915\u0940 \u092D\u0940 \u0926\u0947\u0930\u0940 \u0928\u0939\u0940\u0902 \u0939\u094B\u0917\u0940\u0964", benefit: "\u092C\u093F\u0928\u093E \u0930\u0941\u0915\u093E\u0935\u091F \u0915\u093E\u092E" },
        { text: "\u090F\u0915 \u091F\u094D\u0930\u093F\u092A \u092E\u0947\u0902 200 KG \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0932\u094B\u0921 \u2014 John Deere 5050D \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u092E\u0947\u0902 1800 KG \u0932\u093F\u092B\u094D\u091F \u092F\u093E\u0928\u0940 \u0939\u0930 \u091F\u094D\u0930\u0949\u0932\u0940 \u092E\u0947\u0902 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u092E\u093E\u0932, \u0915\u092E \u091F\u094D\u0930\u093F\u092A\u094D\u0938, \u0921\u0940\u091C\u093C\u0932 \u0915\u0940 \u092C\u091A\u0924\u0964 \u090F\u0915 \u0938\u0940\u091C\u093C\u0928 \u092E\u0947\u0902 \u20B98,000\u201310,000 \u0924\u0915 \u0915\u093E \u092B\u0930\u094D\u0915\u0964", benefit: "\u20B98\u201310K \u0938\u093E\u0932\u093E\u0928\u093E \u092C\u091A\u0924" },
        { text: "\u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0908 \u092E\u0947\u0902 500+ Massey \u092E\u093E\u0932\u093F\u0915 \u2014 \u0905\u0917\u0930 \u0915\u0941\u091B \u092D\u0940 \u0939\u094B, \u0915\u0932 \u0938\u0941\u092C\u0939 \u0920\u0940\u0915 \u0939\u094B \u091C\u093E\u090F\u0917\u093E\u0964 \u0906\u092A\u0915\u0940 \u092B\u093C\u0938\u0932 \u0907\u0902\u0924\u091C\u093C\u093E\u0930 \u0928\u0939\u0940\u0902 \u0915\u0930\u0947\u0917\u0940\u0964 John Deere \u0915\u093E \u092F\u0939\u093E\u0901 \u0915\u094B\u0908 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092E\u0948\u0915\u0947\u0928\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964", benefit: "\u0909\u0938\u0940 \u0926\u093F\u0928 \u0938\u0930\u094D\u0935\u093F\u0938" },
      ],
      highlights: [
        { val: '50 HP', desc: '\u0936\u0915\u094D\u0924\u093F\u0936\u093E\u0932\u0940 \u0907\u0902\u091C\u0928' },
        { val: '1800 KG', desc: '\u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E' },
        { val: '4WD DT', desc: '\u0921\u0941\u0905\u0932 \u091F\u094D\u0930\u0948\u0915\u094D\u0936\u0928' },
        { val: '500+', desc: '\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092E\u093E\u0932\u093F\u0915' },
      ],
      vs: {
        label: "John Deere 5050D \u0938\u0947 \u092C\u0947\u0939\u0924\u0930 \u0915\u094D\u092F\u094B\u0902 \u0939\u0948?",
        rows: [
          { attr: "\u092A\u094D\u0930\u0924\u093F \u091F\u094D\u0930\u093F\u092A \u0932\u094B\u0921", ours: "1800 kg \u2191", theirs: "1600 kg", win: true, note: "10% \u0905\u0927\u093F\u0915 \u0932\u094B\u0921" },
          { attr: "\u0908\u0902\u0927\u0928 \u0932\u093E\u0917\u0924/\u0938\u0940\u091C\u093C\u0928", ours: "12% \u0915\u092E", theirs: "\u0905\u0927\u093F\u0915", win: true, note: "~\u20B98K \u0938\u093E\u0932\u093E\u0928\u093E \u092C\u091A\u0924" },
          { attr: "4WD \u0936\u093E\u092E\u093F\u0932", ours: "\u092E\u0941\u092B\u093C\u094D\u0924 (standard)", theirs: "\u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u20B935K+", win: true, note: "\u0915\u094B\u0908 \u091B\u093F\u092A\u0940 \u0932\u093E\u0917\u0924 \u0928\u0939\u0940\u0902" },
          { attr: "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0938\u0930\u094D\u0935\u093F\u0938", ours: "500+ \u092E\u093E\u0932\u093F\u0915", theirs: "\u0938\u0940\u092E\u093F\u0924 \u0928\u0947\u091F\u0935\u0930\u094D\u0915", win: true, note: "\u0909\u0938\u0940 \u0926\u093F\u0928 \u092E\u0930\u092E\u094D\u092E\u0924" },
        ],
      },
      finance: { label: "HDFC \u0938\u094D\u092A\u0947\u0936\u0932 \u092B\u093E\u0907\u0928\u0947\u0902\u0938 \u0911\u092B\u0930", detail: "8.5% \u092A\u094D\u0930\u0924\u093F \u0935\u0930\u094D\u0937 \u00B7 \u092E\u094C\u091C\u0942\u0926\u093E TAFE \u0917\u094D\u0930\u093E\u0939\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0936\u0942\u0928\u094D\u092F \u0921\u093E\u0909\u0928 \u092A\u0947\u092E\u0947\u0902\u091F \u00B7 \u0909\u0938\u0940 \u0926\u093F\u0928 \u0932\u094B\u0928 \u0905\u0928\u0941\u092E\u094B\u0926\u0928 \u00B7 EMI \u20B99,200/\u092E\u093E\u0939 \u0938\u0947" },
      social: "\u0907\u0938 \u0938\u093E\u0932 \u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0908 \u091C\u093C\u093F\u0932\u0947 \u092E\u0947\u0902 38 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0928\u0947 \u092F\u0939\u0940 \u092E\u0949\u0921\u0932 \u091A\u0941\u0928\u093E \u2014 \u091C\u093C\u094D\u092F\u093E\u0926\u093E\u0924\u0930 \u0927\u093E\u0928 + \u0917\u0928\u094D\u0928\u0947 \u0915\u0940 \u0916\u0947\u0924\u0940 \u0935\u093E\u0932\u0947\u0964",
      cta: "\u090F\u0915 \u0921\u0947\u092E\u094B \u092C\u0941\u0915 \u0915\u0930\u0947\u0902? \u0939\u092E \u0906\u092A\u0915\u0947 \u0916\u0947\u0924 \u092A\u0930 \u0939\u0940 \u0932\u0947\u0915\u0930 \u0906\u090F\u0902\u0917\u0947\u0964",
    },
    English: {
      hook: "Suresh ji, we found the right tractor for your paddy and sugarcane farm \u2014 here's why.",
      why: [
        { text: "Never get stuck at harvest \u2014 Dual Traction (DT) means full grip in wet paddy fields and mud. No stalling during peak season when every hour counts.", benefit: "Zero stalling at harvest" },
        { text: "Carry 200 KG more per trip \u2014 1800 KG lift vs your John Deere's 1600 KG means more load per trolley, fewer trips, less diesel. That's a real \u20B98,000\u201310,000 difference every season.", benefit: "\u20B98\u201310K annual saving" },
        { text: "If something breaks, it's fixed by tomorrow \u2014 500+ Massey owners in Tiruvannamalai means same-day parts and mechanics. John Deere has no strong local network here. Your harvest won't wait.", benefit: "Same-day service" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Powerful engine' },
        { val: '1800 KG', desc: 'Lift capacity' },
        { val: '4WD DT', desc: 'Dual Traction' },
        { val: '500+', desc: 'Local owners' },
      ],
      vs: {
        label: "Why it beats the John Deere 5050D",
        rows: [
          { attr: "Load per trip", ours: "1800 kg \u2191", theirs: "1600 kg", win: true, note: "10% more per trip" },
          { attr: "Fuel cost/season", ours: "12% lower", theirs: "Higher", win: true, note: "~\u20B98K annual savings" },
          { attr: "4WD included", ours: "Free (standard)", theirs: "Pay \u20B935K+ extra", win: true, note: "No hidden cost" },
          { attr: "Local service", ours: "500+ owners", theirs: "Limited network", win: true, note: "Same-day repairs" },
        ],
      },
      finance: { label: "HDFC Special Finance Offer", detail: "8.5% p.a. \u00B7 Zero down payment for existing TAFE customers \u00B7 Same-day loan approval \u00B7 EMI from \u20B99,200/month" },
      social: "38 farmers in Tiruvannamalai district chose this model this year \u2014 mostly paddy + sugarcane farms just like yours.",
      cta: "Book a demo \u2014 we'll bring it to your field.",
    },
  },
  mf7250: {
    Hinglish: {
      hook: "Suresh ji, aapki mixed kheti ke liye MF 7250 PowerUp \u2014 kam kharcha, zyada kaam.",
      why: [
        { text: "Sugarcane haulage mein engine pe koi zyada baar nahi padega \u2014 PowerUp ka high torque backup matlab bhari trolley bhi smooth chalegi, engine strain nahi hoga. Long term engine life better hoti hai.", benefit: "Engine lasts longer" },
        { text: "8 acre mixed crop pe diesel bill noticeable kam hoga \u2014 2 cylinder engine 3 cylinder se zyada fuel efficient hoti hai daily operations mein. Season mein \u20B95,000\u20137,000 tak ka farak.", benefit: "~\u20B95\u20137K fuel savings" },
        { text: "Massey ka PowerUp platform Tiruvannamalai mein trusted hai \u2014 parts aur mechanics asaani se milte hain, aur ye tractor yahan ke kisan pehle se use kar rahe hain.", benefit: "Proven locally" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Torque-rich' },
        { val: '1600 KG', desc: 'Lift capacity' },
        { val: '2 CYL', desc: 'Fuel efficient' },
        { val: '92%', desc: 'Match score' },
      ],
      vs: {
        label: "Top match (MF 254 DT) se alag kyun choose karein?",
        rows: [
          { attr: "Daily fuel cost", ours: "Lower \u2193", theirs: "Higher", win: true, note: "2 CYL vs 3 CYL" },
          { attr: "Torque for haulage", ours: "Higher", theirs: "Standard", win: true, note: "Better for sugarcane" },
          { attr: "Lift capacity", ours: "1600 kg", theirs: "1800 kg", win: false, note: "200 KG less" },
          { attr: "Long-term cost", ours: "Lower", theirs: "Higher", win: true, note: "Simpler engine" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC aur TAFE Finance dono options available \u2014 current EMI aur rate ke liye dealership se milein" },
      social: "Mixed crop farmers jo haulage zyada karte hain, unke liye ye model consistently recommend hota hai Tiruvannamalai mein.",
      cta: "Demo ke liye ready hain? Ek call karein.",
    },
    Hindi: {
      hook: "\u0938\u0941\u0930\u0947\u0936 \u091C\u0940, \u0906\u092A\u0915\u0940 \u092E\u093F\u0936\u094D\u0930\u093F\u0924 \u0916\u0947\u0924\u0940 \u0915\u0947 \u0932\u093F\u090F MF 7250 PowerUp \u2014 \u0915\u092E \u0916\u0930\u094D\u091A, \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0915\u093E\u092E\u0964",
      why: [
        { text: "\u0917\u0928\u094D\u0928\u093E \u0922\u0941\u0932\u093E\u0908 \u092E\u0947\u0902 \u0907\u0902\u091C\u0928 \u092A\u0930 \u0915\u094B\u0908 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u092C\u094B\u091D \u0928\u0939\u0940\u0902 \u2014 PowerUp \u0915\u093E high torque backup \u092F\u093E\u0928\u0940 \u092D\u0930\u0940 \u091F\u094D\u0930\u0949\u0932\u0940 \u092D\u0940 smooth \u091A\u0932\u0947\u0917\u0940, \u0907\u0902\u091C\u0928 \u092A\u0930 strain \u0928\u0939\u0940\u0902\u0964 \u0932\u0902\u092C\u0947 \u0938\u092E\u092F \u092E\u0947\u0902 \u0907\u0902\u091C\u0928 \u0915\u0940 life \u092C\u0947\u0939\u0924\u0930 \u0930\u0939\u0924\u0940 \u0939\u0948\u0964", benefit: "\u0907\u0902\u091C\u0928 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u091F\u093F\u0915\u093E\u090A" },
        { text: "8 \u090F\u0915\u0921\u093C \u092E\u093F\u0936\u094D\u0930\u093F\u0924 \u092B\u0938\u0932 \u092A\u0930 \u0921\u0940\u091C\u093C\u0932 \u092C\u093F\u0932 \u0915\u092E \u0939\u094B\u0917\u093E \u2014 2 cylinder \u0907\u0902\u091C\u0928 \u0930\u094B\u091C\u093C \u0915\u0940 operations \u092E\u0947\u0902 3 cylinder \u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E fuel efficient \u0939\u094B\u0924\u0940 \u0939\u0948\u0964 \u0938\u0940\u091C\u093C\u0928 \u092E\u0947\u0902 \u20B95,000\u20137,000 \u0924\u0915 \u0915\u093E \u092B\u0930\u094D\u0915\u0964", benefit: "~\u20B95\u20137K \u0908\u0902\u0927\u0928 \u092C\u091A\u0924" },
        { text: "\u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0908 \u092E\u0947\u0902 Massey \u0915\u093E PowerUp platform trusted \u0939\u0948 \u2014 \u092A\u093E\u0930\u094D\u091F\u094D\u0938 \u0914\u0930 \u092E\u0948\u0915\u0947\u0928\u093F\u0915 \u0906\u0938\u093E\u0928\u0940 \u0938\u0947 \u092E\u093F\u0932\u0924\u0947 \u0939\u0948\u0902, \u092F\u0939\u093E\u0901 \u0915\u0947 \u0915\u093F\u0938\u093E\u0928 \u092A\u0939\u0932\u0947 \u0938\u0947 \u092F\u0939 \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 use \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964", benefit: "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u092A\u094D\u0930\u092E\u093E\u0923\u093F\u0924" },
      ],
      highlights: [
        { val: '50 HP', desc: '\u091F\u0949\u0930\u094D\u0915-\u0930\u093F\u091A' },
        { val: '1600 KG', desc: '\u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E' },
        { val: '2 CYL', desc: '\u0908\u0902\u0927\u0928 \u0915\u0941\u0936\u0932' },
        { val: '92%', desc: '\u092E\u0948\u091A \u0938\u094D\u0915\u094B\u0930' },
      ],
      vs: {
        label: "Top match (MF 254 DT) \u0915\u0940 \u091C\u0917\u0939 \u092F\u0939 \u0915\u094D\u092F\u094B\u0902?",
        rows: [
          { attr: "\u0930\u094B\u091C\u093C \u0915\u0940 fuel cost", ours: "\u0915\u092E \u2193", theirs: "\u0905\u0927\u093F\u0915", win: true, note: "2 CYL vs 3 CYL" },
          { attr: "\u0922\u0941\u0932\u093E\u0908 \u0915\u0947 \u0932\u093F\u090F torque", ours: "\u0905\u0927\u093F\u0915", theirs: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F", win: true, note: "\u0917\u0928\u094D\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092C\u0947\u0939\u0924\u0930" },
          { attr: "\u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E", ours: "1600 kg", theirs: "1800 kg", win: false, note: "200 KG \u0915\u092E" },
          { attr: "\u0926\u0940\u0930\u094D\u0918\u0915\u093E\u0932\u093F\u0915 \u0932\u093E\u0917\u0924", ours: "\u0915\u092E", theirs: "\u0905\u0927\u093F\u0915", win: true, note: "\u0938\u0930\u0932 \u0907\u0902\u091C\u0928" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC \u0914\u0930 TAFE Finance \u0926\u094B\u0928\u094B\u0902 \u0909\u092A\u0932\u092C\u094D\u0927 \u2014 current EMI \u0914\u0930 rate \u0915\u0947 \u0932\u093F\u090F \u0921\u0940\u0932\u0930\u0936\u093F\u092A \u0938\u0947 \u092E\u093F\u0932\u0947\u0902" },
      social: "\u092E\u093F\u0936\u094D\u0930\u093F\u0924 \u092B\u0938\u0932 \u0935\u093E\u0932\u0947 \u0915\u093F\u0938\u093E\u0928 \u091C\u094B \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0922\u0941\u0932\u093E\u0908 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0909\u0928\u0915\u0947 \u0932\u093F\u090F \u092F\u0939 \u092E\u0949\u0921\u0932 \u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0908 \u092E\u0947\u0902 consistently recommend \u0939\u094B\u0924\u093E \u0939\u0948\u0964",
      cta: "\u0921\u0947\u092E\u094B \u0915\u0947 \u0932\u093F\u090F \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0902? \u090F\u0915 call \u0915\u0930\u0947\u0902\u0964",
    },
    English: {
      hook: "Suresh ji, the MF 7250 PowerUp \u2014 lower running cost, built for your mixed farm.",
      why: [
        { text: "No engine strain on sugarcane haulage \u2014 the PowerUp's high torque backup means heavy trolleys move smoothly without pushing the engine hard. Better long-term engine life.", benefit: "Engine lasts longer" },
        { text: "Meaningfully lower diesel bill \u2014 a 2-cylinder engine is more fuel efficient in daily farm operations than a 3-cylinder. That's \u20B95,000\u20137,000 less every season on 8 acres.", benefit: "~\u20B95\u20137K fuel savings" },
        { text: "Proven platform in Tiruvannamalai \u2014 farmers in this district already use and trust the PowerUp. Parts and mechanics are easy to find.", benefit: "Proven locally" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Torque-rich' },
        { val: '1600 KG', desc: 'Lift capacity' },
        { val: '2 CYL', desc: 'Fuel efficient' },
        { val: '92%', desc: 'Match score' },
      ],
      vs: {
        label: "Why choose this over the top match (MF 254 DT)?",
        rows: [
          { attr: "Daily fuel cost", ours: "Lower \u2193", theirs: "Higher", win: true, note: "2 CYL vs 3 CYL" },
          { attr: "Torque for haulage", ours: "Higher", theirs: "Standard", win: true, note: "Better for sugarcane" },
          { attr: "Lift capacity", ours: "1600 kg", theirs: "1800 kg", win: false, note: "200 KG less" },
          { attr: "Long-term cost", ours: "Lower", theirs: "Higher", win: true, note: "Simpler engine" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC and TAFE Finance both available \u2014 visit dealership for current EMI and rate" },
      social: "Mixed-crop farmers who do heavy haulage consistently choose this model across Tiruvannamalai district.",
      cta: "Ready for a demo? One call does it.",
    },
  },
  mf246: {
    Hinglish: {
      hook: "Suresh ji, budget mein best value DT tractor \u2014 aur iska matlab hai long term mein aap sabse zyada bachate hain.",
      why: [
        { text: "3 cylinder engine ka matlab future mein bhi tension nahi \u2014 parts saste, mechanics asaani se milte hain, aur koi complicated electronics nahi. 10 saal baad bhi service aasaan rahega.", benefit: "Low lifetime cost" },
        { text: "4WD alag se nahi khareedna padega \u2014 MF 246 DT mein 4WD standard hai. John Deere ya doosre tractors mein ye option ke liye \u20B935,000\u201340,000 zyada lagte hain. Aapko same khet performance mil raha hai.", benefit: "Save \u20B935\u201340K upfront" },
        { text: "Aapke teeno zaroori implements directly fit hote hain \u2014 Seed Drill, MB Plough, Cage Wheel sabhi compatible hain. Koi extra adapter ya modification nahi lagega.", benefit: "Zero add-on cost" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Reliable engine' },
        { val: '1600 KG', desc: 'Lift capacity' },
        { val: '3 CYL', desc: 'Easy maintenance' },
        { val: '88%', desc: 'Match score' },
      ],
      vs: {
        label: "John Deere 5050D se behtar kyun hai?",
        rows: [
          { attr: "On-road price", ours: "\u20B91.2L lower", theirs: "Higher", win: true, note: "Indicative" },
          { attr: "4WD cost", ours: "Included free", theirs: "\u20B935K+ extra", win: true, note: "Big saving" },
          { attr: "Parts & service", ours: "Simple & cheap", theirs: "Complex & costly", win: true, note: "3 CYL advantage" },
          { attr: "Lift capacity", ours: "1600 kg", theirs: "1600 kg", win: false, note: "Same" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC aur TAFE Finance dono available \u2014 zero processing fee aur low EMI ke liye dealership se baat karein" },
      social: "Pehli baar tractor lene waale farmers ke liye Tiruvannamalai mein yahi model sabse zyada recommend hota hai.",
      cta: "Ek demo lete hain? Khet pe hi dikhayenge.",
    },
    Hindi: {
      hook: "\u0938\u0941\u0930\u0947\u0936 \u091C\u0940, \u092C\u091C\u091F \u092E\u0947\u0902 \u0938\u092C\u0938\u0947 \u0905\u091A\u094D\u091B\u093E DT \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 \u2014 \u0914\u0930 \u0907\u0938\u0915\u093E \u092E\u0924\u0932\u092C \u0939\u0948, \u0932\u0902\u092C\u0947 \u0938\u092E\u092F \u092E\u0947\u0902 \u0906\u092A \u0938\u092C\u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u092C\u091A\u093E\u0924\u0947 \u0939\u0948\u0902\u0964",
      why: [
        { text: "3 cylinder \u0907\u0902\u091C\u0928 \u0915\u093E \u092E\u0924\u0932\u092C \u092D\u0935\u093F\u0937\u094D\u092F \u092E\u0947\u0902 \u092D\u0940 \u0915\u094B\u0908 tension \u0928\u0939\u0940\u0902 \u2014 \u092A\u093E\u0930\u094D\u091F\u094D\u0938 \u0938\u0938\u094D\u0924\u0947, \u092E\u0948\u0915\u0947\u0928\u093F\u0915 \u0906\u0938\u093E\u0928\u0940 \u0938\u0947 \u092E\u093F\u0932\u0924\u0947 \u0939\u0948\u0902, \u0915\u094B\u0908 \u091C\u091F\u093F\u0932 electronics \u0928\u0939\u0940\u0902\u0964 10 \u0938\u093E\u0932 \u092C\u093E\u0926 \u092D\u0940 service \u0906\u0938\u093E\u0928 \u0930\u0939\u0947\u0917\u0940\u0964", benefit: "\u0915\u092E lifetime cost" },
        { text: "4WD \u0905\u0932\u0917 \u0938\u0947 \u0928\u0939\u0940\u0902 \u0916\u0930\u0940\u0926\u0928\u093E \u092A\u0921\u093C\u0947\u0917\u093E \u2014 MF 246 DT \u092E\u0947\u0902 4WD standard \u0939\u0948\u0964 John Deere \u092F\u093E \u0926\u0942\u0938\u0930\u0947 tractors \u092E\u0947\u0902 \u092F\u0939 option \u0915\u0947 \u0932\u093F\u090F \u20B935,000\u201340,000 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0932\u0917\u0924\u0947 \u0939\u0948\u0902\u0964 \u0906\u092A\u0915\u094B same khet performance \u092E\u093F\u0932 \u0930\u0939\u093E \u0939\u0948\u0964", benefit: "\u20B935\u201340K \u0915\u0940 \u092C\u091A\u0924" },
        { text: "\u0906\u092A\u0915\u0947 \u0924\u0940\u0928\u094B\u0902 \u091C\u093C\u0930\u0942\u0930\u0940 implements directly fit \u0939\u094B\u0924\u0947 \u0939\u0948\u0902 \u2014 Seed Drill, MB Plough, Cage Wheel \u0938\u092D\u0940 compatible \u0939\u0948\u0902\u0964 \u0915\u094B\u0908 extra adapter \u092F\u093E modification \u0928\u0939\u0940\u0902 \u0932\u0917\u0947\u0917\u093E\u0964", benefit: "\u0915\u094B\u0908 add-on cost \u0928\u0939\u0940\u0902" },
      ],
      highlights: [
        { val: '50 HP', desc: '\u0935\u093F\u0936\u094D\u0935\u0938\u0928\u0940\u092F \u0907\u0902\u091C\u0928' },
        { val: '1600 KG', desc: '\u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E' },
        { val: '3 CYL', desc: '\u0906\u0938\u093E\u0928 \u0930\u0916\u0930\u0916\u093E\u0935' },
        { val: '88%', desc: '\u092E\u0948\u091A \u0938\u094D\u0915\u094B\u0930' },
      ],
      vs: {
        label: "John Deere 5050D \u0938\u0947 \u092C\u0947\u0939\u0924\u0930 \u0915\u094D\u092F\u094B\u0902 \u0939\u0948?",
        rows: [
          { attr: "\u0911\u0928-\u0930\u094B\u0921 \u0915\u0940\u092E\u0924", ours: "\u20B91.2L \u0915\u092E", theirs: "\u0905\u0927\u093F\u0915", win: true, note: "\u0938\u093E\u0902\u0915\u0947\u0924\u093F\u0915" },
          { attr: "4WD \u0932\u093E\u0917\u0924", ours: "\u092E\u0941\u092B\u093C\u094D\u0924 \u0936\u093E\u092E\u093F\u0932", theirs: "\u20B935K+ \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924", win: true, note: "\u092C\u0921\u093C\u0940 \u092C\u091A\u0924" },
          { attr: "\u092A\u093E\u0930\u094D\u091F\u094D\u0938 \u0914\u0930 \u0938\u0930\u094D\u0935\u093F\u0938", ours: "\u0938\u0930\u0932 \u0914\u0930 \u0938\u0938\u094D\u0924\u0947", theirs: "\u091C\u091F\u093F\u0932 \u0914\u0930 \u092E\u0939\u0902\u0917\u0947", win: true, note: "3 CYL \u092B\u093C\u093E\u092F\u0926\u093E" },
          { attr: "\u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E", ours: "1600 kg", theirs: "1600 kg", win: false, note: "\u092C\u0930\u093E\u092C\u0930" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC \u0914\u0930 TAFE Finance \u0926\u094B\u0928\u094B\u0902 \u0909\u092A\u0932\u092C\u094D\u0927 \u2014 zero processing fee \u0914\u0930 low EMI \u0915\u0947 \u0932\u093F\u090F \u0921\u0940\u0932\u0930\u0936\u093F\u092A \u0938\u0947 \u092C\u093E\u0924 \u0915\u0930\u0947\u0902" },
      social: "\u092A\u0939\u0932\u0940 \u092C\u093E\u0930 \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 \u0932\u0947\u0928\u0947 \u0935\u093E\u0932\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0908 \u092E\u0947\u0902 \u092F\u0939\u0940 \u092E\u0949\u0921\u0932 \u0938\u092C\u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E recommend \u0939\u094B\u0924\u093E \u0939\u0948\u0964",
      cta: "\u090F\u0915 \u0921\u0947\u092E\u094B \u0932\u0947\u0924\u0947 \u0939\u0948\u0902? \u0916\u0947\u0924 \u092A\u0930 \u0939\u0940 \u0926\u093F\u0916\u093E\u090F\u0902\u0917\u0947\u0964",
    },
    English: {
      hook: "Suresh ji, the best-value DT tractor in the budget range \u2014 and that means you save the most over time.",
      why: [
        { text: "No worries about maintenance in 10 years either \u2014 3-cylinder engine means cheap parts, easy-to-find mechanics, no complex electronics. Simple to own and service for the long haul.", benefit: "Low lifetime cost" },
        { text: "4WD at no extra cost \u2014 it's standard on the MF 246 DT. Other tractors charge \u20B935,000\u201340,000 extra for 4WD. You get the same field performance without the hidden cost.", benefit: "Save \u20B935\u201340K upfront" },
        { text: "All three implements you need fit directly \u2014 Seed Drill, MB Plough, and Cage Wheel are all compatible. No adaptors, no modifications, no extra spend.", benefit: "Zero add-on cost" },
      ],
      highlights: [
        { val: '50 HP', desc: 'Reliable engine' },
        { val: '1600 KG', desc: 'Lift capacity' },
        { val: '3 CYL', desc: 'Easy maintenance' },
        { val: '88%', desc: 'Match score' },
      ],
      vs: {
        label: "Why it beats the John Deere 5050D",
        rows: [
          { attr: "On-road price", ours: "~\u20B91.2L lower", theirs: "Higher", win: true, note: "Indicative" },
          { attr: "4WD cost", ours: "Included free", theirs: "\u20B935K+ extra", win: true, note: "Big saving" },
          { attr: "Parts & service", ours: "Simple & cheap", theirs: "Complex & costly", win: true, note: "3 CYL advantage" },
          { attr: "Lift capacity", ours: "1600 kg", theirs: "1600 kg", win: false, note: "Same" },
        ],
      },
      finance: { label: "Finance Available", detail: "HDFC and TAFE Finance both available \u2014 ask for zero processing fee and low EMI at the dealership" },
      social: "The most recommended model for first-time buyers across Tiruvannamalai district.",
      cta: "Book a demo \u2014 we'll bring it to your field.",
    },
  },
};

function getPitch(model, lang) {
  return PITCH_CONTENT[model.id]?.[lang] || null;
}

function pitchToText(p, lang) {
  const why_label = lang === 'English' ? 'WHY THIS IS BETTER FOR YOU' : lang === 'Hindi' ? '\u092F\u0939 \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u092C\u0947\u0939\u0924\u0930 \u0915\u094D\u092F\u094B\u0902 \u0939\u0948' : 'YE AAPKE LIYE BEHTAR KYUN HAI';
  return [
    p.hook, '',
    why_label,
    ...p.why.map(w => '\u2022 ' + (w.text || w) + (w.benefit ? ' [' + w.benefit + ']' : '')), '',
    p.vs.label + ':',
    ...p.vs.rows.map(r => `  ${r.attr}: ${r.ours} vs ${r.theirs}${r.note ? ' ('+r.note+')' : ''}`), '',
    p.finance.label + ': ' + p.finance.detail, '',
    p.social ? p.social + '\n' : '',
    p.cta,
  ].join('\n');
}

function makePitch(model, lang) {
  if (model.id === 'mf254') return PITCHES[lang];
  const t = {
    Hinglish: `Suresh ji, aapke 8 acre paddy aur sugarcane kheti ke liye ${model.name} ek strong choice hai. ${model.specs.hp} engine aur ${model.specs.lift} lift capacity aapke John Deere 5050D ke saamne competitive hai. Tiruvannamalai mein Massey ka service network strong hai. HDFC finance offer available hai. Demo book karein?`,
    Hindi: `\u0938\u0941\u0930\u0947\u0936 \u091C\u0940, \u0906\u092A\u0915\u0947 8 \u090F\u0915\u0921\u093C \u0927\u093E\u0928 \u0914\u0930 \u0917\u0928\u094D\u0928\u0947 \u0915\u0940 \u0916\u0947\u0924\u0940 \u0915\u0947 \u0932\u093F\u090F ${model.name} \u090F\u0915 \u092E\u095B\u092C\u0942\u0924 \u0935\u093F\u0915\u0932\u094D\u092A \u0939\u0948\u0964 ${model.specs.hp} \u0907\u0902\u091C\u0928 \u0914\u0930 ${model.specs.lift} \u0932\u093F\u095E\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E \u0906\u092A\u0915\u0947 \u091C\u0949\u0928 \u0921\u093F\u092F\u0930 5050D \u0915\u0947 \u092E\u0941\u0915\u093C\u093E\u092C\u0932\u0947 \u092A\u094D\u0930\u0924\u093F\u0938\u094D\u092A\u0930\u094D\u0927\u0940 \u0939\u0948\u0964 \u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0948 \u092E\u0947\u0902 \u092E\u0948\u0938\u0940 \u0915\u093E \u0938\u0930\u094D\u0935\u093F\u0938 \u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u092E\u095B\u092C\u0942\u0924 \u0939\u0948\u0964 HDFC \u095E\u093E\u0907\u0928\u0947\u0902\u0938 \u0911\u095E\u0930 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0964 \u0921\u0947\u092E\u094B \u092C\u0941\u0915 \u0915\u0930\u0947\u0902?`,
    English: `Suresh ji, for your 8-acre paddy and sugarcane farm, the ${model.name} is a strong choice. Its ${model.specs.hp} engine and ${model.specs.lift} lift capacity are competitive against your John Deere 5050D. Massey's service network in Tiruvannamalai is strong, and an HDFC finance offer is available. Shall we book a demo?`,
  };
  return t[lang];
}

function ScreenPitch({ nav, selected, openAudit }) {
  const model = selected || MODELS[0];
  const [lang, setLang] = useState('Hinglish');
  const [regen, setRegen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const toast = useToast();
  const pitch = getPitch(model, lang);
  const text = pitch ? pitchToText(pitch, lang) : makePitch(model, lang);

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    toast('Pitch copied to clipboard');
  };
  const regenerate = () => {
    setRegen(true);
    setTimeout(() => setRegen(false), 1100);
  };
  const readAloud = () => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) { toast('Text-to-speech not available'); return; }
      if (speaking) { synth.cancel(); setSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'English' ? 'en-IN' : 'hi-IN';
      u.onend = () => setSpeaking(false);
      setSpeaking(true); synth.speak(u);
    } catch (e) { toast('Text-to-speech not available'); }
  };
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  return (
    <>
      <div className="product-stage flex items-center justify-center overflow-hidden" style={{ minHeight: '200px', maxHeight: '300px' }}>
        <img
          src={model.img}
          alt={model.name}
          className="w-auto object-contain"
          style={{ maxHeight: '280px', maxWidth: '100%' }}
        />
      </div>

      <ScreenBlock className="pt-3">
        <Screen>
          <div className="text-center mb-4">
            <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">Step 3 · Sales pitch</p>
            <h1 className="text-[22px] sm:text-[24px] font-bold text-navy tracking-tight">{model.name}</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <ConfidenceBadge score={model.confidence} />
              <AuditButton onClick={openAudit} />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="inline-flex p-0.5 rounded-full bg-canvas">
              {LANGS.map((l) => (
                <button key={l} onClick={() => { window.speechSynthesis?.cancel(); setSpeaking(false); setLang(l); }}
                  className={cx('px-4 h-8 rounded-full text-[12px] font-semibold transition-all',
                    lang === l ? 'bg-white text-navy shadow-sm' : 'text-ink-muted hover:text-navy')}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* ── Structured pitch ── */}
          <div key={lang} className="space-y-3 relative">
            {regen && (
              <div className="absolute inset-0 z-20 grid place-items-center bg-canvas/80 backdrop-blur-sm rounded-3xl">
                <div className="flex items-center gap-2 text-navy bg-white shadow-pop px-5 py-3 rounded-2xl">
                  <Spinner size={16} /> <span className="text-[13px] font-medium">Regenerating pitch…</span>
                </div>
              </div>
            )}

            {pitch ? (
              <>
                {/* Hook */}
                <div className="px-1">
                  <p className="text-[20px] sm:text-[22px] font-bold text-navy leading-snug tracking-tight">{pitch.hook}</p>
                </div>

                {/* Why it suits you */}
                <Card flat className="overflow-hidden">
                  <div className="px-4 py-2.5 bg-navy flex items-center gap-2 shrink-0">
                    <IconSparkles size={12} className="text-brand-red" />
                    <p className="text-[10px] font-semibold text-white uppercase tracking-[0.12em]">Why this is better for you</p>
                  </div>
                  <div className="divide-y divide-line">
                    {pitch.why.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3.5">
                        <span className="w-5 h-5 rounded-full bg-good/10 grid place-items-center shrink-0 mt-0.5">
                          <IconCheckCircle size={13} className="text-good" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] text-ink leading-snug">{item.text || item}</p>
                          {item.benefit && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-good/10 text-good text-[10px] font-semibold tracking-wide">
                              ✓ {item.benefit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Key highlights */}
                <div className="grid grid-cols-4 gap-2">
                  {pitch.highlights.map((h) => (
                    <div key={h.val} className="bg-white rounded-2xl p-3 text-center shadow-card border border-line/40">
                      <p className="text-[15px] font-bold text-navy leading-none tabnums">{h.val}</p>
                      <p className="text-[10px] text-ink-faint mt-1 leading-tight">{h.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Competitor comparison */}
                <Card flat className="overflow-hidden">
                  <div className="px-4 py-2.5 bg-canvas border-b border-line flex items-center gap-2">
                    <IconScale size={12} className="text-ink-faint" />
                    <p className="text-[10px] font-semibold text-ink-faint uppercase tracking-[0.12em]">{pitch.vs.label}</p>
                  </div>
                  {/* column headers */}
                  <div className="grid grid-cols-3 px-4 pt-2 pb-1">
                    <span className="text-[10px] text-ink-faint"></span>
                    <span className="text-[10px] font-semibold text-good text-center uppercase tracking-wide">Massey</span>
                    <span className="text-[10px] text-ink-faint text-right uppercase tracking-wide">Theirs</span>
                  </div>
                  <div className="divide-y divide-line">
                    {pitch.vs.rows.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 items-center px-4 py-2.5">
                        <div>
                          <p className="text-[12px] text-ink-faint">{row.attr}</p>
                          {row.note && <p className="text-[10px] text-ink-faint/60 mt-0.5">{row.note}</p>}
                        </div>
                        <span className={cx('text-[13px] font-bold text-center', row.win ? 'text-good' : 'text-ink-muted')}>{row.ours}</span>
                        <span className={cx('text-[12px] text-right', row.win ? 'text-ink-faint line-through decoration-ink-faint/50' : 'text-ink-muted font-medium')}>{row.theirs}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Finance callout */}
                <Card flat className="p-4 flex items-start gap-3 bg-good-soft border border-good/20">
                  <span className="w-9 h-9 rounded-xl bg-good/10 grid place-items-center shrink-0 text-good">
                    <IconBank size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-navy">{pitch.finance.label}</p>
                    <p className="text-[12px] text-ink-muted mt-0.5 leading-snug">{pitch.finance.detail}</p>
                  </div>
                </Card>

                {/* Social proof */}
                {pitch.social && (
                  <div className="flex items-start gap-2.5 px-1">
                    <span className="text-[16px] leading-none mt-0.5">👨‍🌾</span>
                    <p className="text-[12px] text-ink-muted leading-snug italic">{pitch.social}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-navy rounded-2xl px-5 py-4 text-center">
                  <p className="text-[16px] font-bold text-white">{pitch.cta}</p>
                </div>

                {/* Source validation */}
                <div className="flex items-center gap-2 px-1 pb-1">
                  <IconCheckCircle size={13} className="text-good shrink-0" />
                  <span className="text-[11px] text-ink-muted">Validated against TAFE master data</span>
                </div>
              </>
            ) : (
              /* Fallback for models without structured data */
              <Card flat className="p-4 sm:p-5">
                <p className="text-[16px] leading-[1.7] text-ink" style={{ textWrap: 'pretty' }}>{text}</p>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-line">
                  <IconCheckCircle size={14} className="text-good" />
                  <span className="text-[11px] text-ink-muted">Validated against TAFE master data</span>
                </div>
              </Card>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="secondary" size="sm" icon={<IconCopy size={14} />} onClick={copy}>Copy pitch</Button>
              <Button variant="secondary" size="sm" icon={<IconSpeaker size={14} />} onClick={readAloud}
                className={cx(speaking && '!border-brand-red !text-brand-red')}>
                {speaking ? 'Stop' : 'Read aloud'}
              </Button>
              <Button variant="secondary" size="sm" icon={<IconRefresh size={14} />} onClick={regenerate}>Regenerate</Button>
              <Button variant="ghost" size="sm" icon={<IconShield size={14} />} onClick={() => nav('grounding')}>Why grounded?</Button>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider mb-2">Suggested implements</h3>
            <div className="h-scroll-rail no-sb -mx-1 px-1">
              {IMPLEMENTS.map((im) => (
                <div key={im.name} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white shadow-card w-[160px]">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-canvas text-navy"><IconScale size={15} /></span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-navy leading-tight truncate">{im.name}</p>
                    <p className="text-[11px] text-ink-faint truncate">{im.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Screen>
      </ScreenBlock>

      <ActionBar>
        <div className="flex gap-2">
          <Button size="lg" variant="green" className="flex-1" icon={<IconChat size={16} />} onClick={() => nav('whatsapp')}>
            WhatsApp
          </Button>
          <Button size="lg" variant="red" className="flex-1" onClick={() => toast('Recommendation logged in Zoho CRM', { sub: 'Pipeline updated · Follow-up task created.' })}>
            Save to CRM
          </Button>
        </div>
      </ActionBar>
    </>
  );
}

Object.assign(window, { ScreenRecommend, ScreenPitch });
