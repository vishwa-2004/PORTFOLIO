import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../components/hooks.js'
import { PROJECT } from '../data.js'

function SignalFlow() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll('.flow-line').forEach((el, i) => {
          setTimeout(() => el.style.strokeDashoffset = '0', i * 300)
        })
        obs.disconnect()
      }
    }, { threshold: .5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const nodes = [
    { x: 30,  y: 90, w: 90, h: 36, label: 'IR SENSORS', col: '#ff6b35' },
    { x: 165, y: 50, w: 100, h: 36, label: 'SIGNAL PROC', col: '#a78bfa' },
    { x: 165, y: 130, w: 100, h: 36, label: 'MOTOR CTRL', col: '#a78bfa' },
    { x: 310, y: 90, w: 90, h: 36, label: 'ACTUATORS', col: '#00e5b8' },
    { x: 420, y: 50, w: 90, h: 36, label: 'MOVEMENT', col: '#00e5b8' },
    { x: 420, y: 130, w: 90, h: 36, label: 'LOAD BAY', col: '#f0a500' },
  ]

  const lines = [
    { x1: 120, y1: 108, x2: 165, y2: 68,  col: '#ff6b35' },
    { x1: 120, y1: 108, x2: 165, y2: 148, col: '#ff6b35' },
    { x1: 265, y1: 68,  x2: 310, y2: 108, col: '#a78bfa' },
    { x1: 265, y1: 148, x2: 310, y2: 108, col: '#a78bfa' },
    { x1: 400, y1: 108, x2: 420, y2: 68,  col: '#00e5b8' },
    { x1: 400, y1: 108, x2: 420, y2: 148, col: '#00e5b8' },
  ]

  return (
    <div ref={ref} style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid var(--border)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.66rem', color: 'var(--teal)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '1rem', opacity: .6 }}>
        // sensor_to_actuator_signal_flow
      </div>
      <svg width="100%" viewBox="0 0 540 190" style={{ overflow: 'visible' }}>
        {/* arrows */}
        {lines.map((l, i) => {
          const len = Math.sqrt((l.x2-l.x1)**2 + (l.y2-l.y1)**2)
          return (
            <line key={i} className="flow-line" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.col} strokeWidth="1.5" strokeDasharray={len} strokeDashoffset={len}
              style={{ transition: `stroke-dashoffset .6s ease ${i * .15}s`, markerEnd: `url(#arr${i})` }}
            />
          )
        })}
        {/* arrowheads */}
        <defs>
          {lines.map((l, i) => (
            <marker key={i} id={`arr${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill={l.col} />
            </marker>
          ))}
        </defs>
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="4"
              fill={n.col + '10'} stroke={n.col} strokeWidth="1" />
            <text x={n.x + n.w/2} y={n.y + n.h/2 + 4} textAnchor="middle"
              fill={n.col} fontSize="9" fontFamily="JetBrains Mono" fontWeight="500">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function ProjectSection() {
  const [activeTab, setActiveTab] = useState('mechanical')
  const ref = useReveal()
  const tab = PROJECT.tabs.find(t => t.id === activeTab)

  return (
    <section id="project" className="alt">
      <div ref={ref} className="reveal">
        <h2 className="sec-title">Human-Following <span>Robot</span></h2>

        {/* Header card */}
        <div className="gc" style={{ padding: '2.5rem 3rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderColor: 'rgba(240,165,0,0.25)' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.68rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '.8rem' }}>// project_2024.autonomous</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(1.1rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.2, marginBottom: '.8rem' }}>
              {PROJECT.title}
            </h3>
            <div style={{ fontSize: '.85rem', color: 'var(--body)', marginBottom: '1rem' }}>{PROJECT.venue}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.28)', borderRadius: 5, padding: '.5rem 1.1rem', fontSize: '.8rem', color: 'var(--gold)', fontWeight: 700, fontFamily: "'Orbitron',monospace" }}>
              {PROJECT.award}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
            <a href={PROJECT.proofLink} target="_blank" rel="noreferrer" className="proof-btn gold">
              🔗 View Exhibition Post
            </a>
          </div>
        </div>

        {/* Tabbed detail */}
        <div className="gc" style={{ padding: '2rem 2.5rem' }}>
          <div className="tab-bar">
            {PROJECT.tabs.map(t => (
              <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
            {tab.points.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: '.8rem', padding: '.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '.9rem', color: 'var(--body)', lineHeight: 1.7 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--teal)', fontSize: '.7rem', flexShrink: 0, marginTop: '.12rem' }}>{String(i+1).padStart(2,'0')}.</span>
                {p}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
            {tab.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          {/* Signal flow — show in sensors tab */}
          {activeTab === 'sensors' && <SignalFlow />}
        </div>
      </div>
    </section>
  )
}
