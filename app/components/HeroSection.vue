<template>
  <section id="hero" class="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden bg-graphite-950 px-4 sm:px-8 md:px-12 font-serif text-graphite-100">

    <!-- Particle Canvas background -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none z-0" />

    <!-- Tarot Spread Overlay (Full Screen) -->
    <Teleport to="body">
      <div 
        class="fixed inset-0 bg-graphite-950/90 backdrop-blur-md z-50 transition-all duration-700 ease-out flex items-center justify-center"
        :class="isSpread ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        @click="isSpread = false"
      >
        <!-- The Spread Cards -->
        <div class="relative flex items-center justify-center h-[60vh] w-full max-w-5xl mx-auto perspective-[1200px]" v-if="isSpread" @click.stop>
          
          <!-- Close Button -->
          <button @click="isSpread = false" class="absolute -top-16 text-graphite-400 hover:text-white font-mono tracking-widest uppercase text-xs z-50">
            [ Close Spread ]
          </button>

          <!-- Left Card (Top on Mobile) -->
          <div class="absolute transition-all duration-700 ease-out z-30 -translate-y-48 md:-translate-y-0 md:-translate-x-[110%] lg:-translate-x-[120%] rotate-y-0 scale-[0.65] md:scale-100 opacity-100">
            <div class="business-card w-48 sm:w-64 md:w-80 border border-graphite-500/50 shadow-2xl relative overflow-hidden group rounded-md">
              <img src="~/assets/imgs/ME-1.jpg" class="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          </div>

          <!-- Right Card (Bottom on Mobile) -->
          <div class="absolute transition-all duration-700 ease-out z-30 translate-y-48 md:translate-y-0 md:translate-x-[110%] lg:translate-x-[120%] rotate-y-0 scale-[0.65] md:scale-100 opacity-100">
            <div class="business-card w-48 sm:w-64 md:w-80 border border-graphite-500/50 shadow-2xl relative overflow-hidden group rounded-md">
              <img src="~/assets/imgs/ME-1.jpg" class="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          </div>

          <!-- Center Card -->
          <div class="absolute transition-all duration-700 ease-out z-40 translate-x-0 translate-y-0 scale-[0.65] md:scale-100 shadow-[0_0_80px_rgba(219,177,143,0.15)]">
            <div class="business-card w-48 sm:w-64 md:w-80 border border-graphite-400 shadow-2xl relative overflow-hidden rounded-md bg-graphite-950">
              <img src="~/assets/imgs/ME-1.jpg" class="absolute inset-0 w-full h-full object-cover object-center" />
              <!-- Corners -->
              <span class="corner top-0 left-0 border-t border-l border-graphite-300 z-20" />
              <span class="corner top-0 right-0 border-t border-r border-graphite-300 z-20" />
              <span class="corner bottom-0 left-0 border-b border-l border-graphite-300 z-20" />
              <span class="corner bottom-0 right-0 border-b border-r border-graphite-300 z-20" />
            </div>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- Main Dashboard Container -->
    <div class="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 h-auto lg:h-[85vh] min-h-[700px]">
      
      <!-- LEFT: Massive Image Container -->
      <div class="relative w-full h-[60vh] lg:h-full bg-graphite-800 rounded-[3rem] overflow-hidden shadow-2xl border border-graphite-700">
        <!-- Object position shifted higher to reveal more of the head -->
        <img src="~/assets/imgs/ME-1.jpg" class="absolute inset-0 w-full h-full object-cover object-[50%_15%] lg:object-[50%_40%]" />
        
        <!-- Bottom Left Data Cutout (Faux) -->
        <div class="absolute bottom-0 left-0 bg-graphite-950 w-64 h-32 rounded-tr-[3rem] p-8 border-t border-r border-graphite-700 flex flex-col justify-center">
           <!-- Curved corner fillers (SVG true cutout) -->
           <svg class="absolute -top-6 left-0 w-6 h-6 text-graphite-950" fill="currentColor" viewBox="0 0 24 24">
             <path d="M0 24V0c0 13.255 10.745 24 24 24H0z" />
           </svg>
           <svg class="absolute bottom-0 -right-6 w-6 h-6 text-graphite-950" fill="currentColor" viewBox="0 0 24 24">
             <path d="M0 24V0c0 13.255 10.745 24 24 24H0z" />
           </svg>
           
           <div class="flex items-center gap-4">
             <div class="w-10 h-10 rounded-full bg-graphite-800 border border-graphite-700 flex items-center justify-center text-graphite-400 italic font-bold">i</div>
             <div>
               <p class="text-[9px] font-mono tracking-widest uppercase text-graphite-500 mb-0.5">Nickname</p>
               <p class="text-lg font-bold tracking-widest uppercase text-graphite-100">Lloydie</p>
             </div>
           </div>
        </div>

        <!-- Bottom Right Title Card (Mobile: Icon only) -->
        <div class="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-graphite-900/85 backdrop-blur-md rounded-full sm:rounded-[2.5rem] p-2 sm:p-8 border border-graphite-600 shadow-2xl w-16 h-16 sm:w-auto sm:h-auto sm:max-w-[320px] flex items-center justify-center sm:block z-20">
            <h2 class="hidden sm:block text-3xl sm:text-4xl font-bold italic tracking-wider text-graphite-100 mb-1 leading-tight">WEB</h2>
            <h2 class="hidden sm:block text-2xl sm:text-3xl font-bold italic tracking-wider text-graphite-400 leading-tight">DEVELOPER</h2>
            
            <div class="hidden sm:flex items-center justify-between mt-6 pt-5 border-t border-graphite-700/60">
               <span class="text-[10px] font-mono tracking-widest text-graphite-500">#DESIGN</span>
               <span class="text-[10px] font-mono tracking-widest text-graphite-500">#SECURITY</span>
            </div>
            
            <!-- Magic Interaction Button (Redirect to projects) -->
            <a href="#projects" class="sm:absolute sm:-left-6 sm:bottom-10 w-12 h-12 bg-graphite-300 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(219,177,143,0.4)] hover:scale-110 hover:bg-graphite-100 transition-all cursor-pointer">
              <svg class="w-5 h-5 text-graphite-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
        </div>
      </div>

      <!-- RIGHT: Sidebar Container -->
      <div class="w-full h-full flex flex-col gap-6">
        
        <!-- Top: Download CV Button -->
        <a href="/docs/Marlloyd_Honrado_CV.pdf" download="Marlloyd_Honrado_CV.pdf" target="_blank" class="bg-graphite-900 hover:bg-graphite-800 transition-colors rounded-[2.5rem] p-7 border border-graphite-700 shadow-xl flex items-center justify-between group cursor-pointer">
           <div class="flex flex-col">
             <h3 class="text-[11px] font-mono tracking-widest text-graphite-500 uppercase mb-1">Resume</h3>
             <span class="text-xl sm:text-2xl font-bold tracking-widest text-graphite-100 group-hover:text-[#dbb18f] transition-colors">DOWNLOAD CV</span>
           </div>
           <div class="w-12 h-12 rounded-full border border-graphite-600 flex items-center justify-center group-hover:border-[#dbb18f] group-hover:bg-[#dbb18f]/10 transition-all shrink-0">
             <svg class="w-5 h-5 text-graphite-400 group-hover:text-[#dbb18f] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
             </svg>
           </div>
        </a>

        <!-- Middle: Radar Chart (Skills) -->
        <div class="bg-graphite-900 rounded-[2.5rem] p-7 border border-graphite-700 shadow-xl flex-1 flex flex-col relative overflow-hidden min-h-[250px]">
           <div class="flex items-center justify-between mb-4 z-10">
              <h3 class="text-[11px] font-mono tracking-widest text-graphite-500 uppercase">Skills Web</h3>
              <span class="w-2 h-2 rounded-full bg-graphite-300 animate-pulse shadow-[0_0_10px_rgba(219,177,143,0.8)]"></span>
           </div>
           
           <div class="flex-1 w-full flex items-center justify-center relative z-10 -mt-2">
              <svg viewBox="0 0 200 200" class="w-full max-w-[220px] h-full overflow-visible drop-shadow-[0_0_15px_rgba(219,177,143,0.15)]">
                 <!-- Background Hexagons (Web) -->
                 <polygon points="100,15 174,58 174,142 100,185 26,142 26,58" fill="none" stroke="#2a4090" stroke-width="1" stroke-dasharray="2,2"/>
                 <polygon points="100,43 149,72 149,128 100,157 51,128 51,72" fill="none" stroke="#2a4090" stroke-width="1" stroke-dasharray="2,2"/>
                 <polygon points="100,72 124,86 124,114 100,128 76,114 76,86" fill="none" stroke="#2a4090" stroke-width="1" stroke-dasharray="2,2"/>
                 
                 <!-- Axes -->
                 <line x1="100" y1="100" x2="100" y2="15" stroke="#2a4090" stroke-width="1"/>
                 <line x1="100" y1="100" x2="174" y2="58" stroke="#2a4090" stroke-width="1"/>
                 <line x1="100" y1="100" x2="174" y2="142" stroke="#2a4090" stroke-width="1"/>
                 <line x1="100" y1="100" x2="100" y2="185" stroke="#2a4090" stroke-width="1"/>
                 <line x1="100" y1="100" x2="26" y2="142" stroke="#2a4090" stroke-width="1"/>
                 <line x1="100" y1="100" x2="26" y2="58" stroke="#2a4090" stroke-width="1"/>

                 <!-- Data Polygon (The Chart) -->
                 <polygon points="100,37 139,78 147,127 100,172 38,136 46,69" fill="rgba(219, 177, 143, 0.25)" stroke="#dbb18f" stroke-width="2"/>
                 <!-- Data Nodes -->
                 <circle cx="100" cy="37" r="3" fill="#dbb18f"/>
                 <circle cx="139" cy="78" r="3" fill="#dbb18f"/>
                 <circle cx="147" cy="127" r="3" fill="#dbb18f"/>
                 <circle cx="100" cy="172" r="3" fill="#dbb18f"/>
                 <circle cx="38" cy="136" r="3" fill="#dbb18f"/>
                 <circle cx="46" cy="69" r="3" fill="#dbb18f"/>
                 
                 <!-- Labels -->
                 <text x="100" y="5" text-anchor="middle" class="text-[9px] font-mono fill-graphite-400">Frontend</text>
                 <text x="182" y="58" text-anchor="start" alignment-baseline="middle" class="text-[9px] font-mono fill-graphite-400">Backend</text>
                 <text x="182" y="142" text-anchor="start" alignment-baseline="middle" class="text-[9px] font-mono fill-graphite-400">Database</text>
                 <text x="100" y="198" text-anchor="middle" class="text-[9px] font-mono fill-graphite-400">UI/UX</text>
                 <text x="18" y="142" text-anchor="end" alignment-baseline="middle" class="text-[9px] font-mono fill-graphite-400">Design</text>
                 <text x="18" y="58" text-anchor="end" alignment-baseline="middle" class="text-[9px] font-mono fill-graphite-400">Security</text>
              </svg>
           </div>
        </div>

        <!-- Bottom: Years Active & Tarot Deck -->
        <div class="flex gap-6 h-56">
           <!-- Projects Shipped -->
           <div class="bg-graphite-900 rounded-[2.5rem] p-7 border border-graphite-700 shadow-xl flex-1 flex flex-col items-center justify-center relative text-center">
               <h3 class="text-[11px] font-mono tracking-widest text-graphite-500 uppercase absolute top-6">Projects Shipped</h3>
               <p class="text-4xl font-bold tracking-widest leading-none text-graphite-100">3</p>
               <p class="text-[10px] font-mono tracking-widest text-graphite-400 mt-2">Completed</p>
           </div>

           <!-- Mini Tarot Deck -->
           <div 
             class="bg-graphite-900 rounded-[2.5rem] p-5 border border-graphite-700 shadow-xl w-36 flex flex-col items-center justify-center cursor-pointer hover:bg-graphite-800 transition-colors group relative overflow-hidden"
             @click="isSpread = true"
           >
              <h3 class="text-[11px] font-mono tracking-widest text-graphite-500 uppercase absolute top-6">Media</h3>
              
              <!-- Miniature Deck -->
              <div class="relative w-[70px] h-[100px] mt-6 perspective-[600px] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                  <div class="absolute inset-0 bg-graphite-800 border border-graphite-600 rounded-sm -rotate-12 -translate-x-3 shadow-md">
                     <img src="~/assets/imgs/ME-1.jpg" class="w-full h-full object-cover rounded-sm opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div class="absolute inset-0 bg-graphite-800 border border-graphite-600 rounded-sm rotate-12 translate-x-3 shadow-md">
                     <img src="~/assets/imgs/ME-1.jpg" class="w-full h-full object-cover rounded-sm opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div class="absolute inset-0 bg-graphite-950 border border-graphite-300 rounded-sm shadow-xl">
                     <img src="~/assets/imgs/ME-1.jpg" class="w-full h-full object-cover rounded-sm" />
                  </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const isSpread = ref(false)

// ── Canvas: Geometric Golden Ratio Grid ──────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  let W = 0, H = 0

  function resize() {
    W = canvas!.width  = canvas!.offsetWidth
    H = canvas!.height = canvas!.offsetHeight
    draw()
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)

    const strokeGrid = 'rgba(219, 177, 143, 0.03)'
    const strokeMain = 'rgba(219, 177, 143, 0.08)'
    const strokeHighlight = 'rgba(219, 177, 143, 0.15)'

    // Draw basic grid
    const gridSize = 100
    ctx.strokeStyle = strokeGrid
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = (W / 2) % gridSize; x < W; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
    }
    for (let y = (H / 2) % gridSize; y < H; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
    }
    ctx.stroke()

    // Draw Rule of Thirds
    ctx.strokeStyle = strokeMain
    ctx.setLineDash([4, 6])
    ctx.beginPath()
    ctx.moveTo(W / 3, 0)
    ctx.lineTo(W / 3, H)
    ctx.moveTo(W * 2 / 3, 0)
    ctx.lineTo(W * 2 / 3, H)
    ctx.moveTo(0, H / 3)
    ctx.lineTo(W, H / 3)
    ctx.moveTo(0, H * 2 / 3)
    ctx.lineTo(W, H * 2 / 3)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw Golden Ratio lines
    const phi = 0.61803398875
    ctx.strokeStyle = strokeHighlight
    ctx.beginPath()
    ctx.moveTo(W * phi, 0)
    ctx.lineTo(W * phi, H)
    ctx.moveTo(W * (1 - phi), 0)
    ctx.lineTo(W * (1 - phi), H)
    ctx.moveTo(0, H * phi)
    ctx.lineTo(W, H * phi)
    ctx.moveTo(0, H * (1 - phi))
    ctx.lineTo(W, H * (1 - phi))
    ctx.stroke()

    // Draw crosshairs at key intersections
    const xs = [W * phi, W * (1 - phi), W / 3, W * 2 / 3, W / 2]
    const ys = [H * phi, H * (1 - phi), H / 3, H * 2 / 3, H / 2]
    
    ctx.strokeStyle = strokeHighlight
    ctx.lineWidth = 1.5
    for (const x of xs) {
      for (const y of ys) {
        ctx.beginPath()
        ctx.moveTo(x - 8, y)
        ctx.lineTo(x + 8, y)
        ctx.moveTo(x, y - 8)
        ctx.lineTo(x, y + 8)
        ctx.stroke()
      }
    }
  }

  resize()

  const ro = new ResizeObserver(() => { resize() })
  ro.observe(canvas)

  onUnmounted(() => { ro.disconnect() })
})
</script>

<style scoped>
.corner {
  position: absolute;
  width: 12px;
  height: 12px;
}
.business-card {
  aspect-ratio: 3/4;
}
.perspective-\[1200px\] {
  perspective: 1200px;
}
.perspective-\[600px\] {
  perspective: 600px;
}
.rotate-y-0 {
  transform: rotateY(0deg);
}
</style>
