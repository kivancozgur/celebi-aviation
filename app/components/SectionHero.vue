<template>
  <section id="hero" ref="heroRef" class="relative h-screen overflow-hidden">
    <!-- Background image with parallax -->
    <div
      ref="heroBgRef"
      class="absolute inset-0 will-change-transform"
    >
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=85"
        alt="Aviation background"
        class="w-full h-full object-cover scale-[1.15]"
      />
    </div>

    <!-- Overlay: güçlü alt-sol gradyan, üst-sağ açık kalır -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
    />

    <!-- Content -->
    <div
      ref="heroContentRef"
      class="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20 max-w-screen-xl"
    >
      <!-- Label -->
      <div ref="heroLabelRef" class="flex items-center gap-3 mb-5 opacity-0">
        <span ref="labelLineRef" class="h-px bg-white/50 w-0" />
        <span class="text-white/70 text-[11px] font-medium tracking-[4px] uppercase">
          Global Aviation Services
        </span>
      </div>

      <!-- Title — each word wrapped for animation -->
      <h1 class="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-[800] text-white leading-[1.15] tracking-[-3px] mb-10">
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
          {{ t('hero.subtitle') }}
        </p>

        <!-- Scroll indicator -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-px h-16 bg-white/30 relative overflow-hidden">
            <div ref="scrollLineRef" class="absolute top-0 left-0 w-full bg-white/80 h-1/2" />
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

const { tm, t, rt } = useI18n()
const titleWords = computed(() => (tm('hero.titleWords') as string[]).map(w => rt(w)))
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
