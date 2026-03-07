<template>
  <section id="about" ref="aboutRef" class="bg-white py-[120px] px-6 md:px-12 lg:px-20">
    <!-- Top: Title + Description -->
    <div class="flex flex-col md:flex-row items-start justify-between mb-20 gap-10 md:gap-20">
      <!-- Left: Label + Title -->
      <div ref="aboutLeftRef" class="opacity-0 translate-y-16">
        <div class="flex items-center gap-3 mb-6">
          <span ref="aboutLineRef" class="h-px w-0 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('about.label') }}</span>
        </div>
        <h2 class="text-[64px] font-bold text-gray-900 leading-[1.05] tracking-[-2px] max-w-lg">
          <span
            v-for="(word, i) in aboutTitleWords"
            :key="i"
            class="word-wrap"
          >
            <span
              :ref="(el) => setAboutWordRef(el as HTMLElement, i)"
              class="inline-block"
            >{{ word }}<template v-if="i < aboutTitleWords.length - 1">&nbsp;</template></span>
          </span>
        </h2>
      </div>

      <!-- Right: Description + CTA -->
      <div ref="aboutRightRef" class="max-w-md pt-4 opacity-0 translate-x-12">
        <p class="text-gray-500 text-[17px] leading-[1.8] mb-8">
          {{ t('about.desc') }}
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-3 text-white text-sm font-medium group"
        >
          <span class="relative">
            {{ t('about.cta') }}
            <span
              class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-400 group-hover:w-full"
            />
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            class="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
              stroke="#003DA5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Divider line -->
    <div
      ref="dividerRef"
      class="h-px bg-gray-200 mb-20 origin-left scale-x-0"
    />

    <!-- Stats row -->
    <div ref="statsRowRef" class="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-item opacity-0 translate-y-8"
      >
        <div
          class="text-[48px] font-bold tracking-[-2px] leading-none mb-2"
          :class="stat.accent ? 'text-brand' : 'text-gray-900'"
        >
          <span :ref="(el) => setStatRef(el as HTMLElement, stat.label)">{{ stat.display }}</span>
        </div>
        <div class="text-gray-500 text-[13px] tracking-[1px] uppercase">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const aboutRef = ref<HTMLElement>()
const aboutLeftRef = ref<HTMLElement>()
const aboutRightRef = ref<HTMLElement>()
const aboutLineRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()
const statsRowRef = ref<HTMLElement>()

const { tm, t } = useI18n()
const aboutTitleWords = computed(() => tm('about.titleWords') as string[])
const aboutWordRefs: HTMLElement[] = []
const statRefs: Record<string, HTMLElement> = {}

function setAboutWordRef(el: HTMLElement | null, i: number) {
  if (el) aboutWordRefs[i] = el
}

function setStatRef(el: HTMLElement | null, label: string) {
  if (el) statRefs[label] = el
}

const stats = computed(() => [
  { label: t('about.stats.founded'), display: '1958', end: 1958, from: 1940, accent: false, suffix: '' },
  { label: t('about.stats.airports'), display: '60+', end: 60, from: 0, accent: true, suffix: '+' },
  { label: t('about.stats.employees'), display: '10K+', end: 10, from: 0, accent: false, suffix: 'K+' },
  { label: t('about.stats.countries'), display: '4', end: 4, from: 0, accent: true, suffix: '' },
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Left side: label line + title words reveal
  ScrollTrigger.create({
    trigger: aboutLeftRef.value,
    start: 'top 78%',
    onEnter: () => {
      gsap.to(aboutLineRef.value!, {
        width: 40,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.to(aboutLeftRef.value!, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    once: true,
  })

  // Right side slides in
  gsap.to(aboutRightRef.value!, {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: aboutRightRef.value,
      start: 'top 80%',
    },
  })

  // Divider draws left to right
  gsap.to(dividerRef.value!, {
    scaleX: 1,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: dividerRef.value,
      start: 'top 90%',
    },
  })

  // Stats items stagger in
  const statItems = statsRowRef.value!.querySelectorAll('.stat-item')
  gsap.to(statItems, {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: statsRowRef.value,
      start: 'top 85%',
    },
  })

  // Counter animations for each stat
  stats.value.forEach((stat) => {
    const el = statRefs[stat.label]
    if (!el) return

    const obj = { val: stat.from }
    gsap.to(obj, {
      val: stat.end,
      duration: stat.end === 1958 ? 1.5 : 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsRowRef.value,
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
