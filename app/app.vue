<template>
  <div>
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
