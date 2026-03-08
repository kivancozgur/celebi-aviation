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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">İletişim</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Bizimle İletişime Geçin
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Genel merkez, departman iletişim bilgileri ve dünya genelindeki istasyonlarımıza ulaşın.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Genel Merkez -->
        <section class="py-20 grid md:grid-cols-2 gap-16">
          <div>
            <div class="flex items-center gap-3 mb-8">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Genel Merkez</span>
            </div>
            <h2 class="text-white font-bold text-2xl mb-6">Çelebi Havacılık A.Ş.</h2>
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-4">
                <svg class="text-brand flex-none mt-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <div class="text-white/40 text-xs tracking-[1px] uppercase mb-1">Adres</div>
                  <div class="text-white text-sm leading-relaxed">Çelebi Plaza, Alemdağ Cad. No:4<br/>Ümraniye, İstanbul 34768, Türkiye</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Departman E-postaları -->
          <div>
            <div class="flex items-center gap-3 mb-8">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Departmanlar</span>
            </div>
            <div class="flex flex-col gap-3">
              <a
                v-for="dept in departments"
                :key="dept.name"
                :href="`mailto:${dept.email}`"
                class="flex items-center justify-between p-4 bg-white/[0.03] border border-white/8 rounded-xl hover:border-brand/30 transition-all duration-300 group"
              >
                <span class="text-white/70 text-sm group-hover:text-white transition-colors duration-300">{{ dept.name }}</span>
                <span class="text-brand text-xs font-medium">{{ dept.email }}</span>
              </a>
            </div>
          </div>
        </section>

        <!-- İstasyonlar -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-4">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">İstasyonlar</span>
          </div>
          <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-4">
            Dünya Genelinde {{ stations.length }}+ İstasyon
          </h2>
          <p class="text-white/40 text-sm mb-10">Ülke veya şehir adına göre filtreleyin.</p>

          <!-- Filter -->
          <div class="flex flex-wrap gap-3 mb-10">
            <button
              v-for="country in countries"
              :key="country"
              @click="selectedCountry = country"
              class="text-xs font-medium tracking-[1px] uppercase px-4 py-2 rounded-full border transition-all duration-300"
              :class="selectedCountry === country
                ? 'bg-brand border-brand text-white'
                : 'bg-white/[0.03] border-white/8 text-white/50 hover:border-brand/30 hover:text-white'"
            >
              {{ country }}
            </button>
          </div>

          <!-- Stations Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="station in filteredStations"
              :key="station.name"
              class="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:border-brand/30 transition-all duration-300"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="text-white font-semibold text-sm">{{ station.name }}</h3>
                  <p class="text-white/35 text-xs mt-0.5">{{ station.country }}</p>
                </div>
                <div class="flex gap-1.5">
                  <span v-if="station.iata" class="text-[10px] font-bold tracking-wider bg-brand/15 border border-brand/20 text-brand px-2 py-0.5 rounded">{{ station.iata }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <a v-if="station.email" :href="`mailto:${station.email}`" class="text-white/40 text-xs hover:text-brand transition-colors duration-200">{{ station.email }}</a>
                <span v-if="station.services" class="text-white/25 text-[11px]">{{ station.services }}</span>
              </div>
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
  title: 'İletişim | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Çelebi Havacılık iletişim bilgileri — genel merkez Ümraniye İstanbul, departman e-postaları ve dünya genelinde 70+ istasyon.' }],
})

const selectedCountry = ref('Tümü')

const departments = [
  { name: 'Kargo & Lojistik', email: 'cargo@celebiaviation.com' },
  { name: 'İthalat', email: 'import@celebiaviation.com' },
  { name: 'Genel Sorular', email: 'info@celebiaviation.com' },
  { name: 'İnsan Kaynakları', email: 'hr@celebiaviation.com' },
  { name: 'Ticari', email: 'commercial@celebiaviation.com' },
  { name: 'Pazarlama & İletişim', email: 'marketing@celebiaviation.com' },
  { name: 'Hindistan Operasyonları', email: 'india@celebiaviation.com' },
]

const stations = [
  { name: 'İstanbul', country: 'Türkiye', iata: 'IST', email: 'ist@celebiaviation.com', services: 'Yer Hizmetleri, Kargo, Köprü' },
  { name: 'Ankara', country: 'Türkiye', iata: 'ESB', email: 'esb@celebiaviation.com', services: 'Yer Hizmetleri, Kargo' },
  { name: 'İzmir', country: 'Türkiye', iata: 'ADB', email: 'adb@celebiaviation.com', services: 'Yer Hizmetleri, Kargo' },
  { name: 'Antalya', country: 'Türkiye', iata: 'AYT', email: 'ayt@celebiaviation.com', services: 'Yer Hizmetleri, Lounge' },
  { name: 'Adana', country: 'Türkiye', iata: 'ADA', email: 'ada@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Trabzon', country: 'Türkiye', iata: 'TZX', email: 'tzx@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Samsun', country: 'Türkiye', iata: 'SZF', email: 'szf@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Kayseri', country: 'Türkiye', iata: 'ASR', email: 'asr@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Gaziantep', country: 'Türkiye', iata: 'GZT', email: 'gzt@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Erzurum', country: 'Türkiye', iata: 'ERZ', email: 'erz@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Budapeşte', country: 'Macaristan', iata: 'BUD', email: 'bud@celebiaviation.com', services: 'Yer Hizmetleri, Lounge, Köprü' },
  { name: 'Frankfurt', country: 'Almanya', iata: 'FRA', email: 'fra@celebiaviation.com', services: 'Kargo' },
  { name: 'Delhi', country: 'Hindistan', iata: 'DEL', email: 'del@celebiaviation.com', services: 'Yer Hizmetleri, Köprü' },
  { name: 'Mumbai', country: 'Hindistan', iata: 'BOM', email: 'bom@celebiaviation.com', services: 'Yer Hizmetleri, Köprü' },
  { name: 'Bengaluru', country: 'Hindistan', iata: 'BLR', email: 'blr@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Cochin', country: 'Hindistan', iata: 'COK', email: 'cok@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Hyderabad', country: 'Hindistan', iata: 'HYD', email: 'hyd@celebiaviation.com', services: 'Yer Hizmetleri' },
  { name: 'Dar Es Salaam', country: 'Tanzanya', iata: 'DAR', email: 'dar@celebiaviation.com', services: 'Kargo' },
]

const countries = computed(() => ['Tümü', ...new Set(stations.map(s => s.country))])

const filteredStations = computed(() =>
  selectedCountry.value === 'Tümü'
    ? stations
    : stations.filter(s => s.country === selectedCountry.value)
)
</script>
