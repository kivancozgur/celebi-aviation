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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Hizmetler</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Köprü Operasyonu
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Yolcu biniş köprüsü operasyon ve yönetimi alanında Viyana, Budapeşte, İstanbul, Mumbai ve Delhi'de global hizmet.
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

        <!-- Locations -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Operasyon Noktaları</span>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="location in locations"
              :key="location.name"
              class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300"
            >
              <h3 class="text-white font-bold text-xl mb-2">{{ location.name }}</h3>
              <p class="text-brand text-sm font-medium tracking-[1px] uppercase mb-4">{{ location.airport }}</p>
              <ul class="flex flex-col gap-2">
                <li v-for="detail in location.details" :key="detail" class="flex items-start gap-2.5 text-white/50 text-sm">
                  <span class="mt-[5px] w-[5px] h-[5px] rounded-full bg-brand flex-none" />
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Ekipman Hizmetleri -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Köprü Ekipman Hizmetleri</span>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="equip in equipment" :key="equip.name" class="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:border-brand/30 transition-all duration-300">
              <span class="text-brand font-bold text-lg block mb-2">{{ equip.name }}</span>
              <span class="text-white/40 text-sm leading-relaxed">{{ equip.desc }}</span>
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
  title: 'Köprü Operasyonu | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Yolcu biniş köprüsü operasyonu — İstanbul (143 köprü), Budapeşte, Viyana, Mumbai ve Delhi\'de hizmet.' }],
})

const stats = [
  { value: '143', label: 'İstanbul Köprü' },
  { value: '220+', label: 'Çalışan' },
  { value: '10 Yıl', label: 'İmtiyaz Süresi' },
]

const locations = [
  {
    name: 'İstanbul',
    airport: 'İstanbul Havalimanı (IST)',
    details: ['143 yolcu biniş köprüsü', '220+ uzman çalışan', '10 yıllık operasyon imtiyazı', 'ACU, GPU ve su hizmetleri dahil'],
  },
  {
    name: 'Budapeşte',
    airport: 'Liszt Ferenc Havalimanı (BUD)',
    details: ['Köprü operasyon ve bakım', 'Ekipman yönetimi', 'Teknik destek hizmetleri'],
  },
  {
    name: 'Viyana',
    airport: 'Viyana Uluslararası Havalimanı (VIE)',
    details: ['Yolcu köprüsü yönetimi', 'Bakım ve onarım hizmetleri', 'Operasyonel destek'],
  },
  {
    name: 'Mumbai',
    airport: 'Chhatrapati Shivaji Maharaj (BOM)',
    details: ['Köprü operasyonu', 'Teknik ekip desteği'],
  },
  {
    name: 'Delhi',
    airport: 'Indira Gandhi Uluslararası (DEL)',
    details: ['Köprü yönetimi ve bakım', 'Operasyonel koordinasyon'],
  },
]

const equipment = [
  { name: 'ACU', desc: 'Klima Ünitesi — Uçak içi kabin iklimi için yer güç desteği.' },
  { name: 'GPU', desc: 'Yer Güç Ünitesi — Uçak elektrik sistemlerine harici güç temini.' },
  { name: 'Su Hizmeti', desc: 'Uçak içme suyu ikmal ve tuvalet su servisi.' },
]
</script>
