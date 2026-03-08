<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">

    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">VIP Hizmetler</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          Platinum
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          Ekonomi veya Business sınıfı fark etmeksizin, tüm yolcularımıza eşit düzeyde sunulan özel VIP karşılama ve destek hizmetleri.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Highlight -->
        <section class="py-20">
          <div class="bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-2xl p-12 md:p-16 mb-12">
            <div class="flex items-start gap-4 mb-6">
              <div class="text-brand">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <h2 class="text-gray-900 font-bold text-2xl mb-2">Sınıf Ayrımı Yok</h2>
                <p class="text-gray-500 text-base leading-relaxed max-w-2xl">
                  Platinum hizmetimiz Ekonomi ve Business sınıfı ayrımı gözetmeksizin tüm yolcularımıza eşit kalitede sunulmaktadır. Her yolcu, aynı özenli ve kişiselleştirilmiş deneyimi yaşar.
                </p>
              </div>
            </div>
          </div>

          <!-- Services Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="service in platinumServices"
              :key="service.title"
              class="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300 group"
            >
              <div class="text-brand mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <path :d="service.iconPath" />
                </svg>
              </div>
              <h3 class="text-gray-900 font-bold text-base mb-2 group-hover:text-brand transition-colors duration-300">{{ service.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ service.desc }}</p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="py-16 border-t border-gray-100">
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 class="text-gray-900 font-bold text-3xl md:text-4xl leading-tight mb-3">Platinum Deneyimi Yaşayın</h2>
              <p class="text-gray-500 text-base leading-relaxed max-w-lg">Platinum hizmetlerimiz hakkında detaylı bilgi için iletişime geçin.</p>
            </div>
            <NuxtLink to="/#contact" class="flex-none inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap">
              Rezervasyon Yaptır
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
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
  title: 'Platinum VIP Hizmetler | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Çelebi Platinum VIP hizmetleri — karşılama, bagaj, Fast Track, apron transferi ve vize hizmetleri. Sınıf ayrımı gözetmeksizin tüm yolculara.' }],
})

const platinumServices = [
  { title: 'Geliş Karşılaması', desc: 'Uçak kapısında profesyonel karşılama ve yönlendirme hizmeti.', iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Bagaj Yardımı', desc: 'Bagajlarınızın kapıdan alınması ve teslim noktasına taşınması.', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { title: 'Havalimanı Dışı Ulaşım', desc: 'Otel, iş merkezi veya şehir merkezine VIP araç transferi.', iconPath: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 6l3 4h4l1 3H3l1-3h4l3-4h2z' },
  { title: 'Apron İçi Ulaşım', desc: 'Uçak ile terminal arasında konforlu apron aracı transferi.', iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { title: 'Vize Hizmetleri', desc: 'Vize başvurusu ve gerekli belgeler konusunda destek ve yönlendirme.', iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { title: 'Hızlı Check-in', desc: 'Kuyruklarda bekleme olmadan öncelikli check-in işlemi.', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { title: 'Fast Track Ayrıcalığı', desc: 'Güvenlik ve pasaport kontrolünde özel hat kullanım hakkı.', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
]
</script>
