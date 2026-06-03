import tailwindcss from '@tailwindcss/vite'

// Suppress the known-benign "Duplicated imports useAppConfig" Nitro warning.
// Emitted by Nitro's consola logger during createNitro() init (before Rollup runs),
// so rollupConfig.onwarn cannot intercept it — we filter at the stream level instead.
for (const s of ['stdout', 'stderr'] as const) {
  const orig = process[s].write.bind(process[s])
  process[s].write = function (chunk: any, ...args: any[]) {
    const msg: string = typeof chunk === 'string' ? chunk : chunk?.toString?.('utf8') ?? ''
    if (msg.includes('Duplicated imports') && msg.includes('useAppConfig')) {
      const cb = args[args.length - 1]
      if (typeof cb === 'function') cb()
      return true
    }
    return (orig as any)(chunk, ...args)
  } as typeof process[typeof s]['write']
}

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
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
        }
      ]
    }
  }
})
