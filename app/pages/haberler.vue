<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />

    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Medya</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Haberler
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Çelebi Havacılık'tan en güncel gelişmeler, duyurular ve basın bültenleri.
        </p>
      </div>
    </header>

    <main class="py-16 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Featured News -->
        <div class="mb-12 bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-brand/30 transition-all duration-300 group">
          <div class="p-10 md:p-14">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-brand text-[11px] font-medium tracking-[2px] uppercase bg-brand/10 border border-brand/20 rounded-full px-3 py-1">Öne Çıkan</span>
              <span class="text-white/30 text-xs">{{ news[0].date }}</span>
            </div>
            <h2 class="text-white font-bold text-[clamp(1.5rem,3vw,2.2rem)] leading-tight mb-4 group-hover:text-brand transition-colors duration-300">
              {{ news[0].title }}
            </h2>
            <p class="text-white/50 text-base leading-relaxed max-w-2xl mb-6">{{ news[0].summary }}</p>
            <a href="#" class="inline-flex items-center gap-2 text-brand text-sm font-medium hover:gap-3 transition-all duration-300">
              Devamını Oku
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <!-- News Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in news.slice(1)"
            :key="item.title"
            class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300 group flex flex-col"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="text-brand text-[10px] font-medium tracking-[2px] uppercase bg-brand/10 border border-brand/20 rounded-full px-2.5 py-0.5">{{ item.category }}</span>
              <span class="text-white/25 text-xs">{{ item.date }}</span>
            </div>
            <h3 class="text-white font-bold text-base leading-tight mb-3 group-hover:text-brand transition-colors duration-300 flex-1">
              {{ item.title }}
            </h3>
            <p class="text-white/40 text-sm leading-relaxed mb-6">{{ item.summary }}</p>
            <a href="#" class="inline-flex items-center gap-2 text-brand/70 text-xs font-medium hover:text-brand transition-colors duration-300 mt-auto">
              Devamını Oku
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </article>
        </div>

      </div>
    </main>
    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Haberler | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Çelebi Havacılık\'tan güncel haberler, duyurular ve basın bültenleri.' }],
})

const news = [
  {
    title: 'Çelebi Havacılık, Transglobal Cargo Centre Satın Alımıyla Kenya Pazarına Girdi',
    summary: 'Çelebi Havacılık, Afrika\'daki ilk büyük adımını atarak Kenya\'nın önde gelen kargo operatörü Transglobal Cargo Centre\'ı bünyesine kattı. Bu stratejik adım, Çelebi\'nin Afrika kıtasında güçlü bir varlık oluşturmasının başlangıcıdır.',
    date: 'Mart 2025',
    category: 'Kurumsal',
  },
  {
    title: 'Endonezya Kualanamu Havalimanı\'nda Yeni Kargo Terminali Açıldı',
    summary: 'Çelebi\'nin Endonezya operasyonları kapsamında Kualanamu Uluslararası Havalimanı\'nda modern kargo terminali hizmete girdi.',
    date: 'Şubat 2025',
    category: 'Operasyon',
  },
  {
    title: 'BM Kadının Güçlendirilmesi İlkeleri (WEPs) İmzalandı',
    summary: 'Çelebi Havacılık, Birleşmiş Milletler\'in Kadının Güçlendirilmesi İlkeleri\'ni (WEPs) imzalayarak cinsiyet eşitliği taahhüdünü resmileştirdi.',
    date: 'Ocak 2025',
    category: 'Sürdürülebilirlik',
  },
  {
    title: 'G20 Yer Hizmetleri Çalışma Grubu\'na Aktif Katılım',
    summary: 'Çelebi Havacılık, G20 çerçevesinde düzenlenen yer hizmetleri standartları çalışma grubuna katkı sağladı.',
    date: 'Aralık 2024',
    category: 'Sektör',
  },
  {
    title: 'DG AutoCheck Sistemi ile Tehlikeli Madde Güvenliği Güçlendirildi',
    summary: 'Çelebi Kargo operasyonlarında devreye alınan DG AutoCheck sistemi, tehlikeli madde kabul süreçlerini dijitalleştirerek güvenliği artırdı.',
    date: 'Kasım 2024',
    category: 'Teknoloji',
  },
  {
    title: 'Rize-Artvin Havalimanı\'nda Platinum Hizmeti Başladı',
    summary: 'Karadeniz\'in yeni havalimanı Rize-Artvin\'de Çelebi\'nin VIP Platinum karşılama hizmetleri hayata geçirildi.',
    date: 'Ekim 2024',
    category: 'Hizmet',
  },
  {
    title: 'Üst Yönetimde Stratejik Atamalar Gerçekleştirildi',
    summary: 'Çelebi Havacılık, büyüme hedefleri doğrultusunda operasyon ve strateji alanlarında kritik yönetim atamaları yaptı.',
    date: 'Eylül 2024',
    category: 'Kurumsal',
  },
]
</script>
