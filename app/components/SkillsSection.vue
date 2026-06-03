<template>
  <section id="skills" ref="sectionRef" class="py-32 px-8 border-t overflow-hidden" :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }">
    <div class="max-w-6xl mx-auto">
      
      <div :class="['transition-all duration-700 mb-16', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-sm tracking-[0.3em] uppercase mb-5" :style="{ color: 'var(--text-subtle)' }">{{ t('skills.label') }}</p>
        <h2 class="text-4xl sm:text-5xl font-light tracking-tight mb-6" :style="{ color: 'var(--text-primary)' }">
          {{ t('skills.heading') }}
        </h2>
        <p class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ t('skills.sub') }}</p>
      </div>

      <!-- Puzzle Container -->
      <div :class="['transition-all duration-1000 delay-300 w-full overflow-x-auto pb-16 pt-4 hide-scrollbar', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        <div class="grid grid-cols-5 mx-auto min-w-[700px] max-w-[1000px] relative drop-shadow-md" style="gap: 0;">
          
          <div v-for="(piece, index) in puzzlePieces" :key="piece.name" class="relative aspect-square group z-0 hover:z-20">
            
            <!-- Gap under the missing piece -->
            <svg v-if="piece.isMe" viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none" style="overflow: visible;">
              <path :d="piece.path" fill="rgba(0,0,0,0.15)" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" />
            </svg>
            
            <!-- Puzzle Piece -->
            <div :class="['absolute inset-0 w-full h-full transition-all duration-300', piece.isMe ? 'floating-piece z-30' : 'group-hover:scale-[1.04] group-hover:drop-shadow-2xl cursor-default']">
               <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full" style="overflow: visible;">
                  <defs>
                    <linearGradient :id="'grad-' + index" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" :stop-color="piece.isMe ? 'var(--bg-card)' : 'var(--bg-primary)'" />
                      <stop offset="100%" :stop-color="piece.isMe ? 'var(--bg-primary)' : 'var(--bg-card)'" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Base color layer -->
                  <path :d="piece.path" :fill="`url(#grad-${index})`" />
                  
                  <!-- Tint layer -->
                  <path :d="piece.path" :fill="piece.isMe ? 'transparent' : piece.bg" />
                  
                  <!-- Border -->
                  <path :d="piece.path" fill="none" :stroke="piece.isMe ? 'var(--text-primary)' : 'var(--border)'" :stroke-width="piece.isMe ? 2 : 1" vector-effect="non-scaling-stroke" />
               </svg>
               
               <!-- Content -->
               <div class="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                  <div :class="['flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1', piece.isMe ? 'mb-0' : 'w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-2']">
                    <span v-if="piece.isMe" class="text-2xl md:text-3xl font-bold tracking-tight" :style="{ color: 'var(--text-primary)' }">MIH</span>
                    <Icon v-else :icon="piece.icon" class="w-full h-full" :style="{ color: piece.accent }" />
                  </div>
                  <p v-if="!piece.isMe" class="text-[10px] md:text-xs font-medium leading-tight" :style="{ color: 'var(--text-primary)' }">{{ piece.name }}</p>
               </div>
            </div>

          </div>
          
        </div>
      </div>
      
      <!-- Legend / Categories -->
      <div :class="['mt-4 flex flex-wrap justify-center gap-6 transition-all duration-700 delay-500', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <div v-for="cat in uniqueCategories" :key="cat.id" class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full shadow-sm" :style="{ backgroundColor: cat.accent }"></span>
          <span class="text-[11px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-muted)' }">{{ cat.label }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const skillsList = computed(() => [
  { name: 'Nuxt',         icon: 'logos:nuxt-icon', cat: 'frontend' },
  { name: 'Vue.js',       icon: 'logos:vue', cat: 'frontend' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', cat: 'frontend' },
  { name: 'TypeScript',   icon: 'logos:typescript-icon', cat: 'frontend' },
  { name: 'REST API',     icon: 'mdi:api', cat: 'frontend' },

  { name: 'Node.js',      icon: 'logos:nodejs-icon', cat: 'backend' },
  { name: 'Laravel',      icon: 'logos:laravel', cat: 'backend' },
  { name: 'PHP',          icon: 'logos:php', cat: 'backend' },
  { name: 'MySQL',        icon: 'logos:mysql-icon', cat: 'backend' },
  { name: 'Vercel',       icon: 'logos:vercel-icon', cat: 'devops' },

  { name: 'Git',          icon: 'logos:git-icon', cat: 'devops' },
  { name: 'GitHub',       icon: 'mdi:github', cat: 'devops' },
  { name: 'ME',           icon: 'ph:user-focus-duotone', cat: 'me' },
  { name: 'Claude AI',    icon: 'simple-icons:anthropic', cat: 'ai' },
  { name: 'ChatGPT',      icon: 'simple-icons:openai', cat: 'ai' },

  { name: 'Figma',        icon: 'logos:figma', cat: 'design' },
  { name: 'Illustrator',  icon: 'logos:adobe-illustrator', cat: 'design' },
  { name: 'VS Code',      icon: 'logos:visual-studio-code', cat: 'other' },
  { name: 'Laragon',      icon: 'mdi:server-outline', cat: 'other' },
  { name: 'Herd',         icon: 'ph:leaf-fill', cat: 'other' },
])

const uniqueCategories = computed(() => [
  { id: 'frontend', label: t('skills.cat_frontend'), accent: '#0843a6' },
  { id: 'backend', label: t('skills.cat_backend'), accent: '#b37521' },
  { id: 'devops', label: t('skills.cat_devops'), accent: '#6e3b0b' },
  { id: 'ai', label: t('skills.cat_ai'), accent: '#6d28d9' },
  { id: 'design', label: t('skills.cat_design'), accent: '#0d9488' },
  { id: 'other', label: t('skills.cat_other'), accent: '#6b7280' },
])

const puzzlePieces = computed(() => {
  const cols = 5
  const rows = 4
  
  const getCatStyles = (cat: string) => {
    switch(cat) {
      case 'frontend': return { bg: 'rgba(8, 67, 166, 0.08)', accent: '#0843a6' }
      case 'backend': return { bg: 'rgba(179, 117, 33, 0.08)', accent: '#b37521' }
      case 'devops': return { bg: 'rgba(110, 59, 11, 0.08)', accent: '#6e3b0b' }
      case 'ai': return { bg: 'rgba(109, 40, 217, 0.08)', accent: '#6d28d9' }
      case 'design': return { bg: 'rgba(13, 148, 136, 0.08)', accent: '#0d9488' }
      case 'other': return { bg: 'rgba(107, 114, 128, 0.08)', accent: '#6b7280' }
      case 'me': return { bg: 'transparent', accent: 'var(--text-primary)' }
      default: return { bg: 'transparent', accent: '#000' }
    }
  }

  return skillsList.value.map((skill, index) => {
    const x = index % cols
    const y = Math.floor(index / cols)
    
    // Deterministic geometric edge connections
    const getRightEdge = (c: number, r: number) => (c === cols - 1) ? 0 : ((c + r) % 2 === 0 ? 1 : -1)
    const getBottomEdge = (c: number, r: number) => (r === rows - 1) ? 0 : ((c * 2 + r) % 2 === 0 ? 1 : -1)

    const top = y === 0 ? 0 : -getBottomEdge(x, y - 1)
    const right = getRightEdge(x, y)
    const bottom = getBottomEdge(x, y)
    const left = x === 0 ? 0 : -getRightEdge(x - 1, y)

    const path = `M 0 0 ` +
      (top === 0 ? `L 100 0 ` : top === 1 ?
        `L 40 0 C 40 -10, 35 -10, 35 -20 C 35 -35, 65 -35, 65 -20 C 65 -10, 60 -10, 60 0 L 100 0 ` :
        `L 40 0 C 40 10, 35 10, 35 20 C 35 35, 65 35, 65 20 C 65 10, 60 10, 60 0 L 100 0 `) +
      (right === 0 ? `L 100 100 ` : right === 1 ?
        `L 100 40 C 110 40, 110 35, 120 35 C 135 35, 135 65, 120 65 C 110 65, 110 60, 100 60 L 100 100 ` :
        `L 100 40 C 90 40, 90 35, 80 35 C 65 35, 65 65, 80 65 C 90 65, 90 60, 100 60 L 100 100 `) +
      (bottom === 0 ? `L 0 100 ` : bottom === 1 ?
        `L 60 100 C 60 110, 65 110, 65 120 C 65 135, 35 135, 35 120 C 35 110, 40 110, 40 100 L 0 100 ` :
        `L 60 100 C 60 90, 65 90, 65 80 C 65 65, 35 65, 35 80 C 35 90, 40 90, 40 100 L 0 100 `) +
      (left === 0 ? `L 0 0` : left === 1 ?
        `L 0 60 C -10 60, -10 65, -20 65 C -35 65, -35 35, -20 35 C -10 35, -10 40, 0 40 L 0 0 ` :
        `L 0 60 C 10 60, 10 65, 20 65 C 35 65, 35 35, 20 35 C 10 35, 10 40, 0 40 L 0 0 `)
        
    const styles = getCatStyles(skill.cat)
    
    return {
      ...skill,
      x, y,
      path,
      bg: styles.bg,
      accent: styles.accent,
      isMe: skill.cat === 'me'
    }
  })
})

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
@keyframes floatPiece {
  0%, 100% { transform: translateY(-14px) rotate(-2deg) scale(1.1); filter: drop-shadow(0 20px 15px rgba(0,0,0,0.25)); }
  50% { transform: translateY(-24px) rotate(2deg) scale(1.1); filter: drop-shadow(0 30px 25px rgba(0,0,0,0.15)); }
}

.floating-piece {
  animation: floatPiece 4s ease-in-out infinite;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>e>
