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
          <div class="rounded-2xl bg-slate-900 overflow-hidden p-4 md:p-6">
            <div class="relative" ref="mapContainer">
              <!-- Loading skeleton -->
              <div v-if="!svgContent" class="w-full aspect-[16/9] bg-slate-800 rounded-xl animate-pulse" />

              <!-- Inline SVG Map -->
              <svg
                v-else
                :viewBox="svgViewBox"
                class="w-full h-auto block select-none map-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Map paths injected from SVG file -->
                <g v-html="svgContent" />

                <!-- Airport Pins -->
                <g
                  v-for="airport in activeCountry.airports"
                  :key="airport.iata"
                  class="airport-pin"
                  style="cursor: pointer"
                  @mouseenter="hoveredAirport = airport"
                  @mouseleave="hoveredAirport = null"
                  @click="hoveredAirport = hoveredAirport?.iata === airport.iata ? null : airport"
                >
                  <!-- Pulse ring -->
                  <circle
                    :cx="getSvgX(airport)"
                    :cy="getSvgY(airport)"
                    :r="pinRadius"
                    fill="#003DA5"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      :values="`${pinRadius};${pinRadius * 2.8};${pinRadius}`"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0;0.4"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Pin dot -->
                  <circle
                    :cx="getSvgX(airport)"
                    :cy="getSvgY(airport)"
                    :r="pinRadius * 0.55"
                    fill="#003DA5"
                    stroke="white"
                    :stroke-width="pinRadius * 0.22"
                    :class="hoveredAirport?.iata === airport.iata ? 'pin-active' : ''"
                  />
                </g>
              </svg>

              <!-- Tooltip (HTML overlay, positioned by percentage) -->
              <Transition name="tooltip">
                <div
                  v-if="hoveredAirport && svgContent"
                  class="absolute pointer-events-none z-20"
                  :style="getTooltipStyle(hoveredAirport)"
                >
                  <div class="bg-white rounded-xl px-3 py-2.5 shadow-2xl whitespace-nowrap -translate-x-1/2 -translate-y-full -mt-2">
                    <div class="text-[12px] font-bold text-brand leading-none mb-1">{{ hoveredAirport.iata }}</div>
                    <div class="text-[10px] text-gray-500 max-w-[200px] leading-snug">{{ hoveredAirport.name }}</div>
                    <div v-if="hoveredAirport.phone" class="text-[10px] text-gray-400 mt-1 font-medium">{{ hoveredAirport.phone }}</div>
                  </div>
                  <div class="border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white -translate-x-1/2 w-0 h-0 relative left-1/2" />
                </div>
              </Transition>
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
const mapContainer = ref<HTMLElement>()

const svgContent = ref('')
const svgViewBox = ref('0 0 1000 600')

const svgDims = computed(() => {
  const parts = svgViewBox.value.split(' ')
  return { w: parseFloat(parts[2]), h: parseFloat(parts[3]) }
})

// Pin radius scales with the shorter SVG dimension
const pinRadius = computed(() => {
  const { w, h } = svgDims.value
  return Math.min(w, h) * 0.022
})

function getFlagEmoji(code: string): string {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('')
}

function selectCountry(country: Country) {
  hoveredAirport.value = null
  activeCountry.value = country
}

function getSvgX(airport: Airport): number {
  const { minLng, maxLng } = activeCountry.value.bbox
  const { w } = svgDims.value
  return ((airport.lng - minLng) / (maxLng - minLng)) * w
}

function getSvgY(airport: Airport): number {
  const { minLat, maxLat } = activeCountry.value.bbox
  const { h } = svgDims.value
  return ((maxLat - airport.lat) / (maxLat - minLat)) * h
}

function getTooltipStyle(airport: Airport) {
  const { w, h } = svgDims.value
  return {
    left: `${(getSvgX(airport) / w) * 100}%`,
    top: `${(getSvgY(airport) / h) * 100}%`,
  }
}

async function loadSvg(code: string) {
  svgContent.value = ''
  try {
    const res = await fetch(`/maps/${code}.svg`)
    const text = await res.text()
    const vbMatch = text.match(/viewBox="([^"]+)"/)
    if (vbMatch) svgViewBox.value = vbMatch[1]
    // Extract inner SVG content, strip embedded style/script tags
    const bodyMatch = text.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
    if (bodyMatch) {
      svgContent.value = bodyMatch[1]
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    }
  } catch (e) {
    console.error('Failed to load SVG map:', code, e)
  }
}

watch(() => activeCountry.value.code, loadSvg)

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

  loadSvg(activeCountry.value.code)
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
.tab-enter-from { opacity: 0; transform: translateY(12px); }
.tab-leave-to   { opacity: 0; transform: translateY(-8px); }

/* Tooltip */
.tooltip-enter-active,
.tooltip-leave-active { transition: opacity 0.12s ease; }
.tooltip-enter-from,
.tooltip-leave-to { opacity: 0; }

/* Map path styling — targets injected SVG paths via :deep */
.map-svg :deep(path) {
  fill: #1e293b;
  stroke: #334155;
  stroke-width: 0.5px;
  pointer-events: none;
}

/* Active pin highlight */
.airport-pin .pin-active {
  fill: #0056e0;
}
</style>
