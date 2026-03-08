<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/kariyer" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Kariyer<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kariyer</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Çelebi'de Hayatı Yaşamaya Katılın
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Dünya genelinde havacılık sektörünün dinamik ortamında kariyer fırsatlarını keşfedin.
        </p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">

        <div class="bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-2xl p-12 md:p-16 mb-16">
          <h2 class="text-white font-bold text-3xl mb-4">Açık Pozisyonlar</h2>
          <p class="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
            Çelebi Hava Servisi Türkiye operasyonu ve dünya genelindeki açık pozisyonlarımıza resmi kariyer portalımız üzerinden başvurabilirsiniz. Güncel ilanlar için aşağıdaki linki ziyaret edin.
          </p>
          <a
            href="https://www.celebiaviation.com/tr/kariyer/acik-pozisyonlar"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
          >
            Kariyer Portalına Git
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </div>

        <!-- Categories -->
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="dept in departments" :key="dept.name" class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300">
            <div class="text-brand mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path :d="dept.icon" /></svg>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">{{ dept.name }}</h3>
            <p class="text-white/40 text-sm leading-relaxed">{{ dept.desc }}</p>
          </div>
        </div>

      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Açık Pozisyonlar | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık açık pozisyonları — yer hizmetleri, kargo, lounge, teknoloji ve daha fazlası için kariyer fırsatları.' }] })
const departments = [
  { name: 'Operasyon & Yer Hizmetleri', desc: 'Ramp, yolcu ve apron operasyonlarında uzman pozisyonlar.', icon: 'M12 22l9-9-9-9-9 9 9 9z' },
  { name: 'Kargo & Lojistik', desc: 'Hava kargo elleçleme, depo ve lojistik koordinasyon pozisyonları.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Teknoloji & IT', desc: 'Yazılım geliştirme, sistem yönetimi ve dijital dönüşüm pozisyonları.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'İnsan Kaynakları', desc: 'İşe alım, eğitim ve kurumsal gelişim pozisyonları.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Finans & Muhasebe', desc: 'Finansal raporlama, bütçe ve mali kontrol pozisyonları.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Lounge & VIP Hizmetler', desc: 'Premium yolcu deneyimi ve VIP lounge hizmet pozisyonları.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
]
</script>
