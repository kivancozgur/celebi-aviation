<template>
  <section id="hero" ref="heroRef" class="relative h-screen overflow-hidden">
    <!-- Background image with parallax -->
    <div
      ref="heroBgRef"
      class="absolute inset-0 will-change-transform"
    >
      <img
        src="https://images.unsplash.com/photo-1537319712059-51f47bfe0ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=85"
        alt="Aviation background"
        class="w-full h-full object-cover scale-[1.15]"
      />
    </div>

    <!-- Dark overlay gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/50 to-dark/0"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-dark/70 via-transparent to-transparent"
    />

    <!-- Content -->
    <div
      ref="heroContentRef"
      class="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20 max-w-screen-xl"
    >
      <!-- Label -->
      <div ref="heroLabelRef" class="flex items-center gap-3 mb-8 opacity-0">
        <span ref="labelLineRef" class="h-px bg-brand w-0" />
        <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">
          Global Aviation Services
        </span>
      </div>

      <!-- Title — each word wrapped for animation -->
      <h1 class="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-[800] text-white leading-[1.15] tracking-[-3px] mb-8">
        <span
          v-for="(word, i) in titleWords"
          :key="i"
          class="word-wrap pb-[0.15em]"
        >
          <span
            :ref="(el) => setWordRef(el as HTMLElement, i)"
            class="inline-block translate-y-full opacity-0"
          >
            {{ word }}<template v-if="i < titleWords.length - 1">&nbsp;</template>
          </span>
        </span>
      </h1>

      <!-- Bottom row -->
      <div ref="heroBottomRef" class="flex items-end justify-between w-full opacity-0">
        <p class="text-white/50 text-base leading-[1.7] max-w-sm">
          Dünya genelinde 4 ülkede, 60'tan fazla<br />
          havalimanında yer hizmetleri, kargo,<br />
          genel havacılık ve premium çözümler.
        </p>

        <!-- Scroll indicator -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-px h-16 bg-white/20 relative overflow-hidden">
            <div ref="scrollLineRef" class="absolute top-0 left-0 w-full bg-brand h-1/2" />
          </div>
          <span class="text-white/30 text-[10px] font-medium tracking-[2px]">SCROLL</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroRef = ref<HTMLElement>()
const heroBgRef = ref<HTMLElement>()
const heroContentRef = ref<HTMLElement>()
const heroLabelRef = ref<HTMLElement>()
const labelLineRef = ref<HTMLElement>()
const heroBottomRef = ref<HTMLElement>()
const scrollLineRef = ref<HTMLElement>()

const titleWords = ['Havacılığın', 'Geleceğini', 'Taşıyoruz.']
const wordRefs: HTMLElement[] = []

function setWordRef(el: HTMLElement | null, i: number) {
  if (el) wordRefs[i] = el
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({ delay: 0.8 })

  // Label line expand + fade in
  tl.to(labelLineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
  })
    .to(
      heroLabelRef.value!,
      { opacity: 1, duration: 0.4 },
      '<',
    )
    // Title words slide up
    .to(
      wordRefs,
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.3',
    )
    // Bottom row fade in
    .to(
      heroBottomRef.value!,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4',
    )

  // Scroll line animation (looping)
  gsap.to(scrollLineRef.value!, {
    y: '200%',
    duration: 1.2,
    ease: 'power2.inOut',
    repeat: -1,
    repeatDelay: 0.4,
  })

  // Parallax — background drifts up slower than scroll
  gsap.to(heroBgRef.value!, {
    y: '25%',
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Hero content fades out / lifts on scroll
  gsap.to(heroContentRef.value!, {
    y: -120,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: '30% top',
      end: '75% top',
      scrub: 1,
    },
  })
})
</script>
