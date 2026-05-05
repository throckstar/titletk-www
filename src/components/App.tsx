import React, { useRef, useState, useEffect } from 'react';
import { Logo, ArrowRight } from './shared';

// All display headings use Reckless (falls back to Archivo)
const DF = 'var(--tk-reckless)';

// ─── Nav ─────────────────────────────────────────────────────────

function Nav({ progress }: { progress: number }) {
  const [open, setOpen] = useState(false);
  const items = [
    { l: 'Clients', n: '01' },
    { l: 'Work', n: '02' },
    { l: 'Services', n: '03' },
    { l: 'Product · NorthTK', n: '04' },
    { l: 'Founders', n: '05' },
    { l: 'Stories', n: '06' },
    { l: 'Contact', n: '07' },
  ];

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '22px 32px', pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto', justifySelf: 'start' }}>
          <Logo />
        </div>
        <div style={{
          pointerEvents: 'auto', justifySelf: 'center',
          fontFamily: 'var(--tk-mono)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)',
          background: 'rgba(242,235,221,0.85)', backdropFilter: 'blur(8px)',
          padding: '8px 14px', borderRadius: 999, border: '1px solid var(--tk-rule)',
        }}>
          <span style={{ color: 'var(--tk-ink)', fontWeight: 500 }}>{Math.round(progress)}</span>%
          <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
          <span>Title TK · 2026</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            pointerEvents: 'auto', justifySelf: 'end',
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--tk-mono)', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink)', padding: 0,
          }}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span style={{ position: 'relative', width: 22, height: 14 }}>
            <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'var(--tk-ink)', top: open ? 6 : 2, transform: open ? 'rotate(22.5deg)' : 'none', transition: 'all 250ms cubic-bezier(0.2,0,0,1)' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'var(--tk-ink)', top: 7, opacity: open ? 0 : 1, transition: 'all 250ms cubic-bezier(0.2,0,0,1)' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'var(--tk-ink)', top: open ? 6 : 12, transform: open ? 'rotate(-22.5deg)' : 'none', transition: 'all 250ms cubic-bezier(0.2,0,0,1)' }} />
          </span>
        </button>
      </div>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'var(--tk-ink)', color: 'var(--tk-paper)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 350ms cubic-bezier(0.2,0,0,1)',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
        padding: '120px 64px 48px',
      }}>
        <div />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          {items.map((it, i) => (
            <a
              key={i}
              href="#"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'baseline', gap: 32,
                fontFamily: DF, fontWeight: 500,
                fontSize: 'clamp(48px, 6.5vw, 104px)',
                lineHeight: 1.05, letterSpacing: '-0.022em',
                color: 'var(--tk-paper)', textDecoration: 'none', padding: '6px 0',
                transform: open ? 'translateX(0)' : 'translateX(40px)',
                opacity: open ? 1 : 0,
                transition: `all 600ms cubic-bezier(0.2,0,0,1) ${i * 60 + 100}ms`,
              }}
            >
              <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 13, fontWeight: 400, letterSpacing: '0.16em', opacity: 0.4 }}>{it.n}</span>
              {it.l}
            </a>
          ))}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)',
        }}>
          <span>San Francisco · Marin</span>
          <span>partners@titletk.co</span>
          <span>+1 (415) 305-9476</span>
        </div>
      </div>
    </>
  );
}

// ─── Horizontal scroll wrapper ────────────────────────────────────

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const setHeights = () => {
      if (!sectionRef.current || !trackRef.current) return;
      sectionRef.current.style.height = trackRef.current.scrollWidth + 'px';
    };
    setHeights();
    const ro = new ResizeObserver(setHeights);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', setHeights);

    const onScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = total > 0 ? Math.min(1, scrolled / total) : 0;
      const moveable = trackRef.current.scrollWidth - window.innerWidth;
      trackRef.current.style.transform = `translate3d(${-p * moveable}px, 0, 0)`;
      setProgress(p * 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', setHeights);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [children]);

  return (
    <>
      <Nav progress={progress} />
      <div ref={sectionRef} style={{ position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div ref={trackRef} style={{ display: 'flex', height: '100vh', willChange: 'transform' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Panel shell ─────────────────────────────────────────────────

function Panel({
  width = '100vw',
  bg,
  children,
  label,
  num,
}: {
  width?: string;
  bg?: string;
  children: React.ReactNode;
  label?: string;
  num?: string;
}) {
  return (
    <section style={{
      flex: '0 0 auto', width, height: '100vh', position: 'relative',
      background: bg || 'var(--tk-parchment)', overflow: 'hidden',
    }}>
      {(label || num) && (
        <div style={{
          position: 'absolute', top: 96, left: 64, right: 64, zIndex: 5,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--tk-mono)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'currentColor',
        }}>
          <span style={{ opacity: 0.55 }}>{label}</span>
          <span style={{ opacity: 0.55 }}>{num}</span>
        </div>
      )}
      {children}
    </section>
  );
}

// ─── Photo placeholder ───────────────────────────────────────────

type PlaceholderTone = 'dark' | 'light' | 'coral' | 'yellow' | 'parchment' | 'portrait';

const PALETTES: Record<PlaceholderTone, { bg: string; stripe: string; cap: string }> = {
  dark:      { bg: '#2A221B', stripe: 'rgba(255,255,255,0.04)', cap: 'rgba(255,255,255,0.7)' },
  light:     { bg: '#E8DEC9', stripe: 'rgba(26,24,21,0.05)',    cap: 'rgba(26,24,21,0.55)' },
  coral:     { bg: '#F58C8C', stripe: 'rgba(0,0,0,0.05)',       cap: 'rgba(26,24,21,0.65)' },
  yellow:    { bg: '#FFE259', stripe: 'rgba(0,0,0,0.05)',       cap: 'rgba(26,24,21,0.7)' },
  parchment: { bg: '#E5DECC', stripe: 'rgba(26,24,21,0.06)',   cap: 'rgba(26,24,21,0.55)' },
  portrait:  { bg: '#3a342c', stripe: 'rgba(255,255,255,0.03)', cap: 'rgba(255,255,255,0.7)' },
};

function Placeholder({
  tone = 'dark',
  label,
  style,
}: {
  tone?: PlaceholderTone;
  label?: string;
  style?: React.CSSProperties;
}) {
  const p = PALETTES[tone];
  return (
    <div style={{ position: 'relative', background: p.bg, overflow: 'hidden', ...style }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, transparent 0 28px, ${p.stripe} 28px 29px)` }} />
      {label && (
        <span style={{
          position: 'absolute', bottom: 14, left: 14,
          fontFamily: 'var(--tk-mono)', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: p.cap,
          background: tone === 'light' || tone === 'parchment' || tone === 'yellow' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.35)',
          padding: '4px 8px', borderRadius: 2,
        }}>{label}</span>
      )}
    </div>
  );
}

// ─── Client wordmarks ────────────────────────────────────────────

const CLIENT_STYLES: Record<string, { w: number; ls: string; uc: boolean }> = {
  'Stability AI':  { w: 600, ls: '-0.02em',  uc: false },
  'Arcjet':        { w: 700, ls: '-0.025em', uc: false },
  'Narvar':        { w: 600, ls: '-0.005em', uc: false },
  'Moab':          { w: 800, ls: '-0.03em',  uc: true  },
  'DRESSX':        { w: 700, ls: '0.02em',   uc: true  },
  'Sonos':         { w: 700, ls: '-0.005em', uc: true  },
  'Hibbett':       { w: 700, ls: '-0.01em',  uc: true  },
  'Burrow':        { w: 600, ls: '-0.012em', uc: false },
  'Uber Freight':  { w: 800, ls: '-0.025em', uc: false },
  'Hotel Tonight': { w: 500, ls: '-0.005em', uc: false },
  'Google':        { w: 500, ls: '-0.005em', uc: false },
  'Nexos':         { w: 600, ls: '-0.012em', uc: false },
};

function ClientLogo({ name, color = 'currentColor', height = 22 }: { name: string; color?: string; height?: number }) {
  const s = CLIENT_STYLES[name] || { w: 600, ls: '-0.005em', uc: false };
  return (
    <span style={{
      fontFamily: 'var(--tk-display)', fontWeight: s.w, letterSpacing: s.ls,
      fontSize: height, lineHeight: 1, color,
      textTransform: s.uc ? 'uppercase' : 'none', whiteSpace: 'nowrap',
    }}>{name}</span>
  );
}

// ════════════════════════════════════════════════════════════════
// PANELS
// ════════════════════════════════════════════════════════════════

function PanelHero() {
  return (
    <Panel width="100vw" bg="var(--tk-parchment)">
      <Placeholder tone="dark" label="Hero film · golden hour" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(242,235,221,0.78)' }} />
      <div style={{ position: 'absolute', inset: '120px 64px 64px', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--tk-mono)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)',
        }}>
          <span>Title TK · Storytelling Studio</span>
          <span style={{ textAlign: 'right' }}>San Francisco · Marin</span>
        </div>
        <div style={{ alignSelf: 'end', maxWidth: '70vw' }}>
          <h1 style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 'clamp(96px, 13vw, 240px)',
            lineHeight: 0.92, letterSpacing: '-0.028em',
            color: 'var(--tk-ink)', margin: 0,
          }}>
            Built for<br />breakthroughs.
          </h1>
          <p style={{
            fontFamily: DF, fontWeight: 400,
            fontSize: 'clamp(24px, 2.4vw, 36px)',
            lineHeight: 1.2, letterSpacing: '-0.012em',
            color: 'var(--tk-ink-2)', margin: '32px 0 0', maxWidth: 720,
          }}>
            Storytelling for world-changing companies.
          </p>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          paddingTop: 24, borderTop: '1px solid var(--tk-ink)',
        }}>
          <a href="#" style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 22, letterSpacing: '-0.01em', color: 'var(--tk-ink)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid var(--tk-ink)', paddingBottom: 4,
          }}>
            Get in touch <ArrowRight size={16} />
          </a>
          <span style={{
            fontFamily: 'var(--tk-mono)', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)',
          }}>Scroll → 00 / 09</span>
        </div>
      </div>
    </Panel>
  );
}

function PanelLogos() {
  const all = [
    'Stability AI', 'Arcjet', 'Narvar', 'Moab', 'DRESSX', 'Sonos',
    'Hibbett', 'Burrow', 'Uber Freight', 'Hotel Tonight', 'Google', 'Nexos',
  ];
  const row1 = all.slice(0, 6);
  const row2 = all.slice(6);
  return (
    <Panel width="120vw" bg="var(--tk-coral)" label="Selected clients" num="01">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 48 }}>
        <div>
          <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,24,21,0.6)' }}>Trusted by</span>
          <h2 style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 'clamp(56px, 7vw, 120px)',
            lineHeight: 0.96, letterSpacing: '-0.024em',
            color: 'var(--tk-ink)', margin: '20px 0 0', maxWidth: '70%',
          }}>
            150+ companies, from pre-seed to Fortune 50.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', alignContent: 'center' }}>
          {[row1, row2].map((row, ri) => (
            <div key={ri} style={{
              display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`,
              alignItems: 'center',
              borderTop: '1px solid rgba(26,24,21,0.25)',
              borderBottom: ri === 1 ? '1px solid rgba(26,24,21,0.25)' : 'none',
            }}>
              {row.map((n, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: '100%', padding: '32px 16px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(26,24,21,0.18)',
                }}>
                  <ClientLogo name={n} color="var(--tk-ink)" height={Math.min(34, 220 / Math.max(n.length, 6))} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: 'var(--tk-mono)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,24,21,0.65)',
        }}>
          <span>A working index — refreshed quarterly</span>
          <span>Scroll for case studies →</span>
        </div>
      </div>
    </Panel>
  );
}

function PanelManifesto() {
  return (
    <Panel width="100vw" bg="var(--tk-coral)" label="Manifesto" num="02">
      <div style={{
        position: 'absolute', inset: '160px 96px 96px',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 96, alignItems: 'center',
      }}>
        <div>
          <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,24,21,0.6)' }}>A different kind of partner</span>
          <h2 style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 'clamp(56px, 7vw, 128px)',
            lineHeight: 0.95, letterSpacing: '-0.028em',
            color: 'var(--tk-ink)', margin: '32px 0 0',
          }}>
            The world doesn&apos;t need another agency.
          </h2>
          <h2 style={{
            fontFamily: DF, fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 80px)',
            lineHeight: 1, letterSpacing: '-0.022em',
            color: 'var(--tk-charcoal)', margin: '12px 0 0',
          }}>
            It needs a different kind of partner.
          </h2>
        </div>
        <div style={{ borderLeft: '1px solid rgba(26,24,21,0.25)', paddingLeft: 64 }}>
          <p style={{ fontFamily: 'var(--tk-sans)', fontWeight: 400, fontSize: 22, lineHeight: 1.45, color: 'var(--tk-ink)', margin: 0 }}>
            Hands-on, high-impact partners at your most important moments in growth. We&apos;ve founded agencies, led programs for some of the greatest companies in the world, and spent decades learning what actually helps a business drive recognition, relevance, and revenue.
          </p>
          <p style={{ fontFamily: 'var(--tk-sans)', fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: 'var(--tk-charcoal)', marginTop: 28 }}>
            We built Title TK to do things differently — senior operators who embed with your team, build the story, and drive the outcomes that matter.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function PanelWork() {
  const work = [
    { name: 'Stability AI', sector: 'Generative AI',       bg: '#1A1815', fg: '#FFFFFF' },
    { name: 'Arcjet',       sector: 'Developer Security',  bg: '#E5DECC', fg: '#1A1815' },
    { name: 'Narvar',       sector: 'Customer Experience', bg: '#FFADAD', fg: '#1A1815' },
    { name: 'Moab',         sector: 'Equipment Rental',    bg: '#E8DEC9', fg: '#1A1815' },
    { name: 'DRESSX',       sector: 'Digital Fashion',     bg: '#FFADAD', fg: '#1A1815' },
    { name: 'Sonos',        sector: 'Consumer Audio',      bg: '#FFE259', fg: '#1A1815' },
  ];
  return (
    <Panel width="180vw" bg="var(--tk-parchment)" label="Selected Work" num="03">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 0, bottom: 96, display: 'flex', alignItems: 'stretch', gap: 24 }}>
        <div style={{ flex: '0 0 28vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: 24 }}>
          <div>
            <h2 style={{
              fontFamily: DF, fontWeight: 500,
              fontSize: 'clamp(56px, 6.5vw, 112px)',
              lineHeight: 0.95, letterSpacing: '-0.024em',
              color: 'var(--tk-ink)', margin: 0,
            }}>
              Stories that<br />moved markets.
            </h2>
            <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 18, lineHeight: 1.5, color: 'var(--tk-ink-2)', marginTop: 32, maxWidth: 380 }}>
              We partner with the companies defining and re-defining their industries — at launches, in new markets, when the category itself is being rewritten.
            </p>
          </div>
          <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)' }}>Showing 6 of 150+ engagements</span>
        </div>
        {work.map((w, i) => (
          <article key={i} style={{
            flex: '0 0 26vw', height: '100%',
            background: w.bg, color: w.fg,
            borderRadius: 14, padding: 32,
            display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 24,
            boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              fontFamily: 'var(--tk-mono)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55,
            }}>
              <span>Case · 0{i + 1}</span>
              <span>{w.sector}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClientLogo name={w.name} color={w.fg} height={48} />
            </div>
            <div style={{
              paddingTop: 16,
              borderTop: `1px solid ${w.fg === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(26,24,21,0.2)'}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: 'var(--tk-sans)', fontSize: 13,
            }}>
              <span style={{ fontWeight: 500 }}>Read case</span>
              <ArrowRight size={14} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function PanelServices() {
  const services = [
    {
      num: '01',
      heading: 'Clarity that drives scale',
      body: "Most growth companies try to scale a story they haven't finished writing. We nail that first. Before a single pitch goes out, we build the foundational narrative — positioning, messaging, architecture.",
      items: ['Brand & narrative strategy', 'Messaging architecture', 'Executive positioning', 'Corporate communications'],
    },
    {
      num: '02',
      heading: 'Partners in the trenches',
      body: 'We embed with your team, think like operators, and work like founders. Senior people doing the work, from day one — no junior layers, no account-management theater.',
      items: ['Earned media & storytelling', 'Integrated marketing', 'Stakeholder engagement', 'Crisis & inflection moments'],
    },
    {
      num: '03',
      heading: 'Momentum that compounds',
      body: 'The work. Putting the story in front of the people who need to hear it — and making sure it shows up everywhere it matters next.',
      items: ['Content & coverage amplification', 'Social & influencer programs', 'Awards & speakers bureaus', 'Measurement & analytics'],
    },
  ];
  return (
    <Panel width="160vw" bg="var(--tk-paper)" label="Services" num="04">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateColumns: '0.7fr 2.4fr', gap: 80 }}>
        <div style={{ borderTop: '2px solid var(--tk-ink)', paddingTop: 24 }}>
          <span className="eyebrow">What we do</span>
          <h2 style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 'clamp(48px, 5vw, 88px)',
            lineHeight: 0.96, letterSpacing: '-0.022em',
            color: 'var(--tk-ink)', margin: '24px 0 0',
          }}>
            Three<br />disciplines.<br />One team.
          </h2>
          <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 17, lineHeight: 1.5, color: 'var(--tk-ink-2)', marginTop: 32 }}>
            Story. Strategy. Engagement. Every engagement runs on a tight team of senior operators.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {services.map((s, i) => (
            <div key={i} style={{
              padding: '24px 40px',
              borderLeft: i === 0 ? '1px solid var(--tk-rule)' : 'none',
              borderRight: '1px solid var(--tk-rule)',
              display: 'flex', flexDirection: 'column', gap: 24, height: '100%',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 13, color: 'var(--tk-coral-deep)', fontWeight: 500 }}>§ {s.num}</span>
                <ArrowRight size={14} />
              </div>
              <h3 style={{ fontFamily: DF, fontWeight: 500, fontSize: 36, lineHeight: 1.0, letterSpacing: '-0.018em', color: 'var(--tk-ink)', margin: 0 }}>{s.heading}</h3>
              <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 15.5, lineHeight: 1.55, color: 'var(--tk-ink-2)', margin: 0 }}>{s.body}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0', display: 'flex', flexDirection: 'column' }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ fontFamily: 'var(--tk-sans)', fontSize: 13.5, color: 'var(--tk-ink-2)', padding: '10px 0', borderTop: '1px solid var(--tk-rule)' }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PanelProduct() {
  return (
    <Panel width="140vw" bg="var(--tk-ink)" label="Product · NorthTK" num="05">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 96 }}>
        <div style={{ color: 'var(--tk-paper)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--tk-coral)' }}>A Title TK product</span>
            <h2 style={{
              fontFamily: DF, fontWeight: 500,
              fontSize: 'clamp(56px, 6.5vw, 112px)',
              lineHeight: 0.96, letterSpacing: '-0.024em',
              color: 'var(--tk-paper)', margin: '24px 0 0',
            }}>
              NorthTK<span style={{ color: 'var(--tk-coral)' }}>.</span>
            </h2>
            <p style={{ fontFamily: 'var(--tk-sans)', fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: 'rgba(255,255,255,0.85)', marginTop: 28 }}>
              The intelligence layer underneath every Title TK engagement. Built for the moments where the story has to land.
            </p>
            <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)', marginTop: 20 }}>
              Maps your category, scores the right reporters, and tracks the conversation in real time — so your team operates with clarity, not guesswork.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <a href="#" className="tk-btn" style={{ background: 'var(--tk-coral)', color: 'var(--tk-ink)' }}>Request access <ArrowRight /></a>
            <a href="#" className="tk-btn" style={{ background: 'transparent', color: 'var(--tk-paper)', border: '1px solid rgba(255,255,255,0.3)' }}>Read more</a>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16 }}>
          {[
            { label: 'Narrative Map' },
            { label: 'Reporter Graph' },
            { label: 'Coverage Pulse' },
            { label: 'Outcome Model' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--tk-paper)', border: '1px solid rgba(255,255,255,0.08)', padding: 16, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)' }}>0{i + 1} · {s.label}</span>
                <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 10, color: 'var(--tk-ink-3)', opacity: 0.5 }}>↗</span>
              </div>
              <Placeholder tone="parchment" label="Screenshot · placeholder" style={{ width: '100%', height: '100%' }} />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PanelFounders() {
  const founders = [
    {
      name: 'Cristina Pena',
      role: 'Co-Founder · Partner',
      bio: "Cristina has built award-winning programs for companies redefining their categories — from Fortune 50 platforms to the founders writing what's next. Twenty years of senior operating experience across earned media, brand, and integrated marketing.",
    },
    {
      name: 'Jason Throckmorton',
      role: 'Co-Founder · Partner',
      bio: 'Jason has co-founded and led some of the most respected agencies in technology PR. He partners with founders at the moments that matter — IPO, acquisition, the launches that change the trajectory.',
    },
    {
      name: 'Mike Barash',
      role: 'Co-Founder · Partner',
      bio: 'Mike runs strategy and creative for Title TK. He has led narrative work for category-defining technology brands across two decades and three economic cycles, with a focus on positioning that compounds.',
    },
  ];
  return (
    <Panel width="140vw" bg="var(--tk-parchment)" label="Founders" num="06">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'end' }}>
          <div>
            <span className="eyebrow">Senior operators · No layers · No theater</span>
            <h2 style={{
              fontFamily: DF, fontWeight: 500,
              fontSize: 'clamp(56px, 6.5vw, 112px)',
              lineHeight: 0.95, letterSpacing: '-0.024em',
              color: 'var(--tk-ink)', margin: '20px 0 0',
            }}>
              The team you actually work with.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--tk-ink-2)', margin: 0, maxWidth: 520 }}>
            Every Title TK engagement is led by a partner. We&apos;re a San Francisco and Marin studio, built by senior operators who&apos;ve worked through multiple technology and economic cycles — across startups, growth companies, and the Fortune 50.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {founders.map((f, i) => (
            <article key={i} style={{
              background: 'var(--tk-paper)', borderRadius: 14, padding: 24,
              display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 20,
              boxShadow: '0 1px 0 rgba(26,24,21,0.04)',
            }}>
              <Placeholder tone="portrait" label={f.name} style={{ width: '100%', aspectRatio: '4/5', borderRadius: 8 }} />
              <div>
                <h3 style={{ fontFamily: DF, fontWeight: 500, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.014em', color: 'var(--tk-ink)', margin: 0 }}>{f.name}</h3>
                <div style={{ fontFamily: 'var(--tk-sans)', fontSize: 13.5, color: 'var(--tk-ink-3)', marginTop: 4 }}>{f.role}</div>
              </div>
              <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--tk-ink-2)', margin: 0 }}>{f.bio}</p>
              <div style={{
                paddingTop: 16, borderTop: '1px solid var(--tk-rule)',
                display: 'flex', justifyContent: 'space-between',
                fontFamily: 'var(--tk-mono)', fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)',
              }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Email →</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PanelProven() {
  const stats = [
    { tag: 'Proven founders',       k: '4',    label: 'Agencies founded and led by Title TK partners.' },
    { tag: 'Proven scale',          k: '150+', label: 'Companies served, pre-seed to Fortune 50.' },
    { tag: 'Proven outcomes',       k: '20+',  label: 'IPOs and M&A exits supported.' },
    { tag: 'Proven under pressure', k: '50+',  label: 'Companies, products and initiatives launched.' },
  ];
  return (
    <Panel width="100vw" bg="var(--tk-ink)" label="By the numbers" num="07">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 64 }}>
        <div style={{ maxWidth: 880 }}>
          <span className="eyebrow" style={{ color: 'var(--tk-coral)' }}>Proven</span>
          <h2 style={{
            fontFamily: DF, fontWeight: 500,
            fontSize: 'clamp(56px, 7vw, 128px)',
            lineHeight: 0.95, letterSpacing: '-0.024em',
            color: 'var(--tk-paper)', margin: '20px 0 0',
          }}>
            Twenty years of receipts.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'stretch' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
              display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-coral)' }}>{s.tag}</span>
              <div style={{ fontFamily: DF, fontWeight: 500, fontSize: 'clamp(80px, 9vw, 168px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--tk-paper)' }}>{s.k}</div>
              <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 15, lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PanelStories() {
  const stories = [
    {
      tag: 'Strategy',
      date: 'April 18, 2026',
      title: "The narrative isn't a deck. It's a discipline.",
      excerpt: "Why most growth companies lose the room before the pitch even starts — and the three questions every founder should answer before going to market.",
      tone: 'coral' as PlaceholderTone,
    },
    {
      tag: 'Field Notes',
      date: 'March 27, 2026',
      title: 'What twenty years of pitches actually taught us.',
      excerpt: "Reporter relationships compound. Categories get rewritten. The good stories get faster, not louder. A senior operator's playbook.",
      tone: 'parchment' as PlaceholderTone,
    },
  ];
  return (
    <Panel width="140vw" bg="var(--tk-paper)" label="Journal" num="08">
      <div style={{ position: 'absolute', top: 160, left: 96, right: 96, bottom: 96, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end' }}>
          <div>
            <span className="eyebrow">Journal</span>
            <h2 style={{
              fontFamily: DF, fontWeight: 500,
              fontSize: 'clamp(56px, 7vw, 120px)',
              lineHeight: 0.96, letterSpacing: '-0.024em',
              color: 'var(--tk-ink)', margin: '20px 0 0',
            }}>
              Stories &amp; field notes.
            </h2>
            <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
              {['All', 'Strategy', 'Field Notes', 'Press', 'Studio'].map((t, i) => (
                <a key={i} href="#" style={{ fontFamily: 'var(--tk-sans)', fontSize: 15, color: i === 0 ? 'var(--tk-ink)' : 'var(--tk-ink-3)', textDecoration: i === 0 ? 'underline' : 'none', textUnderlineOffset: 4 }}>{t}</a>
              ))}
            </div>
          </div>
          <a href="#" style={{ fontFamily: 'var(--tk-sans)', fontSize: 15, fontWeight: 500, color: 'var(--tk-ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 20px', border: '1px solid var(--tk-ink)', borderRadius: 999 }}>
            Read the journal <ArrowRight size={14} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {stories.map((s, i) => (
            <a key={i} href="#" style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 24, textDecoration: 'none', color: 'inherit', minHeight: 0 }}>
              <Placeholder tone={s.tone} label={`Editorial · 0${i + 1}`} style={{ width: '100%', height: '100%', minHeight: 0, borderRadius: 6 }} />
              <div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)' }}>
                  <span style={{ color: 'var(--tk-coral-deep)' }}>{s.tag}</span>
                  <span>{s.date}</span>
                </div>
                <h3 style={{ fontFamily: DF, fontWeight: 500, fontSize: 34, lineHeight: 1.15, letterSpacing: '-0.018em', color: 'var(--tk-ink)', margin: '12px 0 0' }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 16, lineHeight: 1.55, color: 'var(--tk-ink-2)', marginTop: 12, marginBottom: 16, maxWidth: 560 }}>{s.excerpt}</p>
                <span style={{ fontFamily: 'var(--tk-sans)', fontSize: 14, fontWeight: 500, color: 'var(--tk-ink)', display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--tk-ink)', paddingBottom: 2 }}>
                  Read story <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function ContactForm() {
  const inputStyle: React.CSSProperties = {
    background: 'var(--tk-paper-2)', border: '1px solid var(--tk-rule)', borderRadius: 4,
    padding: '12px 14px', fontFamily: 'var(--tk-sans)', fontSize: 15,
    color: 'var(--tk-ink)', width: '100%',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--tk-mono)', fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--tk-ink-3)',
    marginBottom: 6, display: 'block',
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div><label style={labelStyle}>Name</label><input style={inputStyle} placeholder="Riley Park" /></div>
        <div><label style={labelStyle}>Company</label><input style={inputStyle} placeholder="Acme, Inc." /></div>
      </div>
      <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} placeholder="riley@acme.com" /></div>
      <div>
        <label style={labelStyle}>Moment</label>
        <select style={inputStyle} defaultValue="">
          <option value="" disabled>Pick the closest one</option>
          <option>Launch</option>
          <option>Raise</option>
          <option>Repositioning</option>
          <option>Crisis / inflection</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>What&apos;s the story?</label>
        <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="A launch, a raise, a category we want to own…" />
      </div>
      <button type="submit" className="tk-btn" style={{ marginTop: 4, background: 'var(--tk-ink)', color: 'var(--tk-paper)', border: 'none' }}>
        Send <ArrowRight />
      </button>
    </form>
  );
}

function PanelContact() {
  const moments = [
    { k: 'A launch',        d: "Product, company, or category — the first impression that sets the next two years." },
    { k: 'A raise',         d: 'Series A through pre-IPO. Position the round, prep the press, control the narrative.' },
    { k: 'A repositioning', d: "When the story you've been telling has stopped doing the work it needs to do." },
    { k: 'A reckoning',     d: 'Crisis, leadership change, the moment that needs the right voice in the right room.' },
  ];
  return (
    <Panel width="140vw" bg="var(--tk-coral)" label="Contact" num="09">
      <div style={{ position: 'absolute', top: 140, left: 96, right: 96, bottom: 64, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="eyebrow" style={{ color: 'rgba(26,24,21,0.65)' }}>If it matters, we want to hear about it</span>
            <h2 style={{
              fontFamily: DF, fontWeight: 500,
              fontSize: 'clamp(80px, 10vw, 200px)',
              lineHeight: 0.9, letterSpacing: '-0.03em',
              color: 'var(--tk-ink)', margin: '20px 0 0',
            }}>
              What&apos;s<br />on its way<span style={{ color: 'var(--tk-paper)' }}>?</span>
            </h2>
            <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 20, lineHeight: 1.5, color: 'var(--tk-ink)', marginTop: 28, maxWidth: 600 }}>
              The best calls we get are early — before the press release, before the announcement, before the room is set. Tell us what you&apos;re working on and a partner will write back within one business day.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }}>
            {moments.map((m, i) => (
              <div key={i} style={{ paddingTop: 16, borderTop: '1px solid rgba(26,24,21,0.3)' }}>
                <div style={{ fontFamily: DF, fontWeight: 500, fontSize: 22, letterSpacing: '-0.014em', color: 'var(--tk-ink)' }}>{m.k}</div>
                <div style={{ fontFamily: 'var(--tk-sans)', fontSize: 14, lineHeight: 1.5, color: 'var(--tk-charcoal)', marginTop: 6 }}>{m.d}</div>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', gap: 32, marginTop: 32, paddingTop: 20,
            borderTop: '1px solid rgba(26,24,21,0.3)',
            fontFamily: 'var(--tk-mono)', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,24,21,0.7)',
          }}>
            <span>partners@titletk.co</span>
            <span>+1 (415) 305-9476</span>
            <span>San Francisco · Marin</span>
          </div>
        </div>
        <div style={{ background: 'var(--tk-paper)', padding: 32, borderRadius: 6, border: '1px solid rgba(26,24,21,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <span className="eyebrow">Tell us what you&apos;re working on</span>
            <span style={{ fontFamily: 'var(--tk-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tk-ink-3)' }}>~30 sec</span>
          </div>
          <ContactForm />
          <div style={{ marginTop: 'auto', paddingTop: 20, fontFamily: 'var(--tk-sans)', fontSize: 12, lineHeight: 1.5, color: 'var(--tk-ink-3)' }}>
            We respond within one business day. Conversations stay confidential — even when we don&apos;t end up working together.
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════

export default function App() {
  return (
    <HorizontalScroll>
      <PanelHero />
      <PanelLogos />
      <PanelManifesto />
      <PanelWork />
      <PanelServices />
      <PanelProduct />
      <PanelFounders />
      <PanelProven />
      <PanelStories />
      <PanelContact />
    </HorizontalScroll>
  );
}
