<template>
  <section id="projects" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-900">
    <div class="max-w-6xl mx-auto">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">03 — Projects</p>
        <div class="flex items-end justify-between mb-20">
          <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light tracking-tight">Selected Work</h2>
          <span class="text-graphite-600 text-sm tracking-widest uppercase hidden sm:block">More coming soon</span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite-800">
        <div
          v-for="(project, pi) in projects"
          :key="project.title"
          :class="[
            'bg-graphite-950 group transition-all duration-700 hover:bg-graphite-900 flex flex-col',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: visible ? `${pi * 100}ms` : '0ms' }"
        >
          <!-- Preview image -->
          <div class="aspect-video bg-graphite-800 border-b border-graphite-700 relative overflow-hidden flex items-center justify-center">
            <template v-if="project.image">
              <img
                :src="project.image"
                :alt="project.title"
                :class="[
                  'transition-transform duration-500 group-hover:scale-105',
                  project.logoOnly ? 'w-28 h-28 object-contain opacity-70' : 'w-full h-full object-cover'
                ]"
              />
            </template>
            <template v-else>
              <span class="text-graphite-600 text-sm tracking-widest uppercase">Project Preview</span>
            </template>
            <div class="absolute inset-0 bg-graphite-950 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <!-- Status badge -->
            <span
              v-if="project.liveLabel === 'In Development'"
              class="absolute top-3 left-3 px-2 py-1 bg-graphite-950/80 border border-graphite-600 text-graphite-400 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ⬤ In Development
            </span>
          </div>

          <div class="p-8 flex flex-col flex-1">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-graphite-100 text-lg font-medium tracking-wide">{{ project.title }}</h3>
              <span class="text-graphite-600 text-sm ml-3 shrink-0">{{ String(pi + 1).padStart(2, '0') }}</span>
            </div>
            <p class="text-graphite-500 text-sm leading-relaxed mb-5 flex-1">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-3 py-1 bg-graphite-800 text-graphite-400 text-sm tracking-wide"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-6">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener"
                class="text-graphite-400 hover:text-graphite-100 text-sm tracking-widest uppercase transition-colors"
              >
                {{ project.liveLabel || 'Live →' }}
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener"
                class="text-graphite-400 hover:text-graphite-100 text-sm tracking-widest uppercase transition-colors"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const projects = [
  {
    logoOnly:    false,
    title:       'Project FarmCo-Pal',
    description: 'A modular SaaS for cooperatives — activate loans, savings, milling, and more on demand. Built-in dynamic bookkeeping lets you assign debit & credit entries to exact accounts, keeping every transaction transparent and fully auditable.',
    tech:        ['Nuxt', 'Laravel', 'MySQL'],
    image:       useAssetUrl('/imgs/Farmco-pal.png'),
    liveUrl:     null,
    githubUrl:   null,
    liveLabel:   'In Development',
  },
  {
    title:       'Project Invent-Story',
    description: 'Inventory that goes beyond stock tracking — it tells your business story. Monitor sales, log transactions, and spot trends through live analytics. The Smart Price Builder lets you test a price before selling: enter your capital and target profit, and the system calculates the perfect selling price instantly.',
    tech:        ['Nuxt', 'Laravel', 'MySQL'],
    image:       useAssetUrl('/imgs/White-Logo.png'),
    logoOnly:    true,
    liveUrl:     null,
    githubUrl:   null,
    liveLabel:   'In Development',
  },
  {
    logoOnly: false,
    title: 'Project Gear Up',
    description: 'Shop smarter for PC and electronic parts. Gear Up is a mobile e-commerce app with clean product browsing, smart discovery, and a fast checkout — built for builders, enthusiasts, and everyday shoppers alike.',
    tech:        ['Figma', 'UI/UX Design', 'Prototyping', 'Mobile Design'],
    image:       useAssetUrl('/imgs/Screenshot 2026-04-22 083335.png'),
    liveUrl:     'https://www.figma.com/design/0viUh2V821olPc3tb9VXsC/Apps-Prototype?node-id=37-79&t=eiJ10YNprXA5jdEX-1',
    githubUrl:   null,
    liveLabel:   'View on Figma →',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>
