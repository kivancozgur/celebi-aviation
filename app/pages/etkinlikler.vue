<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Medya</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">Etkinlikler</h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">Çelebi Havacılık'ın katıldığı fuarlar, konferanslar ve endüstri etkinlikleri.</p>
      </div>
    </header>
    <main class="py-16 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="event in events"
            :key="event.name"
            class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300 group"
          >
            <div class="flex items-center gap-2 mb-4">
              <span class="text-brand text-[10px] font-medium tracking-[2px] uppercase bg-brand/10 border border-brand/20 rounded-full px-2.5 py-0.5">{{ event.status }}</span>
            </div>
            <div class="text-brand font-bold text-2xl mb-1">{{ event.date }}</div>
            <h3 class="text-white font-bold text-lg mb-2 group-hover:text-brand transition-colors duration-300">{{ event.name }}</h3>
            <p class="text-white/40 text-sm mb-1">{{ event.location }}</p>
            <p class="text-white/30 text-xs">{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Etkinlikler | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık\'ın katıldığı havacılık fuarları, konferanslar ve endüstri etkinlikleri takvimi.' }] })
const events = [
  { date: '15 Mart', name: 'MITT', location: 'Moskova, Rusya', desc: 'Uluslararası Seyahat ve Turizm Fuarı', status: '2026' },
  { date: '4-6 Nisan', name: 'Ground Handling International', location: 'Cenevre, İsviçre', desc: 'Yer hizmetleri sektörünün önde gelen fuarı', status: '2026' },
  { date: '20-22 Mayıs', name: 'IATA AGM', location: 'İstanbul, Türkiye', desc: 'IATA Yıllık Genel Kurulu ve Dünya Hava Taşımacılığı Zirvesi', status: '2026' },
  { date: '3-5 Haziran', name: 'Air Cargo Europe', location: 'Münih, Almanya', desc: 'Hava kargo ve lojistik fuarı', status: '2026' },
]
</script>
