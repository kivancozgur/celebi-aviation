<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Medya</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">Duyurular</h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">Çelebi Havacılık'ın resmi duyuruları ve basın açıklamaları.</p>
      </div>
    </header>
    <main class="py-16 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <ul class="flex flex-col gap-0">
          <li
            v-for="announcement in announcements"
            :key="announcement.title"
            class="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-gray-100 group hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-all duration-300"
          >
            <span class="text-gray-400 text-sm font-mono flex-none">{{ announcement.date }}</span>
            <h3 class="text-gray-900 text-base font-medium flex-1 group-hover:text-brand transition-colors duration-300">{{ announcement.title }}</h3>
            <a href="#" class="flex-none text-brand/60 hover:text-brand text-xs font-medium transition-colors duration-300 whitespace-nowrap">İncele →</a>
          </li>
        </ul>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Duyurular | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık resmi duyuruları — CEIV Pharma sertifikası, enerji raporları ve sektörel duyurular.' }] })
const announcements = [
  { date: '2025 Mart', title: 'Frankfurt İlaç Lojistiği Operasyonları CEIV Pharma Sertifikası Alındı' },
  { date: '2025 Şubat', title: 'Budapeşte Operasyonları Yıllık Enerji Verimliliği Raporu Yayımlandı' },
  { date: '2025 Ocak', title: 'Budapeşte Havalimanı Enerji Tüketim Azaltma Hedefleri Açıklandı' },
  { date: '2024 Aralık', title: 'CEIV Pharma Sertifikasyonu Genişletme Duyurusu' },
  { date: '2024 Kasım', title: 'DG AutoCheck Sistemi Aktif Kullanıma Alındı' },
  { date: '2024 Ekim', title: 'Rize-Artvin Havalimanı Platinum Hizmeti Açılış Duyurusu' },
]
</script>
