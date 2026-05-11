<template>
  <section id="skills" ref="sectionRef" class="py-32 px-8 border-t" :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }">
    <div class="max-w-6xl mx-auto">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-sm tracking-[0.3em] uppercase mb-5" :style="{ color: 'var(--text-subtle)' }">{{ t('skills.label') }}</p>
        <h2 class="text-4xl sm:text-5xl font-light tracking-tight mb-6" :style="{ color: 'var(--text-primary)' }">
          {{ t('skills.heading') }}
        </h2>
        <p class="text-sm mb-16" :style="{ color: 'var(--text-muted)' }">{{ t('skills.sub') }}</p>
      </div>

      <!-- Grouped by category -->
      <div class="space-y-12">
        <div
          v-for="(cat, ci) in categories"
          :key="cat.name"
          :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          :style="{ transitionDelay: visible ? `${ci * 100}ms` : '0ms' }"
        >
          <!-- Category heading -->
          <div class="flex items-center gap-3 mb-5">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: cat.accent }" />
            <span class="text-xs tracking-[0.25em] uppercase font-medium" :style="{ color: cat.accent }">{{ cat.name }}</span>
            <div class="flex-1 h-px" :style="{ backgroundColor: 'var(--border)' }" />
          </div>

          <!-- LEGO brick grid — max 4 columns -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="(brick, bi) in cat.items"
              :key="brick.name"
              :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
              :style="{ transitionDelay: visible ? `${ci * 100 + bi * 60}ms` : '0ms' }"
            >
              <div
                class="lego-brick rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default select-none transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
                :style="{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }"
              >
                <!-- Icon -->
                <div class="w-12 h-12 flex items-center justify-center">
                  <Icon :icon="brick.icon" width="44" height="44" />
                </div>
                <!-- Name -->
                <p class="text-center text-xs font-medium leading-tight" :style="{ color: 'var(--text-primary)' }">{{ brick.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const categories = computed(() => [
  {
    name: t('skills.cat_frontend'),
    accent: '#0843a6',
    items: [
      { name: 'Nuxt',         icon: 'logos:nuxt-icon' },
      { name: 'Vue.js',       icon: 'logos:vue' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'REST API',     icon: 'mdi:api' },
    ]
  },
  {
    name: t('skills.cat_backend'),
    accent: '#b37521',
    items: [
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'Laravel', icon: 'logos:laravel' },
      { name: 'PHP',     icon: 'logos:php' },
      { name: 'MySQL',   icon: 'logos:mysql-icon' },
    ]
  },
  {
    name: t('skills.cat_devops'),
    accent: '#6e3b0b',
    items: [
      { name: 'Vercel', icon: 'logos:vercel-icon' },
      { name: 'Git',    icon: 'logos:git-icon' },
      { name: 'GitHub', icon: 'mdi:github' },
    ]
  },
  {
    name: t('skills.cat_ai'),
    accent: '#6d28d9',
    items: [
      { name: 'Claude AI', icon: 'simple-icons:anthropic' },
      { name: 'ChatGPT',   icon: 'simple-icons:openai' },
    ]
  },
  {
    name: t('skills.cat_design'),
    accent: '#0d9488',
    items: [
      { name: 'Figma',       icon: 'logos:figma' },
      { name: 'Photoshop',   icon: 'logos:adobe-photoshop' },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
    ]
  },
  {
    name: t('skills.cat_other'),
    accent: '#6b7280',
    items: [
      { name: 'VS Code', icon: 'logos:visual-studio-code' },
      { name: 'Laragon', icon: 'mdi:server-outline' },
      { name: 'Herd',    icon: 'ph:leaf-fill' },
    ]
  },
])

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
.lego-brick {
  border-width: 1px;
  border-style: solid;
  box-shadow: 0 4px 0 0 rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
}
.lego-brick:hover {
  box-shadow: 0 6px 0 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15);
}</style>
