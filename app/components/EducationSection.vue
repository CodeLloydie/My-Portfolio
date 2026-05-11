<template>
  <section id="education" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-950">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div
        :class="['transition-all duration-700 mb-20', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">{{ t('journey.label') }}</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light tracking-tight">{{ t('journey.heading') }}</h2>
      </div>

      <!-- Legend -->
      <div
        :class="['flex items-center justify-center gap-10 mb-16 transition-all duration-700', visible ? 'opacity-100' : 'opacity-0']">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-graphite-300" />
          <span class="text-graphite-500 text-sm tracking-widest uppercase">{{ t('journey.legend_edu') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full border-2 border-graphite-300" />
          <span class="text-graphite-500 text-sm tracking-widest uppercase">{{ t('journey.legend_exp') }}</span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">

        <!-- Center line -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-graphite-700 transition-all duration-1000"
          :style="{ height: visible ? '100%' : '0%' }" />

        <div class="space-y-0">
          <div v-for="(item, index) in timeline" :key="index"
            :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
            :style="{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }">
            <div class="relative flex items-start min-h-24">

              <!-- Left side (Education) -->
              <div class="w-1/2 pr-10 flex justify-end">
                <div v-if="item.left" class="max-w-xs w-full" :class="item.left ? 'text-right' : ''">
                  <button class="w-full text-right group" @click="toggle(index, 'left')">
                    <p class="text-graphite-500 text-xs tracking-widest uppercase mb-1">{{ item.left.year }}</p>
                    <p class="text-graphite-100 text-base font-medium group-hover:text-white transition-colors">{{
                      item.left.title }}</p>
                    <p class="text-graphite-400 text-sm">{{ item.left.subtitle }}</p>
                    <span v-if="item.left.strand" class="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full border border-graphite-700 text-graphite-400 tracking-widest uppercase">
                      {{ item.left.strand }}
                    </span>
                  </button>

                  <!-- Expanded detail -->
                  <Transition name="expand">
                    <div v-if="expanded[`${index}-left`]" class="mt-3 border-t border-graphite-700 pt-3 space-y-2">
                      <p class="text-graphite-500 text-sm leading-relaxed text-right">{{ item.left.detail }}</p>
                      <template v-if="item.left.role">
                        <p class="text-graphite-400 text-xs tracking-widest uppercase text-right">{{ item.left.role }}</p>
                        <ul class="space-y-1">
                          <li v-for="task in item.left.tasks" :key="task" class="text-graphite-500 text-xs text-right flex items-start justify-end gap-1.5">
                            <span>{{ task }}</span><span class="text-graphite-300 shrink-0">·</span>
                          </li>
                        </ul>
                      </template>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Center dot -->
              <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style="top: 6px;">
                <!-- Education dot: filled -->
                <div v-if="item.left && !item.right"
                  class="w-4 h-4 rounded-full bg-graphite-300 border-2 border-graphite-950 z-10 cursor-pointer hover:scale-125 transition-transform"
                  @click="toggle(index, 'left')" />
                <!-- Work dot: outlined -->
                <div v-else-if="item.right && !item.left"
                  class="w-4 h-4 rounded-full border-2 border-graphite-300 bg-graphite-950 z-10 cursor-pointer hover:scale-125 transition-transform"
                  @click="toggle(index, 'right')" />
                <!-- Both: split dot -->
                <div v-else class="w-5 h-5 rounded-full border-2 border-graphite-300 bg-graphite-300 z-10"
                  style="background: linear-gradient(90deg, #9a9a9a 50%, #0a0a0a 50%);" />
              </div>

              <!-- Right side (Experience) -->
              <div class="w-1/2 pl-10 flex justify-start">
                <div v-if="item.right" class="max-w-xs w-full">
                  <button class="w-full text-left group" @click="toggle(index, 'right')">
                    <p class="text-graphite-500 text-xs tracking-widest uppercase mb-1">{{ item.right.year }}</p>
                    <p class="text-graphite-100 text-base font-medium group-hover:text-white transition-colors">{{
                      item.right.title }}</p>
                    <p class="text-graphite-400 text-sm">{{ item.right.subtitle }}</p>
                  </button>

                  <Transition name="expand">
                    <div v-if="expanded[`${index}-right`]" class="mt-3 border-t border-graphite-700 pt-3 space-y-2">
                      <p class="text-graphite-500 text-sm leading-relaxed">{{ item.right.detail }}</p>
                      <template v-if="item.right.role">
                        <p class="text-graphite-400 text-xs tracking-widest uppercase">{{ item.right.role }}</p>
                        <ul class="space-y-1">
                          <li v-for="task in item.right.tasks" :key="task" class="text-graphite-500 text-xs flex items-start gap-1.5">
                            <span class="text-graphite-300 shrink-0">·</span><span>{{ task }}</span>
                          </li>
                        </ul>
                      </template>
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
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const expanded = ref<Record<string, boolean>>({})

function toggle(index: number, side: 'left' | 'right') {
  const key = `${index}-${side}`
  expanded.value[key] = !expanded.value[key]
}

const timeline = computed(() => [
  {
    left: null,
    right: {
      year: '2025 — 2026',
      title: t('journey.intern_title'),
      subtitle: t('journey.intern_sub'),
      detail: t('journey.intern_detail'),
      role: t('journey.intern_role'),
      tasks: [t('journey.intern_task1'), t('journey.intern_task2')],
    }
  },
  {
    left: {
      year: '2022 — 2026',
      title: t('journey.bsit_title'),
      subtitle: t('journey.bsit_sub'),
      detail: t('journey.bsit_detail'),
    },
    right: {
      year: '2022 — 2026',
      title: t('journey.itsupport_title'),
      subtitle: t('journey.itsupport_sub'),
      detail: t('journey.itsupport_detail'),
      role: t('journey.itsupport_role'),
      tasks: [
        t('journey.itsupport_t1'), t('journey.itsupport_t2'),
        t('journey.itsupport_t3'), t('journey.itsupport_t4'),
        t('journey.itsupport_t5'), t('journey.itsupport_t6'),
      ],
    }
  },
  {
    left: {
      year: '2020 — 2022',
      title: t('journey.shs_title'),
      subtitle: t('journey.shs_sub'),
      strand: t('journey.shs_strand'),
      detail: t('journey.shs_detail'),
    },
    right: null,
  },
  {
    left: {
      year: '2016 — 2020',
      title: t('journey.jhs_title'),
      subtitle: t('journey.jhs_sub'),
      strand: t('journey.jhs_strand'),
      detail: t('journey.jhs_detail'),
    },
    right: null,
  },
  {
    left: {
      year: '2010 — 2016',
      title: t('journey.elem_title'),
      subtitle: t('journey.elem_sub'),
      detail: t('journey.elem_detail'),
    },
    right: null,
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
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
