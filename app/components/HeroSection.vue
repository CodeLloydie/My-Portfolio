<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden px-8">

    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />

    <div class="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-20 py-28">

      <!-- Business Card -->
      <div class="animate-fade-in" style="animation-delay: 0.2s; opacity: 0;">
        <div
          class="business-card relative w-90 sm:w-105 bg-graphite-900 border border-graphite-600 p-10 group hover:border-graphite-400 transition-all duration-500 shadow-2xl cursor-pointer"
          @click="cardOpen = true"
          title="Click to open business card"
        >
          <span class="corner top-0 left-0 border-t border-l border-graphite-400" />
          <span class="corner top-0 right-0 border-t border-r border-graphite-400" />
          <span class="corner bottom-0 left-0 border-b border-l border-graphite-400" />
          <span class="corner bottom-0 right-0 border-b border-r border-graphite-400" />

          <!-- Profile photo -->
          <div class="w-28 h-28 border border-graphite-500 mb-8 overflow-hidden">
            <img src="~/assets/imgs/ME-1.jpg" alt="Marlloyd Honrado" class="w-full h-full object-cover" />
          </div>

          <h1 class="text-graphite-50 text-2xl font-medium tracking-wider uppercase leading-none mb-2">
            Marlloyd I. Honrado
          </h1>
          <p class="text-graphite-400 text-sm tracking-widest uppercase mb-8">
            Web Developer &nbsp;/&nbsp; Graphic Designer
          </p>

          <div class="w-full h-px bg-graphite-700 mb-8" />

          <ul class="space-y-3">
            <li class="flex items-center gap-4">
              <span class="text-graphite-500 w-5 text-sm">@</span>
              <span class="text-graphite-300 text-sm">honradomarlloyd@gmail.com</span>
            </li>
            <li class="flex items-center gap-4">
              <span class="text-graphite-500 w-5 text-sm">#</span>
              <span class="text-graphite-300 text-sm">+63 908 138 1680</span>
            </li>
            <li class="flex items-center gap-4">
              <span class="text-graphite-500 w-5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </span>
              <span class="text-graphite-300 text-sm">github.com/CodeLloydie</span>
            </li>
          </ul>

          <!-- Socials -->
          <div class="flex items-center gap-5 mt-6">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" :aria-label="s.label"
              class="text-graphite-500 hover:text-graphite-100 transition-colors duration-200"
              @click.stop
            >
              <component :is="s.icon" class="w-4 h-4" />
            </a>
          </div>

          <!-- click hint -->
          <p class="text-graphite-600 text-xs tracking-widest uppercase mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to view full card
          </p>
        </div>
      </div>

      <!-- Text block -->
      <div class="max-w-lg text-center lg:text-left">
        <p
          class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5 animate-fade-up"
          style="animation-delay: 0.3s; opacity: 0;"
        >
          — Portfolio
        </p>

        <h2
          class="text-graphite-100 text-5xl sm:text-6xl font-light leading-tight tracking-tight mb-8 animate-fade-up"
          style="animation-delay: 0.45s; opacity: 0;"
        >
          Building things<br />
          <span class="text-graphite-400">that look</span> good<br />
          <span class="text-graphite-400">and</span> work right.
        </h2>

        <p
          class="text-graphite-400 text-base leading-relaxed mb-10 animate-fade-up"
          style="animation-delay: 0.6s; opacity: 0;"
        >
          Web developer in the making. Graphic designer by instinct.<br />
          Security curious. Based in the Philippines.
        </p>

        <div
          class="flex items-center gap-5 justify-center lg:justify-start animate-fade-up"
          style="animation-delay: 0.75s; opacity: 0;"
        >
          <a
            href="#projects"
            class="px-7 py-3 bg-graphite-100 text-graphite-950 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors duration-200"
          >
            View Work
          </a>
          <a
            :href="cvUrl"
            target="_blank"
            rel="noopener"
            class="px-7 py-3 border border-graphite-600 text-graphite-300 text-sm tracking-widest uppercase hover:border-graphite-300 hover:text-graphite-100 transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download CV
          </a>
        </div>

      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style="animation-delay: 1.2s; opacity: 0;">
      <span class="text-graphite-600 text-sm tracking-widest uppercase">Scroll</span>
      <span class="w-px h-10 bg-linear-to-b from-graphite-600 to-transparent" />
    </div>

  </section>

  <BusinessCardModal v-model="cardOpen" />
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const cardOpen = ref(false)
const config = useRuntimeConfig()
const cvUrl = computed(() => config.app.baseURL.replace(/\/$/, '') + '/docs/Marlloyd_Honrado_CV.pdf')

// ── Canvas: connecting nodes + circuit lines ──────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  let W = 0, H = 0, raf = 0

  type Node = { x: number; y: number; vx: number; vy: number; r: number }
  const COUNT = 38
  const MAX_DIST = 220
  const nodes: Node[] = []

  function resize() {
    W = canvas!.width  = canvas!.offsetWidth
    H = canvas!.height = canvas!.offsetHeight
  }

  function init() {
    nodes.length = 0

    // 1 giant hub node — starts near center, drifts slowly
    nodes.push({
      x:  W * 0.5,
      y:  H * 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r:  28,
    })

    // rest are small/medium satellites
    for (let i = 1; i < COUNT; i++) {
      const rand = Math.random()
      const r = rand < 0.15 ? 6 + Math.random() * 4   // medium
              : 2 + Math.random() * 2.5                // small
      nodes.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r,
      })
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H)

    for (const n of nodes) {
      n.x += n.vx
      n.y += n.vy
      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0 || n.y > H) n.vy *= -1
    }

    // Lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const ni = nodes[i]!, nj = nodes[j]!
        const dx = ni.x - nj.x
        const dy = ni.y - nj.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35
          ctx.beginPath()
          ctx.moveTo(ni.x, ni.y)
          ctx.lineTo(nj.x, nj.y)
          ctx.strokeStyle = `rgba(180,180,180,${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    // Nodes — filled circles, varying radius
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]!
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180,180,180,${i === 0 ? 0.45 : n.r > 4 ? 0.28 : 0.22})`
      ctx.fill()

      // outer ring on giant node only
      if (i === 0) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(180,180,180,0.12)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    raf = requestAnimationFrame(tick)
  }

  resize()
  init()
  tick()

  const ro = new ResizeObserver(() => { resize(); init() })
  ro.observe(canvas)

  onUnmounted(() => { cancelAnimationFrame(raf); ro.disconnect() })
})

const IconFacebook = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' })
  ])
})

const IconLinkedIn = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
  ])
})

const IconInstagram = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' })
  ])
})

const IconGitHub = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ])
})

const socials = [
  { label: 'Facebook',  href: 'https://web.facebook.com/profile.php?id=61584725707398', icon: IconFacebook },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/marlloyd-honrado-4245402a0',  icon: IconLinkedIn },
  { label: 'Instagram', href: 'https://www.instagram.com/mihonrado/',                     icon: IconInstagram },
  { label: 'GitHub',    href: 'https://github.com/CodeLloydie',                           icon: IconGitHub },
]
</script>

<style scoped>
.corner {
  position: absolute;
  width: 12px;
  height: 12px;
}
.business-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.business-card:hover {
  transform: translateY(-4px) rotate(0.5deg);
  box-shadow: 0 32px 64px rgba(0,0,0,0.6);
}
</style>
