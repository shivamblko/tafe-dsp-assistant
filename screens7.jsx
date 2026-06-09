/* ============================================================
   Screen 7 - Pitch delivered on WhatsApp
   ============================================================ */

const WA = {
  greenHead: '#075E54',
  bubble: '#DCF8C6',
  bubbleBorder: '#C5E8B0',
  bg: '#ECE5DD',
};

function Tick({ t }) {
  return (
    <span className="inline-flex items-center gap-0.5 self-end ml-2 shrink-0 translate-y-0.5">
      <span className="text-[9px] text-ink-faint tabnums">{t}</span>
      <IconTickDouble size={12} className="text-[#53BDEB]" strokeWidth={2} />
    </span>
  );
}

function Bubble({ children, t, wide }) {
  return (
    <div className="flex justify-end">
      <div className={cx('relative rounded-xl rounded-tr-sm px-3 py-2 shadow-sm', wide ? 'w-full' : 'max-w-[88%]')}
        style={{ background: WA.bubble, border: `1px solid ${WA.bubbleBorder}` }}>
        <div className="flex items-end justify-between gap-1">
          <div className="text-[13px] leading-[1.5] text-[#111B21] min-w-0">{children}</div>
          {t && !wide && <Tick t={t} />}
        </div>
        {wide && <div className="flex justify-end mt-1"><Tick t={t} /></div>}
      </div>
    </div>
  );
}

function LinkCard({ icon, kind, title, sub, url }) {
  return (
    <div className="rounded-lg overflow-hidden bg-white/80 border border-black/5 mb-1.5">
      <div className="flex items-center gap-2.5 px-2.5 py-2">
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#075E54]/10 text-[#075E54] shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-faint">{kind}</p>
          <p className="text-[12px] font-semibold text-[#111B21] leading-tight truncate">{title}</p>
          <p className="text-[10px] text-ink-muted truncate">{sub}</p>
        </div>
        <IconExternal size={14} className="text-[#075E54] shrink-0" />
      </div>
      <div className="px-2.5 py-1 bg-[#075E54]/[0.04] border-t border-black/5">
        <span className="text-[9px] text-[#075E54] truncate block">{url}</span>
      </div>
    </div>
  );
}

function ScreenWhatsApp({ nav, openAudit }) {
  const toast = useToast();
  return (
    <ScreenBlock>
      <Screen wide={false} className="max-w-md">
        <SectionHead
          eyebrow="Delivered"
          title="Sent on WhatsApp"
          subtitle="Pitch, brochure and links sent to Suresh Patel."
          compact
          trailing={<AuditButton onClick={openAudit} className="shrink-0" />}
        />

        <div className="rounded-[28px] border-[4px] border-navy shadow-pop overflow-hidden bg-black">
          <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ background: WA.greenHead }}>
            <IconArrowLeft size={16} className="text-white/80" />
            <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15 text-white font-semibold text-[12px]">SP</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[14px] leading-tight">Suresh Patel</p>
              <p className="text-white/60 text-[10px]">+91 98XXXXXX12 · online</p>
            </div>
            <IconVideo size={17} className="text-white/80" />
            <IconPhone size={16} className="text-white/80" />
          </div>

          <div className="px-2.5 py-3 space-y-2 max-h-[min(360px,50vh)] overflow-y-auto no-sb"
            style={{ background: WA.bg, backgroundImage: 'radial-gradient(rgba(7,94,84,0.04) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
            <div className="flex justify-center">
              <span className="px-2 py-0.5 rounded-md bg-white/90 text-[9px] font-semibold uppercase text-ink-muted">Today</span>
            </div>
            <div className="flex justify-center">
              <span className="px-2.5 py-1 rounded-md bg-[#FCF3D3] text-[10px] text-[#7a6a3a] text-center max-w-[90%]">
                <IconLock size={10} className="inline -mt-0.5 mr-1" /> Sent by Rajesh Kumar · MF Tractors
              </span>
            </div>

            <Bubble t="2:14 PM">
              Suresh ji 🙏 Namaskar!
            </Bubble>

            <Bubble t="2:14 PM">
              Aapke <span className="font-semibold">8 acre paddy &amp; sugarcane</span> farm ke liye humne ek option dekha jo bilkul sahi lagta hai —{' '}
              <span className="font-semibold">Massey Ferguson 254 DT Dynatrack</span> 🚜
            </Bubble>

            <Bubble t="2:14 PM">
              <p className="font-semibold mb-2">Ye aapke liye sahi kyun hai:</p>
              <p className="mb-1.5">✅ <span className="font-medium">Wet paddy fields mein nahi atakta</span> — DT yaani Dual Traction, harvest time pe full grip milti hai, koi delay nahi</p>
              <p className="mb-1.5">✅ <span className="font-medium">Ek trip mein 200 KG zyada</span> — aapke John Deere 5050D se better, kam trips matlab diesel bachaat. Season mein ₹8–10K ka farak</p>
              <p>✅ <span className="font-medium">Tiruvannamalai mein 500+ Massey owners</span> — kuch bhi ho, same day repair ho jaata hai yahan</p>
            </Bubble>

            <Bubble t="2:14 PM">
              💰 <span className="font-semibold">HDFC Finance:</span> 8.5% p.a. · Zero down payment · Same-day approval
            </Bubble>

            <Bubble t="2:15 PM" wide>
              <div className="rounded-lg overflow-hidden bg-white/80 border border-black/5">
                <div className="flex items-center gap-2 px-2 py-2">
                  <span className="grid place-items-center w-9 h-10 rounded-lg bg-brand-redSoft text-brand-red shrink-0"><IconFile size={18} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-[#111B21] leading-tight">MF 254 DT Dynatrack — Full Details.pdf</p>
                    <p className="text-[10px] text-ink-muted">Specs, images &amp; finance · 2.4 MB</p>
                  </div>
                </div>
              </div>
            </Bubble>

            <Bubble t="2:15 PM" wide>
              <p className="mb-2 text-[12px] font-semibold">Helpful links 👇</p>
              <LinkCard icon={<IconPlay size={16} />} kind="Demo video" title="MF 254 DT in action — Tamil Nadu" sub="3 min · Paddy field demo" url="mf.tractors/dynatrack-demo" />
              <LinkCard icon={<IconBank size={16} />} kind="Finance" title="HDFC — EMI from ₹9,200/month" sub="Zero down · Same-day approval" url="mf.tractors/hdfc-offer" />
              <LinkCard icon={<IconCalendar size={16} />} kind="Free farm demo" title="Hum aapke khet pe leke aayenge" sub="Tiruvannamalai · No charge" url="mf.tractors/book-demo" />
            </Bubble>

            <Bubble t="2:15 PM">
              Koi bhi sawaal ho toh <span className="font-semibold">seedha call karein</span> — hum ready hain 🙏
              <span className="block mt-1.5 text-[11px] text-ink-faint">Rajesh Kumar · MF Tractors, Tiruvannamalai</span>
            </Bubble>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-2" style={{ background: '#F0F0F0' }}>
            <div className="flex-1 h-8 rounded-full bg-white border border-black/5 px-3 flex items-center text-[11px] text-ink-faint">Message sent via DWM</div>
            <span className="grid place-items-center w-8 h-8 rounded-full text-white" style={{ background: WA.greenHead }}><IconChat size={14} /></span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl bg-good-soft">
          <IconTickDouble size={15} className="text-[#53BDEB]" strokeWidth={2} />
          <span className="text-[13px] font-medium text-good">Delivered &amp; logged in Zoho CRM</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button variant="secondary" size="sm" onClick={() => nav('pitch')} icon={<IconArrowLeft size={14} />}>Back</Button>
          <Button variant="green" size="sm" icon={<IconPhone size={14} />} onClick={() => toast('Calling Suresh Patel…', { sub: 'Call logged to CRM.' })}>Call farmer</Button>
        </div>
        <button onClick={() => nav('landing')} className="w-full mt-3 text-[13px] text-ink-muted hover:text-navy font-medium py-2">
          Finish &amp; go home
        </button>
      </Screen>
    </ScreenBlock>
  );
}

Object.assign(window, { ScreenWhatsApp });
