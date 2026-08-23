import { useReveal } from '../components/hooks.js'
import { EDUCATION } from '../data.js'

export default function Education() {
  const ref = useReveal()
  return (
    <section id="education">
      <div ref={ref} className="reveal">
        <h2 className="sec-title">Education <span style={{ color: 'var(--teal)' }}>Matrix</span></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          {EDUCATION.map((e, i) => (
            <div key={i} className="gc reveal" style={{
              padding: '1.6rem 2rem',
              display: 'grid', gridTemplateColumns: '140px 1fr auto',
              gap: '2rem', alignItems: 'center',
              transitionDelay: `${i * .1}s`,
            }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem', color: 'var(--teal)' }}>{e.period}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--white)', marginBottom: '.25rem' }}>{e.degree}</div>
                <div style={{ fontSize: '.84rem', color: 'var(--body)' }}>{e.institute}, {e.location}</div>
                {e.courses && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginTop: '.6rem' }}>
                    {e.courses.map(c => <span key={c} className="tag" style={{ fontSize: '.6rem' }}>{c}</span>)}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1.6rem', fontWeight: 700, color: 'var(--teal)', textShadow: '0 0 20px rgba(0,229,184,0.35)', lineHeight: 1 }}>{e.score}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'var(--body)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.3rem' }}>{e.scoreLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
