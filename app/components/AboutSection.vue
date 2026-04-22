<template>
  <section id="about" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-900">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">01 — About</p>
        <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light leading-snug tracking-tight mb-8">
          Developer.<br />
          <span class="text-graphite-400">Designer.</span><br />
          Always learning.
        </h2>
        <p class="text-graphite-400 text-base leading-loose mb-6">
          I'm Marlloyd, you can call me Lloydie, a web developer and graphic designer with a passion for clean,
          purposeful work. I build web interfaces with modern tools and design visual assets
          that communicate effectively — blending technical and creative thinking.
        </p>
        <p class="text-graphite-400 text-base leading-loose mb-10">
          Currently expanding into ethical hacking and security concepts, because understanding
          how things break is part of building them right.
        </p>

        <div class="flex flex-wrap gap-3">
          <span v-for="tag in tags" :key="tag"
            class="px-4 py-2 border border-graphite-700 text-graphite-400 text-sm tracking-widest uppercase hover:border-graphite-400 hover:text-graphite-200 transition-colors duration-200">
            {{ tag }}
          </span>
        </div>
      </div>

      <div
        :class="['transition-all duration-700 delay-200', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
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
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const tags = ['Open to Work', 'Freelance Available', 'Based in PH', 'Learning Security']

const stats = [
  { value: '4+', label: 'Years IT Support' },
  { value: '5mo', label: 'Web Dev Internship' },
  { value: '3+', label: 'Design Tools' },
  { value: '∞', label: 'Still Learning' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>
