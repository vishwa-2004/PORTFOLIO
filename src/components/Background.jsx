import { useEffect, useRef } from 'react'

export default function Background() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let raf, t = 0
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const mouse = { x: c.width / 2, y: c.height / 2 }
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    // Particles
    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.4 + .3,
      col: Math.random() > .65 ? '#00e5b8' : Math.random() > .5 ? '#ff6b35' : '#1a4a8a',
      a: Math.random() * .45 + .07,
    }))

    const frame = () => {
      t += .005
      const W = c.width, H = c.height
      ctx.clearRect(0, 0, W, H)

      // Dark base
      ctx.fillStyle = '#08090c'
      ctx.fillRect(0, 0, W, H)

      // Blueprint grid — major
      ctx.strokeStyle = 'rgba(0,100,180,0.06)'; ctx.lineWidth = 1
      const gx = 80
      for (let x = 0; x < W; x += gx) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += gx) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      // Blueprint grid — minor
      ctx.strokeStyle = 'rgba(0,80,140,0.03)'; ctx.lineWidth = .5
      const gxs = 20
      for (let x = 0; x < W; x += gxs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += gxs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      // Corner brackets
      const br = (x, y, s, flip) => {
        ctx.strokeStyle = 'rgba(0,229,184,0.12)'; ctx.lineWidth = 1.5
        const fx = flip % 2 === 0 ? 1 : -1, fy = flip < 2 ? 1 : -1
        ctx.beginPath(); ctx.moveTo(x, y + fy * s); ctx.lineTo(x, y); ctx.lineTo(x + fx * s, y); ctx.stroke()
      }
      br(20, 20, 30, 0); br(W - 20, 20, 30, 1); br(20, H - 20, 30, 2); br(W - 20, H - 20, 30, 3)

      // Radial accent glows
      const rg1 = ctx.createRadialGradient(W * .8, H * .2, 0, W * .8, H * .2, W * .4)
      rg1.addColorStop(0, 'rgba(255,107,53,0.025)'); rg1.addColorStop(1, 'transparent')
      ctx.fillStyle = rg1; ctx.fillRect(0, 0, W, H)
      const rg2 = ctx.createRadialGradient(W * .1, H * .8, 0, W * .1, H * .8, W * .35)
      rg2.addColorStop(0, 'rgba(0,229,184,0.02)'); rg2.addColorStop(1, 'transparent')
      ctx.fillStyle = rg2; ctx.fillRect(0, 0, W, H)

      // Particles
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.sqrt(dx*dx + dy*dy)
        if (d < 90) { p.x -= dx * .018; p.y -= dy * .018 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = p.a; ctx.fillStyle = p.col; ctx.fill(); ctx.globalAlpha = 1
      })

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy)
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = pts[i].col === '#ff6b35' ? '#ff6b35' : '#00e5b8'
            ctx.globalAlpha = (1 - d / 100) * .08; ctx.lineWidth = .5; ctx.stroke(); ctx.globalAlpha = 1
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} id="bg-canvas" />
}
