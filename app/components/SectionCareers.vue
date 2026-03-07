<template>
  <section id="kariyer" ref="sectionRef" class="bg-gray-50 py-[120px] px-6 md:px-12 lg:px-20 border-t border-gray-100">
    <div class="max-w-screen-xl mx-auto">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">

        <!-- Left: Label + Title + Description + CTA -->
        <div ref="leftRef" class="opacity-0 translate-y-10 max-w-xl">
          <div class="flex items-center gap-3 mb-6">
            <span ref="lineRef" class="h-px w-0 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('careers.label') }}</span>
          </div>
          <h2 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
            {{ t('careers.titleLine1') }}<br />
            <span class="text-gray-400">{{ t('careers.titleLine2') }}</span>
          </h2>
          <p class="text-gray-500 text-[17px] leading-[1.8] mb-10">
            {{ t('careers.desc') }}
          </p>
          <NuxtLink
            to="/kariyer"
            class="inline-flex items-center gap-3 bg-brand hover:bg-brand/80 text-white text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-300"
          >
            {{ t('careers.cta') }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Feature boxes -->
        <div ref="rightRef" class="opacity-0 translate-x-8 flex flex-col gap-5 w-full lg:max-w-sm">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="flex items-start gap-5 bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-brand/30 hover:shadow-sm transition-all duration-300"
          >
            <!-- Icon -->
            <div class="flex-none w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <component :is="feature.icon" />
            </div>
            <!-- Text -->
            <div>
              <h3 class="text-gray-900 font-semibold text-base mb-1">{{ feature.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defineComponent, h, computed } from 'vue'

const { t, tm } = useI18n()

// ── Icon components ────────────────────────────────────────────────────────────

const IconIK = defineComponent({
  render: () =>
    h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': 'true' }, [
      h('path', {
        d: 'M10 2a4 4 0 100 8 4 4 0 000-8zM3 17a7 7 0 0114 0',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
})

const IconAkademi = defineComponent({
  render: () =>
    h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': 'true' }, [
      h('path', {
        d: 'M10 2L2 6l8 4 8-4-8-4zM2 10l8 4 8-4M2 14l8 4 8-4',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
})

const IconPozisyon = defineComponent({
  render: () =>
    h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': 'true' }, [
      h('rect', {
        x: 3,
        y: 4,
        width: 14,
        height: 13,
        rx: 2,
        stroke: 'currentColor',
        'stroke-width': '1.5',
      }),
      h('path', {
        d: 'M7 4V3a1 1 0 011-1h4a1 1 0 011 1v1M7 10h6M7 13h4',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
      }),
    ]),
})

// ── Data ──────────────────────────────────────────────────────────────────────

const icons = [IconIK, IconAkademi, IconPozisyon]

const features = computed(() => {
  const items = tm('careers.features') as Array<{ title: string; desc: string }>
  return items.map((item, i) => ({ ...item, icon: icons[i] }))
})

// ── Refs ──────────────────────────────────────────────────────────────────────

const sectionRef = ref<HTMLElement>()
const leftRef = ref<HTMLElement>()
const rightRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()

// ── Animations ────────────────────────────────────────────────────────────────

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(lineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: leftRef.value,
      start: 'top 80%',
    },
  })

  gsap.to(leftRef.value!, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: leftRef.value,
      start: 'top 80%',
    },
  })

  gsap.to(rightRef.value!, {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: rightRef.value,
      start: 'top 80%',
    },
  })
})
</script>
