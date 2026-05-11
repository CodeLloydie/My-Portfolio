<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'backdrop-blur border-b' : 'bg-transparent'
    ]"
    :style="scrolled ? { backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border)' } : {}"
  >
    <nav class="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
      <a href="#hero" class="hover:opacity-80 transition-opacity">
        <span class="text-xl font-bold tracking-widest" :style="{ color: 'var(--text-primary)' }">MIH</span>
      </a>

      <ul class="hidden md:flex items-center gap-10">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="text-sm tracking-widest uppercase transition-colors duration-200"
            :style="{ color: 'var(--text-muted)' }"
            @mouseenter="e => (e.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="e => (e.target as HTMLElement).style.color = 'var(--text-muted)'"
          >{{ link.label }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <!-- Language toggle -->
        <button
          class="px-3 h-8 rounded-full text-xs font-bold tracking-widest border transition-all duration-200"
          :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }"
          :aria-label="locale === 'en' ? 'Switch to Filipino' : 'Switch to English'"
          @click="switchLocale"
        >
          {{ locale === 'en' ? 'FIL' : 'EN' }}
        </button>

        <!-- Dark/Light toggle -->
        <button
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border"
          :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }"
          :aria-label="isDark ? t('nav.aria_light') : t('nav.aria_dark')"
          @click="toggleDark()"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <!-- Hamburger -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-1"
          @click="menuOpen = !menuOpen"
          :aria-label="t('nav.aria_menu')"
        >
          <span :class="['block w-6 h-px transition-all duration-300', menuOpen ? 'rotate-45 translate-y-2' : '']" :style="{ backgroundColor: 'var(--text-muted)' }" />
          <span :class="['block w-6 h-px transition-all duration-300', menuOpen ? 'opacity-0' : '']" :style="{ backgroundColor: 'var(--text-muted)' }" />
          <span :class="['block w-6 h-px transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2' : '']" :style="{ backgroundColor: 'var(--text-muted)' }" />
        </button>
      </div>
    </nav>

    <Transition name="slide">
      <div v-if="menuOpen" class="md:hidden border-t px-8 py-6" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }">
        <ul class="flex flex-col gap-6">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="text-sm tracking-widest uppercase transition-colors"
              :style="{ color: 'var(--text-muted)' }"
              @click="menuOpen = false"
            >{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const scrolled = ref(false)
const menuOpen = ref(false)
const isDark = inject<Ref<boolean>>('isDark', ref(false))
const toggleDark = inject<() => void>('toggleDark', () => {})

const links = computed(() => [
  { href: '#about',     label: t('nav.about') },
  { href: '#skills',    label: t('nav.skills') },
  { href: '#projects',  label: t('nav.projects') },
  { href: '#education', label: t('nav.journey') },
])

function switchLocale() {
  setLocale(locale.value === 'en' ? 'fil' : 'en')
}

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 })
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from,
.slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
