<template>
  <!-- Pinned scroll storytelling section -->
  <section ref="outerRef" class="relative bg-white">
    <div ref="stickyRef" class="relative h-screen overflow-hidden">
      <!-- Background image with scale parallax -->
      <div ref="imgWrapRef" class="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=85"
          alt="Starbase aircraft"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Overlay: sol taraf güçlü (metin orada), sağ taraf açık kalır -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"
      />

      <!-- Text content -->
      <div
        ref="textRef"
        class="absolute left-12 md:left-20 top-1/2 -translate-y-1/2 max-w-xl opacity-0"
      >
        <!-- Label -->
        <div class="flex items-center gap-3 mb-7">
          <span class="h-px w-10 bg-white/40 shrink-0" />
          <span class="text-white/70 text-[11px] font-medium tracking-[4px] uppercase">
            Küresel Operasyonlar
          </span>
        </div>

        <!-- Title -->
        <h2
          ref="aircraftTitleRef"
          class="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold text-white leading-[1.08] tracking-[-1.5px] mb-6"
        >
          Her Havalimanında<br />
          <span class="text-sky-300">Fark Yaratıyoruz.</span>
        </h2>

        <!-- Description -->
        <p class="text-white/65 text-[15px] leading-[1.85] mb-10 max-w-sm">
          1958'den bu yana 6 ülkede faaliyet gösteren Çelebi Havacılık; yer hizmetleri, kargo, genel havacılık ve VIP lounge çözümleriyle dünya standartlarını belirliyor.
        </p>

        <!-- Separator -->
        <div class="h-px w-16 bg-white/20 mb-8" />

        <!-- Stat badges -->
        <div class="flex items-start gap-10">
          <div
            v-for="badge in badges"
            :key="badge.label"
            class="badge opacity-0 translate-y-6"
          >
            <div class="text-[2rem] font-bold text-white leading-none mb-1 tracking-[-1px]">{{ badge.value }}</div>
            <div class="text-white/45 text-[10px] tracking-[2px] uppercase">{{ badge.label }}</div>
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
        <div class="w-px h-16 bg-gray-400/50 relative overflow-hidden">
          <div ref="cueLineRef" class="absolute top-0 left-0 w-full h-1/2 bg-brand" />
        </div>
        <span class="text-white/40 text-[10px] tracking-[2px]">SCROLL</span>
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
  { value: '60+', label: 'Havalimanı' },
  { value: '6', label: 'Ülke' },
  { value: '10K+', label: 'Çalışan' },
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
