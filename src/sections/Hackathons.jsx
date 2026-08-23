import { useReveal } from '../components/hooks.js'
import { HACKATHONS } from '../data.js'

export default function Hackathons() {
  const ref = useReveal()
  return (
    <section id="hackathons" className="alt">
      <div ref={ref} className="reveal">
        <div className="sec-pre">competitions.log</div>
        <h2 className="sec-title">Hackathon <span style={{ color: 'var(--teal)' }}>Records</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {HACKATHONS.map((h, i) => (
            <div key={i} className="gc reveal" style={{
              padding: '2rem',
              position: 'relative', overflow: 'hidden',
              transitionDelay: `${i * .1}s`,
              borderTop: `3px solid ${h.color}`,
            }}>
              {/* big number watermark */}
              <div style={{
                position: 'absolute', top: 6, right: 14,
                fontFamily: "'Orbitron',monospace", fontSize: '4rem', fontWeight: 900,
                color: h.color + '08', lineHeight: 1, pointerEvents: 'none',
              }}>{h.n}</div>

              {/* theme badge */}
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: '.62rem',
                color: h.color, textTransform: 'uppercase', letterSpacing: '.12em',
                marginBottom: '.7rem',
              }}>{h.theme}</div>

              {/* name */}
              <div style={{
                fontFamily: "'Orbitron',monospace", fontWeight: 700,
                fontSize: '1.05rem', color: 'var(--white)', marginBottom: '.35rem',
              }}>{h.name}</div>

              {/* venue */}
              <div style={{ fontSize: '.82rem', color: 'var(--body)', marginBottom: '1.2rem' }}>{h.venue}</div>

              {/* certificate link */}
              <a href={h.cert} target="_blank" rel="noreferrer"
                className="proof-btn"
                style={{ color: h.color, borderColor: h.color + '35', background: h.color + '08' }}>
                📄 View Certificate
              </a>

              {/* bottom accent line */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${h.color},transparent)`, opacity: .3 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
