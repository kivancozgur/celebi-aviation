<template>
  <section id="about" class="bg-white py-[120px] px-6 md:px-12 lg:px-20">
    <div class="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
      <!-- Left: Text Content -->
      <div ref="textRef" class="max-w-md flex-shrink-0 opacity-0 translate-y-5">
        <div class="flex items-center gap-3 mb-6">
          <span ref="lineRef" class="h-px w-0 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('about.label') }}</span>
        </div>
        <h2 class="text-[40px] sm:text-[48px] md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-[-2px] mb-6">
          <span
            v-for="(word, i) in titleWords"
            :key="i"
            class="word-wrap"
          >
            <span class="inline-block">{{ word }}<template v-if="i < titleWords.length - 1">&nbsp;</template></span>
          </span>
        </h2>
        <p class="text-gray-500 text-[17px] leading-[1.8] mb-10">
          {{ t('about.desc') }}
        </p>
        <div class="flex gap-4 items-center flex-wrap">
          <a
            href="#contact"
            class="inline-flex items-center gap-2.5 bg-[#0084ff] text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-[#0066cc] hover:translate-x-0.5 transition-all duration-200"
          >
            {{ t('about.ctaStart') }}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            class="text-gray-500 py-3 px-6 text-sm font-medium hover:text-gray-900 transition-colors duration-200"
          >
            {{ t('about.cta') }}
          </a>
        </div>
      </div>

      <!-- Right: Gallery Grid -->
      <div
        ref="gridRef"
        class="flex-1 w-full grid grid-cols-2 gap-4"
        style="grid-template-rows: 50px 150px 50px 150px 50px"
      >
        <div
          v-for="(img, i) in galleryImages"
          :key="i"
          class="gallery-cell relative overflow-hidden rounded-xl shadow-xl opacity-0"
          :class="cellClasses[i]"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const textRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()

const { tm, t, rt } = useI18n()
const titleWords = computed(() => (tm('about.titleWords') as string[]).map(w => rt(w)))

const cellClasses = [
  'col-start-2 col-end-3 row-start-1 row-end-3',
  'col-start-1 col-end-2 row-start-2 row-end-4',
  'col-start-1 col-end-2 row-start-4 row-end-6',
  'col-start-2 col-end-3 row-start-3 row-end-5',
]

const galleryImages = [
  { src: '/images/aviation.jpg', alt: 'Aviation services' },
  { src: '/images/ramp-services.jpg', alt: 'Ramp services' },
  { src: '/images/cargo-warehouse.jpg', alt: 'Cargo warehouse' },
  { src: '/images/meet-and-greet.jpg', alt: 'Meet and greet' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(lineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: textRef.value,
      start: 'top 80%',
      once: true,
    },
  })

  gsap.to(textRef.value!, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: textRef.value,
      start: 'top 80%',
      once: true,
    },
  })

  const cells = gridRef.value!.querySelectorAll('.gallery-cell')
  cells.forEach((cell, i) => {
    gsap.set(cell, { filter: 'blur(10px)' })
    gsap.to(cell, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: i * 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.value,
        start: 'top 80%',
        once: true,
      },
    })
  })
})
</script>
