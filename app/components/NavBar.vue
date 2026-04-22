<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'bg-graphite-950/95 backdrop-blur border-b border-graphite-700' : 'bg-transparent'
    ]"
  >
    <nav class="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
      <a href="#hero" class="hover:opacity-80 transition-opacity">
        <img src="~/assets/imgs/White-Logo.png" alt="MIH Logo" class="h-24 w-auto" />
      </a>

      <ul class="hidden md:flex items-center gap-10">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="text-graphite-400 hover:text-graphite-100 text-sm tracking-widest uppercase transition-colors duration-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <button
        class="md:hidden flex flex-col gap-1.5 p-1"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span :class="['block w-6 h-px bg-graphite-300 transition-all duration-300', menuOpen ? 'rotate-45 translate-y-2' : '']" />
        <span :class="['block w-6 h-px bg-graphite-300 transition-all duration-300', menuOpen ? 'opacity-0' : '']" />
        <span :class="['block w-6 h-px bg-graphite-300 transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2' : '']" />
      </button>
    </nav>

    <Transition name="slide">
      <div v-if="menuOpen" class="md:hidden bg-graphite-900 border-t border-graphite-700 px-8 py-6">
        <ul class="flex flex-col gap-6">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="text-graphite-300 hover:text-white text-sm tracking-widest uppercase transition-colors"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#education',  label: 'Journey' },
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from,
.slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
