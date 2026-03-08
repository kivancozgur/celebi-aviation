<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />

    <!-- Page Header -->
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group"
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
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Kargo & Antrepo
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          İhracattan aktarmaya, farmasötikten değerli yüklere kadar kapsamlı hava kargo ve antrepo çözümleri.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Stats -->
        <section class="py-20 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden my-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-[#0A0A0A] flex flex-col items-center justify-center py-12 px-6 text-center">
            <div class="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-brand leading-none mb-2">{{ stat.value }}</div>
            <div class="text-white/40 text-sm tracking-[1px] uppercase">{{ stat.label }}</div>
          </div>
        </section>

        <!-- Hizmet Detayları -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Hizmetlerimiz</span>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="service in services"
              :key="service.title"
              class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300"
            >
              <h3 class="text-white font-bold text-lg mb-4">{{ service.title }}</h3>
              <ul class="flex flex-col gap-2.5">
                <li
                  v-for="item in service.items"
                  :key="item"
                  class="flex items-start gap-3 text-white/55 text-sm"
                >
                  <span class="mt-[5px] w-[5px] h-[5px] rounded-full bg-brand flex-none" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Teknoloji & Altyapı -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Teknoloji</span>
          </div>
          <div class="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">
                İleri Teknoloji Altyapısı
              </h2>
              <p class="text-white/50 text-[17px] leading-[1.9]">
                Dijital dönüşüm ve otomasyon yatırımlarıyla kargo operasyonlarını daha hızlı, daha güvenli ve daha izlenebilir hale getiriyoruz.
              </p>
            </div>
            <ul class="flex flex-col gap-4">
              <li
                v-for="tech in technologies"
                :key="tech.name"
                class="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/8 rounded-xl hover:border-brand/30 transition-all duration-300"
              >
                <span class="mt-1 w-6 h-6 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center flex-none">
                  <span class="w-2 h-2 rounded-full bg-brand" />
                </span>
                <div>
                  <div class="text-white font-semibold text-sm mb-1">{{ tech.name }}</div>
                  <div class="text-white/40 text-xs leading-relaxed">{{ tech.desc }}</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- Üyelikler -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-10">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Üyelikler</span>
          </div>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="membership in memberships"
              :key="membership"
              class="bg-white/[0.03] border border-white/8 rounded-xl px-8 py-4 text-white font-semibold text-lg hover:border-brand/30 transition-all duration-300"
            >
              {{ membership }}
            </div>
          </div>
        </section>

        <!-- Kargo Takip CTA -->
        <section class="py-16 border-t border-white/5">
          <div class="bg-white/[0.03] border border-white/8 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 class="text-white font-bold text-3xl md:text-4xl leading-tight mb-3">Kargo Takibi</h2>
              <p class="text-white/45 text-base leading-relaxed max-w-lg">Gönderinizin durumunu anlık olarak takip edin.</p>
            </div>
            <a
              href="#"
              class="flex-none inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              Kargo Takip Et
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </section>

      </div>
    </main>

    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Kargo & Antrepo | Çelebi Havacılık',
  meta: [
    {
      name: 'description',
      content: 'Hava kargo taşımacılığı, antrepo hizmetleri, CEIV Pharma sertifikalı ilaç kargo ve E-freight çözümleri.',
    },
  ],
})

const stats = [
  { value: '1M+', label: 'Ton Yıllık Kapasite' },
  { value: '84', label: 'ETV Kapasitesi' },
  { value: 'CEIV', label: 'Pharma Sertifikalı' },
]

const services = [
  {
    title: 'İhracat Hizmetleri',
    items: [
      'Kargo kabul ve kontrol',
      'Yük hazırlama ve paketleme',
      'Yükleme kontrolü ve gözetim',
      'Miktar ve ağırlık sayım hizmetleri',
      'Müşteri ve acentelere bilgilendirme',
      'Transfer kargo koordinasyonu',
    ],
  },
  {
    title: 'İthalat Hizmetleri',
    items: [
      'Varış kargo teslimi',
      'Gümrük işlemleri koordinasyonu',
      'Soğuk zincir yönetimi',
      'Özel yük elleçleme (canlı hayvan, kıymetli eşya)',
      'Tehlikeli madde yönetimi (IATA DGR)',
      'Depolama ve antrepo hizmetleri',
    ],
  },
]

const technologies = [
  { name: 'E-freight / E-AWB', desc: 'Kağıtsız hava taşımacılığı ve elektronik konşimento sistemi.' },
  { name: 'Barkod Takip Sistemi', desc: 'Yük hareketlerinin anlık barkod tabanlı izlenmesi.' },
  { name: 'ETV Sistemi (84 Kapasiteli)', desc: 'Yüksek kapasiteli otomatik depolama ve taşıma araçları.' },
  { name: 'VNA (Very Narrow Aisle)', desc: 'Maksimum depolama verimliliği için dar koridor raf sistemi.' },
  { name: 'TSM & CEIV Pharma', desc: 'Farmasötik yüklere özel sıcaklık yönetimi ve sertifikalı zincir.' },
]

const memberships = ['TIACA', 'IATA', 'UTİKAD']
</script>
