import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel',
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
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  hooks: {
    async 'nitro:init'(nitro) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nitro.hooks.hook('rollup:before', (n: any) => {
        for (const cfg of [n.rollupConfig, n.options?.rollupConfig].filter(Boolean)) {
          const prev = cfg.onwarn
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cfg.onwarn = (warning: any, warn: any) => {
            if (warning.message?.includes('useAppConfig')) return
            if (prev) prev(warning, warn)
            else warn(warning)
          }
        }
      })
    },
    'vite:extendConfig'(config) {
      Object.assign(config, {
        build: {
          ...config.build,
          rollupOptions: {
            ...config.build?.rollupOptions,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onwarn(warning: any, warn: any) {
              if (warning.message?.includes('Sourcemap is likely to be incorrect')) return
              warn(warning)
            },
          },
        },
      })
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
