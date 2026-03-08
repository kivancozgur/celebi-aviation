<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/kariyer" class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Kariyer<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Eğitim & Gelişim</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">Çelebi Akademi</h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">Çelebi e-School platformuyla 7/24 erişilebilen dijital eğitim ekosistemi.</p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">

        <!-- CEO Mesajı -->
        <section class="mb-20 bg-gradient-to-br from-brand/5 to-transparent border border-brand/15 rounded-2xl p-10 md:p-14">
          <div class="flex items-start gap-4 mb-4">
            <svg class="text-brand flex-none mt-1" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.3 2.3a1 1 0 011.4 0l9 9a1 1 0 010 1.4l-9 9a1 1 0 01-1.4-1.4L19.6 12 11.3 3.7a1 1 0 010-1.4z"/></svg>
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">CEO Mesajı — Dave Dorner</span>
          </div>
          <blockquote class="text-gray-600 text-[17px] leading-[1.9] italic">
            "Çelebi Akademi, çalışanlarımızın sürekli gelişimini desteklemek için kurduğumuz dijital bir öğrenme platformudur. İnandığımız şey basit: insanlarımıza yatırım yapmak, geleceğimize yatırım yapmaktır."
          </blockquote>
        </section>

        <!-- e-School -->
        <section class="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div class="flex items-center gap-3 mb-6"><span class="h-px w-10 bg-brand" /><span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Çelebi e-School</span></div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">Dijital Eğitim Platformu</h2>
            <p class="text-gray-500 text-[17px] leading-[1.9]">2016 yılında hayata geçirilen Çelebi e-School, tüm çalışanlarımızın mesleki ve kişisel gelişimini destekleyen kapsamlı bir e-öğrenme platformudur. Havacılıktan liderliğe, teknik eğitimlerden soft skill geliştirmeye geniş bir içerik kataloğu sunar.</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="feature in features" :key="feature.title" class="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-brand/30 transition-all duration-300">
              <div class="text-brand mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path :d="feature.icon" /></svg>
              </div>
              <h3 class="text-gray-900 font-semibold text-sm mb-1">{{ feature.title }}</h3>
              <p class="text-gray-400 text-xs leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </section>

        <!-- E.nocta Uygulaması -->
        <section class="border-t border-gray-100 pt-16">
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div class="flex items-center gap-3 mb-4"><span class="h-px w-10 bg-brand" /><span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Mobil Uygulama</span></div>
              <h2 class="text-gray-900 font-bold text-2xl mb-3">E.nocta</h2>
              <p class="text-gray-500 text-base leading-relaxed max-w-lg">Çelebi Akademi'nin mobil uygulaması E.nocta ile eğitimlere istediğiniz zaman, istediğiniz yerden erişin. iOS ve Android uyumlu.</p>
            </div>
            <div class="flex gap-3 flex-none">
              <div class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-500 text-sm font-medium">App Store</div>
              <div class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-500 text-sm font-medium">Google Play</div>
            </div>
          </div>
        </section>

      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Çelebi Akademi | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi e-School dijital öğrenme platformu — 7/24 erişim, mobil uyumlu eğitimler ve E.nocta uygulaması.' }] })
const features = [
  { title: '7/24 Erişim', desc: 'Her an, her yerden eğitimlere ulaşın.', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2' },
  { title: 'Mobil Uyumlu', desc: 'Telefon ve tabletlerden kesintisiz deneyim.', icon: 'M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z' },
  { title: '2016\'dan Beri', desc: '8+ yıllık dijital eğitim birikimi.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Çok Dilli', desc: 'Türkçe, İngilizce ve yerel dil desteği.', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
]
</script>
