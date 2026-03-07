<template>
  <section id="istatistikler" class="stats-section">
    <div class="container">
      <!-- Section Label & Title -->
      <div class="section-header">
        <span class="section-label">{{ t('statsSection.label') }}</span>
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
          {{ country.country }}
        </button>
      </div>

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div
          v-for="(stat, index) in currentStats"
          :key="index"
          class="stat-card"
        >
          <span
            class="stat-value"
            :ref="(el) => { if (el) statEls[index] = el as HTMLElement }"
          >0</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import statsData from '@@/data/stats.json'

const { t, locale } = useI18n()

gsap.registerPlugin(ScrollTrigger)

const activeCountry = ref(0)
const statEls = ref<HTMLElement[]>([])
const hasAnimated = ref(false)

const currentStats = computed(() => statsData[activeCountry.value].stats)

function animateCounters() {
  nextTick(() => {
    currentStats.value.forEach((stat, index) => {
      const el = statEls.value[index]
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString(locale.value === 'en' ? 'en-US' : 'tr-TR')
        },
      })
    })
  })
}

function selectCountry(index: number) {
  if (activeCountry.value === index) return
  activeCountry.value = index
}

watch(activeCountry, () => {
  animateCounters()
})

onMounted(() => {
  ScrollTrigger.create({
    trigger: '#istatistikler',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      hasAnimated.value = true
      animateCounters()
    },
  })
})
</script>

<style scoped>
.stats-section {
  padding: 6rem 1.5rem;
  background-color: #0a0a0a;
  color: #f0f0f0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #003DA5;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.15;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-btn {
  position: relative;
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  transition: color 0.2s ease;
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
  background-color: #003DA5;
  transition: width 0.25s ease;
}

.tab-btn:hover {
  color: #e5e7eb;
}

.tab-btn.active {
  color: #ffffff;
}

.tab-btn.active::after {
  width: 100%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  background: #141414;
  border: 1px solid #1f1f1f;
  border-radius: 0.75rem;
  text-align: center;
  transition: border-color 0.2s ease;
}

.stat-card:hover {
  border-color: #003DA5;
}

.stat-value {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #003DA5;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  min-height: 1em;
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
}
</style>
