import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel',
    rollupConfig: {
      onwarn(warning, warn) {
        if (warning.message?.includes('useAppConfig')) return
        warn(warning)
      },
    },
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    restructureDir: false,
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fil', name: 'Filipino', file: 'fil.json' },
    ],
    defaultLocale: 'en',
    langDir: 'lang/',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  hooks: {
    'vite:extendConfig'(config) {
      Object.assign(config, { build: { ...config.build, sourcemap: false } })
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Marlloyd Honrado — Developer & Designer',
      meta: [
        { name: 'description', content: 'Web Developer, Ethical Hacking Learner & Graphic Designer.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap'
        }
      ]
    }
  }
})
