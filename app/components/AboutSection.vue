<template>
  <section id="about" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-900">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">{{ t('about.label') }}</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light leading-snug tracking-tight mb-8">
          {{ t('about.h2_1') }}<br />
          <span class="text-graphite-400">{{ t('about.h2_2') }}</span><br />
          {{ t('about.h2_3') }}
        </h2>
        <p class="text-graphite-400 text-base leading-loose mb-6">{{ t('about.p1') }}</p>
        <p class="text-graphite-400 text-base leading-loose mb-10">{{ t('about.p2') }}</p>

        <div class="flex flex-wrap gap-3">
          <span v-for="tag in tags" :key="tag"
            class="px-4 py-2 border border-graphite-700 text-graphite-400 text-sm tracking-widest uppercase hover:border-graphite-400 hover:text-graphite-200 transition-colors duration-200">
            {{ tag }}
          </span>
        </div>
      </div>

      <div :class="['transition-all duration-700 delay-200', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <div class="grid grid-cols-2 gap-px bg-graphite-700">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-graphite-900 p-8 hover:bg-graphite-800 transition-colors duration-300">
            <p class="text-graphite-50 text-4xl font-light mb-2">{{ stat.value }}</p>
            <p class="text-graphite-500 text-sm tracking-widest uppercase">{{ stat.label }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const tags = computed(() => [
  t('about.tag_open'),
  t('about.tag_freelance'),
  t('about.tag_ph'),
  t('about.tag_security'),
])

const stats = computed(() => [
  { value: t('about.stat1_val'), label: t('about.stat1_lbl') },
  { value: t('about.stat2_val'), label: t('about.stat2_lbl') },
  { value: t('about.stat3_val'), label: t('about.stat3_lbl') },
  { value: t('about.stat4_val'), label: t('about.stat4_lbl') },
])

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>
