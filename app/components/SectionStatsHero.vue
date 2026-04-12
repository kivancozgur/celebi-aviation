<template>
  <section id="stats-hero" ref="sectionRef" class="relative min-h-[700px] bg-[#f5f5f5] text-gray-900 overflow-hidden">
    <!-- Video Background -->
    <video
      ref="videoRef"
      class="absolute -top-[20%] left-0 w-full h-[120%] object-cover z-0 bg-[#e8e8e8]"
      autoplay
      muted
      loop
      playsinline
    >
      <source
        src="https://mybycketvercelprojecttest.s3.sa-east-1.amazonaws.com/animation-bg.mp4"
        type="video/mp4"
      />
    </video>

    <!-- Gradient Overlays -->
    <div class="absolute inset-0 pointer-events-none z-[1]">
      <div class="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0.6)] via-transparent to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-bl from-[rgba(255,255,255,0.4)] via-transparent to-transparent" />
    </div>

    <!-- Content -->
    <div class="relative z-[2] min-h-[700px] flex items-end py-[100px]">
      <div class="max-w-[1400px] mx-auto w-full px-6 md:px-[60px] flex flex-col md:flex-row justify-between items-end gap-16">
        <!-- Left: Title + Description + Buttons -->
        <div ref="leftRef" class="max-w-[800px] opacity-0 translate-y-16">
          <h2 class="text-[48px] sm:text-[64px] md:text-[80px] font-light leading-[1.1] mb-8 tracking-[-2px]">
            {{ t('statsHero.titleLine1') }}<br />{{ t('statsHero.titleLine2') }}
          </h2>
          <p class="text-lg leading-relaxed text-gray-500 mb-12 font-normal max-w-xl">
            {{ t('statsHero.desc') }}
          </p>
          <div class="flex gap-5 items-center flex-wrap">
            <a
              href="#contact"
              class="inline-flex items-center gap-2.5 bg-[#0084ff] text-white py-3.5 px-7 rounded-md text-base font-medium hover:bg-[#0066cc] hover:translate-x-0.5 transition-all duration-200"
            >
              {{ t('about.ctaStart') }}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10.833 5L15.833 10l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              class="bg-transparent text-gray-500 py-3.5 px-7 text-base font-medium hover:text-gray-900 transition-colors duration-200"
            >
              {{ t('about.cta') }}
            </a>
          </div>
        </div>

        <!-- Right: Stats -->
        <div ref="statsRef" class="flex gap-12 md:gap-20 items-end flex-shrink-0">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="stat-item text-center opacity-0 translate-y-8"
          >
            <div class="text-[48px] md:text-[64px] font-light leading-none mb-3">
              <span :ref="(el) => setStatRef(el as HTMLElement, stat.label)">{{ stat.display }}</span>
            </div>
            <div class="text-base text-gray-500 font-normal">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement>()
const leftRef = ref<HTMLElement>()
const videoRef = ref<HTMLVideoElement>()
const statsRef = ref<HTMLElement>()

const { t } = useI18n()
const statRefs: Record<string, HTMLElement> = {}

function setStatRef(el: HTMLElement | null, label: string) {
  if (el) statRefs[label] = el
}

const stats = computed(() => [
  { label: t('about.stats.airports'), display: '60+', end: 60, from: 0, suffix: '+' },
  { label: t('about.stats.employees'), display: '10K+', end: 10, from: 0, suffix: 'K+' },
  { label: t('about.stats.countries'), display: '6', end: 6, from: 0, suffix: '' },
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.create({
    trigger: leftRef.value,
    start: 'top 78%',
    onEnter: () => {
      gsap.to(leftRef.value!, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    once: true,
  })

  const statItems = statsRef.value!.querySelectorAll('.stat-item')
  gsap.to(statItems, {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: statsRef.value,
      start: 'top 85%',
    },
  })

  gsap.to(videoRef.value!, {
    y: '15%',
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  stats.value.forEach((stat) => {
    const el = statRefs[stat.label]
    if (!el) return

    const obj = { val: stat.from }
    gsap.to(obj, {
      val: stat.end,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsRef.value,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.val) + stat.suffix
      },
    })
  })
})
</script>
