<template>
  <div class="font-mono min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'dark' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [{
    children: `(function(){try{if(localStorage.getItem('color-scheme')==='light')document.documentElement.classList.remove('dark')}catch(e){}})()`,
    tagPosition: 'head',
    tagPriority: 'critical',
  }],
})

const isDark = ref(true)

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('color-scheme', dark ? 'dark' : 'light')
  isDark.value = dark
}

onMounted(() => {
  const stored = localStorage.getItem('color-scheme')
  applyTheme(stored !== 'light')
})

provide('isDark', isDark)
provide('toggleDark', () => applyTheme(!isDark.value))
</script>
