import React from 'react';

export function Logo({ light, size = 22 }: { light?: boolean; size?: number }) {
  const color = light ? 'var(--tk-paper)' : 'var(--tk-ink)';
  return (
    <a href="#home" className="logo" style={{ color, fontSize: size > 22 ? 22 : 19 }}>
      <svg
        width={size + 4}
        height={size + 4}
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M 22 8 C 14 8, 11 12, 11 20 L 11 28 C 11 30.5, 9 31.5, 6 32 C 9 32.5, 11 33.5, 11 36 L 11 44 C 11 52, 14 56, 22 56" />
        <path d="M 42 8 C 50 8, 53 12, 53 20 L 53 28 C 53 30.5, 55 31.5, 58 32 C 55 32.5, 53 33.5, 53 36 L 53 44 C 53 52, 50 56, 42 56" />
      </svg>
      <span>title tk</span>
    </a>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function NorthTKLockup({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fs = size === 'lg' ? 28 : size === 'sm' ? 14 : 18;
  const dotSize = fs * 1.25;
  return (
    <span className="nk-lockup" style={{ fontSize: fs, gap: fs * 0.5 }}>
      <span
        className="mark"
        style={{ width: dotSize, height: dotSize, fontSize: fs * 0.62, borderRadius: 4 }}
      >
        ↑
      </span>
      <span style={{ fontWeight: 600, letterSpacing: '-0.012em' }}>
        NorthTK<span style={{ color: 'var(--nk-lapis)' }}>.</span>
      </span>
    </span>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 18 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map((l, i) => (
          <li key={i} style={{ fontFamily: 'var(--tk-sans)', fontSize: 14.5, color: 'rgba(255,255,255,0.85)' }}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="ink-section" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 56, paddingBottom: 64 }}>
          <div>
            <Logo light />
            <p style={{ fontFamily: 'var(--tk-sans)', fontSize: 17, color: 'rgba(255,255,255,0.75)', marginTop: 24, maxWidth: 380, lineHeight: 1.5 }}>
              PR, content, and strategy for companies building what&apos;s next. Powered by NorthTK — our intelligence platform for category-defining stories.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <span className="tk-pill tk-pill-orange">San Francisco</span>
              <span className="tk-pill" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--tk-paper)', border: '1px solid rgba(255,255,255,0.2)' }}>New York</span>
            </div>
          </div>
          <FooterCol title="Studio" links={['Services', 'Work', 'About', 'Careers']} />
          <FooterCol title="NorthTK" links={['Overview', 'Capabilities', 'Security', 'Request access']} />
          <FooterCol title="Reach" links={['partners@titletk.co', '+1 (415) 305-9476', '1 Ferry Building', 'San Francisco · Suite 201']} />
        </div>
        <div className="hr" />
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 24,
          alignItems: 'center', paddingTop: 24,
          fontFamily: 'var(--tk-mono)', fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
        }}>
          <span>© Title TK 2026 · All Rights Reserved</span>
          <span>NorthTK™ is a Title TK product</span>
          <span>Privacy</span>
          <span>v.2.0</span>
        </div>
      </div>
    </footer>
  );
}
