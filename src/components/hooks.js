import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, speed = 75, pause = 2300) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[wi]
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, ci + 1))
        if (ci + 1 === w.length) setTimeout(() => setDel(true), pause)
        else setCi(c => c + 1)
      } else {
        setText(w.slice(0, ci - 1))
        if (ci === 0) { setDel(false); setWi(i => (i + 1) % words.length) }
        else setCi(c => c - 1)
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed, pause])
  return text
}

export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('on'); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

export function useCounter(target, isFloat = false) {
  const [v, setV] = useState(isFloat ? '0.00' : 0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let n = 0; const steps = 60; const inc = target / steps
      const t = setInterval(() => {
        n += inc
        if (n >= target) { setV(isFloat ? target.toFixed(2) : target); clearInterval(t) }
        else setV(isFloat ? n.toFixed(2) : Math.floor(n))
      }, 22)
      obs.disconnect()
    }, { threshold: .5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, isFloat])
  return [ref, v]
}

export function useSkillBar(pct) {
  const [w, setW] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(pct), 200); obs.disconnect() }
    }, { threshold: .4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])
  return [ref, w]
}

export function useSpotlight() {
  useEffect(() => {
    const el = document.querySelector('.spotlight')
    if (!el) return
    const h = e => el.style.setProperty('--mx', e.clientX + 'px') || el.style.setProperty('--my', e.clientY + 'px')
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
}

export function useCardGlow() {
  useEffect(() => {
    const cards = document.querySelectorAll('.gc')
    const handlers = []
    cards.forEach(card => {
      const h = e => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%')
        card.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%')
      }
      card.addEventListener('mousemove', h)
      handlers.push({ card, h })
    })
    return () => handlers.forEach(({ card, h }) => card.removeEventListener('mousemove', h))
  })
}
