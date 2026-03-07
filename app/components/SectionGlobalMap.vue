<template>
  <section ref="sectionRef" class="bg-slate-950 py-24 overflow-hidden">

    <!-- Header -->
    <div class="px-6 md:px-12 lg:px-20 mb-14">
      <div ref="labelRef" class="flex items-center gap-3 mb-5 opacity-0">
        <span ref="lineRef" class="h-px w-0 bg-brand shrink-0" />
        <span class="text-brand text-[11px] tracking-[4px] uppercase font-medium">
          {{ t('globalMap.label') }}
        </span>
      </div>
      <h2
        ref="titleRef"
        class="text-[2.6rem] md:text-[3.5rem] font-bold text-white tracking-[-2px] leading-[1.08] opacity-0"
      >
        {{ t('globalMap.titleLine1') }}<br />
        <span class="text-slate-500">{{ t('globalMap.titleLine2') }}</span>
      </h2>
    </div>

    <!-- Country Tabs -->
    <div class="px-6 md:px-12 lg:px-20 mb-10">
      <div class="flex overflow-x-auto no-scrollbar border-b border-slate-800">
        <button
          v-for="country in countries"
          :key="country.id"
          class="flex items-center gap-2 px-5 py-3.5 text-[11px] font-bold tracking-[2px] uppercase whitespace-nowrap transition-all duration-200 border-b-2 -mb-px shrink-0"
          :class="activeCountry.id === country.id
            ? 'text-white border-red-500'
            : 'text-slate-500 border-transparent hover:text-slate-300'"
          @click="selectCountry(country)"
        >
          <span class="text-sm leading-none">{{ getFlagEmoji(country.code) }}</span>
          {{ country.label[locale as 'tr' | 'en'] }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="px-6 md:px-12 lg:px-20">
      <Transition name="tab" mode="out-in">
        <div
          :key="activeCountry.id"
          class="grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-10 items-start"
        >
          <!-- Map -->
          <div class="rounded-2xl bg-slate-900 overflow-hidden p-4 md:p-6 max-h-[480px] flex items-center">
            <div class="relative w-full" ref="mapWrapper">
              <img
                :src="`/maps/${activeCountry.code}.svg`"
                :alt="activeCountry.label[locale as 'tr' | 'en']"
                class="w-full block select-none"
                draggable="false"
              />

              <!-- Airport Pins -->
              <div
                v-for="airport in activeCountry.airports"
                :key="airport.iata"
                class="absolute z-10 cursor-pointer"
                :style="getPinStyle(airport)"
                @mouseenter="hoveredAirport = airport"
                @mouseleave="hoveredAirport = null"
                @click="hoveredAirport = hoveredAirport?.iata === airport.iata ? null : airport"
              >
                <!-- Ping ring -->
                <span class="absolute inset-0 -m-2 flex items-center justify-center pointer-events-none">
                  <span class="w-5 h-5 rounded-full bg-brand/25 animate-ping" />
                </span>
                <!-- Dot -->
                <span class="block w-2.5 h-2.5 rounded-full bg-brand border-[2.5px] border-white shadow-[0_0_8px_rgba(0,61,165,0.7)] relative z-10" />

                <!-- Tooltip (above pin) -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-20">
                  <div
                    class="tooltip-card bg-white rounded-xl px-3 py-2.5 shadow-2xl whitespace-nowrap"
                    :class="hoveredAirport?.iata === airport.iata ? 'tooltip-show' : ''"
                  >
                    <div class="text-[12px] font-bold text-brand leading-none mb-1">{{ airport.iata }}</div>
                    <div class="text-[10px] text-gray-500 max-w-[200px] leading-snug">{{ airport.name }}</div>
                    <div v-if="airport.phone" class="text-[10px] text-gray-400 mt-1 font-medium">{{ airport.phone }}</div>
                  </div>
                  <!-- Arrow -->
                  <div
                    class="tooltip-arrow border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white mx-auto w-0 h-0"
                    :class="hoveredAirport?.iata === airport.iata ? 'tooltip-show' : ''"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Stats & Info Panel -->
          <div class="flex flex-col gap-7">
            <!-- Country header -->
            <div class="pb-6 border-b border-slate-800">
              <div class="text-slate-500 text-[10px] tracking-[3px] uppercase mb-2">
                {{ t('globalMap.operations') }}
              </div>
              <h3 class="text-white text-xl font-bold tracking-tight">
                {{ activeCountry.label[locale as 'tr' | 'en'] }}
              </h3>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-2 gap-x-6 gap-y-7">
              <div
                v-for="(stat, i) in activeCountry.stats[locale as 'tr' | 'en']"
                :key="i"
              >
                <div class="text-[2.1rem] font-bold text-white tracking-tight leading-none mb-1.5">
                  {{ stat.value }}
                </div>
                <div class="text-slate-500 text-[10px] tracking-[2px] uppercase">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Airport IATA tags -->
            <div class="pt-6 border-t border-slate-800">
              <div class="text-slate-500 text-[10px] tracking-[3px] uppercase mb-3">
                {{ t('globalMap.airports') }}
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="airport in activeCountry.airports"
                  :key="airport.iata"
                  class="text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all duration-150 cursor-default"
                  :class="hoveredAirport?.iata === airport.iata
                    ? 'bg-brand text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'"
                  @mouseenter="hoveredAirport = airport"
                  @mouseleave="hoveredAirport = null"
                >
                  {{ airport.iata }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import locationsData from '@@/data/locations.json'

interface Airport {
  name: string
  iata: string
  lat: number
  lng: number
  phone?: string
}

interface Country {
  id: string
  code: string
  label: { tr: string; en: string }
  stats: { tr: { value: string; label: string }[]; en: { value: string; label: string }[] }
  airports: Airport[]
  bbox: { minLng: number; maxLng: number; minLat: number; maxLat: number }
}

const { t, locale } = useI18n()
const countries = locationsData.countries as Country[]
const activeCountry = ref<Country>(countries[0])
const hoveredAirport = ref<Airport | null>(null)

const sectionRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()

function getFlagEmoji(code: string): string {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('')
}

function selectCountry(country: Country) {
  hoveredAirport.value = null
  activeCountry.value = country
}

function getPinStyle(airport: Airport) {
  const { minLng, maxLng, minLat, maxLat } = activeCountry.value.bbox
  const x = ((airport.lng - minLng) / (maxLng - minLng)) * 100
  const y = ((maxLat - airport.lat) / (maxLat - minLat)) * 100
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set(titleRef.value!, { y: 28 })

  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 78%',
    once: true,
    onEnter: () => {
      gsap.to(lineRef.value!, { width: 40, duration: 0.8, ease: 'power3.out' })
      gsap.to(labelRef.value!, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      gsap.to(titleRef.value!, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 })
    },
  })
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Tab switch */
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.tab-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.tab-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Tooltip */
.tooltip-card {
  opacity: 0;
  transform: translateY(5px) scale(0.95);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tooltip-card.tooltip-show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.tooltip-arrow {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.tooltip-arrow.tooltip-show {
  opacity: 1;
}
</style>
