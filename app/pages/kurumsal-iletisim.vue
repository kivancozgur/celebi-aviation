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
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">Kurumsal İletişim</h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">Medya kiti, logo dosyaları ve kurumsal iletişim kaynakları.</p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">
        <div class="flex items-center gap-3 mb-12">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Logo Dosyaları</span>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mb-16">
          <div
            v-for="logo in logos"
            :key="logo.name"
            class="border border-gray-200 rounded-2xl overflow-hidden hover:border-brand/30 transition-all duration-300 group"
          >
            <div class="flex items-center justify-center py-16 px-8" :class="logo.bg">
              <img src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg" :alt="logo.name" class="h-10 w-auto" :class="logo.filter" />
            </div>
            <div class="bg-white/[0.03] p-5 flex items-center justify-between">
              <div>
                <h3 class="text-gray-900 font-semibold text-sm">{{ logo.name }}</h3>
                <p class="text-gray-400 text-xs mt-0.5">PNG Formatı</p>
              </div>
              <a href="#" class="flex items-center gap-2 text-brand text-xs font-medium hover:gap-3 transition-all duration-300">
                İndir
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 7l3 3 3-3M2 11h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Medya İletişim -->
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-10 md:p-14">
          <h2 class="text-gray-900 font-bold text-2xl mb-4">Medya İletişim</h2>
          <p class="text-gray-500 text-base leading-relaxed mb-6 max-w-xl">Basın sorularınız ve medya işbirliği talepleriniz için pazarlama ve iletişim ekibimizle iletişime geçebilirsiniz.</p>
          <a href="mailto:marketing@celebiaviation.com" class="inline-flex items-center gap-2 text-brand font-medium hover:gap-3 transition-all duration-300">
            marketing@celebiaviation.com
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </div>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Kurumsal İletişim | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık medya kiti ve logo dosyaları — renkli, siyah beyaz, farklı zemin seçenekleri.' }] })
const logos = [
  { name: 'Renkli — Beyaz Zemin', bg: 'bg-white', filter: '' },
  { name: 'Renkli — Mavi Zemin', bg: 'bg-brand', filter: 'brightness-0 invert' },
  { name: 'Siyah — Beyaz Zemin', bg: 'bg-white', filter: 'brightness-0' },
  { name: 'Beyaz — Siyah Zemin', bg: 'bg-[#0A0A0A]', filter: 'brightness-0 invert' },
]
</script>
