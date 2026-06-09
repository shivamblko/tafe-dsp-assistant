/* ============================================================
   Screen 8 - Grounding demo (ungrounded vs grounded)
   ============================================================ */

function GroundingCard({ title, tone, badge, children, sources }) {
  const isGood = tone === 'good';
  return (
    <Card flat className={cx('overflow-hidden flex flex-col h-full', isGood ? 'border-good/20' : 'border-warn/30')}>
      <div className={cx('px-4 py-2.5 flex items-center justify-between shrink-0', isGood ? 'bg-good-soft' : 'bg-warn-soft')}>
        <h3 className="font-semibold text-[14px] text-navy">{title}</h3>
        <Badge tone={isGood ? 'good' : 'warn'}>{badge}</Badge>
      </div>
      <div className="p-4 flex-1">
        <p className="text-[14px] leading-[1.65] text-ink">{children}</p>
        {sources && (
          <div className="mt-3 pt-3 border-t border-line">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint mb-1.5">Sources retrieved</p>
            <ul className="space-y-1">
              {sources.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-ink-muted">
                  <IconCheckCircle size={12} className="text-good mt-0.5 shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!sources && (
          <div className="mt-3 pt-3 border-t border-line flex items-start gap-1.5">
            <IconFlag size={12} className="text-warn mt-0.5 shrink-0" />
            <p className="text-[11px] text-ink-muted">No source validation. Claims may be inaccurate.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function ScreenGrounding({ nav, openAudit }) {
  return (
    <ScreenBlock>
      <Screen wide>
        <SectionHead
          eyebrow="Why grounding matters"
          title="Generic AI vs DSP Assistant"
          subtitle="Same farmer context. One invents claims; the other is validated against TAFE data."
          compact
          trailing={<AuditButton onClick={openAudit} className="shrink-0" />}
        />

        <div className="grid md:grid-cols-2 gap-3 items-stretch">
          <GroundingCard title="Without grounding" tone="warn" badge="High risk">
            {GROUNDING.ungrounded}
          </GroundingCard>
          <GroundingCard title="With DSP Assistant" tone="good" badge="Validated" sources={GROUNDING.sources}>
            {GROUNDING.grounded}
          </GroundingCard>
        </div>

        <Card flat className="mt-3 p-4">
          <p className="text-[12px] font-semibold text-navy mb-2">What grounding prevents</p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {GROUNDING.risks.map((r) => (
              <div key={r} className="flex items-start gap-1.5 text-[12px] text-ink-muted">
                <IconClose size={12} className="text-brand-red mt-0.5 shrink-0" />
                {r}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 mt-5">
          <Button variant="secondary" size="sm" onClick={() => nav('pitch')} icon={<IconArrowLeft size={14} />}>Back to pitch</Button>
          <Button variant="red" size="sm" onClick={() => nav('profile')} iconRight={<IconArrowRight size={14} />}>Try grounded flow</Button>
        </div>
      </Screen>
    </ScreenBlock>
  );
}

Object.assign(window, { ScreenGrounding });
