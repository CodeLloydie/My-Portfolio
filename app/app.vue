<template>
  <div class="font-mono min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/imgs/White-Logo.png'
useHead({ link: [{ rel: 'icon', type: 'image/png', href: logoImg }] })

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
