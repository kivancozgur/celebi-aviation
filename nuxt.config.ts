export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'tr',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/**': {
      headers: {
        // Clickjacking koruması (Y-2)
        'X-Frame-Options': 'DENY',
        // MIME sniffing koruması (O-1)
        'X-Content-Type-Options': 'nosniff',
        // Referrer bilgisi sınırlandırma (O-1)
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // Kamera/mikrofon/konum erişim kısıtlaması (O-1)
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        // HTTPS zorlama — production'da aktif olur (O-1)
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        // Content Security Policy (Y-1)
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "font-src 'self'",
          "img-src 'self' data: https://images.unsplash.com https://www.celebiaviation.com",
          "connect-src 'self'",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    },
  },
  app: {
    head: {
      title: 'Celebi Aviation — Global Aviation Services',
      htmlAttrs: { lang: 'tr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Dünya genelinde 4 ülkede, 60+ havalimanında yer hizmetleri, kargo, genel havacılık ve premium çözümler.',
        },
        // Open Graph
        { property: 'og:title', content: 'Celebi Aviation — Global Aviation Services' },
        {
          property: 'og:description',
          content:
            'Dünya genelinde 4 ülkede, 60+ havalimanında yer hizmetleri, kargo, genel havacılık ve premium çözümler.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'tr_TR' },
        { property: 'og:site_name', content: 'Celebi Aviation' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Celebi Aviation — Global Aviation Services' },
        {
          name: 'twitter:description',
          content:
            'Dünya genelinde 4 ülkede, 60+ havalimanında yer hizmetleri, kargo, genel havacılık ve premium çözümler.',
        },
      ],
      link: [
        { rel: 'canonical', href: 'https://celebi-aviation.com' },
      ],
    },
  },
})
