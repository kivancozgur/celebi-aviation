<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">

    <!-- Page Header -->
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">
            Ana Sayfa
            <span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          </span>
        </NuxtLink>

        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Hizmetler</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          Yer Hizmetleri
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          Uçak operasyonlarından yolcu hizmetlerine kadar havalimanı operasyonlarının her adımında kusursuz destek.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Service Categories -->
        <section class="py-20">
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="category in serviceCategories"
              :key="category.title"
              class="bg-gray-50 border border-gray-200 rounded-2xl p-10 hover:border-brand/30 transition-all duration-300 group"
            >
              <div class="text-brand mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <path :d="category.iconPath" />
                </svg>
              </div>
              <h2 class="text-gray-900 font-bold text-2xl mb-4 group-hover:text-brand transition-colors duration-300">{{ category.title }}</h2>
              <p class="text-gray-500 text-sm leading-relaxed mb-8">{{ category.desc }}</p>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="item in category.items"
                  :key="item"
                  class="flex items-start gap-3 text-gray-500 text-sm"
                >
                  <span class="mt-[5px] w-[5px] h-[5px] rounded-full bg-brand flex-none" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Why Celebi -->
        <section class="py-16 border-t border-gray-100">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Neden Çelebi</span>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="py-8 border-t border-gray-200 hover:border-brand/30 transition-colors duration-300"
            >
              <div class="text-[clamp(2rem,4vw,3rem)] font-bold text-brand mb-3">{{ feature.stat }}</div>
              <h3 class="text-gray-900 font-semibold text-base mb-2">{{ feature.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="py-16 border-t border-gray-100">
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 class="text-gray-900 font-bold text-3xl md:text-4xl leading-tight mb-3">İşbirliği Yapalım</h2>
              <p class="text-gray-500 text-base leading-relaxed max-w-lg">Yer hizmetleri ihtiyaçlarınız için uzman ekibimizle iletişime geçin.</p>
            </div>
            <NuxtLink
              to="/#contact"
              class="flex-none inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              İletişime Geç
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </div>
        </section>

      </div>
    </main>

    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Yer Hizmetleri | Çelebi Havacılık',
  meta: [
    {
      name: 'description',
      content: 'Ramp hizmetleri, yolcu taşımacılığı, yük kontrol ve uçuş operasyonu — Çelebi\'nin kapsamlı yer hizmetleri çözümleri.',
    },
  ],
})

const serviceCategories = [
  {
    title: 'Ramp Hizmetleri',
    desc: 'Uçak park ve apron operasyonlarının tamamında güvenli ve verimli destek.',
    iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    items: [
      'Uçak park ve yönlendirme',
      'Yükleme ve boşaltma operasyonları',
      'Apron taşımacılığı',
      'Uçak çekme hizmetleri',
      'Kabin temizliği',
      'Isıtma ve soğutma sistemleri',
      'Tuvalet ve su servisi',
      'De-icing / Anti-icing uygulamaları',
    ],
  },
  {
    title: 'Yolcu Hizmetleri',
    desc: 'Check-in\'den bagaj teslimine kadar yolcunun her adımında profesyonel destek.',
    iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    items: [
      'Check-in işlemleri',
      'Boarding ve kapı hizmetleri',
      'Bilet satışı ve rezervasyon',
      'Geliş yolcu hizmetleri',
      'Kayıp eşya takibi',
      'Refakatsiz küçük (UM) hizmetleri',
      'Engelli yolcu yardım hizmetleri',
    ],
  },
  {
    title: 'Yük Kontrol & Uçuş Operasyonu',
    desc: 'Uçuş güvenliği ve verimliliği için kapsamlı yük planlama ve operasyon hizmetleri.',
    iconPath: 'M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8',
    items: [
      'Yük kontrolü ve denge hesaplamaları',
      'Uçuş öncesi iletişim ve koordinasyon',
      'Uçuş hazırlık süreçleri',
      'VHF haberleşme hizmetleri',
      'Hava ve uçuş planı bilgilendirme',
    ],
  },
  {
    title: 'Temsil & Gözetim',
    desc: 'Havayolları adına havalimanında profesyonel temsil ve operasyonel gözetim hizmetleri.',
    iconPath: 'M1 6l4.5 4.5L9 7l4 4.5L17 8l4 5M1 18h22',
    items: [
      'Havayolu temsilciliği',
      'Operasyonel gözetim ve raporlama',
      'Havalimanı koordinasyonu',
      'Slot yönetimi',
      'Düzenleyici kurumlarla irtibat',
    ],
  },
]

const features = [
  { stat: '60+', title: 'Havalimanı', desc: 'Türkiye ve dünya genelinde 60\'tan fazla havalimanında aktif operasyon.' },
  { stat: '7/24', title: 'Kesintisiz Hizmet', desc: 'Yılın 365 günü, günün her saatinde operasyonel destek.' },
  { stat: '65+', title: 'Yıllık Deneyim', desc: '1958\'den bu yana havacılıkta kesintisiz hizmet ve birikim.' },
]
</script>
