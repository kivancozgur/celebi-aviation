<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />

    <!-- Page Header -->
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink
          to="/hakkimizda"
          class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">
            Hakkımızda
            <span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          </span>
        </NuxtLink>

        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Veriler & Rakamlar</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight">
          Rakamlarla Çelebi
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Küresel ölçekte sunduğumuz hizmetlerin büyüklüğünü ve kalitesini yansıtan veriler.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Main KPI Grid -->
        <section class="py-20">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="kpi in kpis"
              :key="kpi.label"
              class="bg-white/[0.03] border border-white/8 rounded-2xl p-10 hover:border-brand/30 transition-all duration-300 group"
            >
              <div class="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-tight text-brand leading-none mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                {{ kpi.value }}
              </div>
              <div class="text-white font-semibold text-lg mb-2">{{ kpi.label }}</div>
              <div class="text-white/40 text-sm leading-relaxed">{{ kpi.desc }}</div>
            </div>
          </div>
        </section>

        <!-- Sertifikalar -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Sertifikalar</span>
          </div>
          <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-12">
            Uluslararası Akreditasyonlar
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="cert in certificates"
              :key="cert.name"
              class="bg-white/[0.03] border border-white/8 rounded-xl p-6 flex flex-col gap-2 hover:border-brand/30 transition-all duration-300"
            >
              <span class="text-brand font-bold text-lg">{{ cert.name }}</span>
              <span class="text-white/40 text-xs leading-relaxed">{{ cert.desc }}</span>
            </div>
          </div>
        </section>

        <!-- Sürdürülebilirlik & Sosyal Sorumluluk -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Sürdürülebilirlik</span>
          </div>
          <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-12">
            Yeşil & Kapsayıcı Havacılık
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="item in sustainability"
              :key="item.title"
              class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300"
            >
              <div class="text-brand mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path :d="item.iconPath" />
                </svg>
              </div>
              <h3 class="text-white font-bold text-lg mb-2">{{ item.title }}</h3>
              <p class="text-white/45 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <!-- Müşteriler -->
        <section class="py-16 border-t border-white/5">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="h-px w-10 bg-brand" />
                <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Müşterilerimiz</span>
              </div>
              <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">
                300+ Güvenilen Marka
              </h2>
              <p class="text-white/50 text-[17px] leading-[1.9]">
                Dünyanın önde gelen havayolları, özel jet operatörleri ve havalimanı işletmecileriyle uzun vadeli iş ortaklıkları kuruyoruz. Her müşteriye özel çözümler sunarak karşılıklı büyümeyi destekliyoruz.
              </p>
            </div>
            <div class="text-[clamp(5rem,12vw,9rem)] font-bold text-brand/15 text-right leading-none tracking-tight">
              300+
            </div>
          </div>
        </section>

      </div>
    </main>

    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Rakamlarla Çelebi | Çelebi Havacılık',
  meta: [
    {
      name: 'description',
      content: 'Çelebi Havacılık\'ın küresel operasyon büyüklüğü — 230.000+ uçuş, 1M+ ton kargo, 13.000+ personel, sertifikalar.',
    },
  ],
})

const kpis = [
  { value: '230.000+', label: 'Yıllık Uçuş', desc: 'Her yıl 230.000\'den fazla uçuşa yer hizmetleri desteği sağlıyoruz.' },
  { value: '1M+', label: 'Ton Kargo', desc: 'Yıllık 1 milyon tonun üzerinde kargo elleçleme kapasitesiyle faaliyet gösteriyoruz.' },
  { value: '13.000+', label: 'Personel', desc: '3 kıtada 13.000\'den fazla uzman çalışanımızla 7/24 hizmet veriyoruz.' },
  { value: '70+', label: 'İstasyon', desc: '6 ülkede 70\'ten fazla havalimanı istasyonunda operasyon yürütüyoruz.' },
  { value: '300+', label: 'Müşteri', desc: 'Dünyanın önde gelen havayolları ve operatörleriyle iş ortaklıkları.' },
  { value: '6', label: 'Ülke', desc: 'Türkiye, Macaristan, Almanya, Hindistan ve daha fazlasında küresel varlık.' },
]

const certificates = [
  { name: 'ISAGO', desc: 'IATA Yer Hizmetleri Güvenlik Denetimi' },
  { name: 'AHM 804', desc: 'Havacılık İşleyiş Kılavuzu' },
  { name: 'ISO 9001', desc: 'Kalite Yönetim Sistemi' },
  { name: 'ISO 14001', desc: 'Çevre Yönetim Sistemi' },
  { name: 'OHSAS 18001', desc: 'İş Sağlığı ve Güvenliği' },
  { name: 'PAS 99', desc: 'Entegre Yönetim Sistemi' },
  { name: 'RA3', desc: 'Onaylı Hava Kargo Acente Sertifikası' },
]

const sustainability = [
  {
    title: 'Yeşil Havalimanı',
    desc: 'Çevre dostu operasyonlarla Yeşil Havalimanı tescilini hak eden sürdürülebilir uygulamalar.',
    iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    title: 'Yeşil Kuruluş',
    desc: 'Karbon ayak izini azaltmaya yönelik stratejik çevre programları ve enerji verimliliği girişimleri.',
    iconPath: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
  },
  {
    title: 'Engelsiz Havalimanı',
    desc: 'Engelli yolcular için erişilebilir havalimanı hizmetleri sunma konusunda aktif destekçi.',
    iconPath: 'M16 2a2 2 0 100 4 2 2 0 000-4zM8 8l3 3-3 8h2l2-5 3 3v5h2v-6l-3-3 1-5 2 3h3V9h-4L13 6l-5 2z',
  },
]
</script>
