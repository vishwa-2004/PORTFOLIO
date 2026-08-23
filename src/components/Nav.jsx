import { useState, useEffect } from 'react'
import { ME } from '../data.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#project', label: 'Project' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#leadership', label: 'Leadership' },
    { href: '#certifications', label: 'Certs' },
    { href: '#hackathons', label: 'Hackathons' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#about" className="nav-logo">
        VD<em>.exe</em>
      </a>
      <ul className="nav-links">
        {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </nav>
  )
}
