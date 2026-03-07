<template>
  <!-- Pinned scroll storytelling section -->
  <section ref="outerRef" class="relative bg-dark">
    <div ref="stickyRef" class="relative h-screen overflow-hidden">
      <!-- Background image with scale parallax -->
      <div ref="imgWrapRef" class="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1673209034091-fa720e36e327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=85"
          alt="Starbase aircraft"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Cinematic overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-dark/20"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark/80"
      />

      <!-- Text content -->
      <div
        ref="textRef"
        class="absolute left-20 top-1/2 -translate-y-1/2 max-w-lg opacity-0"
      >
        <span
          class="text-brand text-[11px] font-medium tracking-[3px] uppercase block mb-4"
          ref="aircraftLabelRef"
        >
          GSAP ILE INTERAKTIF DENEYIM
        </span>

        <h2
          ref="aircraftTitleRef"
          class="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white leading-tight mb-4"
        >
          Scroll ile<br />
          <span class="text-brand">Ucak Animasyonu</span>
        </h2>

        <p class="text-white/50 text-base leading-relaxed mb-8">
          Sayfayi asagi kaydirdikca kamera acar, ucak modeli hareket eder<br />
          ve sahne olusur. Her detay titizlikle tasarlandi.
        </p>

        <!-- Animated stat badges -->
        <div class="flex items-center gap-6">
          <div
            v-for="badge in badges"
            :key="badge.label"
            class="badge opacity-0 translate-y-6"
          >
            <div class="text-2xl font-bold text-white mb-1">{{ badge.value }}</div>
            <div class="text-white/40 text-xs tracking-[1px] uppercase">{{ badge.label }}</div>
          </div>
        </div>
      </div>

      <!-- Right-side giant text (decorative) -->
      <div
        ref="decoTextRef"
        class="absolute right-0 bottom-0 text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none overflow-hidden"
        style="letter-spacing: -8px;"
      >
        CELEBI
      </div>

      <!-- Scroll cue at bottom -->
      <div
        ref="scrollCueRef"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <div class="w-px h-16 bg-white/20 relative overflow-hidden">
          <div ref="cueLineRef" class="absolute top-0 left-0 w-full h-1/2 bg-brand" />
        </div>
        <span class="text-white/30 text-[10px] tracking-[2px]">DEVAM ET</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const outerRef = ref<HTMLElement>()
const stickyRef = ref<HTMLElement>()
const imgWrapRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const decoTextRef = ref<HTMLElement>()
const scrollCueRef = ref<HTMLElement>()
const cueLineRef = ref<HTMLElement>()

const badges = [
  { value: '60+', label: 'Havalimani' },
  { value: '4', label: 'Ulke' },
  { value: '10K+', label: 'Calisan' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Image scale + parallax as section scrolls in
  gsap.fromTo(
    imgWrapRef.value!,
    { scale: 1.15, y: '0%' },
    {
      scale: 1,
      y: '-8%',
      ease: 'none',
      scrollTrigger: {
        trigger: outerRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )

  // Text reveal on scroll into view
  gsap.to(textRef.value!, {
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: outerRef.value,
      start: 'top 65%',
    },
  })

  gsap.from(textRef.value!, {
    x: -60,
    scrollTrigger: {
      trigger: outerRef.value,
      start: 'top 65%',
    },
  })

  // Badge stagger
  const badgeEls = outerRef.value!.querySelectorAll('.badge')
  gsap.to(badgeEls, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: outerRef.value,
      start: 'top 55%',
    },
  })

  // Deco text slow scroll
  gsap.from(decoTextRef.value!, {
    x: 200,
    ease: 'none',
    scrollTrigger: {
      trigger: outerRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    },
  })

  // Scroll cue fade in + line loop
  gsap.to(scrollCueRef.value!, {
    opacity: 1,
    duration: 1,
    delay: 0.5,
    scrollTrigger: {
      trigger: outerRef.value,
      start: 'top 70%',
    },
  })

  gsap.to(cueLineRef.value!, {
    y: '200%',
    duration: 1.2,
    ease: 'power2.inOut',
    repeat: -1,
    repeatDelay: 0.4,
  })
})
</script>
