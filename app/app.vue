<template>
  <div class="font-mono min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/imgs/White-Logo.png'
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: logoImg }],
  script: [{
    children: `(function(){try{var s=localStorage.getItem('color-scheme');if(s!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
    tagPosition: 'head',
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
