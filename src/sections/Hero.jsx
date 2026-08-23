import { useTypewriter, useCounter } from '../components/hooks.js'
import RobotCanvas from '../components/RobotCanvas.jsx'
import { ME, PILLS } from '../data.js'

const ROLES = ['Mechanical Engineer', 'CAD Designer', 'Robotics Builder', 'IEEE NKSS SAC Member', 'Automation Enthusiast']

function StatPill({ target, label, isFloat, color = '#00e5b8' }) {
  const [ref, v] = useCounter(target, isFloat)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '2rem', fontWeight: 900, color, textShadow: `0 0 20px ${color}66`, lineHeight: 1 }}>{v}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'var(--body)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '.4rem' }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section className="hero" id="about" style={{ gap: '4rem', flexWrap: 'wrap' }}>
      {/* LEFT */}
      <div style={{ flex: '1 1 520px', maxWidth: 680 }}>
        {/* availability tag */}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.74rem', color: 'var(--teal)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
          <span className="ping" />
          Available for Internships · Bagalkot, Karnataka
        </div>

        {/* NAME */}
        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(2.5rem,7vw,6.5rem)', fontWeight: 900, lineHeight: .9, letterSpacing: '-.02em', marginBottom: '1.2rem' }}>
         <span style={{ display: 'block', color: 'var(--white)' }}>VISHWANATH</span>
         <span style={{ display: 'block', color: 'var(--teal)' }}>DIGGAVI</span>
        </h1>

        {/* TAGLINE */}
        <p style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(.8rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.35)', letterSpacing: '.04em', marginBottom: '1.5rem', maxWidth: 500 }}>
          {ME.tagline}
        </p>

        {/* TYPEWRITER */}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.98rem', color: 'var(--body)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <span style={{ color: 'var(--orange)' }}>&gt;&gt;</span>&nbsp;
          <span style={{ color: 'var(--white)' }}>{role}</span>
          <span className="cursor-blink">_</span>
        </div>

        {/* PILLS */}
        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {PILLS.map(p => (
            <span key={p.label} className="pill" style={{ color: p.color, borderColor: p.color + '40', background: p.color + '0a', fontSize: '.72rem' }}>
              <span style={{ width: 6, height: 6, background: p.color, borderRadius: '50%', display: 'inline-block' }} />
              {p.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <a href="#project" className="cta-primary">Explore Robot Project</a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" className="cta-orange">LinkedIn Profile</a>
          <a href="#contact" className="cta-outline">Contact Engineer</a>
        </div>

        {/* STATS */}
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', paddingTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { val: 7.14, label: 'CGPA / 10', float: true, color: '#00e5b8' },
            { val: 4,    label: 'Hackathons', color: '#ff6b35' },
            { val: 3,    label: 'Certifications', color: '#f0a500' },
            { val: 100,  label: 'Students Mentored', color: '#a78bfa' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ flex: 1, minWidth: 90, paddingRight: '1.5rem', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none', marginRight: i < arr.length - 1 ? '1.5rem' : 0 }}>
              <StatPill target={s.val} label={s.label} isFloat={s.float} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — 3D Robot */}
      <div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
        <div className="float">
          <RobotCanvas />
        </div>
        {/* Award float card */}
        <div className="gc float" style={{ padding: '1.2rem 1.8rem', textAlign: 'center', border: '1px solid rgba(240,165,0,0.3)', background: 'rgba(240,165,0,0.04)', animationDelay: '1s' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: '.3rem' }}>🏆</div>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '.72rem', color: 'var(--gold)', fontWeight: 700 }}>2nd Prize</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'var(--body)', marginTop: '.25rem' }}>Anveshana 2024</div>
        </div>
      </div>
    </section>
  )
}
