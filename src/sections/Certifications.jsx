import { useReveal } from '../components/hooks.js'
import { CERTIFICATIONS } from '../data.js'

export default function Certifications() {
  const ref = useReveal()
  return (
    <section id="certifications">
      <div ref={ref} className="reveal">
        <h2 className="sec-title">Certifications <span style={{ color: 'var(--teal)' }}>& Training</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="gc reveal" style={{
              padding: '2rem',
              borderLeft: `3px solid ${cert.highlight ? 'var(--teal)' : 'rgba(0,229,184,0.2)'}`,
              transitionDelay: `${i * .1}s`,
            }}>
              {/* icon + name */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{cert.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.95rem', color: 'var(--white)', marginBottom: '.25rem' }}>{cert.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--body)' }}>{cert.issuer}</div>
                </div>
              </div>

              {/* duration + proof */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.6rem' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem',
                  color: cert.highlight ? 'var(--teal)' : 'var(--body)',
                  background: cert.highlight ? 'rgba(0,229,184,0.07)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${cert.highlight ? 'rgba(0,229,184,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  padding: '.25rem .75rem', borderRadius: 3, fontWeight: 600,
                }}>
                  ⏱ {cert.duration}
                </span>
                <a href={cert.proof} target="_blank" rel="noreferrer" className="proof-btn">
                  🏅 {cert.proofLabel}
                </a>
              </div>

              {/* highlight glow for top certs */}
              {cert.highlight && (
                <div style={{ marginTop: '.8rem', fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', color: 'var(--teal)', opacity: .5, letterSpacing: '.06em' }}>
                  // verified · click to view certificate
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
