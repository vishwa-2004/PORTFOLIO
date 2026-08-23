import { useEffect, useRef } from 'react'
import { TIMELINE } from '../data.js'

function useRevealAll(ref) {
  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.tl-item')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ref])
}

export default function Timeline() {
  const wrapRef = useRef(null)
  const secRef = useRef(null)
  useRevealAll(wrapRef)
  useEffect(() => {
    const el = secRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('on'); obs.disconnect() } }, { threshold: .1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <section id="leadership" className="alt">
      <div ref={secRef} className="reveal">
        <div className="sec-pre">leadership.circuit</div>
        <h2 className="sec-title">Leadership <span style={{color:'var(--teal)'}}>& Roles</span></h2>
      </div>
      <div className="tl-wrap" ref={wrapRef}>
        {TIMELINE.map((item, i) => {
          const typeIcon = {ieee:'⚡',leadership:'🎯'}[item.type]
          return (
            <div key={i} className="tl-item reveal" style={{transitionDelay:`${i*.12}s`}}>
              <div className="tl-dot" style={{borderColor:item.color,color:item.color,boxShadow:`0 0 14px ${item.color}`}}/>
              <div className="gc" style={{padding:'1.6rem 2rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'.8rem',marginBottom:'.6rem'}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.3rem'}}>
                      <span style={{fontSize:'1.1rem'}}>{typeIcon}</span>
                      <span style={{fontFamily:"'Orbitron',monospace",fontSize:'.82rem',fontWeight:700,color:item.color}}>{item.role}</span>
                    </div>
                    <div style={{fontWeight:600,color:'var(--white)',fontSize:'.95rem'}}>{item.org}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'.8rem',flexWrap:'wrap'}}>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.68rem',color:item.color,background:item.color+'12',border:`1px solid ${item.color}30`,padding:'.22rem .75rem',borderRadius:3}}>{item.year}</span>
                    {item.proof && <a href={item.proof} target="_blank" rel="noreferrer" className="proof-btn" style={{color:item.color,borderColor:item.color+'35',background:item.color+'08'}}>🔗 {item.proofLabel}</a>}
                  </div>
                </div>
                <p style={{fontSize:'.87rem',color:'var(--body)',lineHeight:1.78}}>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
