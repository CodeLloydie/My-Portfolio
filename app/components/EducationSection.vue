<template>
  <section id="education" ref="sectionRef" class="py-32 px-4 sm:px-8 border-t border-graphite-800 bg-graphite-950 relative overflow-hidden">
    
    <!-- Background Texture (Optional noise for the "board") -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>

    <div class="max-w-6xl mx-auto relative">

      <!-- Header -->
      <div
        :class="['transition-all duration-700 mb-20 relative z-20', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5 font-mono">{{ t('journey.label') }}</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light tracking-tight">{{ t('journey.heading') }}</h2>
      </div>

      <!-- Legend as a pinned note -->
      <div
        :class="['absolute top-0 right-4 md:right-10 z-20 transition-all duration-700 delay-300', visible ? 'opacity-100' : 'opacity-0']">
        <div class="bg-graphite-900 border border-graphite-700/50 p-4 shadow-xl rotate-3 w-48 font-mono relative">
          <!-- Tape -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/10 backdrop-blur-sm -rotate-2"></div>
          
          <h3 class="text-graphite-300 text-xs tracking-widest uppercase mb-3 border-b border-graphite-700/50 pb-2">Index</h3>
          <div class="flex items-center gap-3 mb-2">
            <span class="w-3 h-3 bg-graphite-300 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            <span class="text-graphite-400 text-xs">{{ t('journey.legend_edu') }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 border border-graphite-400 shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
            <span class="text-graphite-400 text-xs">{{ t('journey.legend_exp') }}</span>
          </div>
        </div>
      </div>

      <!-- Detective Board Container -->
      <div class="relative w-full mt-10 md:mt-20 min-h-[800px]" ref="containerRef">
        
        <!-- SVG Connections (The Red String) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" style="overflow: visible;">
          <!-- Glowing effect layer -->
          <path
            :d="svgPath"
            fill="none"
            stroke="#dc2626"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="opacity-30 blur-[2px]"
          />
          <!-- Core string layer -->
          <path
            :d="svgPath"
            fill="none"
            stroke="#ef4444"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="drop-shadow-lg"
          />
        </svg>

        <!-- Notes -->
        <div class="flex flex-col gap-12 sm:gap-20 pb-32">
          <div v-for="(item, index) in timelineItems" :key="item.id"
            :ref="el => setNodeRef(el, index)"
            :class="[
              'transition-all duration-1000 relative z-10', 
              getCardClasses(index),
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              expanded[item.id] ? '!z-30' : ''
            ]"
            :style="{ transitionDelay: visible ? `${index * 150}ms` : '0ms' }">
            
            <!-- The Card / Note -->
            <button 
              class="w-full text-left bg-graphite-900 border border-graphite-700/60 p-6 sm:p-8 shadow-2xl shadow-black/80 group hover:border-graphite-500 transition-colors relative"
              @click="toggle(item.id)">
              
              <!-- The Pushpin / Tape -->
              <div class="pin-point absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-2 border-red-900 shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
                <div class="w-1 h-1 rounded-full bg-white/50"></div>
              </div>
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/5 backdrop-blur-md -rotate-2 z-10 pointer-events-none"></div>

              <!-- Note Content -->
              <div class="font-mono">
                <div class="flex justify-between items-start mb-4">
                  <span class="text-red-500/80 text-xs font-bold tracking-widest">{{ item.year }}</span>
                  <span v-if="item.type === 'edu'" class="w-2 h-2 bg-graphite-300 mt-1 shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>
                  <span v-else class="w-2 h-2 border border-graphite-400 mt-1 shadow-[0_0_8px_rgba(255,255,255,0.1)]"></span>
                </div>
                
                <h3 class="text-graphite-100 text-lg sm:text-xl font-medium mb-1 font-sans tracking-tight">{{ item.title }}</h3>
                <p class="text-graphite-400 text-sm mb-2">{{ item.subtitle }}</p>
                
                <span v-if="item.strand" class="inline-block mt-2 text-[10px] px-2 py-1 bg-graphite-800 border border-graphite-700 text-graphite-300 tracking-widest uppercase">
                  {{ item.strand }}
                </span>
              </div>

              <!-- Expanded Detail -->
              <div
                class="overflow-hidden transition-all duration-500 ease-in-out"
                :style="{ maxHeight: expanded[item.id] ? '500px' : '0px', opacity: expanded[item.id] ? 1 : 0, marginTop: expanded[item.id] ? '1.5rem' : '0px' }"
              >
                <div class="pt-4 border-t border-graphite-700/50 border-dashed space-y-4 font-mono">
                  <p class="text-graphite-300 text-sm leading-relaxed">{{ item.detail }}</p>
                  
                  <template v-if="item.role">
                    <div>
                      <p class="text-red-500/80 text-xs tracking-widest uppercase mb-2">{{ item.role }}</p>
                      <ul class="space-y-2">
                        <li v-for="task in item.tasks" :key="task" class="text-graphite-400 text-xs sm:text-sm flex items-start gap-2">
                          <span class="text-red-500/50 mt-0.5">▹</span>
                          <span class="leading-relaxed">{{ task }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </div>
            </button>
            
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const expanded = ref<Record<string, boolean>>({})

// We store the DOM nodes to measure their positions for the strings
const itemRefs = ref<HTMLElement[]>([])
const linePoints = ref<{x: number, y: number}[]>([])

let resizeObserver: ResizeObserver | null = null

// Define the linear chronological timeline (newest to oldest, as requested)
const timelineItems = computed(() => [
  { id: 'intern', type: 'exp', year: '2025 — 2026', title: t('journey.intern_title'), subtitle: t('journey.intern_sub'), detail: t('journey.intern_detail'), role: t('journey.intern_role'), tasks: [t('journey.intern_task1'), t('journey.intern_task2')] },
  { id: 'itsupport', type: 'exp', year: '2022 — 2026', title: t('journey.itsupport_title'), subtitle: t('journey.itsupport_sub'), detail: t('journey.itsupport_detail'), role: t('journey.itsupport_role'), tasks: [t('journey.itsupport_t1'), t('journey.itsupport_t2'), t('journey.itsupport_t3'), t('journey.itsupport_t4'), t('journey.itsupport_t5'), t('journey.itsupport_t6')] },
  { id: 'bsit', type: 'edu', year: '2022 — 2026', title: t('journey.bsit_title'), subtitle: t('journey.bsit_sub'), detail: t('journey.bsit_detail') },
  { id: 'shs', type: 'edu', year: '2020 — 2022', title: t('journey.shs_title'), subtitle: t('journey.shs_sub'), strand: t('journey.shs_strand'), detail: t('journey.shs_detail') },
  { id: 'jhs', type: 'edu', year: '2016 — 2020', title: t('journey.jhs_title'), subtitle: t('journey.jhs_sub'), strand: t('journey.jhs_strand'), detail: t('journey.jhs_detail') },
  { id: 'elem', type: 'edu', year: '2010 — 2016', title: t('journey.elem_title'), subtitle: t('journey.elem_sub'), detail: t('journey.elem_detail') },
])

const setNodeRef = (el: any, index: number) => {
  if (el) itemRefs.value[index] = el.$el || el
}

const toggle = (id: string) => {
  expanded.value[id] = !expanded.value[id]
  // Update lines after animation completes
  setTimeout(() => updateLines(), 500)
}

// Generate scattered grid classes
const getCardClasses = (index: number) => {
  const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', '-rotate-3', 'rotate-3']
  const aligns = [
    'md:self-start md:ml-4', 
    'md:self-end md:mr-16', 
    'md:self-center md:ml-32', 
    'md:self-start md:ml-20', 
    'md:self-end md:mr-4', 
    'md:self-center md:-ml-12'
  ]
  return `${rotations[index % rotations.length]} ${aligns[index % aligns.length]} w-[95%] sm:w-[85%] md:w-[45%] mx-auto md:mx-0`
}

const updateLines = () => {
  if (!containerRef.value || itemRefs.value.length === 0) return
  
  const containerRect = containerRef.value.getBoundingClientRect()
  
  const points = itemRefs.value.map(el => {
    if (!el) return null
    const pin = el.querySelector('.pin-point') as HTMLElement
    if (!pin) return null
    
    const rect = pin.getBoundingClientRect()
    return {
      x: rect.left - containerRect.left + (rect.width / 2),
      y: rect.top - containerRect.top + (rect.height / 2)
    }
  }).filter(Boolean) as {x: number, y: number}[]
  
  linePoints.value = points
}

const svgPath = computed(() => {
  const points = linePoints.value
  if (points.length < 2) return ''
  
  let d = `M ${points[0].x} ${points[0].y} `
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1]
    const p2 = points[i]
    // Add a slight sag (bezier curve) to simulate string tension/gravity
    const mx = (p1.x + p2.x) / 2
    const my = (p1.y + p2.y) / 2 + 30 // sag by 30px
    d += `Q ${mx} ${my}, ${p2.x} ${p2.y} `
  }
  return d
})

onMounted(() => {
  // Intersection Observer for fade-in
  const observer = new IntersectionObserver(
    ([entry]) => { 
      if (entry?.isIntersecting) {
        visible.value = true
        setTimeout(() => updateLines(), 100) // Initial line draw
      }
    },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)

  // Resize observer to redraw strings when window resizes or cards expand
  if (typeof window !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to avoid ResizeObserver loop limit exceeded error
      window.requestAnimationFrame(() => {
        updateLines()
      })
    })
    
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
    itemRefs.value.forEach(el => {
      if (el) resizeObserver!.observe(el)
    })
    
    window.addEventListener('resize', updateLines)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateLines)
  }
})
</script>

<style scoped>
/* Optional: Adding a slight custom font if Playfair or monospace is preferred for notes */
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
</style>
