<template>
  <section id="istatistikler" ref="sectionRef" class="stats-section">
    <div class="container">

      <!-- Header -->
      <div class="section-header">
        <div class="label-row">
          <span class="h-line" />
          <span class="section-label">{{ t('statsSection.label') }}</span>
          <span class="h-line" />
        </div>
        <h2 class="section-title">{{ t('statsSection.title') }}</h2>
      </div>

      <!-- Country Tabs -->
      <div class="tabs" role="tablist">
        <button
          v-for="(country, index) in statsData"
          :key="country.code"
          class="tab-btn"
          :class="{ active: activeCountry === index }"
          role="tab"
          :aria-selected="activeCountry === index"
          @click="selectCountry(index)"
        >
          <span class="tab-flag">{{ country.flag }}</span>
          <span class="tab-name">{{ locale === 'en' ? country.countryEn : country.country }}</span>
        </button>
      </div>

      <!-- Content Grid -->
      <Transition name="cross-fade" mode="out-in" @after-enter="animateCounters">
        <div :key="activeCountry" class="content-grid">

          <!-- Left: Stat Cards + Airports -->
          <div class="left-col">
            <div class="stats-grid">
              <div
                v-for="(stat, i) in currentStats"
                :key="i"
                class="stat-card"
              >
                <div class="stat-value-row">
                  <span
                    class="stat-value"
                    :ref="(el) => setStatEl(el as HTMLElement, i)"
                  >0</span>
                  <span v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</span>
                </div>
                <span class="stat-label">{{ locale === 'en' ? stat.labelEn : stat.label }}</span>
              </div>
            </div>

            <!-- Airport List -->
            <div class="airports-panel">
              <div class="airports-panel-title">{{ t('statsSection.airports') }}</div>
              <ul class="airports-list">
                <li v-for="ap in currentCountry.airports" :key="ap" class="airport-row">
                  <span class="apt-dot" />
                  <span>{{ ap }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right: Territory Map -->
          <div class="right-col">
            <div class="map-card" @mouseleave="onMapLeave" @mousemove="onMapMouseMove">
              <!-- Watermark -->
              <div class="map-watermark" aria-hidden="true">
                {{ locale === 'en' ? currentCountry.countryEn : currentCountry.country }}
              </div>

              <!-- Real SVG Territory -->
              <svg
                :viewBox="activeMapData.viewBox"
                preserveAspectRatio="xMidYMid meet"
                class="territory-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="territory-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" :stdDeviation="activeMapData.glowBlur" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="territory-gradient" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.65" />
                  </radialGradient>
                </defs>

                <!-- Shadow/glow layer -->
                <path
                  v-for="(d, pi) in activeMapData.paths"
                  :key="`glow-${pi}`"
                  :d="d"
                  fill="rgba(59,130,246,0.12)"
                  stroke="none"
                  filter="url(#territory-glow)"
                />
                <!-- Fill layer -->
                <path
                  v-for="(d, pi) in activeMapData.paths"
                  :key="`fill-${pi}`"
                  :d="d"
                  fill="url(#territory-gradient)"
                  stroke="#2563eb"
                  :stroke-width="activeMapData.strokeW"
                  stroke-linejoin="round"
                />

                <!-- City pins -->
                <g
                  v-for="city in activeMapData.cities"
                  :key="city.name"
                  class="city-group"
                  :class="{ 'city-hovered': hoveredCity?.name === city.name }"
                  @mouseenter="hoveredCity = city"
                  style="cursor: pointer"
                >
                  <!-- Outer pulse -->
                  <circle
                    :cx="city.x" :cy="city.y"
                    :r="activeMapData.outerR"
                    class="city-pulse-outer"
                  />
                  <!-- Inner pulse -->
                  <circle
                    :cx="city.x" :cy="city.y"
                    :r="activeMapData.innerR"
                    class="city-pulse-inner"
                  />
                  <!-- Core dot -->
                  <circle
                    :cx="city.x" :cy="city.y"
                    :r="activeMapData.dotR"
                    class="city-core"
                  />
                  <!-- Label -->
                  <text
                    :x="city.x"
                    :y="city.y - activeMapData.labelOffset"
                    class="city-label-text"
                    :font-size="activeMapData.fontSize"
                    text-anchor="middle"
                  >{{ city.name }}</text>
                </g>
              </svg>

              <!-- Hover tooltip — follows cursor -->
              <Transition name="tip-fade">
                <div
                  v-if="hoveredCity"
                  class="city-tooltip"
                  :style="tooltipStyle"
                >
                  <div class="tooltip-city-name">
                    <span class="tooltip-pin" />
                    {{ hoveredCity.name }}
                  </div>
                  <div v-for="ap in hoveredCity.airports" :key="ap" class="tooltip-airport">
                    {{ ap }}
                  </div>
                </div>
              </Transition>
            </div>
          </div>

        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import statsData from '@@/data/stats.json'

const { t, locale } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
const activeCountry = ref(0)
const statEls: HTMLElement[] = []

interface CityPin { name: string; x: number; y: number; airports: string[] }
const hoveredCity = ref<CityPin | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)

const tooltipStyle = computed(() => ({
  left: `${tooltipX.value}px`,
  top: `${tooltipY.value}px`,
}))

function onMapMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const tooltipW = 200
  const tooltipH = 80
  tooltipX.value = Math.min(x + 14, rect.width - tooltipW - 8)
  tooltipY.value = Math.max(y - tooltipH - 14, 8)
}

function onMapLeave() {
  hoveredCity.value = null
}

const currentStats = computed(() => statsData[activeCountry.value].stats)
const currentCountry = computed(() => statsData[activeCountry.value])

// ── Coordinate helpers ─────────────────────────────────────────────────────────
// Equirectangular projection constants calibrated from Turkey's known SVG coords:
// x = 966.3 + lon * 5.526   (0° at x≈966.3)
// y = 564.1 - lat * 6.17    (Equator at y≈564.1, north=up)
const lonToX = (lon: number) => 966.3 + lon * 5.526
const latToY = (lat: number) => 564.1 - lat * 6.17

// ── Real SVG paths from world-map-country-shapes (ISO codes)  ─────────────────
// Paths obtained from https://github.com/sirLisko/world-map-country-shapes
// Same world coordinate space used for all countries — viewBox zooms per country.

const countryMapData: Record<string, {
  viewBox: string
  paths: string[]
  cities: CityPin[]
  dotR: number
  innerR: number
  outerR: number
  labelOffset: number
  fontSize: number
  strokeW: number
  glowBlur: number
}> = {
  TR: {
    // Turkey: 26°–45°E, 35.7°–42.1°N
    viewBox: `${lonToX(25.5).toFixed(1)} ${latToY(42.5).toFixed(1)} ${((45.5 - 25.5) * 5.526 + 4).toFixed(1)} ${((42.5 - 35.3) * 6.17 + 4).toFixed(1)}`,
    paths: [
      // Main Anatolia
      'M1166.6 308.9l-9.7-4.4-8.5.2-5.7 1.7-5.6 4-9.9-.8-1.6 4.8-7.9.2-5.1 6.1 3.6 3-2 5 4.2 3.6 3.7 6.4 5.8-.1 5.4 3.5 3.6-.8.9-2.7 5.7.2 4.6 3.5 8-.7 3.1-3.7 4.6 1.5 3.2-.6-1.7 2.4 2.3 3 1.2-1.4 1.2-1.5-.1-3.6 1.9 1.3 5.5-1.8 3 1.2h4.3l5.7-2.5 2.8.2 5.9-1.1 2.1-1 6.2.9 2.1 1.6 2.3-1.1-3.7-5.2.7-2-2.9-7.3 3.3-1.8-2.4-1.9-4.2-1.5v-3.1l-1.3-2.2-5.6-3-5.4.3-5.5 3.2-4.5-.6-5.8 1-7.8-2.4z',
      // Thrace (European Turkey)
      'M1117 312.9l2-1.9 6.1-.4.7-1.5-4.7-2-.9-2.4-4.5-.8-5 2 2.7 1.6-1.2 3.9-1.1.7.1 1.3 1.9 2.9 3.9-3.4z',
    ],
    cities: [
      { name: 'İstanbul', x: lonToX(29),   y: latToY(41),   airports: ['İstanbul Havalimanı (IST)', 'Sabiha Gökçen (SAW)'] },
      { name: 'Ankara',   x: lonToX(32.9), y: latToY(39.9), airports: ['Esenboğa (ESB)'] },
      { name: 'İzmir',    x: lonToX(27.1), y: latToY(38.4), airports: ['Adnan Menderes (ADB)'] },
      { name: 'Antalya',  x: lonToX(30.7), y: latToY(36.9), airports: ['Antalya (AYT)'] },
      { name: 'Adana',    x: lonToX(35.3), y: latToY(37.0), airports: ['Adana (ADA)'] },
      { name: 'Trabzon',  x: lonToX(39.7), y: latToY(41.0), airports: ['Trabzon (TZX)'] },
    ],
    dotR: 1.5, innerR: 3, outerR: 5, labelOffset: 4, fontSize: 1.8, strokeW: 0.8, glowBlur: 6,
  },

  IN: {
    // India: 67°–97°E, 7.5°–37.1°N
    viewBox: `${lonToX(66.5).toFixed(1)} ${latToY(37.6).toFixed(1)} ${((97.5 - 66.5) * 5.526 + 4).toFixed(1)} ${((37.6 - 7) * 6.17 + 4).toFixed(1)}`,
    paths: [
      'M1414.1 380.1l-8.5-4.4-6.2-4-3.2-7 4.1.9-.6-3.3-3-3.3-.8-5.2-7.6-7.5-3.7 5.4-5.7 1-8.5-1.6-1.9 2.8 3.2 5.6 2.9 4.3 5 3.1-3.7 3.7 1 4.5-3.9 6.3-2.1 6.5-4.5 6.7-6.4-.5-4.9 6.6 4 2.9 1.3 4.9 3.5 3.2 1.8 5.5h-12l-3.2 4.2 7.1 5.4 1.9 2.5-2.4 2.3 8 7.7 4 .8 7.6-3.8 1.7 5.9.8 7.8 2.5 8.1 3.6 12.3 5.8 8.8 1.3 3.9 2 8 3.4 6.1 2.2 3 2.5 6.4 3.1 8.9 5.5 6 2.2-1.8 1.7-4.4 5-1.8-1.8-2.1 2.2-4.8 2.9-.3-.7-10.8 1.9-6.1-.7-5.3-1.9-8.2 1.2-4.9 2.5-.3 4.8-2.3 2.6-1.6-.3-2.9 5-4.2 3.7-4 5.3-7.5 7.4-4.2 2.4-3.8-.9-4.8 6.6-1.3 3.7.1.5-2.4-1.6-5.2-2.6-4.8.4-3.8-3.7-1.7.8-2.3 3.1-2.4-4.6-3.4 1.2-4.3 4.8 2.7 2.7.4 1.2 4.4 5.4.9 5-.1 3.4 1.1-1.6 5.3-2.4.4-1.1 3.6 3.5 3.3.2-4 1.5-.1 4.5 10.1 2.4-1.5-.9-2.7.9-2.1-.9-6.6 4.6 1.4 1.5-5.2-.3-3.1 2.1-5.4-.9-3.6 6.1-4.4 4.1 1.1-1.3-3.9 1.6-1.2-.9-2.4-6.1-.9 1.2-2.7-3.5-3.9-3.2 2.6-4.9-1.5-5.3 4-3.9 4.8-4.2.8 2.7 2 .4 3.9-4.4.2-4.7-.4-3.2 1-5.5-2.5-.3-1.2-1.5-5.1-3 1.4.1 2.7 1.5 4.1-.1 2.5-4.6.1-6.8-1.5-4.3-.6-3.8-3.2-7.6-.9-7.7-3.5-5.8-3.1-5.7-2.5.9-5.9 2.8-2.9z',
    ],
    cities: [
      { name: 'Delhi',     x: lonToX(77.2), y: latToY(28.6), airports: ['Indira Gandhi (DEL)'] },
      { name: 'Mumbai',    x: lonToX(72.8), y: latToY(18.9), airports: ['Chhatrapati Shivaji (BOM)'] },
      { name: 'Hyderabad', x: lonToX(78.5), y: latToY(17.4), airports: ['Rajiv Gandhi (HYD)'] },
      { name: 'Bangalore', x: lonToX(77.6), y: latToY(12.9), airports: ['Kempegowda (BLR)'] },
    ],
    dotR: 2.5, innerR: 5, outerR: 8, labelOffset: 8, fontSize: 5.5, strokeW: 1, glowBlur: 10,
  },

  DE: {
    // Germany: 6°–15.1°E, 47.2°–55.1°N
    viewBox: `${lonToX(5.5).toFixed(1)} ${latToY(55.6).toFixed(1)} ${((15.6 - 5.5) * 5.526 + 4).toFixed(1)} ${((55.6 - 46.7) * 6.17 + 4).toFixed(1)}`,
    paths: [
      'M1043.6 232.3l-2.4-1.9-5.5-2.4-2.5 1.7-4.7 1.1-.1-2.1-4.9-1.4-.2-2.3-3 .9-3.6-.8.4 3.4 1.2 2.2-3 3-1-1.3-3.9.3-.9 1.3 1 2-1 5.6-1.1 2.3h-2.9l1.1 6.4-.4 4.2 1 1.4-.2 2.7 2.4 1.6 7.1 1.2-2.3 4.2-.5 4.5h4.2l1-1.4 5.4 1.9 1.5-.3 2.6 1.7.6-1.6 4.4.3 3.4-1.2 2.4.2 1.7 1.3.4-1.1-1-4 1.7-.8 1.5-2.9-2.9-2.6-2.6-1.5-.7-2.6-1-1.9 3.4-1.3 1.7-1.5 3.4-1.2 1.1-1.2 1.4.7 2.1-.6-2.3-3.9.1-2.1-1.4-3.3-2-2.2 1.2-1.6-1.4-3.1z',
    ],
    cities: [
      { name: 'Hamburg',   x: lonToX(10.0),  y: latToY(53.6), airports: ['Hamburg (HAM)'] },
      { name: 'Berlin',    x: lonToX(13.4),  y: latToY(52.5), airports: ['Berlin Brandenburg (BER)'] },
      { name: 'Frankfurt', x: lonToX(8.7),   y: latToY(50.1), airports: ['Frankfurt (FRA)'] },
      { name: 'Münih',     x: lonToX(11.6),  y: latToY(48.1), airports: ['Münih Franz Josef Strauss (MUC)'] },
    ],
    dotR: 1.0, innerR: 2, outerR: 3.5, labelOffset: 4, fontSize: 1.8, strokeW: 0.6, glowBlur: 5,
  },

  HU: {
    // Hungary: 16°–22.9°E, 45.7°–48.6°N
    viewBox: `${lonToX(15.5).toFixed(1)} ${latToY(49.1).toFixed(1)} ${((23.4 - 15.5) * 5.526 + 3).toFixed(1)} ${((49.1 - 45.2) * 6.17 + 3).toFixed(1)}`,
    paths: [
      'M1079.1 263.8l-1.6.4-1 1.5-2.2.7-.6-.4-2.3 1-1.9.2-.3 1.2-4.1.8-1.9-.7-2.6-1.6-.2 2.6h-2.8l1.1 1.3-1.3 4 .8.1 1.2 2.1 1.6.8 4 2.6 4.2 1.2 1.8-.9 3.7-1.6 3.2.2 3.8-1.1 2.6-4.3 1.9-4.2 2.9-1.3-.6-1.6-2.9-1.7-1 .6-5.5-1.9z',
    ],
    cities: [
      { name: 'Budapeşte', x: lonToX(19.0), y: latToY(47.5), airports: ['Budapeşte Ferenc Liszt (BUD)'] },
    ],
    dotR: 0.8, innerR: 1.8, outerR: 3, labelOffset: 3, fontSize: 1.3, strokeW: 0.5, glowBlur: 4,
  },

  TZ: {
    // Tanzania: 29°–41°E, 1°N–11.7°S
    viewBox: `${lonToX(28.5).toFixed(1)} ${latToY(1.5).toFixed(1)} ${((41.5 - 28.5) * 5.526 + 4).toFixed(1)} ${((1.5 - (-12.2)) * 6.17 + 4).toFixed(1)}`,
    paths: [
      'M1149.6 578.6l-2 .8 2.3 3.6-.4 3.7-1.6.8.3 2.5 1.2 1.5v2l-1.4 1.4-2.2 3.3-2.1 2.3-.6.1-.3 2.7 1.1.9-.2 2.7 1 2.6-1.3 2.4 4.5 4.3.3 3.9 2.7 6.5.3.2 2.2 1.1 3.5 1.1 3.2 1.9 5.4 1.2 1.1 1.7.4-1.2 2.8 3.4.3 6.7 1.8 2.4v.1l2.1-.3 6.7 1.8 1.4-.8 3.9-.1 2.1-1.9 3.3.1 6.2-2.5 4.6-3.7-2-1.4-2.2-6.3-1.8-3.9.4-3.1-.3-1.9 1.7-3.9-.2-1.6-3.5-2.3-.3-3.6 2.8-7.9-8-6.3-.4-3.7-20.2-13-2.8 2.8-1.9 2.9 2.2 2.2-3.2 1.6-.7-.8-3.2.4-2.5 1.4-1.6-2.4 1.1-4.5.2-3.8-6.2-.1z',
    ],
    cities: [
      { name: 'Dar es Salaam', x: lonToX(39.3), y: latToY(-6.8), airports: ['Julius Nyerere Uluslararası (DAR)'] },
    ],
    dotR: 1.8, innerR: 3.5, outerR: 6, labelOffset: 6, fontSize: 3.0, strokeW: 0.9, glowBlur: 7,
  },

  ID: {
    // Indonesia: 95°–141°E, 6°N–10.5°S
    viewBox: `${lonToX(94.5).toFixed(1)} ${latToY(7.0).toFixed(1)} ${((141.5 - 94.5) * 5.526 + 6).toFixed(1)} ${((7.0 - (-11.0)) * 6.17 + 6).toFixed(1)}`,
    paths: [
      // All Indonesian island groups from world-map-country-shapes
      'M1651.9 637.3l.5-1.7-1.8-1.9-2.8-2-5.3 1.3 7 4.4 2.4-.1zm20.9-.6l4-4.8.1-1.9-.5-1.3-5.7 2.6-2.8 3.9-.7 2.1.6.8 5-1.4zm-35.6-13l-1.6 2.2-3.1.1-2.2 3.6 3 .1 3.9-.9 6.6-1.2-1.2-2.8-3.5.6-1.9-1.7zm28.1 0l-5.2 2.3-3.8.5-3.4-1.9-4.5 1.3-.2 2.3 7.4.8 8.6-1.8 1.1-3.5zm-79.5-8.4l-.7-2.3-2.3-.5-4.4-2.4-6.8-.4-4.1 6.1 5.1.4.8 2.8 10 2.6 2.4-.8 4.1.6 6.3 2.4 5.2 1.2 5.8.5 5.1-.2 5.9 2.5 6.6-2.4-6.6-3.8-8.3-1.1-1.8-4.1-10.3-3.1-1.3 2.6-10.7-.6zm146.6-3.6l.2-3-1.2-1.9-1.3 2.2-1.2 2.2.3 4.8 3.2-4.3zm-41-17.5l-1.4-2.1-5.7.3 1 2.7 3.9 1.2 2.2-2.1zm18.1-2.4l-6.1-1.8-6.9.3-1.5 3.5 3.9.2 3.2-.4 4.6.5 4.7 2.6-1.9-4.9zm21-12.3l-.8-2.4-9-2.6-2.9 2.1-7.6 1.5 2.3 3.2 5 1.2 2.1 3.7 8.3.1.4 1.6-4-.1-6.2 2.3 4.2 3.1-.1 2.8 1.2 2.3 2.1-.5 1.8-3.1 8.2 5.9 4.6.5 10.6 5.4 2.3 5.3 1 6.9-3.7 1.8-2.8 5.2 7.1-.2 1.6-1.8 5.5 1.3 4.6 5.2 1.5-20.8 1-20.7-6-1.2-4.1-2.3-4.7-2.2h-5l-6.6 3.8-4.9 6.8-5.7-3.8-1.3-10.3zm-50-16.4l-1-1.4-5.5 4.6-6.5.3-7.1-.9-4.4-1.9-4.7 4.8-1.2 2.6-2.9 9.6-.9 5-2.4 4.2 1.6 4.3 2.3.1.6 6.1-1.9 5.9 2.3 1.9 3.6-1 .3-9.1-.2-7.4 3.8-1.9-.7 6.2 3.9 3.7-.8 2.5 1.3 1.7 5.6-2.4-3 5.2 2.1 2.2 3.1-1.9.3-4.1-4.7-7.4 1.1-2.2-5.1-8.1 5-2.5 2.6-3.7 2.4.9.5-2.9-10.5 2.1-3.1 2.9-5-5.6.9-4.8 4.9-1 9.3-.3 5.4 1.3 4.3-1.3 4.4-6.3zm19.4 1.9l-.6-2.6-3.3-.6-.5-3.5-1.8 2.3-1 5.1 1.7 8.2 2.2 4 1.6-.8-2.3-3.3.9-3.9 2.9.6.2-5.5zm-60.9-4.5l.9-2.9-4.3-6 3-5.8-5-1h-6.4l-1.7 7.2-2 2.2-2.7 8.9-4.5 1.3-5.4-1.8-2.7.6-3.2 3.2-3.6-.4-3.6 1.2-3.9-3.5-1-4.3-3.3 4.2-.6 5.9.8 5.6 2.6 5.4 2.8 1.8.7 8.5 4.6.8 3.6-.4 2 3.1 6.7-2.3 2.8 2 4 .4 2 3.9 6.5-2.9.8 2.3 2.5-9.7.3-6.4 5.5-4.3-.2-5.8 1.8-4.3 6.7-.8-6.5-5.9zm-68.7 48.9l.7-9.8 1.7-8-2.6-4-4.1-.5-1.9-3.6-.9-4.4-2-.2-3.2-2.2 2.3-5.2-4.3-2.9-3.3-5.3-4.8-4.4-5.7-.1-5.5-6.8-3.2-2.7-4.5-4.3-5.2-6.2-8.8-1.2-3.6-.3.6 3.2 6.1 7 4.4 3.6 3.1 5.5 5.1 4 2.2 4.9 1.7 5.5 4.9 5.3 4.1 8.9 2.7 4.8 4.1 5.2 2.2 3.8 7 5.2 4.5 5.3 6.2-.1z',
    ],
    cities: [
      { name: 'Medan',    x: lonToX(98.7),  y: latToY(3.6),  airports: ['Kualanamu (KNO)'] },
      { name: 'Jakarta',  x: lonToX(106.8), y: latToY(-6.2), airports: ['Soekarno-Hatta (CGK)'] },
      { name: 'Surabaya', x: lonToX(112.7), y: latToY(-7.2), airports: ['Juanda (SUB)'] },
      { name: 'Bali',     x: lonToX(115.2), y: latToY(-8.7), airports: ['Ngurah Rai (DPS)'] },
    ],
    dotR: 2.5, innerR: 5, outerR: 8, labelOffset: 9, fontSize: 5.5, strokeW: 0.8, glowBlur: 8,
  },
}

const activeMapData = computed(() => countryMapData[currentCountry.value.code] ?? countryMapData['TR'])

// ── Counter animation ──────────────────────────────────────────────────────────
function setStatEl(el: HTMLElement | null, i: number) {
  if (el) statEls[i] = el
}

function animateCounters() {
  currentStats.value.forEach((stat, i) => {
    const el = statEls[i]
    if (!el) return
    gsap.killTweensOf(el)
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.value,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString(locale.value === 'en' ? 'en-US' : 'tr-TR')
      },
    })
  })
}

function selectCountry(index: number) {
  if (activeCountry.value === index) return
  hoveredCity.value = null
  activeCountry.value = index
}

onMounted(() => {
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 75%',
    once: true,
    onEnter: () => animateCounters(),
  })
})
</script>

<style scoped>
/* ─── Section ────────────────────────────────────────────────── */
.stats-section {
  padding: 6rem 1.5rem;
  background: #ffffff;
  color: #111827;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ─── Header ─────────────────────────────────────────────────── */
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.h-line {
  display: block;
  width: 40px;
  height: 1px;
  background: #003DA5;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #003DA5;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* ─── Tabs ───────────────────────────────────────────────────── */
.tabs {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  outline: none;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #003DA5;
  transition: width 0.25s ease;
  border-radius: 1px;
}

.tab-btn:hover { color: #374151; }
.tab-btn.active { color: #111827; font-weight: 600; }
.tab-btn.active::after { width: calc(100% - 1.5rem); }
.tab-flag { font-size: 1.1rem; line-height: 1; }

/* ─── Transition ─────────────────────────────────────────────── */
.cross-fade-enter-active,
.cross-fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.cross-fade-enter-from { opacity: 0; transform: translateY(8px); }
.cross-fade-leave-to  { opacity: 0; transform: translateY(-6px); }

/* ─── Content Grid ───────────────────────────────────────────── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.75rem;
  align-items: start;
}

@media (max-width: 860px) {
  .content-grid { grid-template-columns: 1fr; }
}

/* ─── Left Column ────────────────────────────────────────────── */
.left-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 1.75rem 1rem;
  background: #f8faff;
  border: 1px solid #e0e9ff;
  border-radius: 1rem;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 16px rgba(0, 61, 165, 0.08);
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  line-height: 1;
}

.stat-value {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #003DA5;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
}

.stat-suffix {
  font-size: 1.2rem;
  font-weight: 700;
  color: #003DA5;
}

.stat-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
}

/* ─── Airports Panel ─────────────────────────────────────────── */
.airports-panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem 1.4rem;
}

.airports-panel-title {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.85rem;
}

.airports-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.airport-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.82rem;
  color: #4b5563;
}

.apt-dot {
  width: 6px;
  height: 6px;
  min-width: 6px;
  border-radius: 50%;
  background: #003DA5;
  opacity: 0.5;
}

/* ─── Right Column: Map ──────────────────────────────────────── */
.map-card {
  position: relative;
  background: #f0f4ff;
  border: 1px solid #dbeafe;
  border-radius: 1.25rem;
  overflow: hidden;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-image:
    linear-gradient(rgba(0,61,165,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,61,165,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}

.map-watermark {
  position: absolute;
  bottom: 1rem;
  right: 1.25rem;
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: rgba(0, 61, 165, 0.06);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.territory-svg {
  width: 100%;
  height: auto;
  max-height: 320px;
  display: block;
}

/* ─── City Pins ──────────────────────────────────────────────── */
.city-group { transition: opacity 0.2s; }

.city-pulse-outer {
  fill: none;
  stroke: rgba(37, 99, 235, 0.18);
  stroke-width: 0.8;
  animation: pulse-outer 2.6s ease-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.city-pulse-inner {
  fill: none;
  stroke: rgba(37, 99, 235, 0.28);
  stroke-width: 1;
  animation: pulse-inner 2.6s ease-out infinite 0.35s;
  transform-box: fill-box;
  transform-origin: center;
}

.city-core {
  fill: #003DA5;
  stroke: #ffffff;
  stroke-width: 1.2;
  transition: fill 0.2s, stroke 0.2s;
}

.city-group.city-hovered .city-core {
  fill: #ea580c;
  stroke: #ffffff;
}

.city-group.city-hovered .city-pulse-outer {
  stroke: rgba(234, 88, 12, 0.25);
}

.city-group.city-hovered .city-pulse-inner {
  stroke: rgba(234, 88, 12, 0.4);
}

.city-label-text {
  font-family: inherit;
  font-weight: 600;
  fill: #1e3a8a;
  pointer-events: none;
  transition: fill 0.2s;
}

.city-group.city-hovered .city-label-text {
  fill: #ea580c;
}

@keyframes pulse-outer {
  0%   { opacity: 0.6; }
  80%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes pulse-inner {
  0%   { opacity: 0.8; }
  80%  { opacity: 0; }
  100% { opacity: 0; }
}

/* ─── City Tooltip ───────────────────────────────────────────── */
.city-tooltip {
  position: absolute;
  background: #ffffff;
  border: 1px solid #dbeafe;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 6px 24px rgba(0, 61, 165, 0.12), 0 1px 4px rgba(0,0,0,0.06);
  pointer-events: none;
  z-index: 10;
  min-width: 180px;
  max-width: 220px;
}

.tooltip-city-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #003DA5;
  margin-bottom: 0.4rem;
}

.tooltip-pin {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #003DA5;
  border: 2px solid #93c5fd;
  flex-shrink: 0;
}

.tooltip-airport {
  font-size: 0.75rem;
  color: #6b7280;
  padding-left: 1.1rem;
  line-height: 1.5;
}

.tip-fade-enter-active,
.tip-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tip-fade-enter-from,
.tip-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
