import { useState } from 'react'
import { useReveal } from '../components/hooks.js'
import { ME } from '../data.js'

function CopyLine({ icon, label, value, href, color = 'var(--teal)' }) {
  const [copied, setCopied] = useState(false)
  const doCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div className="console-line" style={{ borderRadius: 6 }}>
      <span style={{ fontSize: '1.1rem', flex: '0 0 24px' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', color: 'var(--body)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.2rem' }}>{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" style={{ color, fontSize: '.88rem', textDecoration: 'none', fontWeight: 500 }}>{value}</a>
        ) : (
          <div style={{ color, fontSize: '.88rem', fontWeight: 500 }}>{value}</div>
        )}
      </div>
      {!href && (
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={doCopy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      )}
    </div>
  )
}

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="alt">
      <div ref={ref} className="reveal" style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="sec-title">
          Let's Build <span style={{ color: 'var(--teal)' }}>Something</span>
        </h2>
        <p style={{ color: 'var(--body)', marginBottom: '2.5rem', lineHeight: 1.85, fontSize: '.98rem' }}>
          Open to internships in core mechanical engineering, EV, robotics, and automation.<br/>
          All links below are live — click to connect instantly.
        </p>

        {/* Console */}
        <div className="console" style={{ textAlign: 'left' }}>
          {/* console title bar */}
          <div className="console-bar">
            <div className="console-dot" style={{ background: '#ff5f56' }} />
            <div className="console-dot" style={{ background: '#ffbd2e' }} />
            <div className="console-dot" style={{ background: '#27c93f' }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.68rem', color: 'var(--body)', marginLeft: '.5rem' }}>
              vishwanath_diggavi — contact.console
            </span>
          </div>

          {/* console prompt */}
          <div className="console-body">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--teal)', marginBottom: '1.2rem', opacity: .6 }}>
              $ contact --all --connect<br/>
              <span style={{ color: 'var(--body)' }}>// Displaying all contact channels...</span>
            </div>

            <CopyLine icon="✉" label="Email" value={ME.email} color="var(--teal)" />
            <CopyLine icon="📞" label="Phone" value={ME.phone} color="var(--orange)" />
            <CopyLine icon="🔗" label="LinkedIn" value="linkedin.com/in/vishwanath-diggavi" href={ME.linkedin} color="var(--teal)" />
            <CopyLine icon="🌐" label="Portfolio" value="vishwa-2004.github.io/PORTFOLIO_v4" href={ME.portfolio} color="var(--purple)" />
            <CopyLine icon="⌥" label="GitHub" value="github.com/vishwa-2004" href={ME.github} color="var(--body)" />
            <CopyLine icon="📍" label="Location" value={ME.location} color="var(--gold)" />

            <div style={{ marginTop: '1.5rem', fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: 'rgba(0,229,184,0.35)' }}>
              $ _ <span className="cursor-blink">|</span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a href={`mailto:${ME.email}`} className="cta-primary">Send Email Directly</a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" className="cta-outline">Open LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
