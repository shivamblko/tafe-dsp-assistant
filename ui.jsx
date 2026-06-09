/* ============================================================
   UI primitives — premium automotive / app-style
   ============================================================ */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

const cx = (...a) => a.filter(Boolean).join(' ');

/* ---- Button ---- */
function Button({ variant = 'primary', size = 'md', className = '', children, icon, iconRight, ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] select-none disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30';
  const sizes = {
    sm: 'text-[13px] px-3.5 h-9 rounded-full',
    md: 'text-[14px] px-4 h-10 rounded-full',
    lg: 'text-[15px] px-5 h-11 rounded-full',
  };
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-700 shadow-sm',
    red: 'bg-brand-red text-white hover:bg-brand-redDark shadow-glow',
    green: 'bg-good text-white hover:bg-[#047857] shadow-sm',
    secondary: 'bg-white text-ink border border-line hover:border-ink-faint hover:shadow-card',
    ghost: 'text-ink-muted hover:text-navy hover:bg-canvas rounded-full',
    subtle: 'bg-canvas text-navy hover:bg-line/60 rounded-full',
    outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-full',
    gold: 'bg-[#F0A800] text-[#1A0500] hover:bg-[#FFB800] font-bold shadow-sm',
  };
  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {icon}{children}{iconRight}
    </button>
  );
}

/* ---- Card ---- */
function Card({ className = '', children, flat, ...rest }) {
  return (
    <div className={cx(
      'bg-surface rounded-[var(--radius-card)]',
      flat ? 'border border-line' : 'shadow-card',
      className
    )} {...rest}>{children}</div>
  );
}

/* ---- Badge ---- */
function Badge({ tone = 'navy', className = '', children, dot }) {
  const tones = {
    navy: 'bg-navy/5 text-navy',
    red: 'bg-brand-redSoft text-brand-red',
    good: 'bg-good-soft text-good',
    warn: 'bg-warn-soft text-warn',
    grey: 'bg-canvas text-ink-muted',
  };
  return (
    <span className={cx('inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap', tones[tone], className)}>
      {dot && <span className={cx('w-1.5 h-1.5 rounded-full', tone === 'good' ? 'bg-good' : tone === 'red' ? 'bg-brand-red' : tone === 'warn' ? 'bg-warn' : 'bg-navy')} />}
      {children}
    </span>
  );
}

function ConfidenceBadge({ score }) {
  const tone = score >= 93 ? 'good' : score >= 88 ? 'navy' : 'warn';
  return <Badge tone={tone}>{score}% match</Badge>;
}

/* ---- Form field ---- */
function Field({ label, autofill, derived, children, hint }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[13px] font-medium text-ink">{label}</span>
        {autofill && <Badge tone="navy" className="!py-0.5 !text-[10px]"><IconSparkles size={10} /> CRM</Badge>}
        {derived && <Badge tone="grey" className="!py-0.5 !text-[10px]">{derived}</Badge>}
      </div>
      {children}
      {hint && <p className="mt-1.5 text-[12px] text-ink-faint">{hint}</p>}
    </label>
  );
}

const inputCls = 'w-full h-10 px-3.5 rounded-xl border border-line bg-white text-[14px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition';

function TextInput({ icon, className = '', ...rest }) {
  if (icon) {
    return (
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">{icon}</span>
        <input className={cx(inputCls, 'pl-11', className)} {...rest} />
      </div>
    );
  }
  return <input className={cx(inputCls, className)} {...rest} />;
}

function Select({ value, onChange, options, className = '' }) {
  return (
    <div className="relative">
      <select value={value} onChange={onChange} className={cx(inputCls, 'appearance-none pr-10 cursor-pointer', className)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
    </div>
  );
}

function ChipSelect({ options, value, onChange, allowCustom, addLabel = 'Add other' }) {
  const [extra, setExtra] = useState([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef();
  const all = [...options, ...extra.filter((e) => !options.includes(e))];
  const toggle = (o) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
  const commit = () => {
    const v = draft.trim();
    if (v && !all.includes(v)) setExtra((e) => [...e, v]);
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft(''); setAdding(false);
  };
  useEffect(() => { if (adding && inputRef.current) inputRef.current.focus(); }, [adding]);
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((o) => {
        const on = value.includes(o);
        return (
          <button key={o} type="button" onClick={() => toggle(o)}
            className={cx('px-3 h-9 rounded-full text-[13px] font-medium border transition-all',
              on ? 'bg-navy text-white border-navy shadow-sm' : 'bg-white text-ink-muted border-line hover:border-navy/30')}>
            {on && <IconCheck size={13} className="inline mr-1 -mt-0.5" />}{o}
          </button>
        );
      })}
      {allowCustom && (adding ? (
        <span className="inline-flex items-center h-10 rounded-full border-2 border-navy bg-white pl-4 pr-1 gap-1">
          <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } if (e.key === 'Escape') { setDraft(''); setAdding(false); } }}
            onBlur={commit} placeholder="Type & Enter"
            className="w-28 text-[14px] bg-transparent focus:outline-none text-ink placeholder:text-ink-faint" />
          <button type="button" onMouseDown={(e) => { e.preventDefault(); commit(); }}
            className="grid place-items-center w-8 h-8 rounded-full bg-navy text-white"><IconCheck size={14} /></button>
        </span>
      ) : (
        <button type="button" onClick={() => setAdding(true)}
          className="px-4 h-10 rounded-full text-[14px] font-medium border border-dashed border-line text-ink-muted hover:border-navy/30 hover:text-navy transition-all">
          + {addLabel}
        </button>
      ))}
    </div>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="grid gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button key={o} type="button" onClick={() => onChange(o)}
            className={cx('flex items-center gap-2.5 px-3.5 h-10 rounded-xl border text-left text-[13px] transition-all',
              on ? 'border-navy bg-navy/[0.04] text-navy font-semibold' : 'border-line text-ink-muted hover:border-navy/20')}>
            <span className={cx('w-[18px] h-[18px] rounded-full border-2 grid place-items-center shrink-0', on ? 'border-navy' : 'border-line')}>
              {on && <span className="w-2 h-2 rounded-full bg-navy" />}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function RangeSlider({ min, max, value, onChange, format, step = 1 }) {
  const [lo, hi] = value;
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[17px] font-semibold text-navy tabnums tracking-tight">{format(lo)} – {format(hi)}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-line" />
        <div className="absolute h-[3px] rounded-full bg-navy" style={{ left: pct(lo) + '%', right: (100 - pct(hi)) + '%' }} />
        <input type="range" min={min} max={max} step={step} value={lo}
          onChange={(e) => onChange([Math.min(+e.target.value, hi - step), hi])}
          className="absolute inset-x-0 w-full pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" />
        <input type="range" min={min} max={max} step={step} value={hi}
          onChange={(e) => onChange([lo, Math.max(+e.target.value, lo + step)])}
          className="absolute inset-x-0 w-full pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" />
      </div>
      <div className="flex justify-between mt-2 text-[12px] text-ink-faint tabnums">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

function Spinner({ size = 18, className = '' }) {
  return (
    <span className={cx('inline-block rounded-full border-2 border-current border-t-transparent animate-spin', className)}
      style={{ width: size, height: size }} />
  );
}

function TractorImage({ label = 'product shot', className = '', ratio = 'aspect-[4/3]' }) {
  return (
    <div className={cx('relative overflow-hidden rounded-2xl product-stage grid place-items-center', ratio, className)}>
      <div className="flex flex-col items-center gap-2 text-ink-faint">
        <IconTractor size={36} strokeWidth={1.2} />
        <span className="text-[11px] font-medium text-ink-faint">{label}</span>
      </div>
    </div>
  );
}

function ModelImage({ src, alt, className = '', ratio = 'aspect-[4/3]', hero, compact }) {
  const [err, setErr] = useState(false);
  if (!src || err) return <TractorImage label="product shot" className={className} ratio={ratio} />;
  return (
    <div className={cx(
      'rounded-xl product-stage grid place-items-center overflow-hidden',
      compact ? 'h-[110px]' : ratio,
      hero && 'rounded-none max-h-[180px] sm:max-h-[220px]',
      className
    )}>
      <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)}
        className={cx('w-full h-full object-contain', compact ? 'p-1' : hero ? 'p-3 sm:p-5' : 'p-1.5')} />
    </div>
  );
}

function BrandMark({ light = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cx('text-[15px] font-bold tracking-tight', light ? 'text-white' : 'text-navy')}>TAFE</span>
      <span className={cx('w-px h-4', light ? 'bg-white/25' : 'bg-line')} />
      <span className="text-[15px] font-bold tracking-tight text-brand-red">DWM</span>
    </div>
  );
}

function AIIndicator({ light = false, className = '' }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 px-3 h-7 rounded-full text-[11px] font-semibold whitespace-nowrap',
      light ? 'text-white/90 bg-white/10' : 'text-good bg-good-soft', className)}>
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-good opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-good" />
      </span>
      AI active
    </span>
  );
}

/* ---- Page layout primitives ---- */
function Screen({ children, wide, className = '', flush }) {
  return (
    <div className={cx(
      'mx-auto w-full',
      wide ? 'max-w-4xl' : 'max-w-3xl',
      !flush && 'px-[var(--gutter)]',
      className
    )}>
      {children}
    </div>
  );
}

function ScreenBlock({ children, className = '' }) {
  return <div className={cx('py-4', className)}>{children}</div>;
}

function ScreenHero({ children, dark, className = '' }) {
  return (
    <div className={cx('px-[var(--gutter)] py-8 sm:py-12', dark ? 'dark-hero text-white' : 'hero-gradient', className)}>
      <div className="mx-auto w-full max-w-3xl">{children}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, subtitle, className = '', compact, trailing }) {
  return (
    <div className={cx('flex items-start justify-between gap-3', compact ? 'mb-3' : 'mb-4', className)}>
      <div className="min-w-0 flex-1">
        {eyebrow && <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wider mb-1">{eyebrow}</p>}
        <h2 className="text-[22px] sm:text-[26px] font-bold text-navy tracking-tight text-balance leading-[1.2]">{title}</h2>
        {subtitle && <p className="text-[14px] text-ink-muted mt-1.5 leading-relaxed max-w-xl">{subtitle}</p>}
      </div>
      {trailing}
    </div>
  );
}

function ActionBar({ children, className = '' }) {
  return (
    <div className={cx(
      'fixed inset-x-0 z-40 px-[var(--gutter)] pt-2 pb-3 bg-gradient-to-t from-canvas via-canvas/98 to-transparent pointer-events-none safe-bottom',
      className
    )} style={{ bottom: 0 }}>
      <div className="max-w-3xl mx-auto pointer-events-auto">{children}</div>
    </div>
  );
}

const ToastCtx = createContext(() => {});
const useToast = () => useContext(ToastCtx);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, ...opts }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.duration || 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[80] flex flex-col gap-2 w-[min(92vw,400px)]">
        {toasts.map((t) => (
          <div key={t.id} className="animate-slideup bg-navy text-white rounded-2xl shadow-pop px-4 py-3.5 flex items-start gap-3">
            <span className="mt-0.5 text-good shrink-0"><IconCheckCircle size={18} /></span>
            <div className="text-[14px] leading-snug">
              <p className="font-semibold">{t.msg}</p>
              {t.sub && <p className="text-white/65 mt-0.5 text-[13px]">{t.sub}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function AuditButton({ onClick, className = '' }) {
  return (
    <button onClick={onClick} title="View audit trail"
      className={cx('inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-canvas text-ink-muted hover:text-navy hover:bg-line/50 transition text-[12px] font-medium', className)}>
      <IconShield size={14} /> Audit
    </button>
  );
}

function AuditPanel({ open, onClose, context }) {
  if (!open) return null;
  const ts = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm animate-fadein" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[min(92vw,400px)] bg-surface shadow-pop animate-slidein flex flex-col rounded-l-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-2xl bg-good-soft text-good"><IconShield size={18} /></span>
            <div>
              <p className="font-semibold text-[16px] text-navy leading-tight">Audit trail</p>
              <p className="text-[12px] text-ink-faint">Grounded · Traceable</p>
            </div>
          </div>
          <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-full hover:bg-canvas text-ink-muted"><IconClose size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-good-soft">
            <IconCheckCircle size={18} className="text-good" />
            <span className="text-[14px] font-semibold text-good">Validated against TAFE master data</span>
          </div>
          {context && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint mb-2">Output</p>
              <p className="text-[14px] text-ink leading-relaxed">{context}</p>
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint mb-2">Retrieved sources</p>
            <ul className="space-y-2">
              {AUDIT.sources.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-canvas">
                  <span className="mt-0.5 text-navy-500"><IconBook size={15} /></span>
                  <span className="text-[13px] text-ink leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="space-y-3 text-[13px]">
            <div className="flex justify-between"><dt className="text-ink-muted">Generated at</dt><dd className="text-ink tabnums">{ts}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Validated</dt><dd className="text-good font-semibold">Yes</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Model</dt><dd className="text-ink">RAG · retrieval-grounded</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Disparagement check</dt><dd className="text-good font-semibold">Passed</dd></div>
          </dl>
        </div>
        <div className="p-4 border-t border-line">
          <Button variant="secondary" className="w-full" onClick={onClose} icon={<IconExternal size={15} />}>Open full audit log</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  cx, Button, Card, Badge, ConfidenceBadge, Field, TextInput, Select, ChipSelect, RadioGroup, RangeSlider,
  Spinner, TractorImage, ModelImage, BrandMark, AIIndicator,
  Screen, ScreenBlock, ScreenHero, SectionHead, ActionBar,
  ToastProvider, useToast, AuditButton, AuditPanel,
});
