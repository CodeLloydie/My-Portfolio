<template>
  <section id="education" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-950">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div :class="['transition-all duration-700 mb-20', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">04 — Journey</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light tracking-tight">Road Taken</h2>
      </div>

      <!-- Legend -->
      <div :class="['flex items-center justify-center gap-10 mb-16 transition-all duration-700', visible ? 'opacity-100' : 'opacity-0']">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-graphite-300" />
          <span class="text-graphite-500 text-sm tracking-widest uppercase">Education</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full border-2 border-graphite-300" />
          <span class="text-graphite-500 text-sm tracking-widest uppercase">Experience</span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">

        <!-- Center line -->
        <div
          class="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-graphite-700 transition-all duration-1000"
          :style="{ height: visible ? '100%' : '0%' }"
        />

        <div class="space-y-0">
          <div
            v-for="(item, index) in timeline"
            :key="index"
            :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
            :style="{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }"
          >
            <div class="relative flex items-start min-h-24">

              <!-- Left side (Education) -->
              <div class="w-1/2 pr-10 flex justify-end">
                <div
                  v-if="item.left"
                  class="max-w-xs w-full"
                  :class="item.left ? 'text-right' : ''"
                >
                  <button
                    class="w-full text-right group"
                    @click="toggle(index, 'left')"
                  >
                    <p class="text-graphite-500 text-xs tracking-widest uppercase mb-1">{{ item.left.year }}</p>
                    <p class="text-graphite-100 text-base font-medium group-hover:text-white transition-colors">{{ item.left.title }}</p>
                    <p class="text-graphite-400 text-sm">{{ item.left.subtitle }}</p>
                  </button>

                  <!-- Expanded detail -->
                  <Transition name="expand">
                    <div v-if="expanded[`${index}-left`]" class="mt-3 border-t border-graphite-700 pt-3">
                      <p class="text-graphite-500 text-sm leading-relaxed text-right">{{ item.left.detail }}</p>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Center dot -->
              <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style="top: 6px;">
                <!-- Education dot: filled -->
                <div
                  v-if="item.left && !item.right"
                  class="w-4 h-4 rounded-full bg-graphite-300 border-2 border-graphite-950 z-10 cursor-pointer hover:scale-125 transition-transform"
                  @click="toggle(index, 'left')"
                />
                <!-- Work dot: outlined -->
                <div
                  v-else-if="item.right && !item.left"
                  class="w-4 h-4 rounded-full border-2 border-graphite-300 bg-graphite-950 z-10 cursor-pointer hover:scale-125 transition-transform"
                  @click="toggle(index, 'right')"
                />
                <!-- Both: split dot -->
                <div
                  v-else
                  class="w-5 h-5 rounded-full border-2 border-graphite-300 bg-graphite-300 z-10"
                  style="background: linear-gradient(90deg, #9a9a9a 50%, #0a0a0a 50%);"
                />
              </div>

              <!-- Right side (Experience) -->
              <div class="w-1/2 pl-10 flex justify-start">
                <div v-if="item.right" class="max-w-xs w-full">
                  <button
                    class="w-full text-left group"
                    @click="toggle(index, 'right')"
                  >
                    <p class="text-graphite-500 text-xs tracking-widest uppercase mb-1">{{ item.right.year }}</p>
                    <p class="text-graphite-100 text-base font-medium group-hover:text-white transition-colors">{{ item.right.title }}</p>
                    <p class="text-graphite-400 text-sm">{{ item.right.subtitle }}</p>
                  </button>

                  <Transition name="expand">
                    <div v-if="expanded[`${index}-right`]" class="mt-3 border-t border-graphite-700 pt-3">
                      <p class="text-graphite-500 text-sm leading-relaxed">{{ item.right.detail }}</p>
                    </div>
                  </Transition>
                </div>
              </div>

            </div>

            <!-- Spacer between nodes -->
            <div class="h-10" />
          </div>
        </div>

        <!-- End cap -->
        <div class="relative flex justify-center mt-2">
          <div class="w-2 h-2 rounded-full bg-graphite-700" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const expanded = ref<Record<string, boolean>>({})

function toggle(index: number, side: 'left' | 'right') {
  const key = `${index}-${side}`
  expanded.value[key] = !expanded.value[key]
}

const timeline = [
  {
    left: null,
    right: {
      year:     '2025 — 2026',
      title:    'Web Developer Intern',
      subtitle: 'AWORK A/S · Denmark (Remote)',
      detail:   '5-month internship working remotely with a Danish company, contributing to real-world web development projects and sharpening professional skills in a global environment.',
    }
  },
  {
    left: {
      year:     '2022 — 2026',
      title:    'BS Information Technology',
      subtitle: 'STI College Davao',
      detail:   'Pursued a 4-year BSIT degree, building a strong foundation in software development, systems design, networking, and database management. Graduated 2026.',
    },
    right: {
      year:     '2022 — 2026',
      title:    'IT Support',
      subtitle: 'Hulid Elementary School',
      detail:   '4 years of hands-on IT support starting from 1st year college — managing school systems, troubleshooting hardware and software, and keeping the institution\'s tech running smoothly.',
    }
  },
  {
    left: {
      year:     '2020 — 2022',
      title:    'Senior High School',
      subtitle: 'Davao City National High School',
      detail:   'Completed Senior High School in Davao City, building academic groundwork and sharpening critical thinking before entering college.',
    },
    right: null,
  },
  {
    left: {
      year:     '2016 — 2020',
      title:    'Junior High School',
      subtitle: 'Cateel National High School',
      detail:   'Completed Junior High School in Cateel, Davao Oriental — the foundational years that sparked curiosity in technology and problem-solving.',
    },
    right: null,
  },
  {
    left: {
      year:     '2010 — 2016',
      title:    'Elementary',
      subtitle: 'Maryknoll Academy of Cateel',
      detail:   'Where the journey began — 6 years at Maryknoll Academy in Cateel, Davao Oriental. The starting point of a long road still being written.',
    },
    right: null,
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

<style scoped>
.expand-enter-active,
.expand-leave-active { transition: all 0.3s ease; }
.expand-enter-from,
.expand-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
