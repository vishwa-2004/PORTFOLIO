import { useEffect } from 'react'
import Background from './components/Background.jsx'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import ProjectSection from './sections/Project.jsx'
import Skills from './sections/Skills.jsx'
import Education from './sections/Education.jsx'
import Timeline from './sections/Timeline.jsx'
import Certifications from './sections/Certifications.jsx'
import Hackathons from './sections/Hackathons.jsx'
import Contact from './sections/Contact.jsx'
import { useSpotlight } from './components/hooks.js'

// Reveal observer for all .reveal elements
function useGlobalReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

// Card glow effect
function useGlobalCardGlow() {
  useEffect(() => {
    const handler = e => {
      const card = e.target.closest('.gc')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%')
      card.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%')
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
}

export default function App() {
  useSpotlight()
  useGlobalReveal()
  useGlobalCardGlow()

  return (
    <>
      <Background />
      <div className="spotlight" />
      <div className="scanline" />
      <Nav />
      <main>
        <Hero />
        <ProjectSection />
        <Skills />
        <Education />
        <Timeline />
        <Certifications />
        <Hackathons />
        <Contact />
      </main>
      <footer style={{
        position: 'relative', zIndex: 3, textAlign: 'center',
        padding: '2rem 2rem', borderTop: '1px solid rgba(0,229,184,0.1)',
        fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: 'var(--body)',
      }}>
        <span style={{ color: 'var(--teal)' }}>vishwanath_diggavi</span>.exe
        &nbsp;·&nbsp; B.E. Mechanical Engineering · BEC Bagalkot
        &nbsp;·&nbsp; IEEE NKSS SAC Member
        &nbsp;·&nbsp; <span style={{ color: 'var(--orange)' }}>2025</span>
      </footer>
    </>
  )
}
