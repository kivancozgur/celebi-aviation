<template>
  <div>
    <div class="pointer-events-none fixed inset-0 z-[5] grid grid-cols-4 grid-rows-5 place-items-center p-8">
      <img
        v-for="logoIndex in watermarkLogos"
        :key="logoIndex"
        src="/textoni.png"
        alt="Textoni watermark"
        class="h-auto w-[min(16vw,180px)] opacity-10 select-none"
      />
    </div>
    <div id="scroll-progress" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AppFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const watermarkLogos = Array.from({ length: 20 }, (_, index) => index)

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  // Lenis smooth scroll — dynamic import for SSR safety
  const { default: Lenis } = await import('lenis')

  const lenis = new Lenis({
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 1,
  })

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenis.on('scroll', () => ScrollTrigger.update())

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Scroll progress bar
  gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  })
})
</script>
