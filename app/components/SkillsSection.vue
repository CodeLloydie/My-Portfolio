<template>
  <section id="skills" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-950">
    <div class="max-w-6xl mx-auto">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">02 — Skills</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light tracking-tight mb-20">
          Tools &amp; Technologies
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-px bg-graphite-800">
        <div
          v-for="(category, ci) in categories"
          :key="category.name"
          :class="[
            'bg-graphite-950 p-10 transition-all duration-700 hover:bg-graphite-900',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: visible ? `${ci * 120}ms` : '0ms' }"
        >
          <p class="text-graphite-500 text-sm tracking-[0.25em] uppercase mb-8">{{ category.name }}</p>
          <ul class="space-y-5">
            <li
              v-for="skill in category.skills"
              :key="skill.name"
              class="flex items-center justify-between group"
            >
              <span class="text-graphite-300 text-base group-hover:text-graphite-100 transition-colors duration-200">
                {{ skill.name }}
              </span>
              <div class="w-28 h-px bg-graphite-800 relative overflow-hidden">
                <div
                  class="absolute inset-y-0 left-0 bg-graphite-300 transition-all duration-1000"
                  :style="{ width: visible ? skill.level + '%' : '0%', transitionDelay: visible ? `${ci * 120 + 300}ms` : '0ms' }"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const categories = [
  {
    name: 'Development',
    skills: [
      { name: 'HTML / CSS',  level: 85 },
      { name: 'JavaScript',  level: 72 },
      { name: 'Vue.js',      level: 70 },
      { name: 'Nuxt',        level: 65 },
      { name: 'Laravel',     level: 60 },
    ]
  },
  {
    name: 'Design',
    skills: [
      { name: 'Figma',              level: 80 },
      { name: 'Adobe Illustrator',  level: 75 },
      { name: 'Adobe Photoshop',    level: 72 },
    ]
  },
  {
    name: 'Tools & Other',
    skills: [
      { name: 'VS Code',     level: 90 },
      { name: 'GitHub',      level: 75 },
      { name: 'Claude Code', level: 70 },
    ]
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>
