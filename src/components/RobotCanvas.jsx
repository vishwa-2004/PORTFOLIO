import { useEffect, useRef } from 'react'

export default function RobotCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    c.width = 420; c.height = 480
    let raf, rotY = 0.3, rotX = 0.1, scroll = 0
    let mouseX = 0, mouseY = 0, targetRY = 0.3, targetRX = 0.1

    const onMouse = e => {
      const r = c.getBoundingClientRect()
      mouseX = ((e.clientX - r.left) / r.width - .5) * 2
      mouseY = ((e.clientY - r.top) / r.height - .5) * 2
      targetRY = 0.3 + mouseX * 0.6
      targetRX = 0.1 - mouseY * 0.25
    }
    const onScroll = () => { scroll = window.scrollY / 1000 }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll)

    // 3D projection
    const project = (x, y, z, ry, rx, scale = 160, cx = 210, cy = 240) => {
      // rotate Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      let x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY
      // rotate X
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      let y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX
      const fov = 4 / (4 + z2)
      return { x: cx + x1 * scale * fov, y: cy + y1 * scale * fov, z: z2, a: fov }
    }

    // Robot geometry
    const box = (x1,y1,z1,x2,y2,z2) => {
      const v = [
        [x1,y1,z1],[x2,y1,z1],[x2,y2,z1],[x1,y2,z1],
        [x1,y1,z2],[x2,y1,z2],[x2,y2,z2],[x1,y2,z2],
      ]
      const e = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
      return { v, e }
    }

    const parts = [
      { geo: box(-.35,.75,-.25,.35,1.2,.25), col:'#00e5b8', label:'HEAD', glow:.6 },
      { geo: box(-.55,-.05,-.3,.55,.75,.3), col:'#00e5b8', label:'BODY', glow:.9 },
      // arms
      { geo: box(-.9,-.05,-.15,-.58,.65,.15), col:'#ff6b35', label:'L_ARM', glow:.5 },
      { geo: box(.58,-.05,-.15,.9,.65,.15), col:'#ff6b35', label:'R_ARM', glow:.5 },
      // legs
      { geo: box(-.42,-.85,-.15,-.1,-.05,.15), col:'#00e5b8', label:'L_LEG', glow:.5 },
      { geo: box(.1,-.85,-.15,.42,-.05,.15), col:'#00e5b8', label:'R_LEG', glow:.5 },
      // load carrier (back)
      { geo: box(-.55,.1,.3,.55,.7,.75), col:'#f0a500', label:'LOAD', glow:.7 },
    ]

    // Sensor lines (IR)
    const sensors = [
      { from:[-.55,.4,-.3], to:[-1.2,.4,-.3], col:'#ff6b35' },
      { from:[.55,.4,-.3],  to:[1.2,.4,-.3],  col:'#ff6b35' },
      { from:[0,1.2,-.25],  to:[0,1.4,-.6],   col:'#00e5b8' },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)

      rotY += (targetRY - rotY) * 0.04
      rotX += (targetRX - rotX) * 0.04

      const ry = rotY + scroll * .5, rx = rotX

      // Draw parts
      parts.forEach(p => {
        const { v, e } = p.geo
        const projected = v.map(([x,y,z]) => project(x,y,z,ry,rx))

        ctx.save()
        ctx.strokeStyle = p.col
        ctx.lineWidth = 1
        ctx.globalAlpha = p.glow
        ctx.shadowColor = p.col
        ctx.shadowBlur = 8

        e.forEach(([a, b]) => {
          ctx.beginPath()
          ctx.moveTo(projected[a].x, projected[a].y)
          ctx.lineTo(projected[b].x, projected[b].y)
          ctx.stroke()
        })

        // Draw vertices
        projected.forEach(pt => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 2, 0, Math.PI*2)
          ctx.fillStyle = p.col; ctx.globalAlpha = p.glow * .8; ctx.fill()
        })

        ctx.restore()
      })

      // Sensor beams
      sensors.forEach(s => {
        const a = project(...s.from, ry, rx)
        const b = project(...s.to, ry, rx)
        ctx.save()
        ctx.strokeStyle = s.col; ctx.lineWidth = 1; ctx.globalAlpha = .5
        ctx.setLineDash([4, 4]); ctx.lineDashOffset = -Date.now() * .005
        ctx.shadowColor = s.col; ctx.shadowBlur = 6
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        ctx.restore()
      })

      // Ground shadow
      ctx.save()
      ctx.globalAlpha = .08
      const grad = ctx.createRadialGradient(210, 410, 0, 210, 410, 120)
      grad.addColorStop(0, '#00e5b8'); grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad; ctx.fillRect(0, 360, c.width, 80)
      ctx.restore()

      // Label: UNIT-01
      ctx.save()
      ctx.font = '500 10px "JetBrains Mono"'
      ctx.fillStyle = 'rgba(0,229,184,0.4)'
      ctx.textAlign = 'center'
      ctx.fillText('UNIT-01 // AUTONOMOUS LOAD CARRIER', 210, 460)
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return <canvas ref={ref} style={{ width: 420, height: 480, maxWidth: '100%', opacity: .92 }} />
}
