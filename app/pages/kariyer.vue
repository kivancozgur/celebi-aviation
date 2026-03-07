<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />

    <!-- Page Header -->
    <header class="pt-36 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/5">
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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kariyer</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight">
          Kariyer Fırsatları
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-4 max-w-xl">
          Çelebi Havacılık bünyesinde açık pozisyonları inceleyin ve ekibimizin bir parçası olun.
        </p>
      </div>
    </header>

    <!-- Positions List -->
    <main class="py-16 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <p class="text-white/30 text-sm tracking-[1px] uppercase mb-8">
          {{ positions.length }} açık pozisyon
        </p>

        <ul class="flex flex-col gap-4" role="list">
          <li
            v-for="position in positions"
            :key="position.title"
            class="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.03] border border-white/8 rounded-2xl px-7 py-6 hover:border-brand/30 hover:bg-white/[0.05] transition-all duration-300"
          >
            <!-- Position info -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-3 flex-wrap">
                <h2 class="text-white font-semibold text-lg">{{ position.title }}</h2>
                <span class="text-brand text-[10px] font-medium tracking-[2px] uppercase bg-brand/10 border border-brand/20 rounded-full px-3 py-1">
                  {{ position.department }}
                </span>
              </div>
              <div class="flex items-center gap-5 flex-wrap">
                <!-- Location -->
                <span class="flex items-center gap-1.5 text-white/40 text-sm">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
                  </svg>
                  {{ position.location }}
                </span>
                <!-- Type -->
                <span class="flex items-center gap-1.5 text-white/40 text-sm">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2" />
                    <path d="M7 4v3l2 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                  </svg>
                  {{ position.type }}
                </span>
              </div>
            </div>

            <!-- CTA -->
            <a
              href="#"
              class="flex-none inline-flex items-center gap-2 border border-white/15 hover:border-brand hover:text-brand text-white/70 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
              :aria-label="`${position.title} pozisyonuna başvur`"
            >
              Başvur
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Kariyer | Çelebi Havacılık',
  meta: [
    {
      name: 'description',
      content: 'Çelebi Havacılık açık pozisyonları — yer hizmetlerinden kargo, VIP lounge ve teknolojiye geniş kariyer fırsatları.',
    },
  ],
})

const positions = [
  { title: 'Yer Hizmetleri Uzmanı', department: 'Operasyon', location: 'İstanbul', type: 'Tam Zamanlı' },
  { title: 'Kargo Koordinatörü', department: 'Kargo', location: 'Ankara', type: 'Tam Zamanlı' },
  { title: 'VIP Lounge Görevlisi', department: 'Lounge', location: 'İstanbul', type: 'Tam Zamanlı' },
  { title: 'IT Sistem Uzmanı', department: 'Teknoloji', location: 'İstanbul', type: 'Tam Zamanlı' },
  { title: 'İnsan Kaynakları Uzmanı', department: 'İK', location: 'İstanbul', type: 'Tam Zamanlı' },
]
</script>
