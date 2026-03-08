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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Premium</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          Lounge Hizmetleri
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          Budapeşte Liszt Ferenc Havalimanı'nda Platinum yolcu salonlarında konforlu ve ayrıcalıklı bir bekleyiş deneyimi.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Location Info -->
        <section class="py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Konum</span>
            </div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Budapeşte Liszt Ferenc Uluslararası Havalimanı
            </h2>
            <p class="text-gray-500 text-[17px] leading-[1.9] mb-8">
              Macaristan'ın başkenti Budapeşte'nin en yoğun havalimanında, Çelebi Platinum Lounge yolcularımıza eşsiz bir konfor ortamı sunmaktadır.
            </p>
            <div class="flex items-center gap-4 p-5 bg-gray-50 border border-gray-200 rounded-xl">
              <div class="text-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div class="text-gray-400 text-xs tracking-[1px] uppercase mb-1">Çalışma Saatleri</div>
                <div class="text-gray-900 font-semibold">Her Gün — 05:00 ile 20:00 arası</div>
              </div>
            </div>
          </div>

          <!-- Services -->
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-10">
            <h3 class="text-gray-900 font-bold text-xl mb-8">Salon İçi Hizmetler</h3>
            <ul class="flex flex-col gap-5">
              <li v-for="service in loungeServices" :key="service.title" class="flex items-start gap-4">
                <div class="mt-1 text-brand flex-none">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path :d="service.iconPath" />
                  </svg>
                </div>
                <div>
                  <div class="text-gray-900 font-semibold text-sm mb-0.5">{{ service.title }}</div>
                  <div class="text-gray-400 text-xs leading-relaxed">{{ service.desc }}</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- CTA -->
        <section class="py-16 border-t border-gray-100">
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 class="text-gray-900 font-bold text-3xl md:text-4xl leading-tight mb-3">Platinum Ayrıcalığı</h2>
              <p class="text-gray-500 text-base leading-relaxed max-w-lg">Lounge erişimi ve Platinum hizmetler hakkında bilgi almak için bizimle iletişime geçin.</p>
            </div>
            <NuxtLink to="/platinum" class="flex-none inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap">
              Platinum Hizmetler
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
  title: 'Lounge | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Budapeşte Liszt Ferenc Havalimanı Platinum Lounge — alkollü/alkolsüz içecekler, internet, iş ortamı, her gün 05:00–20:00.' }],
})

const loungeServices = [
  { title: 'Alkollü & Alkolsüz İçecekler', desc: 'Geniş içecek seçenekleriyle kişiselleştirilmiş ikram.', iconPath: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18' },
  { title: 'Atıştırmalık & Yiyecek', desc: 'Taze ve çeşitli atıştırmalık seçenekleri.', iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { title: 'Ücretsiz Yüksek Hızlı İnternet', desc: 'Yolculuğunuz boyunca kesintisiz Wi-Fi bağlantısı.', iconPath: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
  { title: 'Medya & TV Yayınları', desc: 'Güncel haber kanalları ve eğlence içerikleri.', iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'İş Kutuları & Çalışma Alanları', desc: 'Sessiz çalışma alanları ve iş görüşmeleri için özel bölümler.', iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Faks & Ofis Hizmetleri', desc: 'Faks, baskı ve ofis desteği ihtiyaçlarınız için.', iconPath: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' },
]
</script>
