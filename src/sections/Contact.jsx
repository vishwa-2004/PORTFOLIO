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
          Got an Idea?<br></br> Let's turn it into something real. <br></br> 
        </p>

          {/* console prompt */}
          <div className="console-body">
            <CopyLine icon="✉️" label="Email" value={ME.email} color="var(--teal)" />
            <CopyLine icon="📞" label="Phone" value={ME.phone} color="var(--orange)" />
            <CopyLine icon="🔗" label="LinkedIn" value="linkedin.com/in/vishwanath-diggavi" href={ME.linkedin} color="var(--teal)" />
            <CopyLine icon="🐙" label="GitHub" value="github.com/vishwa-2004" href={ME.github} color="var(--orange)" />
            <CopyLine icon="📍" label="Location" value={ME.location} color="var(--gold)" />
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
