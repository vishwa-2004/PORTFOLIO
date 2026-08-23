import { useReveal, useSkillBar } from '../components/hooks.js'
import { SKILLS } from '../data.js'
import { useState } from 'react'

function SkillBar({ pct, color }) {
  const [ref, w] = useSkillBar(pct)
  return (
    <div ref={ref} className="bar-bg" style={{ marginTop: '.5rem' }}>
      <div className="bar-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg,${color},${color}55)`, boxShadow: `0 0 8px ${color}44` }} />
    </div>
  )
}

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(null)
  const tagColors = { teal: 'var(--teal)', orange: 'var(--orange)', purple: 'var(--purple)', gold: 'var(--gold)' }
  const colorMap = { '#00e5b8': 'teal', '#ff6b35': 'orange', '#a78bfa': 'purple', '#f0a500': 'gold' }
  const tagClass = colorMap[skill.color] || 'teal'

  return (
    <div className={`gc ${skill.color === '#ff6b35' ? 'orange' : ''}`}
      style={{ padding: '1.8rem 2rem', height: '100%' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.4rem' }}>{skill.icon}</span>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.62rem', color: skill.color, textTransform: 'uppercase', letterSpacing: '.12em', opacity: .7 }}>// {skill.id}</div>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '.88rem', fontWeight: 700, color: 'var(--white)' }}>{skill.title}</div>
        </div>
      </div>

      {/* proficiency bar */}
      <SkillBar pct={skill.pct} color={skill.color} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'var(--body)', marginTop: '.3rem', marginBottom: '1.2rem' }}>
        <span>proficiency</span><span style={{ color: skill.color }}>{skill.pct}%</span>
      </div>

      {/* items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {skill.items.map(item => (
          <div key={item.name}
            style={{
              padding: '.6rem .9rem', borderRadius: 6, cursor: 'default',
              background: hovered === item.name ? skill.color + '10' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hovered === item.name ? skill.color + '30' : 'rgba(255,255,255,0.05)'}`,
              transition: 'all .2s',
            }}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ fontWeight: 600, fontSize: '.84rem', color: hovered === item.name ? skill.color : 'var(--white)', transition: 'color .2s' }}>{item.name}</div>
            {hovered === item.name && (
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', color: 'var(--body)', marginTop: '.25rem', animation: 'fadeIn .2s ease' }}>
                ↳ {item.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()
  return (
    <section id="skills">
      <div ref={ref} className="reveal">
        <h2 className="sec-title">Technical <span>Skills</span></h2>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>

        <div className="bento" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem' }}>
          {SKILLS.map(skill => (
            <div key={skill.id} className="bento-lg">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
