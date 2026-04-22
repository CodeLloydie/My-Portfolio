<template>
  <div class="font-mono bg-graphite-950 text-graphite-100 min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/imgs/White-Logo.png'
useHead({ link: [{ rel: 'icon', type: 'image/png', href: logoImg }] })
</script>
