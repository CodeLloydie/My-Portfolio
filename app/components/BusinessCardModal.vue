<template>
  <!-- Backdrop -->
  <Transition name="backdrop">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-6"
      @click.self="$emit('update:modelValue', false)">
      <!-- Dim layer -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />

      <!-- X button -->
      <button
        class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-graphite-600 text-graphite-400 hover:text-white hover:border-graphite-300 transition-colors duration-200"
        @click="$emit('update:modelValue', false)" aria-label="Close">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Card scene -->
      <div class="relative z-10 card-scene" @click="flipped = !flipped">
        <div :class="['card-inner', { flipped }]">

          <!-- FRONT -->
          <div class="card-face card-front glass-card">
            <div class="flex flex-col items-center justify-between h-full py-10 px-10">
              <!-- Logo centered -->
              <div class="flex-1 flex items-center justify-center">
                <img src="~/assets/imgs/White-Logo.png" alt="Logo" class="w-32 h-32 object-contain opacity-90" />
              </div>
              <!-- Name bottom -->
              <div class="text-center">
                <p class="text-white/90 text-xl font-medium tracking-[0.2em] uppercase">Marlloyd I. Honrado</p>
                <p class="text-white/40 text-sm tracking-widest uppercase mt-1">Web Developer · Graphic Designer</p>
              </div>
            </div>
            <!-- flip hint -->
            <span class="absolute bottom-3 right-4 text-white/20 text-xs tracking-widest">click to flip →</span>
          </div>

          <!-- BACK -->
          <div class="card-face card-back glass-card">
            <div class="flex h-full">

              <!-- Left accent bar -->
              <div class="w-1 bg-white/10 shrink-0" />

              <div class="flex-1 flex flex-col justify-between py-8 px-8">
                <!-- Top: logo small + name -->
                <div class="flex items-start justify-between">
                  <div class="text-center">
                    <p class="text-white/90 text-xl font-medium tracking-[0.2em] uppercase">Marlloyd I. Honrado</p>
                    <p class="text-white/40 text-sm tracking-widest uppercase mt-1">Reorganize Chaos using Critical
                      Thinking</p>
                  </div>
                </div>

                <!-- Divider -->
                <div class="w-full h-px bg-white/10" />

                <!-- Contact details -->
                <ul class="space-y-3">
                  <li v-for="c in contacts" :key="c.label" class="flex items-center gap-3">
                    <span class="text-white/30 text-xs w-4" v-html="c.icon" />
                    <span class="text-white/70 text-sm tracking-wide">{{ c.value }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Hint text -->
      <p class="absolute bottom-8 text-graphite-600 text-sm tracking-widest z-10">Click card to flip</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [val: boolean] }>()

const flipped = ref(false)

watch(() => false, () => { flipped.value = false })

const contacts = [
  { label: 'email', icon: '@', value: 'honradomarlloyd@gmail.com' },
  { label: 'phone', icon: '#', value: '+63 908 138 1680' },
  { label: 'github', icon: '⌥', value: 'github.com/CodeLloydie' },
]

const socials = [
  { label: 'FB', href: 'https://web.facebook.com/profile.php?id=61584725707398' },
  { label: 'LI', href: 'https://www.linkedin.com/in/marlloyd-honrado-4245402a0' },
  { label: 'IG', href: 'https://www.instagram.com/mihonrado/' },
  { label: 'GH', href: 'https://github.com/CodeLloydie' },
]
</script>

<style scoped>
.card-scene {
  width: 580px;
  height: 320px;
  perspective: 1200px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 32px 80px rgba(0, 0, 0, 0.6);
}

/* Backdrop transition */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
