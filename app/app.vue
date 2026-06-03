<template>
  <div class="font-mono min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: '' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [{
    children: `(function(){try{if(localStorage.getItem('color-scheme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
    tagPosition: 'head',
    tagPriority: 'critical',
  }],
})

const isDark = ref(false)

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('color-scheme', dark ? 'dark' : 'light')
  isDark.value = dark
}

onMounted(() => {
  const stored = localStorage.getItem('color-scheme')
  applyTheme(stored === 'dark')
})

provide('isDark', isDark)
provide('toggleDark', () => applyTheme(!isDark.value))
</script>
