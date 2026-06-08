<template>
  <section id="contact" ref="sectionRef" class="py-32 px-8 border-t border-graphite-800 bg-graphite-950">
    <div class="max-w-6xl mx-auto">

      <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5">{{ t('contact.label') }}</p>

        <div class="grid lg:grid-cols-2 gap-20 items-start">

          <!-- Left: copy -->
          <div>
            <h2 class="text-graphite-100 text-4xl sm:text-5xl font-light leading-snug tracking-tight mb-8">
              {{ t('contact.h2_1') }}<br />
              <span class="text-graphite-400">{{ t('contact.h2_2') }}</span>
            </h2>
            <p class="text-graphite-400 text-base leading-loose mb-10">{{ t('contact.sub') }}</p>

            <a
              href="mailto:honradomarlloyd@gmail.com"
              class="inline-flex items-center gap-3 text-graphite-400 hover:text-graphite-100 transition-colors duration-200 text-sm tracking-wide group"
            >
              <span class="text-graphite-600 group-hover:text-graphite-400 transition-colors duration-200">—</span>
              honradomarlloyd@gmail.com
            </a>
          </div>

          <!-- Right: form -->
          <form @submit.prevent="submitForm" class="flex flex-col gap-5">
            <!-- Honeypot (anti-spam) -->
            <input type="checkbox" name="botcheck" class="hidden" style="display:none" />

            <!-- Name -->
            <div>
              <label class="block text-graphite-500 text-xs tracking-[0.2em] uppercase mb-2">
                {{ t('contact.name') }}
              </label>
              <input
                v-model="state.name"
                type="text"
                :placeholder="t('contact.name_placeholder')"
                required
                :disabled="status === 'sending' || status === 'success'"
                class="w-full bg-graphite-900 border border-graphite-700 px-4 py-3 text-graphite-100 text-sm tracking-wide placeholder:text-graphite-600 focus:outline-none focus:border-graphite-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-graphite-500 text-xs tracking-[0.2em] uppercase mb-2">
                {{ t('contact.email') }}
              </label>
              <input
                v-model="state.email"
                type="email"
                :placeholder="t('contact.email_placeholder')"
                required
                :disabled="status === 'sending' || status === 'success'"
                class="w-full bg-graphite-900 border border-graphite-700 px-4 py-3 text-graphite-100 text-sm tracking-wide placeholder:text-graphite-600 focus:outline-none focus:border-graphite-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <!-- Message -->
            <div>
              <label class="block text-graphite-500 text-xs tracking-[0.2em] uppercase mb-2">
                {{ t('contact.message') }}
              </label>
              <textarea
                v-model="state.message"
                :placeholder="t('contact.message_placeholder')"
                required
                rows="5"
                :disabled="status === 'sending' || status === 'success'"
                class="w-full bg-graphite-900 border border-graphite-700 px-4 py-3 text-graphite-100 text-sm tracking-wide placeholder:text-graphite-600 focus:outline-none focus:border-graphite-400 transition-colors duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <!-- Submit + status -->
            <div class="flex items-center gap-6 flex-wrap">
              <button
                type="submit"
                :disabled="status === 'sending' || status === 'success'"
                class="inline-flex items-center px-8 py-3 text-sm tracking-widest uppercase font-medium rounded-full transition-all duration-200 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                :style="{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }"
              >
                <span v-if="status === 'sending'">{{ t('contact.sending') }}</span>
                <span v-else-if="status === 'success'">{{ t('contact.sent') }}</span>
                <span v-else>{{ t('contact.send') }}</span>
              </button>

              <Transition name="msg-fade">
                <p v-if="status === 'success'" class="text-graphite-400 text-sm tracking-wide">
                  {{ t('contact.success') }}
                </p>
                <p v-else-if="status === 'error'" class="text-red-400 text-sm tracking-wide">
                  {{ t('contact.error') }}
                </p>
              </Transition>
            </div>

          </form>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const state = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const config = useRuntimeConfig()
const accessKey = config.public.web3formsKey as string

async function submitForm() {
  status.value = 'sending'
  try {
    const res = await $fetch<{ success: boolean }>('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: accessKey,
        name: state.name,
        email: state.email,
        message: state.message,
        subject: "New message from portfolio contact form",
        from_name: state.name,
      },
    })
    status.value = res?.success ? 'success' : 'error'
    if (res?.success) Object.assign(state, { name: '', email: '', message: '' })
  } catch {
    status.value = 'error'
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
.msg-fade-enter-active,
.msg-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.msg-fade-enter-from,
.msg-fade-leave-to { opacity: 0; transform: translateY(4px); }
</style>
